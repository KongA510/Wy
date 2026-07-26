<template>
  <article class="doc-content">
    <h1>上下文共享机制</h1>
    <blockquote>
      <p>同一仪表板中的 Widget 可以<strong>相互共享数据</strong>。每个 Widget Type 能够共享一个属性列表，通过 <strong>Widget Template Shared Props</strong> 关系定义。</p>
    </blockquote>

    <h2>一、核心概念</h2>
    <p>上下文共享允许一个 Widget（数据源）的属性值自动流向另一个 Widget（订阅者）。从 Widget 实现的角度看，Widget 不直接与其他 Widget 交互，也"不知道"属性的来源——它只是接收到一个被动态替换过的属性值。</p>

    <h2>二、启用上下文共享</h2>
    <p>需要在 Dashboard Widget 中指定<strong>可使用的共享属性</strong>。这些信息存储在 <code>shared_data</code> 属性中。</p>

    <h3>shared_data 格式</h3>
    <pre v-pre><code class="language-json">{
  "item_id": {
    "from": "6FD354BB8E674767A0C5B6CC44E323E5",
    "prop": "item_type_id"
  },
  "other_prop": {
    "from": "OTHER_WIDGET_ID",
    "prop": "some_shared_prop"
  }
}</code></pre>

    <table>
      <thead><tr><th>键</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>对象 key（如 <code>item_id</code>）</td><td>当前 Widget 的 <strong>Dashboard Widget Template Prop</strong> 名称（要替换的属性）</td></tr>
        <tr><td><code>from</code></td><td>数据源 Widget 的 ID（或 <code>*</code> 表示任意 Widget）</td></tr>
        <tr><td><code>prop</code></td><td>数据源 Widget 的 <strong>Widget Template Shared Props</strong> 属性名称</td></tr>
      </tbody>
    </table>

    <h2>三、工作原理</h2>
    <pre v-pre><code class="language-text">仪表板初始化时的上下文共享流程：

┌────────────────────────────────────────────────┐
│  1. 收集所有 Widget 的 Widget Template Shared  │
│     Props 可用值                                │
│     → 汇总为仪表板级别的共享属性池              │
│                                                │
│  2. 遍历每个 Widget 的 shared_data 配置         │
│     → 将源 Widget 的 prop 值注入目标 Widget     │
│     → 替换目标 Widget 的 widget_data[key]       │
│                                                │
│  3. 源 Widget 的 prop 值变化时（setState）       │
│     → Dashboard 检测到变化                      │
│     → 自动更新所有订阅该 prop 的 Widget          │
│     → 目标 Widget 触发 updateLayout() 重新渲染  │
└────────────────────────────────────────────────┘</code></pre>

    <h2>四、具体示例</h2>

    <h3>场景：Grid Widget → Report Widget 联动</h3>

    <pre v-pre><code class="language-text">仪表板中有两个 Widget：

Widget A (Grid Widget, ID = "6FD354BB8E67...")
  - 用户点击行 → selected_row_id 变为 "P-001"

Widget B (Report Widget)
  - shared_data: { "item_id": { "from": "6FD354BB...", "prop": "selected_row_id" } }
  - 效果：Widget B 的 item_id 自动被替换为 "P-001"
  - Widget B 根据新的 item_id 重新加载报表数据</code></pre>

    <h3>AML 配置示例</h3>
    <pre v-pre><code class="language-xml">&lt;AML&gt;
  &lt;Item type="Dashboard Widget" action="add"&gt;
    &lt;name&gt;Report_Widget&lt;/name&gt;
    &lt;widget_data&gt;
      {"item_id": ""}
    &lt;/widget_data&gt;
    &lt;shared_data&gt;
      {
        "item_id": {
          "from": "6FD354BB8E674767A0C5B6CC44E323E5",
          "prop": "selected_row_id"
        }
      }
    &lt;/shared_data&gt;
  &lt;/Item&gt;
&lt;/AML&gt;</code></pre>

    <h2>五、预定义的共享值</h2>
    <p>TreeGrid 和 Report Widget 自带如下的默认 <code>shared_data</code>：</p>
    <pre v-pre><code class="language-javascript">{
  "item_id": {
    "from": "*",           // 任意 Widget 都行
    "prop": "selected_row_id"
  }
}</code></pre>
    <p>使用 <code>"from": "*"</code> 意味着 Widget 接受仪表板范围内<strong>任意 Widget</strong>共享的 <code>selected_row_id</code> 属性值。</p>

    <h2>六、代码实现提示</h2>
    <pre v-pre><code class="language-typescript">// 仪表板初始化时处理共享数据
class Dashboard {
  #sharedProperties: Map&lt;string, any&gt; = new Map();

  initWidgets(widgets: DashboardWidget[]) {
    // 1. 收集所有可共享的属性
    for (const widget of widgets) {
      const sharedProps = widget.getSharedProps();
      for (const [propName, value] of Object.entries(sharedProps)) {
        this.#sharedProperties.set(
          `${widget.id}:${propName}`, value
        );
      }
    }

    // 2. 处理每个 Widget 的 shared_data
    for (const widget of widgets) {
      const sharedData = JSON.parse(widget.shared_data || '{}');
      for (const [targetProp, config] of Object.entries(sharedData)) {
        const sourceKey = config.from;
        const sourceProp = config.prop;

        // 查找源属性值
        const value = sourceKey === '*'
          ? this.#findAny(sourceProp)
          : this.#sharedProperties.get(`${sourceKey}:${sourceProp}`);

        if (value !== undefined) {
          widget.widget_data[targetProp] = value;
        }
      }
    }
  }
}</code></pre>

    <h2>七、关键限制</h2>
    <ul>
      <li>Widget <strong>只能共享其 WidgetLayout state 中的属性</strong></li>
      <li>要添加新的可共享属性，需要<strong>修改 Widget 的实现代码</strong>（在 WidgetLayout 子类中添加对应的 state 字段）</li>
      <li>通过 <code>Dashboard Widget Template Shared Props</code> 关系将属性标记为"可共享"</li>
      <li>属性变化通过 <code>setState</code> 触发，Dashboard 自动检测并传播</li>
    </ul>

    <hr />
    <p><em>适用版本：Aras Innovator 14.x / 2025R。上下文共享是仪表板的核心特性之一。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
