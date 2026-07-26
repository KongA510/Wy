<template>
  <article class="doc-content">
    <h1>CUI 网格与插件</h1>
    <blockquote>
      <p>CUI Grid 将标准 Grid 组件注入业务逻辑。通过<strong>插件（Plugin）机制</strong>实现功能扩展，插件基于 CUI Location 或 ItemType 动态应用到 Grid 上。</p>
    </blockquote>

    <h2>一、位置</h2>
    <p><code>Innovator/Client/Modules/cui/cuiGridControl.ts</code></p>

    <h2>二、公共 API</h2>
    <pre v-pre><code class="language-typescript">// cuiGridControl — CUI 网格入口
function cuiGridControl(
  component: Grid | null,
  componentData: CuiGrid,
  options: CuiLayoutOptions
): Promise&lt;CuiGridControl | null&gt;

// cuiGrid — 底层网格注入函数
function cuiGrid(
  control: Grid,
  options?: BaseGridPluginOptions
): Promise&lt;Object&gt;</code></pre>

    <h3>componentData 参数</h3>
    <table>
      <thead><tr><th>字段</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>id</code></td><td>CUI Grid Control ID</td></tr>
        <tr><td><code>name</code></td><td>CUI Grid Control 名称</td></tr>
        <tr><td><code>CuiRules</code></td><td>附加的 CUI Rules 列表（可选）</td></tr>
      </tbody>
    </table>

    <h3>options 参数</h3>
    <table>
      <thead><tr><th>字段</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>itemTypeId</code></td><td>ItemType ID（可选）</td></tr>
        <tr><td><code>relatedItemTypeId</code></td><td>关联的 ItemType ID（可选）</td></tr>
        <tr><td><code>plugins</code></td><td>插件数组（可选）</td></tr>
      </tbody>
    </table>

    <h2>三、插件机制（Plugin System）</h2>

    <h3>3.1 设计模式</h3>
    <p>插件基于<strong>责任链模式（Chain of Responsibility）</strong>——每个插件是一个 JS 对象，可以访问 Grid 实例和选项，通过装饰器模式扩展 Grid 的行为。</p>

    <h3>3.2 插件结构</h3>
    <pre v-pre><code class="language-javascript">// 网格插件标准结构
const myPlugin = {
  // 异步初始化 — 在 Grid 渲染前执行
  init: async function() {
    const thisPlugin = this;          // this = 插件实例
    const targetGrid = this.grid;     // Grid 实例
    const providedOptions = this.options; // 传入的配置
    // ...初始化逻辑（订阅事件、修改配置等）
  },

  // 同步后处理 — 在 Grid 渲染后执行
  setupAfterInit: function() {
    const targetGrid = this.grid;
    // ...渲染后处理（调整布局、注册键盘快捷键等）
  },

  // 单元格元数据装饰 — 每个单元格渲染时都会调用
  getCellMetadata: function(result, headId, itemId, type) {
    // result: 当前单元格的元数据对象（可修改）
    // headId: 列 ID
    // itemId: 行 ID
    // type: 单元格类型（'data' | 'header' | 'search'）
    return result;  // 返回修改后的元数据
  }
};</code></pre>

    <h3>3.3 完整插件示例</h3>
    <pre v-pre><code class="language-javascript">// 右键菜单插件
const contextMenuPlugin = {
  init: async function() {
    // 监听 Grid 的右键事件
    this.grid.addEventListener('contextmenu', (event) => {
      const cellData = this.grid.getCellData(event.target);
      this.showContextMenu(event.clientX, event.clientY, cellData);
    });
  },

  setupAfterInit: function() {
    // 高亮可右键的列
    const contextColumns = ['name', 'item_number'];
    const head = this.grid.head;
    for (const colId of contextColumns) {
      if (head.has(colId)) {
        head.set(colId, 'contextMenu', true);
      }
    }
  },

  showContextMenu(x, y, cellData) {
    const menu = document.createElement('aras-context-menu');
    menu.state = {
      context: { itemId: cellData.rowId, itemType: cellData.itemType }
    };
    document.body.appendChild(menu);
    menu.show(x, y);
  }
};</code></pre>

    <pre v-pre><code class="language-javascript">// 行高亮插件 — 根据状态改变行颜色
const rowHighlightPlugin = {
  getCellMetadata: function(result, headId, itemId, type) {
    if (type === 'data') {
      const rowData = this.grid.rows.get(itemId);
      const state = rowData?.__status || rowData?.current_state;

      switch (state) {
        case 'Obsolete':
          result.className = 'row-obsolete';
          result.style = { backgroundColor: '#fde8e8' };
          break;
        case 'Preliminary':
          result.className = 'row-preliminary';
          result.style = { backgroundColor: '#fef3c7' };
          break;
        case 'Released':
          result.className = 'row-released';
          result.style = { backgroundColor: '#d1fae5' };
          break;
      }
    }
    return result;
  }
};</code></pre>

    <h2>四、在 CUI 中注册 Grid 插件</h2>
    <pre v-pre><code class="language-javascript">// 方式1：通过 cuiGridControl 传入插件
cuiGridControl(gridComponent, componentData, {
  itemTypeId: '4F1AC04A...',
  plugins: [
    rowHighlightPlugin,
    contextMenuPlugin,
    inlineEditPlugin
  ]
});

// 方式2：通过 CUI Rules 数据库配置
// 在 CUI Rule 的 AML 中定义插件与 ItemType/Location 的关联
// 由 cuiGridControl 自动加载</code></pre>

    <div class="tip-box">
      <strong>⚠️ 限制</strong>：插件无法在 Grid 运行时动态添加。必须在调用 <code>cuiGrid</code> 或 <code>cuiGridControl</code> 时一次性提供所有插件。
    </div>

    <h2>五、插件应用顺序</h2>
    <pre v-pre><code class="language-text">cuiGrid 初始化流程：
1. 创建 Grid 实例
2. 遍历 plugins 数组，按顺序执行
3. 每个插件的 init() 被调用（await）
4. Grid 渲染（render）
5. 每个插件的 setupAfterInit() 被调用
6. 用户操作 → getCellMetadata() 被反复调用</code></pre>

    <hr />
    <p><em>适用版本：Aras Innovator 14.x / 2025R。插件机制从 14.0 开始完善。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
