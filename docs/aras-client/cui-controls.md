---
title: CUI 控件体系
---

# CUI 控件体系
<blockquote>
<p>CUI Controls 是连接<strong>纯 UI 组件</strong>与<strong>CUI 数据定义</strong>的桥梁。根据控件类型，自动选择对应的 JS 实现进行渲染。</p>
</blockquote>

## 一、两层含义
<table>
<thead><tr><th>概念</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>CUI Controls（广义）</strong></td><td>特殊的包装器，连接纯组件与 CUI 控件定义</td></tr>
<tr><td><strong>CUI Controls（模块）</strong></td><td>为 CUI Layout 提供元数据的模块（位于 <code>cuiControls.js</code>）</td></tr>
</tbody>
</table>

## 二、位置
<p><code>Innovator/Client/Modules/cui/cuiControls.js</code></p>

## 三、公共 API — getControlMetadata()

```javascript
import getControlMetadata from './cuiControls';

const metadata = getControlMetadata('ToolbarControl');

// 返回值结构：
// {
//   constructor: Function,       // 控件实例化方法
//   webComponentName: String,    // Web Component 名称（可选）
//   initControl: Function,       // 控件初始化方法（可选）
//   eventHandler: Function       // 事件处理方法（可选）
// }
```


### 属性详解
<table>
<thead><tr><th>属性</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>constructor</code></td><td>指定控件的实例化方式。通常创建 HTML 元素/Web Component，并填充 class、style 等属性</td></tr>
<tr><td><code>webComponentName</code></td><td>使用的 Web Component 的标签名（如 <code>aras-toolbar</code>、<code>aras-grid</code>）</td></tr>
<tr><td><code>initControl</code></td><td>控件的初始化逻辑：订阅事件、创建嵌套控件结构</td></tr>
<tr><td><code>eventHandler</code></td><td>定义控件如何响应 CUI Layout 处理的事件</td></tr>
</tbody>
</table>

## 四、控件类型注册示例

```javascript
// cuiControls.js — 控件类型注册中心

// Toolbar 控件
const initToolbarControl = ({ component }, { componentData }, options) =>
  cuiToolbar(component, componentData['location@keyed_name'], options);

// Grid 控件
const initGridControl = ({ component }, { componentData }, options) =>
  cuiGrid(component, componentData, options);

// ContextMenu 控件
const initContextMenuControl = ({ component }, { componentData }, options) =>
  cuiContextMenu(component, componentData['location@keyed_name'], options);

// TOC 控件
const initTocControl = ({ component }, { componentData }, options) =>
  cuiToc(component, componentData, options);

// 类型到实现的映射（简化版）
const controlRegistry = {
  'ToolbarControl': {
    constructor: createToolbarComponent,
    webComponentName: 'aras-toolbar',
    initControl: initToolbarControl,
    eventHandler: toolbarEventHandler
  },
  'GridControl': {
    constructor: createGridComponent,
    webComponentName: 'aras-grid',
    initControl: initGridControl,
    eventHandler: gridEventHandler
  },
  'ContextMenuControl': {
    constructor: createContextMenuComponent,
    webComponentName: 'aras-context-menu',
    initControl: initContextMenuControl
  },
  'TocControl': {
    constructor: createTocComponent,
    webComponentName: 'aras-toc',
    initControl: initTocControl
  }
};
```


## 五、在 CUI Layout 中的工作流程

```text
CUI Layout.init()
  │
  ├─ 1. 获取 CUI 数据（含控件定义列表）
  │     [{control_type: 'ToolbarControl', ...}, {control_type: 'GridControl', ...}]
  │
  ├─ 2. 遍历控件定义
  │   │
  │   ├─ 2a. getControlMetadata('ToolbarControl')
  │   │     → {constructor, webComponentName, initControl, eventHandler}
  │   │
  │   ├─ 2b. 调用 constructor 创建 DOM 元素
  │   │
  │   ├─ 2c. 调用 initControl 初始化控件
  │   │      └── 订阅事件、创建子控件、启动渲染
  │   │
  │   └─ 2d. 注册 eventHandler 以便布局处理控件事件
  │
  └─ 3. 所有控件就绪，布局进入运行状态
```


## 六、自定义控件类型

```javascript
// 1. 创建自定义控件的初始化函数
function initCustomChartControl({ component }, { componentData }, options) {
  const chartData = componentData['chart_data'];
  const chartType = componentData['chart_type'] || 'bar';

  // 使用第三方图表库初始化
  const chart = new ChartLibrary(component, {
    type: chartType,
    data: JSON.parse(chartData)
  });

  // 订阅状态变化
  options.observer.on('state:changed', (newState) => {
    if (newState.chartData) {
      chart.updateData(newState.chartData);
    }
  });

  return {
    destroy: () => chart.destroy(),
    chart
  };
}

// 2. 在 cuiControls.js 中注册
const controlRegistry = {
  // ...其他控件
  'CustomChartControl': {
    constructor: (data) => document.createElement('div'),
    webComponentName: null, // 无 Web Component
    initControl: initCustomChartControl
  }
};
```


## 七、已有控件类型一览
<table>
<thead><tr><th>控件类型 (control_type)</th><th>对应 Web Component</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>ToolbarControl</code></td><td><code>&lt;aras-toolbar&gt;</code></td><td>工具栏</td></tr>
<tr><td><code>GridControl</code></td><td><code>&lt;aras-grid&gt;</code></td><td>网格/表格</td></tr>
<tr><td><code>ContextMenuControl</code></td><td><code>&lt;aras-context-menu&gt;</code></td><td>右键菜单</td></tr>
<tr><td><code>TocControl</code></td><td><code>&lt;aras-toc&gt;</code></td><td>目录/导航树</td></tr>
<tr><td><code>PaginationControl</code></td><td><code>&lt;aras-toolbar&gt;</code></td><td>分页器（继承 Toolbar）</td></tr>
</tbody>
</table>

<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。</em></p>
