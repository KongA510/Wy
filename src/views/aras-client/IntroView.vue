<template>
  <article class="doc-content">
    <h1>快速入门</h1>
    <blockquote>
      <p>本文档面向 <strong>Aras Innovator 客户端开发人员</strong>以及希望按照业务需求定制 Innovator 用户界面的开发者。涵盖客户端代码结构、公共 API、设计理念以及推荐实践。</p>
    </blockquote>

    <h2>一、文档目的</h2>
    <p>Aras Innovator 客户端文档旨在帮助开发者：</p>
    <ul>
      <li>理解客户端代码的<strong>组织结构</strong>与模块划分</li>
      <li>掌握<strong>CUI（可配置用户界面）</strong>引擎的工作原理</li>
      <li>使用<strong>Web Components 组件库</strong>（Grid、Toolbar、Menu 等）</li>
      <li>开发和扩展<strong>自定义编辑器</strong>与<strong>仪表板 Widget</strong></li>
    </ul>

    <h2>二、文档结构</h2>
    <table>
      <thead><tr><th>章节</th><th>内容</th><th>适合人群</th></tr></thead>
      <tbody>
        <tr><td><strong>概述</strong></td><td>开发原则、项目结构</td><td>所有开发者</td></tr>
        <tr><td><strong>核心 API</strong></td><td>API 概览、属性事件模型、自定义编辑器</td><td>UI 定制开发者</td></tr>
        <tr><td><strong>CUI 引擎</strong></td><td>布局、控件、工具栏、网格、右键菜单</td><td>深度定制开发者</td></tr>
        <tr><td><strong>Web Components</strong></td><td>Grid、Toolbar、Menu 组件 API</td><td>组件级开发者</td></tr>
        <tr><td><strong>仪表板</strong></td><td>仪表板、Widget 开发、上下文共享</td><td>仪表板开发者</td></tr>
      </tbody>
    </table>

    <h2>三、技术栈</h2>
    <table>
      <thead><tr><th>技术</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><strong>Web Components (Custom Elements)</strong></td><td>Grid、Toolbar、Menu 等组件均为原生 Web Components</td></tr>
        <tr><td><strong>HyperHTML</strong></td><td>轻量级 DOM 渲染库，用于组件模板绑定</td></tr>
        <tr><td><strong>AMD / ES Modules</strong></td><td>模块化加载方案，支持 <code>window.ModulesManager</code></td></tr>
        <tr><td><strong>CUI 数据模型</strong></td><td>服务端定义的 UI 结构（ItemType 存储），客户端引擎解析渲染</td></tr>
        <tr><td><strong>Single Item Store</strong></td><td>单向数据流状态管理，类似 Redux 模式</td></tr>
      </tbody>
    </table>

    <h2>四、CUI 核心理念</h2>
    <p><strong>CUI（Configurable User Interface，可配置用户界面）</strong>是 Aras 客户端的核心架构概念：</p>
    <ul>
      <li>界面由<strong>数据模型</strong>定义（存储在数据库中），而非硬编码布局</li>
      <li><strong>CUI 引擎</strong>负责解析数据、初始化控件、建立控件间通信</li>
      <li>修改 UI 布局<strong>无需编写代码</strong>，只需修改 CUI 数据配置</li>
    </ul>
    <pre v-pre><code class="language-text">CUI 架构三大组件：
┌──────────────────────────────────────────┐
│  1. 数据模型（ItemType: CUI 元素定义）     │
│  2. CUI 引擎（布局 + 控件解析器）          │
│  3. 纯 UI 组件（Grid/Toolbar/Menu 等）    │
└──────────────────────────────────────────┘</code></pre>

    <h2>五、快速上手</h2>
    <h3>5.1 Hello World — 在 Form 中加载自定义工具栏</h3>
    <pre v-pre><code class="language-javascript">// 1. 获取 Aras 对象
const aras = top.aras;
const inn = aras.IomInnovator;

// 2. 使用 ModulesManager 加载模块
window.ModulesManager
  .using([
    'cui/cuiLayout',
    'cui/cuiControls',
    'components/toolbar'
  ])
  .then(function(CuiLayout, cuiControls, Toolbar) {
    // 3. 创建 CUI 布局实例
    const layout = new CuiLayout(
      document.getElementById('my-container'),
      'My_Custom_Location'  // CUI Location
    );

    // 4. 初始化布局（自动拉取 CUI 数据 + 渲染控件）
    return layout.init();
  });</code></pre>

    <h3>5.2 创建 Grid 组件</h3>
    <pre v-pre><code class="language-javascript">// 使用原生 aras-grid Web Component
const grid = document.createElement('aras-grid');
document.getElementById('grid-container').appendChild(grid);

// 设置列定义
grid.head = new Map([
  ['col1', { label: '零件号', width: 150, dataType: 'string' }],
  ['col2', { label: '名称', width: 200, dataType: 'string' }],
  ['col3', { label: '状态', width: 100, dataType: 'string' }]
]);

// 设置行数据
grid.rows = new Map([
  ['row1', { col1: 'P-001', col2: '螺栓 M8', col3: 'Released' }],
  ['row2', { col1: 'P-002', col2: '螺母 M8', col3: 'Preliminary' }]
]);

// 渲染
grid.render();</code></pre>

    <hr />
    <p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R (ICS50+)，基于客户端 JavaScript/TypeScript 框架。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
