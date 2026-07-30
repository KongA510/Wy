---
title: AML 操作 (CRUD)
---

# AML 操作 (CRUD)
<blockquote>
<p>AML 支持完整的 CRUD 操作：<strong>get（查询）、add（新增）、edit（修改）、delete（删除）</strong>。每个 action 对应不同的 AML 结构和行为。</p>
</blockquote>

## 一、get — 查询数据

```xml
<AML>
  <Item type="Part" action="get"
        select="id,name,item_number,current_state"
        order_by="item_number asc"
        page="1" pagesize="50">
    <item_number condition="like">P-*</item_number>
    <current_state condition="neq">Obsolete</current_state>
  </Item>
</AML>
```

<p><strong>IOM 等效代码：</strong></p>

```csharp
var part = inn.newItem("Part", "get");
part.setAttribute("select", "id,name,item_number,current_state");
part.setAttribute("order_by", "item_number asc");
part.setProperty("item_number", "P-*");
part.setPropertyCondition("item_number", "like");
part = part.apply();

for (int i = 0; i < part.getItemCount(); i++) {
    var p = part.getItemByIndex(i);
    string name = p.getProperty("name", "");
    // ...
}
```


## 二、add — 新增数据

```xml
<AML>
  <Item type="Part" action="add" doGetItem="1">
    <item_number>P-NEW-001</item_number>
    <name>新零件</name>
    <description>通过 AML 创建的零件</description>
    <unit>EA</unit>
    <Relationships>
      <Item type="Part BOM" action="add">
        <quantity>5</quantity>
        <related_id>
          <Item type="Part" action="get">
            <item_number condition="eq">P-001</item_number>
          </Item>
        </related_id>
      </Item>
    </Relationships>
  </Item>
</AML>
```

<p><strong>IOM 等效代码：</strong></p>

```csharp
var part = inn.newItem("Part", "add");
part.setProperty("item_number", "P-NEW-001");
part.setProperty("name", "新零件");
part.setProperty("description", "通过 IOM 创建的零件");

var bom = inn.newItem("Part BOM", "add");
bom.setProperty("quantity", "5");

var relatedPart = inn.newItem("Part", "get");
relatedPart.setProperty("item_number", "P-001");
bom.setRelatedItem(relatedPart);

part.addRelationship(bom);
part = part.apply();
```


## 三、edit — 修改数据

```xml
<AML>
  <Item type="Part" action="edit"
        id="A1B2C3D4E5F6..."
        doGetItem="1">
    <name>修改后的零件名称</name>
    <cost>99.99</cost>
  </Item>
</AML>

<!-- 或使用 where 条件批量更新 -->
<AML>
  <Item type="Part" action="edit"
        where="Part.item_number like 'OLD-%'">
    <current_state>Obsolete</current_state>
  </Item>
</AML>
```

<p><strong>IOM 等效代码：</strong></p>

```csharp
// 按 ID 修改
var part = inn.newItem("Part", "edit");
part.setProperty("name", "修改后的零件名称");
part.setAttribute("where", "Part.id='A1B2C3D4E5F6...'");
part = part.apply();

// 或先获取再修改
var getPart = inn.newItem("Part", "get");
getPart.setProperty("item_number", "P-001");
getPart = getPart.apply();
var editPart = inn.newItem("Part", "edit");
editPart.setProperty("name", "新名称");
editPart.setAttribute("where",
    $"Part.id='{getPart.getProperty("id","")}'");
editPart = editPart.apply();
```


## 四、delete — 删除数据

```xml
<AML>
  <Item type="Part" action="delete"
        id="A1B2C3D4E5F6...">
  </Item>
</AML>

<!-- 或条件删除 -->
<AML>
  <Item type="Part" action="delete"
        where="Part.current_state='Obsolete' AND Part.modified_on < '2020-01-01'">
  </Item>
</AML>
```

<p><strong>⚠️ 注意：</strong>条件删除非常危险，务必先在测试环境验证条件是否正确。</p>

## 五、promote — 生命周期推进

```xml
<AML>
  <Item type="Part" action="promote"
        id="A1B2C3D4E5F6...">
    <state>Released</state>
    <comments>设计评审通过</comments>
  </Item>
</AML>
```


```csharp
// IOM 方式
var part = inn.newItem("Part", "get");
part.setProperty("id", "xxx");
part = part.apply();
part = part.promote("Released", "设计评审通过");
```


## 六、错误处理

```csharp
var result = inn.applyAML(amlString);
if (result.isError()) {
    string errorMsg = result.getErrorString();
    // 日志记录 + 返回错误
    return inn.newError(errorMsg);
}
```


<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://www.aras.com/community/documentationlibrary/Innovator/32/Content/Innovator%2024%20Docs/Programmer's%20Guide/Aras%20Innovator%20Methodology.htm">Aras Innovator Methodology — AML Reference</a></li>
<li><a href="https://www.aras.com/community/f/development/3528/apply-aml/1198">Apply AML — Aras Community Discussion</a></li>
</ul>
