<template>
  <article class="doc-content">
    <h1>开发原则</h1>
    <blockquote>
      <p>Aras Innovator 客户端开发的核心原则：<strong>兼容性</strong>、<strong>可支持性</strong>和<strong>可复用性</strong>。这些原则指导着客户端代码库的每一个决策。</p>
    </blockquote>

    <h2>一、兼容性（Compatibility）</h2>
    <p>作为长期演进的产品，对<strong>已有功能的零破坏容忍度</strong>：</p>
    <ul>
      <li><strong>绝不修改公共 API</strong>：在主要更新（Service Pack）中，公有 API 保持稳定不变</li>
      <li><strong>绝不修改数据库相关代码</strong>：DB Schema 和存储过程在 SP 中不允许变更</li>
      <li>重构内部实现时，必须<strong>提供清晰的迁移工具和指引</strong></li>
    </ul>

    <div class="tip-box">
      <strong>⚠️ 重要</strong>：公共 API 是合约，一旦发布就必须向后兼容。新增功能通过扩展而非修改实现。
    </div>

    <h2>二、可支持性（Supportability）</h2>
    <p>代码是写给人看的，是给后来者维护的：</p>
    <ul>
      <li><strong>优先选择清晰易懂的方案</strong>，而非精巧但晦涩的抽象</li>
      <li><strong>新代码必须附带单元测试</strong>，测试应尽可能贴近真实业务场景</li>
      <li><strong>文档与代码同步</strong>：如果能为代码提供文档，请务必编写</li>
      <li><strong>复杂逻辑加注释</strong>：若某段代码存在"陷阱"或特殊原因，在 commit 信息或代码注释中说明</li>
    </ul>

    <h2>三、可复用性（Reusability）</h2>
    <p>核心技巧在于<strong>通用逻辑</strong>与<strong>业务逻辑</strong>的分离：</p>

    <h3>3.1 通用逻辑（General Logic）</h3>
    <p>可以在不同上下文中以完全相同或可定制的方式使用的逻辑：</p>
    <table>
      <thead><tr><th>原则</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><strong>KISS（保持简单）</strong></td><td>组件功能尽可能简单，不添加不必要的抽象</td></tr>
        <tr><td><strong>YAGNI（不做多余功能）</strong></td><td>不预先实现未来可能需要但实际上用不到的功能</td></tr>
        <tr><td><strong>纯组件</strong></td><td>组件应能在<strong>纯 HTML 页面</strong>中独立运行，不依赖特定业务上下文</td></tr>
        <tr><td><strong>确定性</strong></td><td>相同输入始终产生相同输出，单一职责原则</td></tr>
      </tbody>
    </table>

    <h3>3.2 业务逻辑（Business Logic）</h3>
    <p>特定位置的特定逻辑，了解其所处环境并与周边组件通信：</p>
    <ul>
      <li>点击某处执行某操作、按键触发的行为</li>
      <li>不同页面区域之间的数据交互</li>
      <li>脱离原始上下文后无意义的逻辑</li>
    </ul>

    <h2>四、通用 UI 组件示例</h2>

    <h3>工具栏组件 — 纯通用组件的最佳范例</h3>
    <pre v-pre><code class="language-javascript">// Toolbar 组件本身不包含任何业务逻辑
// 它可以被用在：Header、搜索栏、分页器、加载进度条等任何场景
const toolbar = document.createElement('aras-toolbar');

// 设置数据 — 完全由调用方决定内容和行为
toolbar.data = new Map([
  ['btn_save', {
    type: 'button',
    label: '保存',
    icon: '../images/save.svg',
    onclick: () => saveCurrentItem()
  }],
  ['btn_delete', {
    type: 'button',
    label: '删除',
    icon: '../images/delete.svg',
    disabled: true,        // 无选中项时禁用
    onclick: () => deleteSelected()
  }],
  ['sep1', { type: 'separator' }],
  ['btn_refresh', {
    type: 'button',
    label: '刷新',
    icon: '../images/refresh.svg',
    onclick: () => reloadGrid()
  }]
]);

toolbar.container = ['btn_save', 'btn_delete', 'sep1'];
toolbar.rightContainer = ['btn_refresh'];</code></pre>

    <h2>五、实践清单</h2>
    <table>
      <thead><tr><th>检查项</th><th>标准</th></tr></thead>
      <tbody>
        <tr><td>是否修改了公共 API？</td><td>不允许在 SP 中修改</td></tr>
        <tr><td>新功能是否有单测？</td><td>必须覆盖</td></tr>
        <tr><td>组件是否可独立运行？</td><td>应可在纯 HTML 页面中测试</td></tr>
        <tr><td>复杂逻辑是否有注释？</td><td>commit 或代码注释</td></tr>
        <tr><td>是否考虑了向后兼容？</td><td>旧 API 至少保持一个版本过渡期</td></tr>
      </tbody>
    </table>

    <hr />
    <p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。这些原则来源于 Aras 官方客户端团队内部开发规范。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
