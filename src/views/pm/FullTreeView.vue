<template>
  <article class="doc-content">
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
    <pre><code class="language-csharp">{{ amlWbs }}</code></pre>
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
    <pre><code class="language-csharp">{{ amlPred }}</code></pre>

    <h3>2.3 解析 / 映射 / 附加</h3>
    <p>
      <code>BuildPredecessorMap</code> 将查询结果解析为 <code>sourceId → List&lt;TaskPredecessor&gt;</code> 字典，
      将 Aras 的 <code>precedence_type</code> 字符串（<code>SS/FF/SF</code>，默认 <code>FS</code>）映射为 <code>DependencyType</code> 枚举。
      <code>AttachPredecessors</code> 递归遍历任务树，按 id 匹配后将前置列表写入 <code>TaskNode.Predecessors</code>。
    </p>
    <pre><code class="language-csharp">{{ predImpl }}</code></pre>

    <h2>第二阶段：递归构建排序任务树</h2>

    <h3>3.1 入口方法：两趟遍历</h3>
    <p>
      <code>BuildTaskTreeFromXml</code> 接收 WBS 根节点的 XML 字符串，采用<strong>先排序后构建</strong>策略：
      第一趟 <code>SortRelationships</code> 递归遍历所有 <code>Relationships</code>，按 <code>prev_item</code> 链表原地重排子节点顺序；
      第二趟 <code>BuildWbsNode</code> 从 XML 根节点开始递归构建完整任务树。
    </p>
    <pre><code class="language-csharp">{{ buildEntry }}</code></pre>

    <h3>3.2 核心：prev_item 链表原地排序</h3>
    <p>
      Aras 返回的 <code>Relationships</code> 子节点顺序<strong>不确定</strong>，但每个子 item 的 <code>prev_item</code> 属性构成一条链表。
      参考 Aras 官方 <code>SortItems</code> 方法，<code>WBS</code> 与 <code>Activity2</code> <strong>共享同一条 prev_item 链</strong>，
      排序算法从链表头（<code>prev_item</code> 为空的节点）开始，用 <code>InsertBefore</code> 逐个将节点移到正确位置，同时递归排序嵌套的 <code>WBS Element</code> 子级关系。
    </p>
    <pre><code class="language-csharp">{{ sortRel }}</code></pre>
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
    <pre><code class="language-csharp">{{ buildWbs }}</code></pre>

    <h3>3.4 构建 Activity2 为 TaskNode</h3>
    <p>
      <code>BuildActivityNode</code> 从 Activity2 的 XML 节点提取属性构建 <code>TaskNode</code>：<code>is_milestone</code> 决定任务类型（里程碑/普通任务），
      <code>managed_by_id</code> 解析为 <code>TeamMember</code> 对象（含 id/name/role），<code>prev_item</code> 不参与此处（已在排序阶段处理）。
    </p>
    <pre><code class="language-csharp">{{ buildAct }}</code></pre>

    <h2>数据模型定义</h2>
    <p>
      所有模型使用 <code>System.Text.Json</code> 序列化，属性名通过 <code>[JsonPropertyName]</code> 映射为 camelCase JSON 键名。
      <code>TaskNode</code> 采用自引用 <code>Children</code> 列表实现树形结构，<code>Predecessors</code> 列表存储前置依赖。
    </p>
    <pre><code class="language-csharp">{{ taskNodeModel }}</code></pre>

    <h2>输出 JSON 示例</h2>
    <p>
      最终 <code>snapshot.TaskTree</code> 赋值后，使用 <code>JavaScriptEncoder.UnsafeRelaxedJsonEscaping</code> 确保中文不被转义，
      <code>WriteIndented = true</code> 输出格式化 JSON。以下为简化示例：
    </p>
    <pre><code class="language-json">{{ jsonSample }}</code></pre>

    <h2>完整入口方法 IC_GetProjectTree</h2>
    <p>
      以下是 <code>IC_GetProjectTree</code> 的完整实现，串联了上述所有步骤：获取项目 → 构建快照元数据 → AML 获取 WBS 树 → 递归构建任务树 → 批量查询前置关系 → 序列化输出。
    </p>
    <pre><code class="language-csharp">{{ fullMethod }}</code></pre>

  </article>
