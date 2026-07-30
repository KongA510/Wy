---
title: RefreshTokenProvider
---

<h1>RefreshTokenProvider</h1>
<blockquote><p><strong>使用 Refresh Token 续期 Access Token 的认证提供者。</strong>当 Access Token 过期后，可使用此前获取的 Refresh Token 来获取新的 Access Token，无需用户重新登录。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、类定义</h2>

```csharp
// RefreshTokenProvider — 令牌刷新提供者
public class RefreshTokenProvider : ITokenProvider, ITokenProviderSession
{
    // 构造函数
    public RefreshTokenProvider(RefreshTokenProviderOptions options)

    // 使用 Refresh Token 获取新 Access Token
    public string GetAuthorizationToken()
    public Task<string> GetAuthorizationTokenAsync()

    // 刷新返回新的 Refresh Token
    public string RefreshToken()
    public Task<string> RefreshTokenAsync()

    // 会话管理
    public bool IsSessionValid { get; }
    public void ClearSession()
}
```


<h2>二、RefreshTokenProviderOptions</h2>

```csharp
public class RefreshTokenProviderOptions : TokenProviderOptions
{
    // 继承: ServerUrl, Database, UserName
    public string RefreshToken { get; set; }   // 之前保存的 Refresh Token（必填）
}
```


<h2>三、完整生命周期示例</h2>

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;
using System.IO;
using Newtonsoft.Json;   // 或 System.Text.Json

var inn = IomFactory.CreateInnovator();

// ===== 初次登录 — 保存 Refresh Token =====
var initialOptions = new PasswordTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "admin",
    Password = "innovator"
};

var initialProvider = TokenProviderFactory.Create(GrantType.Password, initialOptions);
var loginResult = inn.Login(initialProvider);

if (!loginResult.isError())
{
    // 获取并安全保存 Refresh Token
    string refreshToken = initialProvider.RefreshToken();
    SaveRefreshToken(refreshToken);  // 加密保存到本地
    Console.WriteLine("初次登录成功，Refresh Token 已保存");
}

// ===== 后续登录 — 使用 Refresh Token（无需密码） =====
var savedRefreshToken = LoadRefreshToken();  // 从存储中读取

if (!string.IsNullOrEmpty(savedRefreshToken))
{
    var refreshOptions = new RefreshTokenProviderOptions
    {
        ServerUrl = "http://server/InnovatorServer",
        Database = "InnovatorSolutions",
        RefreshToken = savedRefreshToken
    };

    var refreshProvider = TokenProviderFactory.Create(GrantType.RefreshToken, refreshOptions);

    try
    {
        var refreshResult = inn.Login(refreshProvider);
        if (refreshResult.isError())
        {
            // Refresh Token 可能已过期或失效，回退到密码登录
            Console.WriteLine("Refresh Token 失效，使用密码登录: " + refreshResult.getErrorString());
            inn.Login(TokenProviderFactory.Create(GrantType.Password, initialOptions));
        }
        else
        {
            // 获取新的 Refresh Token（轮换）
            string newRefreshToken = refreshProvider.RefreshToken();
            SaveRefreshToken(newRefreshToken);
            Console.WriteLine("使用 Refresh Token 登录成功");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Refresh Token 登录异常: " + ex.Message);
    }
}

// ===== 辅助方法 =====
void SaveRefreshToken(string token)
{
    // 生产环境应使用 DPAPI 或加密存储
    var data = new { Token = token, SavedAt = DateTime.UtcNow };
    File.WriteAllText(@"C:\ProgramData\MyApp\refresh_token.json",
        JsonConvert.SerializeObject(data));
}

string LoadRefreshToken()
{
    try
    {
        var json = File.ReadAllText(@"C:\ProgramData\MyApp\refresh_token.json");
        var data = JsonConvert.DeserializeObject<dynamic>(json);
        // 可选：检查 Token 保存时间是否过长
        return data.Token;
    }
    catch
    {
        return null;
    }
}
```


<h2>四、实践笔记</h2>
<ul>
<li><strong>令牌轮换：</strong>使用 Refresh Token 登录后，服务器通常返回新的 Refresh Token，旧的作废（安全性）</li>
<li><strong>持久化存储：</strong>Refresh Token 应使用 DPAPI、加密文件或凭据管理器安全存放</li>
<li><strong>过期处理：</strong>Refresh Token 也有有效期，失效时需回退到完整认证流程</li>
<li><strong>零密码：</strong>长生命周期的后台服务可通过 Refresh Token 机制避免在配置文件中存放明文密码</li>
<li><strong>异常重试：</strong>网络波动导致刷新失败时，可重试 2-3 次后再回退到密码登录</li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
