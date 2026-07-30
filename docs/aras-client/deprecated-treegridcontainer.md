---
title: TreeGridContainer（树形网格）
---

<h1>TreeGridContainer（已弃用）</h1>
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
<p>树形网格容器组件。用于显示和操作树状结构的表格数据，支持行展开/折叠、单元格编辑、多选、排序、右键菜单等功能。此控件已被新的 CUI Grid 组件替代，不再推荐使用。</p>
</blockquote>

<h2>API 成员概览</h2>

<h3>构造函数</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>TreeGridContainer()</code></td><td>public constructor</td><td>创建 TreeGridContainer 实例</td></tr>
</tbody>
</table>

<h3>属性</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>bgColor</code></td><td>public property</td><td>默认单元格背景色</td></tr>
<tr><td><code>bgInvert</code></td><td>public property</td><td>选中时是否反转行背景色，默认 true</td></tr>
<tr><td><code>borderGColor</code></td><td>public property</td><td>单元格边框颜色</td></tr>
<tr><td><code>delimeter</code></td><td>public property</td><td>分隔符字符</td></tr>
<tr><td><code>font</code></td><td>public property</td><td>默认文本字体</td></tr>
<tr><td><code>rowHeight</code></td><td>public property</td><td>默认行高（像素），默认 26</td></tr>
</tbody>
</table>

<h3>事件</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>Event:gridLinkClick</code></td><td>public event</td><td>单击网格中超链接时触发</td></tr>
<tr><td><code>Event:gridMenuClick</code></td><td>public event</td><td>单击菜单项时触发</td></tr>
<tr><td><code>Event:gridMenuInit</code></td><td>public event</td><td>菜单显示前触发</td></tr>
<tr><td><code>Event:gridClick</code></td><td>public event</td><td>鼠标在网格单元格上按下时触发</td></tr>
<tr><td><code>Event:gridDoubleClick</code></td><td>public event</td><td>双击网格中任意项时触发</td></tr>
<tr><td><code>Event:gridKeyPress</code></td><td>public event</td><td>按键按下时触发</td></tr>
<tr><td><code>Event:gridRowSelect</code></td><td>public event</td><td>行被选中前触发</td></tr>
<tr><td><code>Event:gridSort</code></td><td>public event</td><td>列排序时触发</td></tr>
<tr><td><code>Event:gridXmlLoaded</code></td><td>public event</td><td>XML 内容加载并解析完成时触发</td></tr>
<tr><td><code>Event:gridSelectCell</code></td><td>public event</td><td>UI 中单元格被选中时触发</td></tr>
</tbody>
</table>

<h3>数据加载方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>initXML()</code></td><td>public method</td><td>加载 XML 字符串或 URL 到网格</td></tr>
<tr><td><code>addXMLRows()</code></td><td>public method</td><td>从 XML 文档加载新行</td></tr>
<tr><td><code>initXMLRows()</code></td><td>public method</td><td>从 XML 文档初始化行</td></tr>
<tr><td><code>getXml()</code></td><td>public method</td><td>获取网格的 XML 表示</td></tr>
</tbody>
</table>

<h3>行操作方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>addRow()</code></td><td>public method</td><td>添加行</td></tr>
<tr><td><code>insertRoot()</code></td><td>public method</td><td>在根级插入新行</td></tr>
<tr><td><code>insertNewChild()</code></td><td>public method</td><td>为指定父行插入子行</td></tr>
<tr><td><code>deleteRow()</code></td><td>public method</td><td>删除指定ID的行</td></tr>
<tr><td><code>deleteSelectedItem()</code></td><td>public method</td><td>删除选中的行</td></tr>
<tr><td><code>removeAllRows()</code></td><td>public method</td><td>移除所有行</td></tr>
</tbody>
</table>

<h3>行查询方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>getRowCount()</code></td><td>public method</td><td>获取实际行数</td></tr>
<tr><td><code>getRowsNum()</code></td><td>public method</td><td>获取总行数</td></tr>
<tr><td><code>getRowId()</code></td><td>public method</td><td>通过行索引获取行ID</td></tr>
<tr><td><code>getRowIndex()</code></td><td>public method</td><td>获取行的顺序索引</td></tr>
<tr><td><code>getCurRow()</code></td><td>public method</td><td>获取当前选中行的行号</td></tr>
<tr><td><code>getParentId()</code></td><td>public method</td><td>获取父行ID</td></tr>
<tr><td><code>getAllItemIds()</code></td><td>public method</td><td>获取所有行ID列表</td></tr>
<tr><td><code>getVisibleItemIDs()</code></td><td>public method</td><td>获取所有可见行ID列表</td></tr>
<tr><td><code>getOpenedItems()</code></td><td>public method</td><td>获取当前展开项的ID列表</td></tr>
<tr><td><code>getChildItemsId()</code></td><td>public method</td><td>获取子行ID列表</td></tr>
</tbody>
</table>

