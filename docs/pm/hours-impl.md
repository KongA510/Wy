---
title: 实现方式
---

<h1>工时管理系统 — 实现方式</h1>
<p>
本文档详细说明 <strong>Kong_A_Hours 工时管理系统</strong>的项目结构、架构设计与关键功能实现。
该系统基于 <code>Vue 3 + TypeScript + Element Plus + ECharts + Pinia</code> 构建，
以 IFRAME 方式嵌入 Aras Innovator，通过 <code>top.aras.newIOMInnovator().applyMethod()</code> 调用后端 C# Method，
实现工时填报、审核、统计报表等完整业务闭环。
</p>
<blockquote>
<p><strong>核心架构</strong>：Mock/Real 双模调度 + XML Body 构造器 + Wire↔View 双向映射 + 6 策略安全解析器，
将 Aras IOM 通信细节完全封装在 API 层，视图层仅面向 TypeScript 类型编程。</p>
</blockquote>
<h2>仓库链接</h2>
<p>本项目源码托管于 GitHub，可通过以下命令克隆到本地：</p>

```bash
git clone https://github.com/KongA510/Kong_A_Hours.git
```

    <p>仓库主页：<a href="https://github.com/KongA510/Kong_A_Hours" target="_blank" rel="noopener">KongA510/Kong_A_Hours</a></p>
    <h2>一、项目结构</h2>
    
```text
{{ projectTree }}
```

<h2>二、架构设计</h2>
<h3>2.1 Mock/Real 双模调度（client.ts）</h3>
<p>系统通过环境变量 <code>VITE_USE_MOCK</code> 控制数据来源。开发/测试环境使用本地 Mock 数据，生产环境通过 Aras IOM 真实调用。业务层只面向 <code>callArasMethod(method, payload)</code> 统一接口，无需关心底层通信方式。</p>

```typescript
{{ clientCode }}
```

    <h3>2.2 安全解析器 safeParseResult（6 策略）</h3>
    <p>Aras IOM 的 <code>getResult()</code> 返回值格式不确定（可能是纯 JSON、XML 包装、BOM 污染、简单字面量等），<code>safeParseResult</code> 依次尝试 6 种策略提取有效数据，确保前端不会因解析失败而崩溃。</p>
    
```typescript
{{ safeParseCode }}
```

<h3>2.3 XML Body 构造器（arasBody.ts）</h3>
<p>每个 Aras Method 的入参需要序列化为结构化 XML 字符串。<code>BUILDERS</code> 表登记了每个方法的专用构造器，未登记的方法走 <code>defaultBody</code> 通用逻辑。<strong>关键设计</strong>：承载 JSON 的标签（如 <code>&lt;projectData&gt;</code>）内不做 XML 转义，与后端 <code>Newtonsoft.Json.JsonConvert.DeserializeObject</code> 直接反序列化保持一致。</p>

```typescript
{{ arasBodyCode }}
```

    <h3>2.4 方法注册表（methods.ts）</h3>
    <p>所有后端 Method 名称集中管理，前端通过常量引用，避免硬编码字符串散落在各模块。</p>
    
```typescript
{{ methodsCode }}
```

<h2>三、Wire↔View 双向映射</h2>
<p>后端 <code>HoursProject</code> 的星期字段为 <code>string</code> 类型（如 <code>"8"</code>），前端视图模型 <code>ProjectHourRow</code> 使用 <code>number[]</code>（7 个元素对应周一~周日）。每个 API 模块内置 <code>toView()</code> / <code>toWire()</code> 函数，在调用边界自动转换。</p>

```typescript
{{ wireViewCode }}
```

    <h2>四、后端核心 Method 实现</h2>
    <p>所有后端 Method 共享统一的权限提升模式：</p>
    
```csharp
{{ permPattern }}
```

<h3>4.1 IC_getProjectList — 获取可填报项目列表</h3>
<p>核心逻辑：通过 SQL JOIN <code>PROJECT + ACTIVITY2 + PROJECT_TEAM</code> 按当前用户 Identity 筛选参与的项目，再按日期范围过滤活跃项目，最后合并已有的 <code>IC_Working_Hour</code> 记录，返回含填报状态的完整列表。</p>

```csharp
{{ getProjectListCode }}
```

    <h3>4.2 IC_saveProjectData — 提交新工时</h3>
    <p>接收前端序列化的 <code>HoursProject</code> JSON，先查重（同项目+同用户+同周不允许重复），然后创建 <code>IC_Working_Hour</code> 主记录 + 7 条 <code>IC_Hour_Details</code> 子记录（每天一条）。</p>
    
```csharp
{{ saveProjectDataCode }}
```

<h3>4.3 IC_updateProjectData — 修改工时</h3>
<p>仅允许 <code>state ≠ pass</code> 的记录修改。编辑主记录后<strong>删除原有明细再重新添加</strong>（delete + re-add），修改完成后自动 <code>promote("Start")</code> 将状态重置为待审核。</p>

```csharp
{{ updateProjectDataCode }}
```

    <h3>4.4 IC_allReviewPassOrReject — 批量审核</h3>
    <p>接收 <code>List&lt;ICHoursReview&gt;</code> JSON 数组，循环每条记录执行 <code>promote("pass")</code> 或 <code>promote("reject")</code>，带有状态守卫（已 pass 不能再 reject，空状态不能直接 pass）。</p>
    
