---
title: Toolbar（工具栏）
---

<h1>Toolbar（已弃用）</h1>
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
<p>工具栏容器控件。用于加载 XML 定义的工具栏配置，管理工具栏按钮的显示、隐藏、启用、禁用等状态，并提供按钮查找和定位功能。</p>
<p><strong>替代方案：</strong>新项目中应使用 <code>&lt;aras-toolbar&gt;</code> Web Component（参见 [Toolbar 工具栏组件](/aras-client/toolbar-component)）。</p>
</blockquote>

<h2>API 成员概览</h2>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>constructor()</code></td><td>公共构造函数</td><td>创建 Toolbar 实例</td></tr>
<tr><td><code>Event:onClick</code></td><td>公共事件</td><td>点击控件时触发</td></tr>
<tr><td><code>Event:onChange</code></td><td>公共事件</td><td>ComboBox 选中项变更时触发</td></tr>
<tr><td><code>Event:onKeyDown</code></td><td>公共事件</td><td>在 TextBoxEdit 上按下按键时触发</td></tr>
<tr><td><code>Event:onDropDownItemClick</code></td><td>公共事件</td><td>下拉框选中项或文本框值变更时触发</td></tr>
<tr><td><code>loadXml(filePath)</code></td><td>公共方法</td><td>从文件加载 XML 配置</td></tr>
<tr><td><code>loadToolbarFromStr(str)</code></td><td>公共方法</td><td>从字符串加载 XML 配置</td></tr>
<tr><td><code>show()</code></td><td>公共方法</td><td>显示第一个工具栏实例</td></tr>
<tr><td><code>showToolbar(id)</code></td><td>公共方法</td><td>显示指定 ID 的工具栏</td></tr>
<tr><td><code>isToolbarExist()</code></td><td>公共方法</td><td>检查工具栏是否存在</td></tr>
<tr><td><code>getActiveToolbar()</code></td><td>公共方法</td><td>获取当前显示的工具栏</td></tr>
<tr><td><code>getId()</code></td><td>公共方法</td><td>获取工具栏唯一标识</td></tr>
<tr><td><code>disable()</code></td><td>公共方法</td><td>禁用整个工具栏</td></tr>
<tr><td><code>enable()</code></td><td>公共方法</td><td>启用整个工具栏</td></tr>
<tr><td><code>showLabels(isShow)</code></td><td>公共方法</td><td>显示/隐藏按钮标签</td></tr>
<tr><td><code>getItem(itemId)</code></td><td>公共方法</td><td>获取指定 ID 的工具栏项</td></tr>
<tr><td><code>showItem(itemId)</code></td><td>公共方法</td><td>显示指定工具栏项</td></tr>
<tr><td><code>hideItem(itemId)</code></td><td>公共方法</td><td>隐藏指定工具栏项</td></tr>
<tr><td><code>getButtonXY(itemId)</code></td><td>公共方法</td><td>获取按钮中心点坐标</td></tr>
<tr><td><code>getButtonId(label)</code></td><td>公共方法</td><td>根据标签获取按钮 ID</td></tr>
<tr><td><code>isButtonEnabled(itemId)</code></td><td>公共方法</td><td>检查按钮是否启用</td></tr>
<tr><td><code>getButtonLabelById(itemId)</code></td><td>公共方法</td><td>根据 ID 获取按钮标签</td></tr>
<tr><td><code>isButtonVisible(itemId)</code></td><td>公共方法</td><td>检查按钮是否可见</td></tr>
<tr><td><code>getButtons(separator)</code></td><td>公共方法</td><td>获取所有控件名称（以分隔符连接）</td></tr>
<tr><td><code>getItemSize(itemId)</code></td><td>公共方法</td><td>获取工具栏项的宽高</td></tr>
<tr><td><code>setExtraProps()</code></td><td>公共方法</td><td>设置额外属性（未文档化）</td></tr>
<tr><td><code>buttonClick()</code></td><td>公共方法</td><td>内部按钮点击（未文档化）</td></tr>
</tbody>
</table>

<h2>API 详情</h2>

<!-- ==================== 构造函数 ==================== -->
<h3>constructor()</h3>
<p>创建 Toolbar 实例。</p>
<h4>语法</h4>

```javascript
var toolbar = new Aras.Client.Controls.Public.Toolbar();
```

    <h4>参数</h4>
    <p>无。</p>
    <h4>返回值</h4>
    <p>无（构造函数）。</p>

    <hr />

    <!-- ==================== 事件 ==================== -->
    <h2>工具栏事件</h2>

    <h3>Event:onClick()</h3>
    <p>当工具栏控件被点击时触发。回调函数接收被点击的 <code>ToolbarItem</code> 作为参数。</p>
    <h4>参数</h4>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>el</code></td><td><code>Aras.Client.Controls.Public.ToolbarItem</code></td><td>被点击的工具栏项</td></tr>
      </tbody>
    </table>
    <h4>示例</h4>
    
