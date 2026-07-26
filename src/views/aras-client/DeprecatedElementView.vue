<template>
  <article class="doc-content">
    <h1>Element（已弃用）</h1>
    <blockquote>
      <p><strong>命名空间：</strong><code>Aras.Modules.CMF.Public</code></p>
      <p>Element 对象类似于树中的一个节点，是 CMF（Configurable Molding Framework）中表示 UI 元素层级结构的核心对象。它提供了获取标识信息、遍历树结构（查找祖先和后代）、以及访问关联属性项（PropertyItem）的方法。此 API 已被弃用，建议使用新的 CUI 框架替代。</p>
    </blockquote>

    <h2>API 成员概览</h2>
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
          <td>创建 Element 实例</td>
        </tr>
        <tr>
          <td><code>.id</code></td>
          <td>公共属性</td>
          <td>当前 Element 的唯一标识 ID</td>
        </tr>
        <tr>
          <td><code>.parentId</code></td>
          <td>公共属性</td>
          <td>父级 Element 的 ID</td>
        </tr>
        <tr>
          <td><code>.boundItemId</code></td>
          <td>公共属性</td>
          <td>绑定的 Item（Aras 数据项）的 ID</td>
        </tr>
        <tr>
          <td><code>.type</code></td>
          <td>公共属性</td>
          <td>对应的 cmf_ElementType Item 的名称</td>
        </tr>
        <tr>
          <td><code>.sortOrder</code></td>
          <td>公共属性</td>
          <td>排序顺序</td>
        </tr>
        <tr>
          <td><code>.findAncestorElement()</code></td>
          <td>公共方法</td>
          <td>在任意层级查找祖先 Element，不限于直接父级</td>
        </tr>
        <tr>
          <td><code>.findDescendantElements()</code></td>
          <td>公共方法</td>
          <td>在任意层级查找后代 Element，不限于直接子级</td>
        </tr>
        <tr>
          <td><code>.getPropertyItem()</code></td>
          <td>公共方法</td>
          <td>获取当前 Element 的单个 PropertyItem（包括 Grid 中可见和不可见的）</td>
        </tr>
        <tr>
          <td><code>.getPropertyItems()</code></td>
          <td>公共方法</td>
          <td>获取当前 Element 的所有 PropertyItem（包括 Grid 中可见和不可见的）</td>
        </tr>
      </tbody>
    </table>

    <h2>API 详情</h2>

    <h3>构造函数</h3>

    <h4>constructor()</h4>
    <p>构造函数，创建 Element 实例。通常不需要直接调用，Element 对象由 <code>Factory</code> 相关方法或 CMF 框架内部创建和返回。</p>
    <h4>签名</h4>
    <pre v-pre><code class="language-javascript">Aras.Modules.CMF.Public.Element = function();</code></pre>
    <h4>参数</h4>
    <p><em>无参数信息</em></p>
    <h4>返回值</h4>
    <p><em>新创建的 Element 实例</em></p>
    <hr />

    <h3>标识属性</h3>

    <h4>.id</h4>
    <p>获取当前 Element 的唯一标识 ID。每个 Element 在 CMF 树结构中都有唯一 ID。</p>
    <h4>语法</h4>
    <pre v-pre><code class="language-javascript">function get_id();</code></pre>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>string</strong> — Element 的唯一标识 ID</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">var elementId = element.id;</code></pre>
    <hr />

    <h4>.parentId</h4>
    <p>获取当前 Element 的父级 Element ID。如果当前 Element 是树的根节点，则返回值可能为空。</p>
    <h4>语法</h4>
    <pre v-pre><code class="language-javascript">function get_parentId();</code></pre>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>string</strong> — 父级 Element 的 ID</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">var parentId = element.parentId;</code></pre>
    <hr />

    <h4>.boundItemId</h4>
    <p>获取当前 Element 绑定的 Aras Item（数据项）的 ID。Element 可以关联到一个具体的 Aras 数据项（如 Part、Document 等），通过此属性可以获取该关联项的 ID。</p>
    <h4>语法</h4>
    <pre v-pre><code class="language-javascript">function get_boundItemId();</code></pre>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>string</strong> — 绑定的 Item 的 ID</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">var boundItemId = element.boundItemId;</code></pre>
    <hr />

    <h4>.type</h4>
    <p>获取当前 Element 对应的 cmf_ElementType Item 的名称。ElementType 定义了该 Element 在 CMF 框架中的行为类型。</p>
    <h4>语法</h4>
    <pre v-pre><code class="language-javascript">function get_type();</code></pre>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>string</strong> — cmf_ElementType 的名称</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">var elementType = element.type;</code></pre>
    <hr />

    <h4>.sortOrder</h4>
    <p>获取当前 Element 的排序顺序值。用于在同一层级的多个 Element 中确定排列顺序。</p>
    <h4>语法</h4>
    <pre v-pre><code class="language-javascript">function get_sortOrder();</code></pre>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>string</strong> — 排序顺序</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">var sortOrderOfElement = element.sortOrder;</code></pre>
    <hr />

    <h3>树结构遍历方法</h3>

    <h4>.findAncestorElement(elementType)</h4>
    <p>在任意层级中查找满足指定 ElementType 名称的祖先 Element。与直接访问 <code>.parentId</code> 不同，此方法会沿父链向上遍历，直到找到匹配的元素。这在嵌套结构较深时非常有用，例如需要找到外层容器类型的 Element。</p>
    <h4>参数</h4>
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
          <td><code>elementType</code></td>
          <td><code>string</code></td>
          <td>要查找的 cmf_ElementType 名称</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>Aras.Modules.CMF.Public.Element</strong> — 找到的祖先 Element，若未找到则返回 <code>null</code></p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 官网示例：根据 ElementType 名称查找祖先元素
