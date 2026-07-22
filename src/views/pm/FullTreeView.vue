<template>
  <article class="doc-content">
    <h1>????????WBS + Activity2 ?????????</h1>
    <p>
      ??????? Aras Innovator ? <code>Project</code> ???<strong>????????? WBS ???????? Activity2 ??</strong>?
      ?????? <code>prev_item</code> ??????????? <code>TaskNode</code> ???? <code>Predecessor</code> ?????
      ?????? JSON ????????????????<strong>? ?????? WBS ? Activity2 ??</strong>?<strong>? ?????????????????</strong>??????????????
    </p>

    <blockquote>
      <p><strong>?????</strong>?<strong>?? AML ??</strong>????????????????+ <strong>??????</strong>???????????????+ <strong>?? JSON ???</strong>?? Aras ???????????????????</p>
    </blockquote>

    <h2>???????</h2>
    <ol>
      <li><strong>??????</strong>?? <code>Project</code> id ????? <code>wbs_id</code>?????????????</li>
      <li><strong>?????????????</strong>??? <code>GetItemRepeatConfig</code> AML ??????? <code>WBS Element</code> ?? + ?? <code>WBS Activity2</code> ?????</li>
      <li><strong>?????????</strong>?<code>BuildTaskTreeFromXml</code> ?? <code>prev_item</code> ???????????? <code>TaskNode</code> ??</li>
      <li><strong>????????????</strong>????? Activity2 id?? <code>source_id condition='in'</code> ???? <code>Predecessor</code>????????</li>
      <li><strong>?????</strong>?<code>System.Text.Json</code> ???? JSON???????</li>
    </ol>

    <h2>???????????? WBS ? Activity2 ??</h2>

    <h3>2.1 ?? AML ????GetItemRepeatConfig</h3>
    <p>
      ??? <code>action='GetItemRepeatConfig'</code> ?? <code>repeatProp='related_id' repeatTimes='0'</code>?
      <code>repeatTimes='0'</code> ??<strong>????</strong>? <code>Sub WBS</code> ????????????? WBS ????????? XML??????????? N+1 ???
      ?????? <code>action='get'</code> ? <code>WBS Activity2</code> ?<strong>?? WBS ???????</strong>?????? select ????????
    </p>
    <pre><code class="language-csharp">{{ amlWbs }}</code></pre>
    <ul>
      <li><code>Sub WBS</code> ? select ????? <code>id,source_id,related_id</code>????? WBS ????????????</li>
      <li><code>WBS Activity2</code> ? <code>related_id(...)</code> ?? <code>prev_item</code>?<code>managed_by_id</code>?<code>lead_role</code>??????<code>percent_compl</code>?<code>is_milestone</code> ??????????????????????</li>
      <li><strong>????????? <code>Predecessor</code></strong>???????????????????? WBS ??????????????????????? id ????</li>
    </ul>

    <h3>2.2 ???????????</h3>
    <p>
      ?????? <code>CollectActivityIds</code> ??????????Activity2?? id?????
      <code>source_id condition='in'</code> ? AML <strong>??</strong>????????? <code>Predecessor</code>?
      ?? in ????????????????????? N+1?
    </p>
    <pre><code class="language-csharp">{{ amlPred }}</code></pre>

    <h3>2.3 ?? / ?? / ??</h3>
    <p>
      <code>BuildPredecessorMap</code> ???????? <code>sourceId ? List&lt;TaskPredecessor&gt;</code> ????
      ?? Aras ? <code>precedence_type</code> ????<code>SS/FF/SF</code>??? <code>FS</code>???? <code>DependencyType</code> ???
      <code>AttachPredecessors</code> ???????? id ????????? <code>TaskNode.Predecessors</code>?
    </p>
    <pre><code class="language-csharp">{{ predImpl }}</code></pre>

    <h2>?????????????????????</h2>

    <h3>3.1 ???????</h3>
    <p>
      <code>BuildTaskTreeFromXml</code> ????????????????<strong>???????????</strong>?
      ??? <code>SortRelationships</code> ????? <code>Relationships</code> ? <code>prev_item</code> ?????????
      ??? <code>BuildWbsNode</code> ?? XML ????????????????????????
    </p>
    <pre><code class="language-csharp">{{ buildEntry }}</code></pre>

    <h3>3.2 ????prev_item ??????</h3>
    <p>
      Aras ??? <code>Relationships</code> ?????<strong>???</strong>??????????????? item ? <code>prev_item</code> ?????
      ?? Aras ?? <code>SortItems</code> ???<code>WBS</code> ? <code>Activity2</code> <strong>????? prev_item ?</strong>?
      ?????????<code>prev_item</code> ??????? <code>InsertBefore</code> ????????????????? <code>WBS Element</code> ???????????
    </p>
    <pre><code class="language-csharp">{{ sortRel }}</code></pre>
    <ul>
      <li><code>typeXP = "[@type='WBS Activity2' or @type='Sub WBS']"</code>?????????????????????????</li>
      <li>???? <code>[not(prev_item) or prev_item='']</code> ?????? <code>@action='delete'</code> ?????</li>
      <li>??????????? id ? XPath ?? <code>prev_item='{prevId}'</code> ????????????????? <strong>O(n)</strong> ??????</li>
    </ul>

    <h3>3.3 ???????? TaskNode</h3>
    <p>
      XML ????<code>BuildWbsNode</code> ???? <code>Relationships</code>?<code>Sub WBS</code> ?????????
      ??????? <code>wbs</code> ???? <code>0.1.2</code>??<code>WBS Activity2</code> ?? <code>BuildActivityNode</code> ?????
      <code>SortOrder</code> ???????????????????????
    </p>
    <pre><code class="language-csharp">{{ buildWbs }}</code></pre>

    <h3>3.4 ???Activity2 ? TaskNode</h3>
    <p>
      <code>BuildActivityNode</code> ???????? <code>TaskNode</code>?<code>is_milestone=='1'</code> ????????? <code>Type</code>?
      <code>managed_by_id</code> ??? <code>is_null</code> ?? <code>InnerText</code>??? <code>keyed_name</code> ??? <code>TeamMember</code> ????
    </p>
    <pre><code class="language-csharp">{{ buildAct }}</code></pre>

    <h2>???????????</h2>

    <h3>4.1 ?????</h3>
    <p>
      ?????? <code>taskTree</code> ?? <code>Snapshot</code>??? <code>System.Text.Json</code> ????
      <code>WriteIndented = true</code> ?????<code>JavaScriptEncoder.UnsafeRelaxedJsonEscaping</code> ?<strong>????????</strong>?????? <code>\uXXXX</code>?
      ???????? <code>Console.WriteLine</code> ????? JSON ???????????/????????? <code>taskTree</code> ??? <code>Snapshot</code>?
    </p>
    <pre><code class="language-csharp">{{ outputJson }}</code></pre>
    <ul>
      <li>????????? <code>[JsonPropertyName]</code> ???? <strong>camelCase</strong>?? <code>plannedStartDate</code>?<code>percentComplete</code>????? TS ?????</li>
      <li>????? <code>SnapshotSummary.From(snapshot)</code> ???<strong>???? taskTree</strong> ???????????? <code>ComparePayload</code> ???????????</li>
    </ul>

    <h3>4.2 ?????TaskNode ??????</h3>
    <p>
      ?????? <code>TaskNode</code>??? <code>Children</code> ?????????<code>Type</code> ?? <code>TASK / MILESTONE / SUMMARY</code>?
      <code>Predecessors</code> ???????<code>AssignedTo</code> ?????????????????????
    </p>
    <pre><code class="language-csharp">{{ taskNodeModel }}</code></pre>

    <h3>4.3 ?? JSON ????</h3>
    <p>????????<strong>????</strong>??????????? WBS ??<code>type=2</code> ????? <code>children</code> ?????????????? <code>assignedTo</code> ? <code>predecessors</code>?</p>
    <pre><code class="language-json">{{ jsonSample }}</code></pre>

    <h2>????</h2>
    <table>
      <thead>
        <tr><th>??</th><th>??</th><th>???</th></tr>
      </thead>
      <tbody>
        <tr><td>???</td><td>GetItemRepeatConfig ????</td><td><code>repeatTimes='0'</code> ???? Sub WBS??? get ?? Activity2</td></tr>
        <tr><td>???</td><td>SortRelationships ????</td><td>? prev_item ?? O(n) ???WBS ? Activity ?????</td></tr>
        <tr><td>???</td><td>BuildWbsNode ????</td><td>XML ?????????? wbs ???SortOrder ??</td></tr>
        <tr><td>???</td><td>Predecessor ?? in ??</td><td>?? Activity id ??????? N+1</td></tr>
        <tr><td>???</td><td>?? + ????</td><td>sourceId??????precedence_type ????</td></tr>
        <tr><td>??</td><td>System.Text.Json ???</td><td>?? + ????? + camelCase ???</td></tr>
      </tbody>
    </table>

    <h3>????</h3>
    <ul>
      <li><strong>?? Predecessor ??</strong>????????????????????????????? id ?? in ??????</li>
      <li><strong>????????</strong>?????????????????????????????????bug ???</li>
      <li><strong>??? GetItemRepeatConfig</strong>?????????? Aras ?????????????????? <code>apply</code> ?????</li>
      <li><strong>?? managed_by_id ? is_null</strong>?Aras ???? <code>InnerText</code> ???? id????? <code>is_null</code> ??????????????</li>
    </ul>

    <blockquote>
      <p><strong>????</strong>?? AML ????? + ??????????????????????? + ???????????????????????????????? diff ?????????</p>
    </blockquote>
  </article>
