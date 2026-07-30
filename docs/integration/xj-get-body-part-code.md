---
title: 获取部位编码 XJ_GetBodyPartCode
---

<h1>获取部位编码 XJ_GetBodyPartCode</h1>
<p>
查询 <code>XJ_Body_Part_Code</code> ItemType 的所有部位编码，返回 <strong>编码 → 名称</strong> 的键值对（<code>Dictionary&lt;string, string&gt;</code>）。
博克端在抛转 BOM 明细填写部位时，用此接口拉取可选部位清单。该接口<strong>无需传入参数</strong>。
</p>

<a href="/integration-source/XJ_GetBodyPartCode.txt" download="XJ_GetBodyPartCode.txt" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;margin:8px 0;background:#6366F1;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;">📥 下载源码：XJ_GetBodyPartCode.txt</a>

<h2>一、接口信息</h2>
<table>
<thead><tr><th>项目</th><th>说明</th></tr></thead>
<tbody>
<tr><td>接口地址</td><td><code>http://10.1.1.158/PLM/server/odata/method.XJ_GetBodyPartCode</code></td></tr>
<tr><td>请求方式</td><td>POST</td></tr>
<tr><td>请求参数</td><td>无需传入</td></tr>
<tr><td>数据源</td><td>XJ_Body_Part_Code（字段 xj_code / xj_label）</td></tr>
</tbody>
</table>

<h2>二、返回示例</h2>
<p><code>data</code> 为键值对对象，键为部位编码（<code>xj_code</code>），值为部位名称（<code>xj_label</code>）。以下为结构示意：</p>

```json
{{ respJson }}
```


    <h2>三、关键代码</h2>
    <h3>3.1 查询并构建键值对</h3>
    <p>按 <code>xj_code</code> 排序查询全部部位编码，遍历结果构建字典；通过 <code>ContainsKey</code> 去重，避免重复编码覆盖。</p>
    
```csharp
{{ mainCode }}
```


<h2>四、实现要点</h2>
<ul>
<li><strong>按需 select</strong>：<code>setAttribute("select", "xj_code,xj_label")</code> 只取必要字段，减少负载。</li>
<li><strong>稳定排序</strong>：<code>orderBy=xj_code</code> 保证返回顺序稳定，便于前端直接渲染下拉。</li>
<li><strong>去重保护</strong>：<code>!bodyPartCodes.ContainsKey(code)</code> 防止重复编码导致字典异常。</li>
<li><strong>空数据返回 400</strong>：查询成功但无记录时返回 <code>BadRequest("未查询到部位编码数据")</code>，提示调用方检查基础数据。</li>
<li><strong>权限与日志</strong>：同样遵循 <code>Aras PLM</code> 权限提升 / 释放，并写入 <code>XJ_Interface_Log</code>。</li>
</ul>
