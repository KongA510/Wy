<template>
  <article class="doc-content">
    <h1>上传事件体系</h1>
    <blockquote><p><strong>文件上传相关的事件参数与处理。</strong>包含单文件上传完成、多文件上传进度和完成事件。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、事件参数类</h2>
    <pre v-pre><code class="language-csharp">// UploadFileCompletedEventArgs — 单文件上传完成
public class UploadFileCompletedEventArgs : EventArgs
{
    public string FileName { get; }              // 上传的文件名
    public long FileSize { get; }                // 文件大小（字节）
    public UploadResult Result { get; }          // 上传结果
    public Exception Error { get; }              // 错误（成功时为 null）
    public bool Cancelled { get; }               // 是否取消
}

// UploadFilesCompletedEventArgs — 多文件上传完成
public class UploadFilesCompletedEventArgs : EventArgs
{
    public int TotalFiles { get; }               // 总文件数
    public int SuccessfulFiles { get; }          // 成功上传数
    public int FailedFiles { get; }              // 失败上传数
    public bool Cancelled { get; }               // 是否取消
    public Exception Error { get; }              // 整体错误
    public IReadOnlyList&lt;UploadResult&gt; Results { get; }  // 每个文件的详细结果
}

// UploadFilesProgressChangedEventArgs — 多文件上传进度
public class UploadFilesProgressChangedEventArgs : EventArgs
{
    public int ProgressPercentage { get; }       // 总体进度百分比
    public string CurrentFile { get; }           // 当前上传的文件名
    public long BytesUploaded { get; }           // 已上传字节数
    public long TotalBytes { get; }              // 总字节数
    public int FilesUploaded { get; }            // 已完成文件数
    public int TotalFiles { get; }               // 总文件数
}</code></pre>

    <h2>二、UploadResult</h2>
    <pre v-pre><code class="language-csharp">// UploadResult — 单个文件上传结果
public class UploadResult
{
    public string FileId { get; set; }           // 服务器端文件 ID
    public string FileName { get; set; }         // 文件名
    public string Status { get; set; }           // 状态（"Success" / "Failed"）
    public string ErrorMessage { get; set; }     // 错误消息
    public long FileSize { get; set; }           // 文件大小
}</code></pre>

    <h2>三、事件委托</h2>
    <pre v-pre><code class="language-csharp">public delegate void UploadFileCompletedEventHandler(
    object sender, UploadFileCompletedEventArgs e
);

public delegate void UploadFilesCompletedEventHandler(
    object sender, UploadFilesCompletedEventArgs e
);

public delegate void UploadFilesProgressChangedEventHandler(
    object sender, UploadFilesProgressChangedEventArgs e
);</code></pre>

    <h2>四、代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

var checkinMgr = new CheckinManager(inn);

// ===== 多文件上传进度 =====
checkinMgr.UploadFilesProgressChanged += (sender, e) =>
{
    Console.WriteLine($"上传进度: {e.ProgressPercentage}%");
    Console.WriteLine($"  字节: {FormatBytes(e.BytesUploaded)} / {FormatBytes(e.TotalBytes)}");
    Console.WriteLine($"  文件: {e.FilesUploaded}/{e.TotalFiles} - 当前: {e.CurrentFile}");

    // UI 进度条
    // progressBar.Maximum = 100;
    // progressBar.Value = e.ProgressPercentage;
    // statusLabel.Text = $"{e.FilesUploaded}/{e.TotalFiles} 文件";
};

// ===== 多文件上传完成 =====
checkinMgr.UploadFilesCompleted += (sender, e) =>
{
    if (e.Cancelled)
    {
        Console.WriteLine("上传已取消");
        return;
    }

    Console.WriteLine($"上传完成: 成功 {e.SuccessfulFiles}/{e.TotalFiles}, 失败 {e.FailedFiles}");

    if (e.Results != null)
    {
        foreach (var result in e.Results)
        {
            if (result.Status == "Failed")
            {
                Console.WriteLine($"  ✗ {result.FileName}: {result.ErrorMessage}");
            }
            else
            {
                Console.WriteLine($"  ✓ {result.FileName} ({FormatBytes(result.FileSize)}) → FileId: {result.FileId}");
            }
        }
    }

    if (e.Error != null)
    {
        Console.WriteLine($"整体错误: {e.Error.Message}");
    }
};

// ===== 单文件上传完成 =====
checkinMgr.UploadFileCompleted += (sender, e) =>
{
    if (e.Error != null)
    {
        Console.WriteLine($"文件 {e.FileName} 上传失败: {e.Error.Message}");
        // 可以单独重试失败的文件
        return;
    }

    Console.WriteLine($"文件 {e.FileName} 上传成功 ({FormatBytes(e.FileSize)})");
};

// 辅助方法
string FormatBytes(long bytes)
{
    if (bytes >= 1_073_741_824) return $"{bytes / 1_073_741_824.0:F2} GB";
    if (bytes >= 1_048_576) return $"{bytes / 1_048_576.0:F2} MB";
    if (bytes >= 1_024) return $"{bytes / 1_024.0:F2} KB";
    return $"{bytes} B";
}
</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>BytesUploaded/TotalBytes：</strong>提供精确的字节级进度，适合大文件上传时显示详细进度</li>
      <li><strong>单文件 vs 多文件：</strong>签入多个文件时 UploadFiles* 事件触发，单个小文件可能只触发 UploadFileCompleted</li>
      <li><strong>重试策略：</strong>UploadFilesCompleted 中可通过 Results 列表识别失败文件，单独重试</li>
      <li><strong>取消支持：</strong>CheckinManager 提供 CancellationToken 参数支持取消上传</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
  </article>
</template>
