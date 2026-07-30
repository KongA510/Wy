---
title: GridContainer（网格容器）
---

<h1>GridContainer（已弃用）</h1>
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
<p>GridContainer 是 Aras Innovator 客户端中已弃用的表格控件容器类。它提供了完整的表格数据展示与编辑能力，包括行/列管理、单元格编辑、排序、多选、右键菜单、事件绑定以及 XML 数据加载等功能。官方推荐在新项目中使用 CUI Grid 组件替代。</p>
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
<td><code>#ctor</code></td>
<td>公共构造函数</td>
<td>GridContainer 构造函数</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>属性</strong></td></tr>
<tr>
<td><code>bgColor</code></td>
<td>公共属性</td>
<td>单元格默认背景色</td>
</tr>
<tr>
<td><code>bgInvert</code></td>
<td>公共属性</td>
<td>选中行时是否反转背景色，默认 true</td>
</tr>
<tr>
<td><code>borderGColor</code></td>
<td>公共属性</td>
<td>单元格边框颜色</td>
</tr>
<tr>
<td><code>delimeter</code></td>
<td>公共属性</td>
<td>分隔符字符</td>
</tr>
<tr>
<td><code>font</code></td>
<td>公共属性</td>
<td>默认文本字体</td>
</tr>
<tr>
<td><code>rowHeight</code></td>
<td>公共属性</td>
<td>默认行高（像素），默认 26</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>事件</strong></td></tr>
<tr>
<td><code>gridLinkClick</code></td>
<td>公共事件</td>
<td>点击表格中超链接时触发</td>
</tr>
<tr>
<td><code>gridMenuClick</code></td>
<td>公共事件</td>
<td>点击右键菜单项时触发</td>
</tr>
<tr>
<td><code>gridMenuInit</code></td>
<td>公共事件</td>
<td>右键菜单显示前触发</td>
</tr>
<tr>
<td><code>gridClick</code></td>
<td>公共事件</td>
<td>鼠标在表格单元格上按下时触发</td>
</tr>
<tr>
<td><code>gridDoubleClick</code></td>
<td>公共事件</td>
<td>双击表格中的项时触发</td>
</tr>
<tr>
<td><code>gridKeyPress</code></td>
<td>公共事件</td>
<td>按键按下时触发</td>
</tr>
<tr>
<td><code>gridXmlLoaded</code></td>
<td>公共事件</td>
<td>XML 内容加载解析完成时触发</td>
</tr>
<tr>
<td><code>gridRowSelect</code></td>
<td>公共事件</td>
<td>行被选中之前触发</td>
</tr>
<tr>
<td><code>gridEditCell</code></td>
<td>公共事件</td>
<td>单元格编辑状态改变时触发</td>
</tr>
<tr>
<td><code>gridSelectCell</code></td>
<td>公共事件</td>
<td>单元格在 UI 中被选中时触发</td>
</tr>
<tr>
<td><code>gridSort</code></td>
<td>公共事件</td>
<td>列排序时触发</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>行操作方法</strong></td></tr>
<tr>
<td><code>addRow(newId, text)</code></td>
<td>公共方法</td>
<td>向表格添加新行</td>
</tr>
<tr>
<td><code>deleteRow(rowId)</code></td>
<td>公共方法</td>
<td>删除指定 ID 的行</td>
</tr>
<tr>
<td><code>deleteSelectedItem()</code></td>
<td>公共方法</td>
<td>删除当前选中的行</td>
</tr>
<tr>
<td><code>removeAllRows()</code></td>
<td>公共方法</td>
<td>删除表格中所有行</td>
</tr>
<tr>
<td><code>moveRowUp(rowId)</code></td>
<td>公共方法</td>
<td>将指定行向上移动</td>
</tr>
<tr>
<td><code>moveRowDown(rowId)</code></td>
<td>公共方法</td>
<td>将指定行向下移动</td>
</tr>
<tr>
<td><code>getRowId(rowIndex)</code></td>
<td>公共方法</td>
<td>通过行索引获取行 ID（从 0 开始）</td>
</tr>
<tr>
<td><code>getRowIndex(rowId)</code></td>
<td>公共方法</td>
<td>获取该行的顺序索引</td>
</tr>
<tr>
<td><code>getRowsNum()</code></td>
<td>公共方法</td>
<td>返回表格中总行数</td>
</tr>
<tr>
<td><code>getRowCount()</code></td>
<td>公共方法</td>
<td>获取表格实际包含的行数</td>
</tr>
<tr>
<td><code>getCurRow()</code></td>
<td>公共方法</td>
<td>获取当前选中行的行号</td>
</tr>
<tr>
<td><code>isItemExists(rowId)</code></td>
<td>公共方法</td>
<td>判断指定 ID 的行是否存在</td>
</tr>
<tr>
<td><code>showRow(rowId, visible)</code></td>
<td>公共方法</td>
<td>显示/隐藏指定行</td>
</tr>
<tr>
<td><code>showInputRow(visible)</code></td>
<td>公共方法</td>
<td>显示或隐藏输入行</td>
</tr>
<tr>
<td><code>isInputRowVisible()</code></td>
<td>公共方法</td>
<td>输入行是否可见</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>单元格操作方法</strong></td></tr>
<tr>
<td><code>cells(rowId, columnIndex)</code></td>
<td>公共方法</td>
<td>获取单元格对象（通过 rowId），支持特殊行 "header_row" 和 "input_row"</td>
</tr>
<tr>
<td><code>cells2(rowIdInt, columnIndex)</code></td>
<td>公共方法</td>
<td>获取单元格对象（通过整数 rowId）</td>
</tr>
<tr>
<td><code>getCellValue(rowId, columnIndex)</code></td>
<td>公共方法</td>
<td>快捷获取单元格值</td>
</tr>
<tr>
<td><code>setCellValue(rowId, columnIndex, value)</code></td>
<td>公共方法</td>
<td>快捷设置单元格值</td>
</tr>
<tr>
<td><code>editCell(rowId, columnIndex)</code></td>
<td>公共方法</td>
<td>将焦点移至该单元格并切换到编辑模式</td>
</tr>
<tr>
<td><code>cellIsCheckbox(rowId, columnIndex)</code></td>
<td>公共方法</td>
<td>判断单元格是否包含复选框</td>
</tr>
<tr>
<td><code>cellWasChanged(rowId, columnIndex)</code></td>
<td>公共方法</td>
<td>判断单元格值在上次编辑中是否被用户修改</td>
</tr>
<tr>
<td><code>setCellCombo(rowId, colIdx, labels, values)</code></td>
<td>公共方法</td>
<td>为指定单元格设置下拉框</td>
</tr>
<tr>
<td><code>setCellLink(rowId, colIdx, value)</code></td>
<td>公共方法</td>
<td>为指定单元格设置超链接</td>
</tr>
<tr>
<td><code>setCellFont(rowId, colIdx, value)</code></td>
<td>公共方法</td>
<td>设置指定单元格字体（格式：名称-样式-大小）</td>
</tr>
<tr>
<td><code>setCellTextColor(rowId, colIdx, value)</code></td>
<td>公共方法</td>
<td>设置指定单元格文字颜色</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>列操作方法</strong></td></tr>
<tr>
<td><code>getColumnCount()</code></td>
<td>公共方法</td>
<td>获取列数</td>
</tr>
<tr>
<td><code>getColumnName(columnIndex)</code></td>
<td>公共方法</td>
<td>通过列索引获取列名</td>
</tr>
<tr>
<td><code>getColumnIndex(columnName)</code></td>
<td>公共方法</td>
<td>通过列名获取列索引，未找到返回 -1</td>
</tr>
<tr>
<td><code>getColWidth(columnIndex)</code></td>
<td>公共方法</td>
<td>获取指定列宽度</td>
</tr>
<tr>
<td><code>getColWidths()</code></td>
<td>公共方法</td>
<td>获取所有列宽度，以 ";" 分隔</td>
</tr>
<tr>
<td><code>getColumnOrder(columnIndex)</code></td>
<td>公共方法</td>
<td>获取指定列的显示顺序</td>
</tr>
<tr>
<td><code>getLogicalColumnOrder()</code></td>
<td>公共方法</td>
<td>获取所有列名，按显示顺序以 ";" 分隔</td>
</tr>
<tr>
<td><code>getHeaderCol(columnIndex)</code></td>
<td>公共方法</td>
<td>返回列头标签文本</td>
</tr>
<tr>
<td><code>getHeaderIndex(label)</code></td>
<td>公共方法</td>
<td>通过标签文本获取列头索引（自动化用），-1 表示未找到</td>
</tr>
<tr>
<td><code>setColumnProperties(propStr, colIdx)</code></td>
<td>公共方法</td>
<td>配置列的类型等属性</td>
</tr>
<tr>
<td><code>setColumnVisible(colIdx, visible, width)</code></td>
<td>公共方法</td>
<td>设置列的可见性</td>
</tr>
<tr>
<td><code>isColumnVisible(columnIndex)</code></td>
<td>公共方法</td>
<td>判断列是否可见</td>
</tr>
<tr>
<td><code>sort(columnIndex, asc)</code></td>
<td>公共方法</td>
<td>按指定列升序或降序排列表格</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>选中操作方法</strong></td></tr>
<tr>
<td><code>selectAll()</code></td>
<td>公共方法</td>
<td>选中表格中所有行</td>
</tr>
<tr>
<td><code>deselect()</code></td>
<td>公共方法</td>
<td>取消所有选中行</td>
</tr>
<tr>
<td><code>getSelectedID()</code></td>
<td>公共方法</td>
<td>获取当前选中行的 ID</td>
</tr>
<tr>
<td><code>getSelectedCell()</code></td>
<td>公共方法</td>
<td>获取当前选中的单元格对象</td>
</tr>
<tr>
<td><code>getSelectedItemIDs(separator)</code></td>
<td>公共方法</td>
<td>获取所有选中行的 ID 列表</td>
</tr>
<tr>
<td><code>setSelectedRow(rowId, multi, show)</code></td>
<td>公共方法</td>
<td>在运行时设置选中行</td>
</tr>
<tr>
<td><code>setMultiselect(value)</code></td>
<td>公共方法</td>
<td>运行时启用/禁用多选</td>
</tr>
<tr>
<td><code>isMultiselect()</code></td>
<td>公共方法</td>
<td>判断多选是否启用</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>表格状态方法</strong></td></tr>
<tr>
<td><code>disable()</code></td>
<td>公共方法</td>
<td>禁用表格</td>
</tr>
<tr>
<td><code>enable()</code></td>
<td>公共方法</td>
<td>启用表格</td>
</tr>
<tr>
<td><code>setEditable(value)</code></td>
<td>公共方法</td>
<td>运行时启用/禁用单元格编辑</td>
</tr>
<tr>
<td><code>isEditable()</code></td>
<td>公共方法</td>
<td>单元格编辑是否启用</td>
</tr>
<tr>
<td><code>requestFocus()</code></td>
<td>公共方法</td>
<td>将输入焦点设置到控件</td>
</tr>
<tr>
<td><code>turnEditOff()</code></td>
<td>公共方法</td>
<td>使焦点离开表格单元格</td>
</tr>
<tr>
<td><code>clear()</code></td>
<td>公共方法</td>
<td>清除表格</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>右键菜单方法</strong></td></tr>
<tr>
<td><code>menu()</code></td>
<td>公共方法</td>
<td>获取右键菜单对象以直接操作其属性</td>
</tr>
<tr>
<td><code>menuAdd(text, image)</code></td>
<td>公共方法</td>
<td>向菜单添加带文本和图标的菜单项</td>
</tr>
<tr>
<td><code>menuAddSeparator()</code></td>
<td>公共方法</td>
<td>添加菜单分隔符（显示为 "-"）</td>
</tr>
<tr>
<td><code>menuRemoveAll()</code></td>
<td>公共方法</td>
<td>移除所有菜单项</td>
</tr>
<tr>
<td><code>menuSetEnabled(text, flag)</code></td>
<td>公共方法</td>
<td>设置菜单项启用/禁用</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>XML 数据方法</strong></td></tr>
<tr>
<td><code>initXML(xmlString)</code></td>
<td>公共方法</td>
<td>将 XML 字符串或 URL 加载到表格</td>
</tr>
<tr>
<td><code>initXMLRows(xmlDoc)</code></td>
<td>公共方法</td>
<td>从 XML 文档初始化行数据</td>
</tr>
<tr>
<td><code>addXMLRows(xmlDoc)</code></td>
<td>公共方法</td>
<td>从 XML 文档添加新行</td>
</tr>
<tr>
<td><code>getAllItemIds(separator)</code></td>
<td>公共方法</td>
<td>获取所有行 ID 列表</td>
</tr>
<tr>
<td><code>getVisibleItemIDs(separator)</code></td>
<td>公共方法</td>
<td>获取当前可见行的 ID 列表</td>
</tr>
<tr>
<td><code>setUserData(rowId, key, value)</code></td>
<td>公共方法</td>
<td>在行级别存储额外数据或标记</td>
</tr>
<tr>
<td><code>getUserData(rowId, key)</code></td>
<td>公共方法</td>
<td>获取通过 setUserData 或 USERDATAn 参数存储的额外数据</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>差异视图方法</strong></td></tr>
<tr>
<td><code>loadBaselineXml(xml)</code></td>
<td>公共方法</td>
<td>加载基准 XML 用于差异比对</td>
</tr>
<tr>
<td><code>addAllColumnsToDiffView()</code></td>
<td>公共方法</td>
<td>将全部列加入差异比对列表</td>
</tr>
<tr>
<td><code>addColumnToDiffView(colName)</code></td>
<td>公共方法</td>
<td>将指定列加入差异比对列表</td>
</tr>
<tr>
<td><code>removeColumnFromDiffView(colName)</code></td>
<td>公共方法</td>
<td>从差异比对列表中移除指定列</td>
</tr>
<tr>
<td><code>removeAllColumnsFromDiffView()</code></td>
<td>公共方法</td>
<td>从差异比对列表中移除所有列</td>
</tr>
<tr class="section-header"><td colspan="3"><strong>其他方法</strong></td></tr>
<tr>
<td><code>copyRowContent()</code></td>
<td>公共方法</td>
<td>复制行内容</td>
</tr>
<tr>
<td><code>deleteColumn()</code></td>
<td>公共方法</td>
<td>删除列</td>
</tr>
<tr>
<td><code>disableSortingByColumn()</code></td>
<td>公共方法</td>
<td>禁用按列排序</td>
</tr>
<tr>
<td><code>getMenu()</code></td>
<td>公共方法</td>
<td>获取表格上下文菜单指针</td>
</tr>
<tr>
<td><code>loadCheckboxIcons()</code></td>
<td>公共方法</td>
<td>加载复选框图标</td>
</tr>
<tr>
<td><code>loadSortIcons()</code></td>
<td>公共方法</td>
<td>加载排序图标</td>
</tr>
</tbody>
</table>

