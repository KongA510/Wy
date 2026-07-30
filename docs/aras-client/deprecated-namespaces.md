---
title: 命名空间总览
---

<h1>已弃用 API — 命名空间总览</h1>
<blockquote>
<p>该章节介绍了 Aras Innovator 客户端中<strong>已弃用（Deprecated）</strong>的 JavaScript API 命名空间。这些 API 是旧版客户端框架的遗留代码，已被新的 <strong>CUI（可配置用户界面）框架</strong>和 <strong>Web Components 组件库</strong>替代。</p>
<p>编写新代码时应优先使用 CUI API（Layout、Controls、Toolbar、Grid）和 Web Components（aras-grid、aras-toolbar、aras-menu），仅在维护旧代码时参考本页内容。</p>
</blockquote>

<h2>一、命名空间：Aras.Client.Controls.Public</h2>
<p>旧版客户端控件 API，包含 Grid、Toolbar、HtmlEditor、Vault 等底层控件。这些控件在 11.0-14.x 版本中被广泛使用，但已被新的 CUI 框架和 Web Components 替代。</p>

<h3>1.1 类列表</h3>
<table>
<thead><tr><th>类名</th><th>说明</th><th>迁移建议</th></tr></thead>
<tbody>
<tr>
<td>[<code>Cell</code>](/aras-client/deprecated-cell)</td>
<td>Grid 单元格对象，通过 <code>GridContainer.cells()</code> 返回。提供获取/设置值、样式、编辑状态等方法。</td>
<td>使用 <code>aras-grid</code> Web Component 的单元格 API</td>
</tr>
<tr>
<td>[<code>GridContainer</code>](/aras-client/deprecated-gridcontainer)</td>
<td>网格控件容器，提供完整的 Grid 操作 API（行管理、列管理、事件、选择、排序等）。</td>
<td>使用 <code>cuiGrid</code> / <code>cuiGridControl</code> 替代</td>
</tr>
<tr>
<td>[<code>HtmlEditor</code>](/aras-client/deprecated-htmleditor)</td>
<td>HTML 富文本编辑器控件，提供内容获取/设置、图片插入、启用/禁用等功能。</td>
<td>使用标准 Web 富文本编辑器方案</td>
</tr>
<tr>
<td>[<code>TreeGridContainer</code>](/aras-client/deprecated-treegridcontainer)</td>
<td>"树形模式"下的网格容器，支持树状层级展示数据的 Grid。</td>
<td>使用 <code>cuiTreeGrid</code> 替代</td>
</tr>
<tr>
<td>[<code>ToolbarItem</code>](/aras-client/deprecated-toolbaritem)</td>
<td>工具栏项对象，通过 <code>Toolbar.getItem()</code> 返回。</td>
<td>使用 <code>cuiToolbar</code> / <code>aras-toolbar</code> 替代</td>
</tr>
<tr>
<td>[<code>Toolbar</code>](/aras-client/deprecated-toolbar)</td>
<td>工具栏控件容器。</td>
<td>使用 <code>cuiToolbar</code> / <code>aras-toolbar</code> 替代</td>
</tr>
<tr>
<td>[<code>Vault</code>](/aras-client/deprecated-vault)</td>
<td>文件保险库（<code>aras.vault</code>），提供批量文件上传/下载和文件操作能力。</td>
<td>使用新的文件管理 API</td>
</tr>
<tr>
<td>[<code>Utils</code>](/aras-client/deprecated-utils)</td>
<td>工具类（<code>aras.utils</code>），提供剪贴板操作、IE 窗口管理等辅助方法。</td>
<td>使用标准浏览器 API 替代</td>
</tr>
</tbody>
</table>

<h2>二、命名空间：Aras.Modules.CMF.Public</h2>
<p>CMF（Configurable Molding Form）框架的公共 API。CMF 是 Aras 的旧版表单引擎，采用树形架构的文档模型。该框架已被 CUI 完全取代。</p>