<h3>选择与选中方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>getSelectedID()</code></td><td>public method</td><td>获取选中行ID</td></tr>
<tr><td><code>getSelectedItemIDs()</code></td><td>public method</td><td>获取选中行ID列表（以分隔符分隔）</td></tr>
<tr><td><code>getSelectedCell()</code></td><td>public method</td><td>获取选中的单元格对象</td></tr>
<tr><td><code>setSelectedRow()</code></td><td>public method</td><td>设置选中行</td></tr>
<tr><td><code>selectAll()</code></td><td>public method</td><td>全选所有行</td></tr>
<tr><td><code>deselect()</code></td><td>public method</td><td>取消所有选中行</td></tr>
<tr><td><code>setMultiselect()</code></td><td>public method</td><td>运行时启用/禁用多选</td></tr>
<tr><td><code>isMultiselect()</code></td><td>public method</td><td>判断多选是否启用</td></tr>
</tbody>
</table>

<h3>树操作方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>openItem()</code></td><td>public method</td><td>展开指定项的子节点</td></tr>
<tr><td><code>closeItem()</code></td><td>public method</td><td>关闭指定项</td></tr>
<tr><td><code>expandAll()</code></td><td>public method</td><td>展开所有树节点</td></tr>
<tr><td><code>collapseAll()</code></td><td>public method</td><td>折叠所有树节点</td></tr>
</tbody>
</table>

<h3>单元格操作方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>getCellValue()</code></td><td>public method</td><td>获取单元格值</td></tr>
<tr><td><code>setCellValue()</code></td><td>public method</td><td>设置单元格值</td></tr>
<tr><td><code>cells2()</code></td><td>public method</td><td>获取单元格对象以直接操作其属性</td></tr>
<tr><td><code>editCell()</code></td><td>public method</td><td>将焦点移到单元格并进入编辑模式</td></tr>
<tr><td><code>cellIsCheckbox()</code></td><td>public method</td><td>判断单元格是否包含复选框</td></tr>
<tr><td><code>cellWasChanged()</code></td><td>public method</td><td>判断单元格值是否被用户修改</td></tr>
<tr><td><code>turnEditOff()</code></td><td>public method</td><td>使单元格失去焦点并退出编辑模式</td></tr>
</tbody>
</table>

<h3>列操作方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>getColumnCount()</code></td><td>public method</td><td>获取列数</td></tr>
<tr><td><code>getColumnAt()</code></td><td>public method</td><td>获取指定位置的列</td></tr>
<tr><td><code>getColumnOrder()</code></td><td>public method</td><td>获取列的顺序</td></tr>
<tr><td><code>setColumnOrder()</code></td><td>public method</td><td>设置列的顺序</td></tr>
<tr><td><code>getLogicalColumnOrder()</code></td><td>public method</td><td>获取列显示顺序（分号分隔）</td></tr>
<tr><td><code>getColumnIndex()</code></td><td>public method</td><td>通过列名获取列索引</td></tr>
<tr><td><code>getColumnName()</code></td><td>public method</td><td>通过列索引获取列名</td></tr>
<tr><td><code>setColumnProperties()</code></td><td>public method</td><td>配置列类型和属性</td></tr>
<tr><td><code>setColumnVisible()</code></td><td>public method</td><td>设置列可见性</td></tr>
<tr><td><code>isColumnVisible()</code></td><td>public method</td><td>判断列是否可见</td></tr>
<tr><td><code>getColWidth()</code></td><td>public method</td><td>获取列宽</td></tr>
<tr><td><code>getColWidths()</code></td><td>public method</td><td>获取所有列宽（分号分隔）</td></tr>
<tr><td><code>setColWidth()</code></td><td>public method</td><td>设置列宽</td></tr>
<tr><td><code>getHeaderCol()</code></td><td>public method</td><td>获取列标题文本</td></tr>
<tr><td><code>getHeaderIndex()</code></td><td>public method</td><td>获取标题索引，无匹配返回 -1</td></tr>
</tbody>
</table>

<h3>菜单方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>getMenu()</code></td><td>public method</td><td>获取上下文菜单对象指针</td></tr>
<tr><td><code>menu()</code></td><td>public method</td><td>获取弹出菜单对象以直接操作</td></tr>
<tr><td><code>menuAdd()</code></td><td>public method</td><td>添加菜单项（文本与图标）</td></tr>
<tr><td><code>menuAddSeparator()</code></td><td>public method</td><td>添加菜单分隔符</td></tr>
<tr><td><code>menuRemoveAll()</code></td><td>public method</td><td>移除所有菜单项</td></tr>
<tr><td><code>menuSetEnabled()</code></td><td>public method</td><td>设置菜单项启用/禁用状态</td></tr>
</tbody>
</table>

