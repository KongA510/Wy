<template>
  <article class="doc-content">
    <h1>getItemById / getItemByKeyedName</h1>
    <blockquote>
      <p><strong>Innovator 提供了三个便捷查询方法，允许按 ID、keyed_name 或从 XML 文档中查找 Item。</strong>命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、getItemById(String, String)</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item getItemById(string type, string id)

// 按 ItemType 名称和 ID 获取单个 Item
var inn = this.newInnovator();
var part = inn.getItemById("Part", "A1B2C3D4E5F6...");
if (part != null && !part.isError()) {
    string name = part.getProperty("name", "");
    string number = part.getProperty("item_number", "");
}</code></pre>
    <p><strong>参数：</strong></p>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>type</code></td><td><code>string</code></td><td>ItemType 名称，如 "Part"、"Document"</td></tr>
        <tr><td><code>id</code></td><td><code>string</code></td><td>32 位十六进制字符串的 Item ID</td></tr>
      </tbody>
    </table>
    <p><strong>返回值：</strong><code>Item</code> — 匹配的 Item；如果未找到，返回一个 error Item 或空 Item。</p>
    <p><strong>内部实现：</strong>该方法内部构造一个 <code>action="get"</code> 的 AML，设置 <code>id</code> 属性并执行 apply。</p>

    <h2>二、getItemByKeyedName(String, String)</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item getItemByKeyedName(string type, string keyedName)

// 按 ItemType 名称和 keyed_name 获取单个 Item
var identity = inn.getItemByKeyedName("Identity", "World");
var user = inn.getItemByKeyedName("User", "admin");</code></pre>
    <p><strong>参数：</strong></p>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>type</code></td><td><code>string</code></td><td>ItemType 名称</td></tr>
        <tr><td><code>keyedName</code></td><td><code>string</code></td><td>Item 的 keyed_name 属性值</td></tr>
      </tbody>
    </table>
    <p><strong>返回值：</strong><code>Item</code> — 匹配的 Item。</p>
    <p><strong>注意事项：</strong>keyed_name 字段在 Aras 数据模型中默认是唯一的，但可通过配置修改。如果存在多条匹配，只返回第一条。</p>

    <h2>三、getItemInDom(XmlDocument)</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item getItemInDom(XmlDocument doc)

// 从已有的 XmlDocument 中提取第一个 &lt;Item&gt; 节点并封装为 Item 对象
// 适用于解析已有的 XML/AML 内容</code></pre>

    <h2>四、getItemById vs newItem+apply 对比</h2>
    <table>
      <thead><tr><th>方式</th><th>代码量</th><th>控制度</th><th>适用</th></tr></thead>
      <tbody>
        <tr><td><code>getItemById()</code></td><td>1 行</td><td>低（返回所有属性）</td><td>快速查询</td></tr>
        <tr><td><code>newItem+setAttribute("select")</code></td><td>3-5 行</td><td>高（可指定返回字段）</td><td>精确查询</td></tr>
      </tbody>
    </table>

    <h2>五、完整示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 1. 按 ID 获取
var item = inn.getItemById("Part", partId);
if (item.isError()) {
    return inn.newError("未找到零件：" + partId);
}

// 2. 按 keyed_name 获取（常用于查找 Identity）
var worldIdentity = inn.getItemByKeyedName("Identity", "World");

// 3. 需要精细控制时用 newItem 方式
var query = inn.newItem("Part", "get");
query.setAttribute("select", "id,item_number,name,state");
query.setProperty("id", partId);
var detail = query.apply();</code></pre>

    <h2>六、实践笔记</h2>
    <ul>
      <li><strong>getItemById 是快捷方法：</strong>内部实现等价于 newItem + apply，但无法自定义 select 列表</li>
      <li><strong>keyed_name 大小写敏感：</strong>Aras 中的 keyed_name 通常是区分大小写的</li>
      <li><strong>未找到时的行为：</strong>getItemById 不会抛出异常，但返回的 Item 的 getItemCount() 为 0</li>
      <li><strong>性能：</strong>对于只需要验证存在性的场景，使用 select="id" 减少数据传输</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_getItemById.htm">getItemById Method</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_getItemByKeyedName.htm">getItemByKeyedName Method</a></li>
    </ul>
  </article>
</template>
