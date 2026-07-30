---
title: OAuth 接口体系
---

# OAuth 接口体系
<blockquote><p><strong>Aras.IOM.OAuth 中的核心接口定义。</strong>定义了 TokenProvider、Navigator、ClientAssertionProvider 等关键接口。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

## 一、接口一览

```csharp
// ITokenProvider — 令牌提供者核心接口
// 负责获取和管理 OAuth Access Token
public interface ITokenProvider
{
    // 获取访问令牌（同步）
    string GetAuthorizationToken();
    // 获取访问令牌（异步）
    Task<string> GetAuthorizationTokenAsync();
    // 刷新令牌
    string RefreshToken();
    Task<string> RefreshTokenAsync();
}

// ITokenProviderSession — 令牌提供者会话接口
// 管理认证会话状态
public interface ITokenProviderSession
{
    // 会话是否有效
    bool IsSessionValid { get; }
    // 清除会话
    void ClearSession();
}

// INavigator — 浏览器导航接口
// 用于 Authorization Code 流程中的浏览器交互
public interface INavigator
{
    // 导航到 URL 并等待回调
    Task<NavigationResult> NavigateAsync(string url, string redirectUri, CancellationToken ct);
}

// IClientAssertionProvider — 客户端断言提供者
// 用于 JWT Bearer 认证中的客户端断言生成
public interface IClientAssertionProvider
{
    // 创建客户端断言（JWT）
    ClientAssertion CreateClientAssertion(ClientAssertionOptions options);
}

// IDiscoveryDocumentProvider — 发现文档提供者
// 用于获取 OAuth 服务器的 OpenID Connect Discovery 文档
public interface IDiscoveryDocumentProvider
{
    // 获取发现文档
    Task<DiscoveryDocument> GetDiscoveryDocumentAsync(string serverUrl, CancellationToken ct);
}
```


## 二、接口实现关系
<table><thead><tr><th>接口</th><th>实现类</th><th>说明</th></tr></thead><tbody>
<tr><td><code>ITokenProvider</code></td><td>PasswordTokenProvider, AuthorizationFlowTokenProvider, CertificateTokenProvider, WindowsTokenProvider, ImpersonateTokenProvider, RefreshTokenProvider</td><td>所有 TokenProvider 都实现了 ITokenProvider</td></tr>
<tr><td><code>ITokenProviderSession</code></td><td>PasswordTokenProvider 等</td><td>提供会话管理能力</td></tr>
<tr><td><code>INavigator</code></td><td>默认系统浏览器实现</td><td>可在单元测试中 Mock</td></tr>
<tr><td><code>IClientAssertionProvider</code></td><td>JwtBearerClientAssertionProvider</td><td>生成 JWT Bearer 断言</td></tr>
<tr><td><code>IDiscoveryDocumentProvider</code></td><td>DiscoveryDocumentProvider</td><td>获取 OIDC 发现文档</td></tr>
</tbody></table>

## 三、代码示例

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;

// ===== 使用 ITokenProvider 接口 =====
var inn = IomFactory.CreateInnovator();

// 通过工厂获取任意 TokenProvider（返回 ITokenProvider）
var options = new PasswordTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "admin",
    Password = "innovator"
};

ITokenProvider provider = TokenProviderFactory.Create(GrantType.Password, options);

// 登录
var loginResult = inn.Login(provider);
if (loginResult.isError())
{
    Console.WriteLine("登录失败: " + loginResult.getErrorString());
    return;
}

// 获取当前令牌
string token = provider.GetAuthorizationToken();
Console.WriteLine("Access Token: " + token);

// ===== ITokenProviderSession 会话管理 =====
if (provider is ITokenProviderSession session)
{
    if (session.IsSessionValid)
    {
        Console.WriteLine("会话有效");
    }
    // 登出时清除会话
    inn.Logout();
    session.ClearSession();
}

// ===== IDiscoveryDocumentProvider 示例 =====
var discoveryProvider = new DiscoveryDocumentProvider();
var discovery = await discoveryProvider.GetDiscoveryDocumentAsync(
    "http://server/InnovatorServer",
    CancellationToken.None
);
Console.WriteLine($"Token Endpoint: {discovery.TokenEndpoint}");
Console.WriteLine($"Authorize Endpoint: {discovery.AuthorizeEndpoint}");
```


## 四、实践笔记
<ul>
<li><strong>面向接口编程：</strong>使用 <code>ITokenProvider</code> 接口而非具体实现类，便于切换认证方式</li>
<li><strong>INavigator 可定制：</strong>在桌面应用中可以自定义 INavigator 实现来控制浏览器行为</li>
<li><strong>异步方法：</strong>所有 TokenProvider 都支持 <code>Async</code> 版本，推荐在 async/await 场景使用</li>
<li><strong>TokenProviderFactory：</strong>工厂方法根据 GrantType 自动选择正确的实现类</li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
