<template>
  <article class="doc-content">
    <h1>WindowsAuthHelperComConnector</h1>
    <blockquote>
      <p><strong>WindowsAuthHelperComConnector 在启用 Windows 身份验证时用于 COM 与 .NET 之间的互操作连接。</strong>解决 COM 客户端在 Windows 认证环境下的连接问题。命名空间：Aras.Net，程序集：Aras.Net.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、类定义</h2>
    <pre v-pre><code class="language-csharp">// WindowsAuthHelperComConnector — Windows 认证 COM 连接器
// 提供 COM 互操作能力，使 COM 客户端能通过 Windows 认证连接到 Aras
public class WindowsAuthHelperComConnector
{
    // 构造函数
    public WindowsAuthHelperComConnector()

    // 获取 Windows 认证的 HttpServerConnection
    // 返回可通过 COM 互操作使用的连接对象
    public HttpServerConnection GetConnection(
        string url,   // Innovator Server URL
        string db     // 数据库名称
    )
}</code></pre>

    <h2>二、使用场景</h2>
    <p>WindowsAuthHelperComConnector 主要用于以下场景：</p>
    <ul>
      <li><strong>COM 客户端（如 VB6、VBA、VBScript）：</strong>需要调用 Aras API 但又无法直接使用 .NET 连接类</li>
      <li><strong>Excel/Office 宏：</strong>通过 VBA 宏脚本与 Aras 服务器交互</li>
      <li><strong>遗留系统集成：</strong>基于 COM 的老旧系统需要连接新版 Innovator 服务器</li>
      <li><strong>Windows 认证环境：</strong>企业内网使用 Kerberos/NTLM 统一认证</li>
    </ul>

    <h2>三、C# 代码示例</h2>
    <pre v-pre><code class="language-csharp">using Aras.IOM;
using Aras.Net;

// ===== 在 .NET 客户端中的使用 =====
class Program
{
    static void Main()
    {
        // 创建 COM 连接器（用于与 COM 组件互操作）
        var comConnector = new WindowsAuthHelperComConnector();

        // 获取 Windows 认证连接
        var conn = comConnector.GetConnection(
            "http://server/InnovatorServer/Server/InnovatorServer.aspx",
            "InnovatorSolutions"
        );

        // 创建 Innovator 实例
        var inn = IomFactory.CreateInnovator();
        inn.setConnection(conn);

        // 登录（自动使用当前 Windows 身份）
        var loginResult = inn.Login();
        if (loginResult.isError())
        {
            Console.WriteLine("Windows 认证登录失败: " + loginResult.getErrorString());
            return;
        }

        Console.WriteLine("Windows 认证登录成功");
        Console.WriteLine("当前用户 ID: " + inn.getUserID());

        // 执行查询
        var query = inn.newItem("User", "get");
        query.setAttribute("select", "id,login_name,first_name,last_name");
        query.setAttribute("maxRecords", "10");
        var result = query.apply();

        if (!result.isError())
        {
            for (int i = 0; i < result.getItemCount(); i++)
            {
                var item = result.getItemByIndex(i);
                Console.WriteLine($"{item.getProperty("login_name")} - " +
                    $"{item.getProperty("first_name")} {item.getProperty("last_name")}");
            }
        }

        inn.Logout();
    }
}</code></pre>

    <h2>四、VBA 宏示例（Excel）</h2>
    <pre v-pre><code class="language-vb">' VBA 宏 — 从 Excel 连接 Aras 并读取数据
' 需要在项目中引用 Aras.Net.dll（通过 COM 注册）

Sub GetArasData()
    Dim comConnector As Object
    Dim conn As Object
    Dim inn As Object
    Dim loginResult As Object
    Dim query As Object
    Dim result As Object

    ' 创建 COM 连接器
    Set comConnector = CreateObject("Aras.Net.WindowsAuthHelperComConnector")

    ' 获取 Windows 认证连接
    Set conn = comConnector.GetConnection( _
        "http://server/InnovatorServer/Server/InnovatorServer.aspx", _
        "InnovatorSolutions")

    ' 创建 Innovator 实例
    ' 需要在 IOM 库的 COM 注册
    Set inn = CreateObject("Aras.IOM.Innovator")
    inn.setConnection conn

    ' 登录
    Set loginResult = inn.Login()
    If loginResult.isError() Then
        MsgBox "登录失败: " & loginResult.getErrorString()
        Exit Sub
    End If

    ' 查询 Part 列表
    Set query = inn.newItem("Part", "get")
    query.setAttribute "select", "item_number,name,state"
    query.setAttribute "maxRecords", "100"
    Set result = query.apply()

    ' 写入 Excel
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets(1)
    ws.Cells(1, 1) = "编号"
    ws.Cells(1, 2) = "名称"
    ws.Cells(1, 3) = "状态"

    Dim i As Integer
    For i = 0 To result.getItemCount() - 1
        Dim item As Object
        Set item = result.getItemByIndex(i)
        ws.Cells(i + 2, 1) = item.getProperty("item_number")
        ws.Cells(i + 2, 2) = item.getProperty("name")
        ws.Cells(i + 2, 3) = item.getProperty("state")
    Next i

    ' 登出
    inn.Logout

    MsgBox "数据导入完成！共 " & result.getItemCount() & " 条记录"
End Sub</code></pre>

    <h2>五、COM 注册</h2>
    <pre v-pre><code class="language-batch">:: 使用 RegAsm 注册 .NET 程序集为 COM 组件
:: 以管理员身份运行

:: 注册 Aras.Net.dll
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe ^
    "C:\Program Files\Aras\Innovator\Server\bin\Aras.Net.dll" ^
    /codebase /tlb:Aras.Net.tlb

:: 注册 IOM.dll
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe ^
    "C:\Program Files\Aras\Innovator\Server\bin\IOM.dll" ^
    /codebase /tlb:IOM.tlb</code></pre>

    <h2>六、实践笔记</h2>
    <ul>
      <li><strong>COM 互操作版本：</strong>确保 Aras.Net.dll 和 IOM.dll 的版本与服务器版本匹配</li>
      <li><strong>管理员权限：</strong>COM 注册需要管理员权限运行 RegAsm</li>
      <li><strong>Windows 认证前提：</strong>客户端必须加入域，且 Innovator 服务器配置了 Windows 身份验证</li>
      <li><strong>VBA 引用：</strong>在 VBA 编辑器中通过 Tools → References 添加对注册的 COM 组件的引用</li>
      <li><strong>64 位 vs 32 位：</strong>需使用与 Office 位数匹配的 RegAsm 版本（32 位 Office 使用 Framework 中的 RegAsm）</li>
      <li><strong>新项目推荐：</strong>对于新项目，建议使用 OAuth 2.0 + REST API，而非 COM 互操作</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_Net_WindowsAuthHelperComConnector.htm">WindowsAuthHelperComConnector Class</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_Net.htm">Aras.Net Namespace</a></li>
    </ul>
  </article>
</template>
