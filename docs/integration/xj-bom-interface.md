---
title: BOM 接口入口 XJ_BOMInterface
---

<h1>BOM 接口入口 XJ_BOMInterface</h1>
<p>
<code>XJ_BOMInterface</code> 是博克抛转 BOM 明细的<strong>对外 OData 入口方法</strong>，支持
<code>XJ_Valuation_Part</code> 与 <code>XJ_Valuation_Part_List</code> 两类数据的<strong>批量新增 / 修改 / 删除</strong>。
它本身是一层薄封装：负责<strong>权限提升、统一异常处理、接口日志</strong>，真正的业务逻辑委托给核心服务方法
[<code>XJ_BOMInterfaceServer</code>](/integration/xj-bom-interface-server)。
</p>

<a href="/integration-source/XJ_BOMInterface.txt" download="XJ_BOMInterface.txt" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;margin:8px 0;background:#6366F1;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;">📥 下载源码：XJ_BOMInterface.txt</a>

<h2>一、接口信息</h2>
<table>
<thead><tr><th>项目</th><th>说明</th></tr></thead>
<tbody>
<tr><td>接口地址</td><td><code>http://10.1.1.158/PLM/server/odata/method.XJ_BOMInterface</code></td></tr>
<tr><td>请求方式</td><td>POST</td></tr>
<tr><td>Content-Type</td><td>application/json</td></tr>
<tr><td>说明</td><td>支持 XJ_Valuation_Part 和 XJ_Valuation_Part_List 批量操作</td></tr>
</tbody>
</table>

<h2>二、请求参数</h2>
<table>
<thead><tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
<tbody>
<tr><td>action</td><td>string</td><td>是</td><td>add / edit / delete</td></tr>
<tr><td>source_id</td><td>string</td><td>add 时必填</td><td>关联源对象 ID</td></tr>
<tr><td>type_name</td><td>string</td><td>是</td><td>逗号分隔：XJ_Valuation_Part, XJ_Valuation_Part_List</td></tr>
<tr><td>edit_XJ_Valuation_Part_Property</td><td>string</td><td>edit 时</td><td>修改字段名，逗号分隔</td></tr>
<tr><td>edit_XJ_Valuation_Part_List_Property</td><td>string</td><td>edit 时</td><td>修改字段名，逗号分隔</td></tr>
<tr><td>XJ_Valuation_Part</td><td>array</td><td>视操作</td><td>数据数组（可多条）</td></tr>
<tr><td>XJ_Valuation_Part_List</td><td>array</td><td>视操作</td><td>数据数组（可多条）</td></tr>
</tbody>
</table>
<p>各字段（<code>xj_cad</code>、<code>xj_part</code>、<code>xj_paper_grid_image</code> 等）的详细数据类型与有效值，见 [BOM 核心服务](/integration/xj-bom-interface-server) 文档。</p>

<h3>请求体结构示意（XML）</h3>
<p>入口方法通过 <code>this.node.OuterXml</code> 读取请求体 XML，原样透传给核心服务。以批量新增为例：</p>

```xml
{{ reqXml }}
```


    <h2>三、关键代码</h2>
    <h3>3.1 权限提升 + 委托核心服务</h3>
    <p>入口方法的核心是 <code>this.apply("XJ_BOMInterfaceServer")</code> —— 将当前请求上下文转交给核心服务方法执行，自身只处理权限、异常与日志。</p>
    
```csharp
{{ mainCode }}
```


<h2>四、设计要点</h2>
<ul>
<li><strong>入口 / 核心分离</strong>：对外暴露 <code>XJ_BOMInterface</code>，内部逻辑放在 <code>XJ_BOMInterfaceServer</code>。入口稳定、核心可独立迭代与复用。</li>
<li><strong>请求透传</strong>：<code>this.node.OuterXml</code> 取得完整请求 XML，<code>this.apply</code> 时上下文自动携带，核心服务无需重复解析入参来源。</li>
<li><strong>统一兜底</strong>：核心服务返回 <code>isError()</code> 或抛出异常时，入口统一包装为 <code>ApiResult.ServerError</code> 并记日志，保证对外返回格式一致。</li>
<li><strong>权限闭环</strong>：<code>GrantIdentity("Aras PLM")</code> 提升权限，<code>finally</code> 中 <code>RevokeIdentity</code> 释放，无论成功失败都释放。</li>
</ul>
