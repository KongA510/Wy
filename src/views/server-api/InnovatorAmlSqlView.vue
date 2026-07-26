<template>
  <article class="doc-content">
    <h1>applyAML / applySQL</h1>
    <blockquote>
      <p><strong>Innovator 提供三个核心方法来直接与服务器通信：applyAML、applySQL 和 applySQLWithParameters。</strong>命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、applyAML(String)</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item applyAML(string aml)

// 发送原始 AML 字符串到 Innovator 服务器，返回服务器响应
string aml = "<AML><Item type='Part' action='get'><item_number>P-001</item_number></Item></AML>";
var result = inn.applyAML(aml);

if (result.isError()) {
    throw new Exception(result.getErrorString());
}</code></pre>
    <p><strong>参数：</strong></p>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody><tr><td><code>aml</code></td><td><code>string</code></td><td>完整的 AML 文档字符串</td></tr></tbody>
    </table>
    <p><strong>返回值：</strong><code>Item</code> — 服务器响应，其 dom 属性包含返回的 AML</p>

    <h2>二、applySQL(String)</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item applySQL(string sql)

// 执行 SQL 查询，返回以 Item 封装的查询结果
string sql = "SELECT id, item_number, name FROM innovator.PART WHERE item_number LIKE 'P-%'";
var result = inn.applySQL(sql);

// 结果中的每个行封装为一个 &lt;Item&gt; 节点
if (!result.isError()) {
    for (int i = 0; i < result.getItemCount(); i++) {
        var row = result.getItemByIndex(i);
        string id = row.getID();
        string num = row.getProperty("item_number", "");
    }
}</code></pre>
    <p><strong>注意事项：</strong></p>
    <ul>
      <li>SQL 操作需要有对应的数据库权限</li>
      <li>表名需要使用完整限定名，如 <code>innovator.PART</code></li>
      <li>返回结果中列名会自动转为小写</li>
      <li><strong>不要在 SQL 中拼接用户输入！</strong>使用 <code>applySQLWithParameters</code> 代替</li>
    </ul>

    <h2>三、applySQLWithParameters(String, ...)</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item applySQLWithParameters(string sql, params object[] parameters)

// 参数化查询，防止 SQL 注入
string sql = "SELECT id, item_number FROM innovator.PART WHERE item_number LIKE @pattern AND state = @state";
var result = inn.applySQLWithParameters(sql, "P-%", "Released");</code></pre>
    <p><strong>参数：</strong></p>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>sql</code></td><td><code>string</code></td><td>含 <code>@param</code> 占位符的 SQL 语句</td></tr>
        <tr><td><code>parameters</code></td><td><code>params object[]</code></td><td>按位置顺序替换占位符的参数值</td></tr>
      </tbody>
    </table>

    <h2>四、applyAML vs newItem().apply()</h2>
    <table>
      <thead><tr><th>方式</th><th>优点</th><th>适用场景</th></tr></thead>
      <tbody>
        <tr><td><code>inn.applyAML(aml)</code></td><td>直接控制 XML 结构</td><td>已有 AML 模板、复杂嵌套查询</td></tr>
        <tr><td><code>inn.newItem(type, action).setProperty(...).apply()</code></td><td>类型安全、可读性强</td><td>常规 CRUD 操作</td></tr>
      </tbody>
    </table>
    <p>两种方式底层效果完全一致，构建的 AML 最终通过 <code>IServerConnection</code> 发送到服务器。</p>

    <h2>五、SQL 与 AML 的选择</h2>
    <table>
      <thead><tr><th>场景</th><th>推荐方式</th></tr></thead>
      <tbody>
        <tr><td>简单 CRUD</td><td>AML（newItem + apply）</td></tr>
        <tr><td>复杂 JOIN 查询</td><td>SQL（applySQL）</td></tr>
        <tr><td>需要权限控制</td><td>AML（自动处理权限）</td></tr>
        <tr><td>大数据量聚合</td><td>SQL（性能更好）</td></tr>
        <tr><td>批量更新</td><td>AML（触发 Server Events）</td></tr>
        <tr><td>用户输入查询条件</td><td>SQL（applySQLWithParameters，防止注入）</td></tr>
      </tbody>
    </table>

    <h2>六、完整示例</h2>
    <pre v-pre><code class="language-csharp">// 场景：查询指定用户名下所有已发布零件
var inn = this.newInnovator();

// 方式 1：AML
var query = inn.newItem("Part", "get");
query.setProperty("state", "Released");
query.setProperty("owned_by_id", userId);
var result = query.apply();

// 方式 2：SQL（更灵活）
string sql = @"
    SELECT p.id, p.item_number, p.name, u.keyed_name as owner_name
    FROM innovator.PART p
    JOIN innovator.[USER] u ON p.owned_by_id = u.id
    WHERE p.state = @state AND p.owned_by_id = @ownerId
    ORDER BY p.item_number";
var result2 = inn.applySQLWithParameters(sql, "Released", userId);

// 方式 3：直接 AML 字符串（适合动态构建）
string aml = $@"
    <AML>
        <Item type='Part' action='get'>
            <state>Released</state>
            <owned_by_id>{userId}</owned_by_id>
        </Item>
    </AML>";
var result3 = inn.applyAML(aml);</code></pre>

    <h2>七、实践笔记</h2>
    <ul>
      <li><strong>SQL 权限：</strong>服务端 Method 默认只有只读 SQL 权限，需要写权限需在 Method 属性中设置</li>
      <li><strong>SQL 注入：</strong>永远不要用字符串拼接用户输入构建 SQL，使用 applySQLWithParameters</li>
      <li><strong>AML 比 SQL 安全：</strong>AML 操作会自动走 Aras 的权限系统，SQL 直接操作数据库绕过权限</li>
      <li><strong>性能考量：</strong>复杂聚合查询用 SQL 性能远超 AML；但批量 CRUD 用 AML 可利用缓存和事件</li>
      <li><strong>事务：</strong>applyAML 和 applySQL 都是单独的 HTTP 请求，没有跨调用的自动事务</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_applyAML.htm">applyAML Method</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_applySQL.htm">applySQL Method</a></li>
    </ul>
  </article>
</template>