</template>

<script setup lang="ts">
const amlWbs = `var wbs_treeAML =
    $"<AML>" +
    $"   <Item type='WBS Element' select='id,rollup_date_sched_due,rollup_date_sched_due,rollup_duration,proj_num,prev_item,wbs_index' action='GetItemRepeatConfig' id='{project.getProperty("wbs_id", "")}'>" +
    $"       <Relationships>" +
    $"           <Item type='Sub WBS' select='id,source_id,related_id' repeatProp='related_id' repeatTimes='0'/>" +
    $"           <Item type='WBS Activity2' action='get' select='id,source_id,related_id(id,proj_num,prev_item,managed_by_id,lead_role,date_start_sched,date_due_sched,percent_compl,expected_duration,is_milestone)'/>" +
    $"       </Relationships>" +
    $"   </Item>" +
    $"</AML>";
var wbs_treeItem = inn.applyAML(wbs_treeAML);
var wbs_nodeXML = wbs_treeItem.node.OuterXml;`

const amlPred = `var activityIds = new List<string>();
CollectActivityIds(taskTree, activityIds);
if (activityIds.Count > 0)
{
    var predAML =
        $"<AML>" +
        $"   <Item type='Predecessor' action='get' select='id,source_id,related_id(id,keyed_name),precedence_type,lead_time'>" +
        $"       <source_id condition='in'>{string.Join(",", activityIds)}</source_id>" +
        $"   </Item>" +
        $"   </AML>";
    var predResult = inn.applyAML(predAML);
    if (predResult.node != null)
    {
        var predMap = BuildPredecessorMap(predResult.node);
        AttachPredecessors(taskTree, predMap);
    }
}`

