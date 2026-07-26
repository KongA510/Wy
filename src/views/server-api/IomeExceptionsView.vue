<template>
  <article class="doc-content">
    <h1>IOME 异常类型</h1>
    <blockquote><p><strong>IOME 文件管理操作中的异常类型。</strong>包含冲突检测结果无效异常和 Item 级别错误异常。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

    <h2>一、异常类定义</h2>
    <pre v-pre><code class="language-csharp">// InvalidConflictDetectionResult — 冲突检测结果无效异常
// 在签入冲突检测返回非预期结果时抛出
public class InvalidConflictDetectionResult : Exception
{
    public InvalidConflictDetectionResult()
    public InvalidConflictDetectionResult(string message)
    public InvalidConflictDetectionResult(string message, Exception innerException)
}

// ItemErrorException — Item 级别错误异常
// 封装了 Aras Item 错误信息到 .NET 异常体系中
public class ItemErrorException : Exception
{
    // 构造函数
    public ItemErrorException(string message)
    public ItemErrorException(string message, Exception innerException)

    // Aras 错误详情
    public string ErrorCode { get; set; }        // Aras 错误代码
    public string ErrorDetail { get; set; }      // 错误详细信息
    public string ErrorSource { get; set; }      // 错误来源
}</code></pre>

    <h2>二、代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

// ===== 签入异常处理 =====
var checkinMgr = new CheckinManager(inn);

try
{
    var item = inn.getItemById("Part", "partId");
    await checkinMgr.CheckinAsync(item);
}
catch (InvalidConflictDetectionResult ex)
{
    // 冲突检测失败 — 可能是有其他人同时修改了文件
    Console.WriteLine($"冲突检测失败: {ex.Message}");
    Console.WriteLine("建议: 重新签出获取最新版本后再签入");

    // 通知用户手动解决冲突
    // ShowConflictResolutionDialog();
}
catch (ItemErrorException ex)
{
    // Item 级别的业务错误
    Console.WriteLine($"Item 错误 [{ex.ErrorCode}]: {ex.Message}");
    Console.WriteLine($"详情: {ex.ErrorDetail}");
    Console.WriteLine($"来源: {ex.ErrorSource}");

    switch (ex.ErrorCode)
    {
        case "1001":
            Console.WriteLine("权限不足，无法签入文件");
            break;
        case "FILE_LOCKED":
            Console.WriteLine("文件被其他用户锁定");
            break;
        default:
            Console.WriteLine($"未处理的错误码: {ex.ErrorCode}");
            break;
    }
}
catch (OperationCanceledException)
{
    Console.WriteLine("操作已取消");
}
catch (Exception ex)
{
    Console.WriteLine($"未知错误: {ex.Message}");
    // 记录完整堆栈
    Console.WriteLine(ex.StackTrace);
}

// ===== 签出异常处理 =====
var checkoutMgr = new CheckoutManager(inn);

try
{
    await checkoutMgr.CheckoutAsync(inn.getItemById("Part", "partId"));
}
catch (ItemErrorException ex)
{
    Console.WriteLine($"签出失败: {ex.ErrorCode} - {ex.Message}");

    // 如果本地已有签出副本，提示用户
    if (ex.ErrorCode == "FILE_ALREADY_CHECKED_OUT")
    {
        Console.WriteLine("文件已被签出，是否强制重新签出？");
        // 使用 CheckoutManagerFlags.Force 重新签出
        await checkoutMgr.CheckoutAsync(
            inn.getItemById("Part", "partId"),
            CheckoutManagerFlags.Force
        );
    }
}

// ===== 全局错误日志 =====
void LogIomeError(string operation, Exception ex)
{
    var logEntry = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {operation} 失败:{Environment.NewLine}";

    if (ex is ItemErrorException itemEx)
    {
        logEntry += $"  Aras 错误码: {itemEx.ErrorCode}{Environment.NewLine}";
        logEntry += $"  详情: {itemEx.ErrorDetail}{Environment.NewLine}";
        logEntry += $"  来源: {itemEx.ErrorSource}{Environment.NewLine}";
    }
    else
    {
        logEntry += $"  类型: {ex.GetType().Name}{Environment.NewLine}";
        logEntry += $"  消息: {ex.Message}{Environment.NewLine}";
        logEntry += $"  堆栈: {ex.StackTrace}{Environment.NewLine}";
    }

    File.AppendAllText(@"C:\Logs\aras_iome_errors.log", logEntry);
}</code></pre>

    <h2>三、异常捕获顺序</h2>
    <pre v-pre><code class="language-csharp">// 推荐捕获顺序（从具体到泛化）
try
{
    await checkinMgr.CheckinAsync(item);
}
catch (InvalidConflictDetectionResult ex)  // 1. IOME 特定异常
{
    // 冲突检测异常
}
catch (ItemErrorException ex)              // 2. Aras Item 异常
{
    // 业务错误
}
catch (OperationCanceledException ex)      // 3. 取消
{
    // 用户取消
}
catch (Exception ex)                       // 4. 通用兜底
{
    // 未知错误
}</code></pre>

    <h2>四、实践笔记</h2>
    <ul>
      <li><strong>冲突检测：</strong>InvalidConflictDetectionResult 表明签入的版本与服务器不一致，通常是因为其他用户已签入更新版本</li>
      <li><strong>ItemErrorException 不等于 Item.isError：</strong>前者是 .NET 异常，后者是 AML 操作返回的错误 Item</li>
      <li><strong>ErrorCode 非标准：</strong>ItemErrorException.ErrorCode 的值取决于服务器端配置，没有固定标准码表</li>
      <li><strong>重试策略：</strong>对于网络类异常（非 InvalidConflictDetectionResult），可实现指数退避重试</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
  </article>
</template>
