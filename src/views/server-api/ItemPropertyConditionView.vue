<template>
  <article class="doc-content">
    <h1>getPropertyCondition / setPropertyCondition</h1>
    <blockquote><p><strong>用于设置和读取 Item 属性上的 AML 条件过滤。</strong>在查询时为属性添加过滤条件。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、方法签名</h2>
    <pre v-pre><code class="language-csharp">// getPropertyCondition - 获取属性上的条件值
public string getPropertyCondition(string propertyName)
public string getPropertyCondition(string propertyName, string lang)

// setPropertyCondition - 设置属性上的 AML 条件
public void setPropertyCondition(string propertyName, string condition)
public void setPropertyCondition(string propertyName, string condition, string lang)

// condition 值示例: "eq", "gt", "lt", "ge", "le", "ne", "like", "between", "is null", "is not null"
// 用于在 AML 中构造: &lt;property_name condition="eq"&gt;value&lt;/property_name&gt;</code></pre>

    <h2>二、参数说明</h2>
    <table><thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead><tbody>
      <tr><td><code>propertyName</code></td><td>String</td><td>属性名称</td></tr>
      <tr><td><code>condition</code></td><td>String</td><td>AML 条件操作符（eq/gt/lt/like 等）</td></tr>
      <tr><td><code>lang</code></td><td>String</td><td>可选，多语言标识</td></tr>
    </tbody></table>

    <h2>三、支持的条件操作符</h2>
    <table><thead><tr><th>条件</th><th>SQL 等价</th><th>说明</th></tr></thead><tbody>
      <tr><td><code>eq</code></td><td>=</td><td>等于</td></tr>
      <tr><td><code>ne</code></td><td>&lt;&gt;</td><td>不等于</td></tr>
      <tr><td><code>gt</code></td><td>&gt;</td><td>大于</td></tr>
      <tr><td><code>lt</code></td><td>&lt;</td><td>小于</td></tr>
      <tr><td><code>ge</code></td><td>&gt;=</td><td>大于等于</td></tr>
      <tr><td><code>le</code></td><td>&lt;=</td><td>小于等于</td></tr>
      <tr><td><code>like</code></td><td>LIKE</td><td>模糊匹配（支持 % 和 _ 通配符）</td></tr>
      <tr><td><code>between</code></td><td>BETWEEN</td><td>范围查询（值用 ❲ 和 ❳ 分隔）</td></tr>
      <tr><td><code>in</code></td><td>IN</td><td>包含在集合中</td></tr>
      <tr><td><code>is null</code></td><td>IS NULL</td><td>为空</td></tr>
      <tr><td><code>is not null</code></td><td>IS NOT NULL</td><td>不为空</td></tr>
    </tbody></table>

    <h2>四、代码示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 查询 item_number 以 "P-" 开头的 Part
var query = inn.newItem("Part", "get");
query.setProperty("item_number", "P-%");
query.setPropertyCondition("item_number", "like");
query.setAttribute("select", "item_number,name,state");
var result = query.apply();

// 查询成本大于 1000 的 Part
var query2 = inn.newItem("Part", "get");
query2.setProperty("cost", "1000");
query2.setPropertyCondition("cost", "gt");
var result2 = query2.apply();

// 查询在指定日期范围内的 Part
var query3 = inn.newItem("Part", "get");
query3.setProperty("created_on", "2025-01-01❲2025-12-31");
query3.setPropertyCondition("created_on", "between");
var result3 = query3.apply();

// 读取现有 condition
var item = inn.getItemById("Part", partId);
string cond = item.getPropertyCondition("item_number");</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>between 语法：</strong>值格式为 <code>"lower❲upper"</code>（用 ❲ 字符分隔，U+2772）</li>
      <li><strong>is null 不需要值：</strong>调用 <code>setPropertyCondition("field","is null")</code> 后不需要 <code>setProperty</code></li>
      <li><strong>多语言支持：</strong>带 lang 参数的重载用于多语言属性条件查询</li>
      <li><strong>复合条件：</strong>多个属性条件在 AML 中通过 AND 组合</li>
    </ul>
  </article>
</template>
