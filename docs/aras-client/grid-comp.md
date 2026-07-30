---
title: Grid 组件
---

# Grid 表格组件
<blockquote>
<p><strong>aras-grid</strong> 是 Aras 客户端最核心的 Web Component，用于动态数据的展示和编辑。支持虚拟滚动、批量更新、冻结列、自定义格式化器和编辑器等高级特性。</p>
</blockquote>

## 一、文件结构
<p>源码位于 <code>Innovator/Client/Modules/components/grid/</code>：</p>
<table>
<thead><tr><th>文件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>grid.js</code></td><td>主文件，公共 API 定义</td></tr>
<tr><td><code>actions.js</code></td><td>默认 Grid 行为（监听的自定义事件）和事件订阅</td></tr>
<tr><td><code>view.js</code></td><td>渲染层：操作模板/格式化器/编辑器生成真实 DOM</td></tr>
<tr><td><code>templates.js</code></td><td>行/列头/视口/列组等结构的渲染函数</td></tr>
<tr><td><code>formatters.js</code></td><td>默认格式化器：接受单元格、数据和元数据，生成 VDOM</td></tr>
<tr><td><code>editors.js</code></td><td>可编辑格式化器：生成交互式输入控件</td></tr>
<tr><td><code>sorters.js</code></td><td>不同类型列的排序机制</td></tr>
<tr><td><code>keyboard.js</code></td><td>键盘导航支持</td></tr>
<tr><td><code>search.js</code></td><td>搜索行格式化器</td></tr>
</tbody>
</table>

## 二、支持的特性
<ul>
<li>✅ <strong>虚拟滚动</strong>（Virtual Scrolling）</li>
<li>✅ <strong>批量更新</strong>（Batch Updates）</li>
<li>✅ <strong>冻结列</strong>（Freezable Columns）</li>
<li>✅ <strong>自定义格式化器/编辑器/排序器</strong></li>
<li>✅ <strong>列宽可调整</strong>（Resizable Columns）</li>
<li>✅ <strong>搜索行</strong>（Search Row）</li>
</ul>

## 三、公共 API

### 3.1 构造与渲染

```javascript
const grid = new Grid(domElement, {
  multiSelect: true,        // 多选（默认 true）
  resizable: true,          // 列宽可调（默认 true）
  search: false,            // 搜索行（默认 false）
  editable: false,          // 单元格编辑（默认 false）
  sortable: true,           // 列排序（默认 true）
  freezableColumns: false,  // 冻结列（默认 false）
  selectable: true          // 行选择（默认 true）
});

// 启动渲染
await grid.render();
```


### 3.2 列数据管理（head）

```javascript
// head — HeadWrap 对象
grid.head = new Map([
  ['col_id', { label: 'ID', width: 80, dataType: 'string', hidden: true }],
  ['col_name', { label: '名称', width: 200, dataType: 'string', sortable: true }],
  ['col_state', { label: '状态', width: 120, dataType: 'string' }],
  ['col_date', { label: '创建日期', width: 150, dataType: 'date' }]
]);

// 读取列
const col = grid.head.get('col_name');
console.log(col.label, col.width);   // "名称", 200

// 修改列属性（触发重新渲染）
grid.head.set('col_name', 'width', 250);

// 检查列是否存在
if (grid.head.has('col_price')) { /* ... */ }

// 删除列
grid.head.delete('col_id');
```


### 3.3 行数据管理（rows）

```javascript
// rows — RowsWrap 对象
grid.rows = new Map([
  ['row_1', {
    col_name: '螺栓 M8x30',
    col_state: 'Released',
    col_date: '2025-01-15',
    __status: 'normal'
  }],
  ['row_2', {
    col_name: '螺母 M8',
    col_state: 'Preliminary',
    col_date: '2025-03-20',
    __status: 'modified'
  }]
]);

// 读取行
const row = grid.rows.get('row_1');
console.log(row.col_name);  // "螺栓 M8x30"

// 修改行数据
grid.rows.set('row_1', 'col_state', 'Obsolete');

// 批量更新（性能更好）
grid.rows.batchSet([
  { rowId: 'row_1', colId: 'col_state', value: 'Obsolete' },
  { rowId: 'row_2', colId: 'col_state', value: 'Released' }
]);

// 删除行
grid.rows.delete('row_1');
```


### 3.4 设置管理（settings）

```javascript
// 冻结前两列
grid.settings.frozenColumns = 2;

// 列显示顺序
grid.settings.indexHead = ['col_name', 'col_state', 'col_date', 'col_id'];

// 行显示顺序
grid.settings.indexRows = ['row_2', 'row_1'];  // 反转

// 选中行
grid.settings.selectedRows = ['row_1'];
// 多选
grid.settings.selectedRows = ['row_1', 'row_2'];

// 当前焦点单元格
grid.settings.focusedCell = {
  headId: 'col_name',
  rowId: 'row_1',
  editing: false
};
```


### 3.5 退出编辑模式

```javascript
// 强制退出编辑模式
grid.cancelEdit();
```


## 四、完整应用示例

```javascript
// BOM 表格完整示例
const bomContainer = document.getElementById('bom-grid-container');
const bomGrid = new Grid(bomContainer, {
  multiSelect: true,
  editable: true,
  sortable: true,
  resizable: true,
  search: true,
  freezableColumns: true
});

// 加载 BOM 数据
async function loadBOMGrid(partId) {
  const inn = top.aras.IomInnovator;
  const item = inn.newItem('Part BOM', 'get');
  item.setAttribute('select',
    'id,related_id(name,item_number),quantity,unit,remarks');
  item.setProperty('source_id', partId);
  const result = item.apply();

  const rows = new Map();
  for (let i = 0; i < result.getItemCount(); i++) {
    const bom = result.getItemByIndex(i);
    const relatedPart = bom.getRelatedItem();
    const rowId = `bom_${i}`;
    rows.set(rowId, {
      col_seq: i + 1,
      col_item_number: relatedPart.getProperty('item_number', ''),
      col_name: relatedPart.getProperty('name', ''),
      col_quantity: bom.getProperty('quantity', '1'),
      col_unit: bom.getProperty('unit', 'pcs'),
      col_remarks: bom.getProperty('remarks', ''),
      __status: 'normal'
    });
  }

  bomGrid.rows = rows;
  await bomGrid.render();
}

// 监听选择变化
bomGrid.addEventListener('selectionchanged', (event) => {
  const selectedRows = bomGrid.settings.selectedRows;
  console.log('选中行:', selectedRows);
  updateToolbarState(selectedRows.length);
});

// 监听单元格编辑
bomGrid.addEventListener('cellchanged', (event) => {
  const { rowId, headId, oldValue, newValue } = event.detail;
  console.log(`变更: ${headId} in ${rowId}: ${oldValue} -> ${newValue}`);
  // 标记行状态
  bomGrid.rows.set(rowId, '__status', 'modified');
});
```


<hr />
<p><em>适用版本：Aras Innovator 14.x / 2025R。Grid 组件作为 Web Component 支持所有标准 DOM API。</em></p>
