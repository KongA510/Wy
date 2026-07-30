---
title: CmfStyle（样式）
---

<h1>CmfStyle（已弃用）</h1>
<blockquote>
<p><strong>命名空间：</strong><code>Aras.Modules.CMF.Public</code></p>
<p>CmfStyle 类支持与 <code>cmf_Style</code> 物料类型（Item Type）相同的样式属性及其值。该类用于 Content Modeling Framework（CMF）中，为 Element（元素）提供 CSS 级别的样式控制能力，包括背景色、文字颜色、字体族、字号、字体样式、字体粗细、文字装饰和文字对齐等属性。获取 CmfStyle 实例应通过 <code>Factory.createCmfStyle()</code> 工厂方法，避免直接使用 <code>new</code> 关键字构造。</p>
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
<tr><td><code>#ctor</code></td><td>公共构造函数</td><td>创建 CmfStyle 实例</td></tr>
<tr><td><code>backgroundColor</code></td><td>公共属性</td><td>获取/设置背景颜色，仅支持 "#aBcdeF" 格式的十六进制颜色值</td></tr>
<tr><td><code>textColor</code></td><td>公共属性</td><td>获取/设置文字颜色，仅支持 "#aBcdeF" 格式的十六进制颜色值</td></tr>
<tr><td><code>fontFamily</code></td><td>公共属性</td><td>获取/设置字体族（font-family）</td></tr>
<tr><td><code>fontSize</code></td><td>公共属性</td><td>获取/设置字号，仅支持整数值（单位：像素）</td></tr>
<tr><td><code>fontStyle</code></td><td>公共属性</td><td>获取/设置字体样式，仅支持 "normal" 和 "italic"</td></tr>
<tr><td><code>fontWeight</code></td><td>公共属性</td><td>获取/设置字体粗细，仅支持 "normal" 和 "bold"</td></tr>
<tr><td><code>textDecoration</code></td><td>公共属性</td><td>获取/设置文字装饰，仅支持 "none" 和 "underline"</td></tr>
<tr><td><code>textAlign</code></td><td>公共属性</td><td>获取/设置文字对齐方式，仅支持 "left"、"right" 和 "center"</td></tr>
<tr><td><code>clone()</code></td><td>公共方法</td><td>创建当前 CmfStyle 实例的克隆副本</td></tr>
</tbody>
</table>

<h2>API 详情</h2>

<h3>constructor()</h3>
<p>创建 CmfStyle 实例。推荐使用 <code>Factory.createCmfStyle()</code> 工厂方法获取实例，以确保实例与 CMF 上下文正确关联。</p>
<h4>签名</h4>

```javascript
Aras.Modules.CMF.Public.CmfStyle = function();
```

    <h4>参数</h4>
    <p><em>无参数。</em></p>
    <h4>返回值</h4>
    <p><strong>Aras.Modules.CMF.Public.CmfStyle</strong> — 新创建的 CmfStyle 实例。</p>
    <h4>示例</h4>
    
```javascript
// 通过工厂方法创建 CmfStyle 实例（推荐方式）
var style = inArgs.factory.createCmfStyle();

// 不推荐直接使用 new 构造函数
// var style = new Aras.Modules.CMF.Public.CmfStyle();
```

<hr />

<h2>颜色属性</h2>

<h3>.backgroundColor</h3>
<p>获取或设置元素的背景颜色。仅支持 <code>"#aBcdeF"</code> 格式的十六进制颜色值，大小写不敏感。不支持 RGB、HSL 或颜色名称等其他格式。</p>
<h4>语法</h4>

```javascript
function get_backgroundColor();
function set_backgroundColor(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>string</code></td><td>十六进制颜色值，格式为 <code>"#aBcdeF"</code>，例如 <code>"#BEBEBE"</code> 或 <code>"#FF0000"</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的十六进制背景颜色值。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.backgroundColor = '#BEBEBE';
```


<h3>.textColor</h3>
<p>获取或设置元素的文字颜色。仅支持 <code>"#aBcdeF"</code> 格式的十六进制颜色值，大小写不敏感。</p>
<h4>语法</h4>

```javascript
function get_textColor();
function set_textColor(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>string</code></td><td>十六进制颜色值，格式为 <code>"#aBcdeF"</code>，例如 <code>"#333333"</code> 或 <code>"#FFFFFF"</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的十六进制文字颜色值。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.textColor = '#BEBEBE';
```


<h4>颜色属性综合示例</h4>

