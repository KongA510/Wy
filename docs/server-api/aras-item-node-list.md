---
title: ArasItemNodeList
---

# ArasItemNodeList
<blockquote><p><strong>ArasItemNodeList 是 Aras.IOM 内部的 Item 节点集合类。</strong>用于管理 Item 的 XML 子节点列表，实现了 IEnumerable 接口可 foreach 遍历。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p></blockquote>

## 一、类定义

```csharp
// ArasItemNodeList — Item XML 节点列表
// 封装了 XmlNodeList，提供了便捷的 Item 遍历能力
public class ArasItemNodeList : IEnumerable
{
    // 属性
    public int Count { get; }              // 节点数量
    public Item this[int index] { get; }  // 按索引获取 Item（索引器）

    // 方法
    public IEnumerator GetEnumerator()     // 获取枚举器，支持 foreach
}
```


## 二、获取方式

```csharp
var inn = this.newInnovator();

// 从 Item 的 nodeList 属性获取
var item = inn.newItem("Part", "get");
var result = item.apply();

// nodeList 返回 ArasItemNodeList
ArasItemNodeList nodeList = result.nodeList;

// 遍历所有子节点
foreach (Item child in nodeList)
{
    string type = child.getType();
    string id = child.getID();
    Console.WriteLine($"Type: {type}, ID: {id}");
}
```


## 三、代码示例

```csharp
var inn = this.newInnovator();

// ===== 使用 nodeList 遍历查询结果 =====
var query = inn.newItem("Part", "get");
query.setAttribute("select", "item_number,name");
var result = query.apply();

// 方式1：通过索引器
ArasItemNodeList nodes = result.nodeList;
for (int i = 0; i < nodes.Count; i++)
{
    Item part = nodes[i];
    Console.WriteLine(part.getProperty("item_number"));
}

// 方式2：foreach 遍历
foreach (Item part in result.nodeList)
{
    Console.WriteLine(part.getProperty("name"));
}

// ===== 对比 getItemByIndex vs nodeList =====
// getItemByIndex(index) — 适用于 result Item（查询返回的 Item 容器）
for (int i = 0; i < result.getItemCount(); i++)
{
    Item p = result.getItemByIndex(i);  // 常用方式
}

// nodeList — 适用于 Item 内部的 XML 子节点
foreach (Item child in result.nodeList)
{
    // 与 getItemByIndex 遍历效果相同，但 nodeList 更底层
}
```


## 四、实践笔记
<ul>
<li><strong>nodeList vs getItemByIndex：</strong>两者通常等价，<code>getItemByIndex(i)</code> 内部也依赖 nodeList。日常开发推荐使用 <code>getItemByIndex</code> 和 <code>getItemCount</code> 组合</li>
<li><strong>Count 属性：</strong>等同于 <code>getItemCount()</code></li>
<li><strong>索引器：</strong><code>nodeList[i]</code> 等同于 <code>getItemByIndex(i)</code></li>
<li><strong>foreach 支持：</strong>实现了 IEnumerable，可直接 <code>foreach (Item child in result.nodeList)</code></li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_ArasItemNodeList.htm">ArasItemNodeList Class</a></li></ul>
