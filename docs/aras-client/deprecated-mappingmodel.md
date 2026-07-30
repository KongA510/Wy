---
title: MappingModel（映射模型）
---

# MappingModel（已弃用）
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Modules.CMF.Public</code></p>
<p>MappingModel 对象用于描述文档元素与业务对象元素之间的映射关系。通过 <code>Factory.createMappingModel()</code> 创建，设置文档元素 ID（<code>sourceId</code>）、业务对象元素 ID（<code>relatedId</code>）、绑定动作（<code>action</code>）、父文档元素 ID（<code>parentSourceId</code>）以及排序顺序（<code>sortOrder</code>）等属性，用于 CMF 绑定流程。此 API 已被弃用。</p>
</blockquote>

## API 成员概览
<table>
<thead>
<tr>
<th>成员</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>constructor()</code></td>
<td>构造函数</td>
<td>创建 MappingModel 实例</td>
</tr>
<tr>
<td><code>sourceId</code></td>
<td>公共属性</td>
<td>文档元素 ID</td>
</tr>
<tr>
<td><code>relatedId</code></td>
<td>公共属性</td>
<td>业务对象元素 ID</td>
</tr>
<tr>
<td><code>action</code></td>
<td>公共属性</td>
<td>绑定动作（Bind、Unbind、Ignore）</td>
</tr>
<tr>
<td><code>parentSourceId</code></td>
<td>公共属性</td>
<td>父文档元素 ID</td>
</tr>
<tr>
<td><code>sortOrder</code></td>
<td>公共属性</td>
<td>业务对象元素的排序顺序</td>
</tr>
</tbody>
</table>

## API 详情

### constructor()
<p>构造函数，创建 MappingModel 实例。通常不直接调用，应通过 <code>Factory.createMappingModel()</code> 方法创建实例。</p>
#### 签名

```javascript
Aras.Modules.CMF.Public.MappingModel = function();
```

#### 参数
<p><em>无参数信息</em></p>
#### 返回值
<p><em>新创建的 MappingModel 实例</em></p>
#### 示例

```javascript
// 推荐通过 Factory 创建 MappingModel 实例
var mappingModel = inArgs.factory.createMappingModel();
```

<hr />

### .sourceId
<p>获取或设置文档元素 ID。该属性标识需要绑定的文档中的目标元素。</p>
#### 签名

```javascript
function get_sourceId();
function set_sourceId(value);
```

#### 参数
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>string</code></td>
<td>文档元素的 ID</td>
</tr>
</tbody>
</table>
#### 返回值
<p><strong>string</strong> — 文档元素 ID</p>
#### 示例

```javascript
var mappingModel = inArgs.factory.createMappingModel();
mappingModel.sourceId = 'Some Document Element Id';

// 获取当前设置的 sourceId
var currentSourceId = mappingModel.sourceId;
console.log("当前文档元素 ID: " + currentSourceId);
```

<hr />

### .relatedId
<p>获取或设置业务对象元素 ID。该属性标识文档元素需要绑定到的业务对象（如 Part）中的目标元素。</p>
#### 签名

```javascript
function get_relatedId();
function set_relatedId(value);
```

#### 参数
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>string</code></td>
<td>业务对象元素 ID（例如 Part ID）</td>
</tr>
</tbody>
</table>
#### 返回值
<p><strong>string</strong> — 业务对象元素 ID</p>
#### 示例

```javascript
var mappingModel = inArgs.factory.createMappingModel();
mappingModel.relatedId =
    'Some Business Object Element Id (for example Part Id)';
```

<hr />

### .action
<p>获取或设置绑定动作。用于指定映射关系的操作类型。</p>
#### 签名

```javascript
function get_action();
function set_action(value);
```

#### 参数
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>string</code></td>
<td>动作类型，可选值：<code>"Bind"</code>（绑定）、<code>"Unbind"</code>（解绑）、<code>"Ignore"</code>（忽略）</td>
</tr>
</tbody>
</table>
#### 返回值
<p><strong>string</strong> — 当前动作类型</p>
#### 示例

```javascript
var mappingModel = inArgs.factory.createMappingModel();
mappingModel.action = 'Bind';

// 根据条件判断绑定动作
if (shouldUnbind) {
  mappingModel.action = 'Unbind';
} else if (shouldSkip) {
  mappingModel.action = 'Ignore';
}
```

<hr />

### .parentSourceId
<p>获取或设置父文档元素 ID。用于指定文档中当前元素的父级元素的 ID，支持树形结构的映射关系。</p>
#### 签名

```javascript
function get_parentSourceId();
function set_parentSourceId(value);
```

#### 参数
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>string</code></td>
<td>父文档元素的 ID</td>
</tr>
</tbody>
</table>
#### 返回值
<p><strong>string</strong> — 父文档元素 ID</p>
#### 示例

```javascript
var mappingModel = inArgs.factory.createMappingModel();
mappingModel.parentSourceId = 'Parent Document Element Id';

// 获取父元素 ID 用于层级关系构建
var parentId = mappingModel.parentSourceId;
```

<hr />

### .sortOrder
<p>获取或设置业务对象元素的排序顺序。用于控制映射结果中元素的排列顺序。</p>
#### 签名

```javascript
function get_sortOrder();
function set_sortOrder(value);
```

#### 参数
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>value</code></td>
<td><code>number</code></td>
<td>排序顺序（数字越大越靠后）</td>
</tr>
</tbody>
</table>
#### 返回值
<p><strong>string</strong> — 当前排序值</p>
#### 示例

```javascript
var mappingModel = inArgs.factory.createMappingModel();
mappingModel.sortOrder = 1;
```

<hr />

### 完整示例：构建文档到业务对象的映射关系

```javascript
// 场景：将文档中的两个段落绑定到对应的 Part 属性
// 假设文档结构:
//   Document (root)
//     ├── Chapter1 (parent)
//     │   ├── Paragraph_A (需要绑定到 Part.Name)
//     │   └── Paragraph_B (需要绑定到 Part.Description)
//     └── Chapter2 (parent)
//         └── Paragraph_C (需要绑定到 Part.item_number)

// 创建三个 MappingModel 实例
var mapping1 = inArgs.factory.createMappingModel();
mapping1.sourceId = 'Paragraph_A_ElementId';
mapping1.relatedId = 'Part_Name_ElementId';
mapping1.parentSourceId = 'Chapter1_ElementId';
mapping1.action = 'Bind';
mapping1.sortOrder = 1;

var mapping2 = inArgs.factory.createMappingModel();
mapping2.sourceId = 'Paragraph_B_ElementId';
mapping2.relatedId = 'Part_Description_ElementId';
mapping2.parentSourceId = 'Chapter1_ElementId';
mapping2.action = 'Bind';
mapping2.sortOrder = 2;

var mapping3 = inArgs.factory.createMappingModel();
mapping3.sourceId = 'Paragraph_C_ElementId';
mapping3.relatedId = 'Part_item_number_ElementId';
mapping3.parentSourceId = 'Chapter2_ElementId';
mapping3.action = 'Bind';
mapping3.sortOrder = 1;

// 将映射集合传递给绑定方法
var mappings = [mapping1, mapping2, mapping3];
// 后续在 CMF 绑定流程中使用这些映射关系
```


<hr />
<p><em>⚠️ 已弃用。此 API 属于 Aras 旧版 CMF 体系（Aras.Modules.CMF.Public 命名空间），已被新的框架替代。适用版本：Aras Innovator 11.0-14.x。</em></p>
