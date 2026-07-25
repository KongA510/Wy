<template>
  <article class="doc-content">
    <h1>权限模型与 Identity</h1>
    <blockquote>
      <p>Aras Innovator 的权限体系基于 <strong>Identity → Permission → ItemType</strong> 三层模型。Identity 代表用户身份，Permission 定义访问规则，ItemType 上的权限配置决定谁能做什么。</p>
    </blockquote>

    <h2>一、权限模型概览</h2>
    <pre v-pre><code class="language-text">┌──────────────┐
│    User       │  每个 Aras 用户
└──────┬───────┘
       │ 属于
       ▼
┌──────────────┐
│   Identity    │  角色/身份（如 Engineer, Manager, World）
└──────┬───────┘
       │ 拥有
       ▼
┌──────────────┐
│  Permission   │  访问规则（Can Get, Can Add, Can Edit, Can Delete...）
└──────┬───────┘
       │ 绑定在
       ▼
┌──────────────┐
│   ItemType    │  Part, Document, ECR, etc.
└──────────────┘</code></pre>

    <h2>二、Identity 类型</h2>
    <table>
      <thead><tr><th>Identity</th><th>说明</th><th>典型用途</th></tr></thead>
      <tbody>
        <tr><td><strong>World</strong></td><td>所有登录用户（匿名用户归类于此）</td><td>基础读取权限</td></tr>
        <tr><td><strong>Authenticated Users</strong></td><td>所有已验证的用户</td><td>登录后可见的内容</td></tr>
        <tr><td><strong>Owner</strong></td><td>Item 的创建者（created_by_id）</td><td>允许用户修改自己的数据</td></tr>
        <tr><td><strong>Aras PLM</strong></td><td><strong>超级管理员身份</strong></td><td>后台 Method 权限提升，绕过所有权限检查</td></tr>
        <tr><td><strong>Administrators</strong></td><td>管理员组</td><td>系统配置、用户管理</td></tr>
        <tr><td><strong>自定义 Identity</strong></td><td>业务角色（如 "Engineer", "Reviewer"）</td><td>按业务角色分配权限</td></tr>
        <tr><td><strong>Team Identity</strong></td><td>动态组成员身份</td><td>项目团队、审批小组</td></tr>
      </tbody>
    </table>

    <h2>三、Permission 类型</h2>
    <table>
      <thead><tr><th>Permission</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><strong>Can Get</strong></td><td>允许查询/读取数据</td></tr>
        <tr><td><strong>Can Add</strong></td><td>允许创建新记录</td></tr>
        <tr><td><strong>Can Edit</strong></td><td>允许修改记录</td></tr>
        <tr><td><strong>Can Delete</strong></td><td>允许删除记录</td></tr>
        <tr><td><strong>Can Promote</strong></td><td>允许推进生命周期状态</td></tr>
        <tr><td><strong>Can Check In / Check Out</strong></td><td>允许文件的检入检出</td></tr>
        <tr><td><strong>Can Change Permission</strong></td><td>允许修改权限设置（仅管理员）</td></tr>
        <tr><td><strong>Can Discover</strong></td><td>允许在搜索/列表中看到该 ItemType</td></tr>
      </tbody>
    </table>

    <h2>四、生命周期状态权限</h2>
    <p>每个生命周期状态可以有不同的权限规则。例如：</p>
    <ul>
      <li><strong>Preliminary</strong>（初步）：Owner 可编辑、删除</li>
      <li><strong>In Review</strong>（审核中）：仅 Reviewer Identity 可推进，禁止编辑</li>
      <li><strong>Released</strong>（已发布）：所有人只读，仅管理员可修改</li>
    </ul>

    <h2>五、特殊 Identity</h2>
    <h3>5.1 Super User</h3>
    <p><code>root</code> 用户拥有系统最高权限，用于系统初始化和维护。不应用于日常 Method 开发。</p>

    <h3>5.2 Aras PLM Identity</h3>
    <p>这是一个<strong>服务端专用的超级身份</strong>，代码通过 <code>Permissions.GrantIdentity()</code> 临时获取。使用方法见"权限提升代码模板"。</p>

    <h2>六、权限检查逻辑</h2>
    <p>当用户执行操作时，Aras 引擎按以下顺序检查：</p>
    <ol>
      <li>用户是否属于 Super User？→ 允许所有操作</li>
      <li>用户是否持有当前生命周期的对应 Permission？→ 允许</li>
      <li>用户是否通过所属 Identity 间接持有 Permission？→ 允许</li>
      <li>以上都不满足 → 拒绝操作</li>
    </ol>

    <p><strong>参考来源：</strong></p>
    <ul>
      <li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/Aras%20Innovator%20Methodology.htm">Aras Innovator Methodology — Permissions</a></li>
      <li><a href="https://www.aras.com/community/f/development/37695/how-to-use-grantidentity/8991">How to use GrantIdentity — Aras Community</a></li>
    </ul>
  </article>
</template>
