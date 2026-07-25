<template>
  <article class="doc-content">
    <h1>AML 语法与结构</h1>
    <blockquote>
      <p><strong>AML (Aras Markup Language)</strong> 是 Aras Innovator 的<strong>数据查询与操作语言</strong>，基于 XML 格式。所有通过 IOM API 的操作最终都会被转换为 AML 发送到服务器执行。</p>
    </blockquote>

    <h2>一、AML 基本结构</h2>
    <pre v-pre><code class="language-xml">&lt;AML&gt;
  &lt;Item type="Part" action="get" select="id,name,item_number"&gt;
    &lt;item_number condition="eq"&gt;P-001&lt;/item_number&gt;
    &lt;state condition="neq"&gt;Obsolete&lt;/state&gt;
  &lt;/Item&gt;
&lt;/AML&gt;</code></pre>

    <h2>二、AML 元素层级</h2>
    <table>
      <thead><tr><th>层级</th><th>元素</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>根</td><td><code>&lt;AML&gt;</code></td><td>AML 文档的根元素，所有查询必须包裹在此标签内</td></tr>
        <tr><td>一级</td><td><code>&lt;Item&gt;</code></td><td>操作目标。一个 AML 可包含多个 Item（批量操作）</td></tr>
        <tr><td>二级</td><td>属性子元素</td><td>查询条件/数据字段。元素名 = 属性名，元素内容 = 值</td></tr>
        <tr><td>三级</td><td><code>&lt;Relationships&gt;</code></td><td>关系数据。嵌套在 Item 内，包含子 Item</td></tr>
      </tbody>
    </table>

    <h2>三、Item 元素属性</h2>
    <table>
      <thead><tr><th>属性</th><th>必需</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>type</code></td><td>✅</td><td>ItemType 名称（如 Part, Document, ECR）</td></tr>
        <tr><td><code>action</code></td><td>✅</td><td>操作类型：get / add / edit / delete / copy / merge</td></tr>
        <tr><td><code>id</code></td><td>⚠️</td><td>指定 Item ID（用于 edit/delete 时标识目标）</td></tr>
        <tr><td><code>select</code></td><td>推荐</td><td>指定要返回的属性，逗号分隔。不指定则返回所有属性</td></tr>
        <tr><td><code>where</code></td><td>可选</td><td>SQL WHERE 条件片段（高级用法）</td></tr>
        <tr><td><code>order_by</code></td><td>可选</td><td>排序字段，如 <code>"created_on desc"</code></td></tr>
        <tr><td><code>page</code></td><td>可选</td><td>分页页码（1-based）</td></tr>
        <tr><td><code>pagesize</code></td><td>可选</td><td>每页大小（如 "20"）</td></tr>
        <tr><td><code>serverEvents</code></td><td>可选</td><td>是否触发服务器事件：0 = 不触发，1 = 触发（默认）</td></tr>
        <tr><td><code>doGetItem</code></td><td>可选</td><td>apply 后是否返回自身：0 = 不返回（默认），1 = 返回</td></tr>
      </tbody>
    </table>

    <h2>四、条件运算符（condition）</h2>
    <table>
      <thead><tr><th>运算符</th><th>SQL 等效</th><th>示例</th></tr></thead>
      <tbody>
        <tr><td><code>eq</code></td><td>=</td><td><code>&lt;name condition="eq"&gt;Bolt&lt;/name&gt;</code></td></tr>
        <tr><td><code>neq</code></td><td>!=</td><td><code>&lt;state condition="neq"&gt;Obsolete&lt;/state&gt;</code></td></tr>
        <tr><td><code>gt</code></td><td>&gt;</td><td><code>&lt;modified_on condition="gt"&gt;2025-01-01&lt;/modified_on&gt;</code></td></tr>
        <tr><td><code>lt</code></td><td>&lt;</td><td><code>&lt;cost condition="lt"&gt;100&lt;/cost&gt;</code></td></tr>
        <tr><td><code>ge</code></td><td>&gt;=</td><td><code>&lt;qty condition="ge"&gt;10&lt;/qty&gt;</code></td></tr>
        <tr><td><code>le</code></td><td>&lt;=</td><td><code>&lt;priority condition="le"&gt;3&lt;/priority&gt;</code></td></tr>
        <tr><td><code>like</code></td><td>LIKE</td><td><code>&lt;name condition="like"&gt;*Bolt*&lt;/name&gt;</code></td></tr>
        <tr><td><code>between</code></td><td>BETWEEN</td><td><code>&lt;date condition="between"&gt;2025-01-01 and 2025-12-31&lt;/date&gt;</code></td></tr>
        <tr><td><code>in</code></td><td>IN</td><td><code>&lt;id condition="in"&gt;id1,id2,id3&lt;/id&gt;</code></td></tr>
        <tr><td><code>is null</code></td><td>IS NULL</td><td><code>&lt;release_date condition="is null"&gt;&lt;/release_date&gt;</code></td></tr>
        <tr><td><code>is not null</code></td><td>IS NOT NULL</td><td><code>&lt;release_date condition="is not null"&gt;&lt;/release_date&gt;</code></td></tr>
      </tbody>
    </table>

    <h2>五、通过 IOM 生成 AML</h2>
    <p>不写 AML 字符串，而是通过 IOM API 构建同样效果：</p>
    <pre v-pre><code class="language-csharp">var part = inn.newItem("Part", "get");
part.setAttribute("select", "id,name,item_number");
part.setProperty("item_number", "P-001");
part.setPropertyCondition("item_number", "eq");
part.setProperty("state", "Obsolete");
part.setPropertyCondition("state", "neq");
// 等价于上述 AML
part = part.apply();</code></pre>

    <p><strong>参考来源：</strong></p>
    <ul>
      <li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/Aras%20Innovator%20Methodology.htm">Aras Innovator Methodology</a></li>
      <li><a href="https://youssefafech.dk/2025/04/10/introduction-to-aml-the-backbone-of-aras-innovator-automation/">Introduction to AML — Youssef Afech</a></li>
      <li><a href="https://www.arasdeveloper.com/en/blog/aml-in-innovator">AML in Innovator — Aras Developer</a></li>
    </ul>
  </article>
</template>