const predImpl = `private static void CollectActivityIds(List<TaskNode> nodes, List<string> ids)
{
    foreach (var node in nodes)
    {
        if (node.Type != TaskType.SUMMARY)
            ids.Add(node.Id);
        if (node.Children.Count > 0)
            CollectActivityIds(node.Children, ids);
    }
}

private static Dictionary<string, List<TaskPredecessor>> BuildPredecessorMap(System.Xml.XmlNode predRoot)
{
    var map = new Dictionary<string, List<TaskPredecessor>>();
    var predNodes = predRoot.SelectNodes("//Item[@type='Predecessor']");
    if (predNodes == null) return map;

    foreach (System.Xml.XmlNode predItem in predNodes)
    {
        var sourceId = GetXmlString(predItem, "source_id");
        if (string.IsNullOrEmpty(sourceId)) continue;

        var relatedIdElem = predItem.SelectSingleNode("related_id");
        var predActivityId = (relatedIdElem?.Attributes?["is_null"]?.Value == "1")
            ? "" : (relatedIdElem?.InnerText?.Trim() ?? "");

        var depType = GetXmlString(predItem, "precedence_type") switch
        {
            "SS" => DependencyType.SS,
            "FF" => DependencyType.FF,
            "SF" => DependencyType.SF,
            _ => DependencyType.FS
        };

        var pred = new TaskPredecessor
        {
            Id = predItem.Attributes?["id"]?.Value ?? "",
            PredecessorId = predActivityId,
            DependencyType = depType,
            LagDays = GetXmlInt(predItem, "lead_time", 0)
        };

        if (!map.ContainsKey(sourceId))
            map[sourceId] = new List<TaskPredecessor>();
        map[sourceId].Add(pred);
    }
    return map;
}

private static void AttachPredecessors(List<TaskNode> nodes, Dictionary<string, List<TaskPredecessor>> predMap)
{
    foreach (var node in nodes)
    {
        if (predMap.TryGetValue(node.Id, out var preds))
            node.Predecessors = preds;
        if (node.Children.Count > 0)
            AttachPredecessors(node.Children, predMap);
    }
}`

