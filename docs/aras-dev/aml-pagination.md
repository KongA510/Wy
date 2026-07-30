---
title: AML 分页查询
---

# AML 分页查询
<blockquote>
<p>在 Aras Innovator 中使用 AML 的 <code>page</code> / <code>pagesize</code> 属性实现分页查询，并通过独立计数查询或 <code>fetch</code> 标签获取总数据量与总页数。适用于前端 Grid 分页、报表分批加载、API 分页接口等场景。</p>
</blockquote>

## 一、AML 分页属性
<p>Aras AML 的 <code>&lt;Item&gt;</code> 标签原生支持两个分页属性：</p>

<table>
<thead>
<tr><th>属性</th><th>类型</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td><code>page</code></td><td>int</td><td>页码，从 <strong>1</strong> 开始。不指定时默认返回全部（受服务器 maxRecords 限制）</td></tr>
<tr><td><code>pagesize</code></td><td>int</td><td>每页条数。与 <code>page</code> 配合使用，指定后仅返回当前页数据</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 重要提示</strong>：AML 的 <code>&lt;Item&gt;</code> 查询结果<strong>不会自动返回总记录数</strong>。<code>getItemCount()</code> 返回的只是<strong>当前结果集</strong>中的 Item 数量（即当前页的条数），而非符合条件的总记录数。
</div>

## 二、基础分页 AML
<p>最基础的分页查询 — 通过 <code>page</code> 和 <code>pagesize</code> 控制返回范围：</p>


```xml
<AML>
  <Item type="Part" action="get"
        page="1" pagesize="20"
        select="id,name,item_number,current_state">
    <name condition="like">*Bolt*</name>
    <current_state condition="neq">Obsolete</current_state>
  </Item>
</AML>
```


<p>IOM 调用：</p>

```csharp
Item request = inn.newItem("Part", "get");
request.setAttribute("select", "id,name,item_number,current_state");
request.setAttribute("page", "1");
request.setAttribute("pagesize", "20");
request.setPropertyCondition("name", "like");
request.setProperty("name", "*Bolt*");

Item result = request.apply();
int currentPageCount = result.getItemCount();  // 仅当前页条数！
for (int i = 0; i < currentPageCount; i++) {
    Item part = result.getItemByIndex(i);
    string name = part.getProperty("name", "");
}
```


## 三、获取总数据量 — 三套方案

### 方案一：独立计数查询（推荐，最可靠）
<p>核心思路：<strong>相同的筛选条件 + 最小 select + 不分页</strong>，对返回结果调用 <code>getItemCount()</code> 即为总条数。</p>


```xml
<AML>
  <!-- 查询1：获取总条数（只取 id，最小开销） -->
  <Item type="Part" action="get" select="id">
    <name condition="like">*Bolt*</name>
    <current_state condition="neq">Obsolete</current_state>
  </Item>
  <!-- 查询2：分页数据 -->
  <Item type="Part" action="get"
        page="1" pagesize="20"
        select="id,name,item_number,current_state">
    <name condition="like">*Bolt*</name>
    <current_state condition="neq">Obsolete</current_state>
  </Item>
</AML>
```


<p>IOM 处理：</p>

```csharp
// 查询1：获取总数
Item countQuery = inn.newItem("Part", "get");
countQuery.setAttribute("select", "id");
countQuery.setPropertyCondition("name", "like");
countQuery.setProperty("name", "*Bolt*");
countQuery.setPropertyCondition("current_state", "neq");
countQuery.setProperty("current_state", "Obsolete");

Item countResult = countQuery.apply();
int totalCount = countResult.getItemCount();  // 这就是总条数

// 查询2：分页数据
int pageSize = 20;
int currentPage = 1;
int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

Item pageQuery = inn.newItem("Part", "get");
pageQuery.setAttribute("select", "id,name,item_number,current_state");
pageQuery.setAttribute("page", currentPage.ToString());
pageQuery.setAttribute("pagesize", pageSize.ToString());
pageQuery.setPropertyCondition("name", "like");
pageQuery.setProperty("name", "*Bolt*");
pageQuery.setPropertyCondition("current_state", "neq");
pageQuery.setProperty("current_state", "Obsolete");

Item pageResult = pageQuery.apply();

// 返回给前端
return this.getInnovator().newResult(
    $"查询成功，第 {currentPage}/{totalPages} 页，共 {totalCount} 条"
);
```