<h3>其他方法</h3>
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>enable()</code></td><td>public method</td><td>启用网格</td></tr>
<tr><td><code>disable()</code></td><td>public method</td><td>禁用网格</td></tr>
<tr><td><code>setEditable()</code></td><td>public method</td><td>运行时启用/禁用单元格编辑</td></tr>
<tr><td><code>isEditable()</code></td><td>public method</td><td>判断单元格编辑是否启用</td></tr>
<tr><td><code>sort()</code></td><td>public method</td><td>按列升序或降序排序</td></tr>
<tr><td><code>disableSortingByColumn()</code></td><td>public method</td><td>禁用按列排序</td></tr>
<tr><td><code>setUserData()</code></td><td>public method</td><td>设置行级自定义数据</td></tr>
<tr><td><code>getUserData()</code></td><td>public method</td><td>获取行级自定义数据</td></tr>
<tr><td><code>showInputRow()</code></td><td>public method</td><td>显示/隐藏输入行</td></tr>
<tr><td><code>isInputRowVisible()</code></td><td>public method</td><td>判断输入行是否可见</td></tr>
<tr><td><code>requestFocus()</code></td><td>public method</td><td>设置输入焦点</td></tr>
<tr><td><code>setPaintEnabled()</code></td><td>public method</td><td>运行时启用/禁用网格重绘</td></tr>
<tr><td><code>setRowBgColor()</code></td><td>public method</td><td>设置行背景色</td></tr>
<tr><td><code>setCellTextColor()</code></td><td>public method</td><td>设置单元格文字颜色</td></tr>
<tr><td><code>setCellLink()</code></td><td>public method</td><td>设置单元格超链接</td></tr>
<tr><td><code>setCellFont()</code></td><td>public method</td><td>设置单元格字体</td></tr>
<tr><td><code>setCellCombo()</code></td><td>public method</td><td>为单元格设置下拉框</td></tr>
<tr><td><code>setRowIcons()</code></td><td>public method</td><td>设置行图标（折叠/展开状态）</td></tr>
</tbody>
</table>

<hr />

<h2>API 详情</h2>

<!-- ==================== Constructor ==================== -->
<h3>constructor()</h3>
<p>创建 TreeGridContainer 实例。通常通过 <code>clientControlsFactory.createControl("TreeGridContainer")</code> 方式创建，而非直接 new。</p>
<h4>语法</h4>

```javascript
Aras.Client.Controls.Public.TreeGridContainer = function();
```

    <h4>返回值</h4>
    <p><strong>TreeGridContainer</strong> — 新创建的 TreeGridContainer 实例。</p>
    <h4>示例</h4>
    
```javascript
// 通过工厂方法创建控件
var treeGridContainer = clientControlsFactory.createControl("TreeGridContainer");
```


<hr />

<!-- ==================== Properties ==================== -->
<h3>属性详解</h3>

<h4>.bgColor</h4>
<p>默认单元格背景色。</p>
<h5>语法</h5>

```javascript
function get_bgColor();
function set_bgColor(value);
```

<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>value</td><td>string</td><td>背景颜色值</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong> — 颜色字符串。</p>

<h4>.bgInvert</h4>
<p>选中时是否反转行背景色。默认为 <code>true</code>。</p>
<h5>语法</h5>

```javascript
function get_bgInvert();
function set_bgInvert(value);
```

<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>value</td><td>bool</td><td>是否启用反转</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>bool</strong> — 是否启用背景反转。</p>

<h4>.borderGColor</h4>
<p>单元格边框颜色。</p>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>value</td><td>string</td><td>颜色值</td></tr></tbody>
</table>
<p>返回值: <strong>bool</strong></p>

<h4>.delimeter</h4>
<p>分隔符字符。用于分隔 ID 列表等场景。</p>
<p>返回值: <strong>string</strong></p>

<h4>.font</h4>
<p>默认文本字体。</p>
<p>返回值: <strong>string</strong></p>

<h4>.rowHeight</h4>
<p>默认行高（单位：像素）。默认值为 26。</p>
<p>返回值: <strong>string</strong></p>
<h5>示例</h5>

```javascript
// 获取默认行高
var height = treeGridContainer.rowHeight;

// 设置行高为 32 像素
treeGridContainer.rowHeight = "32";
```


<hr />

<!-- ==================== Events ==================== -->
<h3>事件详解</h3>

<h4>.Event:gridLinkClick(link)</h4>
<p>当网格中的超链接被单击时触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>link</td><td>string</td><td>被点击的链接 URL</td></tr></tbody>
</table>
<h5>示例</h5>

```javascript
function gridLinkClick(link) {
    console.log("链接被点击:", link);
}
clientControlsFactory.on(control, "gridLinkClick", gridLinkClick);
```


<h4>.Event:gridMenuClick(menuItem, rowId, columnIndex)</h4>
<p>当菜单项被单击时触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>menuItem</td><td>string</td><td>被点击的菜单项文本</td></tr>
<tr><td>rowId</td><td>string</td><td>右键菜单所在行的 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>右键菜单所在列的索引</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
function gridMenuClick(menuItem, rowId, columnIndex) {
    if (menuItem === "删除") {
        treeGridContainer.deleteRow(rowId);
    }
}
clientControlsFactory.on(control, "gridMenuClick", gridMenuClick);
```


<h4>.Event:gridMenuInit(rowId, columnIndex)</h4>
<p>在右键菜单显示之前触发。返回 <code>false</code> 可以阻止菜单显示。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>右键菜单所在行的 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>右键菜单所在列的索引</td></tr>
</tbody>
</table>
<h5>返回值</h5>
<p><strong>bool</strong> — 返回 <code>true</code> 允许显示菜单，<code>false</code> 阻止显示。</p>
<h5>示例</h5>

```javascript
function gridMenuInit(rowId, columnIndex) {
    // 动态添加菜单项
    treeGridContainer.menuRemoveAll();
    treeGridContainer.menuAdd("查看详情", "../images/details.svg");
    treeGridContainer.menuAddSeparator();
    treeGridContainer.menuAdd("删除", "../images/delete.svg");
}
clientControlsFactory.on(control, "gridMenuInit", gridMenuInit);
```


<h4>.Event:gridClick(rowId, columnIndex)</h4>
<p>当鼠标指针在网格单元格上按下鼠标按钮时触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>被点击的行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>被点击的列索引</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
function gridClick(rowId, columnIndex) {
    console.log("行 " + rowId + " 的第 " + columnIndex + " 列被点击");
}
clientControlsFactory.on(control, "gridClick", gridClick);
```


