---
title: CUI 目录导航（TOC）
---

# CUI 目录导航（TOC）
<blockquote>
<p>CUI TOC 是 CUI 控件体系中用于创建<strong>树形目录导航</strong>的模块。它根据 CUI 数据定义渲染可展开/折叠的树节点结构，常用于管理系统左侧导航栏、分类树、BOM 结构等场景，支持节点懒加载和动态数据绑定。</p>
</blockquote>

## 一、位置
<p><code>Innovator/Client/Modules/cui/cuiToc.js</code></p>

## 二、公共 API

```javascript
function cuiToc(
  control: ArasTocElement,     // aras-toc Web Component
  componentData: Object,       // CUI 控件定义数据
  options?: Object             // 可选配置
): Promise<{
  updateItems(items): void,    // 更新树节点数据
  getSelectedNode(): Object,   // 获取当前选中节点
  expandNode(id): void,        // 展开指定节点
  collapseNode(id): void,      // 折叠指定节点
  refresh(): void,             // 刷新树结构
  destroy(): void              // 销毁 TOC 实例
}>
```


## 三、CUI 数据结构

### 3.1 控件定义（componentData）
<p>控件定义中包含三个关键字段：</p>

<table>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>item_type_id</code></td><td>用于加载树数据的 ItemType ID</td></tr>
<tr><td><code>method@keyed_name</code></td><td>获取树数据的服务端 Method 名称</td></tr>
<tr><td><code>client_method</code></td><td>客户端 Method（自定义导航行为）</td></tr>
</tbody>
</table>

### 3.2 树节点数据结构
<p>每个树节点是一个扁平化对象，通过 <code>parentId</code> 建立父子关系：</p>


```javascript
// 单条 TOC 节点数据
{
  id: "A73A60046F5240F889A0A3EE1C8C3F1E",     // 节点唯一标识
  type: "ItemType",                              // 节点类型（ItemType）
  label: "设计文档",                              // 显示文本
  itemtype: "4F1AC04A2FB83A11A0D7B4E1BD0A8C5D", // 关联 ItemType ID
  action: "add",                                 // 点击行为: add / open / search
  isCollapsible: true,                           // 是否可展开
  isExpanded: false,                             // 是否已展开
  parentId: "",                                  // 父节点 ID（空表示根节点）
  icon: "../images/TOCItem.svg",                 // 节点图标 URL
  additionalData: {},                            // 附加业务数据
  hasChildren: true,                             // 是否有子节点（用于懒加载标记）
  configId: "F1B2C3D4E5A6B7C8"                  // 配置标识
}
```


### 3.3 TOC 树配置项（configId 对应的内存数据）

```javascript
// 通过 configId 在 arasTocConfigs 中查找树配置
const tocConfig = {
  id: "F1B2C3D4E5A6B7C8",
  label: "设计文档分类",
  itemtype: "4F1AC04A2FB83A11A0D7B4E1BD0A8C5D",
  expandItems: 1,            // 自动展开层级数（0=不展开, 1=展开第一层）
  sortBy: "sort_order",      // 排序字段
  filterBy: "",              // 过滤条件（AML where 子句）
  orderBy: "ASC",            // 排序方向
  structureView: "class",    // 结构视图类型
  action: "add",             // 默认行为
  searchMode: "SearchMode",  // 搜索模式
  method: {                  // 节点数据加载 Method
    name: "cui_common_getTocData",
    type: "Method"
  },
  iconSrc: "../images/TOCItem.svg"
};
```


## 四、完整使用示例

### 4.1 在 CUI Layout 中配置 TOC 控件

```javascript
// CUI 数据 — TOC 控件定义
const tocControlData = {
  "@type": "CommandBarSection",
  "@typeId": "A1B2C3D4E5F6",
  "@id": "TOC_SECTION_001",
  "id": "TOC_SECTION_001",
  "control_type": "TocControl",
  "location": "My_Custom_Toc_Location",
  "item_type_id": "4F1AC04A2FB83A11A0D7B4E1BD0A8C5D",
  "method@keyed_name": "cui_common_getTocData",
  "method": "TOC_METHOD_ID",
  "client_method": "myTocClickHandler",
  "sort_order": "0"
};
```


