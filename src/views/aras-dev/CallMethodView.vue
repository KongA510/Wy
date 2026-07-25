<template>
  <article class="doc-content">
    <h1>客户端→服务端调用</h1>
    <blockquote>
      <p>Aras Innovator 的核心通信模式：客户端 JavaScript 通过 IOM 的 <code>applyMethod()</code> 调用服务端 C# Method，传递 XML Body 作为参数，接收服务端返回的 Item/Result。</p>
    </blockquote>

    <h2>一、调用链路</h2>
    <pre><code class="language-text">{{ callChain }}</code></pre>

    <h2>二、客户端 JavaScript 调用</h2>
    <pre><code class="language-javascript">{{ jsCallCode }}</code></pre>

    <h2>三、安全返回值解析 (safeParseResult)</h2>
    <p>由于 <code>getResult()</code> 的返回值格式不确定（纯 JSON、XML 包裹、BOM 头污染、简单字面量），需要多策略容错解析：</p>
    <pre><code class="language-typescript">{{ safeParseCode }}</code></pre>

    <h2>四、Mock/Real 双模切换</h2>
    <pre><code class="language-typescript">{{ mockRealCode }}</code></pre>

    <h2>五、IFRAME 环境注意事项</h2>
    <p>如果前端应用以 IFRAME 嵌入 Aras Innovator：</p>
    <ul>
      <li>使用 <code>top.aras</code> 而非 <code>window.aras</code> 访问 Aras 全局对象</li>
      <li>路由使用 <code>createWebHashHistory()</code>，避免 Hash 变化触发父页面刷新</li>
      <li>确保 IFRAME 的 sandbox 属性允许 <code>allow-same-origin</code> 和 <code>allow-scripts</code></li>
    </ul>

    <p><strong>参考来源：</strong></p>
    <ul>
      <li><a href="https://www.aras.com/community/f/development/6000/how-to-call-a-server-method-with-applymethod-from-a-client-method-and-use-the-results-coming-back-from-server/2874">How to call server method with applyMethod() — Aras Community</a></li>
      <li><a href="https://community.aras.com/discussions/development/apply-aml/2656/replies/2662">Apply AML Discussion</a></li>
    </ul>
  </article>
</template>
<script setup lang="ts">
const callChain = `┌─────────────────────────────────────────────────────┐
│  客户端 (Browser)                                     │
│  top.aras.newIOMInnovator()                          │
│    .applyMethod("IC_MyMethod", xmlBody)              │
│    .getResult()        ← 返回纯文本/JSON/XML         │
│    .isError()          ← 判断是否出错                 │
│    .getErrorString()   ← 错误信息                     │
└──────────────┬──────────────────────────────────────┘
               │ HTTP POST
               ▼
┌─────────────────────────────────────────────────────┐
│  服务端 (IIS / Aras Server)                          │
│  Method: IC_MyMethod                                  │
│  this.getProperty("参数名")  ← 从 xmlBody 提取参数     │
│  ... 业务逻辑 ...                                     │
│  return inn.newResult(jsonString)                    │
└─────────────────────────────────────────────────────┘`

const jsCallCode = `// 标准调用模式
function callArasMethod(methodName, payload) {
  const inn = top.aras.newIOMInnovator();
  const body = buildXmlBody(payload);  // 构造 XML Body
  const result = inn.applyMethod(methodName, body);

  if (result.isError()) {
    const errMsg = result.getErrorString();
    console.error('Aras Method 调用失败:', errMsg);
    throw new Error(errMsg);
  }

  const raw = result.getResult();
  return parseResult(raw);  // 安全解析返回值
}

// 使用示例
const data = callArasMethod('IC_GetPartInfo', {
  part_number: 'P-001'
});`

const safeParseCode = `function safeParseResult(raw: string): unknown {
  // 0. 清理不可见字符
  const s = raw
    .replace(/[﻿​‌‍ ]/g, '')
    .trim();
  if (!s) return null;

  // 1. 直接 JSON.parse
  try { return JSON.parse(s); } catch {}

  // 2. 提取 JSON 片段（XML 可能包裹 JSON）
  const braceStart = s.indexOf('{');
  const bracketStart = s.indexOf('[');
  let jsonStart = -1, endChar = '';
  if (braceStart >= 0 && (bracketStart < 0 || braceStart < bracketStart)) {
    jsonStart = braceStart; endChar = '}';
  } else if (bracketStart >= 0) {
    jsonStart = bracketStart; endChar = ']';
  }
  if (jsonStart >= 0) {
    const jsonEnd = s.lastIndexOf(endChar);
    if (jsonEnd > jsonStart) {
      try { return JSON.parse(s.substring(jsonStart, jsonEnd + 1)); } catch {}
    }
  }

  // 3. 简单字面量
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null') return null;

  // 4. 数字
  const numMatch = s.match(/^-?\\d+(?:\\.\\d+)?/);
  if (numMatch) {
    const n = Number(numMatch[0]);
    if (Number.isFinite(n)) return n;
  }

  // 5. XML 开头 → 操作成功标记
  if (s.startsWith('<')) return { success: true };

  // 6. 兜底：返回原始文本
  return s;
}`

const mockRealCode = `// api/client.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function callArasMethod<T = unknown>(
  method: string,
  payload: Record<string, unknown> = {},
): Promise<T> {
  if (USE_MOCK) {
    // 开发环境：模拟延迟后返回 Mock 数据
    await delay(160 + Math.random() * 280);
    return mockDispatch(method, payload) as T;
  }
  // 生产环境：真实调用 Aras IOM
  const inn = (top as any).aras.newIOMInnovator();
  const body = buildArasBody(method, payload);
  const result = inn.applyMethod(method, body);
  if (result.isError()) throw new Error(result.getErrorString());
  return safeParseResult(result.getResult()) as T;
}`
</script>
