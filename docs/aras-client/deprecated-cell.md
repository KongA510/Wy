---
title: Cell（单元格）
---

<h1>Cell（已弃用）</h1>
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
<p>Cell 对象表示 Grid 中的一个单元格，例如通过 <code>GridContainer</code> 的 <code>cells</code> 方法返回。提供了一系列方法用于获取和设置单元格的样式、值、编辑状态等属性。此 API 已被弃用，建议使用新的 CUI 框架替代。</p>
</blockquote>

<h2>API 成员概览</h2>
<table>
<thead>
<tr>
<th>成员</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>constructor()</code></td>
<td>构造函数</td>
<td>创建 Cell 实例</td>
</tr>
<tr>
<td><code>getValue()</code></td>
<td>公共方法</td>
<td>获取单元格的值</td>
</tr>
<tr>
<td><code>setValue()</code></td>
<td>公共方法</td>
<td>设置单元格的值</td>
</tr>
<tr>
<td><code>getText()</code></td>
<td>公共方法</td>
<td>获取单元格显示文本</td>
</tr>
<tr>
<td><code>getRowId()</code></td>
<td>公共方法</td>
<td>获取当前单元格所在行的 ID</td>
</tr>
<tr>
<td><code>getColumnIndex()</code></td>
<td>公共方法</td>
<td>获取当前单元格所在列的索引</td>
</tr>
<tr>
<td><code>getCellStyle()</code></td>
<td>公共方法</td>
<td>获取当前单元格的 CSS 样式</td>
</tr>
<tr>
<td><code>getBgColor()</code></td>
<td>公共方法</td>
<td>获取单元格背景颜色</td>
</tr>
<tr>
<td><code>setBgColor()</code></td>
<td>公共方法</td>
<td>设置单元格背景颜色</td>
</tr>
<tr>
<td><code>getTextColor()</code></td>
<td>公共方法</td>
<td>获取单元格文字颜色</td>
</tr>
<tr>
<td><code>setTextColor()</code></td>
<td>公共方法</td>
<td>设置单元格文字颜色</td>
</tr>
<tr>
<td><code>getFont()</code></td>
<td>公共方法</td>
<td>获取当前单元格字体</td>
</tr>
<tr>
<td><code>setFont()</code></td>
<td>公共方法</td>
<td>设置当前单元格字体</td>
</tr>
<tr>
<td><code>getHorAlign()</code></td>
<td>公共方法</td>
<td>获取水平对齐方式</td>
</tr>
<tr>
<td><code>setHorAlign()</code></td>
<td>公共方法</td>
<td>设置水平对齐方式</td>
</tr>
<tr>
<td><code>getBounds()</code></td>
<td>公共方法</td>
<td>获取单元格边界信息</td>
</tr>
<tr>
<td><code>getRowSpan()</code></td>
<td>公共方法</td>
<td>获取单元格行跨度</td>
</tr>
<tr>
<td><code>isChecked()</code></td>
<td>公共方法</td>
<td>获取单元格复选框的选中状态</td>
</tr>
<tr>
<td><code>setChecked()</code></td>
<td>公共方法</td>
<td>设置单元格复选框的选中状态</td>
</tr>
<tr>
<td><code>isCheckbox()</code></td>
<td>公共方法</td>
<td>判断单元格是否包含复选框</td>
</tr>
<tr>
<td><code>isEditable()</code></td>
<td>公共方法</td>
<td>判断单元格是否可编辑</td>
</tr>
<tr>
<td><code>setEditable()</code></td>
<td>公共方法</td>
<td>设置单元格是否可编辑</td>
</tr>
<tr>
<td><code>isEdited()</code></td>
<td>公共方法</td>
<td>判断单元格是否处于编辑状态</td>
</tr>
<tr>
<td><code>wasChanged()</code></td>
<td>公共方法</td>
<td>判断用户上次编辑后单元格值是否已变更</td>
</tr>
<tr>
<td><code>setCombo()</code></td>
<td>公共方法</td>
<td>动态填充单元格下拉框选项</td>
</tr>
<tr>
<td><code>setEditType()</code></td>
<td>公共方法</td>
<td>设置单元格编辑器类型</td>
</tr>
<tr>
<td><code>setListId()</code></td>
<td>公共方法</td>
<td>设置列表 ID</td>
</tr>
<tr>
<td><code>setLink()</code></td>
<td>公共方法</td>
<td>为单元格设置链接值</td>
</tr>
<tr>
<td><code>initXml()</code></td>
<td>公共方法</td>
<td>初始化 XML（内部方法）</td>
</tr>
<tr>
<td><code>setInputHelperIcon()</code></td>
<td>公共方法</td>
<td>设置输入辅助图标</td>
</tr>
</tbody>
</table>

