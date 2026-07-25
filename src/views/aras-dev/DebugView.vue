<template>
  <article class="doc-content">
    <h1>调试与排错</h1>
    <blockquote>
      <p>Aras Innovator 服务端 Method 运行在 IIS 应用池的封闭上下文中，无法使用传统的 Visual Studio 断点调试。本节汇总了<strong>6 种调试策略</strong>和常见错误的排错指南。</p>
    </blockquote>

    <h2>一、调试策略总览</h2>
    <table>
      <thead><tr><th>策略</th><th>适用场景</th><th>难度</th></tr></thead>
      <tbody>
        <tr><td>1. 返回值调试</td><td>快速定位错误位置</td><td>⭐</td></tr>
        <tr><td>2. 服务器日志</td><td>异常堆栈追踪</td><td>⭐</td></tr>
        <tr><td>3. Action 测试</td><td>Method 独立测试</td><td>⭐⭐</td></tr>
        <tr><td>4. 临时 Item 记录</td><td>中间状态查看</td><td>⭐⭐</td></tr>
        <tr><td>5. Dump 到文件</td><td>复杂逻辑追踪</td><td>⭐⭐⭐</td></tr>
        <tr><td>6. 远程调试</td><td>深度疑难问题</td><td>⭐⭐⭐⭐</td></tr>
      </tbody>
    </table>

    <h2>二、策略详解</h2>
    <h3>2.1 返回值调试</h3>
    <p>最简单的方式：在不同位置提前 <code>return</code> 中间结果，逐步缩小问题范围：</p>
    <pre v-pre><code class="language-csharp">// 步骤 1：验证参数是否传入
return inn.newResult($"param1={param1}, param2={param2}");

// 步骤 2：验证 SQL 是否正确组装
return inn.newResult($"SQL: {sql}");

// 步骤 3：验证查询结果
return inn.newResult($"Count={part.getItemCount()}");

// 逐步取消注释，直到定位问题</code></pre>

    <h3>2.2 服务器日志</h3>
    <p>查看 Aras 服务器日志文件（默认路径）：</p>
    <ul>
      <li><code>C:\Program Files\Aras\Innovator\InnovatorServerLog.txt</code></li>
      <li><code>C:\Program Files\Aras\Innovator\Server\bin\InnovatorServerLog.txt</code></li>
    </ul>
    <p>在 Method 中主动写日志：</p>
    <pre v-pre><code class="language-csharp">// 写入服务器日志
try {
    // ...
} catch (Exception ex) {
    // 写入详情
    Aras.Server.Core.Logging.LogError(
        $"IC_MyMethod: {ex.Message}\nStack: {ex.StackTrace}");
    return inn.newError("执行失败：" + ex.Message);
}</code></pre>

    <h3>2.3 Action 测试</h3>
    <p>在 Aras 客户端中创建一个临时 Action，绑定 Method，通过 Action 执行并查看结果。</p>

    <h3>2.4 临时 Item 记录</h3>
    <pre v-pre><code class="language-csharp">// 创建临时调试记录保存中间状态
var debug = inn.newItem("IC_DebugLog", "add");
debug.setProperty("ic_message", $"Step1: count={part.getItemCount()}");
debug.setProperty("ic_timestamp", DateTime.Now.ToString("o"));
debug = debug.apply();</code></pre>

    <h3>2.5 Dump 到文件</h3>
    <pre v-pre><code class="language-csharp">// 将变量 dump 到临时文件
System.IO.File.WriteAllText(
    @"C:\Temp\aras_debug.txt",
    $"sql={sql}\nresult={rawResult}\ntime={DateTime.Now}");</code></pre>

    <h2>三、常见错误速查</h2>
    <table>
      <thead><tr><th>错误信息</th><th>可能原因</th><th>解决方案</th></tr></thead>
      <tbody>
        <tr><td><code>Insufficient permission to access SQL</code></td><td>需要 Aras PLM Identity</td><td>添加权限提升代码块</td></tr>
        <tr><td><code>No Items of type 'X' found</code></td><td>ItemType 不存在或拼写错误</td><td>检查大小写（通常首字母大写）</td></tr>
        <tr><td><code>Not a single item</code></td><td>查询结果 != 1 条，但代码假定只有 1 条</td><td>检查 getItemCount() 后再取值</td></tr>
        <tr><td><code>Object reference not set</code></td><td>Null 引用（最常见）</td><td>检查所有 getProperty/getItemByIndex 的默认值</td></tr>
        <tr><td><code>There is no tag in response</code></td><td>返回值格式异常</td><td>检查返回类型，确保使用 newResult/newError</td></tr>
        <tr><td><code>XML 解析错误</code></td><td>前端 Body 含非法 XML 字符</td><td>字符串参数必须 escapeXml</td></tr>
        <tr><td>JSON 反序列化失败</td><td>JSON 标签内容被 XML 转义</td><td>JSON 标签内不进行 XML 转义</td></tr>
        <tr><td>中文字符乱码</td><td>编码问题</td><td>确保前后端统一 UTF-8</td></tr>
      </tbody>
    </table>

    <h2>四、Method 编译错误</h2>
    <p>如果 Method 编译失败，Aras 会在保存时提示错误。此时可以：</p>
    <ol>
      <li>在 Method 编辑器的错误面板查看详细编译错误</li>
      <li>分步注释代码，确定错误行</li>
      <li>检查 using 引用是否完整</li>
      <li>检查 C# 版本语法兼容性（R37+ 支持 C# 10+，旧版可能是 C# 7）</li>
    </ol>

    <h2>五、性能排查</h2>
    <pre v-pre><code class="language-csharp">// 在 Method 中测量执行时间
var sw = System.Diagnostics.Stopwatch.StartNew();

// ... 业务逻辑 ...

sw.Stop();
return inn.newResult(JsonConvert.SerializeObject(new {
    success = true,
    elapsedMs = sw.ElapsedMilliseconds,  // 调试用，上线前移除
    data = result
}));</code></pre>

    <p><strong>参考来源：</strong></p>
    <ul>
      <li><a href="https://www.arasdeveloper.com/nl/blog/error-there-is-no-tag-in-response">"There is no tag in response" Error — Aras Developer</a></li>
      <li><a href="https://www.aras.com/community/f/development/36274/applysql-previleges-issue">ApplySQL Privileges Issue</a></li>
    </ul>
  </article>
</template>
