<template>
  <article class="doc-content">
    <h1>常用代码片段</h1>
    <blockquote>
      <p>汇总 Aras 服务端开发中最常用的代码片段，覆盖查询、新增、修改、权限、SQL、JSON 等场景。可直接复制到 Method 中调整使用。</p>
    </blockquote>

    <h2>一、基础查询</h2>
    <pre v-pre><code class="language-csharp">// 1. 按属性查询
var item = inn.newItem("Part", "get");
item.setAttribute("select", "id,name,item_number,current_state");
item.setProperty("item_number", "P-001");
item = item.apply();

// 2. 模糊查询
item.setProperty("name", "*Bolt*");
item.setPropertyCondition("name", "like");

// 3. 日期范围查询
item.setProperty("created_on", "2025-01-01T00:00:00");
item.setPropertyCondition("created_on", "ge");
item.setProperty("created_on_end", "2025-12-31T23:59:59");
item.setPropertyCondition("created_on_end", "le");

// 4. 按 ID 查询
item.setProperty("id", "A1B2C3D4E5F6...");</code></pre>

    <h2>二、遍历结果集</h2>
    <pre v-pre><code class="language-csharp">var result = item.apply();
if (result.isError())
    return inn.newError(result.getErrorString());

for (int i = 0; i < result.getItemCount(); i++)
{
    var row = result.getItemByIndex(i);
    string id = row.getProperty("id", "");
    string name = row.getProperty("name", "");
    // ...
}</code></pre>

    <h2>三、新增 + 添加关系</h2>
    <pre v-pre><code class="language-csharp">var main = inn.newItem("IC_Working_Hour", "add");
main.setProperty("ic_project", projectId);
main.setProperty("ic_monday", "8");

// 添加关系子项
for (int i = 0; i < 7; i++) {
    var detail = inn.newItem("IC_Hour_Details", "add");
    detail.setProperty("ic_hours", hours[i].ToString());
    detail.setProperty("sort_order", (i + 1).ToString());
    main.addRelationship(detail);
}

main = main.apply();
if (main.isError())
    return inn.newError(main.getErrorString());</code></pre>

    <h2>四、修改 + 删除后重建关系</h2>
    <pre v-pre><code class="language-csharp">// 修改主记录
var edit = inn.newItem("IC_Working_Hour", "edit");
edit.setProperty("ic_monday", "10");
edit.setAttribute("where",
    $"IC_Working_Hour.id='{recordId}'");
edit = edit.apply();

// 删除原有明细 → 重新添加
var delDetails = inn.newItem("IC_Hour_Details", "delete");
delDetails.setAttribute("where",
    $"IC_Hour_Details.source_id='{recordId}'");
delDetails.apply();

foreach (var h in hours) {
    var detail = inn.newItem("IC_Hour_Details", "add");
    detail.setProperty("ic_hours", h.ToString());
    edit.addRelationship(detail);
}
edit = edit.apply("edit");</code></pre>

    <h2>五、SQL 查询</h2>
    <pre v-pre><code class="language-csharp">Aras.Server.Security.Identity plmIdentity =
    Aras.Server.Security.Identity.GetByName("Aras PLM");
bool PermissionWasSet =
    Aras.Server.Security.Permissions.GrantIdentity(plmIdentity);

try {
    string sql = string.Format(
        "select u.KEYED_NAME, p.NAME " +
        "from innovator.IC_Hour_Details hd " +
        "left join innovator.[USER] u on u.ID = hd.IC_USER " +
        "left join innovator.PROJECT p on p.ID = hd.IC_PROJECT " +
        "where hd.IC_DATE between '{0}' and '{1}'",
        startDate, endDate);

    var result = inn.applySQL(sql);
    // result 为 XML 字符串，需手动解析
    return inn.newResult(result);
} finally {
    if (PermissionWasSet)
        Aras.Server.Security.Permissions.RevokeIdentity(plmIdentity);
}</code></pre>

    <h2>六、JSON 序列化/反序列化</h2>
    <pre v-pre><code class="language-csharp">// 反序列化：前端传入的 JSON
