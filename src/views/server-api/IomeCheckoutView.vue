<template>
  <article class="doc-content">
    <h1>CheckoutManager</h1>
    <blockquote>
      <p><strong>CheckoutManager 用于管理文件的签出（Check-out）操作。</strong>从 Aras Vault 服务器下载文件到本地工作目录，并将 File Item 标记为签出状态，防止并发编辑冲突。命名空间：Aras.IOME，程序集：IOME.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、类定义</h2>
    <pre v-pre><code class="language-csharp">// CheckoutManager — 文件签出管理器
public class CheckoutManager
{
    // 构造函数
    public CheckoutManager(Innovator innovator)

    // 签出文件到指定本地路径
    public Item Checkout(
        string localPath,     // 本地目标路径（文件将下载到此路径）
        Item fileItem         // 要签出的 File Item
    )

    // 签出文件（带标志）
    public Item Checkout(
        string localPath,
        Item fileItem,
        CheckoutManagerFlags flags
    )
}

// CheckoutManagerFlags — 签出选项的标志枚举
[Flags]
public enum CheckoutManagerFlags
{
    None = 0,
    // 获取最新版本（忽略本地缓存）
    GetLatest = 1,
    // 覆盖本地已有文件
    Overwrite = 2
}</code></pre>

    <h2>二、签出流程</h2>
    <pre v-pre><code class="language-text">1. 查询 File Item（获取文件元数据）
2. 指定本地目标路径
3. 创建 CheckoutManager 实例
4. 调用 CheckoutManager.Checkout()
5. 文件从 Vault 下载到本地路径
6. File Item 在 Aras 中标记为 "已签出" 状态
7. 获取 locked_by_id（当前用户的 ID）</code></pre>

    <h2>三、C# 代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOME;
using System;
using System.IO;

var inn = this.newInnovator();

// ===== 1. 查询 File Item =====
var fileQuery = inn.newItem("File", "get");
fileQuery.setID(fileId);  // 文件的 ID
fileQuery.setAttribute("select", "id,filename,file_size,checkedout_path");
var fileItem = fileQuery.apply();

if (fileItem.isError() || fileItem.getItemCount() == 0)
{
    return inn.newError("文件未找到: " + fileId);
}

// ===== 2. 检查是否已被他人签出 =====
string lockedBy = fileItem.getProperty("locked_by_id", "");
if (!string.IsNullOrEmpty(lockedBy) && lockedBy != inn.getUserID())
{
    return inn.newError("文件已被其他用户签出");
}

// ===== 3. 签出文件 =====
var checkoutMgr = new CheckoutManager(inn);

string workDir = @"D:\Vault\Working";
Directory.CreateDirectory(workDir);
string localPath = Path.Combine(workDir, fileItem.getProperty("filename", "download.dat"));

var checkoutResult = checkoutMgr.Checkout(localPath, fileItem);

if (checkoutResult.isError())
{
    return inn.newError("签出失败: " + checkoutResult.getErrorString());
}

Console.WriteLine($"文件已签出到: {localPath}");
Console.WriteLine($"文件大小: {fileItem.getProperty("file_size", "0")} 字节");

// ===== 4. 强制获取最新版本 =====
var checkoutFlags = CheckoutManagerFlags.GetLatest | CheckoutManagerFlags.Overwrite;
var result2 = checkoutMgr.Checkout(
    @"D:\Vault\Working\LatestDocument.pdf",
    fileItem,
    checkoutFlags
);</code></pre>

    <h2>四、完整示例：批量签出</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();
var checkoutMgr = new CheckoutManager(inn);

// 查询某个 Part 关联的所有文件
var partQuery = inn.newItem("Part", "get");
partQuery.setID(partId);
var relQuery = partQuery.createRelationship("Part Document", "get");
relQuery.setAttribute("select", "related_id");
var docItems = partQuery.apply();

// 批量签出所有文件
var results = inn.newResult("");
for (int i = 0; i < docItems.getItemCount(); i++)
{
    var relItem = docItems.getItemByIndex(i);
    string docId = relItem.getProperty("related_id", "");

    // 查询 Document 关联的 File
    var docQuery = inn.newItem("Document", "get");
    docQuery.setID(docId);
    var fileRel = docQuery.createRelationship("Document File", "get");
    fileRel.setAttribute("select", "related_id");
    var docWithFiles = docQuery.apply();

    for (int j = 0; j < docWithFiles.getItemCount(); j++)
    {
        var fileRef = docWithFiles.getItemByIndex(j);
        string fileItemId = fileRef.getProperty("related_id", "");

        // 获取 File Item
        var fileItem = inn.getItemById("File", fileItemId);

        // 签出
        string localFile = $@"D:\Vault\Working\Batch\{fileItem.getProperty("filename")}";
        var chkResult = checkoutMgr.Checkout(localFile, fileItem);
        if (chkResult.isError())
        {
            results.appendItem(chkResult);
        }
    }
}

if (results.getItemCount() > 0)
{
    return results;  // 返回失败的签出结果
}</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>并发控制：</strong>CheckoutManager 确保同一文件不会被多个用户同时签出编辑</li>
      <li><strong>本地路径必须是服务器路径：</strong>在服务端 Method 中运行 IOME 操作时，文件路径指向服务器文件系统</li>
      <li><strong>GetLatest 标志：</strong>即使本地已有缓存，也强制从 Vault 下载最新版本</li>
      <li><strong>Overwrite 标志：</strong>如果本地路径已有同名文件，使用此标志覆盖</li>
      <li><strong>签出后需签入：</strong>编辑完成后必须调用 CheckinManager.Checkin() 将修改写回 Vault</li>
      <li><strong>签出不是下载：</strong>如果只需要下载文件（不编辑），使用 getFileUrl + HTTP 下载，不需要签出</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOME_CheckoutManager.htm">CheckoutManager Class</a></li>
    </ul>
  </article>
</template>