```csharp
{{ reviewCode }}
```

<h3>4.5 IC_getReportData — 年度统计报表</h3>
<p>12 个月循环查询 <code>IC_Hour_Details</code> 汇总月度工时（柱状图），按项目分组汇总（饼图），计算峰值月份、月均工时等统计指标。</p>

```csharp
{{ reportCode }}
```

    <h3>4.6 IC_Hours_Details — 工时明细查询</h3>
    <p>通过 AML 按年月 + 项目 ID 查询 <code>IC_Hour_Details</code>，自动计算当月首末日范围，返回含项目信息、填报人、日期、工时的明细列表。</p>
    
```csharp
{{ detailsCode }}
```

<h3>4.7 IC_getProjectDetailData — 项目维度明细</h3>
<p>通过 SQL JOIN <code>IC_Hour_Details + IC_Working_Hour + PROJECT + USER</code>，按项目 ID + 年月范围查询，返回每条填报记录的人员、日期、工时、审核状态。</p>

```csharp
{{ projectDetailCode }}
```

    <h3>4.8 getProjectHourData — 用户填报记录</h3>
    <p>按 <code>created_by_id</code> + 周范围 <code>between</code> 条件查询 <code>IC_Working_Hour</code>，关联查询项目名称，返回当前用户在指定周的所有填报记录。</p>
    
```csharp
{{ getHourDataCode }}
```

<h3>4.9 工时明细查询 — 按年月检索（IC_Hours_Details + getHoursDetailbyProject）</h3>
<p>
该功能面向<strong>财务部门</strong>，支持按<strong>任意年月 + 项目</strong>检索所有人员在该月的工时明细。
与 4.5 年度报表不同，此处返回的是<strong>明细级数据</strong>（每条 IC_Hour_Details 记录），
支持<strong>导出 Excel</strong>，财务人员拿到表格后可快速通过筛选功能分析数据。
</p>
<p>前端通过 <code>IC_Hours_Details</code> Method 查询工时明细，再通过 <code>getHoursDetailbyProject</code> 补充项目维度的聚合信息：</p>

```csharp
{{ hoursDetailCode }}
```

    <h3>4.10 Excel 导出（exportExcel.ts）</h3>
    <p>
      系统所有表格页面（填报记录、工时审核、年度报表、工时明细）均支持<strong>导出 Excel</strong>。
      使用 <code>xlsx</code> 库（SheetJS）将前端已加载的数据直接生成 <code>.xlsx</code> 文件并触发浏览器下载，
      <strong>无需额外后端 API</strong>，导出速度极快。
    </p>
    
```typescript
{{ exportExcelCode }}
```

<p><strong>设计要点</strong>：</p>
<ul>
<li>导出基于前端当前已加载数据，不做额外请求，保证导出内容与用户所见一致</li>
<li>自动文件名含日期（如 <code>工时明细_2025-08.xlsx</code>），便于归档</li>
<li><code>autoWidth</code> 按内容自动推算列宽，中文按 2 字符计算，确保列宽合适</li>
<li>多 sheet 支持：明细页 + 汇总页可分 sheet 导出</li>
</ul>
<h2>五、状态机</h2>
<p>工时记录的审批状态流转如下：</p>

```text
{{ stateMachine }}
```

    <ul>
      <li><strong>空状态（''）</strong>：项目已列出但尚未填报，可提交新工时</li>
      <li><strong>Start（待审核）</strong>：已提交，等待管理员审核；被驳回后修改也会回到此状态</li>
      <li><strong>pass（已通过）</strong>：审核通过，数据只读不可修改</li>
      <li><strong>reject（已驳回）</strong>：审核驳回，可修改后重新提交</li>
    </ul>
    <h2>六、路由与 IFRAME 兼容</h2>
    <p>使用 <code>createWebHashHistory()</code> Hash 路由模式，确保在 Aras Innovator IFRAME 嵌入环境下路由跳转不会触发父页面刷新。根路径 <code>/</code> 重定向到 <code>/data-view</code>（工时填报页）。</p>
    
```typescript
{{ routerCode }}
```

<h2>七、总结</h2>
<table>
<thead><tr><th>设计要点</th><th>实现方式</th></tr></thead>
<tbody>
<tr><td>Aras 通信封装</td><td>callArasMethod 统一入口 + Mock/Real 双模调度</td></tr>
<tr><td>入参序列化</td><td>BUILDERS 表 + defaultBody，JSON 标签不转义</td></tr>
<tr><td>返回值解析</td><td>safeParseResult 6 策略容错解析</td></tr>
<tr><td>类型安全</td><td>Wire↔View 双向映射，视图层纯 TypeScript 类型</td></tr>
<tr><td>权限控制</td><td>后端 Aras PLM Identity 提升/释放</td></tr>
<tr><td>状态管理</td><td>IC_Working_Hour 生命周期：'' → Start → pass/reject</td></tr>
<tr><td>IFRAME 兼容</td><td>Hash 路由 + top.aras IOM 调用</td></tr>
<tr><td>数据分页</td><td>后端全量返回，前端 computed 分页/筛选</td></tr>
<tr><td>Excel 导出</td><td>xlsx（SheetJS）前端直接生成，无需后端接口</td></tr>
<tr><td>工时明细查询</td><td>按年月 + 项目检索明细，支持导出供财务分析</td></tr>
</tbody>
</table>
