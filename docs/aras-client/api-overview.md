---
title: API 概览
---

# API 概览
<blockquote>
<p>Aras Innovator 客户端 API 分为四大领域：<strong>Core（核心）</strong>、<strong>CUI（可配置用户界面）</strong>、<strong>Components（组件）</strong>和 <strong>Dashboards（仪表板）</strong>。</p>
</blockquote>

## 一、Core（核心层）
<p>核心模块位于 <code>Innovator/Client/Modules/core/</code>，提供客户端运行的基础服务：</p>
<ul>
<li><strong>网络请求管理</strong>—— 与服务端的 AML 通信</li>
<li><strong>文件加载器</strong>—— 统一资源加载接口</li>
<li><strong>事件总线</strong>—— 跨模块消息通信</li>
<li><strong>状态管理</strong>—— Single Item Store（单向数据流）</li>
</ul>

## 二、CUI（可配置用户界面引擎）
<p>文件位于 <code>Innovator/Client/Modules/cui/</code>，这是客户端架构的核心创新：</p>

### 2.1 设计理念
<p>界面不由"硬编码"布局定义，而是由<strong>结构化的控件定义模型</strong>组成，这些模型组合在<strong>布局（Layout）</strong>中。好处：</p>
<ul>
<li>无需编码即可根据业务目标修改 UI</li>
<li>平台负责解析、初始化、启动和运行所有控件</li>
<li>控件间具有正确的顺序、嵌套和关联关系</li>
</ul>

### 2.2 三大组成部分
<table>
<thead><tr><th>组件</th><th>职责</th><th>文档</th></tr></thead>
<tbody>
<tr><td><strong>数据模型及其规则</strong></td><td>以 ItemType 存储的 CUI 元素定义</td><td>—</td></tr>
<tr><td><strong>CUI 引擎</strong></td><td>根据数据构建 UI，控制控件生命周期</td><td><a href="/aras-client/cui-layout">CUI 布局引擎</a>、<a href="/aras-client/cui-controls">CUI 控件体系</a></td></tr>
<tr><td><strong>纯 UI 组件</strong></td><td>可被 CUI 引擎注入数据和业务逻辑的通用组件</td><td>见下方 Components 节</td></tr>
</tbody>
</table>

## 三、Components（纯 UI 组件库）
<p>文件位于 <code>Innovator/Client/Modules/components/</code>，提供<strong>不绑定业务上下文</strong>的可复用组件：</p>
<table>
<thead><tr><th>组件</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>Grid</strong></td><td>Web Component</td><td>动态表格，支持虚拟滚动、批量更新、冻结列</td></tr>
<tr><td><strong>TreeGrid</strong></td><td>Web Component</td><td>树形表格</td></tr>
<tr><td><strong>Nav</strong></td><td>Web Component</td><td>导航组件</td></tr>
<tr><td><strong>Toolbar</strong></td><td>Web Component</td><td>工具栏容器</td></tr>
<tr><td><strong>Pagination</strong></td><td>继承自 Toolbar</td><td>分页组件</td></tr>
<tr><td><strong>Accordion</strong></td><td>Web Component</td><td>手风琴/折叠面板</td></tr>
<tr><td><strong>Menu</strong></td><td>Web Component</td><td>菜单（支持嵌套）</td></tr>
</tbody>
</table>

## 四、Dashboards（仪表板）
<p>文件位于 <code>Innovator/Client/Modules/dashboards/</code>，支持显示带有多个 Widget 的仪表板：</p>
<ul>
<li><strong>Grid Widget</strong> — 表格数据展示</li>
<li><strong>TreeGrid Widget</strong> — 树形表格展示</li>
<li><strong>Report Widget</strong> — 报表展示</li>
<li><strong>Static Layout</strong> — 静态布局定制</li>
<li><strong>Context Sharing</strong> — Widget 间数据共享</li>
</ul>

## 五、架构全景图

```text
Aras 客户端架构层次
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [仪表板层] Dashboards / Widgets
       ↓
  [业务逻辑层] aras.innovator.* / NavigationPanel
       ↓
  [CUI 引擎层] CUI Layout + CUI Controls + CUI Data
       ↓
  [组件层] Grid / Toolbar / Menu / TreeGrid / Pagination
       ↓
  [核心层] Core: Network / Store / EventBus / FileLoader
```


<hr />
<p><em>适用版本：Aras Innovator 12.0+ / 14.x / 2025R。</em></p>