</template>

<script setup lang="ts">
const amlWbs = `var wbs_treeAML =
    $"<AML>" +
    $"   <Item type='WBS Element' select='id,rollup_date_sched_due,rollup_duration,proj_num,prev_item,wbs_index'" +
    $"         action='GetItemRepeatConfig' id='{project.getProperty("wbs_id", "")}'>" +
    $"       <Relationships>" +
    $"           <Item type='Sub WBS' select='id,source_id,related_id'" +
    $"                 repeatProp='related_id' repeatTimes='0'/>" +
    $"           <Item type='WBS Activity2' action='get'" +
    $"                 select='id,source_id,related_id(id,proj_num,prev_item,managed_by_id," +
    $"                        lead_role,date_start_sched,date_due_sched,percent_compl," +
    $"                        expected_duration,is_milestone)'/>" +
    $"       </Relationships>" +
    $"   </Item>" +
    $"</AML>";
var wbs_treeItem = inn.applyAML(wbs_treeAML);
var wbs_nodeXML = wbs_treeItem.node.OuterXml;`

const amlPred = `// 收集所有 Activity2 ID
var activityIds = new List<string>();
CollectActivityIds(taskTree, activityIds);

// 批量查询 Predecessor
var predAML =
    $"<AML>" +
    $"   <Item type='Predecessor' action='get'" +
    $"         select='id,source_id,related_id(id,keyed_name),precedence_type,lead_time'>" +
    $"       <source_id condition='in'>{string.Join(",", activityIds)}</source_id>" +
    $"   </Item>" +
    $"</AML>";
var predResult = inn.applyAML(predAML);`

const predImpl = `// 解析 Predecessor 结果为字典
private static Dictionary<string, List<TaskPredecessor>>
    BuildPredecessorMap(System.Xml.XmlNode predNode)
{
    var map = new Dictionary<string, List<TaskPredecessor>>();
    foreach (System.Xml.XmlNode item in predNode.SelectNodes("Item"))
    {
        var sourceId = item.SelectSingleNode("source_id")?.InnerText ?? "";
        var relItem = item.SelectSingleNode("related_id/Item");
        if (relItem == null) continue;

        var predType = item.SelectSingleNode("precedence_type")?.InnerText ?? "FS";
        var depType = predType switch
        {
            "SS" => DependencyType.SS,
            "FF" => DependencyType.FF,
            "SF" => DependencyType.SF,
            _    => DependencyType.FS
        };

        var pred = new TaskPredecessor
        {
            Id = item.Attributes?["id"]?.Value ?? "",
            PredecessorId = relItem.Attributes?["id"]?.Value ?? "",
            DependencyType = depType,
            LagDays = GetXmlInt(item, "lead_time", 0)
        };

        if (!map.ContainsKey(sourceId)) map[sourceId] = new();
        map[sourceId].Add(pred);
    }
    return map;
}

// 递归附加前置关系到任务树
private static void AttachPredecessors(
    List<TaskNode> nodes,
    Dictionary<string, List<TaskPredecessor>> map)
{
    foreach (var node in nodes)
    {
        if (map.TryGetValue(node.Id, out var preds))
            node.Predecessors = preds;
        if (node.Children?.Count > 0)
            AttachPredecessors(node.Children, map);
    }
}`

const buildEntry = `public static List<TaskNode> BuildTaskTreeFromXml(string wbsXml)
{
    if (string.IsNullOrWhiteSpace(wbsXml)) return new List<TaskNode>();

    var doc = new System.Xml.XmlDocument();
    doc.LoadXml(wbsXml);
    var rootNode = doc.DocumentElement;
    if (rootNode == null) return new List<TaskNode>();

    // 第一趟：原地排序所有层级的 Relationships
    SortRelationships(rootNode);
    // 第二趟：递归构建 TaskNode 树
    var root = BuildWbsNode(rootNode, null, "0");
    return new List<TaskNode> { root };
}`