const buildEntry = `public static List<TaskNode> BuildTaskTreeFromXml(string wbsXml)
{
    if (string.IsNullOrWhiteSpace(wbsXml)) return new List<TaskNode>();

    var doc = new System.Xml.XmlDocument();
    doc.LoadXml(wbsXml);
    var rootNode = doc.DocumentElement;
    if (rootNode == null) return new List<TaskNode>();

    // ????????????? Relationships
    SortRelationships(rootNode);
    // ???????? TaskNode ?
    var root = BuildWbsNode(rootNode, null, "0");
    return new List<TaskNode> { root };
}`

const sortRel = `private static void SortRelationships(System.Xml.XmlNode parentNode)
{
    if (parentNode == null) return;

    var relationshipsNode = parentNode.SelectSingleNode("Relationships");
    if (relationshipsNode == null) return;

    const string typeXP = "[@type='WBS Activity2' or @type='Sub WBS']";

    // ????prev_item ?????????
    var nextItem = parentNode.SelectSingleNode(
        $"Relationships/Item{typeXP}[not(@action='delete')]/related_id/Item[not(prev_item) or prev_item='']");

    var beforeRel = relationshipsNode.FirstChild;

    while (nextItem != null)
    {
        var nextRel = nextItem.ParentNode?.ParentNode;
        if (nextRel == null) break;

        // ??????? WBS Element
        if (nextItem.Attributes?["type"]?.Value == "WBS Element")
        {
            SortRelationships(nextItem);
        }

        // ? nextRel ??? beforeRel ????????
        var prevRel = relationshipsNode.InsertBefore(nextRel, beforeRel);
        beforeRel = prevRel?.NextSibling;

        var prevItemNode = prevRel?.SelectSingleNode("related_id/Item");
        if (prevItemNode == null) break;

        var prevId = prevItemNode.Attributes?["id"]?.Value;
        if (string.IsNullOrEmpty(prevId)) break;

        // ???????
        nextItem = parentNode.SelectSingleNode(
            $"Relationships/Item{typeXP}/related_id/Item[prev_item='{prevId}']");
    }
}`

const buildWbs = `private static TaskNode BuildWbsNode(System.Xml.XmlNode wbsItem, string? parentId, string wbsPrefix)
{
    var id = wbsItem.Attributes?["id"]?.Value ?? "";
    var name = wbsItem.SelectSingleNode("id")?.Attributes?["keyed_name"]?.Value ?? "";
    var wbsIndex = GetXmlInt(wbsItem, "wbs_index", 0);
    var duration = GetXmlInt(wbsItem, "rollup_duration", 0);
    var dueDate = GetXmlString(wbsItem, "rollup_date_sched_due");

    var node = new TaskNode
    {
        Id = id,
        Name = name,
        Type = TaskType.SUMMARY,
        Wbs = wbsPrefix,
        Duration = duration,
        ParentId = parentId,
        SortOrder = wbsIndex,
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
                var childIndex = GetXmlInt(childWbs, "wbs_index", order);
                var childNode = BuildWbsNode(childWbs, id, $"{wbsPrefix}.{childIndex}");
                childNode.SortOrder = order++;
                node.Children.Add(childNode);
            }
        }
        else if (relType == "WBS Activity2")
        {
            var actItem = rel.SelectSingleNode("related_id/Item");
            if (actItem != null)
            {
                var actNode = BuildActivityNode(actItem, id);
                actNode.SortOrder = order++;
                node.Children.Add(actNode);
            }
        }
    }
    return node;
}`

