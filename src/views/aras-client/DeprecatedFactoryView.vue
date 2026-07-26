<template>
  <article class="doc-content">
    <h1>Factory（已弃用）</h1>
    <blockquote>
      <p><strong>命名空间：</strong><code>Aras.Modules.CMF.Public</code></p>
      <p>Factory 采用"工厂方法"设计模式，用于创建 CMF 框架中的各种类实例，如 MappingModel、CmfStyle 等，同时也提供了在 CMF 元素树中查找子孙元素的能力。</p>
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
          <td>创建 Factory 实例</td>
        </tr>
        <tr>
          <td><code>createMappingModel()</code></td>
          <td>公共方法</td>
          <td>创建新的 MappingModel 实例</td>
        </tr>
        <tr>
          <td><code>findDescendantElements()</code></td>
          <td>公共方法</td>
          <td>根据元素类型名称从根节点查找子孙元素</td>
        </tr>
        <tr>
          <td><code>createCmfStyle()</code></td>
          <td>公共方法</td>
          <td>创建新的 CmfStyle 实例</td>
        </tr>
      </tbody>
    </table>

    <h2>API 详情</h2>

    <h3>constructor()</h3>
    <p>构造函数，创建 Factory 实例。通常由 CMF 框架内部调用，通过 <code>inArgs.factory</code> 获取实例。</p>
    <h4>签名</h4>
    <pre v-pre><code class="language-javascript">Aras.Modules.CMF.Public.Factory = function();</code></pre>
    <h4>参数</h4>
    <p><em>无参数信息</em></p>
    <h4>返回值</h4>
    <p><em>无信息提供</em></p>
    <hr />

    <h3>createMappingModel()</h3>
    <p>创建一个新的 <code>Aras.Modules.CMF.Public.MappingModel</code> 实例。MappingModel 用于建立 CMF 元素属性与数据源之间的映射关系。</p>
    <h4>签名</h4>
    <pre v-pre><code class="language-javascript">Factory.prototype.createMappingModel = function();</code></pre>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>Aras.Modules.CMF.Public.MappingModel</strong> — 新创建的 MappingModel 实例</p>
    <h4>示例</h4>
    <h5>原始示例</h5>
    <pre v-pre><code class="language-javascript">var mappingModel = inArgs.factory.createMappingModel();</code></pre>
    <h5>创建并配置 MappingModel 进行数据绑定</h5>
    <pre v-pre><code class="language-javascript">// 在 CMF 方法（如 Compute Method）中，通过 inArgs.factory 获取 Factory 实例
// 创建 MappingModel 用于建立元素属性与数据源的映射
var mappingModel = inArgs.factory.createMappingModel();

// 配置映射关系：将元素属性 "part_number" 映射到 Items 请求中的对应属性
mappingModel.setMappingType("attribute_mapping");
mappingModel.setSourceProperty("part_number");
mappingModel.setTargetProperty("my_PartNumber");

// 元素会通过 MappingModel 自动获取/更新数据</code></pre>

    <h5>在配置元素中批量创建 MappingModel</h5>
    <pre v-pre><code class="language-javascript">// CMF 元素的事件处理方法中可获取 factory 实例
// 为多个子元素分别创建 MappingModel
function setupElementMappings(contextElement) {
  var factory = contextElement.getFactory();
  var childElements = contextElement.getChildElements();

  for (var i = 0; i &lt; childElements.length; i++) {
    var child = childElements[i];
    var mapping = factory.createMappingModel();

    // 根据元素属性名自动匹配数据源
    mapping.setSourceProperty(child.getProperty("data_source_field"));
    mapping.setTargetProperty(child.getProperty("target_field"));

    child.setMappingModel(mapping);
  }
}</code></pre>
    <hr />

    <h3>findDescendantElements()</h3>
    <p>从根节点（root Node）中查找指定元素类型名称的子孙元素。可以控制是否仅返回候选（candidate）元素。此方法在 CMF 树结构中递归搜索，返回匹配的 Element 数组。</p>
    <h4>签名</h4>
    <pre v-pre><code class="language-javascript">Factory.prototype.findDescendantElements = function(elementType, showCandidate);</code></pre>
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
          <td>要查找的元素类型名称（如 <code>"Field"</code>、<code>"Group"</code>、<code>"Tab"</code> 等）</td>
        </tr>
        <tr>
          <td><code>showCandidate</code></td>
          <td><code>boolean</code></td>
          <td>是否包含候选元素（<code>true</code> 表示包含，<code>false</code> 表示仅返回非候选元素）</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>array of Aras.Modules.CMF.Public.Element</strong> — 匹配的 Element 对象数组</p>
    <h4>示例</h4>
    <h5>原始示例</h5>
    <pre v-pre><code class="language-javascript">var cmfElements = inArgs.factory.findDescendantElements(
    'CMF Element Type Name'
);</code></pre>

    <h5>查找所有 Field 类型元素并读取属性</h5>
    <pre v-pre><code class="language-javascript">// 在 CMF 表单上下文中查找所有 Field 类型的子孙元素
