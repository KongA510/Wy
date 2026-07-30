---
title: Utils（工具类）
---

# Utils（已弃用）
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
<p><code>aras.utils</code> 实例可在自定义 JavaScript 代码中使用，提供一组实用的工具方法。</p>
</blockquote>

## API 成员概览
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>#ctor</code></td><td>public constructor</td><td>构造函数，初始化 Utils 实例</td></tr>
<tr><td><code>setClipboardData()</code></td><td>public method</td><td>设置剪贴板中存储的内容</td></tr>
<tr><td><code>isClipboardSupported()</code></td><td>public method</td><td>检查当前环境是否支持剪贴板操作</td></tr>
<tr><td><code>openIEWindowInNewProcess()</code></td><td>public method</td><td>在新进程中打开 IE 窗口，类似于 &lt;code&gt;window.open()&lt;/code&gt;</td></tr>
</tbody>
</table>

## API 详情

### constructor()
<p>构造函数。通常不需要直接调用，Aras 框架会自动创建 <code>aras.utils</code> 实例。</p>

```javascript
Aras.Client.Controls.Public.Utils = function();
```


## 剪贴板相关方法

### setClipboardData()
<p>将指定内容写入系统剪贴板。在 Aras 客户端中，常用于将查询结果、项目编号等数据快速复制到剪贴板，方便用户在外部粘贴使用。</p>
#### 参数
<p><em>文档未提供参数信息。根据实际使用推断，该方法接受一个字符串参数表示要写入剪贴板的内容。</em></p>
#### 返回值
<p><em>文档未提供返回值信息。</em></p>
#### 示例

```javascript
// 将当前选中项的 ID 复制到剪贴板
var selectedId = document.thisItem.getProperty("id");
aras.utils.setClipboardData(selectedId);

// 将格式化后的文本复制到剪贴板
var text = "项目编号：" + selectedId;
aras.utils.setClipboardData(text);
```


### isClipboardSupported()
<p>检测当前浏览器环境是否支持剪贴板相关的 API 操作。在调用 <code>setClipboardData()</code> 之前，建议先用此方法判断可用性，避免在不支持的环境下抛出异常。</p>
#### 参数
<p>无参数。</p>
#### 返回值
<p><em>文档未提供返回值信息，但推断返回 <code>boolean</code> 类型，表示剪贴板是否可用。</em></p>
#### 示例

```javascript
// 安全地复制内容到剪贴板
function safeCopyToClipboard(text) {
  if (aras.utils.isClipboardSupported()) {
    aras.utils.setClipboardData(text);
    console.log("已复制到剪贴板: " + text);
  } else {
    alert("当前环境不支持剪贴板操作");
  }
}

// 使用示例
safeCopyToClipboard("P-000123");
```


## 窗口方法

### openIEWindowInNewProcess()
<p>在新进程中打开 IE 窗口，功能类似于 <code>window.open()</code>。在 Aras Innovator 早期版本中（特别是基于 IE 浏览器时），此方法用于创建独立的浏览器窗口，确保新窗口拥有独立进程不会被主窗口阻塞。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>sURL</code></td><td>string</td><td>要打开的 URL 地址</td></tr>
<tr><td><code>sName</code></td><td>string</td><td>窗口名称（target），与 &lt;code&gt;window.open()&lt;/code&gt; 的第二个参数相同</td></tr>
<tr><td><code>sFeatures</code></td><td>string</td><td>窗口特性字符串，如 &lt;code&gt;"width=800,height=600,resizable=yes"&lt;/code&gt;</td></tr>
<tr><td><code>bReplace</code></td><td>string</td><td>是否替换当前历史记录条目</td></tr>
</tbody>
</table>
#### 返回值
<p><strong>window</strong> — 返回新打开的窗口对象引用。</p>
#### 示例

```javascript
// 在新 IE 窗口中打开一个 URL
var newWindow = aras.utils.openIEWindowInNewProcess(
  "https://example.com/report?id=123",
  "reportWindow",
  "width=1024,height=768,resizable=yes,scrollbars=yes",
  "false"
);

// 检查窗口是否成功打开
if (newWindow) {
  console.log("新窗口已打开");
} else {
  console.warn("窗口可能被弹窗拦截器阻止");
}

// 在新窗口中打开 Aras 搜索结果页面
var searchUrl = "../SearchResults.aspx?searchMode=0";
aras.utils.openIEWindowInNewProcess(
  searchUrl,
  "_blank",
  "width=1200,height=800",
  "false"
);
```


<hr />
<p><em>⚠️ 已弃用。适用版本：Aras Innovator 11.0-14.x。在现代浏览器版本中，建议使用浏览器原生 API（如 <code>navigator.clipboard.writeText()</code> 和 <code>window.open()</code>）替代。</em></p>