<h4>.Event:gridDoubleClick(rowId, columnIndex)</h4>
<p>当网格中的任意项被双击时触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>被双击的行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>被双击的列索引</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
function gridDoubleClick(rowId, columnIndex) {
    // 双击打开对应 Item
    var itemTypeName = treeGridContainer.getUserData(rowId, "itemTypeName");
    if (itemTypeName) {
        top.aras.uiShowItem(itemTypeName, rowId);
    }
}
clientControlsFactory.on(control, "gridDoubleClick", gridDoubleClick);
```


<h4>.Event:gridKeyPress(key)</h4>
<p>当按键被按下时触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>key</td><td>Object / KeyboardEvent</td><td>键盘事件对象</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>object</strong></p>

<h4>.Event:gridRowSelect(rowId, multi)</h4>
<p>在任何行变为选中状态之前触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>即将被选中的行 ID</td></tr>
<tr><td>multi</td><td>bool</td><td>是否为多选模式</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
function gridRowSelect(rowId, multi) {
    // 在行选中前执行自定义逻辑
    var isAllowed = myCustomValidation(rowId);
    return isAllowed; // 返回 false 可以阻止选中
}
clientControlsFactory.on(control, "gridRowSelect", gridRowSelect);
```


<h4>.Event:gridSort(columnIndex, asc)</h4>
<p>当列被排序时触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>columnIndex</td><td>int</td><td>被排序的列索引</td></tr>
<tr><td>asc</td><td>bool</td><td>是否为升序</td></tr>
</tbody>
</table>

<h4>.Event:gridXmlLoaded()</h4>
<p>当 XML 内容被加载并解析完成时触发。</p>
<h5>示例</h5>

```javascript
function gridXmlLoaded() {
    // XML 加载完成后执行初始化逻辑
    treeGridContainer.expandAll();
}
clientControlsFactory.on(control, "gridXmlLoaded", gridXmlLoaded);
```


<h4>.Event:gridSelectCell(cell)</h4>
<p>当 UI 中的单元格被选中时触发。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>cell</td><td>Aras.Client.Controls.Public.Cell</td><td>被选中的单元格对象</td></tr></tbody>
</table>

<hr />

<!-- ==================== Data Methods ==================== -->
<h3>数据加载方法详解</h3>

<h4>.initXML(gridXml)</h4>
<p>将 XML 字符串或 URL 加载到网格中。这是初始化网格数据最常用的方法。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>gridXml</td><td>string</td><td>XML 字符串或 XML 文件的 URL</td></tr></tbody>
</table>
<h5>示例</h5>

```javascript
// 从 XML 字符串初始化网格
var xmlContent = '<xml><row id="1"><cell>数据1</cell></row></xml>';
treeGridContainer.initXML(xmlContent);

// 从 URL 加载
treeGridContainer.initXML("../data/gridData.xml");

// 从查询结果构建网格
var bodyXml = top.aras.newIOMItem("Part", "get");
top.aras.evalMethod("MyMethod", "", { bodyXml: bodyXml });
treeGridContainer.initXML(bodyXml);
```


<h4>.addXMLRows(xmlStringOrDoc)</h4>
<p>从 XML 文档添加新行到现有网格中（不替换现有数据）。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>xmlStringOrDoc</td><td>string</td><td>包含行数据的 XML 字符串或文档</td></tr></tbody>
</table>

<h4>.initXMLRows(doc)</h4>
<p>从 XML 文档初始化行。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>doc</td><td>string</td><td>XML 文档字符串</td></tr></tbody>
</table>

<h4>.getXml(useValues, withSubRows)</h4>
<p>获取网格当前数据的 XML 字符串表示。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>useValues</td><td>bool</td><td>是否使用单元格的实际值</td></tr>
<tr><td>withSubRows</td><td>bool</td><td>是否包含子行</td></tr>
</tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong> — 网格数据的 XML 字符串。</p>

<hr />

<!-- ==================== Row Methods ==================== -->
<h3>行操作方法详解</h3>

<h4>.insertRoot(newId, text, cellsValues, collapsedIcon, expandedIcon)</h4>
<p>在根级别插入一个新行。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>newId</td><td>string</td><td>新行的 ID</td></tr>
<tr><td>text</td><td>string</td><td>行显示文本</td></tr>
<tr><td>cellsValues</td><td>string</td><td>单元格值（以分隔符分隔）</td></tr>
<tr><td>collapsedIcon</td><td>string</td><td>折叠状态图标路径</td></tr>
<tr><td>expandedIcon</td><td>string</td><td>展开状态图标路径</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
// 在根级添加一个新节点
treeGridContainer.insertRoot(
    "newRoot001",
    "新产品线",
    "新值1;新值2;新值3",
    "../images/folder.svg",
    "../images/folder-open.svg"
);
```


<h4>.insertNewChild(parentId, newItemId, cellsValues, action, collapsedIcon, expandedIcon)</h4>
<p>为指定父行插入一个新的子行。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>parentId</td><td>string</td><td>父行 ID</td></tr>
<tr><td>newItemId</td><td>string</td><td>新行的 ID</td></tr>
<tr><td>cellsValues</td><td>string</td><td>单元格值（以分隔符分隔）</td></tr>
<tr><td>action</td><td>string</td><td>操作标识</td></tr>
<tr><td>collapsedIcon</td><td>string</td><td>折叠状态图标路径</td></tr>
<tr><td>expandedIcon</td><td>string</td><td>展开状态图标路径</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
// 为选中行添加子节点
var selectedId = treeGridContainer.getSelectedID();
if (selectedId) {
    treeGridContainer.insertNewChild(
        selectedId,
        "child_" + Date.now(),
        "子项A;值1;值2",
        "add",
        "../images/leaf.svg"
    );
    // 确保父节点展开
    treeGridContainer.openItem(selectedId);
}
```