<h2>API 详情</h2>

<h3>constructor()</h3>
<p>构造函数，创建 Cell 实例。通常不需要直接调用，Cell 对象由 <code>GridContainer.cells()</code> 等方法返回。</p>
<h4>签名</h4>

```javascript
Aras.Client.Controls.Public.Cell = function();
```

    <h4>参数</h4>
    <p><em>无参数信息</em></p>
    <h4>返回值</h4>
    <p><em>新创建的 Cell 实例</em></p>
    <hr />

    <h3>基础单元格操作</h3>

    <h4>getValue()</h4>
    <p>获取单元格的值。通常返回存储在单元格中的原始数据值。</p>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p>单元格的值，类型取决于列定义。</p>
    <h4>示例</h4>
    
```javascript
// 获取 GridContainer 中指定行的单元格值
var grid = top.aras.uiFindWindowEx(window, 'grid');
var cell = grid.cells("row_id_123", "column_name");
var value = cell.getValue();
console.log(value);
```


<h4>setValue(value)</h4>
<p>设置单元格的值。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>object</code></td>
<td>要设置的新值</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>
<h4>示例</h4>

```javascript
// 设置单元格值
var cell = grid.cells("row_id_123", "part_number");
cell.setValue("NewPart-001");

// 通过 OnEditCell 事件设置单元格值
function onEditCell(rowId, column, type, value, cell) {
  if (type === 0) {
    // 编辑开始前，可以预设值
    if (column === "default_qty") {
      cell.setValue(10);
    }
  }
}
```


<h4>getText()</h4>
<p>获取单元格中用户可见的文本内容。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>string</strong> — 单元格中显示的文本</p>
<h4>示例</h4>

```javascript
var cell = grid.cells(rowId, "name");
var text = cell.getText();
top.aras.AlertInfo("当前选中行的名称: " + text);
```

<hr />

<h3>行列信息</h3>

<h4>getRowId()</h4>
<p>获取当前单元格所在行的 ID。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>string</strong> — 行 ID</p>
<h4>示例</h4>

```javascript
// 遍历单元格获取行 ID
var cell = grid.cells("row_001", "item_number");
var rowId = cell.getRowId();
console.log("行ID: " + rowId);
```


<h4>getColumnIndex()</h4>
<p>获取当前单元格所在列的索引（从 0 开始）。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>int</strong> — 列索引</p>
<h4>示例</h4>

```javascript
var cell = grid.cells(rowId, columnName);
var colIndex = cell.getColumnIndex();
console.log("列索引: " + colIndex);
```


<h4>getBounds()</h4>
<p>获取单元格的边界信息（位置和尺寸）。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><em>无信息提供</em></p>

<h4>getRowSpan()</h4>
<p>获取单元格的行跨度。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><em>无信息提供</em></p>
<hr />

<h3>样式与格式</h3>

<h4>getBgColor()</h4>
<p>获取当前单元格的背景颜色。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>string</strong> — 颜色值（例如 <code>"#ffffff"</code> 或 <code>"red"</code>）</p>

<h4>setBgColor(value)</h4>
<p>设置单元格的背景颜色。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>string</code></td>
<td>颜色值，支持十六进制（如 <code>"#FFCC00"</code>）、RGB 或颜色名</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>

<h4>getTextColor()</h4>
<p>获取当前单元格的文字颜色。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>string</strong> — 文字颜色值</p>

<h4>setTextColor(color)</h4>
<p>设置单元格文字颜色。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>color</code></td>
<td><code>string</code></td>
<td>文字颜色值</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>

<h4>getFont()</h4>
<p>获取当前单元格的字体设置。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>string</strong> — 返回 <code>"fontName-fontStyle-fontSize"</code> 格式的字体字符串</p>

