---
title: HtmlEditor（HTML 编辑器）
---

<h1>HtmlEditor（已弃用）</h1>
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
<p>HTML 富文本编辑器控件。提供编辑区域内容的获取/设置、图片插入、启用/禁用以及事件订阅等功能。该 API 已弃用，建议在新项目中使用替代方案。</p>
</blockquote>

<h2>成员概览</h2>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>constructor()</code></td><td>public constructor</td><td>HtmlEditor 构造函数</td></tr>
<tr><td><code>getHTMLSource(bodyOnly)</code></td><td>public method</td><td>获取编辑区域当前内容</td></tr>
<tr><td><code>setHTMLSource(bodyOnly, source)</code></td><td>public method</td><td>设置编辑区域内容</td></tr>
<tr><td><code>insertImage(src, altText, align, border, hSpace, vSpace)</code></td><td>public method</td><td>插入 HTML 图片标签</td></tr>
<tr><td><code>setDisabled(value)</code></td><td>public method</td><td>启用/禁用编辑器</td></tr>
<tr><td><code>set()</code></td><td>public method（已弃用）</td><td>仅支持值 "disabled"，请使用 setDisabled 替代</td></tr>
<tr><td><code>onLoadDeferred(callback)</code></td><td>public method（已弃用）</td><td>编辑器加载完成回调，建议使用 initHandler 参数替代</td></tr>
<tr><td><code>Event:onBlur</code></td><td>event</td><td>编辑器失去焦点事件</td></tr>
<tr><td><code>Event:onChange</code></td><td>event</td><td>编辑器内容变更事件</td></tr>
<tr><td><code>Event:onAfterPaste</code></td><td>event</td><td>粘贴完成事件</td></tr>
</tbody>
</table>

<h2>API 详情</h2>

<!-- ── 构造函数 ── -->
<h3>constructor()</h3>
<p>HtmlEditor 构造函数，创建一个 HtmlEditor 控件实例。</p>
<h4>签名</h4>

```javascript
Aras.Client.Controls.Public.HtmlEditor = function();
```

    <h4>示例</h4>
    
```javascript
// 通过 clientControlsFactory 创建 HtmlEditor 实例
const htmlEditor = clientControlsFactory.createControl(
  "Aras.Client.Controls.Public.HtmlEditor",
  containerElement,
  options
);
```


<hr />

<!-- ── 内容管理 ── -->
<h2>内容管理</h2>

<h3>getHTMLSource(bodyOnly)</h3>
<p>获取 HtmlEditor 编辑区域当前的内容。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>bodyOnly</code></td><td><code>bool</code></td><td>为 <code>true</code> 时仅返回 <code>&lt;body&gt;</code> 内部 HTML；为 <code>false</code> 时返回完整 HTML 文档</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>返回编辑器当前内容的 HTML 字符串。</p>
<h4>示例</h4>

```javascript
// 仅获取 body 内部内容（通常用于存储到数据库）
const bodyContent = htmlEditor.getHTMLSource(true);

// 获取完整 HTML 文档
const fullDocument = htmlEditor.getHTMLSource(false);
```


<hr />

<h3>setHTMLSource(bodyOnly, source)</h3>
<p>设置 HtmlEditor 编辑区域的内容。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>bodyOnly</code></td><td><code>bool</code></td><td>为 <code>true</code> 时 <code>source</code> 直接作为 <code>&lt;body&gt;</code> 内容；为 <code>false</code> 时 <code>source</code> 应包含完整 HTML 结构</td></tr>
<tr><td><code>source</code></td><td><code>string</code></td><td>要设置的 HTML 源内容</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 设置 body 内容（常用于从数据库加载内容后回填编辑器）
const savedContent = "<p>这是之前保存的内容</p>";
htmlEditor.setHTMLSource(true, savedContent);

