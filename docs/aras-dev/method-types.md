---
title: Method 类型与代码模板
---

<h1>Method 类型与代码模板</h1>
<blockquote>
<p><strong>Method</strong> 是 Aras Innovator 中存储和执行<strong>业务逻辑</strong>的核心机制。每个 Method 有名称、代码（脚本）和类型（语言/运行环境），可以通过 Action、Server Event、工具栏按钮等多种方式触发。</p>
</blockquote>

<h2>一、Method 类型分类</h2>
<table>
<thead><tr><th>类型</th><th>运行环境</th><th>语言</th><th>典型场景</th></tr></thead>
<tbody>
<tr><td><code>server</code></td><td>IIS 服务端</td><td>C# / VB.NET</td><td>业务逻辑、数据运算、权限控制（最常用）</td></tr>
<tr><td><code>client</code></td><td>浏览器</td><td>JavaScript</td><td>UI 交互、表单验证、动态界面</td></tr>
<tr><td><code>clientGlobal</code></td><td>浏览器全局</td><td>JavaScript</td><td>全局工具函数、跨页面共享逻辑</td></tr>
<tr><td><code>serverGlobal</code></td><td>服务器全局</td><td>C#</td><td>全局服务端函数库</td></tr>
</tbody>
</table>

<h2>二、服务端 Method 代码模板</h2>
<h3>2.1 基础模板</h3>

```csharp
// Method: IC_GetPartInfo
// 类型: server
// 用途: 按料号查询零件信息并返回 JSON

string partNumber = this.getProperty("part_number", "");

if (string.IsNullOrEmpty(partNumber))
    return this.getInnovator().newError("part_number 参数不能为空");

var inn = this.newInnovator();

var part = inn.newItem("Part", "get");
part.setAttribute("select", "id,name,item_number,current_state");
part.setProperty("item_number", partNumber);
part = part.apply();

if (part.isError())
    return inn.newError(part.getErrorString());

if (part.getItemCount() == 0) {
    var result = inn.newResult("");
    result.setProperty("found", "false");
    return result;
}

// 组装 JSON 返回
var p = part.getItemByIndex(0);
var json = "{" +
    $"\"id\":\"{p.getProperty("id","")}\"," +
    $"\"name\":\"{p.getProperty("name","")}\"," +
    $"\"state\":\"{p.getProperty("current_state","")}\"" +
    "}";
return inn.newResult(json);
```


<h3>2.2 带权限提升的模板（推荐）</h3>

```csharp
// 所有涉及 applySQL 或跨 Identity 操作的 Method 使用此模板
Aras.Server.Security.Identity plmIdentity =
    Aras.Server.Security.Identity.GetByName("Aras PLM");
bool PermissionWasSet =
    Aras.Server.Security.Permissions.GrantIdentity(plmIdentity);

try
{
    // ===== 业务逻辑 =====
    var inn = this.newInnovator();

    // SQL JOIN 查询
    string sql = "select p.id, p.name from innovator.PART p ...";
    var sqlResult = inn.applySQL(sql);

    // 返回结果
    return inn.newResult(ProcessSqlResult(sqlResult));
    // ====================
}
catch (Exception ex)
{
    return this.getInnovator().newError(
        "IC_MyMethod: " + ex.Message);
}
finally
{
    if (PermissionWasSet)
        Aras.Server.Security.Permissions.RevokeIdentity(plmIdentity);
}
```


<h3>2.3 JSON 反序列化 + AML 批量操作模板</h3>

```csharp
// 前端传入 JSON，后端反序列化后批量操作
var jsonData = this.getProperty("projectData", "");
var projectData = Newtonsoft.Json.JsonConvert
    .DeserializeObject<HoursProject>(jsonData);

var inn = this.newInnovator();
var item = inn.newItem("IC_Working_Hour", "add");
item.setProperty("ic_project", projectData.project_id);
item.setProperty("ic_monday", projectData.monday);
// ... 更多属性 ...

// 添加关系子项
for (int i = 0; i < 7; i++) {
    var detail = inn.newItem("IC_Hour_Details", "add");
    detail.setProperty("ic_hours", hours[i].ToString());
    detail.setProperty("sort_order", (i + 1).ToString());
    item.addRelationship(detail);
}

item = item.apply();
if (item.isError())
    return inn.newError(item.getErrorString());

return inn.newResult(JsonConvert.SerializeObject(new {
    success = true,
    id = item.getProperty("id", "")
}));
```


<h2>三、Method 配置属性</h2>
<table>
<thead><tr><th>属性</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Method 名称，全局唯一。命名建议：<code>IC_功能描述</code>（自定义）或保持原有命名</td></tr>
<tr><td><strong>Method Type</strong></td><td>server / client / serverGlobal / clientGlobal</td></tr>
<tr><td><strong>Method Language</strong></td><td>C#（推荐）/ VB.NET / JavaScript</td></tr>
<tr><td><strong>Method Code</strong></td><td>代码主体，支持模板引用</td></tr>
<tr><td><strong>comments</strong></td><td>注释，用于文档说明</td></tr>
<tr><td><strong>template</strong></td><td>模板引用名，可实现代码复用</td></tr>
</tbody>
</table>

<h2>四、Method 模板（Template）</h2>
<p>Aras 支持代码模板功能：将公用的代码模板定义为独立的 Method，然后在其他 Method 中通过 <code>template</code> 属性引用，Aras 引擎会自动把模板代码注入到目标 Method 中。这样可以实现：</p>
<ul>
<li>权限提升代码复用（所有 Method 共用同一段 PLM Identity 代码）</li>
<li>日志/错误处理统一</li>
<li>工具函数集中管理</li>
</ul>

<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/Methods.htm">Aras Methods Documentation</a></li>
<li><a href="https://blog.csdn.net/h346230554/article/details/135904237">Aras Innovator 二次开发 - 服务端方法(一)</a></li>
<li><a href="https://blog.csdn.net/h346230554/article/details/135946018">Aras Innovator 二次开发 - 服务端方法(二)</a></li>
</ul>