<h4>.deleteRow(rowId)</h4>
<p>删除指定 ID 的行。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>rowId</td><td>Any</td><td>要删除的行 ID</td></tr></tbody>
</table>

<h4>.deleteSelectedItem()</h4>
<p>删除当前选中的行。</p>

<h4>.removeAllRows()</h4>
<p>移除网格中的所有行（清空网格）。</p>

<hr />

<!-- ==================== Row Query Methods ==================== -->
<h3>行查询方法详解</h3>

<h4>.getRowCount()</h4>
<p>获取表格中实际包含的行数。</p>
<h5>返回值</h5>
<p><strong>int</strong> — 行数。</p>

<h4>.getRowsNum()</h4>
<p>返回表格中的总行数。</p>
<h5>返回值</h5>
<p><strong>int</strong> — 总行数。</p>

<h4>.getRowId(rowIndex)</h4>
<p>通过行索引（从零开始，从上到下）获取行 ID。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>rowIndex</td><td>int</td><td>行索引，从 0 开始</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong> — 行 ID。</p>

<h4>.getRowIndex(rowId)</h4>
<p>返回指定行 ID 的顺序索引。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>rowId</td><td>string</td><td>行 ID</td></tr></tbody>
</table>

<h4>.getCurRow()</h4>
<p>获取当前选中行的行号。</p>
<h5>返回值</h5>
<p><strong>int</strong></p>

<h4>.getParentId(rowId)</h4>
<p>获取指定行的父行 ID。如果没有父行则返回 <code>null</code>。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>rowId</td><td>string</td><td>行 ID</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong> — 父行 ID，无父行则为 null。</p>

<h4>.getAllItemIds(separator)</h4>
<p>返回所有行的 ID 列表，以指定分隔符分隔。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>separator</td><td>string</td><td>分隔符</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong></p>

<h4>.getVisibleItemIDs(separator)</h4>
<p>返回所有当前可见行的 ID 列表（折叠的行不会包含在内）。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>separator</td><td>string</td><td>分隔符</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong></p>

<h4>.getOpenedItems(separator)</h4>
<p>返回当前已展开项的 ID 列表。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>separator</td><td>string</td><td>分隔符</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong></p>

<h4>.getChildItemsId(rowId, all, separator)</h4>
<p>获取指定行的子行 ID 列表，以分隔符分隔。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>父行 ID</td></tr>
<tr><td>all</td><td>bool</td><td>是否包含所有层级的子项</td></tr>
<tr><td>separator</td><td>string</td><td>分隔符</td></tr>
</tbody>
</table>

<hr />

<!-- ==================== Selection Methods ==================== -->
<h3>选择与选中方法详解</h3>

<h4>.getSelectedID()</h4>
<p>返回当前选中行的 ID。</p>
<h5>返回值</h5>
<p><strong>string</strong> — 选中行 ID。</p>

<h4>.getSelectedItemIDs(separator)</h4>
<p>返回所有选中行的 ID 列表，以指定分隔符分隔（多选时使用）。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>separator</td><td>string</td><td>分隔符</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong> — 以分隔符连接的 ID 字符串。</p>

<h4>.getSelectedCell()</h4>
<p>返回当前选中的单元格对象。</p>
<h5>返回值</h5>
<p><strong>Aras.Client.Controls.Public.Cell</strong> — 选中的单元格对象。</p>

<h4>.setSelectedRow(rowId, multi, show)</h4>
<p>在运行时设置选中行。如果 <code>multi</code> 为 <code>false</code>，新行将成为唯一选中行；如果 <code>multi</code> 为 <code>true</code>，新行会添加到当前选中集合中。要取消所有选中，可以使用特殊技巧。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>要选中的行 ID</td></tr>
<tr><td>multi</td><td>bool</td><td>是否为多选模式</td></tr>
<tr><td>show</td><td>bool</td><td>是否滚动到该行使其可见</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
// 单选模式选中一行
treeGridContainer.setSelectedRow("item_001", false, true);

// 多选模式下追加选中
treeGridContainer.setSelectedRow("item_002", true, false);