<h2>API 详情</h2>

<!-- ====== 构造函数 ====== -->
<h3>构造函数</h3>
<h4>GridContainer()</h4>
<p>创建一个 GridContainer 实例。GridContainer 是表格控件的容器，管理表格的布局、数据和交互。</p>
<h4>示例</h4>

```javascript
// 通过 clientControlsFactory 创建 GridContainer
var grid = clientControlsFactory.createControl("Aras.Client.Controls.Public.GridContainer");
var relationShipType = top.aras.getItemTypeForClient("Part BOM", "Part BOM");
grid.initXML(relationShipType.getClientItemXML("Part BOM"));
grid.showInputRow(true);
```


<!-- ====== 属性 ====== -->
<h2>属性详情</h2>

<h3>bgColor</h3>
<p>获取或设置单元格的默认背景颜色。</p>
<h4>语法</h4>

```javascript
// 获取
var color = grid.bgColor;
// 设置
grid.bgColor = "#FFFFFF";
```

<h4>返回值</h4>
<p><strong>string</strong></p>

<h3>bgInvert</h3>
<p>获取或设置选中行时是否反转背景颜色。默认为 <code>true</code>。</p>
<h4>语法</h4>

```javascript
// 获取
var invert = grid.bgInvert;
// 设置
grid.bgInvert = true;
```