### 4.2 TOC 初始化逻辑（cuiControls 注册）

```javascript
// cuiControls.js — TOC 控件注册
import { cuiToc } from './cui/cuiToc';

// TOC 控件的 initControl 方法
const initTocControl = ({ component }, { componentData }, options) => {
  return cuiToc(component, componentData, options);
};

// 构造函数：创建 aras-toc Web Component
const createTocComponent = ({ componentData }) => {
  const toc = document.createElement('aras-toc');
  toc.setAttribute('id', 'toc-' + componentData['@id']);

  // 设置初始属性
  if (componentData.client_method) {
    toc.setAttribute('client-method', componentData.client_method);
  }
  if (componentData.item_type_id) {
    toc.setAttribute('item-type-id', componentData.item_type_id);
  }

  return toc;
};

// 注册到控件中心
const controlRegistry = {
  // ... 其他控件
  'TocControl': {
    constructor: createTocComponent,
    webComponentName: 'aras-toc',
    initControl: initTocControl
  }
};
```


### 4.3 自定义编辑器中使用 TOC

```javascript
// 自定义 TOC 编辑器 —— 分类导航面板
class ClassificationEditor {
  constructor(domNode, options) {
    this.domNode = domNode;
    this.options = options;
    this.tocInstance = null;
  }

  async init() {
    // 1. 创建 aras-toc Web Component
    const tocElement = document.createElement('aras-toc');
    tocElement.style.height = '100%';
    tocElement.style.borderRight = '1px solid #d1d5db';
    this.domNode.appendChild(tocElement);

    // 2. 配置控件数据
    const componentData = {
      item_type_id: '4F1AC04A2FB83A11A0D7B4E1BD0A8C5D',
      'method@keyed_name': 'cui_common_getTocData',
      client_method: 'onClassificationClick'
    };

    // 3. 初始化 TOC
    this.tocInstance = await cuiToc(tocElement, componentData, {
      // 布局传递的上下文
      notifyObserver: (eventData) => {
        // 将 TOC 选中事件通知给布局中其他控件
        this.options.notifyObserver({
          type: 'TocNodeSelected',
          payload: eventData
        });
      }
    });

    // 4. 监听 TOC 节点点击
    tocElement.addEventListener('node-click', (e) => {
      const node = e.detail;
      this.onNodeClick(node);
    });
  }

  onNodeClick(node) {
    console.log('选中节点:', node.label, node.id);

    // 根据节点 action 执行不同操作
    switch (node.action) {
      case 'add':
        this.showAddForm(node);
        break;
      case 'open':
        this.navigateToItem(node);
        break;
      case 'search':
        this.runSearch(node);
        break;
      default:
        this.showDefaultView(node);
    }
  }

  showAddForm(node) {
    // 在当前布局的其他区域显示新建表单
    this.options.notifyObserver({
      type: 'ShowForm',
      payload: { itemType: node.itemtype, parentId: node.id }
    });
  }

  navigateToItem(node) {
    // 跳转到 Item 查看页
    const topWindow = window.top || window;
    topWindow.location = `../default.aspx?StartItem=${node.id}`;
  }

  runSearch(node) {
    // 触发搜索
    const searchConfig = node.additionalData?.searchCriteria;
    this.options.notifyObserver({
      type: 'RunSearch',
      payload: searchConfig
    });
  }

  destroy() {
    if (this.tocInstance) {
      this.tocInstance.destroy();
    }
  }
}
```


### 4.4 动态更新 TOC 节点

```javascript
// 为 TOC 添加自定义节点或更新现有节点
async function addCustomTocNode(tocInstance, parentId, newItem) {
  // 构造新节点
  const node = {
    id: newItem.id,
    type: 'ItemType',
    label: newItem.label,
    itemtype: newItem.itemTypeId,
    action: 'open',
    isCollapsible: false,
    isExpanded: false,
    parentId: parentId || '',
    icon: '../images/TOCItem.svg',
    additionalData: { source: 'custom' }
  };

  // 获取当前所有节点并追加
  const currentNodes = tocInstance.getNodes?.() || [];
  const updatedNodes = [...currentNodes, node];
  tocInstance.updateItems(updatedNodes);
}

// 根据条件过滤树节点
function filterTocNodes(tocInstance, keyword) {
  const allNodes = tocInstance.getNodes?.() || [];

  if (!keyword) {
    tocInstance.updateItems(allNodes);
    return;
  }

  const lowerKeyword = keyword.toLowerCase();
  const filtered = allNodes.filter(node =>
    node.label.toLowerCase().includes(lowerKeyword)
  );
  tocInstance.updateItems(filtered);
}
```


