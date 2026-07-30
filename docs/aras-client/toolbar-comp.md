---
title: Toolbar 组件
---

<h1>Toolbar 工具栏组件</h1>
<blockquote>
<p><strong>aras-toolbar</strong> 是一个通用的 Web Component，用于渲染工具栏和类工具栏组件。如果默认功能不够，可以基于 Toolbar 类创建自定义子类。</p>
</blockquote>

<h2>一、文件结构</h2>
<p>源码位于 <code>Innovator/Client/Modules/components/</code>：</p>
<table>
<thead><tr><th>文件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>toolbar.js</code></td><td>主文件，公共 API 和组件定义</td></tr>
<tr><td><code>toolbarTemplates.js</code></td><td>渲染方法：模板（服务方法）和格式化器（公共方法）</td></tr>
<tr><td><code>trimSeparators.js</code></td><td>分隔符处理：移除首尾和连续的分隔符</td></tr>
</tbody>
</table>

<h2>二、使用场景</h2>
<table>
<thead><tr><th>位置</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>主 Header</strong></td><td>顶部导航栏</td></tr>
<tr><td><strong>Title and Command Bar</strong></td><td>ItemView 的标题栏和命令按钮</td></tr>
<tr><td><strong>Pagination（继承类）</strong></td><td>分页工具栏</td></tr>
<tr><td><strong>搜索栏</strong></td><td>内嵌搜索输入框</td></tr>
</tbody>
</table>

<h2>三、公共 API</h2>

<h3>3.1 构造函数</h3>

```javascript
// 创建 Toolbar
const toolbar = document.createElement('aras-toolbar');
// 或
const toolbar = new Toolbar();

// 添加到 DOM
document.getElementById('toolbar-area').appendChild(toolbar);
```


<h3>3.2 自定义属性</h3>
<table>
<thead><tr><th>属性</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>role</code></td><td>string</td><td>ARIA 角色，默认为 <code>toolbar</code></td></tr>
<tr><td><code>overflow</code></td><td>boolean</td><td>溢出时显示"更多"菜单，值为 <strong>存在即启用</strong></td></tr>
<tr><td><code>expanded</code></td><td>boolean</td><td>是否展开溢出菜单，存在即启用</td></tr>
</tbody>
</table>

<h3>3.3 数据管理</h3>

```javascript
// data — Map 对象，key 为元素标识符，value 为元素描述对象
toolbar.data = new Map([
  ['btn_new', {
    type: 'button',
    label: '新建',
    icon: '../images/new.svg',
    tooltip: '新建零件',
    enabled: true,
    onclick: () => handleNew()
  }],
  ['btn_save', {
    type: 'button',
    label: '保存',
    icon: '../images/save.svg',
    enabled: false,   // 无修改时禁用
    onclick: () => handleSave()
  }],
  ['sep_1', {
    type: 'separator'
  }],
  ['btn_delete', {
    type: 'button',
    label: '删除',
    icon: '../images/delete.svg',
    onclick: () => handleDelete()
  }],
  ['btn_refresh', {
    type: 'button',
    label: '刷新',
    icon: '../images/refresh.svg'
  }]
]);

// 读取数据
const btnSave = toolbar.data.get('btn_save');
console.log(btnSave.enabled);  // false
```


<h3>3.4 容器布局</h3>

```javascript
// container — 左侧容器（左对齐）
toolbar.container = ['btn_new', 'btn_save', 'sep_1', 'btn_delete'];

// rightContainer — 右侧容器（右对齐）
toolbar.rightContainer = ['btn_refresh'];

// 最终效果:
// [新建] [保存] | [删除]  ······空白区域······  [刷新]
```


<h3>3.5 事件订阅</h3>

```javascript
// 订阅工具栏事件
const unsubscribe = toolbar.on('click', (eventDetail) => {
  console.log('点击了:', eventDetail.key);
  console.log('元素:', eventDetail.item);
  // eventDetail.key — 元素的 key（如 'btn_save'）
  // eventDetail.item — 元素的完整描述对象
});

// 取消订阅
unsubscribe();
```


<h2>四、格式化器（Formatters）</h2>
<p>Toolbar 的公共方法，用于渲染不同类型的子元素：</p>
<table>
<thead><tr><th>格式化器</th><th>渲染效果</th><th>示例元素</th></tr></thead>
<tbody>
<tr><td>按钮</td><td><code>&lt;button&gt;</code></td><td>保存、删除、刷新</td></tr>
<tr><td>图片</td><td><code>&lt;img&gt;</code></td><td>Logo、图标</td></tr>
<tr><td>文本</td><td><code>&lt;span&gt;</code></td><td>标题、统计信息</td></tr>
<tr><td>分隔符</td><td>竖直分隔线</td><td>按钮组之间</td></tr>
</tbody>
</table>

<h3>自定义格式化器</h3>

```javascript
// 注册自定义格式化器 — 搜索输入框
toolbar.registerFormatter('search-input', (elementData, elementKey) => {
  const container = document.createElement('div');
  container.className = 'toolbar-search-box';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = elementData.placeholder || '搜索...';
  input.value = elementData.value || '';

  input.addEventListener('input', (e) => {
    if (elementData.onchange) {
      elementData.onchange(e.target.value);
    }
  });

  container.appendChild(input);
  return container;
});

// 使用自定义格式化器
toolbar.data = new Map([
  ['search_box', {
    type: 'search-input',
    placeholder: '输入零件号...',
    value: '',
    onchange: (val) => console.log('搜索:', val)
  }]
]);
```


<h2>五、实际应用示例</h2>

```javascript
// 完整的 ItemView 工具栏
class ItemViewToolbar {
  constructor(container, context) {
    this.toolbar = document.createElement('aras-toolbar');
    this.toolbar.setAttribute('overflow', 'true');
    container.appendChild(this.toolbar);

    this.context = context;
    this.buildToolbar();
    this.subscribeToEvents();
  }

  buildToolbar() {
    this.toolbar.data = new Map([
      ['btn_edit', {
        type: 'button', label: '编辑',
        icon: 'vault:///?fileId=EDIT_ICON_ID',
        enabled: this.context.canEdit,
        onclick: () => this.context.editItem()
      }],
      ['btn_save', {
        type: 'button', label: '保存',
        icon: 'vault:///?fileId=SAVE_ICON_ID',
        enabled: this.context.isDirty,
        onclick: () => this.context.saveItem()
      }],
      ['btn_refresh', {
        type: 'button', label: '刷新',
        icon: 'vault:///?fileId=REFRESH_ICON_ID',
        onclick: () => this.context.refreshItem()
      }],
      ['txt_info', {
        type: 'text',
        text: `${this.context.itemType} - ${this.context.itemName}`
      }]
    ]);

    this.toolbar.container = ['btn_edit', 'btn_save'];
    this.toolbar.rightContainer = ['txt_info', 'btn_refresh'];
  }

  subscribeToEvents() {
    // 监听上下文变化，动态更新按钮状态
    this.context.on('dirtyChanged', (isDirty) => {
      this.toolbar.data.set('btn_save', 'enabled', isDirty);
    });
    this.context.on('permissionChanged', (canEdit) => {
      this.toolbar.data.set('btn_edit', 'enabled', canEdit);
    });
  }

  destroy() {
    // 清理
  }
}
```


<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。Toolbar 是继承自 HyperHTMLElement 的 Web Component。</em></p>