<h4>setFont(font)</h4>
<p>设置当前单元格的字体。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>font</code></td>
<td><code>string</code></td>
<td>字体字符串，格式为 <code>"fontName-fontStyle-fontSize"</code></td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>

<h4>getCellStyle()</h4>
<p>获取当前单元格的 CSS 样式对象。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>object</strong> — 包含 CSS 样式属性的对象</p>

<h4>getHorAlign()</h4>
<p>获取单元格的水平对齐方式。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><em>无信息提供</em></p>

<h4>setHorAlign()</h4>
<p>设置单元格的水平对齐方式。</p>
<h4>参数</h4>
<p><em>无信息提供</em></p>
<h4>返回值</h4>
<p><em>无信息提供</em></p>

<h4>样式操作综合示例</h4>

```javascript
function onEditCell(rowId, column, type, value, cell) {
  // 根据值设置不同背景色
  if (column === "status") {
    switch (value) {
      case "Approved":
        cell.setBgColor("#CCFFCC"); // 绿色背景
        cell.setTextColor("#006600");
        break;
      case "Rejected":
        cell.setBgColor("#FFCCCC"); // 红色背景
        cell.setTextColor("#CC0000");
        break;
      default:
        cell.setBgColor("#FFFFCC"); // 黄色背景
        cell.setTextColor("#000000");
    }
  }
}
```

<hr />

<h3>复选框操作</h3>

<h4>isCheckbox()</h4>
<p>判断当前单元格是否包含复选框。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>bool</strong> — 若为复选框单元格则返回 <code>true</code></p>

<h4>isChecked()</h4>
<p>获取单元格复选框的选中状态。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>bool</strong> — 选中返回 <code>true</code>，未选中返回 <code>false</code></p>

<h4>setChecked()</h4>
<p>设置单元格复选框的选中状态。</p>
<h4>参数</h4>
<p><em>无信息提供</em></p>
<h4>返回值</h4>
<p><em>无信息提供</em></p>
<h4>示例</h4>

```javascript
// 检查并操作复选框单元格
var cell = grid.cells(rowId, "is_active");
if (cell.isCheckbox()) {
  var checked = cell.isChecked();
  if (!checked) {
    // 设置复选框为选中状态
    cell.setChecked(true);
  }
}
```

<hr />

<h3>编辑状态管理</h3>

<h4>isEditable()</h4>
<p>判断单元格是否可编辑。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>bool</strong> — 可编辑返回 <code>true</code></p>

<h4>setEditable(value)</h4>
<p>设置单元格是否可编辑。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>bool</code></td>
<td><code>true</code> 表示可编辑，<code>false</code> 表示只读</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>

<h4>isEdited()</h4>
<p>判断单元格当前是否处于编辑状态（即用户正在编辑该单元格）。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>bool</strong> — 处于编辑状态返回 <code>true</code></p>

<h4>wasChanged()</h4>
<p>判断用户在上次编辑期间是否修改了单元格的值。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><strong>bool</strong> — 若值被修改返回 <code>true</code>，否则返回 <code>false</code></p>
<h4>示例</h4>

```javascript
// 编辑状态管理示例
function onEditCell(rowId, column, type, value, cell) {
  if (type === 0) {
    // 编辑开始 — 设置编辑类型和可编辑性
    cell.setEditType(1, 0); // 使用输入框编辑器
    cell.setEditable(true);
  }
  if (type === 2) {
    // 编辑结束 — 检查是否实际修改
    if (cell.wasChanged()) {
      var newValue = cell.getValue();
      console.log("单元格值已修改: " + value + " -> " + newValue);
    }
  }
}
```

<hr />

<h3>编辑器配置</h3>

<h4>setEditType(editTypeInt, dropDownStyleInt)</h4>
<p>设置单元格编辑器类型。通常在 <code>onEditCell</code> 事件的 <code>type=0</code> 阶段调用，用于在同一列的不同单元格中使用不同的编辑器类型。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>editTypeInt</code></td>
<td><code>int</code></td>
<td>编辑器类型：<code>1</code> 表示输入框，<code>2</code> 表示下拉框</td>
</tr>
<tr>
<td><code>dropDownStyleInt</code></td>
<td><code>int</code></td>
<td>下拉框样式</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>

