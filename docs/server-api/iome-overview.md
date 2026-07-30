---
title: IOME 命名空间概述
---

<h1>IOME 命名空间概述</h1>
<blockquote><p><strong>Aras.IOME（Innovator Managed Extensions）命名空间提供文件签入/签出的完整管理能力。</strong>包含 CheckinManager、CheckoutManager 两大核心类及完整的事件/委托/异常体系。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、命名空间类型一览</h2>
<table><thead><tr><th>类别</th><th>类型</th><th>说明</th></tr></thead><tbody>
<tr><td><strong>核心管理类</strong></td><td><code>CheckinManager</code></td><td>文件签入管理器，支持进度/完成事件</td></tr>
<tr><td></td><td><code>CheckoutManager</code></td><td>文件签出管理器，支持进度/完成事件</td></tr>
<tr><td><strong>配置构建器</strong></td><td><code>IItemConfigurationBuilder</code></td><td>Item 配置构建器接口</td></tr>
<tr><td></td><td><code>MultiParentConfigurationBuilder</code></td><td>多父项配置构建器</td></tr>
<tr><td><strong>事件参数类</strong></td><td><code>CheckinCompletedEventArgs</code></td><td>签入完成事件参数</td></tr>
<tr><td></td><td><code>CheckinProgressChangedEventArgs</code></td><td>签入进度变化事件参数</td></tr>
<tr><td></td><td><code>UploadFileCompletedEventArgs</code></td><td>单文件上传完成事件参数</td></tr>
<tr><td></td><td><code>UploadFilesCompletedEventArgs</code></td><td>多文件上传完成事件参数</td></tr>
<tr><td></td><td><code>UploadFilesProgressChangedEventArgs</code></td><td>多文件上传进度事件参数</td></tr>
<tr><td></td><td><code>DownloadFileCompletedEventArgs</code></td><td>单文件下载完成事件参数</td></tr>
<tr><td></td><td><code>DownloadFilesCompletedEventArgs</code></td><td>多文件下载完成事件参数</td></tr>
<tr><td></td><td><code>DownloadFilesProgressChangedEventArgs</code></td><td>多文件下载进度事件参数</td></tr>
<tr><td><strong>结果类</strong></td><td><code>UploadResult</code></td><td>上传操作结果</td></tr>
<tr><td></td><td><code>DownloadResult</code></td><td>下载操作结果</td></tr>
<tr><td><strong>异常类</strong></td><td><code>InvalidConflictDetectionResult</code></td><td>冲突检测结果无效异常</td></tr>
<tr><td></td><td><code>ItemErrorException</code></td><td>Item 错误异常</td></tr>
<tr><td><strong>委托</strong></td><td>8 个 delegate</td><td>Checkin/Upload/Download 的 ProgressChanged 和 Completed 事件委托</td></tr>
<tr><td><strong>其他</strong></td><td><code>IOMEConfiguration</code></td><td>配置管理</td></tr>
<tr><td></td><td><code>CheckinManagerFlags</code></td><td>签入行为标志枚举</td></tr>
<tr><td></td><td><code>CheckoutManagerFlags</code></td><td>签出行为标志枚举</td></tr>
</tbody></table>

<h2>二、典型文件操作流程</h2>

```csharp
using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

// ===== 签出 → 编辑 → 签入 流程 =====

// 1. 签出文件
var checkoutMgr = new CheckoutManager(inn);
checkoutMgr.DownloadFileCompleted += (s, e) =>
{
    Console.WriteLine($"文件下载完成: {e.FileName} → {e.LocalPath}");
};

// 签出并下载 Part 的文件
var partItem = inn.getItemById("Part", "partId");
await checkoutMgr.CheckoutAsync(partItem);

// 用户编辑文件...

// 2. 签入文件
var checkinMgr = new CheckinManager(inn);
checkinMgr.CheckinProgressChanged += (s, e) =>
{
    Console.WriteLine($"签入进度: {e.ProgressPercentage}%");
};
checkinMgr.CheckinCompleted += (s, e) =>
{
    if (e.Error != null)
        Console.WriteLine($"签入失败: {e.Error.Message}");
    else
        Console.WriteLine("签入完成");
};

await checkinMgr.CheckinAsync(partItem);
```


<h2>三、命名空间导航</h2>
<table><thead><tr><th>使用场景</th><th>相关类型</th></tr></thead><tbody>
<tr><td>文件签入</td><td>CheckinManager, CheckinManagerFlags, CheckinCompletedEventArgs, CheckinProgressChangedEventArgs</td></tr>
<tr><td>文件签出</td><td>CheckoutManager, CheckoutManagerFlags, DownloadFileCompletedEventArgs, DownloadFilesCompletedEventArgs, DownloadFilesProgressChangedEventArgs</td></tr>
<tr><td>文件上传</td><td>UploadFileCompletedEventArgs, UploadFilesCompletedEventArgs, UploadFilesProgressChangedEventArgs</td></tr>
<tr><td>配置构建</td><td>IItemConfigurationBuilder, MultiParentConfigurationBuilder</td></tr>
<tr><td>异常处理</td><td>InvalidConflictDetectionResult, ItemErrorException</td></tr>
</tbody></table>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
