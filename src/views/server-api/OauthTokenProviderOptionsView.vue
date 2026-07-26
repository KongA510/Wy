<template>
  <article class="doc-content">
    <h1>TokenProviderOptions 体系</h1>
    <blockquote><p><strong>所有 OAuth TokenProvider 的配置选项基类及派生类。</strong>每种认证方式有对应的 Options 类，用于构造 TokenProvider 时传递参数。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、Options 类继承树</h2>
    <pre v-pre><code class="language-csharp">// 基类 — 所有 Options 的公共字段
public class TokenProviderOptions
{
    public string ServerUrl { get; set; }    // Innovator Server URL（必填）
    public string Database { get; set; }     // 数据库名称（必填）
    public string UserName { get; set; }     // 用户名（Password 模式必填）
}

// ─── 派生类 ───

// Password 模式
public class PasswordTokenProviderOptions : TokenProviderOptions
{
    public string Password { get; set; }     // 用户密码
}

// Authorization Code 模式
public class AuthorizationFlowTokenProviderOptions : TokenProviderOptions
{
    public PromptMode PromptMode { get; set; }        // 交互提示模式
    public ResponseMode ResponseMode { get; set; }    // 响应模式
    public string RedirectUri { get; set; }          // 重定向 URI
}

// Certificate 模式
public class CertificateTokenProviderOptions : TokenProviderOptions
{
    public X509Certificate2 ClientCertificate { get; set; }  // 客户端证书
}

// Windows 认证模式
public class WindowsTokenProviderOptions : TokenProviderOptions
{
    // 使用当前 Windows 身份，无需额外字段
}

// Impersonate 模拟模式
public class ImpersonateTokenProviderOptions : TokenProviderOptions
{
    public string ImpersonatedUserId { get; set; }   // 要模拟的用户 ID
}

// Refresh Token 模式
public class RefreshTokenProviderOptions : TokenProviderOptions
{
    public string RefreshToken { get; set; }          // 已有的 Refresh Token
}

// JWT Bearer 模式
public class JwtBearerClientAssertionProviderOptions : TokenProviderOptions
{
    public X509Certificate2 SigningCertificate { get; set; } // 签名证书
    public string ClientId { get; set; }                      // 客户端 ID
    public string TokenEndpoint { get; set; }                 // Token 端点 URL
}</code></pre>

    <h2>二、ClientAssertionOptions</h2>
    <pre v-pre><code class="language-csharp">// 用于生成客户端断言的配置
public class ClientAssertionOptions
{
    public string Issuer { get; set; }       // 签发者
    public string Subject { get; set; }      // 主题
    public string Audience { get; set; }     // 受众（通常是 Token Endpoint）
    public TimeSpan Lifetime { get; set; }   // 断言有效期
}</code></pre>

    <h2>三、NavigationOptions</h2>
    <pre v-pre><code class="language-csharp">// 浏览器导航选项（Authorization Code 流程）
public class NavigationOptions
{
    public string StartUrl { get; set; }            // 导航起始 URL
    public string EndUrl { get; set; }              // 导航结束 URL（回调 URL 前缀）
    public PromptMode PromptMode { get; set; }      // 提示模式
    public ResponseMode ResponseMode { get; set; }  // 响应模式
    public string ResponseType { get; set; }        // 响应类型（如 "code"）
}</code></pre>

    <h2>四、代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOM.OAuth;
using System.Security.Cryptography.X509Certificates;

var inn = IomFactory.CreateInnovator();

// ===== Password 模式 — 最常见 =====
var pwdOpts = new PasswordTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "admin",
    Password = "innovator"
};
inn.Login(TokenProviderFactory.Create(GrantType.Password, pwdOpts));

// ===== Authorization Code 模式 =====
var authCodeOpts = new AuthorizationFlowTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    PromptMode = PromptMode.SelectAccount,
    ResponseMode = ResponseMode.Query,
    RedirectUri = "http://localhost:8080/callback"
};
inn.Login(TokenProviderFactory.Create(GrantType.AuthorizationCode, authCodeOpts));

// ===== Certificate 模式 =====
var certOpts = new CertificateTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "certuser",
    ClientCertificate = new X509Certificate2(@"C:\certs\client.pfx", "password")
};
inn.Login(TokenProviderFactory.Create(GrantType.Certificate, certOpts));

// ===== Windows 认证模式 =====
var winOpts = new WindowsTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions"
};
inn.Login(TokenProviderFactory.Create(GrantType.Windows, winOpts));

// ===== Impersonate 模拟模式 =====
var impOpts = new ImpersonateTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "serviceAccount",
    Password = "servicePwd",
    ImpersonatedUserId = "targetUserId"
};
inn.Login(TokenProviderFactory.Create(GrantType.Impersonate, impOpts));

// ===== Refresh Token 模式 =====
var refreshOpts = new RefreshTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    RefreshToken = savedRefreshToken   // 从上次会话保存的 Refresh Token
};
inn.Login(TokenProviderFactory.Create(GrantType.RefreshToken, refreshOpts));

// ===== JWT Bearer 模式 =====
var jwtOpts = new JwtBearerClientAssertionProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    ClientId = "my-client-id",
    TokenEndpoint = "http://auth-server/token",
    SigningCertificate = new X509Certificate2(@"C:\certs\signing.pfx", "password")
};
inn.Login(TokenProviderFactory.Create(GrantType.AuthorizationCode, jwtOpts));
</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>ServerUrl 和 Database 必填：</strong>所有 Options 都需要提供这两个基本参数</li>
      <li><strong>类型安全：</strong>每个 Options 类只包含对应认证方式需要的字段，避免配置混乱</li>
      <li><strong>证书管理：</strong>Certificate 和 JWT Bearer 模式需要 X509Certificate2 对象，注意证书存储和权限</li>
      <li><strong>Refresh Token 持久化：</strong>建议将 Refresh Token 加密存储到本地配置文件</li>
      <li><strong>TokenProviderFactory：</strong>传入不匹配的 GrantType 和 Options 类型会运行时出错</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
  </article>
</template>
