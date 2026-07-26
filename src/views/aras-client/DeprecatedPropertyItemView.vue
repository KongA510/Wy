<template>
  <article class="doc-content">
    <h1>PropertyItem（已弃用）</h1>
    <blockquote>
      <p><strong>命名空间：</strong><code>Aras.Modules.CMF.Public</code></p>
      <p>PropertyItem 类似于网格中的一个单元格（cell）。它提供了对 CMF 树形表格中单元格值、ID、类型、样式、受保护状态和可见性等属性的访问，并支持获取所属的元素节点。此 API 已被弃用。</p>
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
          <td><code>#ctor</code></td>
          <td>公有构造函数</td>
          <td>创建 PropertyItem 实例</td>
        </tr>
        <tr>
          <td><code>value</code></td>
          <td>公有属性</td>
          <td>单元格的值。注意即使整数和日期也以 <code>string</code> 类型返回，日期使用 Neutral 格式</td>
        </tr>
        <tr>
          <td><code>id</code></td>
          <td>公有属性</td>
          <td>当前 PropertyItem 的 ID</td>
        </tr>
        <tr>
          <td><code>type</code></td>
          <td>公有属性</td>
          <td>对应的 cmf_PropertyItem 名称</td>
        </tr>
        <tr>
          <td><code>cmfStyle</code></td>
          <td>公有属性</td>
          <td>单元格样式。注意列的 content style 不会在此属性中提供</td>
        </tr>
        <tr>
          <td><code>isProtected</code></td>
          <td>公有属性</td>
          <td>当前用户对该 PropertyItem 是否处于受保护状态（无权限查看单元格值）</td>
        </tr>
        <tr>
          <td><code>isVisibleInGrid</code></td>
          <td>公有属性</td>
          <td>PropertyItem 在 Grid 中是否可见</td>
        </tr>
        <tr>
          <td><code>getElement()</code></td>
          <td>公有方法</td>
          <td>获取当前 PropertyItem 所属的 Element（即"包含"此网格单元格的树节点）</td>
        </tr>
      </tbody>
    </table>

    <h2>API 详情</h2>

    <h3>constructor()</h3>
    <p>构造函数，创建 PropertyItem 实例。通常不需要直接调用，PropertyItem 对象由 CMF 框架内部创建和管理。</p>
    <h4>语法</h4>
    <pre v-pre><code class="language-javascript">Aras.Modules.CMF.Public.PropertyItem = function();</code></pre>
    <h4>参数</h4>
    <p><em>无参数信息</em></p>
    <h4>返回值</h4>
    <p><em>新创建的 PropertyItem 实例</em></p>
    <hr />

    <h3>属性详解</h3>

    <h4>.value</h4>
    <p>获取单元格的值。<strong>注意：</strong>即使该单元格对应的是整数或日期类型的数据，返回值也始终为 <code>string</code> 类型。日期值使用 Neutral 格式返回。</p>
    <h5>语法</h5>
    <pre v-pre><code class="language-javascript">function get_value();</code></pre>
    <h5>参数</h5>
    <p><em>无参数</em></p>
    <h5>返回值</h5>
    <p><strong>string</strong> — 单元格的当前值。</p>
    <h5>示例</h5>
    <pre v-pre><code class="language-javascript">var propertyValue = property.value;</code></pre>
    <hr />

    <h4>.id</h4>
    <p>获取当前 PropertyItem 的 ID。</p>
    <h5>语法</h5>
    <pre v-pre><code class="language-javascript">function get_id();</code></pre>
    <h5>参数</h5>
    <p><em>无参数</em></p>
    <h5>返回值</h5>
    <p><strong>string</strong> — PropertyItem 的唯一标识符。</p>
    <h5>示例</h5>
    <pre v-pre><code class="language-javascript">var propertyId = property.id;</code></pre>
    <hr />

    <h4>.type</h4>
    <p>获取对应 cmf_PropertyItem 的名称。用于确定当前属性在 CMF 模型中对应的 Item 类型名称。</p>
    <h5>语法</h5>
    <pre v-pre><code class="language-javascript">function get_type();</code></pre>
    <h5>参数</h5>
    <p><em>无参数</em></p>
    <h5>返回值</h5>
    <p><strong>string</strong> — cmf_PropertyItem 的名称。</p>
    <h5>示例</h5>
    <pre v-pre><code class="language-javascript">var propertyTypeName = property.type;</code></pre>
    <hr />

    <h4>.cmfStyle</h4>
    <p>获取当前单元格的 CMF 样式对象（<code>CmfStyle</code>）。用于获取单元格的视觉样式信息。<strong>注意：</strong>列的 content style 不会在此属性中提供，仅返回该单元格自身的样式。</p>
    <h5>语法</h5>
    <pre v-pre><code class="language-javascript">function get_cmfStyle();</code></pre>
    <h5>参数</h5>
    <p><em>无参数</em></p>
    <h5>返回值</h5>
    <p><strong>Aras.Modules.CMF.Public.CmfStyle</strong> — 单元格的 CMF 样式对象。</p>
    <h5>示例</h5>
    <pre v-pre><code class="language-javascript">var cmfStyleOfProperty = property.cmfStyle;</code></pre>
    <hr />

    <h4>.isProtected</h4>
    <p>判断当前用户是否对该 PropertyItem 处于受保护状态。如果当前用户没有权限查看该单元格的值，则返回 <code>true</code>。</p>
    <h5>语法</h5>
    <pre v-pre><code class="language-javascript">function get_isProtected();</code></pre>
    <h5>参数</h5>
    <p><em>无参数</em></p>
    <h5>返回值</h5>
    <p><strong>bool</strong> — 受保护返回 <code>true</code>，否则返回 <code>false</code>。</p>
    <h5>示例</h5>
    <pre v-pre><code class="language-javascript">var isProtected = property.isProtected;</code></pre>
    <hr />

    <h4>.isVisibleInGrid</h4>
    <p>判断当前 PropertyItem 在 Grid 中是否可见。</p>
    <h5>语法</h5>
    <pre v-pre><code class="language-javascript">function get_isVisibleInGrid();</code></pre>
    <h5>参数</h5>
    <p><em>无参数</em></p>
    <h5>返回值</h5>
    <p><strong>bool</strong> — 在 Grid 中可见返回 <code>true</code>，否则返回 <code>false</code>。</p>
    <h5>示例</h5>
    <pre v-pre><code class="language-javascript">var isVisibleInGrid = property.isVisibleInGrid;</code></pre>
    <hr />

    <h3>方法详解</h3>

    <h4>.getElement()</h4>
    <p>获取当前 PropertyItem 所属的 Element 对象。Element 是 CMF 树形结构中"包含"此网格单元格的树节点，通过它可以访问树节点相关的上下文信息。</p>
    <h5>语法</h5>
    <pre v-pre><code class="language-javascript">function getElement();</code></pre>
    <h5>参数</h5>
    <p><em>无参数</em></p>
    <h5>返回值</h5>
    <p><strong>Aras.Modules.CMF.Public.Element</strong> — 包含此 PropertyItem 的树节点元素。</p>
    <h5>示例</h5>
    <pre v-pre><code class="language-javascript">var element = property.getElement();</code></pre>
    <hr />

    <h3>完整使用示例</h3>

    <h4>计算事件（onCalculate）中使用 PropertyItem</h4>
    <p>在 CMF 计算事件中遍历属性并获取单元格信息是最常见的场景：</p>
    <pre v-pre><code class="language-javascript">// 在 CMF onCalculate 事件中使用 PropertyItem
