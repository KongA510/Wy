---
title: CUI 工具栏
---

# CUI 工具栏
<blockquote>
<p>CUI Toolbar 将<strong>工具栏组件</strong>与<strong>CUI 数据</strong>绑定，根据当前 Location 请求对应的 CommandBarSection 数据，为每种 CommandBarItem 类型提供对应的渲染和事件处理。</p>
</blockquote>

## 一、位置
<p><code>Innovator/Client/Modules/cui/cuiToolbar.js</code></p>

## 二、公共 API

```javascript
// 模块导出单一函数
function cuiToolbar(
  control: Toolbar,          // Toolbar Web Component 实例
  location: String,          // CUI Location 名称
  options: Object            // 额外配置
): Promise<{destroy: Function, updateOptions: Function}>
```


### 返回值
<table>
<thead><tr><th>方法</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>destroy()</code></td><td>销毁工具栏，移除所有事件监听</td></tr>
<tr><td><code>updateOptions(newOptions)</code></td><td>更新工具栏选项，触发重新渲染</td></tr>
</tbody>
</table>

## 三、支持的控件类型
<p>CommandBarItems 可以渲染为多种类型的控件，不仅仅是按钮：</p>
<table>
<thead><tr><th>Item 类型</th><th>渲染为</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>Button</strong></td><td>按钮</td><td>普通操作按钮，使用 toolbar formatter 渲染</td></tr>
<tr><td><strong>Dropdown</strong></td><td>下拉选择器</td><td>使用 select formatter 渲染</td></tr>
<tr><td><strong>Separator</strong></td><td>分隔线</td><td>直接按原样渲染</td></tr>
<tr><td><strong>Menu</strong></td><td>菜单</td><td>转为带有嵌套结构的真实菜单组件</td></tr>
<tr><td><strong>Image</strong></td><td>静态图片</td><td>图标展示</td></tr>
<tr><td><strong>Text</strong></td><td>文本标签</td><td>静态文字</td></tr>
<tr><td><strong>Input</strong></td><td>输入框</td><td>文本输入控件</td></tr>
</tbody>
</table>

## 四、数据定义
<p>以 Search Command Bar 为例：</p>

```text
CUI 数据层次：
SearchViewLayout (CUI Layout)
  └── CommandBarSection: "Search Commands Bar"
        ├── CommandBarItem: "Search" (按钮)
        │     type: "button"
        │     on_click_handler: "cui_default_mwt_search"
        │     icon: "search.svg"
        │     sort_order: 128
        ├── CommandBarItem: "Save Search" (按钮)
        │     type: "button"
        │     on_click_handler: "cui_default_mwt_save_search"
        │     sort_order: 256
        ├── CommandBarItem: "Separator" (分隔线)
        │     type: "separator"
        └── CommandBarItem: "More" (下拉菜单)
              type: "dropdown"
              children: ["Export", "Import", "Settings"]
```


## 五、完整使用示例

### 5.1 在 CUI Layout 中注册工具栏

```javascript
// CUI 数据定义（服务端返回）
const toolbarCuiData = {
  control_type: 'ToolbarControl',
  'location@keyed_name': 'My_Custom_Search_Commands',
  // ...其他配置
};

// cuiControls.js 中的初始化函数
const initToolbarControl = (
  { component },       // Toolbar DOM 元素
  { componentData },   // CUI 数据
  options              // CUI Layout 配置
) => cuiToolbar(
  component,
  componentData['location@keyed_name'],
  options
);
```


### 5.2 直接使用 cuiToolbar

```javascript
import { cuiToolbar } from './cui/cuiToolbar';

// 创建 Toolbar DOM 元素
const toolbarEl = document.createElement('aras-toolbar');
document.getElementById('toolbar-container').appendChild(toolbarEl);

// 初始化 CUI 工具栏
cuiToolbar(toolbarEl, 'Item_View_Commands', {
  itemTypeId: '4F1AC04A2B484F3ABA4E20DB63808A88',
  observer: layoutObserver
}).then(({ destroy, updateOptions }) => {
  // 工具栏初始化完成
  console.log('工具栏就绪');

  // 后续可更新选项
  updateOptions({
    itemTypeId: 'NEW_ITEMTYPE_ID',
    observer: newLayoutObserver
  });
});
```


### 5.3 工具栏按钮事件定义

```javascript
// CommandBarItem 的事件处理
const commandBarItem = {
  type: 'button',
  label: '保存',
  icon: '../images/save.svg',
  // 点击时调用客户端 Method
  on_click_handler: 'cui_default_mwt_onSaveCommand',
  // 初始化时调用（控制按钮可见性/可用性）
  on_init_handler: 'initSaveButtonState',
  additional_data: {
    shortcut: 'Ctrl+S',
    tooltip: '保存当前项目 (Ctrl+S)'
  }
};
```


## 六、CUI Toolbar 与纯 Toolbar 组件的区别
<table>
<thead><tr><th>方面</th><th>CUI Toolbar</th><th>纯 Toolbar 组件</th></tr></thead>
<tbody>
<tr><td><strong>数据来源</strong></td><td>服务端 CUI 数据（ItemType 存储）</td><td>手动设置 <code>.data</code> Map</td></tr>
<tr><td><strong>按钮行为</strong></td><td>自动绑定 Method 事件处理器</td><td>手动绑定 onclick</td></tr>
<tr><td><strong>初始化控制</strong></td><td>自动调用 init_handler</td><td>手动管理状态</td></tr>
<tr><td><strong>配置方式</strong></td><td>数据库配置，无需部署代码</td><td>代码硬编码</td></tr>
<tr><td><strong>适用场景</strong></td><td>标准业务工具栏</td><td>临时工具栏、自定义控件</td></tr>
</tbody>
</table>

<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。</em></p>
