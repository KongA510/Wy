---
title: WindowsTokenProvider
---

# WindowsTokenProvider
<blockquote><p><strong>基于 Windows Integrated Authentication 的 OAuth 认证提供者。</strong>使用当前登录的 Windows 域用户身份自动认证，无需用户名密码。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

## 一、类定义

```csharp
// WindowsTokenProvider — Windows 集成认证令牌提供者
public class WindowsTokenProvider : ITokenProvider, ITokenProviderSession
{
    // 构造函数
    public WindowsTokenProvider(WindowsTokenProviderOptions options)

    // 获取令牌（自动使用当前 Windows 身份）
    public string GetAuthorizationToken()
    public Task<string> GetAuthorizationTokenAsync()

    // 刷新令牌
    public string RefreshToken()
    public Task<string> RefreshTokenAsync()

    // 会话管理
    public bool IsSessionValid { get; }
    public void ClearSession()
}
```


## 二、WindowsTokenProviderOptions

```csharp
// 极简配置 — 仅需 ServerUrl 和 Database
public class WindowsTokenProviderOptions : TokenProviderOptions
{
    // 继承:
    //   string ServerUrl  — Innovator Server URL（必填）
    //   string Database   — 数据库名称（必填）
    //   string UserName   — 不需要（自动使用 Windows 身份）
}
```


## 三、代码示例

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;

var inn = IomFactory.CreateInnovator();

// ===== 基础用法 =====
var options = new WindowsTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions"
};

var provider = TokenProviderFactory.Create(GrantType.Windows, options);
var loginResult = inn.Login(provider);

if (loginResult.isError())
{
    Console.WriteLine("Windows 认证失败: " + loginResult.getErrorString());
    return;
}

Console.WriteLine($"认证成功，当前用户: {inn.getUserID()}");

// ===== 检查当前 Windows 身份 =====
Console.WriteLine($"Windows 用户: {Environment.UserDomainName}\\{Environment.UserName}");

// ===== 条件判断认证方式 =====
// 域内机器使用 Windows 认证，域外机器使用密码认证
ITokenProvider GetTokenProvider()
{
    try
    {
        // 检测是否在域内
        if (Environment.UserDomainName != Environment.MachineName)
        {
            return TokenProviderFactory.Create(GrantType.Windows, new WindowsTokenProviderOptions
            {
                ServerUrl = "http://server/InnovatorServer",
                Database = "InnovatorSolutions"
            });
        }
    }
    catch { }

    // 回退到密码认证
    return TokenProviderFactory.Create(GrantType.Password, new PasswordTokenProviderOptions
    {
        ServerUrl = "http://server/InnovatorServer",
        Database = "InnovatorSolutions",
        UserName = "fallback_user",
        Password = "fallback_password"
    });
}

// 使用
var autoProvider = GetTokenProvider();
inn.Login(autoProvider);
```


## 四、完整示例：Windows 服务使用域身份连接

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;

class ArasWindowsService
{
    private Innovator _inn;
    private WindowsTokenProvider _provider;

    public void Initialize()
    {
        _inn = IomFactory.CreateInnovator();

        var options = new WindowsTokenProviderOptions
        {
            ServerUrl = "http://server/InnovatorServer",
            Database = "InnovatorSolutions"
        };

        _provider = (WindowsTokenProvider)TokenProviderFactory.Create(
            GrantType.Windows, options
        );

        // Windows 服务以域服务账户运行，自动获取 Kerberos Ticket
        var result = _inn.Login(_provider);
        if (result.isError())
        {
            throw new Exception("Windows 认证失败: " + result.getErrorString());
        }
    }

    public Item QueryParts(string searchPattern)
    {
        var query = _inn.newItem("Part", "get");
        query.setProperty("item_number", $"%{searchPattern}%");
        query.setPropertyCondition("item_number", "like");
        query.setAttribute("maxRecords", "100");
        return query.apply();
    }

    public void Dispose()
    {
        _inn?.Logout();
        _provider?.ClearSession();
    }
}
```


## 五、实践笔记
<ul>
<li><strong>前提条件：</strong>服务器必须启用 Windows 身份验证，客户端必须加入同一个域（或受信任域）</li>
<li><strong>零凭据配置：</strong>不需要在代码或配置文件中存储用户名密码——最安全的认证方式之一</li>
<li><strong>服务账户：</strong>Windows 服务以 <code>DOMAIN\ServiceAccount</code> 身份运行时，认证使用该服务账户</li>
<li><strong>Kerberos vs NTLM：</strong>域内优先使用 Kerberos，跨子网可能回退到 NTLM</li>
<li><strong>IIS 场景：</strong>IIS 应用程序池以域账户运行时，可使用 Windows 认证连接 Aras 服务器</li>
<li><strong>非域环境：</strong>如果客户端不在域中，WindowsTokenProvider 无法工作，需使用其他 GrantType</li>
<li><strong>SPN 配置：</strong>确保 Innovator 服务器的 SPN（Service Principal Name）在 Active Directory 中正确注册</li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