<h4>setCombo(labels, values)</h4>
<p>动态填充当前单元格的下拉框选项。标签和值使用 Grid 的分隔符分隔。在 <code>onEditCell</code> 事件的 <code>type=0</code> 阶段调用。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>labels</code></td>
<td><code>string</code></td>
<td>下拉框选项的显示标签，使用分隔符连接多个值</td>
</tr>
<tr>
<td><code>values</code></td>
<td><code>string</code></td>
<td>下拉框选项的实际值，使用分隔符连接多个值</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>
<h4>示例</h4>

```javascript
// 动态设置下拉框编辑器
function onEditCell(rowId, column, type, value, cell) {
  if (type === 0) {
    if (column === "material_type") {
      // 设置为下拉框编辑器
      cell.setEditType(2, 0);
      // 填充下拉选项，分隔符默认为 "|"
      cell.setCombo("金属|塑料|橡胶|复合材料", "Metal|Plastic|Rubber|Composite");
    } else {
      // 其他列使用输入框编辑器
      cell.setEditType(1, 0);
    }
  }
}
```


<h4>setListId(listId)</h4>
<p>设置列表 ID，用于将单元格关联到 Aras 系统中的 List 定义。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>listId</code></td>
<td><code>int</code></td>
<td>Aras List 的 ID</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>
<h4>示例</h4>

```javascript
function onEditCell(rowId, column, type, value, cell) {
  if (type === 0 && column === "country") {
    cell.setEditType(2, 0);
    // 设置 Aras List 作为下拉数据源
    cell.setListId("A73B055D4B304C22A6A2DCD3C1E6A0B1");
  }
}
```

<hr />

<h3>高级操作</h3>

<h4>setLink(link)</h4>
<p>将单元格的值设置为可点击的链接形式。</p>
<h4>参数</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>link</code></td>
<td><code>string</code></td>
<td>链接地址或包含链接信息的字符串</td>
</tr>
</tbody>
</table>
<h4>返回值</h4>
<p><em>无</em></p>

<h4>initXml()</h4>
<p>初始化单元格的 XML 配置。这是一个内部方法，通常不需要手动调用。</p>
<h4>参数</h4>
<p><em>无参数</em></p>
<h4>返回值</h4>
<p><em>无信息提供</em></p>

<h4>setInputHelperIcon()</h4>
<p>设置单元格输入框旁的辅助图标。</p>
<h4>参数</h4>
<p><em>无信息提供</em></p>
<h4>返回值</h4>
<p><em>无信息提供</em></p>
<hr />

<h3>完整示例：OnEditCell 事件处理</h3>

```javascript
// 综合使用 Cell API 的 onEditCell 事件处理
function onEditCell(rowId, column, type, value, cell) {
  // type 说明：
  // 0 - 编辑开始前
  // 1 - 编辑进行中
  // 2 - 编辑结束后

  if (type === 0) {
    // --- 编辑开始前配置 ---

    // 根据列配置不同的编辑器
    if (column === "status") {
      // 使用下拉框
      cell.setEditType(2, 0);
      cell.setCombo("新建|审核中|已发布|已废弃", "New|Review|Released|Obsolete");
    } else if (column === "unit") {
      // 使用 Aras List
      cell.setEditType(2, 0);
      cell.setListId("UNITS_LIST_ID");
    } else {
      cell.setEditType(1, 0);
    }

    // 只读控制
    if (column === "id" || column === "created_on") {
      cell.setEditable(false);
    }

    // 预设默认值
    if (column === "qty" && cell.getValue() === "") {
      cell.setValue(1);
    }
  }

  if (type === 2) {
    // --- 编辑结束后处理 ---
    if (cell.wasChanged() && column === "status") {
      var newStatus = cell.getValue();
      if (newStatus === "Obsolete") {
        // 设置视觉提示
        cell.setBgColor("#FFE0E0");
        cell.setTextColor("#990000");
      }
    }
  }
}
```


<hr />
<p><em>⚠️ 已弃用。此 API 属于 Aras 旧版 Grid 控件体系（Aras.Client.Controls.Public 命名空间），已被新的 CUI 框架（Aras.Client.UI）替代。适用版本：Aras Innovator 11.0-14.x。新项目建议使用 <a href="#/aras-client/cui-controls">CUI Controls API</a>。</em></p>
