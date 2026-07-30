---
title: 客户端→服务端调用
---

<h1>客户端→服务端调用</h1>
<blockquote>
<p>Aras Innovator 的核心通信模式：客户端 JavaScript 通过 IOM 的 <code>applyMethod()</code> 调用服务端 C# Method，传递 XML Body 作为参数，接收服务端返回的 Item/Result。</p>
</blockquote>

<h2>一、调用链路</h2>

```text
{{ callChain }}
```


    <h2>二、客户端 JavaScript 调用</h2>
    
```javascript
{{ jsCallCode }}
```


<h2>三、安全返回值解析 (safeParseResult)</h2>
<p>由于 <code>getResult()</code> 的返回值格式不确定（纯 JSON、XML 包裹、BOM 头污染、简单字面量），需要多策略容错解析：</p>

```typescript
{{ safeParseCode }}
```


    <h2>四、Mock/Real 双模切换</h2>
    
```typescript
{{ mockRealCode }}
```


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