<h4>返回值</h4>
<p><strong>bool</strong></p>

<h3>borderGColor</h3>
<p>获取或设置单元格边框颜色。</p>
<h4>语法</h4>

```javascript
grid.borderGColor = "#CCCCCC";
var borderColor = grid.borderGColor;
```

<h4>返回值</h4>
<p><strong>bool</strong></p>

<h3>delimeter</h3>
<p>获取或设置分隔符字符。用于多个 ID 列表返回值的分隔。</p>
<h4>语法</h4>

```javascript
// 设置分隔符为逗号
grid.delimeter = ",";
var delim = grid.delimeter;
```

<h4>返回值</h4>
<p><strong>string</strong></p>

<h3>font</h3>
<p>获取或设置表格的默认文本字体。</p>
<h4>语法</h4>

```javascript
grid.font = "Arial";
var currentFont = grid.font;
```

<h4>返回值</h4>
<p><strong>string</strong></p>

<h3>rowHeight</h3>
<p>获取或设置默认行高（像素）。默认为 <code>26</code>。</p>
<h4>语法</h4>

```javascript
// 设置行高为 30 像素
grid.rowHeight = "30";
var height = grid.rowHeight;
```

<h4>返回值</h4>
<p><strong>string</strong></p>

<!-- ====== 事件 ====== -->
<h2>事件详情</h2>