function onCalculate(element, properties) {
    // 遍历当前行的所有 PropertyItem
    for (var i = 0; i &lt; properties.length; i++) {
        var prop = properties[i];

        // 获取 PropertyItem 基本属性
        var propId = prop.id;           // 属性 ID
        var propType = prop.type;       // cmf_PropertyItem 名称
        var propValue = prop.value;     // 单元格值（始终为 string）

        // 检查受保护状态 — 若无权限则跳过
        if (prop.isProtected) {
            top.aras.AlertInfo("属性 " + propType + " 受保护，当前用户无权限查看");
            continue;
        }

        // 检查网格可见性
        if (!prop.isVisibleInGrid) {
            continue; // 跳过不可见的属性
        }

        // 按类型筛选特定属性
        if (propType === "cost") {
            var costValue = parseFloat(propValue);
            if (costValue &gt; 1000) {
                // 获取样式信息
                var style = prop.cmfStyle;
                // 可以根据样式做进一步判断...
            }
        }
    }
}</code></pre>

    <h4>在 CMF 渲染事件中使用 PropertyItem</h4>
    <p>以下示例展示如何在 onRenderCell 等 CMF 渲染事件中使用 PropertyItem 自定义单元格显示：</p>
    <pre v-pre><code class="language-javascript">// CMF onRenderCell 事件 — 使用 PropertyItem 自定义表格单元格渲染
