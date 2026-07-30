---
title: 获取物料分类 XJ_GetClassStructure
---

# 获取系统物料分类 XJ_GetClassStructure
<p>
查询 <code>Part</code> ItemType 的 <code>class_structure</code> 字段，将其 XML 解析为<strong>多级物料分类树</strong>后返回。
博克端在出图选择物料时，用此接口拉取 PLM 的完整物料分类体系。该接口<strong>无需传入参数</strong>。
</p>

<a href="/integration-source/XJ_GetClassStructure.txt" download="XJ_GetClassStructure.txt" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;margin:8px 0;background:#6366F1;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;">📥 下载源码：XJ_GetClassStructure.txt</a>

## 一、接口信息
<table>
<thead><tr><th>项目</th><th>说明</th></tr></thead>
<tbody>
<tr><td>接口地址</td><td><code>http://10.1.1.158/PLM/server/odata/method.XJ_GetClassStructure</code></td></tr>
<tr><td>请求方式</td><td>POST</td></tr>
<tr><td>请求参数</td><td>无需传入</td></tr>
<tr><td>认证</td><td>Bearer Token（见集成总览）</td></tr>
</tbody>
</table>

## 二、返回数据说明
<table>
<thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>categories</td><td>array</td><td>顶级分类列表</td></tr>
<tr><td>categories[].id</td><td>string</td><td>分类 ID（GUID）</td></tr>
<tr><td>categories[].name</td><td>string</td><td>分类名称</td></tr>
<tr><td>categories[].subcategories</td><td>array</td><td>子分类（递归结构），叶子节点无此字段</td></tr>
</tbody>
</table>

## 三、返回示例

```json
{
    "status": 200,
    "error": "",
    "data": {
        "categories": [
            {
                "id": "64801C21172EEEB61692B77CB5E0ABF1",
                "name": "1.皮類",
                "subcategories": [
                    { "id": "A199A9A175D34C568D49C5117E04C00C", "name": "11.NL布類" },
                    { "id": "A8A959FB26C64D05BD9C760508495ED6", "name": "12.POLY類" }
                ]
            },
            {
                "id": "0730DDC9C70B49948095AA329B4B04B5",
                "name": "2.透明料（PVC|TPU）",
                "subcategories": [
                    { "id": "A3E9E1570D2A416DB5114C6D95C5D608", "name": "21.不發泡膠布" }
                ]
            }
        ]
    }
}
```
## 四、关键代码
### 4.1 查询 class_structure 并解析为分类树
<p>先以 AML 取出 <code>Part</code> 的 <code>class_structure</code> XML，校验非空后用 <code>XmlDocument</code> 加载，遍历根节点下的 <code>class</code> 子节点递归构建树。</p>

```csharp
var itemType = inn.newItem("ItemType", "get");
itemType.setProperty("name", "Part");
itemType.setAttribute("select", "class_structure");
itemType = itemType.apply();
if (itemType.getItemCount() != 1)
{
    var badResult = ApiResult<ClassStructureData>.ServerError("数据查询失败");
    responseBody = System.Text.Json.JsonSerializer.Serialize(badResult);
    WriteInterfaceLog(inn, "XJ_GetClassStructure", "XJ_GetClassStructure()", responseBody, "1");
    return inn.newResult(responseBody);
}

var classStructureXml = itemType.getProperty("class_structure", "");
if (string.IsNullOrEmpty(classStructureXml))
{
    var badResult = ApiResult<ClassStructureData>.ServerError("class_structure数据为空");
    // ... 记录日志并返回
}

// 解析 XML 为分类树
var doc = new XmlDocument();
doc.LoadXml(classStructureXml);
var root = doc.DocumentElement;

var categories = new List<CategoryNode>();
foreach (XmlNode child in root.ChildNodes)
{
    if (child.NodeType == XmlNodeType.Element && child.Name == "class")
    {
        categories.Add(ParseClassNode(child));
    }
}

var successResult = ApiResult<ClassStructureData>.Success(new ClassStructureData { categories = categories });
responseBody = System.Text.Json.JsonSerializer.Serialize(successResult);
WriteInterfaceLog(inn, "XJ_GetClassStructure", "XJ_GetClassStructure()", responseBody, "0");
return inn.newResult(responseBody);
```
### 4.2 递归解析 class 节点（支持任意层级）
<p><code>ParseClassNode</code> 递归读取每个 <code>class</code> 节点的 <code>id</code>/<code>name</code> 属性，子节点为空时 <code>subcategories</code> 保持 <code>null</code>，序列化时自动忽略，避免叶子节点出现空数组。</p>

```csharp
public static CategoryNode ParseClassNode(XmlNode node)
{
    // 读取当前节点的 id 和 name 属性
    var category = new CategoryNode
    {
        id = node.Attributes?["id"]?.Value ?? "",
        name = node.Attributes?["name"]?.Value ?? ""
    };

    // 递归处理子节点
    var children = new List<CategoryNode>();
    foreach (XmlNode child in node.ChildNodes)
    {
        if (child.NodeType == XmlNodeType.Element && child.Name == "class")
        {
            children.Add(ParseClassNode(child));
        }
    }

    // 有子节点时赋值，无子节点时保持 null（序列化时忽略该字段）
    category.subcategories = children.Count > 0 ? children : null;
    return category;
}
```
### 4.3 分类节点数据结构

```csharp
public class CategoryNode
{
    /// <summary>分类ID（对应XML中class节点的id属性）</summary>
    public string id { get; set; } = string.Empty;

    /// <summary>分类名称（对应XML中class节点的name属性）</summary>
    public string name { get; set; } = string.Empty;

    /// <summary>子分类列表，叶子节点时为null（序列化时自动忽略）</summary>
    [System.Text.Json.Serialization.JsonIgnore(Condition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull)]
    public List<CategoryNode>? subcategories { get; set; }
}
```
## 五、实现要点
<ul>
<li><strong>权限提升</strong>：方法开头 <code>GrantIdentity("Aras PLM")</code>，<code>finally</code> 中 <code>RevokeIdentity</code> 释放，确保读取 ItemType 元数据有足够的权限。</li>
<li><strong>递归而非两级</strong>：<code>ParseClassNode</code> 自递归，分类层级不受限制，新增三级、四级分类无需改代码。</li>
<li><strong>叶子节点裁剪</strong>：<code>subcategories</code> 标注 <code>JsonIgnore(WhenWritingNull)</code>，叶子节点不输出该字段，返回体更干净。</li>
<li><strong>分级错误处理</strong>：查询失败/数据为空返回 500，XML 格式无效（<code>XmlException</code>）返回 400，其余异常返回 500，均写入接口日志。</li>
</ul>