// 使用完整 HTML 文档设置
const fullContent = `<html><head></head><body>
  <h2>标题</h2><p>段落文本</p>
</body></html>`;
htmlEditor.setHTMLSource(false, fullContent);
```


<hr />

<h3>insertImage(src, altText, align, border, hSpace, vSpace)</h3>
<p>在编辑区域光标位置插入一个 HTML <code>&lt;img&gt;</code> 标签。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>src</code></td><td><code>string</code></td><td>图片的 URL 源地址</td></tr>
<tr><td><code>altText</code></td><td><code>string</code></td><td>图片的替代文本（alt 属性）</td></tr>
<tr><td><code>align</code></td><td><code>string</code></td><td>图片对齐方式，如 <code>"left"</code>、<code>"right"</code>、<code>"center"</code></td></tr>
<tr><td><code>border</code></td><td><code>int</code></td><td>图片边框宽度（像素）</td></tr>
<tr><td><code>hSpace</code></td><td><code>int</code></td><td>图片水平外边距（像素）</td></tr>
<tr><td><code>vSpace</code></td><td><code>int</code></td><td>图片垂直外边距（像素）</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 插入一张左对齐、无边框、带 10px 间距的图片
htmlEditor.insertImage(
  "../images/part_screenshot.png",
  "零件截图",
  "left",
  0,
  10,
  10
);

// 插入居中的超链接图片
htmlEditor.insertImage(
  "../images/banner.jpg",
  "横幅广告",
  "center",
  1,
  0,
  5
);
```


<hr />

<!-- ── 状态控制 ── -->
<h2>状态控制</h2>

<h3>setDisabled(value)</h3>
<p>启用或禁用 HtmlEditor 控件。禁用的编辑器内容不可编辑，通常为灰色显示。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>bool</code></td><td><code>true</code> 禁用编辑器；<code>false</code> 启用编辑器</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 根据权限控制编辑器状态
const isReadOnly = !hasEditPermission;
htmlEditor.setDisabled(isReadOnly);

// 在提交数据时临时禁用编辑器
async function submitContent() {
  htmlEditor.setDisabled(true);
  try {
    await saveData(htmlEditor.getHTMLSource(true));
  } finally {
    htmlEditor.setDisabled(false);
  }
}
```


<hr />

<h3>set() <em>（已弃用）</em></h3>
<p>已弃用的状态设置方法，仅支持值 <code>"disabled"</code>。请使用 <code>setDisabled()</code> 方法替代。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><em>无详细文档</em></td><td><em>-</em></td><td>仅接受 <code>"disabled"</code> 值</td></tr>
</tbody>
</table>
<div class="tip-box">
<strong>迁移建议：</strong>将所有 <code>htmlEditor.set("disabled", true)</code> 替换为 <code>htmlEditor.setDisabled(true)</code>。
</div>

<hr />

<!-- ── 生命周期 ── -->
<h2>生命周期</h2>

<h3>onLoadDeferred(callback) <em>（已弃用）</em></h3>
<p>注册一个回调函数，在 HtmlEditor 控件加载完成后执行。该方法本质上是 <code>onLoadDeferred.addCallback(callback)</code> 的封装。</p>
<p>建议在创建控件时使用 <code>initHandler</code> 参数替代，具体用法可参考 <code>HTMLEditorDialog.html</code>。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>callback</code></td><td><code>function</code></td><td>编辑器加载完成时执行的回调函数</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 旧方式（已弃用）
htmlEditor.onLoadDeferred(function() {
  htmlEditor.setHTMLSource(true, initialContent);
});

// 推荐方式：在创建控件时使用 initHandler
const options = {
  initHandler: function(editor) {
    editor.setHTMLSource(true, initialContent);
  }
};
const htmlEditor = clientControlsFactory.createControl(
  "Aras.Client.Controls.Public.HtmlEditor",
  containerElement,
  options
);
```


<hr />

<!-- ── 事件 ── -->
<h2>事件</h2>

<h3>Event:onBlur</h3>
<p>编辑器失去焦点时触发。当用户点击编辑器外部区域或 Tab 切换到其他控件时触发。</p>
<h4>签名</h4>

```javascript
clientControlsFactory.on(control, "onBlur", onBlurHandler);
```

    <h4>参数</h4>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><em>无参数</em></td><td><em>-</em></td><td>该事件处理函数不接收额外参数</td></tr>
      </tbody>
    </table>
    <h4>示例</h4>
    
```javascript
// 绑定失去焦点事件
clientControlsFactory.on(htmlEditor, "onBlur", function() {
  console.log("编辑器失去焦点");
  // 可以在这里执行自动保存等操作
  const currentContent = htmlEditor.getHTMLSource(true);
  autoSave(currentContent);
});
```


<hr />

<h3>Event:onChange</h3>
<p>编辑器内容发生变更时触发。用户在编辑区域键入文字、删除内容、粘贴或格式化操作后触发，回调函数会接收变更后的新内容。</p>
<h4>签名</h4>

