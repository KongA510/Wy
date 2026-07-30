---
title: 错误处理
---

<h1>Item 错误处理</h1>
<blockquote><p><strong>检查和获取 Item 的错误信息。</strong>当 AML 操作失败时，返回的 Item 包含错误详情，通过这些方法可提取错误码、消息、来源等。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、方法签名</h2>

```csharp
// 判断是否为错误
public bool isError()                         // 当前 Item 是否表示错误

// 读取错误信息
public string getErrorCode()                  // 错误代码（如 "0" 表示无错误）
public string getErrorDetail()                // 错误详细信息
public string getErrorSource()                // 错误来源（服务器方法名/类名）
public string getErrorString()                // 错误描述文本（可读的错误消息）
public string getErrorWho()                   // 触发错误的用户/身份

// 设置错误（用于自定义错误返回）
public void setErrorCode(string code)
public void setErrorDetail(string detail)
public void setErrorSource(string source)
public void setErrorString(string error)
public void setErrorWho(string who)
```


<h2>二、参数说明</h2>
<table><thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead><tbody>
<tr><td><code>code</code></td><td>String</td><td>错误代码</td></tr>
<tr><td><code>detail</code></td><td>String</td><td>错误详细描述</td></tr>
<tr><td><code>source</code></td><td>String</td><td>错误来源方法/类名</td></tr>
<tr><td><code>error</code></td><td>String</td><td>人类可读的错误消息</td></tr>
<tr><td><code>who</code></td><td>String</td><td>触发错误的用户</td></tr>
</tbody></table>

<h2>三、代码示例</h2>

```csharp
var inn = this.newInnovator();

// ===== 标准错误检查模式 =====
var result = inn.applyAML("<AML><Item type='Part' action='get'/></AML>");
if (result.isError())
{
    // 完整错误报告
    string errMsg = $"错误代码: {result.getErrorCode()}\n" +
                    $"错误描述: {result.getErrorString()}\n" +
                    $"详细信息: {result.getErrorDetail()}\n" +
                    $"错误来源: {result.getErrorSource()}";
    Console.WriteLine(errMsg);
    return;
}

// ===== apply 后的错误检查 =====
var item = inn.newItem("Part", "add");
item.setProperty("item_number", "P-001");
var applyResult = item.apply();

if (applyResult.isError())
{
    // 也可用 getErrorString() 快速获取
    Console.WriteLine("apply 失败: " + applyResult.getErrorString());
}

// ===== 创建自定义错误返回 =====
// 在服务器方法中返回明确的错误信息给客户端
var errorItem = inn.newError("PART_NOT_FOUND");
errorItem.setErrorString("指定的 Part 不存在");
errorItem.setErrorDetail("item_number 为 P-999 的 Part 记录未找到");
errorItem.setErrorSource("MyCustomServerMethod");

// ===== Innovator.newError 快捷方法 =====
var errResult = inn.newError("VALIDATION_ERROR");
errResult.setErrorString("物料编号不能为空");
errResult.setErrorSource("PartValidation");
return errResult;

// ===== 批量操作错误检查 =====
var batchResult = inn.applyAML(@"<AML>
    <Item type='Part' action='add'>
        <item_number>P-001</item_number>
    </Item>
    <Item type='Part' action='add'>
        <item_number>P-002</item_number>
    </Item>
</AML>");

if (batchResult.isError())
{
    Console.WriteLine("批量操作失败: " + batchResult.getErrorString());
}
else
{
    // 检查每个子 Item 的错误
    for (int i = 0; i < batchResult.getItemCount(); i++)
    {
        var subItem = batchResult.getItemByIndex(i);
        if (subItem.isError())
        {
            Console.WriteLine($"第 {i} 个操作失败: {subItem.getErrorString()}");
        }
    }
}
```


<h2>四、常见错误码</h2>
<table><thead><tr><th>错误码</th><th>含义</th></tr></thead><tbody>
<tr><td><code>"0"</code></td><td>无错误（正常）</td></tr>
<tr><td><code>"1"</code></td><td>一般错误</td></tr>
<tr><td><code>"1001"</code></td><td>权限不足</td></tr>
<tr><td><code>"1005"</code></td><td>记录不存在</td></tr>
<tr><td><code>"1012"</code></td><td>必填字段为空</td></tr>
<tr><td><code>"1004"</code></td><td>重复记录</td></tr>
</tbody></table>

<h2>五、实践笔记</h2>
<ul>
<li><strong>总是先检查 isError：</strong>在访问 Item 属性前务必调用 <code>isError()</code>，避免在错误对象上调用 getProperty 导致异常</li>
<li><strong>服务器方法中使用 newError：</strong>通过 <code>inn.newError("CODE")</code> 创建标准错误结构，再设置详细信息</li>
<li><strong>getErrorString 是核心：</strong>它返回最人类可读的消息，通常直接展示给用户</li>
<li><strong>批量操作逐项检查：</strong>AML 批量操作后，顶层可能不报错但某个子 Item 报错，需要遍历检查</li>
<li><strong>getErrorDetail vs getErrorString：</strong>getErrorString 是简短描述，getErrorDetail 可能包含堆栈跟踪等详细信息</li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Item.htm">Item Class</a></li></ul>
