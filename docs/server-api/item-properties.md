---
title: 属性操作 (get/set/removeProperty)
---

# 属性操作
<blockquote>
<p><strong>Item 的属性操作方法是 AML 数据操作的核心。</strong>包括 getProperty（3 个重载）、setProperty（2 个重载）、removeProperty（2 个重载），支持多语言属性。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
</blockquote>

## 一、getProperty — 读取属性值

```csharp
// 重载 1：按名称获取
public string getProperty(string name)

// 重载 2：按名称 + 默认值
public string getProperty(string name, string defaultValue)

// 重载 3：按名称 + 默认值 + 语言
public string getProperty(string name, string defaultValue, string language)

// 示例
string name = item.getProperty("name", "");           // 使用空字符串作为默认值
string state = item.getProperty("state");             // 无默认值，可能为 null
string nameFr = item.getProperty("name", "", "fr");   // 法语版本
```


## 二、setProperty — 设置属性值

```csharp
// 重载 1：按名称设值
public void setProperty(string name, string value)

// 重载 2：按名称 + 语言设值
public void setProperty(string name, string value, string language)

// 如果属性不存在则自动创建
item.setProperty("name", "新零件");
item.setProperty("name", "Nouvelle Pièce", "fr");  // 法语名称
item.setProperty("cost", "123.45");
```


## 三、removeProperty — 删除属性

```csharp
// 重载 1：删除指定名称属性
public void removeProperty(string name)

// 重载 2：删除指定名称和语言的属性
public void removeProperty(string name, string language)

item.removeProperty("temporary_field");
item.removeProperty("name", "fr");  // 仅删除法语版本
```


## 四、多语言属性处理

```csharp
// 多语言属性在 AML 中表现为同一属性名 + 不同 xml:lang 属性
// <name>English Name</name>
// <name xml:lang="zh">中文名称</name>
// <name xml:lang="fr">Nom Français</name>

// 设置多语言
item.setProperty("description", "English desc");
item.setProperty("description", "中文描述", "zh");
item.setProperty("description", "Description française", "fr");

// 读取（当前会话语言为默认语言时等价于无 xml:lang 的标签）
string desc = item.getProperty("description", "");        // 当前会话语言
string descZh = item.getProperty("description", "", "zh"); // 中文
string descFr = item.getProperty("description", "", "fr"); // 法文
```


## 五、getPropertyCondition / setPropertyCondition

```csharp
// 获取属性的 'condition' 属性（用于 get 操作的查询条件）
public string getPropertyCondition(string name)
public string getPropertyCondition(string name, string language)

// 设置属性的 'condition' 属性
public void setPropertyCondition(string name, string condition)
public void setPropertyCondition(string name, string condition, string language)

// 示例：构造带条件的查询
var query = inn.newItem("Part", "get");
query.setProperty("item_number", "P-");
query.setPropertyCondition("item_number", "like");    // <item_number condition="like">P-</item_number>
query.setProperty("cost", "100");
query.setPropertyCondition("cost", "gt");             // <cost condition="gt">100</cost>
var result = query.apply();
```


## 六、完整示例：CRUD 操作中的属性操作

```csharp
var inn = this.newInnovator();

// 创建 (add)
var newPart = inn.newItem("Part", "add");
newPart.setProperty("item_number", "P-2025-001");
newPart.setProperty("name", "支架组件");
newPart.setProperty("description", "2025年新设计", "zh");
var addResult = newPart.apply();

// 查询 (get)
var query = inn.newItem("Part", "get");
query.setProperty("item_number", "P-2025-");
query.setPropertyCondition("item_number", "like");
var getResult = query.apply();
for (int i = 0; i < getResult.getItemCount(); i++) {
    var p = getResult.getItemByIndex(i);
    string num = p.getProperty("item_number", "");
    string nm = p.getProperty("name", "");
}

// 更新 (edit)
var edit = inn.newItem("Part", "edit");
edit.setID(partId);
edit.setProperty("name", "支架组件（修订版）");
edit.apply();

// 删除 (delete)
var del = inn.newItem("Part", "delete");
del.setID(partIdToDelete);
del.apply();
```


## 七、实践笔记
<ul>
<li><strong>默认值很重要：</strong>始终为 getProperty 提供第二个参数作为默认值，避免 null 检查</li>
<li><strong>AML 中的 locale 敏感类型：</strong>日期和浮点数在 AML 中必须以 neutral 格式表示（如日期用"yyyy-MM-ddTHH:mm:ss"）</li>
<li><strong>setProperty 自动创建：</strong>如果属性标签不存在，第一次 setProperty 会自动创建</li>
<li><strong>多语言陷阱：</strong>如果只设置了一种语言版本，其他语言查询时可能返回空</li>
</ul>

<p><strong>参考：</strong></p>
<ul>
<li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/Methods_T_Aras_IOM_Item.htm">Item Methods</a></li>
</ul>