// 取消所有选中（使用不存在的 rowId）
treeGridContainer.setSelectedRow("", false, false);
```


<h4>.selectAll()</h4>
<p>全选网格中的所有行。</p>

<h4>.deselect()</h4>
<p>取消所有已选中行。</p>

<h4>.setMultiselect(value)</h4>
<p>运行时启用或禁用多选功能。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>value</td><td>string</td><td>设为 <code>"true"</code> 启用多选，<code>"false"</code> 禁用</td></tr></tbody>
</table>

<h4>.isMultiselect()</h4>
<p>判断多选是否已启用。</p>
<h5>返回值</h5>
<p><strong>bool</strong> — 多选启用返回 true。</p>

<hr />

<!-- ==================== Tree Methods ==================== -->
<h3>树操作方法详解</h3>

<h4>.openItem(rowId)</h4>
<p>以编程方式展开指定项的子节点（效果等同于用户双击该项）。如果该项已经展开，则不做任何操作。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>rowId</td><td>string</td><td>要展开的行 ID</td></tr></tbody>
</table>
<h5>示例</h5>

```javascript
// 展开指定节点
treeGridContainer.openItem("root_001");

// 追加子行后自动展开
function addChildAndExpand(parentId, childId, cellsValues) {
    treeGridContainer.insertNewChild(parentId, childId, cellsValues, "add");
    treeGridContainer.openItem(parentId);
}
```


<h4>.expandAll()</h4>
<p>展开所有树节点。</p>

<h4>.collapseAll()</h4>
<p>折叠所有树节点。</p>

<h4>.closeItem()</h4>
<p>关闭（折叠）指定项。</p>

<hr />

<!-- ==================== Cell Methods ==================== -->
<h3>单元格操作方法详解</h3>

<h4>.getCellValue(rowId, columnIndex)</h4>
<p>获取指定单元格的值。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
// 读取单元格值
var value = treeGridContainer.getCellValue("item_001", 2);
```


<h4>.setCellValue(rowId, columnIndex, value)</h4>
<p>设置指定单元格的值。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
<tr><td>value</td><td>string</td><td>要设置的值</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
// 批量更新选中行的单元格
var selectedIds = treeGridContainer.getSelectedItemIDs(",");
var ids = selectedIds.split(",");
for (var i = 0; i < ids.length; i++) {
    treeGridContainer.setCellValue(ids[i], 3, "已更新");
}
```


<h4>.cells2(rowIdInt, columnIndex)</h4>
<p>获取单元格对象，以便直接操作其属性。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowIdInt</td><td>int</td><td>行 ID（整数形式）</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h5>返回值</h5>
<p><strong>Aras.Client.Controls.Public.Cell</strong> — 单元格对象。</p>

<h4>.editCell(rowId, columnIndex)</h4>
<p>将焦点移到指定单元格并切换到可编辑模式。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
</tbody>
</table>

<h4>.cellIsCheckbox(rowId, columnIndex)</h4>
<p>判断指定单元格是否包含复选框。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h5>返回值</h5>
<p><strong>bool</strong></p>

<h4>.cellWasChanged(rowId, columnIndex)</h4>
<p>判断指定单元格的值是否在最近一次编辑中被用户修改过。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h5>返回值</h5>
<p><strong>bool</strong></p>

<h4>.turnEditOff()</h4>
<p>使当前编辑单元格失去焦点，退出编辑模式。用于提交单元格编辑内容。</p>

<hr />

<!-- ==================== Column Methods ==================== -->
<h3>列操作方法详解</h3>

<h4>.getColumnCount()</h4>
<p>获取列数。</p>
<h5>返回值</h5>
<p><strong>int</strong> — 列数量。</p>

<h4>.getColumnIndex(columnName)</h4>
<p>通过列名获取列索引。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>columnName</td><td>string</td><td>列名</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>int</strong> — 列在网格中的位置，未找到则返回 -1。</p>

<h4>.getColumnName(columnIndex)</h4>
<p>通过列索引获取列名。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>columnIndex</td><td>int</td><td>列索引</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong> — 列名。</p>

<h4>.getColumnOrder(columnIndex)</h4>
<p>获取指定列的顺序位置。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>columnIndex</td><td>int</td><td>列索引</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>int</strong></p>

<h4>.getLogicalColumnOrder()</h4>
<p>获取所有列名，以 <code>;</code> 分号分隔，按在网格中显示的顺序排列。</p>
<h5>返回值</h5>
<p><strong>string</strong> — 分号分隔的列名列表。</p>

<h4>.setColumnProperties(s, columnIndex)</h4>
<p>以逗号分隔的键值对配置列的类型和其他属性。这是配置列行为最重要的方法。</p>
<p>支持的属性：<br/>
<code>type={FIELD|COMBO|NOEDIT}</code> — 单元格编辑类型<br/>
<code>list={integer}</code> — COMBO 类型的下拉列表编号<br/>
<code>sortable={yes|no}</code> — 是否可排序<br/>
<code>sorttype={string|numeric|date}</code> — 排序类型<br/>
<code>inputformat={format_string}</code> — 日期输入格式<br/>
<code>locale={locale_string}</code> — 区域设置</p>
<p>属性名区分大小写。<br/>
NOEDIT 表示该列单元格不可编辑。<br/>
FIELD 表示使用输入框作为编辑控件。<br/>
COMBO 表示使用下拉框作为编辑控件（需同时指定 LISTn 属性）。<br/>
也可在 ONEDITCELL 事件处理中运行时初始化下拉框。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>s</td><td>string</td><td>属性设置字符串</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
// 设置列为不可编辑
treeGridContainer.setColumnProperties("type=NOEDIT", 0);

// 设置列为下拉框类型，使用 list1
treeGridContainer.setColumnProperties("type=COMBO,list=1,sortable=no", 2);

// 设置日期列
treeGridContainer.setColumnProperties(
    "sorttype=date,inputformat={dd/MM/yy, hh:mm:ss},locale=enUS",
    3
);
```


