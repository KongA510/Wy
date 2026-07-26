<template>
  <article class="doc-content">
    <h1>工具方法</h1>
    <blockquote>
      <p><strong>Innovator 类的便捷工具方法集合：getNewID、getNextSequence、getUserID、ConsumeLicense、getI18NSessionContext、getConnection、ScalcMD5 等。</strong>命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、getNewID() — 生成全局唯一 ID</h2>
    <pre v-pre><code class="language-csharp">// 签名
public string getNewID()

// 生成基于 GUID 的 32 字符十六进制字符串
string newPartId = inn.getNewID();  // 如 "A1B2C3D4E5F6789012345678ABCDEF01"

// 典型用途：创建新 Item 前分配 ID
var newPart = inn.newItem("Part", "add");
newPart.setID(inn.getNewID());
newPart.setProperty("item_number", "P-001");
var result = newPart.apply();</code></pre>
    <p><strong>返回值：</strong><code>string</code> — 32 字符十六进制字符串</p>

    <h2>二、getNextSequence(String) — 获取序列号</h2>
    <pre v-pre><code class="language-csharp">// 签名
public string getNextSequence(string sequenceName)

// 从数据库 Sequence 表中获取下一个序列值
string nextNum = inn.getNextSequence("PartNumber");

// 典型用途：自动编号
var part = inn.newItem("Part", "add");
string seq = inn.getNextSequence("MyPartSequence");
part.setProperty("item_number", $"P-{seq:D6}");</code></pre>
    <p><strong>参数：</strong></p>
    <table>
      <thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
      <tbody><tr><td><code>sequenceName</code></td><td><code>string</code></td><td>在 Aras Sequence ItemType 中定义的序列名称</td></tr></tbody>
    </table>

    <h2>三、getUserID() — 获取当前用户 ID</h2>
    <pre v-pre><code class="language-csharp">// 签名
public string getUserID()

// 获取与当前 Innovator 实例关联的用户 ID
string currentUserId = inn.getUserID();

// 如果未登录，抛出 "Not logged in" 异常
// 典型用途：记录操作者、创建关联
var item = inn.newItem("Part", "add");
item.setProperty("owned_by_id", inn.getUserID());</code></pre>

    <h2>四、ConsumeLicense(String) — 消费许可</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item ConsumeLicense(string featureName)

// 消费指定功能许可
var licenseResult = inn.ConsumeLicense("MyAdvancedFeature");
if (licenseResult.isError()) {
    // 没有许可，拒绝操作
    return inn.newError("您没有使用该功能的许可");
}</code></pre>

    <h2>五、getI18NSessionContext() — 国际化上下文</h2>
    <pre v-pre><code class="language-csharp">// 签名
public I18NSessionContext getI18NSessionContext()

// 获取当前会话的国际化上下文
var ctx = inn.getI18NSessionContext();
// 用于日期/浮点数的本地化格式转换
string neutralDate = ctx.ConvertToNeutral(dateString, "date");
string localeFloat = ctx.ConvertFromNeutral("1234.56", "float");</code></pre>

    <h2>六、getConnection() — 获取服务器连接</h2>
    <pre v-pre><code class="language-csharp">// 签名
public IServerConnection getConnection()

// 返回设置在该实例上的服务器连接
var conn = inn.getConnection();
// 可用于检查连接状态或自定义连接参数</code></pre>

    <h2>七、ScalcMD5(String) — 静态 MD5 计算</h2>
    <pre v-pre><code class="language-csharp">// 签名（静态方法）
public static string ScalcMD5(string input)

// 计算字符串的 MD5 哈希值
string hash = Innovator.ScalcMD5("hello world");
// 注意：实例方法 calcMD5 已废弃，使用静态版本</code></pre>

    <h2>八、完整示例：创建新 Item 的完整流程</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 1. 获取当前用户 ID
string userId = inn.getUserID();

// 2. 生成新 ID
string newId = inn.getNewID();

// 3. 获取序列号（如果有配置）
string seq = inn.getNextSequence("PartSeq");

// 4. 创建新 Item
var part = inn.newItem("Part", "add");
part.setID(newId);
part.setProperty("item_number", $"P-{seq:D6}");
part.setProperty("name", "新零件");
part.setProperty("owned_by_id", userId);

// 5. 提交
var result = part.apply();
if (result.isError()) {
    return inn.newError("创建失败：" + result.getErrorString());
}

return result;</code></pre>

    <h2>九、实践笔记</h2>
    <ul>
      <li><strong>getNewID() 是纯客户端操作：</strong>不需要服务器请求，直接在本地生成 GUID</li>
      <li><strong>getNextSequence() 是服务器操作：</strong>每次调用都会访问数据库并递增计数器，注意并发场景</li>
      <li><strong>getUserID() 需要登录状态：</strong>在服务端 Method 中 this.getInnovator().getUserID() 同理</li>
      <li><strong>ConsumeLicense：</strong>在 Method 开始处检查许可，避免无许可用户执行受控功能</li>
      <li><strong>calcMD5 已废弃：</strong>使用静态版本 ScalcMD5</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_getNewID.htm">getNewID Method</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_getNextSequence.htm">getNextSequence Method</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Innovator_getUserID.htm">getUserID Method</a></li>
    </ul>
  </article>
</template>