<h3>gridLinkClick</h3>
<p>当用户点击表格中的超链接时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>link</code></td><td>string</td><td>被点击的链接 URL</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridLinkClick", function(link) {
    console.log("链接被点击:", link);
});
```


<h3>gridMenuClick</h3>
<p>当用户点击右键菜单中的菜单项时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>menuItem</code></td><td>string</td><td>被点击的菜单项文本</td></tr>
<tr><td><code>rowId</code></td><td>string</td><td>右键点击所在行的 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>右键点击所在列的索引</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridMenuClick", function(menuItem, rowId, columnIndex) {
    if (menuItem === "删除") {
        grid.deleteRow(rowId);
    }
});
```


<h3>gridMenuInit</h3>
<p>右键菜单显示之前触发。可以在此事件中动态配置菜单项。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>右键点击所在行的 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>右键点击所在列的索引</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>bool</strong></p>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridMenuInit", function(rowId, columnIndex) {
    grid.menuRemoveAll();
    grid.menuAdd("查看详情", "path/to/icon.png");
    grid.menuAddSeparator();
    grid.menuAdd("删除", "path/to/delete.png");
});
```


<h3>gridClick</h3>
<p>当鼠标指针位于表格单元格上且按下鼠标按钮时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>点击所在行的 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>点击所在列的索引</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridClick", function(rowId, columnIndex) {
    console.log("点击行:", rowId, "列:", columnIndex);
});
```


<h3>gridDoubleClick</h3>
<p>当双击表格中的任何项时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>双击所在行的 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>双击所在列的索引</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridDoubleClick", function(rowId, columnIndex) {
    // 双击打开编辑对话框
    top.aras.uiShowItem(grid.getUserData(rowId, "itemType"), rowId);
});
```


<h3>gridKeyPress</h3>
<p>当在表格中按下键盘按键时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>key</code></td><td>Object / KeyboardEvent</td><td>键盘事件对象</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>object</strong></p>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridKeyPress", function(keyEvent) {
    if (keyEvent.keyCode === 46) { // Delete 键
        grid.deleteSelectedItem();
    }
});
```


<h3>gridXmlLoaded</h3>
<p>当 XML 内容被加载并解析完成后触发。</p>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridXmlLoaded", function() {
    console.log("表格数据加载完成，共 " + grid.getRowsNum() + " 行");
});
```


<h3>gridRowSelect</h3>
<p>在任何行被选中之前触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>将要被选中的行 ID</td></tr>
<tr><td><code>multi</code></td><td>bool</td><td>是否为多选模式</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridRowSelect", function(rowId, multi) {
    console.log("行选中:", rowId, "多选:", multi);
});
```


