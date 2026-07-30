---
title: 完整获取项目树
---

<h1>完整获取项目树 WBS + Activity2 递归解析方案</h1>
<p>
本方案从 Aras Innovator 的 <code>Project</code> 对象出发，<strong>一次性获取完整 WBS 结构及所有 Activity2 任务</strong>，
利用 <code>prev_item</code> 链表排序后递归构建 <code>TaskNode</code> 树，再单独查询 <code>Predecessor</code> 前置关系，
最终序列化为 JSON 输出。核心思路分为<strong>两阶段获取 WBS 与 Activity2 数据</strong>和<strong>递归构建排序任务树</strong>两大模块。
</p>

<blockquote>
<p><strong>核心策略</strong>：用<strong>一次 AML 调用</strong>获取完整 WBS 层级结构 + <strong>一次批量查询</strong>获取所有前置关系 + <strong>本地 JSON 序列化</strong>，将 Aras 网络往返降至最低。</p>
</blockquote>

<h2>整体流程概览</h2>
<ol>
<li><strong>获取项目信息</strong>：按 <code>Project</code> id 查询，获取 <code>wbs_id</code> 等基础属性。</li>
<li><strong>一次性获取完整 WBS 树</strong>：通过 <code>GetItemRepeatConfig</code> AML 递归展开 <code>WBS Element</code> 子级 + 内嵌 <code>WBS Activity2</code> 关联项。</li>
<li><strong>构建排序任务树</strong>：<code>BuildTaskTreeFromXml</code> 按 <code>prev_item</code> 链表原地排序后递归构建 <code>TaskNode</code> 树。</li>
<li><strong>批量查询前置关系</strong>：收集所有 Activity2 id，用 <code>source_id condition='in'</code> 批量获取 <code>Predecessor</code> 并附加到树。</li>
<li><strong>序列化输出</strong>：用 <code>System.Text.Json</code> 输出带中文的 JSON 验证结构。</li>
</ol>

<h2>第一阶段：一次性获取完整 WBS 与 Activity2 数据</h2>

<h3>2.1 核心 AML 调用：GetItemRepeatConfig</h3>
<p>
使用 <code>action='GetItemRepeatConfig'</code> 配合 <code>repeatProp='related_id' repeatTimes='0'</code>，
<code>repeatTimes='0'</code> 表示<strong>无限递归</strong>，让 <code>Sub WBS</code> 关系自动展开所有层级 WBS 节点，返回完整 XML，避免逐层 N+1 查询。
同时通过 <code>action='get'</code> 在 <code>WBS Activity2</code> 上<strong>内嵌获取每个 WBS 下的活动</strong>，并在 select 中指定所需属性。
</p>

```csharp
{{ amlWbs }}
```

    <ul>
      <li><code>Sub WBS</code> 的 select 仅保留 <code>id,source_id,related_id</code>，因为 WBS 节点详情在递归展开时自动携带。</li>
      <li><code>WBS Activity2</code> 通过 <code>related_id(...)</code> 内嵌获取 <code>prev_item</code>、<code>managed_by_id</code>、<code>lead_role</code>、排期日期、<code>percent_compl</code>、<code>is_milestone</code> 等排程与分配信息。</li>
      <li><strong>此处故意不嵌套 <code>Predecessor</code></strong>，因为前置关系是跨 WBS 节点的全局关系，嵌套在 WBS 内会导致重复查询且无法按 id 批量获取。</li>
    </ul>

    <h3>2.2 批量查询前置关系</h3>
    <p>
      在构建任务树后，通过 <code>CollectActivityIds</code> 递归收集所有 Activity2 的 id，然后用
      <code>source_id condition='in'</code> 的 AML <strong>一次</strong>批量获取所有 <code>Predecessor</code>，
      利用 in 条件将数百条前置关系压缩为单次网络往返，避免 N+1。
    </p>
    
```csharp
{{ amlPred }}
```


<h3>2.3 解析 / 映射 / 附加</h3>
<p>
<code>BuildPredecessorMap</code> 将查询结果解析为 <code>sourceId → List&lt;TaskPredecessor&gt;</code> 字典，
将 Aras 的 <code>precedence_type</code> 字符串（<code>SS/FF/SF</code>，默认 <code>FS</code>）映射为 <code>DependencyType</code> 枚举。
<code>AttachPredecessors</code> 递归遍历任务树，按 id 匹配后将前置列表写入 <code>TaskNode.Predecessors</code>。
</p>

