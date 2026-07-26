<template>
  <article class="doc-content">
    <h1>IomFactory / RequestFactory</h1>
    <blockquote>
      <p><strong>IomFactory 和 RequestFactory 是用于创建 Innovator 实例和初始化请求的工厂类。</strong>按照 Aras 最佳实践，不应直接实例化连接和 Innovator 对象，而应通过工厂类创建。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、IomFactory — 创建 Innovator 和连接</h2>
    <pre v-pre><code class="language-csharp">// 签名
public class IomFactory

// 创建 HttpServerConnection
public static HttpServerConnection CreateHttpServerConnection(
    string url,     // 例如 "http://server/InnovatorServer/Server/InnovatorServer.aspx"
    string db,      // 数据库名称，如 "InnovatorSolutions"
    string user,    // 用户名
    string password // 密码
)

// 创建 WinAuthHttpServerConnection
public static WinAuthHttpServerConnection CreateWinAuthHttpServerConnection(
    string url,
    string db
)

// 创建 Innovator 实例
public static Innovator CreateInnovator()

// 典型使用
var conn = IomFactory.CreateHttpServerConnection(
    innovatorServerUrl, dbName, userName, password);
var inn = IomFactory.CreateInnovator();
// inn.setConnection(conn);
// var loginResult = inn.Login();</code></pre>

    <h2>二、RequestFactory — 初始化请求</h2>
    <pre v-pre><code class="language-csharp">// 签名
public class RequestFactory

// 用途：为独立客户端提供请求初始化功能
// 具体方法取决于请求类型</code></pre>

    <h2>三、在服务端 Method 中的特殊性</h2>
    <pre v-pre><code class="language-csharp">// 在服务端 Method 中，不需要使用工厂类
// this.newInnovator() 已经返回绑定当前会话的 Innovator 实例
var inn = this.newInnovator();

// 只有在独立 .NET 应用中才需要 IomFactory
// 例如：数据导入工具、批处理程序、外部集成服务</code></pre>

    <h2>四、完整示例：独立 .NET 客户端</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;

class Program
{
    static void Main()
    {
        // 1. 创建连接
        var conn = IomFactory.CreateHttpServerConnection(
            "http://localhost/InnovatorServer/Server/InnovatorServer.aspx",
            "InnovatorSolutions",
            "admin",
            "innovator"
        );

        // 2. 创建 Innovator
        var inn = IomFactory.CreateInnovator();
        inn.setConnection(conn);

        // 3. 登录
        var loginResult = inn.Login();
        if (loginResult.isError())
        {
            Console.WriteLine("登录失败: " + loginResult.getErrorString());
            return;
        }
        Console.WriteLine("已登录，用户ID: " + inn.getUserID());

        // 4. 查询数据
        var query = inn.newItem("Part", "get");
        query.setAttribute("select", "item_number,name,state");
        query.setAttribute("maxRecords", "10");
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
}</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>总是使用 IomFactory：</strong>不要手动 new Innovator() 或 new HttpServerConnection()</li>
      <li><strong>独立应用需要管理连接生命周期：</strong>Login/Logout/Dispose 必须成对调用</li>
      <li><strong>服务端 Method 不需要 IomFactory：</strong>this 上下文已提供了 Innovator</li>
      <li><strong>多线程场景：</strong>每个线程应创建独立的 Innovator 实例</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_IomFactory.htm">IomFactory Class</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_RequestFactory.htm">RequestFactory Class</a></li>
    </ul>
  </article>
</template>