const sortRel = `private static void SortRelationships(System.Xml.XmlNode parentNode)
{
    if (parentNode == null) return;
    var relationshipsNode = parentNode.SelectSingleNode("Relationships");
    if (relationshipsNode == null) return;

    const string typeXP = "[@type='WBS Activity2' or @type='Sub WBS']";

    // 链表头：prev_item 为空或不存在的节点
    var nextItem = parentNode.SelectSingleNode(
        $"Relationships/Item{typeXP}[not(@action='delete')]" +
        $"/related_id/Item[not(prev_item) or prev_item='']");

    var beforeRel = relationshipsNode.FirstChild;

    while (nextItem != null)
    {
        var nextRel = nextItem.ParentNode?.ParentNode;
        if (nextRel == null) break;

        // 递归排序嵌套的 WBS Element
        if (nextItem.Attributes?["type"]?.Value == "WBS Element")
            SortRelationships(nextItem);

        // 将 nextRel 插入到 beforeRel 之前（原地重排）
        var prevRel = relationshipsNode.InsertBefore(nextRel, beforeRel);
        beforeRel = prevRel?.NextSibling;

        var prevItemNode = prevRel?.SelectSingleNode("related_id/Item");
        if (prevItemNode == null) break;
        var prevId = prevItemNode.Attributes?["id"]?.Value;
        if (string.IsNullOrEmpty(prevId)) break;

        // 沿链表找下一个
        nextItem = parentNode.SelectSingleNode(
            $"Relationships/Item{typeXP}/related_id/Item[prev_item='{prevId}']");
    }
}`

const buildWbs = `private static TaskNode BuildWbsNode(
    System.Xml.XmlNode wbsItem, string? parentId, string wbsPrefix)
{
    var id = wbsItem.Attributes?["id"]?.Value ?? "";
    var name = wbsItem.SelectSingleNode("id")?.Attributes?["keyed_name"]?.Value ?? "";
    var wbsIndex = GetXmlInt(wbsItem, "wbs_index", 0);
    var duration = GetXmlInt(wbsItem, "rollup_duration", 0);
    var dueDate = GetXmlString(wbsItem, "rollup_date_sched_due");

    var node = new TaskNode
    {
        Id = id, Name = name, Type = TaskType.SUMMARY,
        Wbs = wbsPrefix, Duration = duration,
        ParentId = parentId, SortOrder = wbsIndex,
        PlannedEndDate = FmtDate(dueDate),
    };

    var relationships = wbsItem.SelectSingleNode("Relationships");
    if (relationships == null) return node;

    int order = 0;
    foreach (System.Xml.XmlNode rel in relationships.ChildNodes)
    {
        if (rel.NodeType != System.Xml.XmlNodeType.Element) continue;
        var relType = rel.Attributes?["type"]?.Value ?? "";

        if (relType == "Sub WBS")
        {
            var childWbs = rel.SelectSingleNode("related_id/Item");
            if (childWbs != null)
            {
                var child = BuildWbsNode(childWbs, id, $"{wbsPrefix}.{order + 1}");
                child.SortOrder = order++;
                node.Children.Add(child);
            }
        }
        else if (relType == "WBS Activity2")
        {
            var actItem = rel.SelectSingleNode("related_id/Item");
            if (actItem != null)
            {
                var act = BuildActivityNode(actItem, id);
                act.SortOrder = order++;
                node.Children.Add(act);
            }
        }
    }
    return node;
}`

