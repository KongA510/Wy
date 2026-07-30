---
title: 权限提升代码模板
---

# 权限提升代码模板
<blockquote>
<p>在服务端 Method 中执行 <code>applySQL</code>、跨用户数据操作或需要绕过普通权限检查时，必须使用 <strong>Aras PLM Identity</strong> 进行权限提升。这是 Aras 服务端开发的<strong>最核心安全模式</strong>。</p>
</blockquote>

## 一、标准模板

```csharp
// ===== 权限提升标准模板 =====
Aras.Server.Security.Identity plmIdentity =
    Aras.Server.Security.Identity.GetByName("Aras PLM");
bool PermissionWasSet =
    Aras.Server.Security.Permissions.GrantIdentity(plmIdentity);

try
{
    // ===== 在此处编写受保护的业务逻辑 =====
    var inn = this.newInnovator();

    // applySQL 需要 Aras PLM Identity
    var result = inn.applySQL("select * from innovator.PART ...");

    // 跨用户数据操作
    var otherUserData = inn.newItem("User", "get");
    // ...

    return inn.newResult(ProcessData(result));
    // =====================================
}
catch (Exception ex)
{
    return this.getInnovator().newError(
        "MethodName: " + ex.Message);
}
finally
{
    // 无论成功与否，必须释放提升的权限
    if (PermissionWasSet)
        Aras.Server.Security.Permissions.RevokeIdentity(plmIdentity);
}
```


## 二、命名空间引用

```csharp
// 服务端 Method 中以下命名空间已自动引用：
// Aras.IOM
// Aras.Server.Security
// Newtonsoft.Json (部分版本)
// System, System.Collections.Generic, System.Linq 等

// 如果编译错误，手动添加：
using Aras.Server.Security;
```


## 三、为什么需要权限提升？
<table>
<thead><tr><th>操作</th><th>是否需要权限提升</th><th>原因</th></tr></thead>
<tbody>
<tr><td><code>inn.newItem("X","get").apply()</code></td><td>视情况</td><td>如果查询的是用户无权访问的 ItemType，需要</td></tr>
<tr><td><code>inn.newItem("X","add").apply()</code></td><td>视情况</td><td>如果用户无权创建该类型，需要</td></tr>
<tr><td><code>inn.applySQL(...)</code></td><td>✅ <strong>必须</strong></td><td>SQL 操作绕过 ItemType 权限，强制要求</td></tr>
<tr><td><code>inn.applyAML(...)</code></td><td>视情况</td><td>如果 AML 操作了用户无权访问的数据，需要</td></tr>
<tr><td>读取其他 User 的数据</td><td>视情况</td><td>如果 User ItemType 有权限限制，需要</td></tr>
</tbody>
</table>

## 四、模板方法抽取（DRY）
<p>将权限提升模板抽取为一个独立的 Method（如 <code>IC_PLMIdentityTemplate</code>），然后为各 Method 设置 <code>template</code> 属性引用它（如果可以复用 template 机制），或者包装为辅助类：</p>

```csharp
// 辅助类 — 使用 using 模式简化
public class PlmIdentityScope : IDisposable
{
    private bool _wasSet;
    public PlmIdentityScope()
    {
        var id = Aras.Server.Security.Identity
            .GetByName("Aras PLM");
        _wasSet = Aras.Server.Security.Permissions
            .GrantIdentity(id);
    }
    public void Dispose()
    {
        if (_wasSet)
            Aras.Server.Security.Permissions
                .RevokeIdentity(
                    Aras.Server.Security.Identity
                        .GetByName("Aras PLM"));
    }
}

// 使用
using (new PlmIdentityScope())
{
    var result = inn.applySQL("...");
}
```


## 五、常见错误
<table>
<thead><tr><th>错误</th><th>后果</th><th>修复</th></tr></thead>
<tbody>
<tr><td>忘记 RevokeIdentity</td><td>权限泄漏，整个 Method 执行期间保持 Super User</td><td>始终使用 try-finally 确保释放</td></tr>
<tr><td>applySQL 未提升权限</td><td>抛出 "Insufficient permission" 异常</td><td>applySQL 前必须 GrantIdentity</td></tr>
<tr><td>将权限提升放在 Method 外部</td><td>无效，Method 上下文之外无权限概念</td><td>只能在服务端 Method 内使用</td></tr>
<tr><td>将 Aras PLM 用于前端</td><td>安全漏洞！</td><td>Aras PLM 仅限服务端使用</td></tr>
</tbody>
</table>

## 六、安全最佳实践
<ol>
<li><strong>最小权限原则</strong>：仅在必须的代码块内提升权限，不要在 Method 开头就提升</li>
<li><strong>输入验证</strong>：在权限提升前验证用户输入，防止 SQL 注入 / AML 注入</li>
<li><strong>审计日志</strong>：关键操作记录操作人、时间、内容</li>
<li><strong>权限隔离</strong>：永远不要把 Aras PLM Identity 的权限暴露给客户端</li>
</ol>

<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://www.aras.com/community/f/development/37695/how-to-use-grantidentity/8991">How to use GrantIdentity — Aras Community</a></li>
<li><a href="https://cylnote.blogspot.com/p/aras-server-security-permissions.html">Permissions Class — Aras.Server.Security Namespace</a></li>
</ul>
