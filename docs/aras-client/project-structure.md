---
title: 项目结构
---

# 项目结构
<blockquote>
<p>全面了解 Aras Innovator 客户端代码的目录组织结构、模块划分与文件说明。源仓库路径：<code>Innovator.git</code>。</p>
</blockquote>

## 一、核心目录：Innovator.git

### 1.1 AML-packages/
<p>存放以 <code>.xml</code> 文件形式存储在数据库中的<strong>数据结构和业务逻辑（Method）</strong>。</p>

### 1.2 Innovator/Client/
<p>客户端代码的核心目录，结构如下：</p>

<table>
<thead><tr><th>目录</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>buildScripts/</code></td><td>前端开发环境搭建脚本</td></tr>
<tr><td><code>images/</code></td><td>图标和图片资源存储</td></tr>
<tr><td><code>javascript/</code></td><td>遗留 JS 代码库，包含大量公共 API 模块</td></tr>
<tr><td><code>IncludeNamespaceConfig.xml</code></td><td>定义 JS 文件如何按区域拼接合并的映射配置</td></tr>
<tr><td><code>jsBundles/</code></td><td>所有打包后的 JS 文件，每个文件均为构建产物</td></tr>
</tbody>
</table>

### 1.3 Innovator/Client/Modules/（领域驱动组织）
<table>
<thead><tr><th>模块</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>aras/</code></td><td>主 Innovator 窗口的业务逻辑（非特定区域）</td></tr>
<tr><td><code>aras.innovator.*/</code></td><td>特定领域（如 ItemWindow、Search 等）的业务逻辑</td></tr>
<tr><td><strong><code>components/</code></strong></td><td><strong>可复用的纯组件</strong>，不绑定任何业务上下文</td></tr>
<tr><td><strong><code>core/</code></strong></td><td><strong>核心逻辑</strong>，不属于特定区域的通用服务</td></tr>
<tr><td><strong><code>cui/</code></strong></td><td><strong>CUI 引擎</strong>：处理 CUI 结构、布局、控件、逻辑处理器</td></tr>
<tr><td><code>NavigationPanel/</code></td><td>主导航面板的业务逻辑</td></tr>
<tr><td><code>polyfills/</code></td><td>自定义 Polyfill 文件</td></tr>
<tr><td><code>store/</code></td><td>Single Item Store 相关：Reducer、Action</td></tr>
</tbody>
</table>

### 1.4 其他重要目录
<table>
<thead><tr><th>目录</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>jsBundleList.json</code></td><td>模块到编译后 jsBundle 的映射表</td></tr>
<tr><td><code>nodejs/</code></td><td>打包和处理客户端代码的工具，编译过程在此定义</td></tr>
<tr><td><code>scripts/</code></td><td>各类视图的 HTML 页面及对应资源，按领域组织</td></tr>
<tr><td><code>Solutions/</code></td><td>以 Innovator 扩展形式存在的<strong>自定义项目</strong></td></tr>
<tr><td><code>styles/less/</code></td><td>样式和 XSLT 模板，推荐使用 <strong>BEM 命名</strong></td></tr>
</tbody>
</table>

## 二、测试目录：Innovator/Client/tests/
<table>
<thead><tr><th>目录/文件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>AML-packages/</code></td><td>从 AML-packages 提取并包装为函数的 Method，运行 <code>npm run build-aml-methods</code> 填充</td></tr>
<tr><td><code>coverage/</code></td><td>生成的代码覆盖率报告</td></tr>
<tr><td><code>css/</code></td><td>控件样式检查用的 HTML 页面（非自动化）</td></tr>
<tr><td><code>junit/</code></td><td>原始覆盖率数据</td></tr>
<tr><td><code>storybook/</code></td><td>动态 Web 页面，用于检查控件的样式和交互性</td></tr>
<tr><td><code>testCases/</code></td><td>单元测试文件，有三种命名规范</td></tr>
<tr><td><code>vendors/</code></td><td>复制的第三方库（不依赖 node_modules）</td></tr>
</tbody>
</table>

### 测试文件命名规范
<table>
<thead><tr><th>命名格式</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>{file}.js</code></td><td>遗留命名格式</td></tr>
<tr><td><code>{file}.spec.js</code></td><td>不可编译的单元测试</td></tr>
<tr><td><code>{file}.spec.es.js</code></td><td>可编译（ES Modules + 现代语法）且可打包</td></tr>
<tr><td><code>{file}.spec.amd.js</code></td><td>不可编译，基于 AMD 模块的测试</td></tr>
</tbody>
</table>

## 三、组件测试框架：Tests/ComponentTests/
<table>
<thead><tr><th>目录</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>baseline/</code></td><td>按测试场景组织的 Stub 响应：<code>.baseline</code>（哈希请求-响应对）、<code>.order</code>（多次相同请求的响应顺序）</td></tr>
<tr><td><code>CUI/</code></td><td>与 CUI 相关的 Stub 数据响应</td></tr>
<tr><td><code>InnovatorServer/</code></td><td>innovatorserver.aspx 请求的 Stub 响应</td></tr>
<tr><td><code>junit/</code></td><td>测试报告输出目录</td></tr>
<tr><td><code>preTestAMLs/</code></td><td>测试前置 AML 文件，用于准备数据库状态</td></tr>
<tr><td><code>src/</code></td><td>Stub 逻辑、公共模块、控件交互封装、测试场景</td></tr>
</tbody>
</table>

## 四、模块加载机制

```javascript
// ModulesManager — Aras 客户端模块加载器
// 用法：定义依赖，加载后执行回调
window.ModulesManager
  .using([
    'aras.innovator.core.ItemWindow/DefaultItemWindowView',
    'components/grid',
    'cui/cuiLayout'
  ])
  .then(function(DefaultItemWindowView, Grid, CuiLayout) {
    // 所有依赖加载完成，开始业务逻辑
    const view = new DefaultItemWindowView(inDom, inArgs);
    // ...
  });

// 常用脚本命令
// npm run build-aml-methods — 填充 AML 方法到测试目录
// npm run test — 运行 Karma 单元测试
// npm run test-html — 运行 HTML 页面单元测试
// npm run test-dev — 开发模式运行测试
```


<hr />
<p><em>适用版本：Aras Innovator 14.x / 2025R。目录结构基于 ICS50 标准客户端代码库。</em></p>
