---
title: CUI 布局引擎
---

# CUI 布局引擎
<blockquote>
<p>CUI Layout 是整个 CUI 架构的<strong>核心引擎</strong>。它接收控件的结构化数据，将每个数据定义与对应的客户端实现关联，并渲染出完整的 UI。</p>
</blockquote>

## 一、核心职责
<table>
<thead><tr><th>职责</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据接收</strong></td><td>接收特定位置的控件数据（由服务端 CUI 配置提供）</td></tr>
<tr><td><strong>控件关联</strong></td><td>将数据中定义的控件类型与客户端 JS 实现绑定</td></tr>
<tr><td><strong>渲染管理</strong></td><td>按正确的顺序、嵌套和关联关系初始化所有控件</td></tr>
<tr><td><strong>跨控件通信</strong></td><td>协调布局内各个控件之间的交互，处理业务上下文</td></tr>
<tr><td><strong>状态同步</strong></td><td>通过内置订阅机制与 Single Item Store 同步状态</td></tr>
</tbody>
</table>

## 二、类位置
<p><code>Innovator/Client/cui/layouts/CuiLayout.js</code> — 可直接使用，也可作为子类的基类。</p>

## 三、生命周期

```text
CUI Layout 初始化流程：
Step #0  构造函数 — 创建实例，关联 DOM 和参数
Step #1  .init() — 入口方法
  ├── .initializePropsAndState() — 初始化 props 和状态
  ├── 获取 CUI 数据（从服务端/Stub）
  ├── 处理 CUI 数据（解析控件定义）
  ├── 创建控件实例（根据 control_type）
  ├── 订阅控件事件
  └── 启动控件（渲染到 DOM）
Step #19 布局就绪，可通过 API 交互
Step #N  .destroy() — 释放资源，销毁布局
```


## 四、公共 API

### 4.1 new CuiLayout(dom, location, options)

```javascript
// 构造参数
const layout = new CuiLayout(
  document.getElementById('my-container'),  // dom: 渲染容器
  'My_Custom_Location',                     // location: CUI Location 名称
  {
    notifyObserver: (data) => {},           // 观察者回调
    itemTypeId: '4F1AC04A...',              // ItemType ID
    // ...其他配置
  }
);
```


### 4.2 .init()

```javascript
// 默认逻辑包含：
// 1. 初始化 props 和 state
// 2. 获取 CUI 数据
// 3. 处理 CUI 数据
// 4. 启动控件
await layout.init();

// 可重写以自定义初始化流程
class MyCustomLayout extends CuiLayout {
  async init() {
    // 手动调用 props/state 初始化
    this.initializePropsAndState();
    // 自定义数据获取
    const data = await this.fetchCustomData();
    // 自定义数据处理与控件启动
    await this.processCustomData(data);
  }
}
```


### 4.3 .initialState（状态定义）

```javascript
class SearchViewLayout extends CuiLayout {
  // 在类级别定义状态的形状和初始值
  initialState = {
    searchText: '',
    searchResults: [],
    isLoading: false,
    selectedIndex: -1
  };
}
```


### 4.4 .state（运行时状态 — 只读）

```javascript
// state 类似 React 组件的 state
// 用于在布局内的多个控件间共享数据
console.log(layout.state.searchText);        // 读取
console.log(layout.state.searchResults.length);

// 原则：只有多个控件都需要的数据才放入 state
// （类似 Redux 的"提升状态"理念）
```


### 4.5 .setState(partialState)

```javascript
// 更新部分状态，触发相关控件重新渲染
layout.setState({
  searchText: 'P-001',
  selectedIndex: 0
});

// 控件中响应状态变化
layout.on('state:changed', (newState, oldState) => {
  if (newState.searchText !== oldState.searchText) {
    // 重新查询数据
  }
});
```


### 4.6 .updateLayout()

```javascript
// 手动触发布局重新渲染
await layout.updateLayout();

// 常用场景：外部数据变化后刷新 UI
innefect.onItemChanged((item) => {
  layout.setState({ currentItem: item });
  layout.updateLayout();
});
```


## 五、完整示例：搜索视图布局

```javascript
// SearchViewCuiLayout.js
class SearchViewCuiLayout extends CuiLayout {
  initialState = {
    query: '',
    results: null,
    page: 1,
    totalCount: 0
  };

  async init() {
    // 标准初始化
    await this.initializePropsAndState();

    // 创建搜索工具栏（通过 CUI 数据）
    const toolbarData = await this.fetchCuiData('Search_Toolbar');
    this.searchToolbar = this.createControl('ToolbarControl', toolbarData);

    // 创建结果网格
    const gridData = await this.fetchCuiData('Search_Results_Grid');
    this.resultGrid = this.createControl('GridControl', gridData);

    // 订阅控件间通信
    this.subscribeToControl(this.searchToolbar, 'onSearch', (query) => {
      this.setState({ query, isLoading: true });
      this.executeSearch(query).then(results => {
        this.setState({ results, isLoading: false });
        this.resultGrid.updateData(results);
      });
    });
  }

  async executeSearch(query) {
    const inn = top.aras.IomInnovator;
    const item = inn.newItem('Part', 'get');
    item.setAttribute('select', 'id,name,item_number');
    item.setPropertyCondition('name', 'like');
    item.setProperty('name', `*${query}*`);
    const result = item.apply();
    return this.parseResults(result);
  }

  destroy() {
    this.searchToolbar?.destroy();
    this.resultGrid?.destroy();
    super.destroy();
  }
}
```


## 六、关键概念总结
<table>
<thead><tr><th>概念</th><th>类比</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>CUI Layout</strong></td><td>React 容器组件</td><td>管理 UI 区域内的所有控件和交互</td></tr>
<tr><td><strong>state</strong></td><td>Redux Store / useState</td><td>跨多个控件的共享数据</td></tr>
<tr><td><strong>props</strong></td><td>React props</td><td>从外部传入的只读配置</td></tr>
<tr><td><strong>Controls</strong></td><td>React 子组件</td><td>布局内具体的 UI 控件实例</td></tr>
<tr><td><strong>notifyObserver</strong></td><td>Redux dispatch</td><td>向外部报告状态变化</td></tr>
</tbody>
</table>

<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。CUI Layout 是客户端架构的核心。</em></p>