const buildAct = `private static TaskNode BuildActivityNode(
    System.Xml.XmlNode actItem, string parentId)
{
    var id = actItem.Attributes?["id"]?.Value ?? "";
    var name = actItem.SelectSingleNode("id")?.Attributes?["keyed_name"]?.Value ?? "";
    var isMilestone = GetXmlString(actItem, "is_milestone") == "1";
    var duration = GetXmlInt(actItem, "expected_duration", 0);
    var percentCompl = GetXmlInt(actItem, "percent_compl", 0);
    var dateStart = GetXmlString(actItem, "date_start_sched");
    var dateDue = GetXmlString(actItem, "date_due_sched");
    var leadRole = GetXmlString(actItem, "lead_role");

    // managed_by_id 可能是空值，需检查 is_null 属性再取 id
    var managedByElem = actItem.SelectSingleNode("managed_by_id");
    var managedByName = managedByElem?.Attributes?["keyed_name"]?.Value ?? "";
    var managedById = (managedByElem?.Attributes?["is_null"]?.Value == "1")
        ? "" : (managedByElem?.InnerText ?? "");

    return new TaskNode
    {
        Id = id,
        Name = name,
        Type = isMilestone ? TaskType.MILESTONE : TaskType.TASK,
        IsMilestone = isMilestone,
        Duration = duration,
        PercentComplete = percentCompl,
        ParentId = parentId,
        PlannedStartDate = FmtDate(dateStart),
        PlannedEndDate = FmtDate(dateDue),
        AssignedTo = string.IsNullOrEmpty(managedByName) ? null : new TeamMember
        {
            Id = managedById,
            Name = managedByName,
            Role = leadRole
        },
    };
}`

const taskNodeModel = `public enum TaskType { TASK = 0, MILESTONE = 1, SUMMARY = 2 }
public enum DependencyType { FS = 0, SS = 1, FF = 2, SF = 3 }

public class TeamMember
{
    [JsonPropertyName("id")]   public string Id { get; set; } = string.Empty;
    [JsonPropertyName("name")] public string Name { get; set; } = string.Empty;
    [JsonPropertyName("role")] public string Role { get; set; } = string.Empty;
}

public class TaskPredecessor
{
    [JsonPropertyName("id")]             public string Id { get; set; } = string.Empty;
    [JsonPropertyName("predecessorId")]  public string PredecessorId { get; set; } = string.Empty;
    [JsonPropertyName("dependencyType")] public DependencyType DependencyType { get; set; } = DependencyType.FS;
    [JsonPropertyName("lagDays")]        public int LagDays { get; set; }
}

// 自引用树节点，Children 实现递归嵌套
public class TaskNode
{
    [JsonPropertyName("id")]               public string Id { get; set; } = string.Empty;
    [JsonPropertyName("wbs")]              public string Wbs { get; set; } = string.Empty;   // 如 "1.2.3"
    [JsonPropertyName("name")]             public string Name { get; set; } = string.Empty;
    [JsonPropertyName("type")]             public TaskType Type { get; set; } = TaskType.TASK;
    [JsonPropertyName("duration")]         public int Duration { get; set; }
    [JsonPropertyName("percentComplete")]  public int PercentComplete { get; set; }
    [JsonPropertyName("isMilestone")]      public bool IsMilestone { get; set; }
    [JsonPropertyName("plannedStartDate")] public string PlannedStartDate { get; set; } = string.Empty;
    [JsonPropertyName("plannedEndDate")]   public string PlannedEndDate { get; set; } = string.Empty;
    [JsonPropertyName("assignedTo")]       public TeamMember? AssignedTo { get; set; }
    [JsonPropertyName("predecessors")]     public List<TaskPredecessor> Predecessors { get; set; } = new();
    [JsonPropertyName("children")]         public List<TaskNode> Children { get; set; } = new();  // 自引用
    [JsonPropertyName("parentId")]         public string? ParentId { get; set; }
    [JsonPropertyName("sortOrder")]        public int SortOrder { get; set; }
}`

