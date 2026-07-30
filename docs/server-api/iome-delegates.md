---
title: 事件委托一览
---

<h1>IOME 事件委托一览</h1>
<blockquote><p><strong>Aras.IOME 命名空间中所有事件委托的完整列表。</strong>包含签入、签出（下载）、上传相关的进度和完成委托共 8 个。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、委托总表</h2>
<table><thead><tr><th>委托名称</th><th>关联事件</th><th>所属类</th></tr></thead><tbody>
<tr><td><code>CheckinProgressChangedEventHandler</code></td><td>CheckinProgressChanged</td><td>CheckinManager</td></tr>
<tr><td><code>CheckinCompletedEventHandler</code></td><td>CheckinCompleted</td><td>CheckinManager</td></tr>
<tr><td><code>UploadFileCompletedEventHandler</code></td><td>UploadFileCompleted</td><td>CheckinManager</td></tr>
<tr><td><code>UploadFilesCompletedEventHandler</code></td><td>UploadFilesCompleted</td><td>CheckinManager</td></tr>
<tr><td><code>UploadFilesProgressChangedEventHandler</code></td><td>UploadFilesProgressChanged</td><td>CheckinManager</td></tr>
<tr><td><code>DownloadFileCompletedEventHandler</code></td><td>DownloadFileCompleted</td><td>CheckoutManager</td></tr>
<tr><td><code>DownloadFilesCompletedEventHandler</code></td><td>DownloadFilesCompleted</td><td>CheckoutManager</td></tr>
<tr><td><code>DownloadFilesProgressChangedEventHandler</code></td><td>DownloadFilesProgressChanged</td><td>CheckoutManager</td></tr>
</tbody></table>

<h2>二、委托签名</h2>

```csharp
// ─── CheckinManager 委托 ───

public delegate void CheckinProgressChangedEventHandler(
    object sender, CheckinProgressChangedEventArgs e
);

public delegate void CheckinCompletedEventHandler(
    object sender, CheckinCompletedEventArgs e
);

public delegate void UploadFileCompletedEventHandler(
    object sender, UploadFileCompletedEventArgs e
);

public delegate void UploadFilesCompletedEventHandler(
    object sender, UploadFilesCompletedEventArgs e
);

public delegate void UploadFilesProgressChangedEventHandler(
    object sender, UploadFilesProgressChangedEventArgs e
);

// ─── CheckoutManager 委托 ───

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


<h2>三、事件与委托映射（CheckinManager）</h2>

```csharp
public class CheckinManager
{
    // 签入进度
    public event CheckinProgressChangedEventHandler CheckinProgressChanged;
    // 签入完成
    public event CheckinCompletedEventHandler CheckinCompleted;
    // 单文件上传完成
    public event UploadFileCompletedEventHandler UploadFileCompleted;
    // 多文件上传完成
    public event UploadFilesCompletedEventHandler UploadFilesCompleted;
    // 多文件上传进度
    public event UploadFilesProgressChangedEventHandler UploadFilesProgressChanged;
}
```


<h2>四、事件与委托映射（CheckoutManager）</h2>

```csharp
public class CheckoutManager
{
    // 单文件下载完成
    public event DownloadFileCompletedEventHandler DownloadFileCompleted;
    // 多文件下载完成
    public event DownloadFilesCompletedEventHandler DownloadFilesCompleted;
    // 多文件下载进度
    public event DownloadFilesProgressChangedEventHandler DownloadFilesProgressChanged;
}
```


<h2>五、完整注册示例</h2>

```csharp
using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

// ===== 签入 — 注册全部 5 个事件 =====
var checkinMgr = new CheckinManager(inn);

checkinMgr.CheckinProgressChanged += OnCheckinProgressChanged;
checkinMgr.CheckinCompleted += OnCheckinCompleted;
checkinMgr.UploadFileCompleted += OnUploadFileCompleted;
checkinMgr.UploadFilesCompleted += OnUploadFilesCompleted;
checkinMgr.UploadFilesProgressChanged += OnUploadFilesProgressChanged;

// ===== 签出 — 注册全部 3 个事件 =====
var checkoutMgr = new CheckoutManager(inn);

checkoutMgr.DownloadFileCompleted += OnDownloadFileCompleted;
checkoutMgr.DownloadFilesCompleted += OnDownloadFilesCompleted;
checkoutMgr.DownloadFilesProgressChanged += OnDownloadFilesProgressChanged;

// ─── 事件处理方法 ───

void OnCheckinProgressChanged(object sender, CheckinProgressChangedEventArgs e)
    => Console.WriteLine($"签入: {e.ProgressPercentage}%");

void OnCheckinCompleted(object sender, CheckinCompletedEventArgs e)
    => Console.WriteLine($"签入完成, 错误: {e.Error?.Message ?? "无"}");

void OnUploadFileCompleted(object sender, UploadFileCompletedEventArgs e)
    => Console.WriteLine($"上传完毕: {e.FileName}");

void OnUploadFilesCompleted(object sender, UploadFilesCompletedEventArgs e)
    => Console.WriteLine($"全部上传完成: {e.SuccessfulFiles}/{e.TotalFiles}");

void OnUploadFilesProgressChanged(object sender, UploadFilesProgressChangedEventArgs e)
    => Console.WriteLine($"上传: {e.ProgressPercentage}%");

void OnDownloadFileCompleted(object sender, DownloadFileCompletedEventArgs e)
    => Console.WriteLine($"下载: {e.FileName} → {e.LocalPath}");

void OnDownloadFilesCompleted(object sender, DownloadFilesCompletedEventArgs e)
    => Console.WriteLine($"下载完成: {e.SuccessfulFiles}/{e.TotalFiles}");

void OnDownloadFilesProgressChanged(object sender, DownloadFilesProgressChangedEventArgs e)
    => Console.WriteLine($"下载: {e.ProgressPercentage}%");
```


<h2>六、实践笔记</h2>
<ul>
<li><strong>事件命名规律：</strong>CheckinManager 负责签入→上传事件，CheckoutManager 负责签出→下载事件</li>
<li><strong>Progress 事件触发频率：</strong>进度事件可能高频触发（每秒多次），避免在处理方法中做耗时操作</li>
<li><strong>Completed 事件保证触发：</strong>即使操作失败或被取消，Completed 事件也一定触发（Error 或 Cancelled 字段标记状态）</li>
<li><strong>FileCompleted vs FilesCompleted：</strong>单文件操作触发 *FileCompleted，多文件操作同时触发 *FileCompleted 和 *FilesCompleted</li>
<li><strong>委托解绑：</strong>操作完成后建议解绑事件避免内存泄漏：<code>checkinMgr.CheckinCompleted -= OnCheckinCompleted;</code></li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
