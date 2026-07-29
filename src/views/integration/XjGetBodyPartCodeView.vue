<template>
  <article class="doc-content">
    <h1>获取部位编码 XJ_GetBodyPartCode</h1>
    <p>
      查询 <code>XJ_Body_Part_Code</code> ItemType 的所有部位编码，返回 <strong>编码 → 名称</strong> 的键值对（<code>Dictionary&lt;string, string&gt;</code>）。
      博克端在抛转 BOM 明细填写部位时，用此接口拉取可选部位清单。该接口<strong>无需传入参数</strong>。
    </p>

    <SourceDownload file="XJ_GetBodyPartCode.txt" href="/integration-source/XJ_GetBodyPartCode.txt" />

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
    <pre><code class="language-json">{{ respJson }}</code></pre>

    <h2>三、关键代码</h2>
    <h3>3.1 查询并构建键值对</h3>
    <p>按 <code>xj_code</code> 排序查询全部部位编码，遍历结果构建字典；通过 <code>ContainsKey</code> 去重，避免重复编码覆盖。</p>
    <pre><code class="language-csharp">{{ mainCode }}</code></pre>

    <h2>四、实现要点</h2>
    <ul>
      <li><strong>按需 select</strong>：<code>setAttribute("select", "xj_code,xj_label")</code> 只取必要字段，减少负载。</li>
      <li><strong>稳定排序</strong>：<code>orderBy=xj_code</code> 保证返回顺序稳定，便于前端直接渲染下拉。</li>
      <li><strong>去重保护</strong>：<code>!bodyPartCodes.ContainsKey(code)</code> 防止重复编码导致字典异常。</li>
      <li><strong>空数据返回 400</strong>：查询成功但无记录时返回 <code>BadRequest("未查询到部位编码数据")</code>，提示调用方检查基础数据。</li>
      <li><strong>权限与日志</strong>：同样遵循 <code>Aras PLM</code> 权限提升 / 释放，并写入 <code>XJ_Interface_Log</code>。</li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import SourceDownload from '../../components/SourceDownload.vue'

const respJson = `{
    "status": 200,
    "error": "",
    "data": {
        "BP001": "前幅",
        "BP002": "後幅",
        "BP003": "側圍",
        "BP004": "袋底",
        "BP005": "拉鏈頭"
    }
}`

const mainCode = `var queryItem = inn.newItem("XJ_Body_Part_Code", "get");
queryItem.setAttribute("select", "xj_code,xj_label");
queryItem.setAttribute("orderBy", "xj_code");
var results = queryItem.apply();

if (results.isError())
{
    var badResult = ApiResult<Dictionary<string, string>>.ServerError(results.getErrorString());
    responseBody = System.Text.Json.JsonSerializer.Serialize(badResult);
    WriteInterfaceLog(inn, "XJ_GetBodyPartCode", "XJ_GetBodyPartCode()", responseBody, "1");
    return inn.newResult(responseBody);
}

int itemCount = results.getItemCount();
if (itemCount == 0)
{
    var badResult = ApiResult<Dictionary<string, string>>.BadRequest("未查询到部位编码数据");
    responseBody = System.Text.Json.JsonSerializer.Serialize(badResult);
    WriteInterfaceLog(inn, "XJ_GetBodyPartCode", "XJ_GetBodyPartCode()", responseBody, "1");
    return inn.newResult(responseBody);
}

var bodyPartCodes = new Dictionary<string, string>();
for (int i = 0; i < itemCount; i++)
{
    var item = results.getItemByIndex(i);
    var code = item.getProperty("xj_code", "");
    var label = item.getProperty("xj_label", "");

    if (!string.IsNullOrEmpty(code) && !bodyPartCodes.ContainsKey(code))
    {
        bodyPartCodes[code] = label;
    }
}

var successResult = ApiResult<Dictionary<string, string>>.Success(bodyPartCodes);
responseBody = System.Text.Json.JsonSerializer.Serialize(successResult);
WriteInterfaceLog(inn, "XJ_GetBodyPartCode", "XJ_GetBodyPartCode()", responseBody, "0");
return inn.newResult(responseBody);`
</script>
