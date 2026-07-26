<template>
  <article class="doc-content">
    <h1>Item 集合与遍历</h1>
    <blockquote><p><strong>管理 Item 集合的方法——添加、移除、遍历子节点。</strong>Item 可以包含多个子 Item（如查询结果），这些方法用于操作内部的 Item 集合。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、方法签名</h2>
    <pre v-pre><code class="language-csharp">// 获取集合中的 Item
public Item getItemByIndex(int index)        // 按索引获取子 Item（0-based）
public int getItemCount()                     // 获取子 Item 数量

// 修改集合
public void appendItem(Item childItem)        // 追加子 Item
public void removeItem(Item childItem)        // 移除指定子 Item

// 关联查询结果
public Item getResult()                       // 获取关联查询结果（如 apply 的结果）
public string getRelatedItemID()             // 获取相关 Item 的 ID

// Property 操作（用于 properties 标签下的子节点）
public Item createPropertyItem(string propertyName)    // 创建 property 子节点
public Item setPropertyItem(string propertyName, Item propItem) // 设置 property 子节点
public Item getPropertyItem(string propertyName)       // 获取 property 子节点</code></pre>

    <h2>二、参数说明</h2>
    <table><thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead><tbody>
      <tr><td><code>index</code></td><td>int</td><td>0-based 索引位置</td></tr>
      <tr><td><code>childItem</code></td><td>Item</td><td>要追加或移除的子 Item 对象</td></tr>
      <tr><td><code>propertyName</code></td><td>String</td><td>属性名称</td></tr>
      <tr><td><code>propItem</code></td><td>Item</td><td>要设置的 property Item 节点</td></tr>
    </tbody></table>

    <h2>三、代码示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// ===== 遍历查询结果 =====
var query = inn.newItem("Part", "get");
query.setAttribute("select", "item_number,name,state");
query.setAttribute("maxRecords", "50");
var result = query.apply();

if (!result.isError())
{
    int count = result.getItemCount();
    for (int i = 0; i < count; i++)
    {
        Item part = result.getItemByIndex(i);
        string number = part.getProperty("item_number");
        string name = part.getProperty("name");
        Console.WriteLine($"[{i}] {number} - {name}");
    }
}

// ===== 构建多层 AML 结构 =====
var mainItem = inn.newItem("Part", "add");
mainItem.setProperty("item_number", "P-001");
mainItem.setProperty("name", "New Part");

// 添加 BOM 关系
var bomRel = inn.newItem("Part BOM", "add");
bomRel.setProperty("quantity", "5");
var childPart = inn.newItem("Part", "add");
childPart.setProperty("item_number", "P-002");
bomRel.setRelatedItem(childPart);
mainItem.addRelationship(bomRel);

// 手动追加 Item 到集合
var extraRel = inn.newItem("Part BOM", "add");
extraRel.setProperty("quantity", "3");
mainItem.appendItem(extraRel);   // 追加到 Item 集合

// ===== getResult 获取关联结果 =====
var query2 = inn.newItem("Part", "get");
query2.setAttribute("select", "item_number");
var relResult = query2.apply();
if (!relResult.isError())
{
    // 当需要获取关联的原始查询结果时
    Item origResult = relResult.getResult();
}
</code></pre>

    <h2>四、实践笔记</h2>
    <ul>
      <li><strong>getItemByIndex 边界：</strong>索引必须在 <code>0</code> 到 <code>getItemCount()-1</code> 范围内，超出会抛出异常</li>
      <li><strong>appendItem vs addRelationship：</strong>appendItem 向 Item 集合添加任意 Item，addRelationship 专门添加关系 Item 并维护关系结构</li>
      <li><strong>Property Item：</strong>createPropertyItem/setPropertyItem/getPropertyItem 用于操作 AML 中 <code>&lt;Relationships&gt;</code> 内的属性节点，日常使用较少，大部分场景用 getProperty/setProperty 即可</li>
      <li><strong>getRelatedItemID：</strong>返回关联 Item 的 ID 字符串，常用于检查是否已设置关联</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Item.htm">Item Class</a></li></ul>
  </article>
</template>
