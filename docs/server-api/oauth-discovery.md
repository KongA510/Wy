---
title: Discovery 与异常
---

<h1>Discovery 与异常</h1>
<blockquote><p><strong>OpenID Connect Discovery 文档获取与 OAuth 相关异常处理。</strong>DiscoveryDocumentProvider 自动获取服务器 OAuth 端点配置，OAuthException 提供结构化异常信息。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、DiscoveryDocumentProvider</h2>

```csharp
// DiscoveryDocumentProvider — OIDC 发现文档提供者
// 实现 IDiscoveryDocumentProvider 接口
public class DiscoveryDocumentProvider : IDiscoveryDocumentProvider
{
    // 获取 OAuth 服务器的 OpenID Connect Discovery 文档
    public Task<DiscoveryDocument> GetDiscoveryDocumentAsync(
        string serverUrl,
        CancellationToken cancellationToken
    )
}

// DiscoveryDocument — 发现文档
public class DiscoveryDocument
{
    public string Issuer { get; set; }                    // 签发者
    public string AuthorizationEndpoint { get; set; }     // 授权端点
    public string TokenEndpoint { get; set; }             // Token 端点
    public string EndSessionEndpoint { get; set; }        // 登出端点
    public string JwksUri { get; set; }                  // JWKS 密钥集 URI

    // 支持的授权类型列表
    public List<string> GrantTypesSupported { get; set; }
    // 支持的响应类型列表
    public List<string> ResponseTypesSupported { get; set; }
    // 支持的签名算法
    public List<string> TokenEndpointAuthMethodsSupported { get; set; }
}

// ProtocolInfo — 协议信息
public class ProtocolInfo
{
    public string ProtocolType { get; set; }     // 协议类型（如 "OAuth2"）
    public string Version { get; set; }          // 协议版本
}
```


<h2>二、OAuthException</h2>

```csharp
// OAuthException — OAuth 相关异常
public class OAuthException : Exception
{
    // 构造函数
    public OAuthException(string message)
    public OAuthException(string message, Exception innerException)

    // 属性
    public string Error { get; set; }            // OAuth 错误码（如 "invalid_grant"）
    public string ErrorDescription { get; set; } // 错误描述
    public string ErrorUri { get; set; }         // 错误详情 URI
}
```


<h2>三、代码示例</h2>

```csharp
using Aras.IOM;
using Aras.IOM.OAuth;

// ===== 获取发现文档 =====
async Task<DiscoveryDocument> DiscoverEndpoints(string serverUrl)
{
    var provider = new DiscoveryDocumentProvider();

    try
    {
        var discovery = await provider.GetDiscoveryDocumentAsync(
            serverUrl,
            CancellationToken.None
        );

        Console.WriteLine($"Token Endpoint: {discovery.TokenEndpoint}");
        Console.WriteLine($"Authorize Endpoint: {discovery.AuthorizationEndpoint}");
        Console.WriteLine($"Supported Grants: {string.Join(", ", discovery.GrantTypesSupported)}");
        Console.WriteLine($"JWKS URI: {discovery.JwksUri}");

        return discovery;
    }
    catch (OAuthException ex)
    {
        Console.WriteLine($"OAuth 错误: {ex.Error} - {ex.ErrorDescription}");
        throw;
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"网络错误: {ex.Message}");
        throw;
    }
}

// ===== 使用发现文档动态配置 =====
async Task ConfigureFromDiscovery()
{
    var serverUrl = "http://server/InnovatorServer";
    var discovery = await DiscoverEndpoints(serverUrl);

    // 根据服务器能力选择认证方式
    var options = new PasswordTokenProviderOptions
    {
        ServerUrl = serverUrl,
        Database = "InnovatorSolutions",
        UserName = "admin",
        Password = "innovator"
    };

    // 验证服务器是否支持密码模式
    if (discovery.GrantTypesSupported.Contains("password"))
    {
        Console.WriteLine("密码模式可用");
        var inn = IomFactory.CreateInnovator();
        var provider = TokenProviderFactory.Create(GrantType.Password, options);

        try
        {
            var result = inn.Login(provider);
            if (result.isError())
            {
                Console.WriteLine("登录失败: " + result.getErrorString());
            }
            else
            {
                Console.WriteLine("登录成功: " + inn.getUserID());
            }
        }
        catch (OAuthException ex)
        {
            Console.WriteLine($"OAuth 错误 [{ex.Error}]: {ex.ErrorDescription}");
            // 可重试或回退到其他认证方式
        }
    }
    else
    {
        Console.WriteLine("密码模式不可用，请使用其他授权方式");
    }
}

// ===== OAuthException 处理 =====
void HandleOAuthError(Exception ex)
{
    if (ex is OAuthException oauthEx)
    {
        switch (oauthEx.Error)
        {
            case "invalid_grant":
                Console.WriteLine("授权类型无效或凭据过期");
                Console.WriteLine($"详情: {oauthEx.ErrorDescription}");
                // 刷新令牌或回退到完整登录
                break;

            case "invalid_client":
                Console.WriteLine("客户端认证失败");
                break;

            case "unauthorized_client":
                Console.WriteLine("客户端未授权使用此授权类型");
                break;

            default:
                Console.WriteLine($"未识别的 OAuth 错误: {oauthEx.Error}");
                break;
        }
    }
    else
    {
        Console.WriteLine("非 OAuth 异常: " + ex.Message);
    }
}
```


<h2>四、常见 OAuth 错误码</h2>
<table><thead><tr><th>错误码</th><th>含义</th><th>处理建议</th></tr></thead><tbody>
<tr><td><code>invalid_request</code></td><td>请求参数不合法</td><td>检查 Options 参数</td></tr>
<tr><td><code>invalid_client</code></td><td>客户端认证失败</td><td>检查 ClientId/证书</td></tr>
<tr><td><code>invalid_grant</code></td><td>授权类型无效或凭据错误</td><td>检查用户名密码/Refresh Token</td></tr>
<tr><td><code>unauthorized_client</code></td><td>客户端未授权此 GrantType</td><td>检查服务器客户端配置</td></tr>
<tr><td><code>access_denied</code></td><td>用户拒绝授权</td><td>提示用户重新授权</td></tr>
<tr><td><code>server_error</code></td><td>服务器内部错误</td><td>重试或联系管理员</td></tr>
</tbody></table>

<h2>五、实践笔记</h2>
<ul>
<li><strong>缓存发现文档：</strong>Discovery Document 通常不变，可缓存一定时间（如 1 小时），避免每次启动都请求</li>
<li><strong>回退策略：</strong>发现文档获取失败时，使用硬编码的默认端点路径作为回退</li>
<li><strong>OAuthException 是 Exception 子类：</strong>在 try-catch 中优先捕获 OAuthException 再捕获更泛化的 Exception</li>
<li><strong>发现端点标准路径：</strong>默认路径为 <code>{ServerUrl}/.well-known/openid-configuration</code></li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
