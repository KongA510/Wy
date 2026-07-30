---
title: Deprecated ComputeMethodResultBuilder
---

<h1>ComputeMethodResultBuilder（已弃用）</h1>
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Modules.CMF.Public</code></p>
<p>ComputeMethodResultBuilder 类的实例（作为参数传入）用于构建 CMF 计算结果。通过调用 <code>markToUpdate</code> 系列方法标记要更新的属性项，然后传入新的值。同一属性可以在同一方法中被多次标记更新，系统会使用最后一次设置的值，且不会影响性能（因为属性实际上只会被更新一次）。此 API 在 CMF 计算方法中被使用，允许动态修改属性项的显示样式和值。</p>
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
<td>公共构造函数</td>
<td>创建 ComputeMethodResultBuilder 实例</td>
</tr>
<tr>
<td><code>markToUpdateStyle()</code></td>
<td>公共方法</td>
<td>标记要更新的属性项，并传入新的样式对象</td>
</tr>
<tr>
<td><code>markToUpdateValue()</code></td>
<td>公共方法</td>
<td>标记要更新的属性项，并传入新的值</td>
</tr>
</tbody>
</table>

<h2>API 详情</h2>

<h3>constructor()</h3>
<p>创建一个新的 ComputeMethodResultBuilder 实例。通常不需要直接调用构造函数，该实例由 CMF 框架在计算方法执行时自动创建并通过 <code>inArgs.resultBuilder</code> 传入。</p>
<h4>签名</h4>

```javascript
Aras.Modules.CMF.Public.ComputeMethodResultBuilder = function();
```

    <h4>参数</h4>
    <p><em>无参数信息</em></p>
    <h4>返回值</h4>
    <p><em>新创建的 ComputeMethodResultBuilder 实例</em></p>

    <h4>使用场景</h4>
    <p>在 CMF 计算方法中，<code>inArgs</code> 参数对象包含一个 <code>resultBuilder</code> 属性，该属性即为框架已创建好的 ComputeMethodResultBuilder 实例。无需手动实例化，直接使用即可：</p>
    
```javascript
// CMF 计算方法签名
function computeMethod(inArgs) {
  // inArgs.resultBuilder 已经是 ComputeMethodResultBuilder 的实例
  var resultBuilder = inArgs.resultBuilder;
  // ... 使用 resultBuilder 标记属性更新
}
```

<hr />

<h3>markToUpdateStyle()</h3>
<p>标记要更新的属性项，并传入一个新的 <code>CmfStyle</code> 样式对象。调用此方法后，CMF 框架会在计算结果渲染时使用新样式来显示该属性。如果多次对同一属性调用此方法，最后一次设置将生效。</p>
<h4>签名</h4>

```javascript
markToUpdateStyle(propertyItemId: string, newStyle: Aras.Modules.CMF.Public.CmfStyle): void;
```

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
          <td><code>propertyItemId</code></td>
          <td><code>string</code></td>
          <td>要更新样式的属性项 ID，通过 <code>Element.getPropertyItem()</code> 获取</td>
        </tr>
        <tr>
          <td><code>newStyle</code></td>
          <td><code>Aras.Modules.CMF.Public.CmfStyle</code></td>
          <td>新的样式对象，通过 <code>Factory.createCmfStyle()</code> 创建</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><em>无</em></p>

    <h4>示例（来自官方文档）</h4>
    
```javascript
var cmfElements = inArgs.factory.findDescendantElements(
    'CMF Element Type Name'
);
if (cmfElements.length > 0) {
    var cmfProperty = cmfElements[0].getPropertyItem('CMF Property Type Name');
    var newStyle = inArgs.factory.createCmfStyle();
    newStyle.textColor = '#BEBEBE';
    inArgs.resultBuilder.markToUpdateStyle(cmfProperty.id, newStyle);
}
```


<h4>补充示例：条件样式更新</h4>

