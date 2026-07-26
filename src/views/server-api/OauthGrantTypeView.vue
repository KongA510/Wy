<template>
  <article class="doc-content">
    <h1>GrantType 与枚举</h1>
    <blockquote><p><strong>Aras.IOM.OAuth 命名空间中的枚举类型一览。</strong>定义了 OAuth 2.0 认证流程中的授权类型、响应模式、提示模式等。命名空间：Aras.IOM.OAuth，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、GrantType 枚举</h2>
    <pre v-pre><code class="language-csharp">// 认证授权类型 — 决定使用哪种 OAuth 2.0 流程
public enum GrantType
{
    Password,              // Resource Owner Password Credentials
    AuthorizationCode,     // Authorization Code Flow (含 PKCE)
    Windows,               // Windows Integrated Authentication
    Certificate,           // Client Certificate Authentication
    Impersonate,           // Impersonation (模拟用户)
    RefreshToken           // Refresh Token
}</code></pre>

    <h2>二、PromptMode 枚举</h2>
    <pre v-pre><code class="language-csharp">// 用户交互提示模式
public enum PromptMode
{
    None,         // 无提示
    Login,        // 强制重新登录
    SelectAccount // 强制账户选择
}</code></pre>

    <h2>三、ResponseMode 枚举</h2>
    <pre v-pre><code class="language-csharp">// OAuth 授权响应模式
public enum ResponseMode
{
    Query,        // 通过查询参数返回（重定向 URL）
    Fragment      // 通过 URL 片段返回
}</code></pre>

    <h2>四、ProtocolType 枚举</h2>
    <pre v-pre><code class="language-csharp">// OAuth 协议类型
public enum ProtocolType
{
    OAuth2       // OAuth 2.0 协议
}</code></pre>

    <h2>五、GrantType 选择指南</h2>
    <table><thead><tr><th>场景</th><th>推荐 GrantType</th><th>适用条件</th></tr></thead><tbody>
      <tr><td>服务端自动化脚本</td><td><code>Password</code></td><td>有用户名密码，可安全存储凭据</td></tr>
      <tr><td>Web 应用（用户登录）</td><td><code>AuthorizationCode</code></td><td>浏览器环境，支持 PKCE 安全增强</td></tr>
      <tr><td>Windows 域环境</td><td><code>Windows</code></td><td>客户端已加入域，Kerberos/NTLM 可用</td></tr>
      <tr><td>高安全环境</td><td><code>Certificate</code></td><td>有客户端证书，无需暴露密码</td></tr>
      <tr><td>服务代表用户操作</td><td><code>Impersonate</code></td><td>需要以其他用户身份执行操作</td></tr>
      <tr><td>令牌续期</td><td><code>RefreshToken</code></td><td>已有 Refresh Token，需续期 Access Token</td></tr>
    </tbody></table>

    <h2>六、代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOM.OAuth;

// ===== 使用不同 GrantType 创建 TokenProvider =====

// Password 模式
var passwordOptions = new PasswordTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    UserName = "admin",
    Password = "innovator"
};
var passwordProvider = TokenProviderFactory.Create(GrantType.Password, passwordOptions);

// Authorization Code 模式
var authCodeOptions = new AuthorizationFlowTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions",
    PromptMode = PromptMode.SelectAccount,
    ResponseMode = ResponseMode.Query
};
var authCodeProvider = TokenProviderFactory.Create(GrantType.AuthorizationCode, authCodeOptions);

// Windows 认证模式
var windowsOptions = new WindowsTokenProviderOptions
{
    ServerUrl = "http://server/InnovatorServer",
    Database = "InnovatorSolutions"
};
var windowsProvider = TokenProviderFactory.Create(GrantType.Windows, windowsOptions);

// ===== TokenProviderFactory 统一创建 =====
var inn = IomFactory.CreateInnovator();
var tokenProvider = TokenProviderFactory.Create(GrantType.Password, passwordOptions);
inn.Login(tokenProvider);</code></pre>

    <h2>七、实践笔记</h2>
    <ul>
      <li><strong>TokenProviderFactory.Create：</strong>根据 GrantType 自动选择合适的 TokenProvider 实现</li>
      <li><strong>PKCE 支持：</strong>AuthorizationCode 模式内建支持 PKCE（Proof Key for Code Exchange）</li>
      <li><strong>PromptMode 的作用：</strong>仅影响浏览器交互式授权流程，对 Password/Certificate 等模式无效</li>
      <li><strong>ProtocolType：</strong>当前仅 OAuth2，枚举存在是为了未来扩展</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOM_OAuth.htm">Aras.IOM.OAuth Namespace</a></li></ul>
  </article>
</template>
