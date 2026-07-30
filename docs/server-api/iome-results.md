---
title: 操作结果类型
---

<h1>操作结果类型</h1>
<blockquote><p><strong>IOME 文件操作的结果类型。</strong>UploadResult 和 DownloadResult 封装了文件上传/下载操作的结果信息。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、UploadResult</h2>

```csharp
// UploadResult — 单个文件上传结果
public class UploadResult
{
    public string FileId { get; set; }           // 服务器端文件 ID（成功时有效）
    public string FileName { get; set; }         // 文件名
    public string Status { get; set; }           // 状态："Success" 或 "Failed"
    public string ErrorMessage { get; set; }     // 错误消息（失败时有效）
    public long FileSize { get; set; }           // 文件大小（字节）
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
    public string Status { get; set; }           // 状态："Success" 或 "Failed"
    public string ErrorMessage { get; set; }     // 错误消息
    public long FileSize { get; set; }           // 文件大小
}
```


<h2>三、代码示例</h2>

```csharp
using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

// ===== 上传结果处理 =====
var checkinMgr = new CheckinManager(inn);

checkinMgr.CheckinCompleted += (sender, e) =>
{
    if (e.Results == null) return;

    var successFiles = new List<UploadResult>();
    var failedFiles = new List<UploadResult>();

    foreach (var result in e.Results)
    {
        if (result.Status == "Success")
        {
            successFiles.Add(result);
            Console.WriteLine($"✓ {result.FileName} → FileId={result.FileId}");
            // FileId 可用于后续操作（如直接下载该文件）
        }
        else
        {
            failedFiles.Add(result);
            Console.WriteLine($"✗ {result.FileName}: {result.ErrorMessage}");
        }
    }

    Console.WriteLine($"上传结果: {successFiles.Count} 成功, {failedFiles.Count} 失败");

    // 重试失败的文件
    if (failedFiles.Count > 0)
    {
        Console.WriteLine("重试失败的文件...");
        // retry logic
    }
};

// ===== 下载结果处理 =====
var checkoutMgr = new CheckoutManager(inn);

checkoutMgr.DownloadFilesCompleted += (sender, e) =>
{
    if (e.Results == null) return;

    foreach (var result in e.Results)
    {
        if (result.Status == "Success")
        {
            Console.WriteLine($"✓ {result.FileName} → {result.LocalPath}");
            // 可以打开文件或做后续处理
            // Process.Start(result.LocalPath);
        }
        else
        {
            Console.WriteLine($"✗ {result.FileName}: {result.ErrorMessage}");
        }
    }
};

// ===== 结果持久化（日志记录） =====
void LogUploadResults(IEnumerable<UploadResult> results)
{
    var logPath = @"C:\Logs\aras_uploads.log";
    var logEntry = string.Join(Environment.NewLine,
        results.Select(r =>
            $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] " +
            $"{r.FileName} ({FormatSize(r.FileSize)}) → {r.Status}" +
            (r.Status == "Failed" ? $" Error: {r.ErrorMessage}" : $" FileId: {r.FileId}")
        )
    );
    File.AppendAllText(logPath, logEntry + Environment.NewLine);
}

string FormatSize(long bytes)
{
    if (bytes >= 1_048_576) return $"{bytes / 1_048_576.0:F2} MB";
    if (bytes >= 1_024) return $"{bytes / 1_024.0:F2} KB";
    return $"{bytes} B";
}
```


<h2>四、实践笔记</h2>
<ul>
<li><strong>Status 字段：</strong>是 "Success" 或 "Failed" 字符串，不是布尔值，注意区分大小写</li>
<li><strong>FileId 用途：</strong>上传成功后的 FileId 可用于后续直接引用该文件（如 getFileUrl）</li>
<li><strong>LocalPath 有效性：</strong>下载成功时 LocalPath 指向实际保存位置，失败时为 null</li>
<li><strong>批量操作：</strong>在 Completed 事件中遍历 Results 列表，逐个处理成功/失败情况</li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