```javascript
// 根据属性值动态设置样式
function computeMethod(inArgs) {
    var elements = inArgs.factory.findDescendantElements('MyElement');
    if (elements.length > 0) {
        var element = elements[0];
        var propItem = element.getPropertyItem('status');

        var style = inArgs.factory.createCmfStyle();

        // 根据不同的属性值设置不同的颜色
        var currentValue = propItem.value;
        if (currentValue === 'Approved') {
            style.textColor = '#00AA00';
            style.fontBold = true;
        } else if (currentValue === 'Rejected') {
            style.textColor = '#FF0000';
            style.fontBold = true;
        } else if (currentValue === 'Pending') {
            style.textColor = '#FFA500';
        } else {
            style.textColor = '#999999';
        }

        inArgs.resultBuilder.markToUpdateStyle(propItem.id, style);
    }
}
```


<h4>补充示例：批量更新多个属性项的样式</h4>

```javascript
// 对多个属性项统一应用样式
function computeMethod(inArgs) {
    var elements = inArgs.factory.findDescendantElements('MyElement');
    if (elements.length > 0) {
        var element = elements[0];

        // 获取多个属性项
        var propItems = [
            element.getPropertyItem('name'),
            element.getPropertyItem('description'),
            element.getPropertyItem('created_on')
        ];

        var style = inArgs.factory.createCmfStyle();
        style.textColor = '#336699';
        style.fontItalic = true;

        // 对每个属性项应用相同的样式
        for (var i = 0; i < propItems.length; i++) {
            if (propItems[i]) {
                inArgs.resultBuilder.markToUpdateStyle(propItems[i].id, style);
            }
        }
    }
}
```

<hr />

<h3>markToUpdateValue()</h3>
<p>标记要更新的属性项，并传入一个新的值。调用此方法后，CMF 框架会在计算结果渲染时使用新值替代该属性的原始值。如果多次对同一属性调用此方法，最后一次设置将生效，且不会产生额外的性能开销。</p>
<h4>签名</h4>

```javascript
markToUpdateValue(propertyItemId: string, newValue: string): void;
```

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
          <td><code>propertyItemId</code></td>
          <td><code>string</code></td>
          <td>要更新值的属性项 ID，通过 <code>Element.getPropertyItem()</code> 获取</td>
        </tr>
        <tr>
          <td><code>newValue</code></td>
          <td><code>string</code></td>
          <td>新的属性值</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><em>无</em></p>

    <h4>示例（来自官方文档）</h4>
    
```javascript
var cmfElements = inArgs.factory.findDescendantElements(
    'CMF Element Type Name'
);
if (cmfElements.length > 0) {
    var cmfProperty = cmfElements[0].getPropertyItem('CMF Property Type Name');
    var newStyle = inArgs.factory.createCmfStyle();
    newStyle.textColor = '#BEBEBE';
    inArgs.resultBuilder.markToUpdateValue(cmfProperty.id, 'someValue');
}
```


<h4>补充示例：根据计算逻辑更新属性值</h4>

```javascript
// 在计算方法中根据属性A计算属性B的值
function computeMethod(inArgs) {
    var elements = inArgs.factory.findDescendantElements('MyElement');
    if (elements.length > 0) {
        var element = elements[0];

        // 获取源属性值
        var qtyItem = element.getPropertyItem('quantity');
        var priceItem = element.getPropertyItem('unit_price');
        var totalItem = element.getPropertyItem('total_price');

        if (qtyItem && priceItem && totalItem) {
            // 计算总价
            var qty = parseFloat(qtyItem.value) || 0;
            var price = parseFloat(priceItem.value) || 0;
            var total = qty * price;

            // 更新总价属性的值
            inArgs.resultBuilder.markToUpdateValue(
                totalItem.id,
                total.toFixed(2)
            );

            // 同时可以更新样式
            var style = inArgs.factory.createCmfStyle();
            if (total > 1000) {
                style.textColor = '#FF0000';
            } else {
                style.textColor = '#000000';
            }
            inArgs.resultBuilder.markToUpdateStyle(totalItem.id, style);
        }
    }
}
```


<h4>补充示例：同时更新值和样式</h4>

