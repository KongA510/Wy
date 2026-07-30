---
title: 逻辑条件
---

# 逻辑条件
<blockquote>
<p><strong>Item 提供逻辑条件操作，用于构造复杂的 AML 查询条件。</strong>包括 newAND、newOR、newNOT 三种逻辑节点，以及对逻辑节点的增删查操作。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

## 一、逻辑节点概述
<p>Aras AML 支持三种逻辑组合标签：</p>
<ul>
<li><code>&lt;and&gt;</code> — 所有子条件必须同时满足（逻辑与）</li>
<li><code>&lt;or&gt;</code> — 任一子条件满足即可（逻辑或）</li>
<li><code>&lt;not&gt;</code> — 取反（逻辑非）</li>
</ul>
<p>这些逻辑节点用于构造查询条件（action="get"），通常放在 &lt;Item&gt; 节点内部。</p>

## 二、newAND() — 创建 AND 节点

```csharp
// 签名
public Item newAND()

// 在父节点（可以是 Item 或另一逻辑节点）下插入 <and> 节点
// 返回代表新 <and> 节点的 Item
var query = inn.newItem("Part", "get");
var andNode = query.newAND();
// 生成: <Item type="Part" action="get"><and></and></Item>

// 在 AND 节点下添加条件
andNode.setProperty("state", "Released");
andNode.setProperty("cost", "100");
andNode.setPropertyCondition("cost", "gt");
// 生成：<and><state>Released</state><cost condition="gt">100</cost></and>
```


## 三、newOR() — 创建 OR 节点

```csharp
// 签名
public Item newOR()

// 创建 OR 逻辑节点
var query = inn.newItem("Part", "get");
var orNode = query.newOR();
orNode.setProperty("state", "Released");
orNode.setProperty("state", "In Review");
// 生成：<or><state>Released</state><state>In Review</state></or>
```


## 四、newNOT() — 创建 NOT 节点

```csharp
// 签名
public Item newNOT()

// 创建 NOT 逻辑节点
var query = inn.newItem("Part", "get");
var notNode = query.newNOT();
notNode.setProperty("state", "Obsolete");
// 生成：<not><state>Obsolete</state></not>
// 语义：state 不是 "Obsolete" 的 Part
```


## 五、其他逻辑方法

```csharp
// isLogical() — 判断 Item.node 是否为逻辑节点
public bool isLogical()
if (item.isLogical()) { ... }

// getLogicalChildren() — 获取逻辑子节点
public Item getLogicalChildren()

// removeLogical(Item) — 移除逻辑节点
public void removeLogical(Item logicalItem)
```


## 六、嵌套逻辑示例

```csharp
// 查询条件：(state="Released" AND cost>100) OR (state="In Review")
var query = inn.newItem("Part", "get");

var orNode = query.newOR();

// 第一个 AND 分支
var andBranch = orNode.newAND();
andBranch.setProperty("state", "Released");
andBranch.setProperty("cost", "100");
andBranch.setPropertyCondition("cost", "gt");

// 第二个直接条件
orNode.setProperty("state", "In Review");

// 生成的 AML 结构：
// <Item type="Part" action="get">
//   <or>
//     <and>
//       <state>Released</state>
//       <cost condition="gt">100</cost>
//     </and>
//     <state>In Review</state>
//   </or>
// </Item>

var result = query.apply();
```


## 七、实践笔记
<ul>
<li><strong>逻辑节点不含 attributes：</strong>与 &lt;Item&gt; 不同，逻辑节点只包含属性子元素，没有 type/action 等属性</li>
<li><strong>嵌套不受限制：</strong>可无限嵌套 and/or/not，但过深嵌套可能影响性能</li>
<li><strong>NOT 节点通常只含一个子条件：</strong>虽然 NOT 内可以放多个条件，但语义上通常只放一个</li>
<li><strong>逻辑节点传回去给 Item：</strong>回到父 Item 调用相关方法时，这个逻辑节点就是 Item 的子节点，无需特殊处理</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_newAND.htm">newAND Method</a></li>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_newOR.htm">newOR Method</a></li>
</ul>
