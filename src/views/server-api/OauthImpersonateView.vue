<template>
  <article class="doc-content">
    <h1>ImpersonateTokenProvider</h1>
    <blockquote><p><strong>用户模拟认证提供者。</strong>允许一个已认证的服务账户以另一个用户身份执行操作，常用于需要代理用户执行任务的后台服务。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、类定义</h2>
    <pre v-pre><code class="language-csharp">// ImpersonateTokenProvider — 用户模拟令牌提供者
public class ImpersonateTokenProvider : ITokenProvider, ITokenProviderSession
{
    // 构造函数
    public ImpersonateTokenProvider(ImpersonateTokenProviderOptions options)

    // 获取令牌（以模拟用户身份）
    public string GetAuthorizationToken()
    public Task&lt;string&gt; GetAuthorizationTokenAsync()

    // 刷新令牌
    public string RefreshToken()
    public Task&lt;string&gt; RefreshTokenAsync()

    // 会话管理
    public bool IsSessionValid { get; }
    public void ClearSession()
}</code></pre>

    <h2>二、ImpersonateTokenProviderOptions</h2>
    <pre v-pre><code class="language-csharp">public class ImpersonateTokenProviderOptions : TokenProviderOptions
{
    // 继承自 TokenProviderOptions:
    //   string ServerUrl            — Innovator Server URL
    //   string Database             — 数据库名称
    //   string UserName             — 服务账户用户名
    //   string Password             — 服务账户密码（基类中不可见，但通过 PasswordTokenProviderOptions 继承）

    // 专门字段
    public string ImpersonatedUserId { get; set; }  // 要模拟的目标用户 ID
}</code></pre>

    <h2>三、代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOM.OAuth;

var inn = IomFactory.CreateInnovator();

// ===== 服务账户模拟指定用户 =====
var options = new ImpersonateTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "svc_background",       // 有模拟权限的服务账户
    Password = "servicePassword",
    ImpersonatedUserId = "targetUserId" // 以该用户身份执行操作
};

var provider = TokenProviderFactory.Create(GrantType.Impersonate, options);
var loginResult = inn.Login(provider);

if (loginResult.isError())
{
    Console.WriteLine("模拟登录失败: " + loginResult.getErrorString());
    return;
}

// 此时所有操作都以 targetUserId 的身份执行
// 审计日志中会记录操作者为 targetUserId
Console.WriteLine($"当前用户: {inn.getUserID()}");

// ===== 批量处理 — 以不同用户身份操作 =====
async Task ProcessAsUser(string impUserId, Item itemToApply)
{
    var userInn = IomFactory.CreateInnovator();
    try
    {
        var impOptions = new ImpersonateTokenProviderOptions
        {
            ServerUrl = "http://server/InnovatorServer",
            Database = "InnovatorSolutions",
            UserName = "svc_background",
            Password = "servicePassword",
            ImpersonatedUserId = impUserId
        };

        var impProvider = TokenProviderFactory.Create(GrantType.Impersonate, impOptions);
        userInn.Login(impProvider);

        var result = itemToApply.apply();
        if (result.isError())
        {
            Console.WriteLine($"以 {impUserId} 身份操作失败: {result.getErrorString()}");
        }
    }
    finally
    {
        userInn.Logout();
    }
}

// ===== 权限检查 — 验证服务账户是否有模拟权限 =====
bool CanImpersonate(string serviceUserId, string targetUserId)
{
    var checkInn = IomFactory.CreateInnovator();
    // 先用服务账户登录
    checkInn.Login(TokenProviderFactory.Create(GrantType.Password, new PasswordTokenProviderOptions
    {
        ServerUrl = "http://server/InnovatorServer",
        Database = "InnovatorSolutions",
        UserName = "svc_background",
        Password = "servicePassword"
    }));

    // 检查 Identity 中是否有模拟权限
    var identityQuery = checkInn.newItem("Identity", "get");
    identityQuery.setProperty("keyed_name", serviceUserId);
    var idResult = identityQuery.apply();

    if (idResult.isError() || idResult.getItemCount() == 0)
        return false;

    // 检查权限配置...
    checkInn.Logout();
    return true;
}</code></pre>

    <h2>四、实践笔记</h2>
    <ul>
      <li><strong>权限要求：</strong>服务账户必须在 Aras 中被授予模拟其他用户的权限（通常通过 Identity 权限配置）</li>
      <li><strong>审计追踪：</strong>模拟操作会在服务器审计日志中记录实际执行者（被模拟的用户身份）</li>
      <li><strong>典型场景：</strong>后台审批流程（服务代表审批者执行）、数据迁移（保留原始创建者）、定时任务</li>
      <li><strong>安全性：</strong>模拟权限应严格控制，仅授予必要的服务账户</li>
      <li><strong>与 Windows 模拟的区别：</strong>这是 Aras API 层的身份模拟，不同于 Windows Impersonation（操作系统级权限切换）</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
  </article>
</template>