<h3>gridEditCell</h3>
<p>当单元格编辑状态改变时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>type</code></td><td>int</td><td>编辑状态类型</td></tr>
<tr><td><code>rowId</code></td><td>string</td><td>编辑单元格所在行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>编辑单元格所在列索引</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>object</strong></p>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridEditCell", function(type, rowId, columnIndex) {
    // 可以在编辑开始时动态设置下拉框选项
    var cell = grid.cells(rowId, columnIndex);
});
```


<h3>gridSelectCell</h3>
<p>当单元格在 UI 中被选中时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>cell</code></td><td>Aras.Client.Controls.Public.Cell</td><td>被选中的单元格对象</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridSelectCell", function(cell) {
    console.log("单元格被选中");
});
```


<h3>gridSort</h3>
<p>当列排序时触发。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>columnIndex</code></td><td>int</td><td>排序的列索引</td></tr>
<tr><td><code>asc</code></td><td>bool</td><td>是否升序</td></tr>
<tr><td><code>savedOrder</code></td><td>bool</td><td>是否保存排序顺序</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
clientControlsFactory.on(control, "gridSort", function(columnIndex, asc, savedOrder) {
    console.log("列 " + columnIndex + " 排序, 升序: " + asc);
});
```


<!-- ====== 行操作方法 ====== -->
<h2>行操作方法</h2>

<h3>addRow(newId, text)</h3>
<p>向表格添加一个新行。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>newId</code></td><td>string</td><td>新行的唯一标识符</td></tr>
<tr><td><code>text</code></td><td>string</td><td>行数据字符串，各列值以分隔符分隔</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 添加一行数据
grid.addRow("row_001", "值1\t值2\t值3");
// 或者使用分隔符
grid.delimeter = ",";
grid.addRow("row_002", "列1值,列2值,列3值");
```


<h3>deleteRow(rowId)</h3>
<p>删除指定 ID 的行。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>要删除的行 ID</td></tr>
</tbody>
</table>

<h3>removeAllRows()</h3>
<p>删除表格中的所有行。</p>
<h4>示例</h4>

```javascript
// 清空表格
grid.removeAllRows();
```


<h3>moveRowUp(rowId) / moveRowDown(rowId)</h3>
<p>将指定行在表格中上移或下移。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>要移动的行 ID</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 将当前选中行上移
var selectedId = grid.getSelectedID();
if (selectedId) {
    grid.moveRowUp(selectedId);
}
```


<h3>getRowId(rowIndex)</h3>
<p>通过行索引获取行 ID（从 0 开始，从上到下）。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowIndex</code></td><td>int</td><td>行的索引位置（从 0 开始）</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 行 ID</p>

<h3>getRowsNum()</h3>
<p>返回表格中的总行数。</p>
<h4>返回值</h4>
<p><strong>int</strong></p>

<h3>getRowCount()</h3>
<p>获取表格中实际包含的行数。</p>
<h4>返回值</h4>
<p><strong>int</strong></p>

<h3>isItemExists(rowId)</h3>
<p>判断指定 ID 的行是否存在于表格中。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>要检查的行 ID</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>bool</strong> — 存在返回 true，否则返回 false</p>

<h3>showInputRow(visible)</h3>
<p>显示或隐藏输入行。输入行通常位于表格顶部，用于快速添加新数据。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>visible</code></td><td>bool</td><td>true 显示输入行，false 隐藏</td></tr>
</tbody>
</table>

<!-- ====== 单元格操作方法 ====== -->
<h2>单元格操作方法</h2>

<h3>cells(rowId, columnIndex)</h3>
<p>获取单元格对象以直接操作其属性。支持特殊行 ID：<code>"header_row"</code>（表头行）和 <code>"input_row"</code>（输入行）。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID，或 "header_row" / "input_row"</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>Aras.Client.Controls.Public.Cell</strong></p>

<h3>cells2(rowIdInt, columnIndex)</h3>
<p>通过整数行 ID 获取单元格对象以直接操作其属性。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowIdInt</code></td><td>int</td><td>整数行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>Aras.Client.Controls.Public.Cell</strong></p>

<h3>getCellValue(rowId, columnIndex) / setCellValue(rowId, columnIndex, value)</h3>
<p>获取或设置指定单元格的值。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
<tr><td><code>value</code></td><td>string</td><td>（仅 setCellValue）要设置的值</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 获取值
var val = grid.getCellValue("row_001", 0);

// 设置值
grid.setCellValue("row_001", 1, "新值");
```


