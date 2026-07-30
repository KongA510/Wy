---
title: 仪表板概述
---

# 仪表板概述
<blockquote>
<p>Aras 仪表板（Dashboards）是一种<strong>特殊的 CUI Layout</strong>，基于 <code>cui_Dashboard</code> ItemType 渲染多个 <strong>Widget</strong>。每个 Widget 是自定义的 CUI Layout，通过 Dashboard Widget 关系确定类型和动态属性。</p>
</blockquote>

## 一、仪表板架构

```text
仪表板 (Dashboard)
  ├── Widget 1 (Grid Widget)
  │     ├── CUI Layout: DashboardGridCuiLayout
  │     ├── 渲染: Grid + Pagination
  │     └── widget_data: { item_type_id, page_size, max_results }
  ├── Widget 2 (TreeGrid Widget)
  │     ├── CUI Layout: DashboardTreeGridCuiLayout
  │     ├── 渲染: TreeGrid + Toolbar
  │     └── widget_data: { item_type_id, item_id }
  └── Widget 3 (Report Widget)
        ├── CUI Layout: DashboardReportCuiLayout
        ├── 渲染: 自定义内容
        └── widget_data: { item_id, report_config }
```


## 二、核心 ItemType
<table>
<thead><tr><th>ItemType</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>cui_Dashboard</code></td><td>仪表板主体</td></tr>
<tr><td><code>Dashboard Widget</code></td><td>仪表板中的 Widget，关联到具体的 Widget Template</td></tr>
<tr><td><code>Dashboard Widget Template</code></td><td>Widget 模板，定义了 widget_data 的属性列表</td></tr>
<tr><td><code>Dashboard Widget Type</code></td><td>Innovator List 项，定义客户端代码可处理的 widget 类型集合</td></tr>
</tbody>
</table>

## 三、widget_data 属性
<p>每个 Widget 的核心数据，作为 CUI Layout 的 state：</p>

```javascript
// Grid Widget 的 widget_data 示例
{
  "item_type_id": "4F1AC04A2B484F3ABA4E20DB63808A88",
  "page_size": "20",
  "max_results": "100"
}
```


<p>widget_data 的工作机制：</p>
<ul>
<li>存储在 Dashboard Widget 的 <code>widget_data</code> 属性中</li>
<li>集成到 WidgetLayout 的 <code>state</code> 中</li>
<li>任何数据修改（如通过 Widget 设置对话框）会触发 Widget 的<strong>重新渲染</strong>（不重建）</li>
<li>但如果 <code>item_type_id</code> 或 <code>item_id</code> 改变，Widget 会被<strong>销毁并重建</strong></li>
</ul>

## 四、Widget 生命周期

```text
Widget 初始化（第一次）
  → WidgetLayout 创建
  → widget_data 解析
  → item_type_id → itemTypeName
  → item_id → itemId
  → 传入 CUI Layout（作为 options）
  → CUI Layout 加载元数据和布局数据
  → 渲染控件到 DOM

Widget 更新（widget_data 属性变化）
  → 检查 item_type_id / item_id 是否改变？
  ├─ 未改变 → state 更新 → layout.updateLayout() 触发 → 重新渲染
  └─ 已改变 → Widget 销毁 → 重新初始化 WidgetLayout → 全新控件实例
```


## 五、代码位置
<table>
<thead><tr><th>文件/目录</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>Modules/dashboard/</code></td><td>仪表板主目录</td></tr>
<tr><td><code>dashboardWidgetLayouts.ts</code></td><td>Widget 类型到 CUI Layout 的映射表</td></tr>
<tr><td><code>DashboardGridCuiLayout.ts</code></td><td>Grid Widget 的 CUI Layout 实现</td></tr>
<tr><td><code>DashboardTreeGridCuiLayout.ts</code></td><td>TreeGrid Widget 的 CUI Layout 实现</td></tr>
<tr><td><code>WidgetLayout.ts</code></td><td>所有 Widget 的基类</td></tr>
</tbody>
</table>

<hr />
<p><em>适用版本：Aras Innovator 14.x / 2025R。仪表板功能从 14.0 开始引入。</em></p>