var foundElement = element.findAncestorElement('CMF Element Type Name');
</code></pre>
    <h4>实用示例：在事件回调中查找祖先 Element</h4>
    <pre v-pre><code class="language-javascript">// 在 CMF 事件处理中，从当前元素向上查找特定类型的祖先
function onElementClick(contextElement) {
  // 查找最近的"Form"类型的祖先 Element
  var formElement = contextElement.findAncestorElement('Form');
  if (formElement) {
    console.log('所属表单 ID: ' + formElement.id);

    // 获取表单中的某个属性值
    var nameProperty = formElement.getPropertyItem('name');
    if (nameProperty) {
      console.log('表单名称: ' + nameProperty.getValue());
    }
  }

  // 查找"Toolbar"类型的祖先
  var toolbarElement = contextElement.findAncestorElement('Toolbar');
  if (toolbarElement) {
    console.log('位于工具栏内');
  }
}
</code></pre>
    <hr />

    <h4>.findDescendantElements(elementType, showCandidate)</h4>
    <p>在任意层级中查找所有满足指定 ElementType 名称的后代 Element。与只获取直接子级不同，此方法会递归遍历整个子树，返回所有匹配的元素数组。常用于批量获取某类型的子元素（如获取表单中所有输入框）。</p>
    <h4>参数</h4>
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
          <td><code>elementType</code></td>
          <td><code>string</code></td>
          <td>要查找的 cmf_ElementType 名称</td>
        </tr>
        <tr>
          <td><code>showCandidate</code></td>
          <td><code>boolean</code></td>
          <td>是否包含候选（Candidate）元素。候选元素是尚未完全确定的临时元素，通常传 <code>false</code> 只获取已确定的元素</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>array of Aras.Modules.CMF.Public.Element</strong> — 匹配的后代 Element 数组</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 官网示例：根据 ElementType 名称查找所有后代元素
var foundElements = element.findDescendantElements('CMF Element Type Name');
</code></pre>
    <h4>实用示例：收集表单中的所有字段</h4>
    <pre v-pre><code class="language-javascript">// 在 CMF 树中递归查找所有输入框类型的后代 Element
