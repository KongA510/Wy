---
title: ToolbarItem（工具栏项）
---

# ToolbarItem（已弃用）
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
<p>ToolbarItem 表示工具栏中的一个项目（按钮、文本框、下拉框等），通常由 <code>Toolbar.getItem(id)</code> 方法返回。该类提供了操作工具栏项目状态、文本、可见性以及管理 ComboBox/DropDownButton 子项集合的 API。</p>
</blockquote>

## API 成员概览
<table>
<thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>constructor()</code></td><td>public constructor</td><td>构造 ToolbarItem 实例</td></tr>
<tr><td><code>getId()</code></td><td>public method</td><td>获取工具栏对象的唯一标识符</td></tr>
<tr><td><code>getState()</code></td><td>public method</td><td>获取按钮的按下状态</td></tr>
<tr><td><code>setState(isPushed)</code></td><td>public method</td><td>设置按钮的按下状态</td></tr>
<tr><td><code>getEnabled()</code></td><td>public method</td><td>获取组件的启用状态</td></tr>
<tr><td><code>setEnabled(bool)</code></td><td>public method</td><td>启用或禁用组件（适用于按钮）</td></tr>
<tr><td><code>enable()</code></td><td>public method</td><td>启用组件</td></tr>
<tr><td><code>disable()</code></td><td>public method</td><td>禁用组件</td></tr>
<tr><td><code>getText()</code></td><td>public method</td><td>获取文本框中显示的文本</td></tr>
<tr><td><code>setText(value)</code></td><td>public method</td><td>设置文本框中的文本</td></tr>
<tr><td><code>setLabel(value)</code></td><td>public method</td><td>设置元素前后的标签文本</td></tr>
<tr><td><code>getBounds()</code></td><td>public method</td><td>获取项目的位置和大小</td></tr>
<tr><td><code>setItemVisible()</code></td><td>public method</td><td>设置项目可见性（无详细文档）</td></tr>
<tr><td><code>add(id, label)</code></td><td>public method</td><td>向 ComboBox/DropDownButton 中添加子项</td></tr>
<tr><td><code>addSeparator()</code></td><td>public method</td><td>向 ComboBox 中插入分隔符</td></tr>
<tr><td><code>remove(name)</code></td><td>public method</td><td>从 ComboBox 中移除指定子项</td></tr>
<tr><td><code>removeAll()</code></td><td>public method</td><td>移除 ComboBox/DropDownButton 中的所有子项</td></tr>
<tr><td><code>getItem(id)</code></td><td>public method</td><td>按索引获取 ComboBox 中的子项字符串</td></tr>
<tr><td><code>getItemCount()</code></td><td>public method</td><td>获取 ComboBox/DropDownButton 中子项数量</td></tr>
<tr><td><code>getSelectedIndex()</code></td><td>public method</td><td>获取 ComboBox 当前选中项的索引</td></tr>
<tr><td><code>getSelectedItem()</code></td><td>public method</td><td>获取 ComboBox 当前选中项</td></tr>
<tr><td><code>setSelected(id)</code></td><td>public method</td><td>设置 ComboBox 当前选中项</td></tr>
</tbody>
</table>

## API 详情

<!-- ==================== 构造与标识 ==================== -->
### 基础方法

#### constructor()
<p>构造 ToolbarItem 实例。一般不直接调用此构造函数，而是通过 <code>Toolbar.getItem()</code> 获取已有实例。</p>
#### 返回值
<p>无返回值信息。</p>
#### 示例

```javascript
// 一般不直接构造，而是通过 Toolbar 获取
const toolbar = top.aras.getMainWindow().document.getElementById('toolbar');
const toolbarItem = toolbar.getItem('myButton');
```


#### getId()
<p>获取工具栏对象的唯一标识符。</p>
#### 返回值
<p><strong>string</strong> — 返回组件的唯一标识符。</p>
#### 示例

```javascript
const toolbar = top.aras.getMainWindow().document.getElementById('toolbar');
const item = toolbar.getItem('saveButton');
const id = item.getId();  // 返回 'saveButton'
```


<!-- ==================== 按钮状态 ==================== -->
### 按钮状态管理

