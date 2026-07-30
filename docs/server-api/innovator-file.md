---
title: getFileUrl / getFileUrls / getChecksum
---

# getFileUrl / getChecksum
<blockquote>
<p><strong>Innovator 提供文件 URL 获取和文件校验功能。</strong>支持单个和批量获取文件 URL，支持不同的 URL 类型和 Vault 类型。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

## 一、getFileUrl — 单文件 URL

```csharp
// 重载 1：指定 ID 和 UrlType
// public string getFileUrl(string fileId, UrlType urlType)

// 重载 2：指定 ID、UrlType 和 VaultUrlType
// public string getFileUrl(string fileId, UrlType urlType, VaultUrlType vaultType)

// 获取文件下载 URL
var inn = this.newInnovator();
string downloadUrl = inn.getFileUrl(fileId, UrlType.Download);
string thumbnailUrl = inn.getFileUrl(fileId, UrlType.Thumbnail);
```


## 二、getFileUrls — 批量文件 URL

```csharp
// 重载 1：ArrayList + UrlType
// public ArrayList getFileUrls(ArrayList fileIds, UrlType urlType)

// 重载 2：ArrayList + UrlType + VaultUrlType
// public ArrayList getFileUrls(ArrayList fileIds, UrlType urlType, VaultUrlType vaultType)

// 批量获取
var fileIds = new ArrayList();
fileIds.Add(fileId1);
fileIds.Add(fileId2);
var urls = inn.getFileUrls(fileIds, UrlType.Download);

foreach (string url in urls) {
    Console.WriteLine(url);
}
```


## 三、getChecksum(String)

```csharp
// 签名
public string getChecksum(string filePath)

// 计算指定文件的 128 位哈希值
string hash = inn.getChecksum(@"C:\temp\document.pdf");
// 返回十六进制字符串
```

<p><strong>参数：</strong></p>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody><tr><td><code>filePath</code></td><td><code>string</code></td><td>本地文件系统中的文件路径</td></tr></tbody>
</table>
<p><strong>返回值：</strong><code>string</code> — 文件的 128 位哈希值的十六进制表示</p>

## 四、UrlType 枚举
<table>
<thead><tr><th>值</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>Download</code></td><td>下载 URL，用于获取文件内容</td></tr>
<tr><td><code>Thumbnail</code></td><td>缩略图 URL（主要用于图片/图纸文件）</td></tr>
</tbody>
</table>

## 五、VaultUrlType 枚举
<table>
<thead><tr><th>值</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>Default</code></td><td>默认 Vault URL 类型</td></tr>
<tr><td><code>FileDownload</code></td><td>文件下载 Vault URL</td></tr>
</tbody>
</table>

## 六、完整示例：批量下载附件

```csharp
var inn = this.newInnovator();

// 获取 Part 的附件列表
var part = inn.getItemById("Part", partId);
var rels = part.getRelationships("Part Document");
var fileIds = new ArrayList();

for (int i = 0; i < rels.getItemCount(); i++) {
    var rel = rels.getItemByIndex(i);
    var relatedId = rel.getRelatedItemID();
    var doc = inn.getItemById("Document", relatedId);
    if (doc != null) {
        // 获取文档的已检入文件
        var fileItems = doc.getRelationships("Document File");
        for (int j = 0; j < fileItems.getItemCount(); j++) {
            var fileRel = fileItems.getItemByIndex(j);
            // 假设有文件关联
            fileIds.Add(fileRel.getRelatedItemID());
        }
    }
}

// 批量获取下载 URL
if (fileIds.Count > 0) {
    var urls = inn.getFileUrls(fileIds, UrlType.Download);
    foreach (string url in urls) {
        // 每个 URL 可以直接用于下载或传给前端
        Console.WriteLine("Download: " + url);
    }
}
```


## 七、实践笔记
<ul>
<li><strong>URL 有效期：</strong>返回的 URL 可能包含时间敏感的 token，不应长期缓存</li>
<li><strong>批量优于逐个：</strong>getFileUrls 一次请求获取多个 URL，减少 HTTP 往返</li>
<li><strong>getChecksum 用于客户端：</strong>通常用于文件完整性校验，比较本地和服务端的文件哈希</li>
<li><strong>Vault 配置：</strong>Vault URL 类型取决于服务器的 Vault 配置，默认使用 Default 即可</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_getFileUrl.htm">getFileUrl Method</a></li>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_getFileUrls.htm">getFileUrls Method</a></li>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_UrlType.htm">UrlType Enumeration</a></li>
</ul>