<div class="tip-box green">
<strong>✅ 优点</strong>：逻辑清晰，兼容所有 Aras 版本（9.x ~ 2025R），不依赖特定 API。<br/>
<strong>✅ 性能</strong>：计数查询只 select="id"，数据库仅返回 id 列，开销极小。<br/>
<strong>⚠️ 注意</strong>：两次查询之间数据可能发生变化（并发增删），对一致性要求极高的场景需加事务保护。
</div>

### 方案二：合并 AML 一次请求（减网络往返）
<p>通过一条 AML 同时完成计数+分页，利用 <code>getItemByIndex()</code> 分别获取两个结果集：</p>


```csharp
string aml = $@"
<AML>
  <Item type='Part' action='get' select='id'>
    <name condition='like'>*Bolt*</name>
  </Item>
  <Item type='Part' action='get'
        page='{page}' pagesize='{pageSize}'
        select='id,name,item_number'>
    <name condition='like'>*Bolt*</name>
  </Item>
</AML>";

Item result = inn.applyAML(aml);

// 索引 0：计数结果
Item countResult = result.getItemByIndex(0);
int totalCount = countResult.getItemCount();

// 索引 1：分页数据
Item pageResult = result.getItemByIndex(1);
int pageItemCount = pageResult.getItemCount();
```


### 方案三：服务端方法封装（带完整分页信息返回）
<p>将分页逻辑封装为一个可复用的服务端 Method，返回结构化结果：</p>


```csharp
// 服务端 Method: pe_PaginateQuery
// 输入参数：itemType, whereClause, selectClause, page, pageSize
// 返回：包含 totalCount, totalPages, currentPage, pageSize, items 的结果

Innovator inn = this.getInnovator();

string itemType = this.getProperty("item_type", "Part");
string whereClause = this.getProperty("where_clause", "");
string selectFields = this.getProperty("select_fields", "id,name");
int page = int.Parse(this.getProperty("page", "1"));
int pageSize = int.Parse(this.getProperty("page_size", "20"));

// ── Step 1: 构建计数查询 ──
Item countItem = inn.newItem(itemType, "get");
countItem.setAttribute("select", "id");
if (!string.IsNullOrEmpty(whereClause)) {
    countItem.setAttribute("where", whereClause);
}
Item countResult = countItem.apply();
int totalCount = countResult.getItemCount();
int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

// ── Step 2: 分页数据查询 ──
Item dataItem = inn.newItem(itemType, "get");
dataItem.setAttribute("select", selectFields);
dataItem.setAttribute("page", page.ToString());
dataItem.setAttribute("pagesize", pageSize.ToString());
if (!string.IsNullOrEmpty(whereClause)) {
    dataItem.setAttribute("where", whereClause);
}
Item dataResult = dataItem.apply();

// ── Step 3: 组装返回结果 ──
Item response = inn.newResult("");
response.setProperty("total_count", totalCount.ToString());
response.setProperty("total_pages", totalPages.ToString());
response.setProperty("current_page", page.ToString());
response.setProperty("page_size", pageSize.ToString());

// 将分页数据作为子节点附加上去
for (int i = 0; i < dataResult.getItemCount(); i++) {
    Item row = dataResult.getItemByIndex(i);
    // 复制属性到 response 的关联 Item 中...
    Item rowItem = inn.newItem(itemType, "add");
    rowItem.setProperty("id", row.getProperty("id", ""));
    rowItem.setProperty("name", row.getProperty("name", ""));
    response.addRelationship(rowItem);
}

return response;
```


