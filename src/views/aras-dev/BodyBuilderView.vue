<template>
  <article class="doc-content">
    <h1>XML Body 构造</h1>
    <blockquote>
      <p>前端调用 <code>top.aras.newIOMInnovator().applyMethod(name, body)</code> 时，<code>body</code> 参数是一个 XML 字符串。每个 XML 子元素名对应服务端 Method 中的一个 <code>this.getProperty()</code> 参数名。</p>
    </blockquote>

    <h2>一、原理</h2>
    <p>服务端 Method 的 <code>this</code> 是一个 Item 对象，其内部 XML 结构就是前端传入的 body。因此：</p>
    <pre><code class="language-text">{{ principle }}</code></pre>

    <h2>二、转义规则</h2>
    <h3>2.1 普通字符串参数 → 必须转义 XML</h3>
    <pre><code class="language-javascript">{{ escapeXmlCode }}</code></pre>

    <h3>2.2 JSON 参数 → 不转义！</h3>
    <blockquote>
      <p><strong>关键规则：</strong>承载 JSON 的 XML 标签内<strong>不进行 XML 转义</strong>。因为后端使用 <code>Newtonsoft.Json.JsonConvert.DeserializeObject&lt;T&gt;()</code> 直接从标签文本反序列化，转义会破坏 JSON 结构。</p>
    </blockquote>

    <h2>三、BUILDERS 模式（推荐）</h2>
    <pre><code class="language-typescript">{{ buildersCode }}</code></pre>

    <h2>四、常见陷阱</h2>
    <table>
      <thead><tr><th>陷阱</th><th>后果</th><th>正确做法</th></tr></thead>
      <tbody>
        <tr><td>JSON 被 XML 转义</td><td>后端反序列化失败</td><td>JSON 标签内不调用 escapeXml</td></tr>
        <tr><td>用户输入含 XML 特殊字符</td><td>XML 解析失败</td><td>字符串参数必须 escapeXml</td></tr>
        <tr><td>中文字符未处理</td><td>乱码</td><td>确保 UTF-8 编码，前端不做额外处理</td></tr>
        <tr><td>数字被当作字符串</td><td>后端类型转换可能失败</td><td>数字可传字符串，后端 .NET 自动转换</td></tr>
      </tbody>
    </table>

    <h2>五、复杂参数示例</h2>
    <pre><code class="language-typescript">{{ complexExample }}</code></pre>

    <p><strong>参考来源：</strong></p>
    <ul>
      <li><a href="https://www.aras.com/community/f/development/3974/how-to-pass-items-in-applymethod">How to pass items in applyMethod? — Aras Community</a></li>
      <li><a href="https://community.aras.com/discussions/development/apply-aml/2656/replies/2662">Apply AML Discussion</a></li>
    </ul>
  </article>
</template>
<script setup lang="ts">
const principle = `前端 body:  <sender>admin</sender><data>hello</data>
后端读取:  this.getProperty("sender", "")  → "admin"
           this.getProperty("data", "")    → "hello"`

const escapeXmlCode = `function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}`

const buildersCode = `// api/arasBody.ts — 为每个 Method 登记专用构造器
const BUILDERS: Partial<Record<string, BodyBuilder>> = {
  [METHODS.getProjectList]: (p) =>
    \`<weekrangetext>\${escapeXml(p.weekStart)}</weekrangetext>\`,

  [METHODS.saveProjectData]: (p) =>
    \`<projectData>\${JSON.stringify(p.row)}</projectData>\` +
    \`<weekrangetext>\${escapeXml(p.weekStart)}</weekrangetext>\`,

  [METHODS.batchReview]: (p) =>
    \`<HoursReviewList>\${JSON.stringify(p.rows)}</HoursReviewList>\` +
    \`<methodtype>\${escapeXml(p.methodtype)}</methodtype>\`,

  [METHODS.getReportData]: (p) =>
    \`<year>\${escapeXml(p.year)}</year>\`,
}

// 默认构造器：将所有 key-value 对转为 XML 子元素
function defaultBody(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .map(([k, v]) => \`<\${k}>\${escapeXml(String(v))}</\${k}>\`)
    .join('')
}

export function buildArasBody(
  method: string,
  payload: Record<string, unknown>
): string {
  const builder = BUILDERS[method]
  return builder ? builder(payload) : defaultBody(payload)
}`

const complexExample = `// 多参数 + JSON + 嵌套复杂场景
const body = [
  \`<action>\${escapeXml(action)}</action>\`,
  \`<userId>\${escapeXml(userId)}</userId>\`,
  \`<payload>\${JSON.stringify(complexObject)}</payload>\`,
  \`<timestamp>\${escapeXml(new Date().toISOString())}</timestamp>\`,
].join('')

// 最终传给 Aras：
top.aras.newIOMInnovator().applyMethod('IC_ComplexMethod', body)`
</script>
