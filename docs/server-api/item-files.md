---
title: 文件管理
---

<h1>文件管理</h1>
<blockquote>
<p><strong>Item 提供完整的文件管理方法。</strong>包括物理文件附件、文件流上传/下载、Vault 检出等。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

<h2>一、文件上传</h2>

```csharp
// attachPhysicalFile(String) — 附加物理文件
public void attachPhysicalFile(string filePath)
// 在调用 apply() 时，文件会被流式传输到服务器

var fileItem = inn.newItem("File", "add");
fileItem.attachPhysicalFile(@"C:\docs\specification.pdf");
fileItem.apply(); // 文件随请求一起上传

// attachPhysicalFile(String, String) — [已废弃]
// 使用单参数版本代替

// attachPhysicalFileViaStream(String, Stream) — 流式附加
public void attachPhysicalFileViaStream(string fileName, Stream stream)

// setFileProperty(String, String) — 设置文件属性
public void setFileProperty(string propertyName, string filePath)

// setFilePropertyViaStream(String, String, Stream) — 通过流设置文件
public void setFilePropertyViaStream(string propertyName, string fileName, Stream stream)
```


<h2>二、文件下载</h2>

```csharp
// fetchFileProperty(String, FetchFileMode) — 下载文件
public void fetchFileProperty(string propertyName, FetchFileMode mode)

// 将文件下载到目标路径
item.fetchFileProperty("related_id", FetchFileMode.Default);

// fetchFilePropertyWithStream — 通过流下载
public void fetchFilePropertyWithStream(string propertyName)

// checkout(String) — 检出文件到本地
public void checkout(string localDirectory)
// checkout 将物理文件从 Vault 检出到指定本地目录
item.checkout(@"C:\temp\checkout\");
```


<h2>三、getFileName / setFileName（已废弃）</h2>

```csharp
// [Obsolete] getFileName
// [Obsolete] setFileName
// 这些方法仅对 type="File" 的 Item 有意义
// 请使用 ItemType 属性操作代替
```


<h2>四、完整示例</h2>

```csharp
var inn = this.newInnovator();

// 上传文档及其附件
var doc = inn.newItem("Document", "add");
doc.setNewID();
doc.setProperty("name", "设计规范");
doc.setProperty("item_number", "DOC-001");

// 附加物理文件
var fileItem = doc.createRelationship("Document File", "add");
var relatedFile = fileItem.createRelatedItem("File", "add");
relatedFile.setProperty("filename", "specification.pdf");
relatedFile.attachPhysicalFile(@"C:\uploads\specification.pdf");

doc.apply(); // 文档和文件一起提交

// 下载/检出文件
var existingDoc = inn.getItemById("Document", docId);
existingDoc.fetchRelationships("Document File");
var files = existingDoc.getRelationships("Document File");
for (int i = 0; i < files.getItemCount(); i++) {
    var file = files.getItemByIndex(i);
    var fileItem2 = inn.getItemById("File", file.getRelatedItemID());
    // 检出
    fileItem2.checkout(@"C:\temp\downloads\");
}
```


<h2>五、实践笔记</h2>
<ul>
<li><strong>大文件使用流：</strong>attachPhysicalFileViaStream 对超大文件更友好</li>
<li><strong>文件路径是服务器端路径：</strong>服务端 Method 中的文件路径是服务器本地路径</li>
<li><strong>checkout 支持异步：</strong>配合 IOME.CheckoutManager 可实现带进度的异步下载</li>
<li><strong>文件版本：</strong>attachPhysicalFile 后续的 new version 会创建文件的新版本</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_checkout.htm">checkout Method</a></li>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_attachPhysicalFile.htm">attachPhysicalFile Method</a></li>
</ul>