## 四、前端调用示例

### Aras Grid Toolbar 按钮调用

```javascript
// 客户端 JS — 调用服务端分页方法
function onPaginateClick(page, pageSize) {
    const inn = top.aras.IomInnovator;
    const item = inn.newItem("Method", "pe_PaginateQuery");
    item.setProperty("item_type", "Part");
    item.setProperty("where_clause", "name like '%Bolt%'");
    item.setProperty("select_fields", "id,name,item_number,current_state");
    item.setProperty("page", page.toString());
    item.setProperty("page_size", pageSize.toString());

    const result = item.apply();
    const totalCount = result.getProperty("total_count", "0");
    const totalPages = result.getProperty("total_pages", "0");
    const currentPage = result.getProperty("current_page", "1");

    console.log(`第 ${currentPage}/${totalPages} 页，共 ${totalCount} 条`);

    // 遍历分页数据
    const rows = result.getItemsByXPath("//Item[@type='Part']");
    // 或使用 getRelationships()...
}
```


### REST API 分页调用

```json
POST /InnovatorServer/Server/InnovatorServer.aspx
Content-Type: text/xml

<AML>
  <Item type="Part" action="get"
        page="1" pagesize="20"
        select="id,name,item_number">
    <name condition="like">*Bolt*</name>
  </Item>
</AML>
```


## 五、完整封装示例 — 通用分页 Method
<p>以下是生产级封装，支持动态 ItemType、自定义 where、order_by、分页：</p>


```csharp
// =====================================================
// Method: pe_GenericPaginate
// 通用分页查询，返回 XML 包含分页元信息 + 数据行
// =====================================================
// 输入属性：
//   item_type    — ItemType 名称（必填），如 "Part"
//   where_sql    — WHERE 条件（可选），如 "name like '%Bolt%'"
//   order_by     — 排序（可选），如 "name ASC"
//   select_list  — 查询字段（可选，默认 "id,name"）
//   page         — 页码（默认 1）
//   page_size    — 每页条数（默认 20，最大 200）
// =====================================================

Innovator inn = this.getInnovator();

// 读取参数
string itemType = this.getProperty("item_type", "");
int page = Math.Max(1, int.Parse(this.getProperty("page", "1")));
int pageSize = Math.Min(200, Math.Max(1,
    int.Parse(this.getProperty("page_size", "20"))));
string whereSQL = this.getProperty("where_sql", "");
string orderBy = this.getProperty("order_by", "");
string selectList = this.getProperty("select_list", "id,name");

// 构建 AML where 属性
string whereAttr = string.IsNullOrEmpty(whereSQL) ? "" : $" where='{whereSQL.Replace("'", "''")}'";
string orderAttr = string.IsNullOrEmpty(orderBy) ? "" : $" order_by='{orderBy.Replace("'", "''")}'";

// ── 计数查询 ──
Item countItem = inn.newItem(itemType, "get");
countItem.setAttribute("select", "id");
if (!string.IsNullOrEmpty(whereSQL))
    countItem.setAttribute("where", whereSQL);
if (!string.IsNullOrEmpty(orderBy))
    countItem.setAttribute("order_by", orderBy);

Item countResult = countItem.apply();
if (countResult.isError()) return countResult;

int totalCount = countResult.getItemCount();
int totalPages = totalCount == 0 ? 0
    : (int)Math.Ceiling((double)totalCount / pageSize);

// ── 分页查询 ──
Item dataItem = inn.newItem(itemType, "get");
dataItem.setAttribute("select", selectList);
dataItem.setAttribute("page", page.ToString());
dataItem.setAttribute("pagesize", pageSize.ToString());
if (!string.IsNullOrEmpty(whereSQL))
    dataItem.setAttribute("where", whereSQL);
if (!string.IsNullOrEmpty(orderBy))
    dataItem.setAttribute("order_by", orderBy);

Item dataResult = dataItem.apply();
if (dataResult.isError()) return dataResult;

// ── 构建响应 ──
System.Text.StringBuilder xml = new System.Text.StringBuilder();
xml.Append("<Result>");
xml.AppendFormat("<total_count>{0}</total_count>", totalCount);
xml.AppendFormat("<total_pages>{0}</total_pages>", totalPages);
xml.AppendFormat("<current_page>{0}</current_page>", page);
xml.AppendFormat("<page_size>{0}</page_size>", pageSize);
xml.AppendFormat("<has_next>{0}</has_next>",
    page < totalPages ? "true" : "false");
xml.AppendFormat("<has_prev>{0}</has_prev>",
    page > 1 ? "true" : "false");

// 嵌入原始 query result 数据
for (int i = 0; i < dataResult.getItemCount(); i++) {
    Item row = dataResult.getItemByIndex(i);
    xml.Append(row.node.OuterXml);
}
xml.Append("</Result>");

Item response = inn.newItem();
response.loadAML(xml.ToString());
return response;
```