const jsonSample = `[
  {
    "id": "WBS-ROOT",
    "wbs": "0",
    "name": "XYPLM 项目计划",
    "type": 2,
    "duration": 120,
    "plannedEndDate": "2026-12-31",
    "children": [
      {
        "id": "WBS-01",
        "wbs": "0.1",
        "name": "设计阶段",
        "type": 2,
        "children": [
          {
            "id": "ACT-1001",
            "wbs": "",
            "name": "需求评审",
            "type": 1,
            "isMilestone": true,
            "duration": 0,
            "percentComplete": 100,
            "plannedStartDate": "2026-07-01",
            "plannedEndDate": "2026-07-01",
            "assignedTo": { "id": "ID-01", "name": "张三", "role": "项目经理" },
            "predecessors": [],
            "children": []
          },
          {
            "id": "ACT-1002",
            "wbs": "",
            "name": "概要设计",
            "type": 0,
            "duration": 10,
            "percentComplete": 40,
            "plannedStartDate": "2026-07-02",
            "plannedEndDate": "2026-07-15",
            "assignedTo": { "id": "ID-02", "name": "李四", "role": "系统架构师" },
            "predecessors": [
              { "id": "PRED-1", "predecessorId": "ACT-1001", "dependencyType": 0, "lagDays": 0 }
            ],
            "children": []
          }
        ]
      }
    ]
  }
]`

const fullMethod = `public static void IC_GetProjectTree()
{
    var inn = conn.Login().getInnovator();
    var item = inn.newItem();

    // 1. 获取项目信息
    var project = inn.newItem("Project", "get");
    project.setProperty("id", item.getProperty("id", "48FD7542EE3047EC9988E2389956BCBE"));
    project.setAttribute("select",
        "id,project_number,state,project_number,date_start_target," +
        "date_due_target,date_start_sched,date_due_sched,wbs_id(rollup_percent_compl)");
    project = project.apply();

    // 2. 创建基线快照对象
    var add_baselineItem = inn.newItem("IC_Project_BaseLine", "add");
    var baseLinItemName = item.getProperty("name", "");
    if (baseLinItemName == "")
        baseLinItemName = project.getProperty("name") + "基线快照-最初";
    add_baselineItem.setProperty("name", baseLinItemName);

    // 3. 组装快照元数据
    var snapshot = new Snapshot()
    {
        Id = add_baselineItem.getID(),
        Name = baseLinItemName,
        Description = item.getProperty("description", "第一次启动自动生成保存"),
        CreatedAt = DateTime.Now.ToString("yyyy-MM-dd"),
        ProjectNumber = project.getProperty("project_number", ""),
        Status = project.getProperty("state", ""),
        TargetStartDate = DateTime.Parse(project.getProperty("date_start_target", "")).ToString("yyyy-MM-dd"),
        TargetEndDate = DateTime.Parse(project.getProperty("date_due_target", "")).ToString("yyyy-MM-dd"),
        ProjectedEndDate = DateTime.Parse(project.getProperty("date_due_sched", "")).ToString("yyyy-MM-dd"),
        OverallPercentComplete = Convert.ToInt32(
            project.getPropertyItem("wbs_id").getProperty("rollup_percent_compl", "0"))
    };

    // 4. AML 获取完整 WBS 树
    var wbs_treeAML = $"<AML>...(见 2.1 节)...</AML>";
    var wbs_treeItem = inn.applyAML(wbs_treeAML);
    var wbs_nodeXML = wbs_treeItem.node.OuterXml;

    // 5. 递归构建排序任务树
    var taskTree = BuildTaskTreeFromXml(wbs_nodeXML);

    // 6. 批量查询并附加前置关系
    var activityIds = new List<string>();
    CollectActivityIds(taskTree, activityIds);
    if (activityIds.Count > 0)
    {
        var predAML = $"<AML>...(见 2.2 节)...</AML>";
        var predResult = inn.applyAML(predAML);
        if (predResult.node != null)
        {
            var predMap = BuildPredecessorMap(predResult.node);
            AttachPredecessors(taskTree, predMap);
        }
    }

    snapshot.TaskTree = taskTree;

    // 7. 序列化输出
    var jsonOptions = new System.Text.Json.JsonSerializerOptions
    {
        WriteIndented = true,
        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };
    var jsonStr = System.Text.Json.JsonSerializer.Serialize(taskTree, jsonOptions);
    Console.WriteLine(jsonStr);
}`
</script>
