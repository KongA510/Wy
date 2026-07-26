<template>
  <article class="doc-content">
    <h1>CheckinManager</h1>
    <blockquote>
      <p><strong>CheckinManager 用于管理文件的签入（Check-in）操作。</strong>将本地文件上传到 Aras Vault 服务器，并关联到指定的 Item。命名空间：Aras.IOME，程序集：IOME.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、类定义</h2>
    <pre v-pre><code class="language-csharp">// CheckinManager — 文件签入管理器
public class CheckinManager
{
    // 构造函数
    public CheckinManager(Innovator innovator)

    // 签入单个文件
    public Item Checkin(
        string filePath,      // 本地文件路径
        Item fileItem         // 目标 File Item（已签出状态）
    )

    // 签入并设置文件属性
    public Item Checkin(
        string filePath,
        Item fileItem,
        CheckinManagerFlags flags  // 签入标志
    )
}

// CheckinManagerFlags — 签入选项的标志枚举
[Flags]
public enum CheckinManagerFlags
{
    None = 0,
    // 保留签出状态（签入后可继续编辑）
    KeepCheckedOut = 1,
    // 覆盖已有文件
    Overwrite = 2
}</code></pre>

    <h2>二、签入流程</h2>
    <pre v-pre><code class="language-text">1. 获取要签入的 File Item（必须是已签出状态）
2. 指定本地文件路径
3. 调用 CheckinManager.Checkin()
4. 文件上传到 Vault 服务器
5. File Item 更新为签入状态
6. 版本号递增（如果是版本控制文件）</code></pre>

    <h2>三、C# 代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOME;
using System;

var inn = this.newInnovator();

// ===== 1. 签入单个文件（服务端 Method） =====
// 获取已签出的 File Item
var fileQuery = inn.newItem("File", "get");
fileQuery.setID(fileId);
fileQuery.setAttribute("select", "id,filename,checkedout_path");
var fileItem = fileQuery.apply();

if (fileItem.isError() || fileItem.getItemCount() == 0)
{
    return inn.newError("文件未找到");
}

// 创建 CheckinManager
var checkinMgr = new CheckinManager(inn);

// 签入文件（本地路径需要是服务器可访问路径）
var result = checkinMgr.Checkin(
    @"D:\Vault\UpdatedDocument.docx",
    fileItem
);

if (result.isError())
{
    return inn.newError("签入失败: " + result.getErrorString());
}

Console.WriteLine("文件签入成功");

// ===== 2. 签入并保留签出状态 =====
var checkinFlags = CheckinManagerFlags.KeepCheckedOut;
var result2 = checkinMgr.Checkin(
    @"D:\Vault\WorkingDocument.xlsx",
    fileItem,
    checkinFlags
);

// ===== 3. 批量签入 =====
string[] filesToCheckin = new[]
{
    @"D:\Vault\Design.docx",
    @"D:\Vault\Specs.xlsx",
    @"D:\Vault\Drawing.dwg"
};

var bulkResult = inn.newResult("");
foreach (var filePath in filesToCheckin)
{
    // 每个文件需要对应的已签出的 File Item
    var fileQuery2 = inn.newItem("File", "get");
    // ... 获取对应的 File Item
    var checkinResult = checkinMgr.Checkin(filePath, fileItem2);
    if (checkinResult.isError())
    {
        bulkResult.appendItem(checkinResult);
    }
}</code></pre>

    <h2>四、完整示例：编辑-签出-签入工作流</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// === 步骤 1：签出文件 ===
var checkOutMgr = new CheckoutManager(inn);
var checkedOutItem = checkOutMgr.Checkout(
    @"D:\Vault\Working\Document.docx",  // 本地工作路径
    fileItem
);

if (checkedOutItem.isError())
{
    return inn.newError("签出失败: " + checkedOutItem.getErrorString());
}

// === 步骤 2：用户在本地编辑文件 ===
// （用户操作：编辑 D:\Vault\Working\Document.docx）

// === 步骤 3：签入文件 ===
var checkInMgr = new CheckinManager(inn);
var checkinResult = checkInMgr.Checkin(
    @"D:\Vault\Working\Document.docx",  // 编辑后的本地文件
    checkedOutItem
);

if (checkinResult.isError())
{
    return inn.newError("签入失败: " + checkinResult.getErrorString());
}

Console.WriteLine("签入完成，版本已更新");</code></pre>

    <h2>五、实践笔记</h2>
    <ul>
      <li><strong>签入签出必须成对：</strong>文件必须先通过 CheckoutManager 签出，编辑后才能通过 CheckinManager 签入</li>
      <li><strong>本地路径注意：</strong>在服务端 Method 中，文件路径必须是服务器上的路径（而非客户端路径）</li>
      <li><strong>KeepCheckedOut：</strong>签入后仍保留签出状态，适用于频繁编辑的场景</li>
      <li><strong>版本控制：</strong>对于启用了版本控制的文件类型，每次签入会增加版本号</li>
      <li><strong>文件锁定：</strong>签出后会锁定文件，其他用户无法同时签出编辑</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOME_CheckinManager.htm">CheckinManager Class</a></li>
    </ul>
  </article>
</template>
