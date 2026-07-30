---
title: 功能说明
---

<h1>工时管理系统 — 功能说明</h1>
<p>
本文档面向<strong>业务用户</strong>，说明 Kong_A_Hours 工时管理系统的操作流程与使用方法。
系统嵌入 Aras Innovator 平台，覆盖<strong>工时填报 → 审核 → 统计报表 → 导出</strong>完整业务闭环。
</p>
<blockquote>
<p><strong>角色说明</strong>：普通员工使用「工时填报」「填报记录」「年度报表」三个页面；
项目经理/管理员额外拥有「管理中心」下的「工时审核」和「个人项目报表」；
<strong>财务人员</strong>使用「工时明细查询」页面按年月检索明细并导出 Excel 用于成本核算与分析。</p>
</blockquote>
<h2>一、业务流程总览</h2>
<p>工时管理遵循以下工作流：</p>

```text
{{ workflow }}
```

    <ol>
      <li><strong>填报</strong>：员工在「工时填报」页面选择当前周，为每个参与项目填写每日工时（0~9 小时），点击提交</li>
      <li><strong>审核</strong>：项目经理在「管理中心 → 工时审核」页面查看待审核记录，逐条或批量通过/驳回</li>
      <li><strong>修改</strong>：被驳回的工时可在「工时填报」页面修改后重新提交</li>
      <li><strong>统计</strong>：通过「年度报表」和「个人项目报表」查看工时汇总与分布</li>
      <li><strong>导出</strong>：财务人员在「工时明细查询」页面按年月 + 项目检索明细，一键导出 Excel 做成本分析</li>
    </ol>
    <h2>二、状态流转说明</h2>
    <table>
      <thead><tr><th>状态</th><th>含义</th><th>可执行操作</th></tr></thead>
      <tbody>
        <tr><td><span class="status-dot" style="background:#9ca3af"></span> 空状态</td><td>项目已列出，尚未填报</td><td>填写工时 → 提交</td></tr>
        <tr><td><span class="status-dot" style="background:#f59e0b"></span> Start（待审核）</td><td>已提交，等待审核</td><td>等待审核 / 管理员审核</td></tr>
        <tr><td><span class="status-dot" style="background:#10b981"></span> pass（已通过）</td><td>审核通过</td><td>只读，不可修改</td></tr>
        <tr><td><span class="status-dot" style="background:#ef4444"></span> reject（已驳回）</td><td>审核未通过</td><td>修改工时 → 重新提交</td></tr>
      </tbody>
    </table>
    <h2>三、工时填报（DataView）</h2>
    <p>这是系统的<strong>核心操作页面</strong>。员工在此页面为当前周的每个参与项目填写每日工时。</p>
    <img :src="'/pm-images/hours-dataview.png'" alt="工时填报页面" class="doc-screenshot" />
    <h4>操作步骤</h4>
    <ol>
      <li>页面顶部通过<strong>周导航器</strong>切换填报周（默认显示当前周）</li>
      <li>系统自动加载当前用户参与的所有活跃项目列表</li>
      <li>在每行的<strong>周一~周日输入框</strong>中填写当日工时（0~9 小时，支持 0.5 步进）</li>
      <li>点击行尾的<strong>「提交」按钮</strong>保存该项目的工时</li>
      <li>提交后状态变为 <code>Start（待审核）</code>，输入框变为只读</li>
      <li>若被驳回（<code>reject</code>），输入框重新可编辑，修改后点击<strong>「修改」按钮</strong>重新提交</li>
    </ol>
    <h4>注意事项</h4>
    <ul>
      <li>每个项目每周只能提交一次，重复提交会被后端拦截</li>
      <li>已通过（<code>pass</code>）的工时不可修改</li>
      <li>修改已提交的工时会自动将状态重置为 <code>Start（待审核）</code></li>
    </ul>
    <h2>四、填报记录（FillRecord）</h2>
    <p>查看当前用户的历史填报记录，支持<strong>分页浏览</strong>和<strong>列筛选</strong>。</p>
    <img :src="'/pm-images/hours-fillrecord.png'" alt="填报记录页面" class="doc-screenshot" />
    <h4>功能说明</h4>
    <ul>
      <li>通过周导航器切换查看不同周的填报记录</li>
      <li>表格显示：项目编号、项目名称、项目经理、每日工时、合计、审核状态</li>
      <li>支持按<strong>项目名称</strong>和<strong>项目编号</strong>进行列筛选</li>
      <li>状态标签颜色区分：灰色=未填报、黄色=待审核、绿色=已通过、红色=已驳回</li>
    </ul>
    <h2>五、年度报表（TimeReport）</h2>
    <p>以<strong>柱状图 + 饼图</strong>展示年度工时统计数据，直观了解工时分布趋势。</p>
    <img :src="'/pm-images/hours-timereport.png'" alt="年度报表页面" class="doc-screenshot" />
    <h4>报表内容</h4>
    <ul>
      <li><strong>统计卡片</strong>：年度总工时、参与项目数、月均工时、峰值月份</li>
      <li><strong>柱状图</strong>：1~12 月每月工时汇总，快速识别工时高峰</li>
      <li><strong>饼图</strong>：按项目维度展示工时占比分布</li>
      <li>支持切换年份查看历史数据</li>
    </ul>
    <h2>六、工时审核（TimeReview）— 管理员</h2>
    <p>项目经理/管理员在此页面审核团队成员提交的工时记录。</p>
    <img :src="'/pm-images/hours-timereview.png'" alt="工时审核页面" class="doc-screenshot" />
    <h4>操作步骤</h4>
    <ol>
      <li>通过周导航器选择要审核的周</li>
      <li>表格显示所有待审核的工时记录（含填报人、项目、每日工时）</li>
      <li><strong>单笔审核</strong>：点击行尾的「通过」或「驳回」按钮</li>
      <li><strong>批量审核</strong>：勾选多条记录，点击顶部的「批量通过」或「批量驳回」按钮</li>
      <li>审核通过后状态变为 <code>pass</code>，数据锁定不可修改</li>
      <li>驳回后状态变为 <code>reject</code>，员工可修改后重新提交</li>
    </ol>
    <h4>注意事项</h4>
    <ul>
      <li>只有 <code>Start（待审核）</code> 状态的记录才能执行审核操作</li>
      <li>已通过或已驳回的记录不会出现在待审核列表中</li>
    </ul>
    <h2>七、个人项目报表（PersonalReport）— 管理员</h2>
    <p>管理员查看个人维度的项目工时汇总报表。</p>
    <img :src="'/pm-images/hours-personalreport.png'" alt="个人项目报表页面" class="doc-screenshot" />
    <h4>报表内容</h4>
    <ul>
      <li><strong>摘要卡片</strong>：进行中项目数、本月工时、最高工时项目、总项目数</li>
      <li><strong>项目表格</strong>：每个项目的总工时、已审核工时、未审核工时</li>
      <li><strong>柱状图</strong>：按项目对比工时分布</li>
    </ul>
    <h2>八、工时明细查询（HoursDetail）— 财务分析</h2>
    <p>
      该页面面向<strong>财务部门</strong>，支持按<strong>任意年月 + 项目</strong>查询所有人员的工时明细数据。
      与年度报表（汇总统计）不同，此处展示的是<strong>逐条明细记录</strong>，方便财务人员掌握精确的工时数据分布。
    </p>
    <img :src="'/pm-images/hours-detailquery.png'" alt="工时明细查询页面" class="doc-screenshot" />
    <h4>业务场景</h4>
    <ul>
      <li>财务部门每月需要按项目维度核算人工成本</li>
      <li>核对某个月份哪些人员为哪些项目填报了工时</li>
      <li>导出 Excel 后通过筛选功能按人员/日期/项目快速分析</li>
    </ul>
    <h4>功能说明</h4>
    <ul>
      <li>顶部通过<strong>年月选择器 + 项目下拉框</strong>筛选查询条件</li>
      <li>表格列：填报人、日期、工时（小时）、所属项目、审核状态</li>
      <li>每行状态着色：已通过（绿）、待审核（黄）、已驳回（红）</li>
      <li>顶部摘要卡片显示：当月总工时、涉及人数、条目数</li>
      <li><strong>导出 Excel</strong>：点击导出按钮，将当前查询结果一键导出为 <code>.xlsx</code> 文件</li>
    </ul>
    <h4>导出 Excel</h4>
    <p>
      系统所有数据表格页面（填报记录、工时审核、年度报表、工时明细）均支持导出 Excel。
      使用 <code>xlsx</code>（SheetJS）库在前端直接生成文件并触发下载，<strong>无需后端接口</strong>，导出即所得。
      文件名自动含日期（如 <code>工时明细_2025-08.xlsx</code>），列宽自适应中文内容。
    </p>
    <img :src="'/pm-images/hours-export-success.png'" alt="导出Excel成功提示" class="doc-screenshot" />
    <h2>九、常见问题</h2>
    <table>
      <thead><tr><th>问题</th><th>解决方案</th></tr></thead>
      <tbody>
        <tr><td>看不到某个项目</td><td>项目需在 Aras 中将您加入项目团队（PROJECT_TEAM）或分配为 Activity2 负责人</td></tr>
        <tr><td>无法提交工时</td><td>检查该项目当周是否已提交过（不允许重复提交）</td></tr>
        <tr><td>无法修改工时</td><td>已通过（pass）的工时不可修改，需联系管理员</td></tr>
        <tr><td>修改后状态变了</td><td>修改已提交的工时会自动重置为「待审核」状态，需管理员重新审核</td></tr>
        <tr><td>报表数据为空</td><td>确认所选时间范围内有已提交的工时记录</td></tr>
      </tbody>
    </table>
