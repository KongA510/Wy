<template>
  <article class="doc-content">
    <h1>签入事件体系</h1>
    <blockquote><p><strong>CheckinManager 的签入进度与完成事件。</strong>通过事件机制监控文件签入过程的进度和结果，实现异步签入操作。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、事件参数类</h2>
    <pre v-pre><code class="language-csharp">// CheckinProgressChangedEventArgs — 签入进度变化事件参数
public class CheckinProgressChangedEventArgs : EventArgs
{
    public int ProgressPercentage { get; }       // 进度百分比 (0-100)
    public string CurrentFile { get; }          // 当前正在处理的文件名
    public int FilesProcessed { get; }           // 已处理文件数
    public int TotalFiles { get; }              // 总文件数
}

// CheckinCompletedEventArgs — 签入完成事件参数
public class CheckinCompletedEventArgs : EventArgs
{
    public bool Cancelled { get; }              // 是否被取消
    public Exception Error { get; }             // 错误信息（成功时为 null）
    public IReadOnlyList&lt;UploadResult&gt; Results { get; }  // 上传结果列表
}</code></pre>

    <h2>二、事件委托</h2>
    <pre v-pre><code class="language-csharp">// 签入进度变化委托
public delegate void CheckinProgressChangedEventHandler(
    object sender,
    CheckinProgressChangedEventArgs e
);

// 签入完成委托
public delegate void CheckinCompletedEventHandler(
    object sender,
    CheckinCompletedEventArgs e
);</code></pre>

    <h2>三、CheckinManager 事件</h2>
    <pre v-pre><code class="language-csharp">public class CheckinManager
{
    // 事件
    public event CheckinProgressChangedEventHandler CheckinProgressChanged;
    public event CheckinCompletedEventHandler CheckinCompleted;

    // 异步签入
    public Task CheckinAsync(Item item)
    public Task CheckinAsync(Item item, CheckinManagerFlags flags)
}</code></pre>

    <h2>四、代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

// ===== 带完整事件处理的签入 =====
var checkinMgr = new CheckinManager(inn);

// 进度事件
checkinMgr.CheckinProgressChanged += (sender, e) =>
{
    Console.WriteLine($"签入进度: {e.ProgressPercentage}%");
    Console.WriteLine($"  当前文件: {e.CurrentFile}");
    Console.WriteLine($"  进度: {e.FilesProcessed}/{e.TotalFiles}");

    // 可更新 UI 进度条
    // progressBar.Value = e.ProgressPercentage;
};

// 完成事件
checkinMgr.CheckinCompleted += (sender, e) =>
{
    if (e.Cancelled)
    {
        Console.WriteLine("签入被取消");
        return;
    }

    if (e.Error != null)
    {
        Console.WriteLine($"签入失败: {e.Error.Message}");
        if (e.Error is ItemErrorException itemError)
        {
            // Item 级别错误，可能有部分成功
            Console.WriteLine($"部分文件可能已上传，共 {e.Results?.Count ?? 0} 个结果");
        }
        return;
    }

    Console.WriteLine("签入成功完成");
    if (e.Results != null)
    {
        foreach (var result in e.Results)
        {
            Console.WriteLine($"  ✓ {result.FileName}: {result.Status}");
        }
    }
};

// 执行签入
var item = inn.getItemById("Part", "partId");
await checkinMgr.CheckinAsync(item);

// ===== 带取消功能的签入 =====
var cts = new CancellationTokenSource();

checkinMgr.CheckinProgressChanged += (sender, e) =>
{
    // 检查是否需要取消
    if (e.ProgressPercentage > 90)
    {
        // 最后 10% 不取消
    }
};

// 用户点击取消按钮时
// cts.Cancel();

try
{
    await checkinMgr.CheckinAsync(item);
}
catch (OperationCanceledException)
{
    Console.WriteLine("签入已取消");
}</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>UI 线程：</strong>事件回调在后台线程执行，更新 UI 需要通过 <code>Dispatcher.Invoke</code>（WPF）或 <code>Control.Invoke</code>（WinForms）</li>
      <li><strong>部分成功：</strong>CheckinCompleted 中即使有 Error，Results 仍可能包含部分成功上传的文件</li>
      <li><strong>事件注册时机：</strong>必须在调用 CheckinAsync 之前注册事件</li>
      <li><strong>内存泄漏：</strong>CheckinManager 用完记得取消注册事件，避免持有引用导致 GC 无法回收</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
  </article>
</template>
