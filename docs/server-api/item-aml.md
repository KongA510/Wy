---
title: AML/XML 操作
---

<h1>AML/XML 操作</h1>
<blockquote>
<p><strong>Item 提供丰富的 AML/XML 操作方法，用于加载 AML 字符串、转换为字符串、判断集合状态、检查根/新状态、克隆等。</strong>命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

<h2>一、loadAML(String) — 加载 AML</h2>

```csharp
// 签名
public void loadAML(string aml)

// 将传入的 AML 字符串加载为 Item 的 dom
// 同时自动设置 node 和 nodeList 属性
var item = inn.newItem();
item.loadAML("<AML><Item type='Part'><item_number>P-001</item_number></Item></AML>");

// 加载服务器响应
string response = soeResponse.ToString();
item.loadAML(response);
```

<p>loadAML 会自动根据 AML 内容设置 node/nodeList，以及正确识别 Error/Result/Logical 形式。</p>

<h2>二、ToString() — 输出 AML</h2>

```csharp
// 签名（override）
public override string ToString()

// 返回当前 Item 的 AML 字符串表示
string aml = item.ToString();
Console.WriteLine(aml);
```


<h2>三、isCollection / isEmpty / isRoot / isNew</h2>

```csharp
// isCollection — 是否代表多个 Item（nodeList != null）
public bool isCollection()

if (result.isCollection()) {
    for (int i = 0; i < result.getItemCount(); i++) { ... }
}

// isEmpty — 是否为空（替代旧版 hasFault()）
public bool isEmpty()

// isRoot — 是否为 dom 中的根 Item
public bool isRoot()

// isNew — 检查 isNew 属性
public bool isNew()
```


<h2>四、clone() — 克隆 Item</h2>

```csharp
// 签名
public Item clone()

// 深拷贝当前 Item（包括 dom 内容）
var original = inn.newItem("Part", "get");
original.setProperty("item_number", "P-001");
var copy = original.clone();     // copy 完全独立于 original
copy.setProperty("item_number", "P-002"); // 不影响 original
```


<h2>五、getInnovator / getParentItem</h2>

```csharp
// getInnovator — 获取此 Item 所属的 Innovator 实例
public Innovator getInnovator()
var innovator = item.getInnovator();

// getParentItem — 获取父 Item
public Item getParentItem()
var parent = childItem.getParentItem();
```


<h2>六、newXMLDocument / appendItem / removeItem</h2>

```csharp
// newXMLDocument — 创建新 ArasXmlDocument
public XmlDocument newXMLDocument()

// appendItem — 向 nodeList 追加 Item
public void appendItem(Item item)

// removeItem — 从 dom 中移除 Item
public void removeItem(Item item)

// getItemByIndex — 按索引获取 Item
public Item getItemByIndex(int index)

// getItemCount — 获取 Item 数量
public int getItemCount()
```


<h2>七、getItemsByXPath(String) — XPath 查询</h2>

```csharp
// 签名
public Item getItemsByXPath(string xpath)

// 按 XPath 表达式从 dom 中提取 Item（单个或集合）
var nodes = result.getItemsByXPath("//Item[@type='Part']");
```


<h2>八、完整示例</h2>

```csharp
var inn = this.newInnovator();

// 构建查询并发送
var query = inn.newItem("Part", "get");
query.setProperty("state", "Released");
var result = query.apply();

// 解析响应
if (result.isError()) {
    return inn.newError("查询失败：" + result.getErrorString());
}

if (!result.isCollection()) {
    // 单个结果
    string id = result.getID();
    string name = result.getProperty("name", "");
} else {
    // 多个结果，遍历
    for (int i = 0; i < result.getItemCount(); i++) {
        var item = result.getItemByIndex(i);
        string id = item.getID();
        string num = item.getProperty("item_number", "");
    }
}

// 克隆 Item 用于修改
var editCopy = result.clone();
editCopy.setAction("edit");
editCopy.setProperty("name", "新名称");
editCopy.apply();
```


<h2>九、实践笔记</h2>
<ul>
<li><strong>loadAML 自动解析：</strong>加载后 node/nodeList 会自动设置，不需要手动判断</li>
<li><strong>clone 是深拷贝：</strong>修改 clone 不影响原 Item</li>
<li><strong>getItemCount 返回 0：</strong>对于单个 Item（非集合），返回 1</li>
<li><strong>XPath 查询：</strong>getItemsByXPath 结果依赖于正确的 XPath 表达式，注意大小写</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/T_Aras_IOM_Item.htm">Item Class</a></li>
</ul>