function collectAllFields(rootElement) {
  // 获取所有 Field 类型的后代元素
  var fieldElements = rootElement.findDescendantElements('Field', false);

  var fieldsInfo = [];
  for (var i = 0; i < fieldElements.length; i++) {
    var field = fieldElements[i];
    var fieldData = {
      id: field.id,
      type: field.type,
      properties: []
    };

    // 获取该字段的所有属性项
    var propertyItems = field.getPropertyItems();
    for (var j = 0; j < propertyItems.length; j++) {
      var prop = propertyItems[j];
      fieldData.properties.push({
        type: prop.getType(),
        value: prop.getValue()
      });
    }

    fieldsInfo.push(fieldData);
  }

  console.log('共找到 ' + fieldsInfo.length + ' 个字段');
  return fieldsInfo;
}

// 使用示例
var allFields = collectAllFields(rootElement);
</code></pre>
    <hr />

    <h3>属性项访问方法</h3>

    <h4>.getPropertyItem(propertyItemType)</h4>
    <p>获取当前 Element 中指定类型的单个 PropertyItem。PropertyItem 代表树节点中的一个"网格单元格"——即 Element 的某个属性值。此方法可以获取 Grid 中可见和不可见的属性项。</p>
    <h4>参数</h4>
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
          <td><code>propertyItemType</code></td>
          <td><code>string</code></td>
          <td>要获取的 Property Item 的类型名称</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>Aras.Modules.CMF.Public.PropertyItem</strong> — 匹配的 PropertyItem 对象，若未找到则返回 <code>null</code></p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 官网示例：根据属性类型名称获取属性项
var property = element.getPropertyItem('CMF Property Type Name');
</code></pre>
    <h4>实用示例：读取和设置 Element 属性值</h4>
    <pre v-pre><code class="language-javascript">// 获取并修改 Element 的属性值
function updateElementName(targetElement, newName) {
  // 获取 "name" 类型的属性项
  var nameProperty = targetElement.getPropertyItem('name');
  if (nameProperty) {
    // 获取当前值
    var currentName = nameProperty.getValue();
    console.log('当前名称: ' + currentName);

    // 设置新值
    nameProperty.setValue(newName);
    console.log('名称已更新为: ' + newName);
  } else {
    console.warn('未找到 name 属性项');
  }
}

// 获取 Element 的标签文本
function getElementLabel(element) {
  var labelProp = element.getPropertyItem('label');
  if (labelProp) {
    return labelProp.getValue();
  }
  return element.id; // 回退到使用 ID 作为标签
}
</code></pre>
    <hr />

    <h4>.getPropertyItems()</h4>
    <p>获取当前 Element 的所有 PropertyItem。PropertyItem 代表树节点的"网格单元格"——包含 Element 在 Grid 中可见和不可见的所有属性。返回的数组包含该 Element 的所有属性项，可用于遍历、读取或修改。</p>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>array of Aras.Modules.CMF.Public.PropertyItem</strong> — 该 Element 的所有 PropertyItem 数组</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 官网示例：获取 Element 的所有属性项
var elementProperties = element.getPropertyItems();
</code></pre>
    <h4>实用示例：遍历并输出 Element 的所有属性</h4>
    <pre v-pre><code class="language-javascript">// 遍历输出 Element 的所有属性信息
function dumpElementProperties(element) {
  var properties = element.getPropertyItems();
  console.log('=== Element: ' + element.id + ' (Type: ' + element.type + ') ===');

  for (var i = 0; i < properties.length; i++) {
    var prop = properties[i];
    console.log('  [' + i + '] ' + prop.getType() + ' = ' + prop.getValue());
  }

  console.log('共 ' + properties.length + ' 个属性');
}

// 克隆 Element 所有属性到另一个 Element
function copyProperties(sourceElement, targetElement) {
  var sourceProps = sourceElement.getPropertyItems();
  for (var i = 0; i < sourceProps.length; i++) {
    var sourceProp = sourceProps[i];
    var propType = sourceProp.getType();

    // 在目标 Element 中查找同名属性
    var targetProp = targetElement.getPropertyItem(propType);
    if (targetProp) {
      targetProp.setValue(sourceProp.getValue());
    }
  }
  console.log('已将 ' + sourceProps.length + ' 个属性从源 Element 复制到目标 Element');
}
</code></pre>
    <hr />

    <h3>综合示例：在 CMF 树中操作 Element</h3>
    <pre v-pre><code class="language-javascript">// 综合使用 Element API 进行树结构操作
