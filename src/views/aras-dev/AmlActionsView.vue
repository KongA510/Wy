<template>
  <article class="doc-content">
    <h1>AML 操作 (CRUD)</h1>
    <blockquote>
      <p>AML 支持完整的 CRUD 操作：<strong>get（查询）、add（新增）、edit（修改）、delete（删除）</strong>。每个 action 对应不同的 AML 结构和行为。</p>
    </blockquote>

    <h2>一、get — 查询数据</h2>
    <pre v-pre><code class="language-xml">&lt;AML&gt;
  &lt;Item type="Part" action="get"
        select="id,name,item_number,current_state"
        order_by="item_number asc"
        page="1" pagesize="50"&gt;
    &lt;item_number condition="like"&gt;P-*&lt;/item_number&gt;
    &lt;current_state condition="neq"&gt;Obsolete&lt;/current_state&gt;
  &lt;/Item&gt;
&lt;/AML&gt;</code></pre>
    <p><strong>IOM 等效代码：</strong></p>
    <pre v-pre><code class="language-csharp">var part = inn.newItem("Part", "get");
part.setAttribute("select", "id,name,item_number,current_state");
part.setAttribute("order_by", "item_number asc");
part.setProperty("item_number", "P-*");
part.setPropertyCondition("item_number", "like");
part = part.apply();

for (int i = 0; i < part.getItemCount(); i++) {
    var p = part.getItemByIndex(i);
    string name = p.getProperty("name", "");
    // ...
}</code></pre>

    <h2>二、add — 新增数据</h2>
    <pre v-pre><code class="language-xml">&lt;AML&gt;
  &lt;Item type="Part" action="add" doGetItem="1"&gt;
    &lt;item_number&gt;P-NEW-001&lt;/item_number&gt;
    &lt;name&gt;新零件&lt;/name&gt;
    &lt;description&gt;通过 AML 创建的零件&lt;/description&gt;
    &lt;unit&gt;EA&lt;/unit&gt;
    &lt;Relationships&gt;
      &lt;Item type="Part BOM" action="add"&gt;
        &lt;quantity&gt;5&lt;/quantity&gt;
        &lt;related_id&gt;
          &lt;Item type="Part" action="get"&gt;
            &lt;item_number condition="eq"&gt;P-001&lt;/item_number&gt;
          &lt;/Item&gt;
        &lt;/related_id&gt;
      &lt;/Item&gt;
    &lt;/Relationships&gt;
  &lt;/Item&gt;
&lt;/AML&gt;</code></pre>
    <p><strong>IOM 等效代码：</strong></p>
    <pre v-pre><code class="language-csharp">var part = inn.newItem("Part", "add");
part.setProperty("item_number", "P-NEW-001");
part.setProperty("name", "新零件");
part.setProperty("description", "通过 IOM 创建的零件");

var bom = inn.newItem("Part BOM", "add");
bom.setProperty("quantity", "5");

var relatedPart = inn.newItem("Part", "get");
relatedPart.setProperty("item_number", "P-001");
bom.setRelatedItem(relatedPart);

part.addRelationship(bom);
part = part.apply();</code></pre>

    <h2>三、edit — 修改数据</h2>
    <pre v-pre><code class="language-xml">&lt;AML&gt;
  &lt;Item type="Part" action="edit"
        id="A1B2C3D4E5F6..."
        doGetItem="1"&gt;
    &lt;name&gt;修改后的零件名称&lt;/name&gt;
    &lt;cost&gt;99.99&lt;/cost&gt;
  &lt;/Item&gt;
&lt;/AML&gt;

&lt;!-- 或使用 where 条件批量更新 --&gt;
&lt;AML&gt;
  &lt;Item type="Part" action="edit"
        where="Part.item_number like 'OLD-%'"&gt;
    &lt;current_state&gt;Obsolete&lt;/current_state&gt;
  &lt;/Item&gt;
&lt;/AML&gt;</code></pre>
    <p><strong>IOM 等效代码：</strong></p>
    <pre v-pre><code class="language-csharp">// 按 ID 修改
var part = inn.newItem("Part", "edit");
part.setProperty("name", "修改后的零件名称");
part.setAttribute("where", "Part.id='A1B2C3D4E5F6...'");
part = part.apply();

// 或先获取再修改
var getPart = inn.newItem("Part", "get");
getPart.setProperty("item_number", "P-001");
getPart = getPart.apply();
var editPart = inn.newItem("Part", "edit");
editPart.setProperty("name", "新名称");
editPart.setAttribute("where",
    $"Part.id='{getPart.getProperty("id","")}'");
editPart = editPart.apply();</code></pre>

    <h2>四、delete — 删除数据</h2>
    <pre v-pre><code class="language-xml">&lt;AML&gt;
  &lt;Item type="Part" action="delete"
        id="A1B2C3D4E5F6..."&gt;
  &lt;/Item&gt;
&lt;/AML&gt;

&lt;!-- 或条件删除 --&gt;
&lt;AML&gt;
  &lt;Item type="Part" action="delete"
        where="Part.current_state='Obsolete' AND Part.modified_on &lt; '2020-01-01'"&gt;
  &lt;/Item&gt;
&lt;/AML&gt;</code></pre>
    <p><strong>⚠️ 注意：</strong>条件删除非常危险，务必先在测试环境验证条件是否正确。</p>

    <h2>五、promote — 生命周期推进</h2>
    <pre v-pre><code class="language-xml">&lt;AML&gt;
  &lt;Item type="Part" action="promote"
        id="A1B2C3D4E5F6..."&gt;
    &lt;state&gt;Released&lt;/state&gt;
    &lt;comments&gt;设计评审通过&lt;/comments&gt;
  &lt;/Item&gt;
&lt;/AML&gt;</code></pre>
    <pre v-pre><code class="language-csharp">// IOM 方式
var part = inn.newItem("Part", "get");
part.setProperty("id", "xxx");
part = part.apply();
part = part.promote("Released", "设计评审通过");</code></pre>

    <h2>六、错误处理</h2>
    <pre v-pre><code class="language-csharp">var result = inn.applyAML(amlString);
if (result.isError()) {
    string errorMsg = result.getErrorString();
    // 日志记录 + 返回错误
    return inn.newError(errorMsg);
}</code></pre>

    <p><strong>参考来源：</strong></p>
    <ul>
      <li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/Aras%20Innovator%20Methodology.htm">Aras Innovator Methodology — AML Reference</a></li>
      <li><a href="https://www.aras.com/community/f/development/3528/apply-aml/1198">Apply AML — Aras Community Discussion</a></li>
    </ul>
  </article>
</template>
