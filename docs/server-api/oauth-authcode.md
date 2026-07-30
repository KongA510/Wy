---
title: AuthorizationFlowTokenProvider
---

# AuthorizationFlowTokenProvider
<blockquote>
<p><strong>AuthorizationFlowTokenProvider 使用 OAuth 2.0 授权码授予流程获取 Access Token。</strong>适用于 Web 应用程序，用户通过浏览器交互完成授权，安全性高于密码模式。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

## 一、类定义

```csharp
// AuthorizationFlowTokenProvider — OAuth 2.0 授权码模式 Token 提供者
// 实现 ITokenProvider 接口
public class AuthorizationFlowTokenProvider : ITokenProvider
{
    // 构造函数
    public AuthorizationFlowTokenProvider(
        string tokenEndpointUrl,   // Token 端点 URL
        string authorizeEndpointUrl, // 授权端点 URL
        string authorizationCode,  // 从浏览器回调中获取的授权码
        string redirectUri,        // 回调 URI（需与注册的一致）
        string clientId            // 客户端 ID
    )
}
```


## 二、授权码模式完整流程

```text
用户浏览器                    Web 应用                  认证服务器
    │                            │                          │
    │── 访问应用 ───────────────〉│                         │
    │                            │                         │
    │〈── 重定向到授权端点 ──────│                         │
    │                            │                         │
    │── GET /oauth2/authorize ──────────────────────────〉│
    │   ?response_type=code                                │
    │   &client_id=xxx                                     │
    │   &redirect_uri=xxx                                  │
    │   &scope=xxx                                         │
    │                            │                         │
    │〈── 登录页面（如有必要） ──────────────────────────│
    │                            │                         │
    │── 用户输入凭据 ──────────────────────────────────〉│
    │                            │                         │
    │〈── 302 重定向携带 code ──────────────────────────│
    │   ?code=abc123                                       │
    │                            │                         │
    │── 带 code 回调 Web 应用 ─〉│                         │
    │                            │                         │
    │                            │── POST /oauth2/token ──〉│
    │                            │   grant_type=            │
    │                            │    authorization_code    │
    │                            │   code=abc123            │
    │                            │   client_secret=xxx      │
    │                            │                         │
    │                            │〈── { access_token, ────│
    │                            │     refresh_token }      │
    │                            │                         │
    │〈── 登录成功 ──────────────│                         │
```


## 三、C# 代码示例

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;
using System;

// ===== 步骤 1：生成授权 URL（Web 应用中） =====
string clientId = "my-web-app";
string redirectUri = "https://myapp.example.com/callback";
string authorizeUrl = "http://10.7.44.28/ICS50/oauth2/authorize";

string authUrl = $"{authorizeUrl}?response_type=code" +
    $"&client_id={Uri.EscapeDataString(clientId)}" +
    $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
    $"&scope=openid profile offline_access";

// 将用户浏览器重定向到 authUrl
// 用户在 Aras 登录后，浏览器回调 redirectUri?code=XXXXX

// ===== 步骤 2：从回调 URL 获取授权码 =====
// 在 Web 应用的 /callback 端点中
string authorizationCode = Request.Query["code"];

// ===== 步骤 3：用授权码换取 Token =====
var tokenProvider = new AuthorizationFlowTokenProvider(
    "http://10.7.44.28/ICS50/oauth2/token",
    "http://10.7.44.28/ICS50/oauth2/authorize",
    authorizationCode,
    redirectUri,
    clientId
);

// ===== 步骤 4：创建 Aras 连接 =====
var conn = IomFactory.CreateHttpServerConnection(
    "http://10.7.44.28/ICS50/Server/InnovatorServer.aspx",
    "InnovatorSolutions",
    "",  // 不需要用户名
    ""   // 不需要密码（使用 OAuth Token）
);

var inn = IomFactory.CreateInnovator();
inn.setConnection(conn);

var loginResult = inn.Login();
if (loginResult.isError())
{
    Console.WriteLine("OAuth 登录失败: " + loginResult.getErrorString());
    return;
}

Console.WriteLine("授权码模式登录成功");

// ===== 步骤 5：Token 自动续期 =====
if (tokenProvider.IsExpired)
{
    string newToken = await tokenProvider.RefreshAccessTokenAsync();
}
```


## 四、实践笔记
<ul>
<li><strong>redirect_uri 必须精确匹配：</strong>在 Aras 客户端注册表中配置的 redirect_uri 必须与请求中完全一致</li>
<li><strong>一次性使用：</strong>授权码只能使用一次，换取 Token 后即失效</li>
<li><strong>有效期短：</strong>授权码通常只有几分钟的有效期，需尽快换取 Token</li>
<li><strong>PKCE 扩展：</strong>对于无法安全存储 client_secret 的客户端（如 SPA），建议使用 PKCE</li>
<li><strong>scopes 管理：</strong>offline_access scope 用于获取 Refresh Token，支持长期会话</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_OAuth_AuthorizationFlowTokenProvider.htm">AuthorizationFlowTokenProvider Class</a></li>
</ul>
