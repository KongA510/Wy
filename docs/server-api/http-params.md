---
title: HttpConnectionParameters
---

# HttpConnectionParameters
<blockquote>
<p><strong>HttpConnectionParameters 结构体用于配置 HttpServerConnection 的执行行为。</strong>包含超时、请求头等参数设置。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

## 一、结构体定义

```csharp
// 签名
public struct HttpConnectionParameters
{
    // 用于配置 HttpServerConnection 的执行行为参数
    // 具体字段包括超时、请求头、代理等配置项

    // 获取或设置连接超时（毫秒）
    public int Timeout { get; set; }

    // 获取或设置请求头集合
    public System.Net.WebHeaderCollection Headers { get; set; }

    // 获取或设置是否使用默认凭据
    public bool UseDefaultCredentials { get; set; }
}
```


## 二、配置连接参数

```csharp
// 创建连接时配置参数
var conn = IomFactory.CreateHttpServerConnection(
    url, db, user, password
);

// 通过连接参数的典型使用方式（特定版本中可用）
// var parameters = new HttpConnectionParameters();
// parameters.Timeout = 30000;  // 30 秒超时
// conn.setParameters(parameters);
```


## 三、完整示例

```csharp
using Aras.IOM;
using System;

// 创建连接
var conn = IomFactory.CreateHttpServerConnection(
    "http://localhost/InnovatorServer/Server/InnovatorServer.aspx",
    "InnovatorSolutions",
    "admin",
    "innovator"
);

// 在连接对象上直接设置常用属性（如果版本支持）
// 不同版本的 Aras 可能有不同的配置方式
// 具体请参考对应版本 SDK 文档

var inn = IomFactory.CreateInnovator();
inn.setConnection(conn);

try
{
    var loginResult = inn.Login();
    if (loginResult.isError())
    {
        Console.WriteLine("登录失败: " + loginResult.getErrorString());
        return;
    }

    // 执行业务操作...
}
catch (TimeoutException)
{
    Console.WriteLine("连接超时，请检查网络和服务器状态");
}
catch (Exception ex)
{
    Console.WriteLine("发生异常: " + ex.Message);
}
```


## 四、实践笔记
<ul>
<li><strong>Timeout 设置：</strong>对于大查询或批量操作，建议设置较长的超时时间（如 120000ms）</li>
<li><strong>UseDefaultCredentials：</strong>配合 Windows 认证时启用，避免每次手动传递凭据</li>
<li><strong>版本差异：</strong>不同 Aras 版本的 HttpConnectionParameters 字段可能有所不同，请参考对应 SDK 文档</li>
<li><strong>连接复用：</strong>同一连接可用于多次 AML 请求，无需重复创建</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_HttpConnectionParameters.htm">HttpConnectionParameters Structure</a></li>
</ul>
