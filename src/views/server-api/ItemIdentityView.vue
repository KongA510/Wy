<template>
  <article class="doc-content">
    <h1>标识与类型</h1>
    <blockquote>
      <p><strong>Item 的标识和类型操作方法处理 Item ID 的获取和设置。</strong>包括 getID、setID、setNewID、getNewID、getAction、setAction、getType、setType。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、getID() — 获取 Item ID</h2>
    <pre v-pre><code class="language-csharp">// 签名
public string getID()

// 返回 Item 节点的 ID。ID 可以是 id 属性或 &lt;id&gt; 子标签
string partId = item.getID();</code></pre>
    <p>根据 AML 标准，ID 可以设置在 <code>&lt;Item&gt;</code> 的 <code>id</code> 属性中，或作为子标签 <code>&lt;id&gt;</code>，或两者都有。getID() 优先取属性中的 id。</p>

    <h2>二、setID(String) — 设置 Item ID</h2>
    <pre v-pre><code class="language-csharp">// 签名
public void setID(string id)

// 同时设置 id 属性和 &lt;id&gt; 属性子元素
item.setID("A1B2C3D4E5F6789012345678ABCDEF01");

// 典型用法：创建新 Item
var newPart = inn.newItem("Part", "add");
newPart.setID(inn.getNewID());</code></pre>

    <h2>三、setNewID() — 自动设置新 ID</h2>
    <pre v-pre><code class="language-csharp">// 签名
public void setNewID()

// 等价于 item.setID(item.getNewID())
// 内部调用 getNewID() 获取新 GUID，再调用 setID()
var newDoc = inn.newItem("Document", "add");
newDoc.setNewID();  // 自动分配新 ID</code></pre>

    <h2>四、getNewID() — 生成新 ID</h2>
    <pre v-pre><code class="language-csharp">// 签名
public string getNewID()

// 生成 32 字符十六进制 GUID 字符串
string newId = item.getNewID();
// 与 Innovator.getNewID() 功能相同</code></pre>

    <h2>五、Action 和 Type 操作</h2>
    <pre v-pre><code class="language-csharp">// getAction / setAction
public string getAction()
public void setAction(string action)

// getType / setType
public string getType()
public void setType(string type)

// 示例
item.setType("Part");
item.setAction("get");
string type = item.getType();
string action = item.getAction();</code></pre>

    <h2>六、完整示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 场景一：创建新 Item（自动分配 ID）
var part = inn.newItem("Part", "add");
part.setNewID();
part.setProperty("item_number", "P-001");
var result = part.apply();
string newPartId = result.getID();  // 服务器可能返回不同的 ID

// 场景二：更新现有 Item
var edit = inn.newItem("Part", "edit");
edit.setID(existingPartId);
edit.setProperty("name", "更新名称");
edit.apply();

// 场景三：查询时读取 ID
var query = inn.newItem("Part", "get");
query.setAttribute("select", "id,item_number,name");
var results = query.apply();
for (int i = 0; i < results.getItemCount(); i++) {
    var item = results.getItemByIndex(i);
    string id = item.getID();
    string num = item.getProperty("item_number", "");
}</code></pre>

    <h2>七、实践笔记</h2>
    <ul>
      <li><strong>ID 唯一性：</strong>getNewID() 基于 GUID，冲突概率极低，可安全用于客户端预分配</li>
      <li><strong>id 属性 vs id 子标签：</strong>setID 同时设置两者，确保兼容性</li>
      <li><strong>服务器返回的 ID：</strong>add 操作返回的结果 Item 中 ID 可能与传入的不同（服务器端可能重新分配）</li>
      <li><strong>不要手动构造 ID：</strong>始终使用 getNewID() 生成，保持 ID 格式一致性</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_getID.htm">getID Method</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_setID.htm">setID Method</a></li>
    </ul>
  </article>
</template>