#### getState()
<p>获取按钮的按下状态。</p>
#### 返回值
<p><strong>boolean</strong> — 按钮被按下时返回 <code>true</code>，否则返回 <code>false</code>。</p>
#### 示例

```javascript
const item = toolbar.getItem('toggleButton');
if (item.getState()) {
  console.log('按钮处于按下状态');
}
```


#### setState(isPushed)
<p>设置按钮的按下状态。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>isPushed</td><td>boolean</td><td>是否按下</td></tr></tbody>
</table>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
// 将按钮设为按下状态
item.setState(true);

// 取消按钮的按下状态
item.setState(false);
```


<!-- ==================== 启用/禁用 ==================== -->
### 启用与禁用

#### getEnabled()
<p>获取组件的启用状态。</p>
#### 返回值
<p><strong>boolean</strong> — 组件启用时返回 <code>true</code>，禁用时返回 <code>false</code>。</p>
#### 示例

```javascript
const item = toolbar.getItem('saveButton');
if (item.getEnabled()) {
  console.log('按钮已启用');
}
```


#### setEnabled(enabled)
<p>启用或禁用该组件。启用后组件可响应用户输入并生成事件。初始默认启用。适用于按钮类组件。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>enabled</td><td>boolean</td><td>是否启用</td></tr></tbody>
</table>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const item = toolbar.getItem('saveButton');

// 禁用保存按钮
item.setEnabled(false);

// 启用保存按钮
item.setEnabled(true);
```


#### enable()
<p>启用组件。等效于 <code>setEnabled(true)</code>。</p>
#### 参数
<p>无参数。</p>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
// 启用按钮
item.enable();
```


#### disable()
<p>禁用组件。等效于 <code>setEnabled(false)</code>。</p>
#### 参数
<p>无参数。</p>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
// 禁用按钮
item.disable();
```


<!-- ==================== 文本框操作 ==================== -->
### 文本框操作

#### getText()
<p>获取文本框中显示的文本内容。</p>
#### 返回值
<p><strong>string</strong> — 文本框中显示的文本。</p>
#### 示例

```javascript
const textItem = toolbar.getItem('searchBox');
const currentText = textItem.getText();  // 获取搜索框中的文本
```


#### setText(value)
<p>设置文本框中显示的文本内容。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>value</td><td>string</td><td>要显示的文本</td></tr></tbody>
</table>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const textItem = toolbar.getItem('searchBox');
textItem.setText('请输入关键词');  // 设置搜索框提示文本
```


#### setLabel(value)
<p>设置元素前后显示的标签文本。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>value</td><td>string</td><td>标签文本</td></tr></tbody>
</table>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const item = toolbar.getItem('numberInput');
item.setLabel('数量：');  // 在输入框前显示"数量："标签
```


#### getBounds()
<p>获取工具栏项目的位置和尺寸信息。</p>
#### 返回值
<p><strong>object</strong> — 包含项目位置和尺寸的对象。</p>
#### 示例

```javascript
const item = toolbar.getItem('saveButton');
const bounds = item.getBounds();
console.log('位置:', bounds.x, bounds.y);
```


#### setItemVisible()
<p>设置项目的可见性。（原文档未提供详细参数和说明）</p>
#### 参数
<p>无参数信息。</p>
#### 返回值
<p>无返回值信息。</p>

<!-- ==================== ComboBox / DropDownButton 集合操作 ==================== -->
### ComboBox / DropDownButton 子项管理
<p>以下方法适用于 ComboBox 或 DropDownButton 类型的工具栏项目。</p>

#### add(id, label)
<p>向集合中添加一个显示指定文本的选项。适用于 ComboBox 和 DropDownButton。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>id</td><td>string</td><td>选项的唯一标识符</td></tr>
<tr><td>label</td><td>string</td><td>选项显示的标签文本</td></tr>
</tbody>
</table>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
// 清空已有选项
comboBox.removeAll();
// 添加新选项
comboBox.add('type_part', '零件');
comboBox.add('type_doc', '文档');
comboBox.add('type_bom', 'BOM');
```


#### addSeparator()
<p>向 ComboBox 中插入一条分隔符。</p>
#### 参数
<p>无参数。</p>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('menuComboBox');
comboBox.removeAll();
comboBox.add('action_new', '新建');
comboBox.add('action_open', '打开');
comboBox.addSeparator();  // 插入分隔符
comboBox.add('action_exit', '退出');
```