const buildAct = `private static TaskNode BuildActivityNode(System.Xml.XmlNode actItem, string parentId)
{
    var id = actItem.Attributes?["id"]?.Value ?? "";
    var name = actItem.SelectSingleNode("id")?.Attributes?["keyed_name"]?.Value ?? "";
    var isMilestone = GetXmlString(actItem, "is_milestone") == "1";
    var duration = GetXmlInt(actItem, "expected_duration", 0);
    var percentCompl = GetXmlInt(actItem, "percent_compl", 0);
    var dateStart = GetXmlString(actItem, "date_start_sched");
    var dateDue = GetXmlString(actItem, "date_due_sched");
    var leadRole = GetXmlString(actItem, "lead_role");

    // managed_by_id ??????? is_null ?????????? id
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

const outputJson = `snapshot.TaskTree = taskTree;

// ?? JSON ????
var jsonOptions = new System.Text.Json.JsonSerializerOptions
{
    WriteIndented = true,
    Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
};
var jsonStr = System.Text.Json.JsonSerializer.Serialize(taskTree, jsonOptions);
Console.WriteLine(jsonStr);`

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

// ?????????? Children ????????
public class TaskNode
{
    [JsonPropertyName("id")]               public string Id { get; set; } = string.Empty;
    [JsonPropertyName("wbs")]              public string Wbs { get; set; } = string.Empty;   // ? "1.2.3"
    [JsonPropertyName("name")]             public string Name { get; set; } = string.Empty;
    [JsonPropertyName("type")]             public TaskType Type { get; set; } = TaskType.TASK;
    [JsonPropertyName("duration")]         public int Duration { get; set; }
    [JsonPropertyName("percentComplete")]  public int PercentComplete { get; set; }
    [JsonPropertyName("isMilestone")]      public bool IsMilestone { get; set; }
    [JsonPropertyName("plannedStartDate")] public string PlannedStartDate { get; set; } = string.Empty;
    [JsonPropertyName("plannedEndDate")]   public string PlannedEndDate { get; set; } = string.Empty;
    [JsonPropertyName("assignedTo")]       public TeamMember? AssignedTo { get; set; }
    [JsonPropertyName("predecessors")]     public List<TaskPredecessor> Predecessors { get; set; } = new();
    [JsonPropertyName("children")]         public List<TaskNode> Children { get; set; } = new();  // ?????
    [JsonPropertyName("parentId")]         public string? ParentId { get; set; }
    [JsonPropertyName("sortOrder")]        public int SortOrder { get; set; }
}`

const jsonSample = `[
  {
    "id": "WBS-ROOT",
    "wbs": "0",
    "name": "XYPLM ????",
    "type": 2,
    "duration": 120,
    "plannedEndDate": "2026-12-31",
    "children": [
      {
        "id": "WBS-01",
        "wbs": "0.1",
        "name": "????",
        "type": 2,
        "children": [
          {
            "id": "ACT-1001",
            "wbs": "",
            "name": "????",
            "type": 1,
            "isMilestone": true,
            "duration": 0,
            "percentComplete": 100,
            "plannedStartDate": "2026-07-01",
            "plannedEndDate": "2026-07-01",
            "assignedTo": { "id": "ID-01", "name": "??", "role": "????" },
            "predecessors": [],
            "children": []
          },
          {
            "id": "ACT-1002",
            "wbs": "",
            "name": "????",
            "type": 0,
            "duration": 10,
            "percentComplete": 40,
            "plannedStartDate": "2026-07-02",
            "plannedEndDate": "2026-07-15",
            "assignedTo": { "id": "ID-02", "name": "??", "role": "?????" },
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
</script>
