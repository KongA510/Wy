<template>
  <article class="doc-content">
    <h1>CertificateTokenProvider</h1>
    <blockquote><p><strong>基于客户端 X.509 证书的 OAuth 认证提供者。</strong>使用客户端证书进行身份验证，无需密码，适用于高安全环境的自动化服务。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、类定义</h2>
    <pre v-pre><code class="language-csharp">// CertificateTokenProvider — 证书认证令牌提供者
public class CertificateTokenProvider : ITokenProvider, ITokenProviderSession
{
    // 构造函数
    public CertificateTokenProvider(CertificateTokenProviderOptions options)

    // 获取令牌
    public string GetAuthorizationToken()
    public Task&lt;string&gt; GetAuthorizationTokenAsync()

    // 刷新令牌
    public string RefreshToken()
    public Task&lt;string&gt; RefreshTokenAsync()

    // 会话管理
    public bool IsSessionValid { get; }
    public void ClearSession()
}</code></pre>

    <h2>二、CertificateTokenProviderOptions</h2>
    <pre v-pre><code class="language-csharp">public class CertificateTokenProviderOptions : TokenProviderOptions
{
    // 继承自 TokenProviderOptions:
    //   string ServerUrl      — Innovator Server URL
    //   string Database       — 数据库名称
    //   string UserName       — 用户名

    public X509Certificate2 ClientCertificate { get; set; }  // 客户端证书（必填）
}</code></pre>

    <h2>三、代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOM.OAuth;
using System.Security.Cryptography.X509Certificates;

var inn = IomFactory.CreateInnovator();

// ===== 从文件加载证书 =====
var cert = new X509Certificate2(
    @"C:\ProgramData\Aras\certs\client.pfx",
    "certificatePassword",
    X509KeyStorageFlags.MachineKeySet
);

var options = new CertificateTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "svc_automation",
    ClientCertificate = cert
};

var provider = TokenProviderFactory.Create(GrantType.Certificate, options);
var loginResult = inn.Login(provider);

if (loginResult.isError())
{
    Console.WriteLine("证书认证失败: " + loginResult.getErrorString());
    return;
}

Console.WriteLine("证书认证成功: " + inn.getUserID());

// ===== 从 Windows 证书存储加载 =====
X509Certificate2 FindCertificate(string thumbprint)
{
    using (var store = new X509Store(StoreName.My, StoreLocation.LocalMachine))
    {
        store.Open(OpenFlags.ReadOnly);
        var certs = store.Certificates.Find(
            X509FindType.FindByThumbprint,
            thumbprint,
            validOnly: true
        );
        return certs.Count > 0 ? certs[0] : null;
    }
}

var storeCert = FindCertificate("a1b2c3d4e5f6...");
if (storeCert != null)
{
    var storeOpts = new CertificateTokenProviderOptions
    {
        ServerUrl = "http://server/InnovatorServer",
        Database = "InnovatorSolutions",
        UserName = "svc_user",
        ClientCertificate = storeCert
    };
    inn.Login(TokenProviderFactory.Create(GrantType.Certificate, storeOpts));
}

// ===== 定时刷新令牌 =====
async Task&lt;string&gt; EnsureValidToken(CertificateTokenProvider provider)
{
    if (!provider.IsSessionValid)
    {
        return await provider.GetAuthorizationTokenAsync();
    }
    return provider.GetAuthorizationToken();
}</code></pre>

    <h2>四、实践笔记</h2>
    <ul>
      <li><strong>证书要求：</strong>证书必须在服务器端注册为受信任的客户端证书</li>
      <li><strong>私钥访问：</strong>应用程序池或服务账户需要对证书私钥有读取权限</li>
      <li><strong>证书管理：</strong>推荐使用 Windows 证书存储（LocalMachine/CurrentUser）而非文件路径</li>
      <li><strong>安全性：</strong>比密码模式更安全——无凭据泄露风险，证书可设置过期时间</li>
      <li><strong>X509KeyStorageFlags：</strong>在服务账户下运行时，使用 <code>MachineKeySet</code> 确保私钥可访问</li>
      <li><strong>证书到期：</strong>实现监控机制在证书到期前自动轮换</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
  </article>
</template>