var fieldElements = inArgs.factory.findDescendantElements("Field", false);

// 遍历每个 Field 元素，读取其属性
for (var i = 0; i &lt; fieldElements.length; i++) {
  var field = fieldElements[i];
  var fieldName = field.getProperty("name");
  var fieldLabel = field.getProperty("label");
  var isRequired = field.getProperty("is_required");

  console.log("字段: " + fieldLabel + " (" + fieldName + "), 必填: " + isRequired);
}</code></pre>

    <h5>包含候选元素 — 查找所有 Group 并统计子元素</h5>
    <pre v-pre><code class="language-javascript">// 包含候选元素（showCandidate = true），获取完整列表
var allGroups = inArgs.factory.findDescendantElements("Group", true);

console.log("共找到 " + allGroups.length + " 个 Group 元素");

for (var i = 0; i &lt; allGroups.length; i++) {
  var group = allGroups[i];
  var children = group.getChildElements();
  console.log("Group '" + group.getProperty("label") + "' 包含 " + children.length + " 个子元素");
}</code></pre>
    <hr />

    <h3>createCmfStyle()</h3>
    <p>创建一个新的 <code>Aras.Modules.CMF.Public.CmfStyle</code> 实例。CmfStyle 用于定义 CMF 元素的样式，如字体、颜色、边距等外观属性。</p>
    <h4>签名</h4>
    <pre v-pre><code class="language-javascript">Factory.prototype.createCmfStyle = function();</code></pre>
    <h4>参数</h4>
    <p><em>无参数</em></p>
    <h4>返回值</h4>
    <p><strong>Aras.Modules.CMF.Public.CmfStyle</strong> — 新创建的 CmfStyle 实例</p>
    <h4>示例</h4>
    <h5>原始示例</h5>
    <pre v-pre><code class="language-javascript">var cmfStyle = inArgs.factory.createCmfStyle();</code></pre>

    <h5>创建并配置 CmfStyle 应用于元素</h5>
    <pre v-pre><code class="language-javascript">// 创建 CmfStyle 实例并设置样式属性
var cmfStyle = inArgs.factory.createCmfStyle();

// 设置字体样式
cmfStyle.setFontFamily("Arial, sans-serif");
cmfStyle.setFontSize("14px");
cmfStyle.setFontWeight("bold");

// 设置颜色
cmfStyle.setColor("#333333");
cmfStyle.setBackgroundColor("#F5F5F5");

// 设置边距和内边距
cmfStyle.setMargin("8px 0");
cmfStyle.setPadding("12px");

// 将样式应用到 CMF 元素
var myElement = inArgs.factory.findDescendantElements("Field", false)[0];
myElement.setCmfStyle(cmfStyle);</code></pre>

    <h5>为不同类型元素批量创建统一样式</h5>
    <pre v-pre><code class="language-javascript">// 为表单中的标签元素统一设置样式
function applyLabelStyle(contextElement) {
  var factory = contextElement.getFactory();
  var labelElements = factory.findDescendantElements("Label", false);

  for (var i = 0; i &lt; labelElements.length; i++) {
    var label = labelElements[i];
    var style = factory.createCmfStyle();

    // 根据标签类型设置不同样式
    if (label.getProperty("is_required") === "1") {
      style.setFontWeight("bold");
      style.setColor("#CC0000");  // 必填标签红色加粗
    } else {
      style.setFontWeight("normal");
      style.setColor("#666666");
    }

    label.setCmfStyle(style);
  }
}</code></pre>
    <hr />

    <h3>综合示例：在 CMF Compute Method 中使用 Factory</h3>
    <pre v-pre><code class="language-javascript">// CMF Compute Method 是 Factory 最常用的上下文
// inArgs 中包含了 factory 实例，可以直接使用

function computeMethod(inArgs) {
  // 1. 创建 MappingModel 进行数据映射
  var mappingModel = inArgs.factory.createMappingModel();
  mappingModel.setMappingType("item_property");
  mappingModel.setSourceProperty("part_number");
  mappingModel.setTargetProperty("my_part_number");

  // 2. 查找 Form 中所有的 Field 元素
  var fields = inArgs.factory.findDescendantElements("Field", false);

  // 3. 为每个 Field 设置样式
  for (var i = 0; i &lt; fields.length; i++) {
    var field = fields[i];
    var style = inArgs.factory.createCmfStyle();

    // 根据字段属性设置不同样式
    if (field.getProperty("is_required") === "1") {
      style.setFontWeight("bold");
      style.setColor("#CC0000");
    }

    field.setCmfStyle(style);
  }

  // 4. 返回结果
  return {
    mappingModel: mappingModel,
    processedFields: fields.length
  };
}</code></pre>

    <hr />
    <p><em>⚠️ 已弃用。此 API 属于 Aras CMF 框架的工厂方法模式（Aras.Modules.CMF.Public 命名空间），已被新的 CUI 框架替代。适用版本：Aras Innovator 11.0-14.x。新项目建议使用 <a href="#/aras-client/cui-controls">CUI Controls API</a>。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
