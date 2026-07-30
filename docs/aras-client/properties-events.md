---
title: 属性事件模型
---

# 属性事件模型
<blockquote>
<p>ItemType 的属性（Properties）定义了一个数据模型，每个属性可以拥有自己的<strong>事件（Events）</strong>。事件在数据层面工作，对 HTML DOM 层无感知。</p>
</blockquote>

## 一、核心概念
<p>ItemType 定义描述了模型包含哪些属性。每个属性可以有自己独立的事件处理器。事件执行代码时<strong>没有特定的 UI 上下文</strong>——它只与属性数据（或 Item 数据）交互，不能修改 HTML 层级。</p>

<div class="tip-box">
<strong>⚠️ 注意</strong>：<strong>Poly ItemType</strong> 的属性不支持事件系统。Poly Item 的事件将映射到其 <strong>PolySource</strong> 上。
</div>

## 二、Poly Item 事件映射

```text
PolyItem
  ├── PolySource: ItemType A  (事件在此触发)
  └── PolySource: ItemType B  (事件在此触发)

如果编辑 PolyItem：
→ 属性事件从 ItemType A 和 ItemType B 依次触发
```


## 三、Validate 事件（验证）
<p>在<strong>数据写入 Item 之前</strong>、数据送入 Single Store <strong>之前</strong>执行。用于验证值的合法性。</p>

### 3.1 返回值结构

```javascript
// Validate 事件处理器必须返回以下结构：
{
  valid: Boolean,             // 是否合法（必填）
  value: Any,                 // 转换后的值（可选，用于格式化/转换）
  validationMessage: String   // 错误提示信息（可选）
}
```


### 3.2 实战示例

```javascript
// 示例1：零件号格式验证
function validatePartNumber(eventArgs) {
  const value = eventArgs.value;
  const pattern = /^P-\d{3}-\w+$/;

  if (!pattern.test(value)) {
    return {
      valid: false,
      validationMessage: '零件号格式必须为 P-###-XXXX（如 P-001-Bolt）'
    };
  }
  return { valid: true };
}

// 示例2：值格式转换（自动转大写）
function validateUpperCase(eventArgs) {
  return {
    valid: true,
    value: eventArgs.value.toUpperCase()  // 自动转为大写存入 Item
  };
}

// 示例3：日期范围验证
function validateDueDate(eventArgs) {
  const dueDate = new Date(eventArgs.value);
  const today = new Date();
  if (dueDate < today) {
    return {
      valid: false,
      validationMessage: '截止日期不能早于今天'
    };
  }
  return { valid: true };
}
```


### 3.3 不同 UI 控件的错误展示
<table>
<thead><tr><th>UI 控件</th><th>错误展示方式</th></tr></thead>
<tbody>
<tr><td>Form 表单字段</td><td>字段旁红色提示文字</td></tr>
<tr><td>Grid 单元格</td><td>单元格红色边框 + tooltip</td></tr>
<tr><td>自定义编辑器</td><td>自定义错误展示区域</td></tr>
</tbody>
</table>

## 四、Change 事件（变更）
<p>当属性值发生变化时触发。可以在事件中<strong>修改 Item 中的其他属性值</strong>，但不能操作 HTML 元素。</p>


```javascript
// 示例：材料变更时自动更新密度
function onMaterialChanged(eventArgs) {
  const material = eventArgs.value;
  const densityMap = {
    'Steel': '7.85',
    'Aluminum': '2.70',
    'Copper': '8.96',
    'Titanium': '4.51'
  };

  const density = densityMap[material] || '0';
  // 通过 Item 对象设置其他属性值
  eventArgs.item.setProperty('density', density);
  eventArgs.item.setProperty('material_updated_on', new Date().toISOString());
}

// 示例：数量变更时重新计算总价
function onQuantityChanged(eventArgs) {
  const qty = parseFloat(eventArgs.value) || 0;
  const unitPrice = parseFloat(
    eventArgs.item.getProperty('unit_price', '0')
  );
  const total = (qty * unitPrice).toFixed(2);
  eventArgs.item.setProperty('total_price', total);
}
```


## 五、事件生命周期

```text
数据改变
  │
  ▼
┌──────────────────┐
│  Validate 事件    │  ← 验证 + 格式转换
│  (数据写入前)     │
└──────┬───────────┘
       │ valid === false? → 阻止更新，显示错误
       │ valid === true
       ▼
┌──────────────────┐
│  写入 Item 属性   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Change 事件      │  ← 级联更新其他属性
│  (数据写入后)     │
└──────────────────┘
```


## 六、最佳实践
<ul>
<li><strong>验证逻辑集中在 Validate 事件</strong>中，不要在 Change 事件中做验证</li>
<li><strong>不要在事件中操作 DOM</strong>——事件可能在 Form、Grid 或任何地方执行</li>
<li><strong>Change 事件中只做数据联动</strong>，避免复杂的异步操作</li>
<li><strong>使用 value 返回值转换格式</strong>而不是在 Change 事件中二次处理</li>
</ul>

<hr />
<p><em>适用版本：Aras Innovator 11.0+ / 14.x / 2025R。Poly ItemType 从 12.0 开始引入。</em></p>