```javascript
// 同时更新属性的值和显示样式
function computeMethod(inArgs) {
    var elements = inArgs.factory.findDescendantElements('MyElement');
    if (elements.length > 0) {
        var element = elements[0];
        var statusItem = element.getPropertyItem('approval_status');

        if (statusItem) {
            var originalStatus = statusItem.value;
            var newStatus = '';
            var style = inArgs.factory.createCmfStyle();

            // 根据原始状态映射为中文显示值
            switch (originalStatus) {
                case 'A':
                    newStatus = '已批准';
                    style.textColor = '#00AA00';
                    style.fontBold = true;
                    break;
                case 'R':
                    newStatus = '已拒绝';
                    style.textColor = '#FF0000';
                    style.fontBold = true;
                    break;
                case 'P':
                    newStatus = '待审核';
                    style.textColor = '#FFA500';
                    break;
                default:
                    newStatus = '未知';
                    style.textColor = '#999999';
                    break;
            }

            // 更新值 — 将编码值转换为可读文本
            inArgs.resultBuilder.markToUpdateValue(statusItem.id, newStatus);
            // 更新样式 — 根据状态添加颜色标识
            inArgs.resultBuilder.markToUpdateStyle(statusItem.id, style);
        }
    }
}
```


<h4>补充示例：markToUpdate 的去重特性演示</h4>

```javascript
// 展示多次标记同一属性时最后一次生效的特性
function computeMethod(inArgs) {
    var elements = inArgs.factory.findDescendantElements('MyElement');
    if (elements.length > 0) {
        var element = elements[0];
        var resultItem = element.getPropertyItem('result');

        if (resultItem) {
            // 第一次设置 — 会被后面的覆盖
            inArgs.resultBuilder.markToUpdateValue(resultItem.id, 'value_1');

            // 中间可能有很多复杂计算逻辑...

            // 第二次设置 — 覆盖第一次
            inArgs.resultBuilder.markToUpdateValue(resultItem.id, 'value_2');

            // 最终设置 — 只有这个值会生效
            inArgs.resultBuilder.markToUpdateValue(resultItem.id, 'final_value');

            // 样式同理，最后一次设置生效
            var style1 = inArgs.factory.createCmfStyle();
            style1.textColor = '#0000FF';
            inArgs.resultBuilder.markToUpdateStyle(resultItem.id, style1);

            var style2 = inArgs.factory.createCmfStyle();
            style2.textColor = '#FF0000';
            // 最终生效的是红色
            inArgs.resultBuilder.markToUpdateStyle(resultItem.id, style2);
        }
    }
}
```


<h4>补充示例：完整的 CMF 计算方法模板</h4>

```javascript
// 完整的 CMF 计算方法示例模板
// 在 Aras Innovator CMF 中，将此方法绑定到某个 Element Type 的计算方法中
function computeMethod(inArgs) {
    // inArgs 包含以下关键属性：
    // - inArgs.factory: Factory 实例，用于查找元素和创建对象
    // - inArgs.resultBuilder: ComputeMethodResultBuilder 实例，用于构建结果

    // 1. 查找需要处理的元素
    var elements = inArgs.factory.findDescendantElements('MyElementType');
    if (elements.length === 0) {
        return; // 没有找到目标元素，直接返回
    }

    // 2. 遍历每个元素
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        // 3. 获取需要操作的属性项
        var propItem = element.getPropertyItem('target_property');
        if (!propItem) {
            continue;
        }

        // 4. 执行业务计算逻辑
        var computedValue = performBusinessLogic(element, inArgs);

        // 5. 使用 resultBuilder 标记要更新的值
        inArgs.resultBuilder.markToUpdateValue(propItem.id, computedValue);

        // 6. 创建并应用样式
        var style = inArgs.factory.createCmfStyle();
        applyStyle(style, computedValue);
        inArgs.resultBuilder.markToUpdateStyle(propItem.id, style);
    }
}

// 辅助函数：执行业务逻辑
function performBusinessLogic(element, inArgs) {
    var inputItem = element.getPropertyItem('input_field');
    var inputValue = inputItem ? inputItem.value : '';
    // 实际业务计算...
    return 'computed_' + inputValue;
}

// 辅助函数：根据值应用样式
function applyStyle(style, value) {
    if (value.indexOf('error') >= 0) {
        style.textColor = '#FF0000';
    } else {
        style.textColor = '#00AA00';
    }
}
```


<hr />
<p><em>⚠️ 已弃用。此 API 属于 Aras 旧版 CMF 框架（Aras.Modules.CMF.Public 命名空间），已被新的 CMF 体系替代。适用版本：Aras Innovator 11.0-14.x。</em></p>
