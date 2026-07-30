---
title: I18NSessionContext
---

# I18NSessionContext
<blockquote>
<p><strong>I18NSessionContext 代表客户端会话的国际化上下文。</strong>定义会话使用的 locale、时区等，并提供本地化格式和 AML neutral 格式之间的转换方法。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

## 一、概述
<p>每个客户端会话都有一个 I18NSessionContext 实例。它决定了：</p>
<ul>
<li>会话的语言/区域设置</li>
<li>会话的时区</li>
<li>locale 敏感数据（日期、浮点数）在本地格式和 AML neutral 格式之间的转换方式</li>
</ul>

<p><strong>AML 格式化规则（重要）：</strong></p>
<ul>
<li>locale 敏感类型（'date' | 'float' | 'decimal'）在 AML 中必须<strong>始终</strong>以 neutral 格式呈现</li>
<li>日期在 AML 中必须<strong>始终</strong>以会话时区呈现</li>
</ul>

## 二、获取会话上下文

```csharp
// 通过 Innovator 获取
var inn = this.newInnovator();
var ctx = inn.getI18NSessionContext();

// 通过 Item 获取（间接）
var innovator = item.getInnovator();
var ctx2 = innovator.getI18NSessionContext();
```


## 三、格式转换

```csharp
// ConvertToNeutral — 将本地化格式转为 AML neutral 格式
// 用于构造 AML 请求时
string localeDateStr = "12/31/2025";  // 美式日期
string neutralDate = ctx.ConvertToNeutral(localeDateStr, "date");
// 输出如 "2025-12-31T00:00:00"

string localeFloat = "1,234.56";      // 带千位分隔符
string neutralFloat = ctx.ConvertToNeutral(localeFloat, "float");
// 输出如 "1234.56"

// ConvertFromNeutral — 将 AML neutral 格式转为本地化格式
// 用于解析 AML 响应时
string neutralStr = "2025-12-31T00:00:00";
string localDate = ctx.ConvertFromNeutral(neutralStr, "date");

string neutralFloat2 = "1234.56";
string localFloat2 = ctx.ConvertFromNeutral(neutralFloat2, "float");
// 在德语 locale 中可能输出 "1.234,56"
```


## 四、数据类型支持
<table>
<thead><tr><th>类型</th><th>AML Neutral 格式</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>date</code></td><td>ISO 8601</td><td>2025-12-31T00:00:00</td></tr>
<tr><td><code>float</code></td><td>小数点、无千位分隔符</td><td>1234.56</td></tr>
<tr><td><code>decimal</code></td><td>小数点、无千位分隔符</td><td>1234.567890</td></tr>
</tbody>
</table>

## 五、完整示例

```csharp
var inn = this.newInnovator();
var ctx = inn.getI18NSessionContext();

// 用户输入日期（本地化格式）
string userInputDate = "31.12.2025";  // 欧洲格式
string amlDate = ctx.ConvertToNeutral(userInputDate, "date");

// 构造 AML 查询
var query = inn.newItem("Part", "get");
// 日期属性必须使用 neutral 格式
query.setProperty("created_on", amlDate);
query.setPropertyCondition("created_on", "gt");
var result = query.apply();

// 解析返回的日期
for (int i = 0; i < result.getItemCount(); i++) {
    var item = result.getItemByIndex(i);
    string neutralCreated = item.getProperty("created_on", "");
    // 转换为用户可读格式
    string displayDate = ctx.ConvertFromNeutral(neutralCreated, "date");
}
```


## 六、多语言属性的处理

```csharp
// 多语言字段在 AML 中通过 xml:lang 属性区分
// 会话语言为法语 (fr) 时：
// <name>Nom Français</name> 等价于 <name xml:lang="fr">Nom Français</name>

// 设置其他语言版本
item.setProperty("description", "English text");
item.setProperty("description", "Texte français", "fr");
item.setProperty("description", "中文文本", "zh");
```


## 七、实践笔记
<ul>
<li><strong>日期格式必须 neutral：</strong>在 AML 中传递日期时务必先用 ConvertToNeutral 转换，否则服务器解析可能出错</li>
<li><strong>浮点数格式：</strong>同样需要 neutral 格式，避免千位分隔符导致的解析错误</li>
<li><strong>时区一致性：</strong>日期转换时会保持会话时区，确保前后端时间语义一致</li>
<li><strong>默认 locale：</strong>如果在客户端没有特别设置，通常使用服务器所在系统的 locale</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_I18NSessionContext.htm">I18NSessionContext Class</a></li>
</ul>
