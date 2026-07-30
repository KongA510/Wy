---
title: 下载事件体系
---

<h1>下载事件体系</h1>
<blockquote><p><strong>文件下载相关的事件参数与处理。</strong>包含单文件下载完成、多文件下载进度和完成事件，用于 CheckoutManager 的文件签出下载流程。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、事件参数类</h2>

```csharp
// DownloadFileCompletedEventArgs — 单文件下载完成
public class DownloadFileCompletedEventArgs : EventArgs
{
    public string FileName { get; }              // 文件名
    public string LocalPath { get; }             // 本地保存路径
    public long FileSize { get; }                // 文件大小（字节）
    public Exception Error { get; }              // 错误（成功时为 null）
    public bool Cancelled { get; }               // 是否取消
}

// DownloadFilesCompletedEventArgs — 多文件下载完成
public class DownloadFilesCompletedEventArgs : EventArgs
{
    public int TotalFiles { get; }               // 总文件数
    public int SuccessfulFiles { get; }          // 成功下载数
    public int FailedFiles { get; }              // 失败下载数
    public bool Cancelled { get; }               // 是否取消
    public Exception Error { get; }              // 整体错误
    public IReadOnlyList<DownloadResult> Results { get; }  // 各文件详细结果
}

// DownloadFilesProgressChangedEventArgs — 多文件下载进度
public class DownloadFilesProgressChangedEventArgs : EventArgs
{
    public int ProgressPercentage { get; }       // 总体进度百分比
    public string CurrentFile { get; }           // 当前下载的文件名
    public long BytesDownloaded { get; }         // 已下载字节数
    public long TotalBytes { get; }              // 总字节数
    public int FilesDownloaded { get; }          // 已完成文件数
    public int TotalFiles { get; }               // 总文件数
}
```


<h2>二、DownloadResult</h2>

```csharp
// DownloadResult — 单个文件下载结果
public class DownloadResult
{
    public string FileId { get; set; }           // 文件 ID
    public string FileName { get; set; }         // 文件名
    public string LocalPath { get; set; }        // 本地保存路径
    public string Status { get; set; }           // 状态
    public string ErrorMessage { get; set; }     // 错误消息
    public long FileSize { get; set; }           // 文件大小
}
```


<h2>三、事件委托</h2>

```csharp
public delegate void DownloadFileCompletedEventHandler(
    object sender, DownloadFileCompletedEventArgs e
);

public delegate void DownloadFilesCompletedEventHandler(
    object sender, DownloadFilesCompletedEventArgs e
);

public delegate void DownloadFilesProgressChangedEventHandler(
    object sender, DownloadFilesProgressChangedEventArgs e
);
```


<h2>四、CheckoutManager 事件</h2>

```csharp
public class CheckoutManager
{
    // 事件
    public event DownloadFileCompletedEventHandler DownloadFileCompleted;
    public event DownloadFilesCompletedEventHandler DownloadFilesCompleted;
    public event DownloadFilesProgressChangedEventHandler DownloadFilesProgressChanged;

    // 异步签出
    public Task CheckoutAsync(Item item)
    public Task CheckoutAsync(Item item, CheckoutManagerFlags flags)
    public Task CheckoutAsync(Item item, string targetDirectory)
}
```


<h2>五、代码示例</h2>

```csharp
using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

var checkoutMgr = new CheckoutManager(inn);

// ===== 下载进度事件 =====
checkoutMgr.DownloadFilesProgressChanged += (sender, e) =>
{
    Console.WriteLine($"下载进度: {e.ProgressPercentage}%");
    Console.WriteLine($"  字节: {FormatSize(e.BytesDownloaded)} / {FormatSize(e.TotalBytes)}");
    Console.WriteLine($"  文件: {e.FilesDownloaded}/{e.TotalFiles} - {e.CurrentFile}");
};

// ===== 多文件下载完成 =====
checkoutMgr.DownloadFilesCompleted += (sender, e) =>
{
    if (e.Cancelled)
    {
        Console.WriteLine("下载已取消");
        return;
    }

    Console.WriteLine($"下载完成: {e.SuccessfulFiles}/{e.TotalFiles} 成功");

    if (e.Results != null)
    {
        foreach (var result in e.Results)
        {
            if (result.Status == "Success")
                Console.WriteLine($"  ✓ {result.FileName} → {result.LocalPath}");
            else
                Console.WriteLine($"  ✗ {result.FileName}: {result.ErrorMessage}");
        }
    }
};

// ===== 单文件下载完成 =====
checkoutMgr.DownloadFileCompleted += (sender, e) =>
{
    if (e.Error != null)
    {
        Console.WriteLine($"文件 {e.FileName} 下载失败: {e.Error.Message}");
        return;
    }
    Console.WriteLine($"文件已保存: {e.LocalPath} ({FormatSize(e.FileSize)})");
};

// ===== 签出到指定目录 =====
var item = inn.getItemById("Part", "partId");
string targetDir = @"C:\ArasFiles\Checkouts";

await checkoutMgr.CheckoutAsync(item, targetDir);

// ===== 带进度条的 WinForms 签出 =====
async Task CheckoutWithUI(Item item, ProgressBar bar, Label statusLabel)
{
    var mgr = new CheckoutManager(inn);

    mgr.DownloadFilesProgressChanged += (s, e) =>
    {
        bar.Invoke((MethodInvoker)(() =>
        {
            bar.Value = e.ProgressPercentage;
            statusLabel.Text = $"下载中: {e.FilesDownloaded}/{e.TotalFiles}";
        }));
    };

    mgr.DownloadFilesCompleted += (s, e) =>
    {
        bar.Invoke((MethodInvoker)(() =>
        {
            bar.Value = 100;
            statusLabel.Text = e.Error == null
                ? $"完成: {e.SuccessfulFiles} 个文件"
                : "下载失败";
        }));
    };

    await mgr.CheckoutAsync(item, @"C:\ArasFiles\Checkouts");
}

string FormatSize(long bytes)
{
    if (bytes >= 1_073_741_824) return $"{bytes / 1_073_741_824.0:F2} GB";
    if (bytes >= 1_048_576) return $"{bytes / 1_048_576.0:F2} MB";
    if (bytes >= 1_024) return $"{bytes / 1_024.0:F2} KB";
    return $"{bytes} B";
}
```


<h2>六、实践笔记</h2>
<ul>
<li><strong>targetDirectory：</strong>签出时可指定目标目录，文件将下载到该目录</li>
<li><strong>大文件处理：</strong>BytesDownloaded/TotalBytes 提供字节级进度，适合几百 MB 的 CAD 文件</li>
<li><strong>冲突文件：</strong>如果本地已存在同名文件，CheckoutManager 会根据 Flags 配置决定覆盖或保留</li>
<li><strong>网络中断：</strong>下载失败会通过 DownloadFileCompleted 的 Error 属性报告，可实现断点续传重试</li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
