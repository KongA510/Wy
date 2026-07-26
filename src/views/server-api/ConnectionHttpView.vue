<template>
  <article class="doc-content">
    <h1>HTTP 连接实现</h1>
    <blockquote>
      <p><strong>Aras.IOM 提供了多种服务器连接实现方式。</strong>包括标准 HTTP 连接 (HttpServerConnection)、Windows 认证连接 (WinAuthHttpServerConnection)、连接基类 (ServerConnectionBase) 以及连接参数结构体 (HttpConnectionParameters)。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、HttpServerConnection — 标准 HTTP 连接</h2>
    <pre v-pre><code class="language-csharp">// 实现 IServerConnection 接口，基于 HTTP 通信
public class HttpServerConnection : ServerConnectionBase

// 典型初始化（通过 IomFactory）
var conn = IomFactory.CreateHttpServerConnection(
    "http://server/InnovatorServer/Server/InnovatorServer.aspx",
    "InnovatorSolutions",    // 数据库名称
    "admin",                 // 用户名
    "password"               // 密码
);
var inn = IomFactory.CreateInnovator();
inn.setConnection(conn);
var loginResult = inn.Login();</code></pre>

    <h2>二、WinAuthHttpServerConnection — Windows 认证连接</h2>
    <pre v-pre><code class="language-csharp">// 扩展 HttpServerConnection，使用 Windows 身份验证
public class WinAuthHttpServerConnection : HttpServerConnection

// 适用于配置了 Windows 认证的 Innovator 服务器
var conn = IomFactory.CreateWinAuthHttpServerConnection(
    "http://server/InnovatorServer/Server/InnovatorServer.aspx",
    "InnovatorSolutions"
);</code></pre>

    <h2>三、IServerConnection 接口</h2>
    <pre v-pre><code class="language-csharp">// 连接接口，AML 生成器（Item 和 Innovator）通过此接口连接到服务器
public interface IServerConnection
{
    // 提供传输层的抽象，使 Item/Innovator 不依赖具体连接实现
}

// ServerConnectionBase — 标准 IServerConnection 实现的基类
public class ServerConnectionBase : IServerConnection</code></pre>

    <h2>四、HttpConnectionParameters 结构体</h2>
    <pre v-pre><code class="language-csharp">// 连接参数结构体
public struct HttpConnectionParameters
{
    // 用于配置 HttpServerConnection 的执行行为
    // 包括超时、请求头等参数
}</code></pre>

    <h2>五、完整示例：独立 .NET 客户端连接</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;

// 方式 1：数据库认证
var conn = IomFactory.CreateHttpServerConnection(
    "http://localhost/InnovatorServer/Server/InnovatorServer.aspx",
    "InnovatorSolutions",
    "admin",
    "innovator"
);
var inn = IomFactory.CreateInnovator();
// 设置连接并登录
// ...

// 方式 2：Windows 集成认证
var winConn = IomFactory.CreateWinAuthHttpServerConnection(
    "http://localhost/InnovatorServer/Server/InnovatorServer.aspx",
    "InnovatorSolutions"
);

// 在服务端 Method 中不需要手动创建连接
// this.newInnovator() 已自动关联当前会话的连接</code></pre>

    <h2>六、实践笔记</h2>
    <ul>
      <li><strong>不要手动实例化连接：</strong>使用 IomFactory 创建连接和 Innovator 实例</li>
      <li><strong>Windows 认证需要域环境：</strong>WinAuthHttpServerConnection 要求客户端和服务器在同一域或信任域中</li>
      <li><strong>服务端 Method 无需手动管理连接：</strong>this.newInnovator() 获取的 Innovator 已绑定当前会话</li>
      <li><strong>多连接场景：</strong>可通过多个 Innovator 实例连接到不同服务器</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_HttpServerConnection.htm">HttpServerConnection Class</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_IServerConnection.htm">IServerConnection Interface</a></li>
    </ul>
  </article>
</template>