function onRenderCell(propertyItem) {
    // 检查受保护状态
    if (propertyItem.isProtected) {
        return "&lt;span style='color: gray;'&gt;***&lt;/span&gt;";
    }

    var value = propertyItem.value;
    var typeName = propertyItem.type;

    // 根据 PropertyItem 类型做不同渲染
    switch (typeName) {
        case "status":
            var statusColors = {
                "Approved": "green",
                "Rejected": "red",
                "Draft": "orange"
            };
            var color = statusColors[value] || "black";
            return "&lt;span style='font-weight: bold; color: " + color + ";'&gt;" + value + "&lt;/span&gt;";

        case "cost":
            var numValue = parseFloat(value);
            if (!isNaN(numValue)) {
                // 对于数值类型，value 仍然是 string，需要手动转换
                return "&lt;span style='text-align: right; display: block;'&gt;" +
                       numValue.toFixed(2) + "&lt;/span&gt;";
            }
            break;

        case "created_on":
            // 日期使用 Neutral 格式，value 已经是字符串
            if (value) {
                var d = new Date(value);
                return d.toLocaleDateString();
            }
            break;

        default:
            return value;
    }

    return value;
}</code></pre>

    <h4>遍历 Element 下的所有 PropertyItem</h4>
    <p>以下示例展示如何从 Element 获取其下的所有 PropertyItem 并进行批量操作：</p>
    <pre v-pre><code class="language-javascript">// 从 Element 获取其所有 PropertyItem
function processElementProperties(element) {
    // element 是 Aras.Modules.CMF.Public.Element 实例
    // 遍历 Element 的所有属性
    var properties = element.items || []; // items 包含该节点的所有 PropertyItem

    var summary = [];
    for (var i = 0; i &lt; properties.length; i++) {
        var prop = properties[i];

        // 跳过不可见或受保护的属性
        if (!prop.isVisibleInGrid || prop.isProtected) {
            continue;
        }

        // 收集属性信息
        summary.push({
            id: prop.id,
            type: prop.type,
            value: prop.value
        });

        // 获取所属 Element
        var ownerElement = prop.getElement();
        if (ownerElement) {
            console.log("PropertyItem " + prop.id + " 属于元素: " + ownerElement.id);
        }
    }

    return summary;
}</code></pre>

    <h4>使用 cmfStyle 格式化单元格显示</h4>
    <pre v-pre><code class="language-javascript">// 利用 cmfStyle 属性获取单元格样式并进行条件判断
function applyCellFormatting(propertyItem) {
    var cmfStyle = propertyItem.cmfStyle;

    // cmfStyle 对象包含了 cell style 的配置信息
    // 可以用来动态设置单元格的显示效果

    // 根据 PropertyItem 的值和样式做条件判断
    var value = propertyItem.value;
    var typeName = propertyItem.type;

    // 例如：对于金额属性，检查是否超出了预算
    if (typeName === "budget_amount") {
        var amount = parseFloat(value);
        if (amount &gt; 100000) {
            // 可以修改样式对象的属性（具体取决于 CmfStyle API）
            // cmfStyle.fontWeight = "bold";
            // cmfStyle.color = "#ff0000";
        }
    }

    return cmfStyle;
}</code></pre>

    <hr />
    <p><em>⚠️ 已弃用。此 API 属于 Aras 旧版 CMF 框架（Aras.Modules.CMF.Public 命名空间），已被新的客户端框架替代。适用版本：Aras Innovator 11.0-14.x。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
