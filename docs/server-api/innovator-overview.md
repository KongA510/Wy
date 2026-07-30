---
title: Innovator 类概述
---

# Innovator 类概述
<blockquote>
<p><strong>Innovator 类是 Aras IOM 的核心入口点。</strong>一个 Innovator 实例可被视为与 Innovator 服务器的连接通道，包含登录/登出、创建 Item 实例、发送原始 AML 到服务器以及若干便捷方法。</p>
</blockquote>

## 一、基本信息
<table>
<thead><tr><th>属性</th><th>值</th></tr></thead>
<tbody>
<tr><td><strong>命名空间</strong></td><td><code>Aras.IOM</code></td></tr>
<tr><td><strong>程序集</strong></td><td><code>IOM.dll</code>（版本 15.0.1）</td></tr>
<tr><td><strong>构造函数</strong></td><td><code>Innovator()</code> — 仅供内部代码使用（Aras.Server.Core.dll），标记为 public 仅因 .NET 跨程序集可见性限制</td></tr>
<tr><td><strong>继承层次</strong></td><td><code>System.Object → Aras.IOM.Innovator</code></td></tr>
<tr><td><strong>版本兼容</strong></td><td>.NET 版本和 COM 版本两套 API 接口几乎相同，区别在于 XML 类型（XmlDocument vs MSXML2）</td></tr>
</tbody>
</table>

## 二、核心职责
<ul>
<li><strong>连接管理：</strong>与 Innovative 服务器的登录/登出</li>
<li><strong>Item 工厂：</strong>创建 Item 实例的多种重载方法</li>
<li><strong>AML 操作：</strong>发送原始 AML 请求并获取响应</li>
<li><strong>SQL 操作：</strong>执行 SQL 查询（含参数化查询）</li>
<li><strong>Method 调用：</strong>调用服务端 Method</li>
<li><strong>便捷查询：</strong>按 ID 或 keyed_name 快速获取 Item</li>
<li><strong>文件操作：</strong>获取文件 URL、计算校验和</li>
<li><strong>工具方法：</strong>获取新 ID、获取下一序列号、获取用户信息等</li>
</ul>

## 三、完整方法列表（27 个）
<table>
<thead><tr><th>分类</th><th>方法</th><th>说明</th></tr></thead>
<tbody>
<tr><td rowspan="3"><strong>Item 创建</strong></td><td><code>newItem()</code></td><td>创建空 Item</td></tr>
<tr><td><code>newItem(String)</code></td><td>创建指定 type 的 Item</td></tr>
<tr><td><code>newItem(String, String)</code></td><td>创建指定 type 和 action 的 Item</td></tr>
<tr><td><strong>Error/Result</strong></td><td><code>newError(String)</code></td><td>创建错误 Item</td></tr>
<tr><td></td><td><code>newResult(String)</code></td><td>创建 Result Item</td></tr>
<tr><td rowspan="3"><strong>AML/SQL</strong></td><td><code>applyAML(String)</code></td><td>发送 AML 请求</td></tr>
<tr><td><code>applySQL(String)</code></td><td>发送 SQL 请求</td></tr>
<tr><td><code>applySQLWithParameters(String, ...)</code></td><td>参数化 SQL 请求</td></tr>
<tr><td><strong>Method</strong></td><td><code>applyMethod(String, String)</code></td><td>调用服务端 Method</td></tr>
<tr><td rowspan="3"><strong>查询</strong></td><td><code>getItemById(String, String)</code></td><td>按 type+id 获取 Item</td></tr>
<tr><td><code>getItemByKeyedName(String, String)</code></td><td>按 type+keyed_name 获取 Item</td></tr>
<tr><td><code>getItemInDom(XmlDocument)</code></td><td>从 XML 文档提取 Item</td></tr>
<tr><td rowspan="4"><strong>文件</strong></td><td><code>getFileUrl(String, UrlType)</code></td><td>按 ID 获取文件 URL</td></tr>
<tr><td><code>getFileUrl(String, UrlType, VaultUrlType)</code></td><td>按 ID+Vault 类型获取文件 URL</td></tr>
<tr><td><code>getFileUrls(ArrayList, UrlType)</code></td><td>批量获取文件 URL</td></tr>
<tr><td><code>getFileUrls(ArrayList, UrlType, VaultUrlType)</code></td><td>批量获取文件 URL（含 Vault 类型）</td></tr>
<tr><td><strong>校验</strong></td><td><code>getChecksum(String)</code></td><td>计算文件 128 位哈希</td></tr>
<tr><td rowspan="6"><strong>工具/会话</strong></td><td><code>getNewID()</code></td><td>生成新 GUID 字符串</td></tr>
<tr><td><code>getNextSequence(String)</code></td><td>获取序列号</td></tr>
<tr><td><code>getUserID()</code></td><td>获取当前用户 ID</td></tr>
<tr><td><code>getI18NSessionContext()</code></td><td>获取国际化上下文</td></tr>
<tr><td><code>getConnection()</code></td><td>获取服务器连接</td></tr>
<tr><td><code>ConsumeLicense(String)</code></td><td>消费功能许可</td></tr>
<tr><td><strong>杂项</strong></td><td><code>newXMLDocument()</code></td><td>创建新 ArasXmlDocument</td></tr>
<tr><td><strong>已过时</strong></td><td><code>calcMD5(String)</code></td><td>已废弃，使用 ScalcMD5</td></tr>
<tr><td></td><td><code>getAssignedActivities()</code></td><td>已废弃</td></tr>
<tr><td></td><td><code>getUserAliases()</code></td><td>已废弃</td></tr>
<tr><td><strong>静态</strong></td><td><code>ScalcMD5(String)</code></td><td>计算 MD5 哈希</td></tr>
</tbody>
</table>

## 四、典型使用模式

```csharp
// 在服务端 Method 中获取 Innovator 实例
var inn = this.newInnovator();

// 典型操作链：
// 1. 创建 Item
var part = inn.newItem("Part", "get");
part.setProperty("item_number", "P-001");
// 2. 发送请求
var result = part.apply();
// 3. 检查错误
if (result.isError()) {
    return inn.newError(result.getErrorString());
}
// 4. 返回结果
return result;
```


## 五、两种版本的区别
<table>
<thead><tr><th>特性</th><th>.NET 版本</th><th>COM 版本</th></tr></thead>
<tbody>
<tr><td><code>Item.dom</code> 类型</td><td><code>System.Xml.XmlDocument</code></td><td><code>MSXML2.FreeThreadedDOMDocument40Class</code></td></tr>
<tr><td><code>Item.node</code> 类型</td><td><code>System.Xml.XmlElement</code></td><td><code>MSXML2.IXMLDOMElement</code></td></tr>
<tr><td>使用场景</td><td>C#、VB.NET 服务端方法</td><td>JavaScript、VBScript 客户端</td></tr>
</tbody>
</table>

<p><strong>参考：</strong></p>
<ul>
<li>Aras Innovator .NET API Reference — <a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Innovator.htm">Innovator Class</a></li>
</ul>