```javascript
// 通过 clientControlsFactory 订阅点击事件
clientControlsFactory.on(toolbar, "onClick", function (toolbarItem) {
  console.log("工具栏项被点击:", toolbarItem.getId());
  // 根据被点击项的 ID 执行不同逻辑
  var itemId = toolbarItem.getId();
  if (itemId === "btn_save") {
    handleSave();
  } else if (itemId === "btn_delete") {
    handleDelete();
  }
});
```


<hr />

<h3>Event:onChange()</h3>
<p>当下拉框（ComboBox）的选中项发生变更时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>el</code></td><td><code>Aras.Client.Controls.Public.ToolbarItem</code></td><td>发生变更的下拉框工具栏项</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(toolbar, "onChange", function (toolbarItem) {
  var selectedValue = toolbarItem.getSelectedValue();
  console.log("下拉框选中值变更:", selectedValue);
});
```


<hr />

<h3>Event:onKeyDown()</h3>
<p>当在文本框（TextBoxEdit）中按下键盘按键时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>el</code></td><td><code>Aras.Client.Controls.Public.ToolbarItem</code></td><td>触发按键事件的文本框工具栏项</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(toolbar, "onKeyDown", function (toolbarItem) {
  var textValue = toolbarItem.getText();
  console.log("当前输入内容:", textValue);
});
```


<hr />

<h3>Event:onDropDownItemClick()</h3>
<p>当下拉框的选中项或文本框的文本值发生变更时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td><code>string</code></td><td>变更后的文本值</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(toolbar, "onDropDownItemClick", function (text) {
  console.log("下拉/文本框值:", text);
  // 根据选中文本过滤列表
  filterGridItems(text);
});
```


<hr />

<!-- ==================== 加载方法 ==================== -->
<h2>工具栏配置加载</h2>

<h3>loadXml()</h3>
<p>从文件路径加载 XML 格式的工具栏配置。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>filePath</code></td><td><code>string</code></td><td>XML 配置文件的路径</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>无。</p>
<h4>示例</h4>

```javascript
var toolbar = new Aras.Client.Controls.Public.Toolbar();
// 从客户端资源文件加载工具栏 XML
toolbar.loadXml("../ClientSolutions/Toolbars/MyToolbar.xml");
```


<hr />

<h3>loadToolbarFromStr()</h3>
<p>从字符串加载 XML 格式的工具栏配置。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td><code>string</code></td><td>包含 XML 配置的字符串</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>无。</p>
<h4>示例</h4>

```javascript
var xmlStr = '<toolbar>' +
  '<button id="btn_new" label="新建" image="../images/new.svg" />' +
  '<separator />' +
  '<button id="btn_save" label="保存" image="../images/save.svg" />' +
  '</toolbar>';
toolbar.loadToolbarFromStr(xmlStr);
```


<hr />

<h3>setExtraProps()</h3>
<p>设置工具栏的额外属性（方法存在但未在官方文档中详细说明）。</p>
<h4>参数</h4>
<p>未文档化。</p>
<h4>返回值</h4>
<p>无。</p>

<hr />

<!-- ==================== 工具栏显示/隐藏 ==================== -->
<h2>工具栏显示与控制</h2>

<h3>show()</h3>
<p>显示工具栏集合中的第一个工具栏实例。一般在 <code>loadXml</code> 或 <code>loadToolbarFromStr</code> 之后调用。</p>
<h4>参数</h4>
<p>无。</p>
<h4>返回值</h4>
<p>无。</p>
<h4>示例</h4>

```javascript
toolbar.loadXml("../ClientSolutions/Toolbars/MyToolbar.xml");
toolbar.show();  // 加载后显示
```


<hr />

<h3>showToolbar()</h3>
<p>显示指定 ID 的工具栏。当一个页面中加载了多个工具栏配置时，用此方法切换显示。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>id</code></td><td><code>string</code></td><td>要显示的工具栏的唯一标识</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>无。</p>
<h4>示例</h4>

```javascript
// 加载多个工具栏配置后，按需切换
toolbar.showToolbar("main_toolbar");       // 显示主导航工具栏
toolbar.showToolbar("context_toolbar");    // 切换为上下文工具栏
```


<hr />

<h3>isToolbarExist()</h3>
<p>检查工具栏是否已被加载和初始化（方法存在但未在官方文档中详细说明参数和返回值）。</p>
<h4>参数</h4>
<p>未文档化。</p>
<h4>返回值</h4>
<p>未文档化（推测返回 <code>boolean</code>）。</p>

<hr />

<h3>getActiveToolbar()</h3>
<p>获取当前正在显示的工具栏实例。</p>
<h4>参数</h4>
<p>无。</p>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>Aras.Client.Controls.Public.Toolbar</code></td><td>当前显示的工具栏实例（<code>this</code>）</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
var activeBar = toolbar.getActiveToolbar();
console.log("当前工具栏ID:", activeBar.getId());
```