#### remove(name)
<p>从 ComboBox 中移除指定名称的选项。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>name</td><td>string</td><td>要移除的选项名称</td></tr></tbody>
</table>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
comboBox.remove('type_bom');  // 移除 BOM 选项
```


#### removeAll()
<p>移除组件中的所有选项。适用于 ComboBox 和 DropDownButton。</p>
#### 参数
<p>无参数。</p>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
comboBox.removeAll();  // 清空所有选项
```


#### getItemCount()
<p>获取集合中选项的数量。适用于 ComboBox 和 DropDownButton。</p>
#### 返回值
<p><strong>number</strong> — 选项的数量。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
const count = comboBox.getItemCount();
console.log('共有 ' + count + ' 个选项');
```


#### getItem(id)
<p>按标识符获取 ComboBox 集合中指定索引处选项的字符串表示。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>id</td><td>string</td><td>选项的唯一标识符</td></tr></tbody>
</table>
#### 返回值
<p><strong>string</strong> — 指定选项的字符串表示。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
const itemValue = comboBox.getItem('type_part');  // 获取指定选项的值
```


<!-- ==================== ComboBox 选中项操作 ==================== -->
### ComboBox 选中项操作

#### getSelectedIndex()
<p>获取当前选中项的索引。适用于 ComboBox。</p>
#### 返回值
<p><strong>number</strong> — 当前选中项的索引。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
const index = comboBox.getSelectedIndex();
if (index >= 0) {
  console.log('当前选中第 ' + index + ' 项');
}
```


#### getSelectedItem()
<p>获取 ComboBox 中当前选中的选项。</p>
#### 返回值
<p><strong>string</strong> — 当前选中项的值。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
const selected = comboBox.getSelectedItem();
console.log('当前选中: ' + selected);
```


#### setSelected(id)
<p>设置 ComboBox 中当前选中的选项。</p>
#### 参数
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td>id</td><td>string</td><td>要选中的选项标识符</td></tr></tbody>
</table>
#### 返回值
<p>无返回值。</p>
#### 示例

```javascript
const comboBox = toolbar.getItem('typeComboBox');
comboBox.setSelected('type_doc');  // 选中"文档"选项
```


<!-- ==================== 综合示例 ==================== -->
### 综合示例
<p>以下示例演示了操作工具栏中 ComboBox 类型的 ToolbarItem 的典型流程：</p>

```javascript
// 获取 Toolbar 及其中的 ComboBox 项目
const toolbar = top.aras.getMainWindow().document.getElementById('toolbar');
const typeCombo = toolbar.getItem('typeComboBox');

// 检查是否启用
if (!typeCombo.getEnabled()) {
  typeCombo.enable();
}

// 清空并重新填充选项
typeCombo.removeAll();
typeCombo.add('all', '全部');
typeCombo.add('part', '零件');
typeCombo.add('document', '文档');
typeCombo.addSeparator();
typeCombo.add('custom', '自定义');

// 设置默认选中
typeCombo.setSelected('all');

// 读取当前选中
const selectedId = typeCombo.getSelectedItem();
const count = typeCombo.getItemCount();
console.log('当前选中: ' + selectedId + ', 共' + count + '个选项');

// 获取按钮状态
const saveBtn = toolbar.getItem('saveButton');
saveBtn.disable();  // 初始禁用
// 当数据发生变化后...
saveBtn.enable();   // 启用保存
```


## 注意事项
<ul>
<li><strong>适用控件类型：</strong>ToolbarItem 的方法并非对所有控件类型都有效。例如 <code>add()</code> / <code>remove()</code> 仅适用于 ComboBox 和 DropDownButton；<code>getState()</code> / <code>setState()</code> 仅适用于按钮。</li>
<li><strong>获取实例：</strong>不要直接使用 <code>new</code> 构造 ToolbarItem，应通过 <code>Toolbar.getItem(id)</code> 获取已有实例。</li>
<li><strong>弃用说明：</strong>此 API 在 Aras Innovator 12.0+ 中已弃用，建议使用新的 Toolbar Component API 替代。</li>
</ul>

<hr />
<p><em>⚠️ 已弃用。适用版本：Aras Innovator 11.0–12.0。</em></p>
