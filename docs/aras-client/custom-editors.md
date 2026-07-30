---
title: 自定义编辑器开发
---

<h1>自定义编辑器开发</h1>
<blockquote>
<p>通过标准 CUI 模型，可以为任意 ItemType 创建<strong>自定义编辑器（Custom Editor）</strong>，类似 CWS 编辑器、Query Builder 等。</p>
</blockquote>

<h2>一、整体流程</h2>

```text
开发自定义编辑器的四大步骤：
┌────────────────────────────────────────────┐
│ Step 1: 创建视图内容（.cshtml 标记文件）    │
│ Step 2: 创建自定义 View 类（JS）            │
│ Step 3: 创建 OnShowItem 事件处理器          │
│ Step 4: 扩展 ItemType 添加 CUI 元素         │
└────────────────────────────────────────────┘
```


<h2>二、Step 1：创建视图内容</h2>
<p>首先创建 <code>.cshtml</code> 文件定义编辑器的 HTML 内容。必须扩展标准 ItemView 布局：</p>


```html
@{
  Layout = "{path}/aras.innovator.core.ItemWindow/Views/Shared/_cuiTabItemViewLayout.cshtml";
}

@section editor {
  <div switcher-pane-id="custom-editor">
    <!-- 自定义编辑器的主体内容放在这里 -->
    <div class="custom-editor-toolbar"></div>
    <div class="custom-editor-body">
      <div id="editor-grid-container"></div>
    </div>
  </div>
}

@section extra_header {
  <!-- 可选：额外的脚本和样式 -->
  <link rel="stylesheet" href="../styles/custom-editor.css" />
  <script src="/aras-images/../scripts/custom-editor.js"></script>
}
```


<div class="tip-box">
<strong>💡 关键</strong>：根元素的 <code>switcher-pane-id</code> 属性必须与对应的 <strong>CUI Button 的名称</strong>一致，Switcher 通过此属性确定显示哪个内容。
</div>

<h3>文件存储位置</h3>
<table>
<thead><tr><th>场景</th><th>路径</th></tr></thead>
<tbody>
<tr><td>OOTB ItemType</td><td><code>/Modules/{ModuleName}/Views/</code></td></tr>
<tr><td>Application ItemType</td><td><code>/Solutions/{SolutionName}/Views/</code></td></tr>
</tbody>
</table>

<h2>三、Step 2：创建自定义 View 类</h2>
<p>创建继承自 <code>DefaultItemWindowView</code> 的 JS 类，重写 <code>getViewUrl</code> 方法：</p>


```javascript
// OOTB ItemType 示例
class CustomEditorItemWindowView extends DefaultItemWindowView {
  getViewUrl() {
    // customEditorView.cshtml 位于 /Modules/NewCustomEditor/Views/
    return '/Modules/NewCustomEditor/customEditorView';
  }
}

// Application ItemType 示例
class AppCustomEditorItemWindowView extends DefaultItemWindowView {
  getViewUrl() {
    // customEditorView.cshtml 位于 /Solutions/NewCustomEditor/Views/
    return '/Solutions/NewCustomEditor/customEditorView';
  }
}
```


<h2>四、Step 3：创建 OnShowItem 事件处理器</h2>
<p>创建客户端 Method，在 <code>OnShowItem</code> 时触发，负责创建 View 实例并显示：</p>


```javascript
// 客户端 Method — OnShowItem 事件处理器
return window.ModulesManager.using([
  'CustomEditor/CustomEditorItemWindowView',
  'aras.innovator.core.ItemWindow/DefaultItemWindowCreator'
], function(CustomEditorItemWindowView, Creator) {
  const view = new CustomEditorItemWindowView(inDom, inArgs);
  const creator = new Creator(view);
  return creator.ShowView();
});
```


<div class="tip-box green">
<strong>✅ 关键对象</strong>：<br/>
<code>inDom</code> — 当前 DOM 容器节点<br/>
<code>inArgs</code> — 传入参数（含 Item 数据、上下文信息）
</div>

<h2>五、Step 4：扩展 ItemType 添加 CUI 元素</h2>
<p>在目标 ItemType 上添加 <code>CommandBarSection</code> 和 <code>CommandBarButton</code>，为编辑器添加 Sidebar 标签页：</p>


```xml
<!-- AML 方式创建 CUI 元素 -->
<AML>
  <!-- 1. 创建 Presentation Configuration -->
  <Item type="PresentationConfiguration" action="add">
    <name>MyCustomEditor</name>
  </Item>

  <!-- 2. 创建 CommandBarSection -->
  <Item type="CommandBarSection" action="add">
    <name>com.aras.innovator.custom_editor_tab</name>
    <label>自定义编辑器</label>
    <sort_order>100</sort_order>
  </Item>

  <!-- 3. 创建 CommandBarButton — 即编辑器标签按钮 -->
  <Item type="CommandBarButton" action="add">
    <name>com.aras.innovator.custom_editor_btn</name>
    <label>自定义编辑器</label>
    <additional_data>
      <![CDATA[
        {"switcher_pane_id": "custom-editor"}
      ]]>
    </additional_data>
  </Item>
</AML>
```


<h2>六、完整示例：BOM 可视化编辑器</h2>

```javascript
// BOMVisualEditorItemWindowView.js
class BOMVisualEditorItemWindowView extends DefaultItemWindowView {
  getViewUrl() {
    return '/Modules/BOMVisualEditor/bomVisualEditorView';
  }
}

// OnShowItem 处理器中初始化 BOM 树形展示
return window.ModulesManager.using([
  'BOMVisualEditor/BOMVisualEditorItemWindowView',
  'aras.innovator.core.ItemWindow/DefaultItemWindowCreator',
  'components/grid',
  'components/toolbar'
], function(BOMVisualEditorView, Creator, Grid, Toolbar) {
  const view = new BOMVisualEditorView(inDom, inArgs);
  const creator = new Creator(view);
  const showPromise = creator.ShowView();

  // 在编辑器显示后初始化网格
  showPromise.then(() => {
    const gridContainer = inDom.querySelector('#bom-grid');
    const bomGrid = new Grid(gridContainer, {
      multiSelect: true,
      editable: true,
      sortable: true,
      resizable: true
    });

    // 加载 BOM 数据...
    const partId = inArgs.item.getProperty('id');
    loadBOMData(partId).then(data => {
      bomGrid.head = buildBOMHead(data);
      bomGrid.rows = buildBOMRows(data);
      bomGrid.render();
    });
  });
});
```


<h2>七、注意事项</h2>
<ul>
<li><code>switcher-pane-id</code> 必须与 CUI Button 的 <code>additional_data.switcher_pane_id</code> 一致</li>
<li>View URL 路径不要包含 <code>.cshtml</code> 扩展名</li>
<li>Application 中的编辑器路径使用 <code>/Solutions/</code> 前缀</li>
<li>在 <code>extra_header</code> 段中加载编辑器特有的脚本和样式</li>
<li>使用 <code>ModulesManager.using()</code> 确保依赖加载完成</li>
</ul>

<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。CUI 模型从 11.0 开始逐步引入。</em></p>