## 六、注意事项与最佳实践

### 1. pagesize 上限
<p>Aras 服务端有默认的 <code>max_records</code> 限制（通常为 1000），即使不指定 <code>page</code>/<code>pagesize</code>，单次查询也不会返回超过此上限的数据。分页时建议 <strong>pageSize ≤ 200</strong>。</p>

### 2. 计数查询性能
<p>计数查询务必使用最小 <code>select="id"</code>，避免不必要的字段查询和关系展开。对于百万级数据，可考虑：</p>
<ul>
<li>使用 <code>where</code> 属性直接写 SQL 而非 AML 条件元素</li>
<li>对于固定维度的统计，使用数据库视图或缓存</li>
<li>避免在计数查询中使用 <code>&lt;Relationships&gt;</code> 展开</li>
</ul>

### 3. 并发一致性
<p>计数查询与分页查询不是原子操作。在高并发场景下，两次查询之间数据可能增删，导致：</p>
<ul>
<li>最后一页数据量少于 pageSize（可接受）</li>
<li>总页数偶尔不准确（对用户体验影响小）</li>
</ul>
<p>如需严格一致性，在数据库层面使用快照隔离。</p>

### 4. 排序稳定性
<p>始终使用 <code>order_by</code> 指定排序，确保跨页结果一致。推荐按 <code>id</code> 或 <code>created_on</code> 排序作为稳定排序键：</p>

```xml
<Item type="Part" action="get"
      page="1" pagesize="20"
      order_by="id ASC"
      select="id,name,item_number">
</Item>
```


### 5. select 字段选择
<table>
<thead>
<tr><th>查询用途</th><th>推荐 select</th><th>原因</th></tr>
</thead>
<tbody>
<tr><td>计数查询</td><td><code>select="id"</code></td><td>只获取主键，最小开销</td></tr>
<tr><td>列表展示</td><td><code>select="id,name,..."</code></td><td>仅取展示所需字段</td></tr>
<tr><td>详情查看</td><td>不设 select 或全字段</td><td>获取完整 Item</td></tr>
</tbody>
</table>

## 七、总结
<table>
<thead>
<tr><th>场景</th><th>推荐方案</th></tr>
</thead>
<tbody>
<tr><td>简单列表分页</td><td>方案一：独立计数查询</td></tr>
<tr><td>高并发 / 减网络开销</td><td>方案二：合并 AML 一次请求</td></tr>
<tr><td>多页面复用 / API 封装</td><td>方案三 + 方案五：通用分页 Method</td></tr>
<tr><td>前端 Grid 分页</td><td>调用 pe_GenericPaginate Method</td></tr>
</tbody>
</table>

<hr />
<p><em>适用版本：Aras Innovator 11.0 ~ 2025R (R37+)，涵盖 IOM API、AML、REST API 分页场景。</em></p>