```javascript
clientControlsFactory.on(control, "onChange", onChangeHandler);
```

    <h4>参数</h4>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>newContent</code></td><td><code>string</code></td><td>变更后编辑区域的 HTML 内容</td></tr>
      </tbody>
    </table>
    <h4>示例</h4>
    
```javascript
// 监听内容变更，如实现脏标记
let isDirty = false;

clientControlsFactory.on(htmlEditor, "onChange", function(newContent) {
  isDirty = true;
  // 更新字数统计
  updateWordCount(newContent);
});

// 在关闭/保存前检查是否有未保存的更改
function beforeClose() {
  if (isDirty) {
    return confirm("内容已修改，确定不保存吗？");
  }
  return true;
}
```


<hr />

<h3>Event:onAfterPaste</h3>
<p>在编辑器内完成粘贴操作后触发。可用于对粘贴的内容进行后处理，如清除内联样式、过滤不安全的标签等。</p>
<h4>签名</h4>

```javascript
clientControlsFactory.on(control, "onAfterPaste", onAfterPasteHandler);
```

    <h4>参数</h4>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><em>无参数</em></td><td><em>-</em></td><td>该事件处理函数不接收额外参数</td></tr>
      </tbody>
    </table>
    <h4>示例</h4>
    
```javascript
// 粘贴后清理格式
clientControlsFactory.on(htmlEditor, "onAfterPaste", function() {
  // 通过 getHTMLSource / setHTMLSource 清理粘贴内容
  const rawHtml = htmlEditor.getHTMLSource(true);
  // 过滤不需要的标签或样式
  const cleanedHtml = sanitizeHtml(rawHtml);
  htmlEditor.setHTMLSource(true, cleanedHtml);
});

// 简单的 HTML 清理函数示例
function sanitizeHtml(html) {
  return html
    .replace(/style="[^"]*"/gi, "")   // 移除内联样式
    .replace(/class="[^"]*"/gi, "")   // 移除 class 属性
    .replace(/<script>[\s\S]*?<\/script>/gi, ""); // 移除 script 标签
}
```


<hr />

<!-- ── 完整使用示例 ── -->
<h2>完整使用示例</h2>
<p>以下示例演示了如何创建 HtmlEditor、设置初始内容、绑定事件并管理编辑器的完整生命周期：</p>

```javascript
// 1. 创建 HtmlEditor 实例
const container = document.getElementById("editor-container");
const htmlEditor = clientControlsFactory.createControl(
  "Aras.Client.Controls.Public.HtmlEditor",
  container,
  {
    width: "100%",
    height: "400px",
    initHandler: function(editor) {
      // 编辑器加载完成后的回调（推荐方式）
      editor.setHTMLSource(true, "<p>初始内容</p>");
      editor.setDisabled(false);
    }
  }
);

// 2. 绑定事件
let isDirty = false;

clientControlsFactory.on(htmlEditor, "onChange", function(newContent) {
  isDirty = true;
  document.getElementById("char-count").textContent =
    newContent.length + " 字符";
});

clientControlsFactory.on(htmlEditor, "onBlur", function() {
  console.log("编辑器失去焦点");
});

clientControlsFactory.on(htmlEditor, "onAfterPaste", function() {
  const html = htmlEditor.getHTMLSource(true);
  htmlEditor.setHTMLSource(true, html.replace(/style="[^"]*"/gi, ""));
});

// 3. 保存内容
function save() {
  const content = htmlEditor.getHTMLSource(true);
  // 调用 IOM 保存到 Aras 数据库
  const innovator = top.aras;
  const item = innovator.newIOMItem("Document", "edit");
  item.setProperty("description", content);
  item.apply();
  isDirty = false;
}

// 4. 销毁时解绑事件
function destroy() {
  clientControlsFactory.on(htmlEditor, "onChange", null);
  clientControlsFactory.on(htmlEditor, "onBlur", null);
  clientControlsFactory.on(htmlEditor, "onAfterPaste", null);
}
```


<hr />
<p><em>⚠️ 已弃用。适用版本：Aras Innovator 11.0 - 14.x。命名空间 Aras.Client.Controls.Public 整体被标记为 Deprecated，建议迁移至 CUI 框架或 Web Components 组件库。</em></p>
