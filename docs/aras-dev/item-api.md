---
title: Item 对象 API
---

<h1>Item 对象 API</h1>
<blockquote>
<p><strong>Item</strong> 是 IOM 的<strong>数据载体</strong>，对应数据库中一个 ItemType 实例。Item 对象同时承载属性数据、属性条件、关系子项和 XML 元数据，是 Aras 开发中使用最频繁的对象。</p>
</blockquote>

<h2>一、属性操作（Property）</h2>
<table>
<thead><tr><th>方法</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>item.setProperty(name, value)</code></td><td>设置属性值（用于 add/edit）/ 查询条件值（用于 get）</td></tr>
<tr><td><code>item.getProperty(name, defaultValue)</code></td><td>获取属性值，第二个参数为默认值</td></tr>
<tr><td><code>item.setPropertyCondition(name, condition)</code></td><td>设置查询条件运算符（如 "eq", "like", "gt", "between"）</td></tr>
</tbody>
</table>


```csharp
// 查询：设置条件
var part = inn.newItem("Part", "get");
part.setProperty("item_number", "P-001");            // 值
part.setPropertyCondition("item_number", "eq");      // 条件运算符
// 等效于：where item_number = 'P-001'

part.setProperty("modified_on", "2025-01-01");
part.setPropertyCondition("modified_on", "gt");
// 等效于：where modified_on > '2025-01-01'

// 编辑：设置新值
var editPart = inn.newItem("Part", "edit");
editPart.setProperty("name", "新名称");
editPart.setAttribute("where", "Part.id='xxx'");
```


<h2>二、属性操作（Attribute）</h2>
<p><strong>属性（Attribute）</strong> 不是 ItemType 的数据字段，而是 AML/XML 元素本身的元属性。最常见的 Attribute 包括：</p>
<table>
<thead><tr><th>方法</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>item.setAttribute(name, value)</code></td><td>在 AML 元素上设置 Attribute</td></tr>
<tr><td><code>item.getAttribute(name, defaultValue)</code></td><td>获取 AML 元素的 Attribute 值</td></tr>
</tbody>
</table>
<p><strong>常用 Attribute：</strong></p>
<table>
<thead><tr><th>Attribute 名</th><th>用途</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>select</code></td><td>指定返回字段</td><td><code>"id,name,item_number"</code></td></tr>
<tr><td><code>where</code></td><td>SQL WHERE 条件</td><td><code>"Part.id='xxx'"</code></td></tr>
<tr><td><code>type</code></td><td>指定 ItemType</td><td><code>"Part"</code></td></tr>
<tr><td><code>action</code></td><td>操作类型</td><td><code>"get"|"add"|"edit"|"delete"</code></td></tr>
<tr><td><code>order_by</code></td><td>排序</td><td><code>"item_number asc"</code></td></tr>
<tr><td><code>page</code></td><td>分页页码</td><td><code>"1"</code></td></tr>
<tr><td><code>pagesize</code></td><td>每页条数</td><td><code>"50"</code></td></tr>
<tr><td><code>doGetItem</code></td><td>控制 apply 是否返回自身</td><td><code>"0"|"1"</code></td></tr>
</tbody>
</table>

<h2>三、结果集操作</h2>
<table>
<thead><tr><th>方法</th><th>返回类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>item.getItemCount()</code></td><td>int</td><td>返回查询结果的数量</td></tr>
<tr><td><code>item.getItemByIndex(i)</code></td><td>Item</td><td>按索引获取第 i 条结果（0-based）</td></tr>
<tr><td><code>item.getItemsByXPath(xpath)</code></td><td>Item[]</td><td>按 XPath 过滤子 Item</td></tr>
<tr><td><code>item.isError()</code></td><td>bool</td><td>判断操作是否出错</td></tr>
<tr><td><code>item.getErrorString()</code></td><td>string</td><td>获取错误信息</td></tr>
<tr><td><code>item.isCollection()</code></td><td>bool</td><td>判断是否为 Item 集合（查询结果）</td></tr>
<tr><td><code>item.isRoot()</code></td><td>bool</td><td>判断是否为根 Item</td></tr>
</tbody>
</table>

<h2>四、关系操作</h2>

```csharp
// 添加关系子项
var partBom = inn.newItem("Part BOM", "add");
partBom.setProperty("quantity", "5");

var childPart = inn.newItem("Part", "get");
childPart.setProperty("item_number", "P-002");
partBom.setRelatedItem(childPart);

var parentPart = inn.newItem("Part", "edit");
parentPart.setProperty("id", "xxx");
parentPart.addRelationship(partBom);
parentPart.apply();

// 获取关系子项
var parent = inn.newItem("Part", "get");
parent.setProperty("id", "xxx");
var rels = parent.getRelationships("Part BOM");
for (var i = 0; i < rels.getItemCount(); i++) {
    var bom = rels.getItemByIndex(i);
    var qty = bom.getProperty("quantity", "0");
}
```

<table>
<thead><tr><th>方法</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>item.addRelationship(relItem)</code></td><td>添加关系子项（用于 add/edit Item）</td></tr>
<tr><td><code>item.removeRelationship(relItem)</code></td><td>移除关系子项</td></tr>
<tr><td><code>item.getRelationships(relTypeName)</code></td><td>获取指定关系类型的所有子项</td></tr>
<tr><td><code>item.setRelatedItem(relatedItem)</code></td><td>设置关系项指向的关联 Item</td></tr>
<tr><td><code>item.getRelatedItem()</code></td><td>获取关系项指向的关联 Item</td></tr>
</tbody>
</table>

<h2>五、生命周期操作</h2>

```csharp
// 推进生命周期状态
var part = inn.newItem("Part", "get");
part.setProperty("id", "xxx");
part = part.apply();

// promote(目标状态, 审批备注)
part = part.promote("Released", "设计评审通过");

// 获取当前状态
var currentState = part.getProperty("state", "");
```


<h2>六、Server-Side Method 中的 this 引用</h2>
<p>在服务端 Method 上下文中，<code>this</code> 是一个特殊的 Item 对象，代表<strong>触发该方法的 Method ItemType 实例</strong>。通过 <code>this.getProperty()</code> 获取调用方传入的参数：</p>

```csharp
// 前端调用: inn.applyMethod("MyMethod", "<myParam>value</myParam>")
// 后端接收:
var paramValue = this.getProperty("myParam", "");
```


<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/IOM%20Reference.htm">Aras IOM Reference</a></li>
<li><a href="http://myinnovator.com/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_setPropertyItem.htm">Item.setPropertyItem API</a></li>
</ul>
