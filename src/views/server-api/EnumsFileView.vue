<template>
  <article class="doc-content">
    <h1>FetchFileMode / UrlType / VaultUrlType</h1>
    <blockquote>
      <p><strong>Aras.IOM 命名空间定义了三个关键枚举，用于文件操作和 URL 获取。</strong>命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、FetchFileMode 枚举</h2>
    <pre v-pre><code class="language-csharp">// 文件获取模式的标志枚举
[Flags]
public enum FetchFileMode
{
    // 用于 fetchFileProperty 方法
    // 具体值由 Aras 内部定义，可用 Flags 组合
    Default = 0,  // 默认模式
    // ... 其他标志按位组合
}

// 使用
item.fetchFileProperty("related_id", FetchFileMode.Default);</code></pre>
    <p>该枚举是 Flags 类型，可以组合多种模式（如指定下载后是否校验、是否覆盖等）。</p>

    <h2>二、UrlType 枚举</h2>
    <pre v-pre><code class="language-csharp">public enum UrlType
{
    Download,   // 下载 URL — 用于获取文件内容
    Thumbnail   // 缩略图 URL — 主要用于图片/图纸文件的缩略图预览
}

// 使用
string downloadUrl = inn.getFileUrl(fileId, UrlType.Download);
string thumbUrl = inn.getFileUrl(fileId, UrlType.Thumbnail);</code></pre>

    <h2>三、VaultUrlType 枚举</h2>
    <pre v-pre><code class="language-csharp">public enum VaultUrlType
{
    Default,        // 默认 Vault URL
    FileDownload    // 文件下载 Vault URL
}

// 使用重载指定 Vault 类型
string url = inn.getFileUrl(fileId, UrlType.Download, VaultUrlType.Default);</code></pre>

    <h2>四、完整示例</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 1. 获取文件下载 URL
string downloadUrl = inn.getFileUrl(fileId, UrlType.Download);

// 2. 获取缩略图 URL（适用于图片/图纸）
string thumbUrl = inn.getFileUrl(fileId, UrlType.Thumbnail);

// 3. 批量获取带 Vault 类型指定的 URL
var fileIds = new ArrayList();
fileIds.Add(fileId1);
fileIds.Add(fileId2);
var urls = inn.getFileUrls(fileIds, UrlType.Download, VaultUrlType.Default);

// 4. 获取文件属性时使用 FetchFileMode
var fileItem = inn.getItemById("File", fileId);
fileItem.fetchFileProperty("related_id", FetchFileMode.Default);</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>Thumbnail 仅对图像类文件有效：</strong>对于非图像文件，缩略图 URL 可能返回通用图标</li>
      <li><strong>VaultUrlType 通常在多 Vault 服务器上使用：</strong>单 Vault 环境使用 Default 即可</li>
      <li><strong>FetchFileMode.Flags 组合：</strong>可作为位掩码组合多个选项</li>
      <li><strong>扩展 FetchFileMode：</strong>具体标志位取决于 Aras 版本和配置</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_FetchFileMode.htm">FetchFileMode Enumeration</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_UrlType.htm">UrlType Enumeration</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_VaultUrlType.htm">VaultUrlType Enumeration</a></li>
    </ul>
  </article>
</template>
