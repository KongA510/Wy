---
title: 获取物料分类 XJ_GetClassStructure
---

<h1>获取系统物料分类 XJ_GetClassStructure</h1>
<p>
查询 <code>Part</code> ItemType 的 <code>class_structure</code> 字段，将其 XML 解析为<strong>多级物料分类树</strong>后返回。
博克端在出图选择物料时，用此接口拉取 PLM 的完整物料分类体系。该接口<strong>无需传入参数</strong>。
</p>

<a href="/integration-source/XJ_GetClassStructure.txt" download="XJ_GetClassStructure.txt" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;margin:8px 0;background:#6366F1;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;">📥 下载源码：XJ_GetClassStructure.txt</a>

<h2>一、接口信息</h2>
<table>
<thead><tr><th>项目</th><th>说明</th></tr></thead>
<tbody>
<tr><td>接口地址</td><td><code>http://10.1.1.158/PLM/server/odata/method.XJ_GetClassStructure</code></td></tr>
<tr><td>请求方式</td><td>POST</td></tr>
<tr><td>请求参数</td><td>无需传入</td></tr>
<tr><td>认证</td><td>Bearer Token（见集成总览）</td></tr>
</tbody>
</table>

<h2>二、返回数据说明</h2>
<table>
<thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>categories</td><td>array</td><td>顶级分类列表</td></tr>
<tr><td>categories[].id</td><td>string</td><td>分类 ID（GUID）</td></tr>
<tr><td>categories[].name</td><td>string</td><td>分类名称</td></tr>
<tr><td>categories[].subcategories</td><td>array</td><td>子分类（递归结构），叶子节点无此字段</td></tr>
</tbody>
</table>

<h2>三、返回示例</h2>

```json
{{ respJson }}
```


    <h2>四、关键代码</h2>
    <h3>4.1 查询 class_structure 并解析为分类树</h3>
    <p>先以 AML 取出 <code>Part</code> 的 <code>class_structure</code> XML，校验非空后用 <code>XmlDocument</code> 加载，遍历根节点下的 <code>class</code> 子节点递归构建树。</p>
    
```csharp
{{ mainCode }}
```


<h3>4.2 递归解析 class 节点（支持任意层级）</h3>
<p><code>ParseClassNode</code> 递归读取每个 <code>class</code> 节点的 <code>id</code>/<code>name</code> 属性，子节点为空时 <code>subcategories</code> 保持 <code>null</code>，序列化时自动忽略，避免叶子节点出现空数组。</p>

```csharp
{{ parseCode }}
```


    <h3>4.3 分类节点数据结构</h3>
    
```csharp
{{ nodeCode }}
```


<h2>五、实现要点</h2>
<ul>
<li><strong>权限提升</strong>：方法开头 <code>GrantIdentity("Aras PLM")</code>，<code>finally</code> 中 <code>RevokeIdentity</code> 释放，确保读取 ItemType 元数据有足够的权限。</li>
<li><strong>递归而非两级</strong>：<code>ParseClassNode</code> 自递归，分类层级不受限制，新增三级、四级分类无需改代码。</li>
<li><strong>叶子节点裁剪</strong>：<code>subcategories</code> 标注 <code>JsonIgnore(WhenWritingNull)</code>，叶子节点不输出该字段，返回体更干净。</li>
<li><strong>分级错误处理</strong>：查询失败/数据为空返回 500，XML 格式无效（<code>XmlException</code>）返回 400，其余异常返回 500，均写入接口日志。</li>
</ul>