var jsonData = this.getProperty("projectData", "");
var projectData = Newtonsoft.Json.JsonConvert
    .DeserializeObject&lt;HoursProject&gt;(jsonData);

// 序列化：返回 JSON 给前端
return inn.newResult(Newtonsoft.Json.JsonConvert
    .SerializeObject(new {
        success = true,
        count = result.getItemCount(),
        data = itemList
    }));</code></pre>

    <h2>七、生命周期推进</h2>
    <pre v-pre><code class="language-csharp">var item = inn.newItem("Part", "get");
item.setProperty("id", "xxx");
item = item.apply();

// 推进到 Released，带审批备注
item = item.promote("Released", "设计评审通过，准予发布");

// 获取当前状态
string state = item.getProperty("state", "");</code></pre>

    <h2>八、查重</h2>
    <pre v-pre><code class="language-csharp">var check = inn.newItem("IC_Working_Hour", "get");
check.setProperty("ic_project", projectId);
check.setProperty("created_by_id", inn.getUserID());
check = check.apply();

if (check.getItemCount() > 0)
    return inn.newError("该项目的工时数据已存在，不允许重复提交");</code></pre>

    <h2>九、生成新 ID</h2>
    <pre v-pre><code class="language-csharp">string newId = inn.getNewID();  // 生成 GUID
// 可用于预设 Item ID（在 add 操作前设置）
var item = inn.newItem("Part", "add");
item.setProperty("id", newId);</code></pre>

    <h2>十、获取当前用户信息</h2>
    <pre v-pre><code class="language-csharp">var userId = inn.getUserID();

// 获取用户详情
var user = inn.newItem("User", "get");
user.setAttribute("select", "id,keyed_name,owned_by_id");
user.setProperty("id", userId);
user = user.apply();
string userName = user.getProperty("keyed_name", "");
string identityId = user.getProperty("owned_by_id", "");</code></pre>

    <h2>十一、批量审核</h2>
    <pre v-pre><code class="language-csharp">var reviewsJson = this.getProperty("HoursReviewList", "[]");
var reviews = Newtonsoft.Json.JsonConvert
    .DeserializeObject&lt;List&lt;ReviewItem&gt;&gt;(reviewsJson);
var type = this.getProperty("methodtype", "pass");

foreach (var review in reviews) {
    var item = inn.newItem("IC_Working_Hour", "get");
    item.setProperty("id", review.id);
    item.setAttribute("select", "state,id");
    item = item.apply();

    if (item.getItemCount() == 0) continue;

    string state = item.getProperty("state", "");
    if (type == "pass" && state == "Start")
        item.promote("pass", "审核通过");
    else if (type == "reject" && state == "Start")
        item.promote("reject", "审核驳回");
}</code></pre>

    <h2>十二、C# 注意事项</h2>
    <table>
      <thead><tr><th>注意点</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>字符串为空</td><td>始终用 <code>getProperty(name, "")</code> 并提供默认值</td></tr>
        <tr><td>数字转换</td><td><code>int.Parse()</code> 可能抛异常，用 <code>int.TryParse()</code> 或带默认值的 <code>Convert.ToInt32()</code></td></tr>
        <tr><td>日期格式</td><td>使用 <code>yyyy-MM-ddTHH:mm:ss</code> 格式（ISO 8601 不含时区）</td></tr>
        <tr><td>字符串比较</td><td>推荐 <code>string.Equals(a, b, StringComparison.OrdinalIgnoreCase)</code></td></tr>
        <tr><td>循环内应用</td><td>循环内每次 <code>apply()</code> 都是一次网络往返，批量操作应合并</td></tr>
      </tbody>
    </table>
  </article>
</template>
