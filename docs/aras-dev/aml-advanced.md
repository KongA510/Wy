---
title: AML 高级查询
---

# AML 高级查询
<blockquote>
<p>AML 支持多层级嵌套查询、联合查询（Federation）、属性逻辑组合（AND/OR）、参数化查询等高级特性。</p>
</blockquote>

## 一、多 Item 批量查询
<p>一个 AML 文档可以包含多个 <code>&lt;Item&gt;</code> 元素，一次请求完成多次查询：</p>

```xml
<AML>
  <Item type="Part" action="get" select="id,name,item_number">
    <item_number condition="like">P-*</item_number>
  </Item>
  <Item type="Document" action="get" select="id,name,doc_number">
    <doc_number condition="like">DOC-*</doc_number>
  </Item>
</AML>
```

<p>结果通过索引访问不同 Item 的查询结果：</p>

```csharp
var result = inn.applyAML(aml);
// Parts: result.getItemByIndex(0)
// Documents: result.getItemByIndex(1)
```


## 二、属性逻辑组合 (AND/OR)

```xml
<!-- AND 逻辑：多个条件子元素默认就是 AND 关系 -->
<Item type="Part" action="get">
  <name condition="like">*Bolt*</name>
  <current_state condition="neq">Obsolete</current_state>
</Item>

<!-- OR 逻辑：使用 condition="or" -->
<Item type="Part" action="get">
  <Relationships>
    <Item type="Logical" action="get">
      <name condition="like">*Bolt*</name>
      <name condition="like">*Screw*</name>
      <Relationships>
        <Item type="Logical" action="or"></Item>
      </Relationships>
    </Item>
  </Relationships>
</Item>

<!-- 更推荐：使用 where 属性直接写 SQL -->
<Item type="Part" action="get"
      where="(name like '%Bolt%') OR (name like '%Screw%')">
</Item>
```


## 三、关系查询 (Relationship)

```xml
<AML>
  <Item type="Part" action="get" select="id,name,item_number">
    <item_number condition="eq">ASSY-001</item_number>
    <!-- 同时获取该父零件的 BOM 关系 -->
    <Relationships>
      <Item type="Part BOM" action="get"
            select="id,quantity,related_id">
        <!-- 继续展开关联的子零件 -->
        <related_id>
          <Item type="Part" action="get"
                select="id,name,item_number">
          </Item>
        </related_id>
      </Item>
    </Relationships>
  </Item>
</AML>
```

<p>IOM 处理关系：</p>

```csharp
var parent = inn.newItem("Part", "get");
parent.setProperty("item_number", "ASSY-001");
parent = parent.apply();

// 获取 BOM 关系
var boms = parent.getRelationships("Part BOM");
for (int i = 0; i < boms.getItemCount(); i++) {
    var bom = boms.getItemByIndex(i);
    string qty = bom.getProperty("quantity", "0");
    // 获取关联零件
    var childPart = bom.getRelatedItem();
    string childName = childPart.getProperty("name", "");
}
```


## 四、分页查询

```xml
<Item type="Part" action="get"
      select="id,name,item_number"
      order_by="item_number asc"
      page="1" pagesize="20">
</Item>
```

<p><strong>注意：</strong>需要同时查询总数以计算总页数（另发一次不带分页的 count 查询）。</p>

## 五、属性源（Property Source）
<p>支持跨 ItemType 属性引用，避免 SQL JOIN：</p>

```xml
<Item type="Part BOM" action="get" select="quantity">
  <related_id>
    <Item type="Part" action="get"
          select="id,name,item_number">
    </Item>
  </related_id>
</Item>
```


## 六、applySQL vs 高级 AML — 选择指南
<table>
<thead><tr><th>场景</th><th>推荐方式</th><th>原因</th></tr></thead>
<tbody>
<tr><td>简单 CRUD</td><td>IOM Item API</td><td>最简洁、自动权限控制</td></tr>
<tr><td>单表查询</td><td>AML get</td><td>结构清晰，自动序列化</td></tr>
<tr><td>多表 JOIN</td><td>applySQL</td><td>SQL 表达力强，性能好</td></tr>
<tr><td>带关系的复杂查询</td><td>AML + Relationships</td><td>一条 AML 获取完整对象图</td></tr>
<tr><td>聚合/统计</td><td>applySQL</td><td>SUM/COUNT/GROUP BY 只能通过 SQL</td></tr>
<tr><td>批量数据导入</td><td>AML 多 Item add</td><td>事务性，关系自动建立</td></tr>
</tbody>
</table>

<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://www.aras.com/community/f/development/3528/apply-aml/1198">Apply AML — Aras Community</a></li>
<li><a href="https://www.aras.com/community/f/development/55239/get-item-using-multiple-where-conditions-and-edit-the-item/10347">Get item using multiple Where conditions</a></li>
</ul>
