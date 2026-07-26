<template>
  <article class="doc-content">
    <h1>关系操作</h1>
    <blockquote>
      <p><strong>Item 提供完整的关系操作方法。</strong>包括创建/移除 Relationships 节点、获取关系Item、设置关联项等。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、添加和创建关系</h2>
    <pre v-pre><code class="language-csharp">// addRelationship(Item) — 将传入 Item 作为关系添加
public void addRelationship(Item relationshipItem)
// 将传入 Item 的 node 移到 this.node 下的 &lt;Relationships&gt; 节点中
item.addRelationship(relItem);

// createRelationship(type, action) — 在 &lt;Relationships&gt; 下创建新关系节点
public Item createRelationship(string type, string action)
var rel = item.createRelationship("Part BOM", "add");
rel.setProperty("related_id", childPartId);
rel.setProperty("quantity", "2");

// createRelatedItem(type, action) — 创建关联 Item 并设为关系
public Item createRelatedItem(string type, string action)
var related = item.createRelatedItem("Part BOM", "add");
related.setProperty("related_id", childPartId);</code></pre>

    <h2>二、获取关系</h2>
    <pre v-pre><code class="language-csharp">// getRelationships() — 获取所有关系
public Item getRelationships()
var allRels = item.getRelationships();

// getRelationships(type) — 按类型获取关系
public Item getRelationships(string type)
var boms = item.getRelationships("Part BOM");

// getRelatedItem() — 获取关系的关联项
public Item getRelatedItem()
// getRelatedItemID() — 获取关联项 ID
public string getRelatedItemID()</code></pre>

    <h2>三、removeRelationship / setRelatedItem</h2>
    <pre v-pre><code class="language-csharp">// removeRelationship(Item) — 移除关系
public void removeRelationship(Item relationshipItem)

// setRelatedItem(Item) — 设置关联项
public void setRelatedItem(Item relatedItem)</code></pre>

    <h2>四、fetchRelationships — 从服务器拉取关系</h2>
    <pre v-pre><code class="language-csharp">// fetchRelationships(type)
public Item fetchRelationships(string type)

// fetchRelationships(type, select)
public Item fetchRelationships(string type, string select)

// fetchRelationships(type, select, order)
public Item fetchRelationships(string type, string select, string order)

// 从服务器获取关系数据
var part = inn.getItemById("Part", partId);
part.fetchRelationships("Part BOM", "id,related_id,quantity");</code></pre>

    <h2>五、完整示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 场景：在 add Part 时同时添加 BOM 关系
var part = inn.newItem("Part", "add");
part.setNewID();
part.setProperty("item_number", "ASSY-001");
part.setProperty("name", "总成");

// 添加组件 1
var bom1 = part.createRelationship("Part BOM", "add");
bom1.setProperty("related_id", childPartId1);
bom1.setProperty("quantity", "1");

// 添加组件 2
var bom2 = part.createRelationship("Part BOM", "add");
bom2.setProperty("related_id", childPartId2);
bom2.setProperty("quantity", "3");

// 一次性提交
var result = part.apply();

// 场景：读取已有 Part 的 BOM 关系
var existingPart = inn.getItemById("Part", partId);
existingPart.fetchRelationships("Part BOM");
var boms = existingPart.getRelationships("Part BOM");
for (int i = 0; i < boms.getItemCount(); i++) {
    var bom = boms.getItemByIndex(i);
    string relatedId = bom.getRelatedItemID();
    string qty = bom.getProperty("quantity", "1");
}</code></pre>

    <h2>六、实践笔记</h2>
    <ul>
      <li><strong>createRelationship vs addRelationship：</strong>createRelationship 在 Item 内部创建新节点；addRelationship 将已有 Item 附加为关系</li>
      <li><strong>fetchRelationships 是服务器调用：</strong>与 getRelationships（仅内存操作）不同，fetch 会发起 HTTP 请求</li>
      <li><strong>select 参数重要：</strong>fetch 大量关系时指定 select 减少数据量</li>
      <li><strong>关系 Item 的 action：</strong>关系也有 action（add/edit/delete），可在一个 apply 中混合操作</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Item.htm">Item Class</a></li>
    </ul>
  </article>
</template>