<hr />

<!-- ==================== 工具栏状态 ==================== -->
<h2>工具栏状态控制</h2>

<h3>disable()</h3>
<p>禁用当前工具栏，所有控件变为不可交互状态。</p>
<h4>参数</h4>
<p>无。</p>
<h4>返回值</h4>
<p>无。</p>
<h4>示例</h4>

```javascript
// 在数据加载期间禁用工具栏，防止用户误操作
toolbar.disable();
fetchDataFromServer().then(function () {
  toolbar.enable();
});
```


<hr />

<h3>enable()</h3>
<p>启用工具栏，使所有控件恢复可交互状态。</p>
<h4>参数</h4>
<p>无。</p>
<h4>返回值</h4>
<p>无。</p>

<hr />

<h3>showLabels()</h3>
<p>显示或隐藏工具栏按钮上的文本标签。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>isShow</code></td><td><code>boolean</code></td><td><code>true</code> 显示标签，<code>false</code> 隐藏标签</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>无。</p>
<h4>示例</h4>

```javascript
// 紧凑模式：隐藏按钮标签只显示图标
toolbar.showLabels(false);

// 完整模式：显示图标+文字标签
toolbar.showLabels(true);
```


<hr />

<!-- ==================== 信息获取 ==================== -->
<h2>工具栏信息获取</h2>

<h3>getId()</h3>
<p>获取当前工具栏对象的唯一标识符。</p>
<h4>参数</h4>
<p>无。</p>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td>工具栏的唯一标识符</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
var toolbarId = toolbar.getId();
console.log("当前工具栏 ID:", toolbarId);
```


<hr />

<!-- ==================== 按钮/项目操作 ==================== -->
<h2>工具栏项与按钮操作</h2>

<h3>getItem()</h3>
<p>根据 ID 获取工具栏项对象（<code>ToolbarItem</code>），可用于进一步操作该项的属性。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>工具栏项的唯一标识</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>Aras.Client.Controls.Public.ToolbarItem</code></td><td>指定 ID 的工具栏项对象</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
var saveBtn = toolbar.getItem("btn_save");
if (saveBtn) {
  // 动态修改按钮属性
  saveBtn.setEnabled(false);
  saveBtn.setLabel("保存中...");
}
```


<hr />

<h3>showItem()</h3>
<p>显示指定 ID 的工具栏项（如果它处于隐藏状态）。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>要显示的工具栏项 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>无。</p>
<h4>示例</h4>

```javascript
// 根据权限显示不同按钮
if (currentUser.canDelete) {
  toolbar.showItem("btn_delete");
} else {
  toolbar.hideItem("btn_delete");
}
```


<hr />

<h3>hideItem()</h3>
<p>隐藏指定 ID 的工具栏项，使其不可见。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>要隐藏的工具栏项 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>无。</p>

<hr />

<h3>getButtonXY()</h3>
<p>获取指定按钮中心点相对于页面/容器的坐标。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>按钮的工具栏项 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td>按钮中心点坐标字符串</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 在按钮旁弹出菜单时使用
var btnPos = toolbar.getButtonXY("btn_actions");
console.log("按钮位置:", btnPos);
// 可用于定位自定义弹出层
showPopupAt(btnPos);
```


<hr />

<h3>getButtonId()</h3>
<p>根据按钮的显示标签文本查找其 ID。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>label</code></td><td><code>string</code></td><td>按钮的显示标签文本</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td>对应按钮的 ID</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
var btnId = toolbar.getButtonId("保存");
console.log("'保存' 按钮的 ID:", btnId);  // 输出类似 "btn_save"
```


<hr />

<h3>isButtonEnabled()</h3>
<p>检查指定按钮是否处于可交互状态。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>按钮的工具栏项 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>boolean</code></td><td><code>true</code> 表示按钮可交互，<code>false</code> 表示已禁用</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
if (toolbar.isButtonEnabled("btn_save")) {
  // 保存按钮可用时才执行
  toolbar.getItem("btn_save").performClick();
}
```


<hr />

<h3>getButtonLabelById()</h3>
<p>根据按钮 ID 获取其显示标签文本。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>按钮的工具栏项 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td>按钮的显示标签文本</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
var label = toolbar.getButtonLabelById("btn_save");
console.log("btn_save 的标签:", label);  // 输出 "保存"
```