<h4>.setColumnVisible(columnIndex, visible, columnWidth)</h4>
<p>设置列的可见性。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
<tr><td>visible</td><td>bool</td><td>是否可见</td></tr>
<tr><td>columnWidth</td><td>int</td><td>列宽度</td></tr>
</tbody>
</table>

<h4>.isColumnVisible(columnIndex)</h4>
<p>获取指示列是否可见的值。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>columnIndex</td><td>int</td><td>列索引</td></tr></tbody>
</table>

<h4>.getHeaderCol(i)</h4>
<p>返回列标题文本。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>i</td><td>int</td><td>列索引</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong></p>

<h4>.getHeaderIndex(label)</h4>
<p>获取标题索引。用于自动化场景。如果找不到对应标题则返回 -1。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>label</td><td>string</td><td>列标题文本</td></tr></tbody>
</table>
<h5>返回值</h5>
<p><strong>int</strong></p>

<h4>.getColWidths()</h4>
<p>获取所有列的宽度，以 <code>;</code> 分号分隔。</p>
<h5>返回值</h5>
<p><strong>string</strong></p>

<hr />

<!-- ==================== Menu Methods ==================== -->
<h3>菜单方法详解</h3>

<h4>.menuAdd(text, image)</h4>
<p>向菜单集合中添加一个显示指定图像和文本的 ToolStripItem。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>text</td><td>string</td><td>菜单项文本</td></tr>
<tr><td>image</td><td>string</td><td>图标路径</td></tr>
</tbody>
</table>
<h5>示例</h5>

```javascript
function gridMenuInit(rowId, columnIndex) {
    treeGridContainer.menuRemoveAll();
    treeGridContainer.menuAdd("查看", "../images/view.svg");
    treeGridContainer.menuAdd("编辑", "../images/edit.svg");
    treeGridContainer.menuAddSeparator();
    treeGridContainer.menuAdd("删除", "../images/delete.svg");

    // 根据行状态设置菜单项启用/禁用
    var isLocked = treeGridContainer.getUserData(rowId, "locked");
    if (isLocked === "true") {
        treeGridContainer.menuSetEnabled("删除", false);
    }
}
```


<h4>.menuAddSeparator()</h4>
<p>添加菜单分隔符。插入一个 <code>"-"</code> 作为分隔项。</p>

<h4>.menuRemoveAll()</h4>
<p>从菜单项集合中移除所有 MenuItem 对象。</p>

<h4>.menuSetEnabled(text, flag)</h4>
<p>设置指定菜单项的启用或禁用状态。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>text</td><td>string</td><td>菜单项文本</td></tr>
<tr><td>flag</td><td>bool</td><td>是否启用</td></tr>
</tbody>
</table>

<hr />

<!-- ==================== Miscellaneous Methods ==================== -->
<h3>其他重要方法详解</h3>

<h4>.enable() / .disable()</h4>
<p>启用 / 禁用整个网格控件。</p>

<h4>.setEditable(bool)</h4>
<p>运行时启用或禁用单元格编辑功能。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>bool</td><td>bool</td><td>是否启用编辑</td></tr></tbody>
</table>

<h4>.isEditable()</h4>
<p>判断单元格编辑是否已启用。</p>
<h5>返回值</h5>
<p><strong>bool</strong></p>

<h4>.sort(columnIndex, asc)</h4>
<p>按指定列升序或降序排序表格。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>columnIndex</td><td>int</td><td>排序列索引</td></tr>
<tr><td>asc</td><td>bool</td><td>true 为升序，false 为降序</td></tr>
</tbody>
</table>

<h4>.setUserData(rowId, keyOrValue, value)</h4>
<p>设置行级别的自定义数据。可用于存储额外的数据或标记。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>keyOrValue</td><td>string</td><td>键名或值</td></tr>
<tr><td>value</td><td>string</td><td>要存储的值</td></tr>
</tbody>
</table>

<h4>.getUserData(rowId, keyOptional)</h4>
<p>获取通过 USERDATAn 参数或 SetUserData 方法存储的额外行数据。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>keyOptional</td><td>object</td><td>可选键名</td></tr>
</tbody>
</table>
<h5>返回值</h5>
<p><strong>string</strong></p>
<h5>示例</h5>

```javascript
// 存储行级自定义数据
treeGridContainer.setUserData("item_001", "itemTypeName", "Part");

// 读取行级自定义数据
var itemType = treeGridContainer.getUserData("item_001", "itemTypeName");
```


<h4>.setPaintEnabled(b)</h4>
<p>运行时启用或禁用网格重绘。在批量操作前禁用重绘可以提升性能，操作完成后再启用。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>b</td><td>bool</td><td>是否启用重绘</td></tr></tbody>
</table>
<h5>示例</h5>

```javascript
// 批量操作时禁用重绘以提升性能
treeGridContainer.setPaintEnabled(false);

// 执行大量行操作
for (var i = 0; i < 100; i++) {
    treeGridContainer.insertRoot("id_" + i, "Row " + i, "val;val;val");
}

// 恢复重绘
treeGridContainer.setPaintEnabled(true);
```