### 4.5 懒加载子节点

```javascript
// TOC 懒加载 —— 点击展开时动态获取子节点
async function setupLazyLoading(tocElement) {
  tocElement.addEventListener('node-expand', async (e) => {
    const node = e.detail;
    if (!node.hasChildren || node.childrenLoaded) return;

    // 调用服务端 Method 获取子节点
    const result = await top.aras.IomInnovator.applyMethod(
      'cui_common_getTocChildren',
      `<node_id>${node.id}</node_id><item_type_id>${node.itemtype}</item_type_id>`
    );

    // 解析子节点数据
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(result, 'text/xml');
    const children = [];
    const itemNodes = xmlDoc.querySelectorAll('Item');
    itemNodes.forEach(itemNode => {
      children.push({
        id: itemNode.getAttribute('id'),
        type: itemNode.getAttribute('type'),
        label: itemNode.querySelector('label')?.textContent || '',
        parentId: node.id,
        action: itemNode.querySelector('action')?.textContent || 'open',
        isCollapsible: itemNode.querySelector('is_collapsible')?.textContent === '1',
        itemtype: itemNode.querySelector('itemtype')?.textContent || '',
        hasChildren: itemNode.querySelector('has_children')?.textContent === '1'
      });
    });

    // 将新加载的子节点追加到树中
    tocElement.addChildNodes(node.id, children);
    node.childrenLoaded = true;
  });
}
```


### 4.6 经典场景：BOM 结构树

```javascript
// BOM 结构浏览器 —— 工程师最常用的 TOC 场景
class BomStructureBrowser {
  constructor(container, options) {
    this.container = container;
    this.itemId = options.itemId;      // 顶层 Part ID
    this.itemType = options.itemType;  // Part
    this.tocInstance = null;
  }

  async init() {
    // 创建 aras-toc 元素
    const tocEl = document.createElement('aras-toc');
    tocEl.classList.add('bom-tree');
    this.container.appendChild(tocEl);

    // BOM TOC 控件定义
    const componentData = {
      item_type_id: this.itemType,
      'method@keyed_name': 'cui_common_getBomTocData',
      client_method: 'onBomNodeClick',
      // 额外参数：BOM 结构视图
      additional_params: JSON.stringify({
        structureView: 'bom',
        rootItemId: this.itemId
      })
    };

    this.tocInstance = await cuiToc(tocEl, componentData, {
      itemId: this.itemId,
      notifyObserver: (data) => {
        // 联动显示 Part 详情 / BOM 行属性
        document.dispatchEvent(new CustomEvent('bom-node-selected', {
          detail: data
        }));
      }
    });

    // 监听节点选中
    tocEl.addEventListener('node-click', (e) => {
      const node = e.detail;
      this.showPartDetails(node);
    });
  }

  showPartDetails(node) {
    // 在 BOM 明细区域显示 Part 信息
    const event = new CustomEvent('bom-part-selected', {
      detail: {
        id: node.id,
        itemtype: node.itemtype,
        label: node.label,
        additionalData: node.additionalData
      }
    });
    document.dispatchEvent(event);
  }

  destroy() {
    this.tocInstance?.destroy();
  }
}

// 使用示例
const bomBrowser = new BomStructureBrowser(
  document.getElementById('bom-panel'),
  {
    itemId: 'CURRENT_PART_ID',
    itemType: 'Part'
  }
);
bomBrowser.init();
```


## 五、客户端 Method（点击处理器）
<p>通过 <code>client_method</code> 指定的点击处理函数，可以自定义节点点击后的导航行为：</p>


