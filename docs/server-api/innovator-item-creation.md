---
title: newItem / newResult / newError
---

<h1>newItem / newResult / newError</h1>
<blockquote>
<p><strong>Innovator 类提供了三种重载的 newItem 方法、newResult 和 newError 方法，用于创建不同类型的 Item 对象。</strong>命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

<h2>一、newItem() — 无参数</h2>

```csharp
// 签名
public Item newItem()

// 返回一个空 Item（无 type、无 action）
var item = inn.newItem();
```

<p>返回的 Item 可以后续通过 <code>loadAML()</code> 加载 AML 内容。通常用于接收从字符串构建的请求。</p>

<h2>二、newItem(String) — 指定 type</h2>

```csharp
// 签名
public Item newItem(string type)

// 返回一个带有 type 属性的 Item
var part = inn.newItem("Part");
part.setProperty("item_number", "P-001");
var result = part.apply("get");
```

<p><strong>参数：</strong></p>
<table>
<thead><tr><th>参数</th><th>说明</th></tr></thead>
<tbody><tr><td><code>type</code></td><td>ItemType 名称，如 "Part"、"Document"、"Method" 等</td></tr></tbody>
</table>

<h2>三、newItem(String, String) — 指定 type 和 action</h2>

```csharp
// 签名
public Item newItem(string type, string action)

// 返回一个同时设置 type 和 action 的 Item
var query = inn.newItem("Part", "get");
query.setProperty("item_number", "P-001");
var result = query.apply(); // 无需再指定 action
```

<p><strong>参数：</strong></p>
<table>
<thead><tr><th>参数</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>type</code></td><td>ItemType 名称</td></tr>
<tr><td><code>action</code></td><td>AML 操作，如 "get"、"add"、"edit"、"delete"、"promote" 等</td></tr>
</tbody>
</table>

<h2>四、newResult(String) — 创建结果 Item</h2>

```csharp
// 签名
public Item newResult(string text)

// 返回一个 Item，其内部 <Result> 标签的正文为传入的 text
// 常用于 Method 返回纯文本/JSON 响应
string json = "{\"status\":\"ok\",\"count\":42}";
return inn.newResult(json);

// 前端通过 result.getResult() 获取此文本
```


<h2>五、newError(String) — 创建错误 Item</h2>

```csharp
// 签名
public Item newError(string errorMessage)

// 返回一个 "error" 类型的 Item
// 前端通过 result.isError() 可检测到此错误
if (string.IsNullOrEmpty(name)) {
    return inn.newError("零件名称不能为空");
}
```


<h2>六、完整示例：创建与查询</h2>

```csharp
// 服务端 Method 中的典型操作
var inn = this.newInnovator();

// 方式 1：先创建再设 action
var part1 = inn.newItem("Part");
part1.setProperty("item_number", "P-001");
var res1 = part1.apply("get");

// 方式 2：创建时指定 type + action
var part2 = inn.newItem("Part", "get");
part2.setProperty("item_number", "P-001");
var res2 = part2.apply();

// 方式 3：创建空 Item + loadAML（用于解析已有 AML）
var responseItem = inn.newItem();
responseItem.loadAML("<AML><Item type='Part'>...</Item></AML>");

// 错误返回
if (res1.isError()) {
    return inn.newError("查询失败：" + res1.getErrorString());
}

// 结果返回
return inn.newResult(extractedJsonString);
```


<h2>七、实践笔记</h2>
<ul>
<li><strong>推荐 newItem(type, action)：</strong>代码更简洁，减少一次 <code>setAction</code> 调用</li>
<li><strong>newError 不要吞掉：</strong>服务端返回的错误信息对调试至关重要，<code>newError("系统错误，请联系管理员")</code> 比原样传递更有用</li>
<li><strong>newResult 的文本不限格式：</strong>可以传递 JSON、纯文本、XML 片段等任意字符串</li>
<li><strong>不带参数的 newItem()</strong>主要用于接收 loadAML 或外部传入的 XML</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_newItem.htm">newItem Method — Aras API Reference</a></li>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_newResult.htm">newResult Method</a></li>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_newError.htm">newError Method</a></li>
</ul>