<h3>editCell(rowId, columnIndex)</h3>
<p>将焦点移到指定单元格并切换到编辑模式。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 编辑第一行第二列的单元格
grid.editCell("row_001", 1);
```


<h3>cellIsCheckbox(rowId, columnIndex)</h3>
<p>判断指定单元格是否包含复选框。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>bool</strong></p>

<h3>cellWasChanged(rowId, columnIndex)</h3>
<p>判断指定单元格的值在上次编辑中是否被用户修改过。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>bool</strong> — 被修改过返回 true，否则返回 false</p>

<h3>setCellCombo(rowId, columnIndex, labels, values)</h3>
<p>为指定单元格设置下拉框（ComboBox）选项。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
<tr><td><code>labels</code></td><td>any</td><td>下拉框显示标签列表</td></tr>
<tr><td><code>values</code></td><td>any</td><td>下拉框对应的值列表</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 在 gridEditCell 事件中动态设置下拉框
clientControlsFactory.on(control, "gridEditCell", function(type, rowId, columnIndex) {
    if (columnIndex === 2) {
        grid.setCellCombo(rowId, columnIndex,
            ["选项A", "选项B", "选项C"],
            ["A", "B", "C"]
        );
    }
});
```


<h3>setCellFont(rowId, columnIndex, value)</h3>
<p>设置指定单元格的字体。值的格式为：<code>名称-样式-大小</code>，样式可选值：<code>bold</code>、<code>italic</code>、<code>bolditalic</code>。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
<tr><td><code>value</code></td><td>string</td><td>字体字符串，如 "Courier-bold-12"</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
grid.setCellFont("row_001", 0, "Courier-bold-12");
grid.setCellFont("row_002", 1, "Arial-italic-10");
```


<h3>setCellLink(rowId, columnIndex, value)</h3>
<p>为指定单元格设置超链接。点击后触发 <code>gridLinkClick</code> 事件。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
<tr><td><code>value</code></td><td>string</td><td>链接 URL</td></tr>
</tbody>
</table>

<h3>setCellTextColor(rowId, columnIndex, value)</h3>
<p>设置指定单元格的文字颜色。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
<tr><td><code>value</code></td><td>string</td><td>颜色值（如 "#FF0000"）</td></tr>
</tbody>
</table>

<!-- ====== 列操作方法 ====== -->
<h2>列操作方法</h2>

<h3>getColumnCount()</h3>
<p>获取表格中的列数。</p>
<h4>返回值</h4>
<p><strong>int</strong></p>

<h3>getColumnName(columnIndex) / getColumnIndex(columnName)</h3>
<p>列名与列索引之间的相互转换。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引（getColumnName）</td></tr>
<tr><td><code>columnName</code></td><td>string</td><td>列名（getColumnIndex），未找到返回 -1</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> / <strong>int</strong></p>

<h3>getHeaderCol(columnIndex)</h3>
<p>返回指定列的列头标签文本。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong></p>

<h3>setColumnProperties(propStr, columnIndex)</h3>
<p>配置列的类型和其他属性。这是一个非常重要的方法，用于定义列的编辑行为。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>propStr</code></td><td>string</td><td>逗号分隔的属性键值对字符串</td></tr>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h4>属性说明</h4>
<table>
<thead><tr><th>属性</th><th>可选值</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>type</code></td><td>FIELD / COMBO / NOEDIT</td><td>FIELD=可编辑文本框；COMBO=可编辑下拉框；NOEDIT=不可编辑</td></tr>
<tr><td><code>list</code></td><td>integer</td><td>与 type=COMBO 配合，指定下拉框列表编号</td></tr>
<tr><td><code>sortable</code></td><td>yes / no</td><td>该列是否可排序</td></tr>
<tr><td><code>sorttype</code></td><td>string / numeric / date</td><td>排序数据类型</td></tr>
<tr><td><code>inputformat</code></td><td>format_string</td><td>输入格式，如 {dd/MM/yy, hh:mm:ss}</td></tr>
<tr><td><code>locale</code></td><td>locale_string</td><td>区域设置，如 enUS</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 设置第 0 列为不可编辑文本
grid.setColumnProperties("type=NOEDIT", 0);

// 设置第 1 列为下拉框
grid.setColumnProperties("type=COMBO,list=1,sortable=no", 1);

// 设置第 2 列为日期类型
grid.setColumnProperties("sorttype=date,inputformat={dd/MM/yy, hh:mm:ss},locale=enUS", 2);

// 设置第 3 列为可编辑文本框
grid.setColumnProperties("type=FIELD,sortable=yes,sorttype=string", 3);
```


<h3>setColumnVisible(columnIndex, visible, columnWidth)</h3>
<p>设置列的可见性。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>columnIndex</code></td><td>int</td><td>列索引</td></tr>
<tr><td><code>visible</code></td><td>bool</td><td>是否可见</td></tr>
<tr><td><code>columnWidth</code></td><td>int</td><td>列宽度</td></tr>
</tbody>
</table>

<h3>sort(columnIndex, asc)</h3>
<p>按指定列升序或降序排列表格。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>columnIndex</code></td><td>int</td><td>要排序的列索引</td></tr>
<tr><td><code>asc</code></td><td>bool</td><td>true 升序，false 降序</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 按第 0 列升序排列
grid.sort(0, true);
// 按第 1 列降序排列
grid.sort(1, false);
```


<!-- ====== 选中操作方法 ====== -->
<h2>选中操作方法</h2>

<h3>setSelectedRow(rowId, multi, show)</h3>
<p>在运行时设置选中行。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>要选中的行 ID</td></tr>
<tr><td><code>multi</code></td><td>bool</td><td>false 则新行成为唯一选中行；true 则新行被选中且保留之前选中行</td></tr>
<tr><td><code>show</code></td><td>bool</td><td>是否滚动到该行使其可见</td></tr>
</tbody>
</table>
<h4>示例</h4>

```javascript
// 单选模式
grid.setSelectedRow("row_001", false, true);