```csharp
{{ predImpl }}
```


    <h2>第二阶段：递归构建排序任务树</h2>

    <h3>3.1 入口方法：两趟遍历</h3>
    <p>
      <code>BuildTaskTreeFromXml</code> 接收 WBS 根节点的 XML 字符串，采用<strong>先排序后构建</strong>策略：
      第一趟 <code>SortRelationships</code> 递归遍历所有 <code>Relationships</code>，按 <code>prev_item</code> 链表原地重排子节点顺序；
      第二趟 <code>BuildWbsNode</code> 从 XML 根节点开始递归构建完整任务树。
    </p>
    
```csharp
{{ buildEntry }}
```


<h3>3.2 核心：prev_item 链表原地排序</h3>
<p>
Aras 返回的 <code>Relationships</code> 子节点顺序<strong>不确定</strong>，但每个子 item 的 <code>prev_item</code> 属性构成一条链表。
参考 Aras 官方 <code>SortItems</code> 方法，<code>WBS</code> 与 <code>Activity2</code> <strong>共享同一条 prev_item 链</strong>，
排序算法从链表头（<code>prev_item</code> 为空的节点）开始，用 <code>InsertBefore</code> 逐个将节点移到正确位置，同时递归排序嵌套的 <code>WBS Element</code> 子级关系。
</p>

```csharp
{{ sortRel }}
```

    <ul>
      <li><code>typeXP = "[@type='WBS Activity2' or @type='Sub WBS']"</code>：WBS 子级和活动共享同一条排序链。</li>
      <li>链表头条件 <code>[not(prev_item) or prev_item='']</code>，同时排除 <code>@action='delete'</code> 的已删除项。</li>
      <li>沿链表查找下一个节点时，用当前节点 id 做 XPath 匹配 <code>prev_item='{prevId}'</code>，时间复杂度为 <strong>O(n)</strong> 每层。</li>
    </ul>

    <h3>3.3 递归构建 WBS 节点为 TaskNode</h3>
    <p>
      XML 排序完成后，<code>BuildWbsNode</code> 按序读取 <code>Relationships</code> 下的 <code>Sub WBS</code> 和 <code>WBS Activity2</code>，
      为每个 WBS 节点生成 <code>wbs</code> 编号（如 <code>0.1.2</code>），对 <code>WBS Activity2</code> 调用 <code>BuildActivityNode</code> 构建叶子任务节点，
      <code>SortOrder</code> 按读取顺序递增赋值，保证最终输出顺序正确。
    </p>
    
```csharp
{{ buildWbs }}
```


<h3>3.4 构建 Activity2 为 TaskNode</h3>
<p>
<code>BuildActivityNode</code> 从 Activity2 的 XML 节点提取属性构建 <code>TaskNode</code>：<code>is_milestone</code> 决定任务类型（里程碑/普通任务），
<code>managed_by_id</code> 解析为 <code>TeamMember</code> 对象（含 id/name/role），<code>prev_item</code> 不参与此处（已在排序阶段处理）。
</p>

```csharp
{{ buildAct }}
```


    <h2>数据模型定义</h2>
    <p>
      所有模型使用 <code>System.Text.Json</code> 序列化，属性名通过 <code>[JsonPropertyName]</code> 映射为 camelCase JSON 键名。
      <code>TaskNode</code> 采用自引用 <code>Children</code> 列表实现树形结构，<code>Predecessors</code> 列表存储前置依赖。
    </p>
    
```csharp
{{ taskNodeModel }}
```


<h2>输出 JSON 示例</h2>
<p>
最终 <code>snapshot.TaskTree</code> 赋值后，使用 <code>JavaScriptEncoder.UnsafeRelaxedJsonEscaping</code> 确保中文不被转义，
<code>WriteIndented = true</code> 输出格式化 JSON。以下为简化示例：
</p>

```json
{{ jsonSample }}
```


    <h2>完整入口方法 IC_GetProjectTree</h2>
    <p>
      以下是 <code>IC_GetProjectTree</code> 的完整实现，串联了上述所有步骤：获取项目 → 构建快照元数据 → AML 获取 WBS 树 → 递归构建任务树 → 批量查询前置关系 → 序列化输出。
    </p>
    
```csharp
{{ fullMethod }}
```