<h3>2.1 CMF 架构概念</h3>
<p>CMF 文档是一棵树形结构，包含以下核心概念：</p>
<ul>
<li><strong>Element（元素）</strong>：树中的一个节点</li>
<li><strong>PropertyItem（属性项）</strong>：网格中的一个单元格</li>
<li><strong>Style（样式）</strong>：对应 <code>cmf_Style</code> ItemType，定义元素的外观</li>
<li><strong>MappingModel（映射模型）</strong>：定义文档元素与业务对象之间的绑定关系</li>
<li><strong>Factory（工厂）</strong>：使用"工厂方法"模式创建 CMF 类实例</li>
</ul>

<h3>2.2 类列表</h3>
<table>
<thead><tr><th>类名</th><th>说明</th><th>迁移建议</th></tr></thead>
<tbody>
<tr>
<td>[<code>CmfStyle</code>](/aras-client/deprecated-cmfstyle)</td>
<td>支持与 <code>cmf_Style</code> ItemType 相同样式属性的样式类。属性：backgroundColor, textColor, fontFamily, fontSize, fontStyle, fontWeight, textDecoration, textAlign。</td>
<td>使用 CSS / 内联样式替代</td>
</tr>
<tr>
<td>[<code>ComputeMethodResultBuilder</code>](/aras-client/deprecated-computeresult)</td>
<td>在 CMF Compute Method 中用于构建结果的对象。通过 <code>markToUpdateStyle</code> 和 <code>markToUpdateValue</code> 标记要更新的属性。</td>
<td>使用 CUI Controls API 的 setState 机制</td>
</tr>
<tr>
<td>[<code>Element</code>](/aras-client/deprecated-element)</td>
<td>CMF 树中的一个节点。属性：id, parentId, boundItemId, type, name。</td>
<td>使用 CUI 控件数据模型</td>
</tr>
<tr>
<td>[<code>Factory</code>](/aras-client/deprecated-factory)</td>
<td>"工厂方法"模式创建 CMF 类实例。提供 createMappingModel、createCmfStyle、findDescendantElements 方法。</td>
<td>使用标准 JavaScript 构造函数</td>
</tr>
<tr>
<td>[<code>PropertyItem</code>](/aras-client/deprecated-propertyitem)</td>
<td>CMF 网格中的一个单元格。属性：id, value, type, cmfStyle。</td>
<td>使用 <code>aras-grid</code> 单元格 API</td>
</tr>
<tr>
<td>[<code>Tree</code>](/aras-client/deprecated-tree)</td>
<td>在 CMF 文档树中搜索元素的类。方法：findElementWithBinding。</td>
<td>使用 CUI 控件查找 API</td>
</tr>
<tr>
<td>[<code>MappingModel</code>](/aras-client/deprecated-mappingmodel)</td>
<td>文档元素与业务对象之间的绑定映射。属性：sourceId, relatedId, action, parentSourceId。</td>
<td>使用 CUI data binding 机制</td>
</tr>
</tbody>
</table>

<h2>三、迁移时间线</h2>
<table>
<thead><tr><th>版本</th><th>API 状态</th></tr></thead>
<tbody>
<tr><td>Aras 11.0</td><td>Aras.Client.Controls.Public 是主要客户端 API</td></tr>
<tr><td>Aras 12.0</td><td>CUI 框架引入，旧 API 开始逐步弃用</td></tr>
<tr><td>Aras 14.x</td><td>CUI 框架成熟，Web Components 成为标准组件库，旧 API 全面标记为 Deprecated</td></tr>
<tr><td>2025R+</td><td>完全使用 CUI + Web Components 架构，不建议再使用 Deprecated API</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 迁移指南：</strong>
<ul style="margin-top: 8px;">
<li>Grid/GridContainer → 使用 <code>cuiGrid()</code> 或 <code>&lt;aras-grid&gt;</code></li>
<li>Toolbar/ToolbarItem → 使用 <code>cuiToolbar()</code> 或 <code>&lt;aras-toolbar&gt;</code></li>
<li>HtmlEditor → 使用 <code>&lt;aras-html-editor&gt;</code> Web Component</li>
<li>CMF 表单 → 使用 <strong>CUI Layout + Controls</strong> 重新构建</li>
<li>Vault → 使用新的文件服务 API</li>
<li>Utils → 使用标准浏览器 API</li>
</ul>
</div>

<hr />
<p><em>适用版本：Aras Innovator 11.0-14.x（已弃用）。2025R 起不再推荐使用。</em></p>
