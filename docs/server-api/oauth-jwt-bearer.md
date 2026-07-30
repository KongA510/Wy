---
title: JwtBearerClientAssertionProvider
---

# JwtBearerClientAssertionProvider
<blockquote><p><strong>基于 JWT Bearer 客户端断言的认证提供者。</strong>使用私钥签名 JWT 作为客户端身份凭据进行 OAuth 认证，是企业级应用中最新的安全认证模式。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

## 一、类定义

```csharp
// JwtBearerClientAssertionProvider — JWT Bearer 断言提供者
public class JwtBearerClientAssertionProvider : IClientAssertionProvider
{
    // 构造函数
    public JwtBearerClientAssertionProvider(
        JwtBearerClientAssertionProviderOptions options
    )

    // 创建客户端断言 JWT
    public ClientAssertion CreateClientAssertion(ClientAssertionOptions options)
}
```


## 二、相关类型

```csharp
// 配置选项
public class JwtBearerClientAssertionProviderOptions : TokenProviderOptions
{
    public X509Certificate2 SigningCertificate { get; set; }  // 签名证书
    public string ClientId { get; set; }                       // 客户端 ID
    public string TokenEndpoint { get; set; }                  // Token 端点
}

// 断言配置
public class ClientAssertionOptions
{
    public string Issuer { get; set; }        // 签发者（通常 = ClientId）
    public string Subject { get; set; }       // 主题（通常 = ClientId）
    public string Audience { get; set; }      // 受众（Token Endpoint URL）
    public TimeSpan Lifetime { get; set; }    // JWT 有效期（默认 5 分钟）
}

// 生成的断言结果
public class ClientAssertion
{
    public string ClientAssertionType { get; set; }  // 固定为 urn:ietf:params:oauth:client-assertion-type:jwt-bearer
    public string ClientAssertionToken { get; set; }  // 签名的 JWT 字符串
}
```


## 三、代码示例

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;
using System.Security.Cryptography.X509Certificates;

// ===== 创建 JWT Bearer 断言提供者 =====
var signingCert = new X509Certificate2(
    @"C:\certs\client_assertion.pfx",
    "certPassword",
    X509KeyStorageFlags.Exportable
);

var jwtOptions = new JwtBearerClientAssertionProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    ClientId = "my-enterprise-app",
    TokenEndpoint = "http://auth-server/connect/token",
    SigningCertificate = signingCert
};

var assertionProvider = new JwtBearerClientAssertionProvider(jwtOptions);

// ===== 生成客户端断言 =====
var assertionOptions = new ClientAssertionOptions
{
    Issuer = "my-enterprise-app",
    Subject = "my-enterprise-app",
    Audience = "http://auth-server/connect/token",
    Lifetime = TimeSpan.FromMinutes(5)
};

ClientAssertion assertion = assertionProvider.CreateClientAssertion(assertionOptions);

Console.WriteLine($"断言类型: {assertion.ClientAssertionType}");
Console.WriteLine($"JWT Token: {assertion.ClientAssertionToken}");

// ===== 与 Authorization Code 流程结合使用 =====
var authCodeOptions = new AuthorizationFlowTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    PromptMode = PromptMode.None,
    ResponseMode = ResponseMode.Query,
    RedirectUri = "http://localhost:8080/callback"
};

// 将客户端断言附加到 Authorization Code 流程
// 实际使用时通过 TokenProviderFactory 配置
var inn = IomFactory.CreateInnovator();
// inn.Login(...) 内部会调用 assertionProvider.CreateClientAssertion()
```


## 四、JWT 断言结构

```csharp
// 生成的 JWT Payload（未签名前）类似：
// {
//   "iss": "my-enterprise-app",
//   "sub": "my-enterprise-app",
//   "aud": "http://auth-server/connect/token",
//   "exp": 1735689600,     // 过期时间戳
//   "iat": 1735689300,     // 签发时间戳
//   "jti": "unique-id-1234" // JWT ID
// }
//
// 签名算法：RS256（使用 X.509 证书的 RSA 私钥）
```


## 五、实践笔记
<ul>
<li><strong>私钥安全：</strong>签名证书的私钥是核心安全资产，应存储在 HSM 或 Windows 证书存储中</li>
<li><strong>短有效期：</strong>客户端断言的 Lifetime 通常设为 5 分钟以内，减少被重放攻击的风险</li>
<li><strong>时间同步：</strong>客户端和服务器的时间差应小于 5 分钟，否则 JWT 验证可能因 exp/iat 失败</li>
<li><strong>证书轮换：</strong>需支持证书轮换机制，旧证书过期前部署新证书并更新服务器信任列表</li>
<li><strong>与 mTLS 的区别：</strong>JWT Bearer 断言在应用层认证，mTLS 在传输层，两者可互补使用</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li>
<li><a href="https://datatracker.ietf.org/doc/html/rfc7521">RFC 7521 — Assertion Framework for OAuth 2.0</a></li>
</ul>
