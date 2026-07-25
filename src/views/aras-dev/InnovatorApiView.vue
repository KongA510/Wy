<template>
  <article class="doc-content">
    <h1>Innovator 对象 API</h1>
    <blockquote>
      <p><strong>Innovator</strong> 是 IOM 的<strong>入口对象</strong>，所有数据操作都从这里开始。在服务端 Method 中通过 <code>this</code> 隐式获得，在外部 .NET 应用中通过 <code>new Aras.IOM.Innovator.ServerConnection()</code> 创建。</p>
    </blockquote>

    <h2>一、获取方式</h2>
    <table>
      <thead><tr><th>环境</th><th>获取代码</th></tr></thead>
      <tbody>
        <tr><td>服务端 Method</td><td><code>var inn = this.newInnovator();</code>（新风格）/ <code>this</code>（旧风格作为 Item）</td></tr>
        <tr><td>客户端 JS Method</td><td><code>var inn = top.aras.newIOMInnovator();</code></td></tr>
        <tr><td>外部 .NET 应用</td><td><code>var conn = Aras.IOM.Innovator.ServerConnection(...);</code></td></tr>
      </tbody>
    </table>

    <h2>二、核心方法</h2>
    <h3>2.1 newItem — 创建 Item 句柄</h3>
    <pre v-pre><code class="language-csharp">// 创建 Part ItemType 的操作句柄
var part = inn.newItem("Part", "get");   // 查询
var part = inn.newItem("Part", "add");   // 新增
var part = inn.newItem("Part", "edit");  // 修改
var part = inn.newItem("Part", "delete");// 删除
var part = inn.newItem("Part", "copy");  // 复制</code></pre>
    <p><strong>参数说明：</strong></p>
    <ul>
      <li><code>typeName</code>：ItemType 名称（大小写敏感，通常首字母大写）</li>
      <li><code>action</code>：操作类型 — <code>"get" | "add" | "edit" | "delete" | "copy" | "merge"</code></li>
    </ul>

    <h3>2.2 applySQL — 执行原生 SQL</h3>
    <pre v-pre><code class="language-csharp">// 需要 Aras PLM Identity 权限提升
Aras.Server.Security.Identity plmIdentity =
    Aras.Server.Security.Identity.GetByName("Aras PLM");
bool PermissionWasSet =
    Aras.Server.Security.Permissions.GrantIdentity(plmIdentity);
try {
    var result = inn.applySQL(
        "select id, name from innovator.PART where name like '%BOLT%'"
    );
    // result 为 XML 字符串
} finally {
    if (PermissionWasSet)
        Aras.Server.Security.Permissions.RevokeIdentity(plmIdentity);
}</code></pre>
    <p><strong>注意：</strong><code>applySQL</code> 返回 <code>&lt;Result&gt;</code> 包裹的 XML 字符串，需要手动解析。SQL 必须使用 Innovator 前缀（如 <code>innovator.PART</code>）。</p>

    <h3>2.3 applyAML — 执行 AML 查询</h3>
    <pre v-pre><code class="language-csharp">string aml = @"&lt;AML&gt;
  &lt;Item type='Part' action='get' select='id,name,item_number'&gt;
    &lt;name condition='like'&gt;*BOLT*&lt;/name&gt;
  &lt;/Item&gt;
&lt;/AML&gt;";
var result = inn.applyAML(aml);
// result 返回 Item 集合，可用 getItemByIndex() 遍历</code></pre>

    <h3>2.4 applyMethod — 调用其他 Method</h3>
    <pre v-pre><code class="language-csharp">// 在服务端 Method 内调用另一个 Method
var result = inn.applyMethod("otherMethodName", "&lt;body&gt;data&lt;/body&gt;");</code></pre>

    <h3>2.5 工具方法</h3>
    <table>
      <thead><tr><th>方法</th><th>返回类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>inn.getUserID()</code></td><td>string</td><td>当前登录用户 ID（GUID）</td></tr>
        <tr><td><code>inn.getNewID()</code></td><td>string</td><td>生成新的 GUID</td></tr>
        <tr><td><code>inn.newInnovator()</code></td><td>Innovator</td><td>创建新的 Innovator 实例（常用于嵌套 Method 调用）</td></tr>
        <tr><td><code>inn.newXMLDocument()</code></td><td>XmlDocument</td><td>创建新的 XML 文档</td></tr>
      </tbody>
    </table>

    <h2>三、完整示例：服务端 Method 查询零件</h2>
    <pre v-pre><code class="language-csharp">// 服务端 Method — 查询给定的 Part
var partNumber = this.getProperty("part_number", "");
var inn = this.newInnovator();

var part = inn.newItem("Part", "get");
part.setAttribute("select", "id,name,item_number,current_state");
part.setProperty("item_number", partNumber);
part = part.apply();

if (part.isError()) {
    return inn.newError(part.getErrorString());
}
return part;</code></pre>

    <p><strong>参考来源：</strong></p>
    <ul>
      <li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/IOM%20Reference.htm">Aras IOM Reference</a></li>
      <li><a href="https://www.nuget.org/packages/Aras.IOM/">Aras.IOM NuGet Package</a></li>
    </ul>
  </article>
</template>