```javascript
// 在 CMF 方法中为元素设置配色主题
var computeMethod = function(inArgs) {
  var resultBuilder = inArgs.factory.createComputeMethodResultBuilder();
  var element = inArgs.factory.createElement("Label", "myLabel");

  // 创建样式对象
  var style = inArgs.factory.createCmfStyle();

  // 设置深色主题配色
  style.backgroundColor = '#2C3E50';  // 深蓝灰背景
  style.textColor = '#ECF0F1';        // 浅灰文字

  // 将样式绑定到元素
  element.setCmfStyle(style);

  resultBuilder.addElement(element);
  return resultBuilder;
};
```

<hr />

<h2>字体属性</h2>

<h3>.fontFamily</h3>
<p>获取或设置元素的字体族（font-family）。支持标准 CSS 字体族字符串，包括回退字体列表。</p>
<h4>语法</h4>

```javascript
function get_fontFamily();
function set_fontFamily(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>string</code></td><td>CSS 字体族字符串，例如 <code>"Arial, sans-serif"</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的字体族字符串。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
```


<h3>.fontSize</h3>
<p>获取或设置元素的字号。仅支持整数值（不支持小数），单位为像素（px）。</p>
<h4>语法</h4>

```javascript
function get_fontSize();
function set_fontSize(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>number</code></td><td>字号整数值，单位为像素。例如 <code>12</code>、<code>16</code>、<code>24</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的字号值。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.fontSize = 12;
```


<h3>.fontStyle</h3>
<p>获取或设置元素的字体样式。仅支持 <code>"normal"</code> 和 <code>"italic"</code> 两个值。</p>
<h4>语法</h4>

```javascript
function get_fontStyle();
function set_fontStyle(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>string</code></td><td>字体样式，仅支持 <code>"normal"</code> 或 <code>"italic"</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的字体样式（<code>"normal"</code> 或 <code>"italic"</code>）。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.fontStyle = 'italic';
```


<h3>.fontWeight</h3>
<p>获取或设置元素的字体粗细。仅支持 <code>"normal"</code> 和 <code>"bold"</code> 两个值。</p>
<h4>语法</h4>

```javascript
function get_fontWeight();
function set_fontWeight(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>string</code></td><td>字体粗细，仅支持 <code>"normal"</code> 或 <code>"bold"</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的字体粗细（<code>"normal"</code> 或 <code>"bold"</code>）。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.fontWeight = 'bold';
```


<h4>字体属性综合示例</h4>

```javascript
// 为报表标题设置醒目的字体样式
var computeMethod = function(inArgs) {
  var element = inArgs.factory.createElement("Label", "reportTitle");
  var style = inArgs.factory.createCmfStyle();

  style.fontFamily = "Arial, 'Helvetica Neue', sans-serif";
  style.fontSize = 24;
  style.fontWeight = 'bold';
  style.fontStyle = 'normal';
  style.textColor = '#2C3E50';

  element.setCmfStyle(style);
  return element;
};
```

<hr />

<h2>文字装饰与对齐</h2>

<h3>.textDecoration</h3>
<p>获取或设置元素的文字装饰效果。仅支持 <code>"none"</code> 和 <code>"underline"</code> 两个值。</p>
<h4>语法</h4>

```javascript
function get_textDecoration();
function set_textDecoration(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>string</code></td><td>文字装饰，仅支持 <code>"none"</code> 或 <code>"underline"</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的文字装饰（<code>"none"</code> 或 <code>"underline"</code>）。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.textDecoration = 'underline';
```


<h3>.textAlign</h3>
<p>获取或设置元素的文字水平对齐方式。仅支持 <code>"left"</code>、<code>"right"</code> 和 <code>"center"</code> 三个值。</p>
<h4>语法</h4>

```javascript
function get_textAlign();
function set_textAlign(value);
```

