---
title: Item 类概述与内部结构
---

<h1>Item 类概述与内部结构</h1>
<blockquote>
<p><strong>Item 类是 Aras IOM 中最重要的类，代表了 AML 结构的内存表示以及与 Innovator 服务器通信的手段。</strong>命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

<h2>一、Item 的 5 种表现形式</h2>
<p>根据 <code>dom</code> 内部结构和 <code>node</code>/<code>nodeList</code> 的值，Item 实例可以代表以下五种形式之一：</p>

<table>
<thead><tr><th>形式</th><th>node</th><th>nodeList</th><th>dom 结构</th></tr></thead>
<tbody>
<tr><td><strong>Single Item</strong></td><td>!= null</td><td>null</td><td>单个 <code>&lt;Item&gt;</code> 节点</td></tr>
<tr><td><strong>Collection</strong></td><td>null</td><td>!= null</td><td>多个 <code>&lt;Item&gt;</code>（AML 或 SOAP-Result 包裹）</td></tr>
<tr><td><strong>Error</strong></td><td>null</td><td>null</td><td>SOAP Fault 元素</td></tr>
<tr><td><strong>Result</strong></td><td>null</td><td>null</td><td>SOAP-Result 包裹的文本</td></tr>
<tr><td><strong>Logical</strong></td><td>!= null</td><td>null</td><td>逻辑节点 &lt;and&gt;、&lt;or&gt;、&lt;not&gt;</td></tr>
</tbody>
</table>

<h2>二、核心属性（3 个）</h2>
<table>
<thead><tr><th>属性</th><th>.NET 类型</th><th>COM 类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>dom</code></td><td><code>System.Xml.XmlDocument</code></td><td><code>MSXML2.IXMLDOMDocument</code></td><td>持有 Item AML 数据的 XML 文档</td></tr>
<tr><td><code>node</code></td><td><code>System.Xml.XmlElement</code></td><td><code>MSXML2.IXMLDOMElement</code></td><td>引用 dom 中的 &lt;Item&gt; 节点</td></tr>
<tr><td><code>nodeList</code></td><td><code>System.Xml.XmlNodeList</code></td><td><code>MSXML2.IXMLDOMNodeList</code></td><td>dom 中所有 &lt;Item&gt; 节点的列表</td></tr>
</tbody>
</table>

<h2>三、静态字段（3 个 XPath 常量）</h2>

```csharp
// XPath 到 SOAP Fault 根节点（错误 Item 时）
public static string XPathFault

// XPath 到 <Result> 标签（服务器响应中）
public static string XPathResult

// XPath 到顶层 <Item> 标签
public static string XPathResultItem
```


<h2>四、方法分类总览（90+ 个方法）</h2>
<ul>
<li><strong>属性操作（15 个）：</strong>getProperty ×3, setProperty ×2, removeProperty ×2, getPropertyAttribute ×3, setPropertyAttribute ×2, removePropertyAttribute ×2, getPropertyCondition ×2, setPropertyCondition ×2</li>
<li><strong>通用属性（5 个）：</strong>getAttribute ×2, setAttribute, removeAttribute, getAction, setAction, getType, setType</li>
<li><strong>标识（4 个）：</strong>getID, setID, setNewID, getNewID</li>
<li><strong>AML/XML（9 个）：</strong>loadAML, ToString, isCollection, isEmpty, isRoot, isNew, clone, getInnovator, getParentItem</li>
<li><strong>服务器通信（8 个）：</strong>apply ×5 重载, fetchRelationships ×3, fetchLockStatus, fetchDefaultPropertyValues, getItemsByXPath</li>
<li><strong>关系操作（9 个）：</strong>addRelationship, createRelationship, removeRelationship, getRelationships ×4, createRelatedItem, getRelatedItem, setRelatedItem, getRelatedItemID</li>
<li><strong>逻辑条件（6 个）：</strong>newAND, newOR, newNOT, isLogical, getLogicalChildren, removeLogical</li>
<li><strong>文件管理（10 个）：</strong>attachPhysicalFile ×2, attachPhysicalFileViaStream, fetchFileProperty, fetchFilePropertyWithStream, setFileProperty, setFilePropertyViaStream, checkout, getFileName(废弃), setFileName(废弃)</li>
<li><strong>生命周期（5 个）：</strong>promote, instantiateWorkflow, lockItem, unlockItem, getLockStatus</li>
<li><strong>错误处理（8 个）：</strong>isError, getErrorCode, getErrorDetail, getErrorSource, getErrorString, setErrorCode, setErrorDetail, setErrorString, setErrorSource</li>
<li><strong>杂项（8 个）：</strong>appendItem, removeItem, getItemByIndex, getItemCount, createPropertyItem, setPropertyItem, getPropertyItem, email, applyStylesheet, newItem ×3, newXMLDocument</li>
</ul>

<h2>五、内存操作 vs 服务器通信</h2>
<p>Item 的方法分为两类：</p>
<ul>
<li><strong>仅操作 AML 内存：</strong>所有 get/set/add/remove 方法、isXXX 方法（如 isError、isCollection）</li>
<li><strong>与服务器通信：</strong>所有 fetchXXX 方法、apply、email、promote、lock/unlockItem</li>
</ul>

<h2>六、各类形式的判断方法</h2>

```csharp
// 判断 Item 的当前形式
if (item.isError())       { /* 错误 Item */ }
if (item.isCollection())  { /* 集合，nodeList != null */ }
if (!item.isCollection() && !item.isError() && item.node != null) { /* 单个 Item */ }
if (item.isLogical())     { /* 逻辑条件 */ }
if (item.isRoot())        { /* 是 dom 中的根 Item */ }
if (item.isEmpty())       { /* dom 为空或仅含 Fault */ }
```


<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Item.htm">Item Class — Aras API Reference</a></li>
</ul>
