---
title: Attribute 操作
---

<h1>Attribute 操作</h1>
<blockquote>
<p><strong>Item 提供全面的 Attribute 操作方法，用于操作 Item 节点和属性子元素上的 XML 属性。</strong>包括通用 Attribute 操作、Property Attribute 操作、Action/Type 操作等。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

<h2>一、通用 Item Attribute 操作</h2>

```csharp
// getAttribute — 读取 Item 节点上的属性
public string getAttribute(string name)
public string getAttribute(string name, string defaultValue)

string type = item.getAttribute("type");       // 读取 type 属性
string action = item.getAttribute("action", "get"); // 带默认值
string select = item.getAttribute("select");    // 读取 select 属性
string orderBy = item.getAttribute("order_by");

// setAttribute — 设置 Item 节点上的属性
public void setAttribute(string name, string value)

item.setAttribute("select", "id,item_number,name,state");
item.setAttribute("order_by", "item_number");
item.setAttribute("maxRecords", "100");

// removeAttribute — 移除属性
public void removeAttribute(string name)

item.removeAttribute("temporary_attr");
```


<h2>二、Property Attribute 操作</h2>

```csharp
// getPropertyAttribute — 读取属性子元素的 XML 属性
public string getPropertyAttribute(string propName, string attrName)
public string getPropertyAttribute(string propName, string attrName, string defaultValue)
public string getPropertyAttribute(string propName, string attrName, string defaultValue, string language)

// 示例：读取 <item_number condition="like">P-</item_number> 中的 condition 属性
string cond = item.getPropertyAttribute("item_number", "condition");

// setPropertyAttribute — 设置属性子元素的 XML 属性
public void setPropertyAttribute(string propName, string attrName, string attrValue)
public void setPropertyAttribute(string propName, string attrName, string attrValue, string language)

item.setPropertyAttribute("item_number", "condition", "like");

// removePropertyAttribute — 移除属性子元素上的 XML 属性
public void removePropertyAttribute(string propName, string attrName)
public void removePropertyAttribute(string propName, string attrName, string language)
```


<h2>三、Action 和 Type 操作</h2>

```csharp
// getAction / setAction — 操作类型
public string getAction()
public void setAction(string action)

string action = item.getAction();              // 如 "get"、"add"、"edit"
item.setAction("delete");

// getType / setType — ItemType
public string getType()
public void setType(string type)

string type = item.getType();                  // 如 "Part"、"Document"
item.setType("Part");
```


<h2>四、完整示例：构造复杂查询</h2>

```csharp
var inn = this.newInnovator();

// 构造带 select/order_by/条件的查询
var query = inn.newItem("Part", "get");
query.setAttribute("select", "id,item_number,name,state,cost");
query.setAttribute("order_by", "item_number ASC");
query.setAttribute("maxRecords", "50");

// 等值条件
query.setProperty("state", "Released");

// like 条件
query.setProperty("item_number", "P-2025-%");
query.setPropertyCondition("item_number", "like");

// 大于条件
query.setProperty("cost", "100");
query.setPropertyCondition("cost", "gt");

var result = query.apply();
```


<h2>五、常用 Item 级别 Attributes</h2>
<table>
<thead><tr><th>Attribute</th><th>说明</th><th>示例值</th></tr></thead>
<tbody>
<tr><td><code>type</code></td><td>ItemType 名称</td><td>"Part"</td></tr>
<tr><td><code>action</code></td><td>AML 操作</td><td>"get"、"add"、"edit"、"delete"</td></tr>
<tr><td><code>id</code></td><td>Item ID</td><td>32位十六进制</td></tr>
<tr><td><code>select</code></td><td>返回哪些属性</td><td>"id,name,state"</td></tr>
<tr><td><code>order_by</code></td><td>排序列</td><td>"item_number ASC"</td></tr>
<tr><td><code>maxRecords</code></td><td>最大返回条数</td><td>"100"</td></tr>
<tr><td><code>page</code></td><td>页码</td><td>"1"</td></tr>
<tr><td><code>pagesize</code></td><td>每页条数</td><td>"20"</td></tr>
<tr><td><code>isNew</code></td><td>是否新建</td><td>"0" / "1"</td></tr>
</tbody>
</table>

<h2>六、实践笔记</h2>
<ul>
<li><strong>setPropertyCondition vs setPropertyAttribute：</strong>两者效果相同，setPropertyCondition 是快捷方式</li>
<li><strong>select 优化：</strong>始终指定 select 列表，避免返回不需要的属性，大幅提升传输性能</li>
<li><strong>getAttribute 带默认值：</strong>避免 null 检查，保持代码可读性</li>
<li><strong>isNew 属性：</strong>新建的 Item 在 apply 成功后 isNew 会变化，不要手动设置</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Item.htm">Item Class — Aras API Reference</a></li>
</ul>