<h4>.showInputRow(bool)</h4>
<p>控制输入行的显示。设为 <code>true</code> 显示输入行，<code>false</code> 隐藏。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>bool</td><td>bool</td><td>是否显示输入行</td></tr></tbody>
</table>

<h4>.isInputRowVisible()</h4>
<p>判断输入行是否可见。</p>
<h5>返回值</h5>
<p><strong>bool</strong> — 可见返回 true。</p>

<h4>.requestFocus()</h4>
<p>将输入焦点设置到该控件上。</p>

<h4>.setCellCombo(rowId, columnIndex, labels, values)</h4>
<p>为指定单元格设置下拉框选项。</p>
<h5>参数</h5>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
<tr><td>columnIndex</td><td>int</td><td>列索引</td></tr>
<tr><td>labels</td><td>Any</td><td>下拉框显示文本</td></tr>
<tr><td>values</td><td>Any</td><td>下拉框实际值</td></tr>
</tbody>
</table>

<h4>.setCellFont(rowId, columnIndex, value)</h4>
<p>设置指定单元格的字体。格式为：<code>名称-样式-大小</code>。样式可选：<code>bold</code>、<code>italic</code>、<code>bolditalic</code>。</p>
<h5>示例</h5>

```javascript
treeGridContainer.setCellFont("item_001", 0, "Courier-bold-12");
```


    <h4>.setCellLink(rowId, columnIndex, value)</h4>
    <p>为指定单元格设置超链接。点击链接时会触发 <code>gridLinkClick</code> 事件。</p>

    <h4>.setCellTextColor(rowId, columnIndex, value)</h4>
    <p>设置指定单元格的文字颜色。</p>

    <h4>.setRowBgColor(rowId, bgColors)</h4>
    <p>设置行背景颜色。</p>

    <h4>.setRowIcons(rowId, collapsedIcon, expandedIcon)</h4>
    <p>为指定行设置折叠和展开状态的图标。如果未指定 expandedIcon，将使用 collapsedIcon 作为展开图标。</p>
    <h5>参数</h5>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>rowId</td><td>string</td><td>行 ID</td></tr>
        <tr><td>collapsedIcon</td><td>string</td><td>折叠状态图标路径</td></tr>
        <tr><td>expandedIcon</td><td>string</td><td>展开状态图标路径</td></tr>
      </tbody>
    </table>
    <h5>示例</h5>
    
```javascript
// 为节点设置自定义图标
treeGridContainer.setRowIcons(
    "folder_001",
    "../images/folder-closed.svg",
    "../images/folder-open.svg"
);
```


<hr />

<!-- ==================== 完整使用示例 ==================== -->
<h3>完整使用示例</h3>
<p>以下示例展示了在实际 Aras 客户端表单/方法中 TreeGridContainer 的典型用法：</p>

```javascript
// 1. 通过工厂方法创建控件（在表单 HTML 内嵌时）
var treeGrid = clientControlsFactory.createControl("TreeGridContainer");

// 2. 配置基本属性
treeGrid.bgColor = "#ffffff";
treeGrid.rowHeight = "28";
treeGrid.delimeter = ";";

// 3. 初始化网格列
treeGridContainer.setColumnCount(3);
treeGridContainer.setHeaderCol(0, "名称");
treeGridContainer.setHeaderCol(1, "状态");
treeGridContainer.setHeaderCol(2, "类型");

// 4. 设置列属性
treeGridContainer.setColumnProperties("type=NOEDIT", 0); // 名称列不可编辑
treeGridContainer.setColumnProperties("type=COMBO,list=1", 1); // 状态列下拉
treeGridContainer.setColumnProperties("type=FIELD", 2); // 类型列可编辑

// 5. 加载 XML 数据
var gridXml = '<xml>' +
    '<row id="root1"><cell>Root</cell><cell>Active</cell><cell>Folder</cell></row>' +
    '<row id="child1" parentId="root1"><cell>Child</cell><cell>Draft</cell><cell>Item</cell></row>' +
    '</xml>';
treeGridContainer.initXML(gridXml);

// 6. 绑定事件
clientControlsFactory.on(treeGrid, "gridDoubleClick", function(rowId, colIndex) {
    var itemType = treeGridContainer.getUserData(rowId, "itemTypeName");
    if (itemType) {
        top.aras.uiShowItem(itemType, rowId);
    }
});

clientControlsFactory.on(treeGrid, "gridMenuInit", function(rowId) {
    treeGridContainer.menuRemoveAll();
    treeGridContainer.menuAdd("查看详情", "../images/details.svg");
    treeGridContainer.menuAdd("删除", "../images/delete.svg");
});

clientControlsFactory.on(treeGrid, "gridMenuClick", function(menuItem, rowId) {
    if (menuItem === "删除") {
        treeGridContainer.deleteRow(rowId);
    }
});

// 7. 展开所有节点
treeGridContainer.expandAll();

// 8. 设置默认选中第一行
var firstRowId = treeGridContainer.getRowId(0);
if (firstRowId) {
    treeGridContainer.setSelectedRow(firstRowId, false, true);
}
```


<hr />
<p><em>已弃用。适用版本：Aras Innovator 11.0-14.x。此控件已被新的 CUI Grid 组件替代，建议新项目使用 CUI Grid 和 TOC 组件实现树形网格功能。</em></p>