<h4>参数</h4>
<table>
<thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>value</code></td><td><code>string</code></td><td>文字对齐方式，仅支持 <code>"left"</code>、<code>"right"</code> 或 <code>"center"</code></td></tr>
</tbody>
</table>
<h4>返回值</h4>
<p><strong>string</strong> — 当前的文字对齐方式。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.textAlign = 'right';
```


<h4>对齐与装饰综合示例</h4>

```javascript
// 创建带下划线的居中标题
var computeMethod = function(inArgs) {
  var element = inArgs.factory.createElement("Label", "sectionTitle");
  var style = inArgs.factory.createCmfStyle();

  style.textAlign = 'center';
  style.textDecoration = 'underline';
  style.fontWeight = 'bold';
  style.fontSize = 18;

  element.setText("产品规格汇总");
  element.setCmfStyle(style);
  return element;
};
```

<hr />

<h2>实例方法</h2>

<h3>.clone()</h3>
<p>创建当前 CmfStyle 实例的深克隆副本。克隆后的对象与原对象相互独立，对克隆对象的修改不会影响原对象。此方法在需要基于现有样式模板创建变体时非常有用。</p>
<h4>参数</h4>
<p><em>无参数。</em></p>
<h4>返回值</h4>
<p><strong>Aras.Modules.CMF.Public.CmfStyle</strong> — 当前实例的克隆副本。</p>
<h4>示例</h4>

```javascript
var style = inArgs.factory.createCmfStyle();
style.textAlign = 'right';
var copy = style.clone();
```


<h4>clone() 综合示例</h4>

```javascript
// 使用 clone() 快速创建多个相似样式变体
var computeMethod = function(inArgs) {
  var resultBuilder = inArgs.factory.createComputeMethodResultBuilder();

  // 创建基础样式模板
  var baseStyle = inArgs.factory.createCmfStyle();
  baseStyle.fontFamily = "Arial, sans-serif";
  baseStyle.fontSize = 14;
  baseStyle.textAlign = 'left';

  // 基于模板创建标题样式（加粗、放大）
  var headerStyle = baseStyle.clone();
  headerStyle.fontWeight = 'bold';
  headerStyle.fontSize = 20;
  headerStyle.textColor = '#2C3E50';

  // 基于模板创建提示文字样式（斜体、灰色）
  var hintStyle = baseStyle.clone();
  hintStyle.fontStyle = 'italic';
  hintStyle.textColor = '#95A5A6';
  hintStyle.fontSize = 12;

  // 基于模板创建错误提示样式（红色加粗）
  var errorStyle = baseStyle.clone();
  errorStyle.textColor = '#E74C3C';
  errorStyle.fontWeight = 'bold';

  // 创建页面标题
  var headerElement = inArgs.factory.createElement("Label", "pageTitle");
  headerElement.setText("CMF 报表");
  headerElement.setCmfStyle(headerStyle);
  resultBuilder.addElement(headerElement);

  // 创建提示文字
  var hintElement = inArgs.factory.createElement("Label", "pageHint");
  hintElement.setText("生成时间：" + new Date().toLocaleString());
  hintElement.setCmfStyle(hintStyle);
  resultBuilder.addElement(hintElement);

  // 创建错误提示
  var errorElement = inArgs.factory.createElement("Label", "errorMsg");
  errorElement.setText("注意：数据可能不完整");
  errorElement.setCmfStyle(errorStyle);
  resultBuilder.addElement(errorElement);

  return resultBuilder;
};
```

<hr />

<h2>综合示例：CMF 表格样式化</h2>

```javascript
// 完整的 CMF 方法示例 — 使用 CmfStyle 构建带样式的数据表格
var computeMethod = function(inArgs) {
  var resultBuilder = inArgs.factory.createComputeMethodResultBuilder();

  // 获取传入的数据上下文
  var thisItem = inArgs.thisItem;
  var itemTypeName = thisItem.getProperty("itemtype_name", "");

  // --- 表格容器样式 ---
  var containerElement = inArgs.factory.createElement("Table", "dataTable");

  // --- 表头样式 ---
  var headerStyle = inArgs.factory.createCmfStyle();
  headerStyle.backgroundColor = '#34495E';
  headerStyle.textColor = '#FFFFFF';
  headerStyle.fontWeight = 'bold';
  headerStyle.fontSize = 14;
  headerStyle.textAlign = 'center';
  headerStyle.fontFamily = "Arial, sans-serif";

  // --- 数据行样式（偶数行） ---
  var evenRowStyle = inArgs.factory.createCmfStyle();
  evenRowStyle.backgroundColor = '#F8F9FA';
  evenRowStyle.textColor = '#2C3E50';
  evenRowStyle.fontSize = 13;
  evenRowStyle.textAlign = 'left';

  // --- 数据行样式（奇数行） ---
  var oddRowStyle = evenRowStyle.clone();
  oddRowStyle.backgroundColor = '#FFFFFF';

  // --- 链接样式 ---
  var linkStyle = inArgs.factory.createCmfStyle();
  linkStyle.textColor = '#2980B9';
  linkStyle.textDecoration = 'underline';
  linkStyle.fontStyle = 'italic';

  resultBuilder.addElement(containerElement);

  // 组装结果并返回
  var result = resultBuilder.getResult();
  result.setProperty("headerStyle", headerStyle);
  result.setProperty("evenRowStyle", evenRowStyle);
  result.setProperty("oddRowStyle", oddRowStyle);
  result.setProperty("linkStyle", linkStyle);

  return result;
};
```


<hr />
<p><em>⚠️ 已弃用。适用版本：Aras Innovator 11.0-14.x。此 API 属于 CMF（Content Modeling Framework）已弃用的公共 API。在新版本中，CMF 样式控制已迁移到新的框架中，建议参考最新的 Aras 客户端框架文档获取替代方案。</em></p>
