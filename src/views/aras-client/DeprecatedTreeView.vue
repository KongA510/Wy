<template>
  <article class="doc-content">
    <h1>Tree（已弃用）</h1>
    <blockquote>
      <p><strong>命名空间：</strong><code>Aras.Modules.CMF.Public</code></p>
      <p>用于在 CMF 文档中搜索元素的类。CMF 文档采用树形架构。</p>
    </blockquote>

    <h2>API 成员概览</h2>
    <table>
      <thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>#ctor</code></td><td>public constructor</td><td>构造函数，创建 Tree 实例</td></tr>
        <tr><td><code>findElementWithBinding()</code></td><td>public method</td><td>查找指定元素类型且绑定到特定业务对象项的元素</td></tr>
      </tbody>
    </table>

    <h2>API 详情</h2>

    <h3>constructor()</h3>
    <p>构造函数。创建一个 Tree 实例，用于在 CMF 文档的树形结构中搜索元素。通常由 CMF 框架内部调用，开发者在自定义代码中通过 <code>inArgs.tree</code> 获取已创建的实例。</p>
    <h4>签名</h4>
    <pre v-pre><code class="language-javascript">Aras.Modules.CMF.Public.Tree = function();</code></pre>
    <h4>参数</h4>
    <p><em>文档未提供参数信息。</em></p>
    <h4>返回值</h4>
    <p><em>文档未提供返回值信息。</em></p>

    <h3>findElementWithBinding()</h3>
    <p>在 CMF 文档树中查找指定类型（<code>elementType</code>）的元素，该元素需包含对指定 ID（<code>boundItemId</code>）的业务对象项的引用。此方法常用于在 CMF 表单中定位与特定数据项关联的界面元素。</p>
    <h4>参数</h4>
    <p><em>文档未提供参数信息。根据示例代码推断，该方法接受以下参数：</em></p>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>elementType</code></td><td>string</td><td>要查找的 CMF 元素类型名称</td></tr>
        <tr><td><code>boundItemId</code></td><td>string</td><td>绑定的业务对象项 ID</td></tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>Aras.Modules.CMF.Public.Element</strong> — 返回匹配的 CMF Element 对象。如果未找到匹配项，返回 <code>undefined</code>。</p>

    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 查找绑定到特定业务对象项的 CMF 元素
var cmfElement = inArgs.tree.findElementWithBinding(
    'CMF Element Type Name',
    'Business Object Item Id'
);</code></pre>

    <h4>实际应用示例</h4>
    <pre v-pre><code class="language-javascript">// 示例1：在表单加载时查找与当前 Part 关联的字段元素
var partId = inArgs.businessObjectItem.getProperty("id", "");
var fieldElement = inArgs.tree.findElementWithBinding(
    "Field",
    partId
);

if (fieldElement) {
    // 找到后可以对元素进行操作，如设置可见性
    fieldElement.setVisible(false);
}

// 示例2：在 CMF 计算方法的上下文中查找特定控件
var controlElement = inArgs.tree.findElementWithBinding(
    "Dropdown",
    "4F2A1B3C5D6E7F8A9B0C1D2E3F4A5B6C"
);

if (controlElement) {
    var currentValue = controlElement.getValue();
    console.log("当前下拉框的值: " + currentValue);
}

// 示例3：遍历查找多个绑定元素
var targetIds = ["ID001", "ID002", "ID003"];
targetIds.forEach(function(id) {
    var elem = inArgs.tree.findElementWithBinding("Field", id);
    if (elem) {
        elem.setProperty("readonly", "1");
    }
});</code></pre>

    <hr />
    <p><em>⚠️ 已弃用。适用版本：Aras Innovator 11.0-14.x。在新版本中，建议使用 CUI（客户端用户界面）框架的布局和控件 API 替代 CMF 框架。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
