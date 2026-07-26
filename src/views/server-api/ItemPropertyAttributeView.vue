<template>
  <article class="doc-content">
    <h1>getPropertyAttribute / setPropertyAttribute / removePropertyAttribute</h1>
    <blockquote><p><strong>管理 Item 属性节点上的 XML 属性（Property Attributes）。</strong>用于读写 AML 中 property 标签上的附加属性（如 select、condition、maxRecords 等）。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、方法签名</h2>
    <pre v-pre><code class="language-csharp">// getPropertyAttribute — 获取属性上的 XML attribute
public string getPropertyAttribute(string propertyName, string attributeName)
public string getPropertyAttribute(string propertyName, string attributeName, string lang)

// setPropertyAttribute — 设置属性上的 XML attribute
public void setPropertyAttribute(string propertyName, string attributeName, string attributeValue)
public void setPropertyAttribute(string propertyName, string attributeName, string attributeValue, string lang)

// removePropertyAttribute — 移除属性上的 XML attribute
public void removePropertyAttribute(string propertyName, string attributeName)
public void removePropertyAttribute(string propertyName, string attributeName, string lang)</code></pre>

    <h2>二、参数说明</h2>
    <table><thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead><tbody>
      <tr><td><code>propertyName</code></td><td>String</td><td>属性名称（如 "item_number", "name"）</td></tr>
      <tr><td><code>attributeName</code></td><td>String</td><td>XML Attribute 名称（如 "select", "condition", "maxRecords"）</td></tr>
      <tr><td><code>attributeValue</code></td><td>String</td><td>XML Attribute 的值</td></tr>
      <tr><td><code>lang</code></td><td>String</td><td>可选，多语言标识（如 "fr", "zh"）</td></tr>
    </tbody></table>

    <h2>三、典型 Property Attributes</h2>
    <table><thead><tr><th>Attribute</th><th>用途</th><th>示例值</th></tr></thead><tbody>
      <tr><td><code>condition</code></td><td>AML 查询条件</td><td>eq, gt, lt, like, between</td></tr>
      <tr><td><code>keyed_name</code></td><td>关联的 keyed_name</td><td>用于设置关联 Item 的显示名</td></tr>
      <tr><td><code>xml:lang</code></td><td>多语言标识</td><td>fr, zh, ja, de</td></tr>
    </tbody></table>

    <h2>四、代码示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 设置关联 property 的 keyed_name
var item = inn.newItem("Part", "add");
item.setProperty("created_by_id", creatorId);
item.setPropertyAttribute("created_by_id", "keyed_name", "John Doe / Admin");
// AML: &lt;created_by_id keyed_name="John Doe / Admin"&gt;creatorId&lt;/created_by_id&gt;

// 读取关联属性
string keyedName = item.getPropertyAttribute("created_by_id", "keyed_name");

// 移除属性 attribute
item.removePropertyAttribute("created_by_id", "keyed_name");

// 多语言属性 Attribute
item.setProperty("description", "English text");
item.setProperty("description", "Texte français", "fr");
// 读取特定语言的 attribute
string frenchAttr = item.getPropertyAttribute("description", "condition", "fr");</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>keyed_name 是常用 attribute：</strong>在设置关联 Item 时，除了设置 ID，通常还需要设置 keyed_name attribute</li>
      <li><strong>多语言注意：</strong>带 lang 参数的重载用于读写多语言属性的 attribute</li>
      <li><strong>与 getPropertyCondition 的区别：</strong>getPropertyCondition 是获取 condition attribute 的便捷方法，等同于 getPropertyAttribute(name, "condition")</li>
      <li><strong>不影响 dom 结构：</strong>这些方法只修改内存中的 XML attribute，不触发服务器通信</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Item.htm">Item Class</a></li></ul>
  </article>
</template>
