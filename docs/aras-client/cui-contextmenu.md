---
title: CUI 右键菜单
---

<h1>CUI 右键菜单</h1>
<blockquote>
<p>CUI Context Menu 与其他 CUI 控件工作方式一致，根据提供的 CUI 数据在指定位置初始化<strong>右键菜单组件</strong>。菜单支持多层嵌套结构和动态可见性计算。</p>
</blockquote>

<h2>一、位置</h2>
<p><code>Innovator/Client/Modules/cui/cuiContextMenu.js</code></p>

<h2>二、公共 API</h2>

```javascript
function cuiContextMenu(
  control: ContextMenu,     // ContextMenu Web Component
  location: String,         // CUI Location 名称
  options?: Object          // 可选配置
): Promise<{
  show(): void,             // 显示菜单（自动计算可见项）
  destroy(): void           // 销毁菜单
}>
```


<h2>三、CUI 数据结构</h2>
<p>CUI Context Menu 的数据包含两个语义组：</p>

<table>
<thead><tr><th>属性</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>data</code></td><td>存储所有嵌套菜单项的完整信息（扁平结构）</td></tr>
<tr><td><code>roots</code></td><td>指向第一层菜单项的 ID 列表</td></tr>
</tbody>
</table>

<h3>3.1 单层菜单项</h3>

```javascript
// 普通菜单项 — 没有子菜单
{
  "@type": "CommandBarMenu",
  "@typeId": "B5175846B27145EEA5653DA35ED78BE4",
  "@id": "83C93103439243ADB2A8472FC743EB1B",
  "id": "83C93103439243ADB2A8472FC743EB1B",
  "label": "打开",
  "name": "com.aras.innovator.cui_default.pmig_View",
  "on_click_handler@keyed_name": "cui_default_mwt_onViewCommand",
  "on_click_handler@type": "Method",
  "on_click_handler": "74217FBDC2554604A543BDEFA8A64ED5",
  "on_init_handler@keyed_name": "initPopupItemInItemsGrid",
  "on_init_handler": "2B56E062A54245B7851FA09CFD224882",
  "itemtype": "B5175846B27145EEA5653DA35ED78BE4",
  "sort_order": "128"
}
```


<h3>3.2 嵌套菜单项（父菜单）</h3>

```javascript
// 父菜单项 — 有子菜单
{
  "@type": "CommandBarMenu",
  "@id": "45ACD568CFC0489BA7D5365C19208ADB",
  "id": "45ACD568CFC0489BA7D5365C19208ADB",
  "name": "com.aras.innovator.cui_default.pmig_testMenu",
  "label": "更多操作",
  "sort_order": "0",
  // roots: 指定第一层子菜单项（通过 name 引用）
  "roots": [
    "com.aras.innovator.cui_default.pmig_edit",
    "com.aras.innovator.cui_default.pmig_delete",
    "com.aras.innovator.cui_default.pmig_copy"
  ],
  // data: 子菜单项的完整定义
  "data": [
    {
      "id": "F51ED660F0F44636B45BA023EF64DBE7",
      "name": "com.aras.innovator.cui_default.pmig_edit",
      "label": "编辑",
      "on_click_handler": "cui_default_mwt_onEditCommand"
    },
    // ...更多子项
  ]
}
```


<h2>四、完整使用示例</h2>

<h3>4.1 网格右键菜单</h3>

```javascript
// Grid 右键菜单插件
const gridContextMenuPlugin = {
  init: async function() {
    const grid = this.grid;

    grid.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      const rowId = grid.getRowIdFromEvent(e);
      const rowData = grid.rows.get(rowId);

      // 初始化右键菜单
      const contextMenu = document.createElement('aras-context-menu');
      document.body.appendChild(contextMenu);

      cuiContextMenu(
        contextMenu,
        'Item_Grid_Popup_Menu',
        {
          context: {
            itemId: rowData.id,
            itemType: rowData.type,
            selectedRows: grid.settings.selectedRows
          }
        }
      ).then(({ show, destroy }) => {
        // 自动处理 on_init_handler 控制可见性
        show();  // 自动计算可见菜单项后显示

        // 点击菜单外部时销毁
        document.addEventListener('click', function handler() {
          destroy();
          document.removeEventListener('click', handler);
        });
      });
    });
  }
};
```


<h3>4.2 直接创建 Context Menu</h3>

```javascript
import { cuiContextMenu } from './cui/cuiContextMenu';

function showCustomMenu(x, y, contextData) {
  const menu = document.createElement('aras-context-menu');
  menu.style.position = 'absolute';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  document.body.appendChild(menu);

  return cuiContextMenu(menu, 'My_Custom_Menu_Location', {
    context: contextData  // 传递给 on_init_handler 的上下文
  }).then(({ show, destroy }) => {
    show();
    return { destroy };
  });
}

// 使用
showCustomMenu(300, 200, {
  itemId: 'ABC123',
  itemType: 'Part',
  selectedIds: ['ABC123', 'DEF456']
}).then(({ destroy }) => {
  // 关闭菜单: destroy()
});
```


<h3>4.3 on_init_handler — 动态控制菜单项可见性</h3>

```javascript
// 客户端 Method: initPopupItemInItemsGrid
// 根据选中状态动态显示/隐藏菜单项

function initPopupItemInItemsGrid(context) {
  const selectedCount = context.selectedRows?.length || 0;
  const isSingle = selectedCount === 1;
  const isMulti = selectedCount > 1;

  return {
    // 单条操作：选中单条时显示
    'com.aras.innovator.cui_default.pmig_View': {
      visible: isSingle
    },
    'com.aras.innovator.cui_default.pmig_Edit': {
      visible: isSingle
    },
    // 批量操作：选中多条时显示
    'com.aras.innovator.cui_default.pmig_BatchDelete': {
      visible: isMulti
    },
    'com.aras.innovator.cui_default.pmig_Export': {
      visible: selectedCount > 0
    }
  };
}
```


<h2>五、注意事项</h2>
<ul>
<li><strong>不是所有 CUI Context Menu 都通过 CUI Layout 初始化</strong>——部分菜单仍由特定代码手动触发</li>
<li><code>show()</code> 前会自动计算可见菜单项，如果所有项都不可见，方法直接返回</li>
<li><code>destroy()</code> 必须在菜单不再需要时调用，避免内存泄漏</li>
<li>嵌套菜单通过 <code>roots</code> + <code>data</code> 扁平结构实现多层展开</li>
</ul>

<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。</em></p>
