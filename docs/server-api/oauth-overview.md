---
title: OAuth 命名空间概述
---

# Aras.IOM.OAuth 命名空间概述
<blockquote>
<p><strong>Aras.IOM.OAuth 命名空间提供了基于 OAuth 2.0 和 OpenID Connect 的认证实现。</strong>支持密码模式、授权码模式、证书认证、Windows 集成认证、模拟认证等多种授权方式。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

## 一、命名空间架构
<table>
<thead><tr><th>类型</th><th>名称</th><th>说明</th></tr></thead>
<tbody>
<tr><td>枚举</td><td><code>GrantType</code></td><td>OAuth 2.0 授权类型</td></tr>
<tr><td>接口</td><td><code>ITokenProvider</code></td><td>Token 提供者统一接口</td></tr>
<tr><td>类</td><td><code>PasswordTokenProvider</code></td><td>密码模式（Resource Owner Password）</td></tr>
<tr><td>类</td><td><code>AuthorizationFlowTokenProvider</code></td><td>授权码模式（Authorization Code）</td></tr>
<tr><td>类</td><td><code>CertificateTokenProvider</code></td><td>客户端证书认证</td></tr>
<tr><td>类</td><td><code>WindowsTokenProvider</code></td><td>Windows 集成认证</td></tr>
<tr><td>类</td><td><code>ImpersonateTokenProvider</code></td><td>模拟用户认证</td></tr>
<tr><td>类</td><td><code>RefreshTokenProvider</code></td><td>刷新 Token</td></tr>
<tr><td>类</td><td><code>JwtBearerTokenProvider</code></td><td>JWT Bearer Token 认证</td></tr>
<tr><td>类</td><td><code>DiscoveryDocument</code></td><td>OpenID Connect Discovery 文档</td></tr>
</tbody>
</table>

## 二、GrantType 枚举

```csharp
public enum GrantType
{
    Password,           // 密码模式 — 直接使用用户名/密码换取 Token
    AuthorizationCode,  // 授权码模式 — 通过浏览器重定向获取授权码
    ClientCredentials,  // 客户端凭据 — 使用客户端 ID/Secret
    RefreshToken,       // 刷新 Token — 使用 Refresh Token 换取新 Token
    WindowsIntegrated,  // Windows 集成认证
    Impersonate,        // 模拟认证
    JwtBearer           // JWT Bearer 断言
}
```


## 三、ITokenProvider 接口

```csharp
// 所有 Token Provider 实现的统一接口
public interface ITokenProvider
{
    // 获取 Access Token
    Task<string> GetAccessTokenAsync();

    // 刷新 Token（如果有 Refresh Token）
    Task<string> RefreshAccessTokenAsync();

    // Token 是否已过期
    bool IsExpired { get; }
}
```


## 四、选择授权方式
<table>
<thead><tr><th>场景</th><th>推荐 GrantType</th><th>Provider 类</th></tr></thead>
<tbody>
<tr><td>独立客户端/后台服务</td><td>Password</td><td>PasswordTokenProvider</td></tr>
<tr><td>Web 应用（用户交互）</td><td>AuthorizationCode</td><td>AuthorizationFlowTokenProvider</td></tr>
<tr><td>服务间通信</td><td>ClientCredentials</td><td>CertificateTokenProvider</td></tr>
<tr><td>域内 Windows 客户端</td><td>WindowsIntegrated</td><td>WindowsTokenProvider</td></tr>
<tr><td>模拟其他用户</td><td>Impersonate</td><td>ImpersonateTokenProvider</td></tr>
<tr><td>Token 续期</td><td>RefreshToken</td><td>RefreshTokenProvider</td></tr>
<tr><td>外部 JWT 断言</td><td>JwtBearer</td><td>JwtBearerTokenProvider</td></tr>
</tbody>
</table>

## 五、完整示例：OAuth 认证客户端

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;

// 方式 1：密码模式（最简单，适合内部工具）
async Task<Innovator> LoginWithPassword()
{
    var tokenProvider = new PasswordTokenProvider(
        "http://server/InnovatorServer/oauth2/token",
        "admin",
        "innovator"
    );

    var inn = IomFactory.CreateInnovator();
    // 使用 OAuth Token 创建连接
    var conn = IomFactory.CreateHttpServerConnection(
        "http://server/InnovatorServer/Server/InnovatorServer.aspx",
        "InnovatorSolutions"
    );
    // 设置 OAuth 认证
    // conn.SetTokenProvider(tokenProvider);
    inn.setConnection(conn);
    var result = inn.Login();
    return inn;
}

// 方式 2：授权码模式（适合 Web 应用）
async Task<Innovator> LoginWithAuthCode(string authCode)
{
    var tokenProvider = new AuthorizationFlowTokenProvider(
        "http://server/InnovatorServer/oauth2/token",
        "http://server/InnovatorServer/oauth2/authorize",
        authCode,
        "http://myapp/callback",  // redirect_uri
        "my-client-id"
    );

    var inn = IomFactory.CreateInnovator();
    var conn = IomFactory.CreateHttpServerConnection(
        "http://server/InnovatorServer/Server/InnovatorServer.aspx",
        "InnovatorSolutions"
    );
    inn.setConnection(conn);
    var result = inn.Login();
    return inn;
}
```


## 六、实践笔记
<ul>
<li><strong>OAuth 2.0 是推荐方式：</strong>新项目优先使用 OAuth 2.0 认证，替代传统的数据库用户名/密码</li>
<li><strong>Token 生命周期管理：</strong>Access Token 有过期时间，需通过 RefreshTokenProvider 自动续期</li>
<li><strong>安全最佳实践：</strong>Client Secret 不应硬编码在代码中，应从配置文件或环境变量读取</li>
<li><strong>HTTPS 必须：</strong>OAuth 2.0 认证流程强烈建议通过 HTTPS 进行</li>
<li><strong>版本要求：</strong>OAuth 支持从 Aras Innovator 12.0+ 开始提供</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li>
</ul>