// 多选模式 - 取消所有选中行的技巧
grid.deselect();
grid.setSelectedRow("row_002", true, true);
```


<h3>selectAll() / deselect()</h3>
<p>全选或取消选择表格中所有行。</p>

<h3>getSelectedID()</h3>
<p>获取当前选中行的 ID。</p>
<h4>返回值</h4>
<p><strong>string</strong></p>

<h3>getSelectedCell()</h3>
<p>获取当前选中的单元格对象。</p>
<h4>返回值</h4>
<p><strong>Aras.Client.Controls.Public.Cell</strong></p>

<h3>getSelectedItemIDs(separator)</h3>
<p>获取所有选中行的 ID 列表，以指定分隔符分隔。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>separator</code></td><td>string</td><td>分隔符</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 以分隔符连接的 ID 字符串</p>

<h3>setMultiselect(value) / isMultiselect()</h3>
<p>运行时启用/禁用多选模式，以及查询多选状态。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td>string</td><td>（setMultiselect）是否启用多选</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>（isMultiselect）<strong>bool</strong></p>

<!-- ====== 右键菜单方法 ====== -->
<h2>右键菜单方法</h2>

<h3>menuAdd(text, image)</h3>
<p>向菜单集合添加一个显示指定文本和图标的菜单项。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td>string</td><td>菜单项文本</td></tr>
<tr><td><code>image</code></td><td>string</td><td>图标路径</td></tr>
</tbody>
</table>

<h3>menuAddSeparator()</h3>
<p>添加菜单分隔符（显示为 "-"）。</p>

<h3>menuRemoveAll()</h3>
<p>从菜单项集合中移除所有菜单项对象。通常在 <code>gridMenuInit</code> 事件中使用，先清空再重新构建菜单。</p>

<h3>menuSetEnabled(text, flag)</h3>
<p>设置指定文本的菜单项是否启用。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td>string</td><td>菜单项文本</td></tr>
<tr><td><code>flag</code></td><td>bool</td><td>true 启用，false 禁用</td></tr>
</tbody>
</table>

<h4>完整菜单示例</h4>

```javascript
// 在 gridMenuInit 事件中构建动态右键菜单
clientControlsFactory.on(control, "gridMenuInit", function(rowId, columnIndex) {
    // 先清空已有菜单
    grid.menuRemoveAll();

    // 添加菜单项
    grid.menuAdd("查看详情", "../images/detail.svg");
    grid.menuAdd("编辑", "../images/edit.svg");
    grid.menuAddSeparator();
    grid.menuAdd("删除", "../images/delete.svg");

    // 根据条件禁用某些菜单
    var selectedId = grid.getSelectedID();
    if (!selectedId || selectedId === "") {
        grid.menuSetEnabled("删除", false);
        grid.menuSetEnabled("编辑", false);
    }
});

// 处理菜单点击
clientControlsFactory.on(control, "gridMenuClick", function(menuItem, rowId, columnIndex) {
    switch (menuItem) {
        case "查看详情":
            top.aras.uiShowItem("Part", rowId);
            break;
        case "删除":
            grid.deleteRow(rowId);
            break;
    }
});
```


<!-- ====== XML 数据方法 ====== -->
<h2>XML 数据方法</h2>

<h3>initXML(xmlString)</h3>
<p>将 XML 字符串加载到表格中。这是初始化表格最常用的方法，通常配合 <code>aras.getItemTypeForClient</code> 和 <code>getClientItemXML</code> 使用。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>xmlString</code></td><td>string</td><td>XML 字符串</td></tr>
</tbody>
</table>
<h4>XML 结构示例</h4>

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root lang="XML">
  <table editable="true" multiselect="true">
    <columns>
      <column width="100" align="left" order="0"/>
      <column width="200" align="center" order="1"/>
    </columns>
    <thead height="20">
      <th>表头 1</th>
      <th>表头 2</th>
    </thead>
    <tbody>
      <tr id="row_001">
        <td>值1</td>
        <td>值2</td>
      </tr>
    </tbody>
  </table>
</root>
```


<h3>initXMLRows(xmlDoc) / addXMLRows(xmlDoc)</h3>
<p>从 XML 文档初始化行数据或添加新行。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>xmlDoc</code></td><td>string</td><td>XML 文档字符串</td></tr>
</tbody>
</table>

<h3>setUserData(rowId, key, value) / getUserData(rowId, key)</h3>
<p>设置或获取行级别的额外数据。可用于在行中存储任意自定义数据或标志位。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>rowId</code></td><td>string</td><td>行 ID</td></tr>
<tr><td><code>keyOrValue</code></td><td>string</td><td>数据的键名（或键值对中的值）</td></tr>
<tr><td><code>value</code></td><td>string</td><td>（可选）要存储的值</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>（getUserData）<strong>string</strong></p>
<h4>示例</h4>

