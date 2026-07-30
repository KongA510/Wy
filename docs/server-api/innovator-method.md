---
title: applyMethod 详解
---

<h1>applyMethod 详解</h1>
<blockquote>
<p><strong>applyMethod 是 Innovator 类中用于调用服务端 Method 的接口。</strong>它是客户端与服务端 Method 通信的核心桥梁。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

<h2>一、方法签名</h2>

```csharp
// 签名
public Item applyMethod(string methodName, string body)

// methodName: 服务端 Method 的名称（如 "IC_GetPartInfo"）
// body: 传递给 Method 的 XML 字符串，每个子元素对应于 Method 中的一个 this.getProperty()
```

<p><strong>返回值：</strong><code>Item</code> — 服务器响应。如果 Method 返回了 <code>inn.newResult(text)</code>，通过 <code>result.getResult()</code> 获取文本内容。</p>

<h2>二、调用流程</h2>

```text
客户端 (Browser/JS)
  top.aras.newIOMInnovator()
    .applyMethod("IC_MyMethod", xmlBody)
    .getResult()        ← 返回纯文本/JSON/XML
    .isError()          ← 判断是否出错
    .getErrorString()   ← 错误信息
       │ HTTP POST
       ▼
服务端 (IIS / Aras Server)
  Method: IC_MyMethod
  this.getProperty("参数名")  ← 从 xmlBody 提取参数
  ... 业务逻辑 ...
  return inn.newResult(jsonString)
```


<h2>三、Body 参数构造</h2>

```csharp
// 服务端读取
string sender = this.getProperty("sender", "");
string data = this.getProperty("data", "");

// 对应前端 body 格式：
// <sender>admin</sender><data>hello</data>
```


<p><strong>转义规则：</strong></p>
<ul>
<li><strong>普通字符串参数 → 必须 XML 转义</strong>（&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;apos;）</li>
<li><strong>JSON 参数 → 不转义！</strong>后端使用 Newtonsoft.Json 直接从标签文本反序列化</li>
</ul>

<h2>四、.NET 客户端调用示例</h2>

```csharp
// 独立 .NET 客户端调用
var conn = IomFactory.CreateHttpServerConnection(url, db, user, password);
var inn = new Innovator();
// ... 设置连接 ...
var loginResult = inn.Login();
if (loginResult.isError()) throw new Exception(loginResult.getErrorString());

// 构造 Body
string body = "<weekrangetext>2025-W12</weekrangetext><format>json</format>";
var result = inn.applyMethod("IC_GetWeeklyReport", body);

if (result.isError()) {
    Console.WriteLine("错误：" + result.getErrorString());
} else {
    string json = result.getResult();
    Console.WriteLine(json);
}
```


<h2>五、服务端 Method 返回方式</h2>
<table>
<thead><tr><th>返回方式</th><th>前端获取</th><th>适用场景</th></tr></thead>
<tbody>
<tr><td><code>return this;</code></td><td><code>result.node</code> 有值</td><td>返回 Item 对象（如查询结果）</td></tr>
<tr><td><code>return inn.newResult(text);</code></td><td><code>result.getResult()</code></td><td>返回 JSON/纯文本</td></tr>
<tr><td><code>return inn.newError(msg);</code></td><td><code>result.isError()</code> 为 true</td><td>返回错误</td></tr>
</tbody>
</table>

<h2>六、方法查找机制</h2>
<p>Aras 服务器按以下顺序查找 Method：</p>
<ol>
<li>在当前 ItemType 的 Method（如 Part 上的 Method）</li>
<li>全局 Method 库（Global Methods）</li>
<li>如果都未找到，返回错误</li>
</ol>
<p>全局 Method 的命名约定通常以 <code>IC_</code>、<code>PE_</code>、<code>Labs_</code> 等前缀开头。</p>

<h2>七、实践笔记</h2>
<ul>
<li><strong>Method 名称区分大小写：</strong>确保大小写与 Aras 中注册的完全一致</li>
<li><strong>超大 Body：</strong>如果 XML Body 很大，考虑用 JSON 格式的单个参数代替多个 XML 子元素</li>
<li><strong>超时：</strong>applyMethod 的超时由 HttpServerConnection 的配置决定，长时间运行的操作考虑异步模式</li>
<li><strong>返回值安全解析：</strong>getResult() 可能返回多种格式（JSON、XML 包裹、BOM 头污染），需要多策略容错解析</li>
<li><strong>权限：</strong>Method 可以设置权限提升（Run As），调用方只需有调用该 Method 的权限</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_applyMethod.htm">applyMethod Method</a></li>
</ul>
