---
title: 服务端开发规范
---

# 服务端开发规范
<blockquote>
<p>基于 Aras Innovator 平台特性与团队实践总结的服务端 Method 开发规范，适用于 <strong>2025R / R37+</strong> 版本。</p>
</blockquote>

## 一、命名规范
<table>
<thead><tr><th>对象</th><th>规范</th><th>示例</th></tr></thead>
<tbody>
<tr><td><strong>服务端 Method</strong></td><td><code>IC_功能描述</code>（PascalCase）</td><td><code>IC_GetPartList</code>, <code>IC_SaveProjectData</code></td></tr>
<tr><td><strong>客户端 Method</strong></td><td><code>IC_功能描述_Client</code> 或小驼峰</td><td><code>IC_ShowDialog_Client</code></td></tr>
<tr><td><strong>ItemType（自定义）</strong></td><td><code>IC_名称</code> 前缀 + 下划线分隔</td><td><code>IC_Working_Hour</code>, <code>IC_Hour_Details</code></td></tr>
<tr><td><strong>属性名</strong></td><td>小写 + 下划线分隔</td><td><code>ic_project</code>, <code>ic_hours</code></td></tr>
<tr><td><strong>变量/参数</strong></td><td>驼峰命名（C# 风格）</td><td><code>projectId</code>, <code>weekStart</code></td></tr>
</tbody>
</table>

## 二、Method 代码结构模板

```csharp
/// <summary>
/// IC_DoSomething — 功能简述
/// </summary>
/// <param name="param1">参数说明</param>
/// <returns>返回说明</returns>

// 1. 参数提取
var param1 = this.getProperty("param1", "");
var param2 = this.getProperty("param2", "default");

// 2. 参数验证
if (string.IsNullOrEmpty(param1))
    return this.getInnovator().newError("param1 不能为空");

// 3. 权限提升
Aras.Server.Security.Identity plmIdentity =
    Aras.Server.Security.Identity.GetByName("Aras PLM");
bool PermissionWasSet =
    Aras.Server.Security.Permissions.GrantIdentity(plmIdentity);

try
{
    // 4. 业务逻辑
    var inn = this.newInnovator();
    // ...

    // 5. 返回结果
    return inn.newResult(JsonConvert.SerializeObject(resultObj));
}
catch (Exception ex)
{
    return this.getInnovator().newError(
        $"IC_DoSomething 执行失败: {ex.Message}");
}
finally
{
    if (PermissionWasSet)
        Aras.Server.Security.Permissions.RevokeIdentity(plmIdentity);
}
```


## 三、数据操作规范
### 3.1 优先使用 IOM API，而非 AML 字符串

```csharp
// ✅ 推荐：IOM API（类型安全、可读性好）
var part = inn.newItem("Part", "get");
part.setAttribute("select", "id,name,item_number");
part.setProperty("item_number", "P-001");

// ❌ 不推荐：字符串拼装 AML（难以维护、易出错）
string aml = "<AML><Item type='Part' action='get'>...";
```


### 3.2 返回 JSON 而非 XML

```csharp
// ✅ 推荐：序列化为 JSON
return inn.newResult(JsonConvert.SerializeObject(new {
    success = true,
    data = partList
}));

// ❌ 不推荐：返回原始 XML Item（客户端难解析）
return resultItem;
```


### 3.3 使用参数化查询避免 SQL 注入

```csharp
// ✅ 推荐：使用 string.Format 或参数化
var sql = string.Format(
    "select * from innovator.PART where name like '%{0}%'",
    searchText.Replace("'", "''")); // 手动转义单引号

// ⚠️ 注意：Aras applySQL 不支持真正的参数化查询
// 必须手动转义特殊字符
```


## 四、错误处理规范
<table>
<thead><tr><th>场景</th><th>处理方式</th></tr></thead>
<tbody>
<tr><td>参数为空</td><td>立即返回 <code>inn.newError("具体错误信息")</code></td></tr>
<tr><td>未找到数据</td><td>返回空结果（<code>[]</code> 或 <code>{"found":false}</code>），不抛异常</td></tr>
<tr><td>业务校验失败</td><td>返回明确的错误信息，方便前端显示</td></tr>
<tr><td>无法恢复的系统错误</td><td>catch 中记录日志，返回友好提示</td></tr>
<tr><td>SQL 执行错误</td><td>catch 中返回包含 SQL 的错误信息（便于调试）</td></tr>
</tbody>
</table>

## 五、性能规范
<ul>
<li><strong>避免 N+1 查询</strong>：一次性通过 AML Relationships 获取关联数据，不要在循环中逐条查询</li>
<li><strong>select 子句</strong>：只提取需要的字段，不要使用默认的 <code>select="*"</code></li>
<li><strong>applySQL 替代多轮 AML</strong>：复杂 JOIN 查询直接用 SQL，性能远好于多次 AML 调用</li>
<li><strong>批量操作</strong>：使用 AML 多 Item 批量 add/edit，避免循环单条操作</li>
<li><strong>分页</strong>：大数据量查询时使用 page + pagesize，不要让服务端返回全量数据</li>
</ul>

## 六、日志规范

```csharp
// 写入 Aras 服务器日志
Aras.Server.Core.Logging.LogError(
    "IC_DoSomething 执行失败: " + ex.Message);

// 或写入自定义日志（需要先创建日志配置文件）
// 推荐在关键操作（创建、删除、状态变更）时记录
```


<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/Methods.htm">Aras Methods Documentation</a></li>
</ul>
