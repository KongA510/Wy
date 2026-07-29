<template>
  <article class="doc-content">
    <h1>祥记 PLM 集成总览</h1>
    <p>
      祥记（博克）集成是 <strong>博克 CAD/CAM 裁片与估算成本系统</strong>与 <strong>Aras PLM</strong> 之间的双向数据通道。
      PLM 物料库通过 API 推送给博克，版师出图时选择对应物料；博克再将裁片、纸格、排刀用量等估算成本数据
      以 JSON 格式抛转回 PLM。本组接口统一以 <code>XJ_</code> 为方法前缀，通过 Aras OData <code>method.{方法名}</code> 端点暴露。
    </p>
    <blockquote>
      <p><strong>服务地址</strong>：<code>http://10.1.1.158/PLM</code>　|　<strong>数据库</strong>：<code>PLM</code>　|　<strong>文档版本</strong>：V1（2026-07-28）</p>
    </blockquote>

    <h2>一、接口清单</h2>
    <p>祥记集成当前包含以下接口，点击菜单或下方链接可查看各接口的独立文档（含关键代码与源码下载）：</p>
    <table>
      <thead><tr><th>接口</th><th>方法名</th><th>接口地址</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>获取请求 Token</td><td>OAuthServer</td><td>/PLM/OAuthServer/connect/token</td><td>所有业务接口的前置调用</td></tr>
        <tr><td><router-link to="/integration/xj-get-class-structure">获取系统物料分类</router-link></td><td>XJ_GetClassStructure</td><td>/PLM/server/odata/method.XJ_GetClassStructure</td><td>多级物料分类树</td></tr>
        <tr><td><router-link to="/integration/xj-get-body-part-code">获取部位编码</router-link></td><td>XJ_GetBodyPartCode</td><td>/PLM/server/odata/method.XJ_GetBodyPartCode</td><td>部位编码键值对</td></tr>
        <tr><td><router-link to="/integration/xj-bom-interface">BOM 接口（入口）</router-link></td><td>XJ_BOMInterface</td><td>/PLM/server/odata/method.XJ_BOMInterface</td><td>BOM 明细新增/修改/删除</td></tr>
        <tr><td><router-link to="/integration/xj-bom-interface-server">BOM 核心服务</router-link></td><td>XJ_BOMInterfaceServer</td><td>（内部 Method，由入口委托）</td><td>批量 AML 核心逻辑</td></tr>
      </tbody>
    </table>

    <h2>二、认证机制（OAuth2 Bearer Token）</h2>
    <p>
      所有业务接口均需通过 OAuth2 Bearer Token 认证。调用任何业务接口前，必须先调用「获取请求 Token」接口取得
      <code>access_token</code>，并在后续所有请求的 Header 中携带该 Token。Token 有效期 <strong>1 小时（3600 秒）</strong>，有效期内请勿重复获取。
    </p>
    <table>
      <thead><tr><th>项目</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>接口地址</td><td><code>http://10.1.1.158/PLM/OAuthServer/connect/token</code></td></tr>
        <tr><td>请求方式</td><td>POST</td></tr>
        <tr><td>Content-Type</td><td>application/x-www-form-urlencoded</td></tr>
        <tr><td>Token 有效期</td><td>1 小时（3600 秒）</td></tr>
      </tbody>
    </table>
    <h3>请求参数（固定值）</h3>
    <table>
      <thead><tr><th>参数名</th><th>值</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>grant_type</td><td>password</td><td>固定值</td></tr>
        <tr><td>scope</td><td>Innovator</td><td>固定值</td></tr>
        <tr><td>client_id</td><td>IOMApp</td><td>固定值</td></tr>
        <tr><td>username</td><td>BK</td><td>固定值</td></tr>
        <tr><td>password</td><td>14b33b7ec6bd47fcb1f3f33b4708c084</td><td>固定值（MD5）</td></tr>
        <tr><td>database</td><td>PLM</td><td>固定值</td></tr>
      </tbody>
    </table>
    <h3>返回示例</h3>
    <pre><code class="language-json">{{ tokenJson }}</code></pre>

    <h2>三、请求头规范</h2>
    <table>
      <thead><tr><th>Header 字段</th><th>值</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>Authorization</td><td>Bearer {access_token}</td><td>OAuth2 认证令牌</td></tr>
        <tr><td>Content-Type</td><td>application/json</td><td>请求体格式（POST 时需要）</td></tr>
      </tbody>
    </table>

    <h2>四、统一返回格式</h2>
    <p>所有业务接口均采用统一的 <code>ApiResult&lt;T&gt;</code> 包装返回，字段含义如下：</p>
    <table>
      <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>status</td><td>int</td><td>200 成功 / 400 请求错误 / 500 服务器错误</td></tr>
        <tr><td>error</td><td>string</td><td>错误描述，成功时为空字符串</td></tr>
        <tr><td>data</td><td>object</td><td>业务数据，失败时为 null</td></tr>
      </tbody>
    </table>
    <pre><code class="language-json">{{ resultJson }}</code></pre>

    <h2>五、接口日志（XJ_Interface_Log）</h2>
    <p>
      所有接口调用（无论成功或失败）均自动记录至 <code>XJ_Interface_Log</code> ItemType，便于问题追踪与对账。
      日志写入失败时静默处理，不影响主业务流程。
    </p>
    <table>
      <thead><tr><th>字段</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>interface_direction</td><td>接口方向：1-入站请求</td></tr>
        <tr><td>interface_name</td><td>接口方法名称</td></tr>
        <tr><td>interface_parameters</td><td>请求参数（XML/方法签名）</td></tr>
        <tr><td>interface_response_body</td><td>完整 JSON 响应体</td></tr>
        <tr><td>is_error</td><td>0 正常 / 1 报错</td></tr>
      </tbody>
    </table>

    <h2>六、接口地址规则</h2>
    <p>祥记项目所有自定义方法统一以 <code>XJ_</code> 为前缀，通过 OData method 端点调用：</p>
    <pre><code class="language-text">http://10.1.1.158/PLM/server/odata/method.{方法名称}

示例：
http://10.1.1.158/PLM/server/odata/method.XJ_GetClassStructure
http://10.1.1.158/PLM/server/odata/method.XJ_GetBodyPartCode
http://10.1.1.158/PLM/server/odata/method.XJ_BOMInterface</code></pre>

    <h2>七、状态码速查</h2>
    <table>
      <thead><tr><th>状态码</th><th>含义</th><th>常见场景</th></tr></thead>
      <tbody>
        <tr><td>200</td><td>成功</td><td>正常返回</td></tr>
        <tr><td>400</td><td>请求错误</td><td>参数缺失/无效</td></tr>
        <tr><td>401</td><td>未授权</td><td>Token 过期或缺失</td></tr>
        <tr><td>500</td><td>服务器错误</td><td>系统异常</td></tr>
      </tbody>
    </table>

    <h2>八、文件上传注意事项</h2>
    <p>
      BOM 接口中的纸格图片（<code>xj_paper_grid_image</code>）为文件栏位。文件必须存放在 <strong>PLM 系统可访问的共享文件夹</strong>中，
      接口传入文件的<strong>完整路径</strong>，服务端通过 Aras 标准 <code>File</code> ItemType 的 <code>attachPhysicalFile</code> 方法自动上传并回填关联。
    </p>
  </article>
</template>

<script setup lang="ts">
const tokenJson = `{
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "Innovator"
}`

const resultJson = `{
    "status": 200,
    "error": "",
    "data": { }
}`
</script>
