---
title: PasswordTokenProvider
---

<h1>PasswordTokenProvider</h1>
<blockquote>
<p><strong>PasswordTokenProvider 使用 OAuth 2.0 资源所有者密码凭证（ROPC）授权流程获取 Access Token。</strong>这是最简单的 OAuth 2.0 授权方式，适用于受信任的内部应用程序。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

<h2>一、类定义</h2>

```csharp
// PasswordTokenProvider — OAuth 2.0 密码模式 Token 提供者
// 实现 ITokenProvider 接口
public class PasswordTokenProvider : ITokenProvider
{
    // 构造函数
    public PasswordTokenProvider(
        string tokenEndpointUrl,  // Token 端点 URL，如 http://server/InnovatorServer/oauth2/token
        string username,          // 用户名
        string password           // 密码
    )
}
```


<h2>二、密码模式流程</h2>

```text
客户端                            认证服务器
  │                                  │
  │── POST /oauth2/token ───────────〉│
  │   grant_type=password             │
  │   username=admin                  │
  │   password=***                    │
  │   client_id=xxx                   │
  │                                  │
  │〈── { access_token, expires_in, ──│
  │      refresh_token, token_type }  │
  │                                  │
  │── API 请求 (Bearer Token) ──────〉│
```


<h2>三、C# 代码示例</h2>

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;
using System;

class Program
{
    static void Main()
    {
        // 1. 创建 PasswordTokenProvider
        var tokenProvider = new PasswordTokenProvider(
            "http://10.7.44.28/ICS50/oauth2/token",
            "admin",
            "innovator"
        );

        // 2. 创建 HTTP 连接
        var conn = IomFactory.CreateHttpServerConnection(
            "http://10.7.44.28/ICS50/Server/InnovatorServer.aspx",
            "InnovatorSolutions",
            "admin",
            "innovator"
        );

        // 3. 创建 Innovator 并登录
        var inn = IomFactory.CreateInnovator();
        inn.setConnection(conn);

        var loginResult = inn.Login();
        if (loginResult.isError())
        {
            Console.WriteLine("登录失败: " + loginResult.getErrorString());
            return;
        }

        Console.WriteLine("OAuth Password 模式登录成功");

        // 4. 执行业务操作
        var query = inn.newItem("Part", "get");
        query.setAttribute("select", "item_number,name");
        query.setAttribute("maxRecords", "5");
        var result = query.apply();

        if (!result.isError())
        {
            for (int i = 0; i < result.getItemCount(); i++)
            {
                var item = result.getItemByIndex(i);
                Console.WriteLine($"{item.getProperty("item_number")} - {item.getProperty("name")}");
            }
        }

        // 5. 登出
        inn.Logout();
    }
}
```


<h2>四、Token 生命周期管理</h2>

```csharp
// 检查 Token 是否过期
if (tokenProvider.IsExpired)
{
    // 刷新 Token
    string newToken = await tokenProvider.RefreshAccessTokenAsync();
    Console.WriteLine("Token 已刷新");
}

// 自动获取有效 Token（如果过期会自动刷新）
string accessToken = await tokenProvider.GetAccessTokenAsync();

// 使用 Token 发起 API 请求
using (var client = new HttpClient())
{
    client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("Bearer", accessToken);
    var response = await client.PostAsync(apiUrl, content);
}
```


<h2>五、实践笔记</h2>
<ul>
<li><strong>仅用于受信任的客户端：</strong>密码模式不适用于公开客户端（如 SPA），仅用于内部工具和服务</li>
<li><strong>密码安全：</strong>永远不要将密码硬编码在代码中，应使用配置文件或环境变量</li>
<li><strong>Token 缓存：</strong>PasswordTokenProvider 内部管理 Token 缓存，避免每次请求都重新认证</li>
<li><strong>刷新机制：</strong>Access Token 过期后自动通过 Refresh Token 续期，无需用户重新输入密码</li>
<li><strong>多线程安全：</strong>一个 PasswordTokenProvider 实例可在多个线程间共享</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_OAuth_PasswordTokenProvider.htm">PasswordTokenProvider Class</a></li>
</ul>