<hr />

<h3>isButtonVisible()</h3>
<p>检查指定按钮是否在用户视野中可见。当工具栏宽度超出页面宽度时，部分按钮会被滚动按钮遮挡——此方法返回 <code>true</code> 表示按钮对用户可见，<code>false</code> 表示被隐藏。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>按钮的工具栏项 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>boolean</code></td><td><code>true</code> 可见，<code>false</code> 被溢出隐藏</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
if (!toolbar.isButtonVisible("btn_advanced")) {
  console.warn("'高级' 按钮因工具栏溢出而被隐藏，建议使用常用功能的快捷按钮");
}
```


<hr />

<h3>getButtons()</h3>
<p>返回工具栏上所有控件的名称，以指定分隔符连接。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>separator</code></td><td><code>string</code></td><td>用于连接各控件名称的分隔符</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td>以分隔符连接的所有控件名称</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
var btns = toolbar.getButtons(", ");
console.log("工具栏包含:", btns);
// 输出类似: "btn_new, btn_save, sep_1, btn_delete, btn_refresh"
```


<hr />

<h3>getItemSize()</h3>
<p>获取指定工具栏项的宽度和高度。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>itemId</code></td><td><code>string</code></td><td>工具栏项 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<table>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td>以逗号分隔的宽度和高度，如 <code>"32,32"</code></td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
var size = toolbar.getItemSize("btn_save");
// size 类似 "32,32"
var dimensions = size.split(",");
var width = parseInt(dimensions[0]);
var height = parseInt(dimensions[1]);
console.log("按钮尺寸:", width + "x" + height);
```


<hr />

<!-- ==================== 内部方法 ==================== -->
<h2>内部方法</h2>

<h3>buttonClick()</h3>
<p>内部按钮点击处理方法（方法存在但未在官方文档中详细说明参数和返回值，通常不直接从外部调用）。</p>
<h4>参数</h4>
<p>未文档化。</p>
<h4>返回值</h4>
<p>无。</p>

<hr />

<!-- ==================== 综合示例 ==================== -->
<h2>综合使用示例</h2>

```javascript
// 完整的工具栏初始化和事件绑定示例
var toolbar = new Aras.Client.Controls.Public.Toolbar();

// 1. 从 XML 字符串加载工具栏配置
var toolbarConfig = '<toolbar id="main">' +
  '<button id="btn_new" label="新建" image="../images/new.svg" />' +
  '<separator />' +
  '<button id="btn_save" label="保存" image="../images/save.svg" />' +
  '<button id="btn_delete" label="删除" image="../images/delete.svg" />' +
  '<separator />' +
  '<combobox id="cmb_filter" label="筛选">' +
  '  <item value="all" label="全部" />' +
  '  <item value="active" label="活跃" />' +
  '  <item value="inactive" label="停用" />' +
  '</combobox>' +
  '<textbox id="txt_search" />' +
  '</toolbar>';
toolbar.loadToolbarFromStr(toolbarConfig);
toolbar.show();

// 2. 订阅事件
clientControlsFactory.on(toolbar, "onClick", function (item) {
  var id = item.getId();
  switch (id) {
    case "btn_new":
      createNewItem();
      break;
    case "btn_save":
      saveCurrentItem();
      break;
    case "btn_delete":
      if (confirm("确定删除?")) {
        deleteCurrentItem();
      }
      break;
  }
});

clientControlsFactory.on(toolbar, "onChange", function (item) {
  if (item.getId() === "cmb_filter") {
    applyFilter(item.getSelectedValue());
  }
});

clientControlsFactory.on(toolbar, "onKeyDown", function (item) {
  if (item.getId() === "txt_search") {
    performSearch(item.getText());
  }
});

// 3. 初始状态设置：无数据时禁用保存和删除
toolbar.getItem("btn_save").setEnabled(false);
toolbar.getItem("btn_delete").setEnabled(false);

// 4. 数据变更后动态更新按钮状态
function onDataChanged() {
  toolbar.getItem("btn_save").setEnabled(true);
  toolbar.getItem("btn_delete").setEnabled(true);
}

function onDataSaved() {
  toolbar.getItem("btn_save").setEnabled(false);
  toolbar.getItem("btn_delete").setEnabled(false);
}

// 5. 根据权限隐藏按钮
function applyPermissions(permissions) {
  if (!permissions.canDelete) {
    toolbar.hideItem("btn_delete");
  }
  if (!permissions.canCreate) {
    toolbar.hideItem("btn_new");
  }
}
```


<hr />
<p><em>⚠️ 已弃用。适用版本：Aras Innovator 11.0-14.x。请在新项目中使用 <code>&lt;aras-toolbar&gt;</code> Web Component 替代。</em></p>
