<template>
  <article class="doc-content">
    <h1>apply 与服务器通信</h1>
    <blockquote>
      <p><strong>apply 方法是 Item 与 Innovator 服务器通信的核心接口。</strong>共有 5 个重载（1 个已废弃），用于发送 AML 请求并接收服务器响应。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、apply() — 无参数</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item apply()

// 将 this.dom 的 XML 作为 AML 发送到服务器
var item = inn.newItem("Part", "get");
item.setProperty("item_number", "P-001");
var result = item.apply();</code></pre>
    <p>前提是 Item 上已设置了 action（通过 newItem 或 setAction），否则服务器无法确定操作类型。</p>

    <h2>二、apply(Hashtable) — 带属性设置</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item apply(Hashtable properties)

// 先设置指定的属性，再发送 AML
var ht = new Hashtable();
ht["item_number"] = "P-001";
ht["state"] = "Released";
var result = item.apply(ht); // 等价于 setProperty 两次 + apply()</code></pre>

    <h2>三、apply(String) — 设置 action 后调用</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item apply(string action)

// 设置 action 属性后发送 AML
var item = inn.newItem("Part");
item.setProperty("item_number", "P-001");
var result = item.apply("get");  // 设置 action = "get" 并发送</code></pre>

    <h2>四、apply(String, Hashtable) — 设置 action + 属性后调用</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item apply(string action, Hashtable properties)

// 设置 action 和指定属性后发送 AML
var ht = new Hashtable();
ht["item_number"] = "P-001";
var result = item.apply("get", ht);</code></pre>

    <h2>五、已废弃：apply(String, Hashtable, String)</h2>
    <pre v-pre><code class="language-csharp">// [Obsolete]
// public Item apply(string action, Hashtable properties, string language)

// 已废弃，请使用其他重载</code></pre>

    <h2>六、apply 操作对应的 AML action</h2>
    <table>
      <thead><tr><th>AML Action</th><th>数据库操作</th><th>触发 Server Events</th></tr></thead>
      <tbody>
        <tr><td><code>get</code></td><td>SELECT</td><td>onGet, onSearch</td></tr>
        <tr><td><code>add</code></td><td>INSERT</td><td>onBeforeAdd, onAfterAdd</td></tr>
        <tr><td><code>edit</code></td><td>UPDATE</td><td>onBeforeUpdate, onAfterUpdate</td></tr>
        <tr><td><code>delete</code></td><td>DELETE</td><td>onBeforeDelete, onAfterDelete</td></tr>
        <tr><td><code>promote</code></td><td>UPDATE (state)</td><td>onBeforePromote, onAfterPromote</td></tr>
        <tr><td><code>version</code></td><td>INSERT (new version)</td><td>onBeforeVersion, onAfterVersion</td></tr>
        <tr><td><code>lock</code></td><td>UPDATE (lock)</td><td>onBeforeLock, onAfterLock</td></tr>
        <tr><td><code>unlock</code></td><td>UPDATE (unlock)</td><td>onBeforeUnlock, onAfterUnlock</td></tr>
        <tr><td><code>copy</code></td><td>INSERT (copy)</td><td>onBeforeCopy, onAfterCopy</td></tr>
      </tbody>
    </table>

    <h2>七、完整示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// get — 查询
var getItem = inn.newItem("Part", "get");
getItem.setProperty("state", "Released");
var result = getItem.apply();

// add — 创建
var addItem = inn.newItem("Part", "add");
addItem.setProperty("item_number", "P-NEW-001");
addItem.setProperty("name", "新零件");
var addResult = addItem.apply();

// edit — 更新
var editItem = inn.newItem("Part", "edit");
editItem.setID(partId);
editItem.setProperty("description", "更新描述");
var editResult = editItem.apply();

// delete — 删除
var delItem = inn.newItem("Part", "delete");
delItem.setID(partId);
var delResult = delItem.apply();

// 检查结果
if (delResult.isError()) {
    return inn.newError("操作失败：" + delResult.getErrorString());
}

// 使用 Hashtable 一次设置多个属性
var updateItem = inn.newItem("Part");
var props = new Hashtable();
props["id"] = partId;
props["name"] = "批量更新名称";
props["description"] = "批量更新描述";
var updateResult = updateItem.apply("edit", props);</code></pre>

    <h2>八、实践笔记</h2>
    <ul>
      <li><strong>始终检查 isError()：</strong>每次 apply 后必须检查返回结果是否为 error</li>
      <li><strong>action 必须设置：</strong>如果 newItem 时没指定 action，apply 前必须通过 setAction 或 use apply(String) 重载设置</li>
      <li><strong>Hashtable 重载简洁：</strong>一次设置多个属性时比逐行 setProperty 更简洁</li>
      <li><strong>apply 是同步 HTTP 调用：</strong>每次调用都会阻塞等待服务器响应，注意处理超时</li>
      <li><strong>事务：</strong>每个 apply 是独立的服务器事务，没有跨 apply 的事务保证</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/Methods_T_Aras_IOM_Item.htm">Item Methods</a></li>
    </ul>
  </article>
</template>
