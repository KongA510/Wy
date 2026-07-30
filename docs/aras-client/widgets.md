---
title: 仪表板 Widget 开发
---

<h1>仪表板 Widget 开发</h1>
<blockquote>
<p>Widget 是基于 <strong>WidgetLayout</strong> 基类的自定义 CUI Layout。通过定义 Widget Template、关联 Layout 并实现内容渲染，可以创建各种类型的仪表板组件。</p>
</blockquote>

<h2>一、添加新 Widget 类型 — 完整指南</h2>

<h3>Step 1：定义 Widget Type</h3>
<p>在 Innovator 中，<strong>Dashboard Widget Types</strong> 是一个 Innovator List，包含客户端代码可以处理的 Widget 类型集合。</p>

<h3>Step 2：关联 Layout 与 Widget Type</h3>
<p>在 <code>Modules/dashboard/dashboardWidgetLayouts.ts</code> 中添加映射：</p>

```typescript
// dashboardWidgetLayouts.ts
const widgetLayoutConstructors = {
  NewLayout: NewCuiLayout,
  Grid: DashboardGridCuiLayout,
  TreeGrid: DashboardTreeGridCuiLayout
} as const;
```


<h3>Step 3：继承 WidgetLayout 基类</h3>

```typescript
import WidgetLayout from './WidgetLayout';

export default class NewCuiLayout extends WidgetLayout {
  // 必须实现 updateLayout 方法
  override async updateLayout() {
    // 渲染逻辑...
  }
}
```


<h3>Step 4：定义 Widget 内容</h3>
<p>有两种方式定义 Widget 的内容：</p>

<h4>方式 A：通过 CUI Controls（推荐）</h4>
<p>像 <code>DashboardGridCuiLayout</code> 那样，通过 <code>cui_WindowSection</code> 定义控件，引擎自动渲染：</p>

```typescript
// DashboardGridCuiLayout.ts
// 通过 widget_data 中的 item_type_id 加载 ItemType 的数据
// 自动渲染 Grid + Pagination 控件
```


<h4>方式 B：手动创建 DOM</h4>

```typescript
import { bind, wire } from 'hyperhtml';
import WidgetLayout from './WidgetLayout';

type NewCuiLayoutState = {
  image_src: string;
  title?: string;
};

export default class NewCuiLayout extends WidgetLayout<NewCuiLayoutState> {
  #getTitleNode() {
    const { title } = this.state;
    if (!title) {
      return null;
    }
    return wire(this, 'html:title')`<span>${title}</span>`;
  }

  #getImageNode() {
    const { image_src: src } = this.state;
    return wire(this, 'html:image')`<aras-image src="/aras-images/${src}">`;
  }

  render() {
    const title = this.#getTitleNode();
    const image = this.#getImageNode();
    bind(this.dom)`${[title, image]}`;
  }

  override async updateLayout() {
    this.render();
  }
}
```


<div class="tip-box">
<strong>⚠️ 不推荐使用 &lt;iframe&gt;</strong> 渲染 Widget 内容，因为 iframe 会破坏仪表板的上下文共享机制。
</div>

<h2>二、Widget Template 定义</h2>
<p>Widget Template 定义了 Widget 可配置的属性（通过 <code>Dashboard Widget Template Prop</code> 关系）：</p>

```xml
<AML>
  <Item type="Dashboard Widget Template" action="add">
    <name>Grid_Widget_Template</name>
    <Relationships>
      <Item type="Dashboard Widget Template Prop" action="add">
        <name>item_type_id</name>
        <label>ItemType</label>
        <data_type>item</data_type>
        <sort_order>1</sort_order>
      </Item>
      <Item type="Dashboard Widget Template Prop" action="add">
        <name>page_size</name>
        <label>每页条数</label>
        <data_type>integer</data_type>
        <default_value>20</default_value>
        <sort_order>2</sort_order>
      </Item>
      <Item type="Dashboard Widget Template Prop" action="add">
        <name>max_results</name>
        <label>最大结果数</label>
        <data_type>integer</data_type>
        <default_value>100</default_value>
        <sort_order>3</sort_order>
      </Item>
    </Relationships>
  </Item>
</AML>
```


<h2>三、Widget 渲染流程</h2>

```text
Dashboard 初始化：
  1. 加载 cui_Dashboard Item
  2. 获取所有 Dashboard Widget 关系
  3. 遍历 Widget：
     a. 读取 widget_data
     b. 根据 Widget Type 查询 widgetLayoutConstructors
     c. 新建 WidgetLayout 子类实例
     d. 传入 widget_data 作为 state
     e. 执行 init() / updateLayout()
     f. 将渲染结果插入 DOM
```


<h2>四、Widget 间通信</h2>
<p>通过<strong>上下文共享（Context Sharing）</strong>机制，同一仪表板中的 Widget 可以共享数据：</p>

```typescript
// Widget A 更新 shared_data 中的某个属性
widgetA.setState({ selected_row_id: 'ABC123' });

// Widget B 的 widget_data 中的 item_id 被自动替换为 'ABC123'
// 因为 Widget B 的 shared_data 配置了：
// { "item_id": { "from": "*", "prop": "selected_row_id" } }
// 详见"上下文共享机制"页面
```


<hr />
<p><em>适用版本：Aras Innovator 14.x / 2025R。</em></p>