```javascript
// 存储 ItemType 信息
grid.setUserData("row_001", "itemType", "Part");
grid.setUserData("row_001", "isLocked", "false");

// 读取存储的数据
var itemType = grid.getUserData("row_001", "itemType"); // "Part"
```


<h3>getAllItemIds(separator) / getVisibleItemIDs(separator)</h3>
<p>获取所有行或当前可见行的 ID 列表。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>separator</code></td><td>string</td><td>分隔符</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 以分隔符连接的 ID 字符串</p>

<!-- ====== 差异视图 ====== -->
<h2>差异视图（Redline）方法</h2>

<h3>loadBaselineXml(xml)</h3>
<p>加载基准 XML，用于与当前数据进行差异比对。差异视图模式下，变化的单元格会以红色高亮显示。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>xml</code></td><td>string</td><td>基准 XML 字符串</td></tr>
</tbody>
</table>

<h3>addAllColumnsToDiffView()</h3>
<p>将所有列加入差异比对列表。在差异比对列表中的列会在 Redline 视图模式下进行变化检查。</p>

<h3>addColumnToDiffView(columnName)</h3>
<p>将指定列加入差异比对列表。</p>

<h3>removeColumnFromDiffView(columnName)</h3>
<p>从差异比对列表中移除指定列。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>columnName</code></td><td>string</td><td>列名</td></tr>
</tbody>
</table>

<h4>示例</h4>

```javascript
// 设置差异比对
grid.loadBaselineXml(baselineXmlString);
grid.addAllColumnsToDiffView();
// 或者只对特定列进行比对
grid.addColumnToDiffView("name");
grid.addColumnToDiffView("description");
```


<!-- ====== 表格状态方法 ====== -->
<h2>表格状态方法</h2>

<h3>disable() / enable()</h3>
<p>禁用或启用整个表格。</p>
<h4>示例</h4>

```javascript
// 数据处理期间禁用表格
grid.disable();
// ... 批量更新数据 ...
grid.enable();
```


<h3>setEditable(value) / isEditable()</h3>
<p>运行时启用或禁用单元格编辑。</p>
<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td>bool</td><td>true 允许编辑，false 禁止编辑</td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p>（isEditable）<strong>bool</strong> — 编辑是否启用</p>

<h3>requestFocus()</h3>
<p>将输入焦点设置到控件。</p>

<h3>turnEditOff()</h3>
<p>使焦点离开表格单元格，结束编辑状态。</p>

<!-- ====== 完整使用示例 ====== -->
<h2>完整使用示例</h2>

<h3>初始化表格并绑定事件</h3>

```javascript
// 1. 创建 GridContainer 控件
var grid = clientControlsFactory.createControl(
    "Aras.Client.Controls.Public.GridContainer"
);

// 2. 加载数据
var itemType = top.aras.getItemTypeForClient("Part BOM", "Part BOM");
grid.initXML(itemType.getClientItemXML("Part BOM"));

// 3. 显示输入行
grid.showInputRow(true);

// 4. 设置多选
grid.setMultiselect("true");

// 5. 绑定事件
clientControlsFactory.on(grid, "gridMenuInit", function(rowId, columnIndex) {
    grid.menuRemoveAll();
    grid.menuAdd("查看", "../images/view.svg");
    grid.menuAdd("删除", "../images/delete.svg");
});

clientControlsFactory.on(grid, "gridMenuClick", function(menuItem, rowId, columnIndex) {
    if (menuItem === "查看") {
        top.aras.uiShowItem("Part", rowId);
    } else if (menuItem === "删除") {
        grid.deleteRow(rowId);
    }
});

clientControlsFactory.on(grid, "gridDoubleClick", function(rowId, columnIndex) {
    top.aras.uiShowItem("Part", rowId);
});

clientControlsFactory.on(grid, "gridXmlLoaded", function() {
    console.log("表格加载完成，行数: " + grid.getRowsNum());
});
```


<h3>动态构建表格</h3>

```javascript
// 通过 XML 字符串构建表格
var xmlString = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<root lang="XML">' +
    '  <table editable="true" multiselect="true">' +
    '    <columns>' +
    '      <column width="150" align="left" order="0" name="name"/>' +
    '      <column width="200" align="left" order="1" name="description"/>' +
    '    </columns>' +
    '    <thead height="24">' +
    '      <th>名称</th>' +
    '      <th>描述</th>' +
    '    </thead>' +
    '  </table>' +
    '</root>';

grid.initXML(xmlString);

// 添加数据行
grid.addRow("001", "项目A\t这是项目A的描述");
grid.addRow("002", "项目B\t这是项目B的描述");
grid.addRow("003", "项目C\t这是项目C的描述");

// 设置列属性
grid.setColumnProperties("type=NOEDIT", 0);  // 名称列不可编辑
grid.setColumnProperties("type=FIELD", 1);   // 描述列可编辑
```


<hr />
<p><em>⚠️ 已弃用。此 API 属于 Aras Innovator 客户端的旧版控件体系。新项目请使用 CUI Grid 组件替代。适用版本：Aras Innovator 11.0-14.x。</em></p>
