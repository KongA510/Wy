---
title: IOM 总览与架构
---

<h1>IOM 总览与架构</h1>
<blockquote>
<p><strong>Innovator Object Model (IOM)</strong> 是 Aras Innovator 平台的核心编程框架。IOM 连接客户端、服务端和应用层，为开发者提供统一的 API 来操作 PLM 数据。</p>
</blockquote>

<h2>一、IOM 是什么</h2>
<p>IOM（Innovator Object Model）是一套面向对象的 API，封装了 Aras Innovator 数据库中 <strong>ItemType</strong> 的 CRUD 操作。无论是浏览器端 JavaScript 还是服务端 C#，开发者都通过 IOM 操作 Aras 数据。</p>

<h2>二、IOM 三层架构</h2>
<table>
<thead><tr><th>层级</th><th>运行环境</th><th>语言</th><th>典型用途</th></tr></thead>
<tbody>
<tr><td><strong>客户端 IOM</strong></td><td>浏览器</td><td>JavaScript</td><td>表单事件、工具栏按钮、客户端 Method</td></tr>
<tr><td><strong>服务端 IOM</strong></td><td>IIS 应用池</td><td>C# / VB.NET</td><td>服务端 Method、Server Event、业务逻辑</td></tr>
<tr><td><strong>.NET IOM SDK</strong></td><td>外部 .NET 应用</td><td>C# / VB.NET</td><td>外部集成、批量导入、后台任务</td></tr>
</tbody>
</table>

<h2>三、核心对象关系</h2>

```text
┌──────────────────────────────────────────────┐
│                  Innovator                    │  ← 入口对象，获取连接/用户
│  .newItem() .applySQL() .applyAML()          │
│  .getUserID() .getNewID()                    │
└──────────────┬───────────────────────────────┘
               │ 创建 / 查询
               ▼
┌──────────────────────────────────────────────┐
│                    Item                        │  ← 数据载体、DOM 模型
│  .setProperty() .getProperty()                │
│  .setAttribute() .getAttribute()              │
│  .apply() .promote() .getItemCount()          │
│  .addRelationship() .getRelatedItem()         │
└──────────────┬───────────────────────────────┘
               │ 包含
               ▼
┌──────────────────────────────────────────────┐
│                 Result (AML)                   │  ← 批量查询结果
│  .getItemByIndex() .getItemCount()            │
│  .isError() .getErrorString()                 │
└──────────────────────────────────────────────┘
```


<h2>四、命名空间速查</h2>
<table>
<thead><tr><th>命名空间</th><th>用途</th></tr></thead>
<tbody>
<tr><td><code>Aras.IOM</code></td><td>核心 IOM — Innovator、Item、命名常量</td></tr>
<tr><td><code>Aras.IOM.Innovator</code></td><td>数据库连接对象、用于外部 .NET 集成</td></tr>
<tr><td><code>Aras.Server.Security</code></td><td>Identity 权限模型、Permissions 类</td></tr>
<tr><td><code>Aras.Server.Core</code></td><td>服务端核心、Config 读取、日志</td></tr>
</tbody>
</table>

<h2>五、代码调用链：从前端到后端</h2>

```text
浏览器 JS                      IIS 服务端                      SQL Server
───────────                   ───────────                    ──────────
top.aras
  .newIOMInnovator()
  .applyMethod(name, body) ──→ this.getProperty()
                               inn.newItem("Part","get")
                               item.setProperty("id","xxx")
                               item.apply() ─────────────→ SELECT/INSERT/UPDATE
                               return result  ←─────────── Data
  ←── result.getResult()
  ←── result.isError()        
```


<h2>六、版本变更</h2>
<table>
<thead><tr><th>版本</th><th>主要变更</th></tr></thead>
<tbody>
<tr><td>R34 (2023)</td><td>服务端增强：异步 IOM 操作支持</td></tr>
<tr><td>R35 (2024)</td><td>.NET 8 支持，IOM 性能优化</td></tr>
<tr><td>R36 (2024)</td><td>RESTful API 扩展，GraphQL 支持</td></tr>
<tr><td><strong>R37 (2025)</strong></td><td>增强安全模型、Server Event 异步、AML 查询优化器</td></tr>
<tr><td><strong>2025R</strong></td><td>默认版本，改进错误处理与日志</td></tr>
</tbody>
</table>

<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/Introduction.htm">Aras Innovator Programmer's Guide</a></li>
<li><a href="https://www.aras.com/community/DocumentationLibrary/Library/Aras%20IOM%20API.htm">Aras IOM API Documentation</a></li>
<li><a href="https://myinnovator.com/Client/WebHelp/APIReferenceDotNet/Html/html/R_Project_Innovator-_NET-API-Reference.htm">Aras .NET API Reference</a></li>
</ul>