function processCMFTree(rootElement) {
  // 1. 获取根元素的基本信息
  console.log('根元素 ID: ' + rootElement.id);
  console.log('根元素类型: ' + rootElement.type);
  console.log('绑定 Item ID: ' + rootElement.boundItemId);

  // 2. 查找特定类型的后代元素
  var buttonElements = rootElement.findDescendantElements('Button', false);
  console.log('找到 ' + buttonElements.length + ' 个按钮元素');

  // 3. 处理每个按钮元素
  for (var i = 0; i < buttonElements.length; i++) {
    var btn = buttonElements[i];

    // 获取按钮的 label 属性
    var labelProp = btn.getPropertyItem('label');
    var label = labelProp ? labelProp.getValue() : 'Unnamed';

    // 查找按钮所属的工具栏祖先
    var toolbar = btn.findAncestorElement('Toolbar');
    var toolbarName = toolbar ? toolbar.id : '无工具栏';

    console.log('按钮[' + i + ']: ' + label + ' (工具栏: ' + toolbarName + ')');
  }

  // 4. 查找数据绑定元素 - 获取所有绑定到具体 Item 的元素
  var allElements = rootElement.findDescendantElements('Row', false);
  var boundElements = [];
  for (var j = 0; j < allElements.length; j++) {
    if (allElements[j].boundItemId) {
      boundElements.push(allElements[j]);
    }
  }
  console.log('共有 ' + boundElements.length + ' 个绑定了 Item 的元素');

  // 5. 按 sortOrder 排序子元素
  var childElements = rootElement.findDescendantElements('Field', false);
  childElements.sort(function(a, b) {
    var orderA = parseInt(a.sortOrder) || 0;
    var orderB = parseInt(b.sortOrder) || 0;
    return orderA - orderB;
  });
  console.log('按排序顺序排列的字段:');
  for (var k = 0; k < childElements.length; k++) {
    console.log('  ' + childElements[k].id + ' (sortOrder: ' + childElements[k].sortOrder + ')');
  }
}
</code></pre>
    <hr />

    <h3>关系图</h3>
    <pre v-pre><code class="language-text">Tree（树）
  └── Element（根节点）
        ├── .id: "root_element_001"
        ├── .type: "Form"
        ├── .boundItemId: "ITEM_ID_123"
        ├── .parentId: null（根节点无父级）
        ├── .sortOrder: "0"
        │
        ├── ★ .findAncestorElement("Form") → 向上遍历查找祖先
        ├── ★ .findDescendantElements("Field") → 向下遍历查找后代
        │
        ├── Element（子节点 - 字段1）
        │     ├── .id: "field_001"
        │     ├── .type: "Field"
        │     ├── .parentId: "root_element_001"
        │     ├── .getPropertyItem("label")  → PropertyItem(label)
        │     ├── .getPropertyItem("value")  → PropertyItem(value)
        │     └── .getPropertyItems()        → [PropertyItem(label), PropertyItem(value), ...]
        │
        ├── Element（子节点 - 字段2）
        │     ├── .id: "field_002"
        │     ├── .type: "Field"
        │     ├── .parentId: "root_element_001"
        │     └── ...属性项...
        │
        └── Element（子节点 - 工具栏）
              ├── .id: "toolbar_001"
              ├── .type: "Toolbar"
              └── Element（子节点 - 按钮）
                    ├── .id: "button_001"
                    ├── .type: "Button"
                    ├── .findAncestorElement("Toolbar") → toolbar_001
                    └── .findAncestorElement("Form")    → root_element_001</code></pre>

    <hr />
    <p><em>⚠️ 已弃用。此 API 属于 Aras 旧版 CMF 框架（Aras.Modules.CMF.Public 命名空间），已被新的 CUI 框架替代。适用版本：Aras Innovator 11.0-14.x。新项目建议使用 <a href="#/aras-client/cui-controls">CUI Controls API</a> 进行 UI 开发。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