```javascript
// 客户端 Method — 自定义 TOC 节点点击行为
function onClassificationClick(context) {
  // context 包含: { node, tocInstance, innovator }

  const node = context.node;

  // 根据节点元数据决定跳转行为
  switch (node.action) {
    case 'add':
      // 创建新 Item
      top.aras.uiShowItem(node.itemtype, {
        parentItem: node.id,
        callback: (newItem) => {
          // 创建完成后刷新树
          context.tocInstance.refresh();
        }
      });
      break;

    case 'open':
      // 打开查看页
      top.aras.uiShowItem(node.itemtype, node.id);
      break;

    case 'search':
      // 打开搜索页
      const searchParams = node.additionalData?.searchCriteria;
      top.aras.uiShowItemWithSearch(node.itemtype, searchParams);
      break;

    default:
      // 默认打开
      top.aras.uiShowItem(node.itemtype, node.id);
  }
}
```


## 六、aras-toc Web Component 属性参考

<table>
<thead><tr><th>属性</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>item-type-id</code></td><td>String</td><td>关联的 ItemType ID</td></tr>
<tr><td><code>client-method</code></td><td>String</td><td>节点点击时的客户端 Method 名称</td></tr>
<tr><td><code>expand-level</code></td><td>Number</td><td>初始展开层级（0=全部折叠, 1=展开第一层, -1=全部展开）</td></tr>
<tr><td><code>multi-select</code></td><td>Boolean</td><td>是否支持多选节点</td></tr>
<tr><td><code>show-icons</code></td><td>Boolean</td><td>是否显示节点图标</td></tr>
<tr><td><code>sort-by</code></td><td>String</td><td>排序字段</td></tr>
<tr><td><code>sort-order</code></td><td>String</td><td>排序方向（ASC / DESC）</td></tr>
<tr><td><code>filter-text</code></td><td>String</td><td>前端过滤文本</td></tr>
</tbody>
</table>

## 七、aras-toc 自定义事件

<table>
<thead><tr><th>事件名</th><th>detail 内容</th><th>触发时机</th></tr></thead>
<tbody>
<tr><td><code>node-click</code></td><td><code>{ node: Object }</code></td><td>用户点击树节点</td></tr>
<tr><td><code>node-expand</code></td><td><code>{ node: Object }</code></td><td>节点被展开（可用于懒加载）</td></tr>
<tr><td><code>node-collapse</code></td><td><code>{ node: Object }</code></td><td>节点被折叠</td></tr>
<tr><td><code>node-select</code></td><td><code>{ node: Object, isMulti: Boolean }</code></td><td>节点被选中（单选/多选模式）</td></tr>
<tr><td><code>data-loaded</code></td><td><code>{ nodes: Array }</code></td><td>初始树数据加载完成</td></tr>
<tr><td><code>context-menu</code></td><td><code>{ node: Object, x: Number, y: Number }</code></td><td>节点上触发右键菜单</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>提示：</strong>TOC 节点的懒加载通过 <code>hasChildren: true</code> 标记实现。当用户展开一个标记了 <code>hasChildren</code> 的节点时，aras-toc 组件会触发 <code>node-expand</code> 事件——在此事件中调用服务端 Method 获取子节点数据并追加到树中。
</div>

<div class="tip-box green">
<strong>最佳实践：</strong>在自定义编辑器中复用 TOC 时，建议通过 <code>notifyObserver</code> 与布局内其他控件联动，而不是在 <code>node-click</code> 中直接操作 DOM。这样可以保持 CUI 架构的松耦合特性，方便后续扩展和维护。
</div>

## 八、注意事项
<ul>
<li><strong>TOC 数据由服务端 Method 提供</strong>——默认 Method 为 <code>cui_common_getTocData</code>，自定义结构（如 BOM 树）需单独指定 Method</li>
<li><strong>树节点是扁平结构</strong>——通过 <code>parentId</code> 字段建立层级关系，而非嵌套对象，这样在大数据量时有更好的性能表现</li>
<li><strong>懒加载推荐做法</strong>——根层级数据在 <code>data-loaded</code> 事件后一次性提供，深层节点通过 <code>node-expand</code> 事件按需加载</li>
<li><strong>销毁实例时清理事件监听</strong>——调用 <code>destroy()</code> 方法会自动移除所有内部事件绑定，避免内存泄漏</li>
<li><strong>与 CUI Context Menu 配合使用</strong>——通过监听 <code>context-menu</code> 事件可轻松实现右键操作菜单</li>
</ul>

<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。</em></p>
