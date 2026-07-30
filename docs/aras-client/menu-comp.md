---
title: Menu 组件
---

<h1>Menu 菜单组件</h1>
<blockquote>
<p><strong>aras-menu</strong> 是一个通用的菜单 Web Component，用于渲染菜单并作为其他组件（右键菜单、下拉菜单）的基础。</p>
</blockquote>

<h2>一、位置</h2>
<p><code>Innovator/Client/Modules/components/menu.js</code></p>

<h2>二、使用场景</h2>
<ul>
<li><strong>用户菜单</strong>（User Menu）</li>
<li><strong>Grid 右键菜单</strong>（Context Menu）</li>
<li><strong>Command Bar 下拉菜单</strong>（Dropdown Menu）</li>
<li><strong>面包屑菜单</strong></li>
</ul>

<h2>三、公共 API</h2>

<h3>3.1 创建菜单</h3>

```javascript
// 创建菜单
const menu = document.createElement('aras-menu');
document.body.appendChild(menu);
```


<h3>3.2 状态（state）</h3>

```javascript
// state — 描述菜单当前状态的对象，不要直接操作，使用 setState 或 applyData
menu.state = {
  data: Map,             // 菜单数据
  roots: string[],       // 第一层菜单项的 key 列表
  expandedItems: string[], // 当前展开的父级菜单项
  focusedItems: string[]   // 当前获得焦点的菜单项
};
```


<h3>3.3 setState(nextState)</h3>

```javascript
// 更新状态并触发重新渲染
menu.setState({
  expandedItems: ['file_menu'],
  focusedItems: ['edit_entry']
});
```


<h3>3.4 applyData(data, roots)</h3>

```javascript
// 设置菜单数据并自动渲染
menu.applyData(menuData, ['new', 'open', 'save', 'sep_1', 'settings']);
```


<h3>3.5 resetList()</h3>

```javascript
// 清除展开和焦点状态
menu.resetList();
```


<h3>3.6 calcSubmenuPosition(parentMenuItem, options)</h3>

```javascript
// 计算子菜单的显示位置（避免溢出屏幕）
menu.calcSubmenuPosition(parentElement, {
  // 自动计算和调整位置
});
```


<h2>四、菜单项数据结构</h2>

```javascript
const menuData = new Map([
  ['new', {
    label: '新建',
    icon: '../images/new.svg',
    shortcut: 'Ctrl+N',
    type: 'menu',              // 'menu' = 父菜单（有子菜单）
    children: ['new_part', 'new_doc', 'new_bom']
  }],
  ['new_part', {
    label: '新建零件',
    icon: '../images/part.svg'
  }],
  ['new_doc', {
    label: '新建文档',
    icon: '../images/doc.svg'
  }],
  ['sep_1', {
    type: 'separator'           // 分隔线
  }],
  ['toggle_grid', {
    label: '显示网格线',
    type: 'checkbox',           // 复选框
    checked: true,
    group_id: 'view_options'    // 同组互斥
  }],
  ['toggle_list', {
    label: '列表视图',
    type: 'checkbox',
    checked: false,
    group_id: 'view_options'
  }],
  ['delete_item', {
    label: '删除',
    disabled: true,             // 禁用
    icon: '../images/delete.svg',
    shortcut: 'Delete'
  }]
]);

// 第一级菜单项
const roots = ['new', 'sep_1', 'toggle_grid', 'toggle_list', 'sep_2', 'delete_item'];

menu.applyData(menuData, roots);
```


<h3>菜单项属性完整列表</h3>
<table>
<thead><tr><th>属性</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>label</code></td><td>string</td><td>显示文本</td></tr>
<tr><td><code>disabled</code></td><td>boolean</td><td>显示但不可操作</td></tr>
<tr><td><code>hidden</code></td><td>boolean</td><td>不显示</td></tr>
<tr><td><code>icon</code> / <code>image</code></td><td>string</td><td>图标路径或 Vault ID（<code>vault:///?fileId=...</code>）</td></tr>
<tr><td><code>cssStyle</code></td><td>string</td><td>内联 CSS 样式</td></tr>
<tr><td><code>shortcut</code></td><td>string</td><td>快捷键提示（仅显示，功能需单独实现）</td></tr>
<tr><td><code>type</code></td><td>string</td><td><code>'menu'</code> | <code>'separator'</code> | <code>'checkbox'</code></td></tr>
<tr><td><code>checked</code></td><td>boolean</td><td>checkbox 选中状态</td></tr>
<tr><td><code>group_id</code></td><td>string</td><td>checkbox 互斥组名</td></tr>
<tr><td><code>children</code></td><td>string[]</td><td>子菜单项的 key 列表</td></tr>
</tbody>
</table>

<h2>五、Dropdown 菜单完整示例</h2>

```javascript
// Dropdown 按钮 + 菜单实现
class DropdownMenu {
  constructor(triggerButton, menuData, roots) {
    this.trigger = triggerButton;
    this.menu = document.createElement('aras-menu');
    document.body.appendChild(this.menu);

    this.menu.applyData(menuData, roots);

    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // 点击外部关闭
    document.addEventListener('click', () => {
      if (this.isOpen) this.close();
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const rect = this.trigger.getBoundingClientRect();
    this.menu.style.position = 'fixed';
    this.menu.style.left = rect.left + 'px';
    this.menu.style.top = (rect.bottom + 4) + 'px';
    this.menu.style.display = 'block';
    this.isOpen = true;

    // 计算子菜单位置
    this.menu.calcSubmenuPosition(this.menu);
  }

  close() {
    this.menu.style.display = 'none';
    this.menu.resetList();
    this.isOpen = false;
  }

  destroy() {
    this.menu.remove();
    // 清理事件监听
  }
}

// 使用
const dropdown = new DropdownMenu(
  document.getElementById('exportBtn'),
  new Map([
    ['exp_csv', { label: '导出 CSV', icon: '../images/csv.svg' }],
    ['exp_xlsx', { label: '导出 Excel', icon: '../images/xlsx.svg' }],
    ['sep', { type: 'separator' }],
    ['exp_pdf', { label: '导出 PDF', icon: '../images/pdf.svg' }]
  ]),
  ['exp_csv', 'exp_xlsx', 'sep', 'exp_pdf']
);
```


<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。Menu 组件是 HyperHTMLElement 的实现。</em></p>
