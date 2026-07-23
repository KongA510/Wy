<template>
  <article class="doc-content">
    <h1>项目计划模板 — 添加自定义列（以 cn_state 项目阶段为例）</h1>
    <p>
      在 Aras Innovator 的项目计划（Project Plan）甘特图网格中，默认只显示系统内置列（N、Project Tree、Predecessor、Duration 等）。
      若需在网格中<strong>新增自定义属性列</strong>（如 <code>cn_state</code> 项目阶段），需按特定顺序修改 <strong>6 个文件</strong>，
      其中前 3 个文件具有<strong>多语系版本</strong>，每个语系都需同步调整。
    </p>

    <blockquote>
      <p><strong>前提条件</strong>：目标属性（如 <code>cn_state</code>）已在 <code>Activity2</code> ItemType 上创建完毕，
      且若为 List 类型属性，对应的 List 值已在 Aras 中配置好。</p>
    </blockquote>

    <h2>修改顺序总览</h2>
    <table>
      <thead>
        <tr><th>顺序</th><th>文件</th><th>类型</th><th>多语系</th><th>作用</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td><code>projectGridLayoutXML</code></td><td>Preference XML</td><td>✅ 是</td><td>定义列的 position / width / label</td></tr>
        <tr><td>2</td><td><code>query.xml</code></td><td>Preference XML</td><td>✅ 是</td><td>编辑模式 AML 查询 — select 中加入新属性</td></tr>
        <tr><td>3</td><td><code>queryTemplate.xml</code></td><td>Preference XML</td><td>✅ 是</td><td>模板模式 AML 查询 — select 中加入新属性</td></tr>
        <tr><td>4</td><td><code>template.xsl</code></td><td>XSL 样式表</td><td>❌ 否</td><td>编辑模式网格渲染 — thead / list / columns / td</td></tr>
        <tr><td>5</td><td><code>wbs_branch.xsl</code></td><td>XSL 样式表</td><td>❌ 否</td><td>只读模式网格渲染 — WBS 和 Activity 的 td</td></tr>
        <tr><td>6</td><td><code>Project_CloneProjectOrTemplate</code></td><td>C# 系统方法</td><td>❌ 否</td><td>克隆/复制项目时携带新属性值</td></tr>
      </tbody>
    </table>

    <h2>⚠️ List 类型列的 edit 属性与 list id 对应规则</h2>
    <p>
      当新增列为 <strong>List 下拉选择</strong>类型时，<code>template.xsl</code> 中 <code>&lt;column&gt;</code> 的
      <code>edit="COMBO:N"</code> 中的 <strong>N 必须与 <code>&lt;list id="N"&gt;</code> 的 id 严格对应</strong>。
    </p>
    <p>例如本例中：</p>
    <pre><code class="language-xml">&lt;!-- list 定义：id="2" 对应 cn_state --&gt;
&lt;list id="2" name="cn_state"&gt;
    &lt;!-- 值由 Aras List 自动填充 --&gt;
&lt;/list&gt;

&lt;!-- column 定义：edit="COMBO:2" 中的 2 必须与上面 list id 一致 --&gt;
&lt;column width="50" edit="COMBO:2" order="14" align="center" name="cn_state"/&gt;</code></pre>
    <p>
      系统中已有的 list id 分配：<code>id="0"</code> → Project Role，<code>id="1"</code> → Deliverable，
      <code>id="2"</code> → cn_state。<strong>新增 list 时 id 必须递增且不与已有冲突。</strong>
    </p>

    <h2>第 1 步：projectGridLayoutXML（多语系）</h2>
    <p>
      该 Preference 控制项目计划网格中<strong>每列的位置、宽度和标签</strong>。
      在 <code>&lt;Relationships&gt;</code> 末尾追加新的 <code>PM_ProjectGridLayout</code> 关系项。
      <strong>position 值必须大于已有最大 position</strong>，避免列顺序错乱。
    </p>
    <p>⚠️ <strong>多语系注意</strong>：该 Preference 在 Aras 中存在 English / Chinese 等多个语系版本，
    每个语系的 <code>label</code> 可不同（如英文 "Project Phase"、中文 "项目阶段"），
    但 <code>name</code>、<code>position</code>、<code>width</code> 必须保持一致。</p>
    <pre><code class="language-xml">&lt;!--Kong.A add项目阶段--&gt;
&lt;Item type="PM_ProjectGridLayout"&gt;
    &lt;is_system&gt;1&lt;/is_system&gt;
    &lt;label&gt;项目阶段&lt;/label&gt;
    &lt;name&gt;cn_state&lt;/name&gt;
    &lt;position&gt;14&lt;/position&gt;
    &lt;width&gt;80&lt;/width&gt;
&lt;/Item&gt;</code></pre>

    <h2>第 2 步：query.xml（多语系）</h2>
    <p>
      该 Preference 定义<strong>编辑模式</strong>下加载项目树时的 AML 查询。
      需在 <code>Activity2</code> 的 <code>select</code> 属性中加入新字段名，否则编辑时该列无数据。
    </p>
    <p>⚠️ <strong>多语系注意</strong>：query.xml 同样存在多语系版本，每个语系都需在 select 中加入新字段。</p>
    <pre><code class="language-xml">&lt;Item type="Activity2" select="is_milestone,date_start_sched,date_due_sched,
  expected_duration,work_est,name,percent_compl,rollup_percent_compl,
  rollup_work_est,rollup_date_start_act,prev_item,deliv_type,deliv_required,
  locked_by_id,status,is_required,state,date_es,date_ef,date_ls,date_lf,
  date_due_act,date_start_act,date_activated,date_due_original,is_critical,
  lead_role,managed_by_id,date_start_target,date_due_target,
  bcs_is_deliverable_released,description,date_user_estimate,signoff_required,
  timeout_duration,reminder_interval,reminder_count,
  cn_state"&gt;   &lt;!-- ← Kong.A: 末尾追加 cn_state --&gt;
  &lt;Relationships&gt;
    &lt;Item type="Activity2 Assignment" select="related_id(keyed_name,name,description,is_alias),role,state"/&gt;
    &lt;Item type="Predecessor" select="related_id,precedence_type,lead_lag" related_expand="0"/&gt;
    &lt;Item type="Activity2 Deliverable" select="related_id(keyed_name,itemtype)"/&gt;
  &lt;/Relationships&gt;
&lt;/Item&gt;</code></pre>

    <h2>第 3 步：queryTemplate.xml（多语系）</h2>
    <p>
      该 Preference 定义<strong>模板模式</strong>（从模板创建项目时）的 AML 查询。
      同样需在 <code>Activity2</code> 的 <code>select</code> 中加入新字段。
    </p>
    <p>⚠️ <strong>多语系注意</strong>：同 query.xml，每个语系版本都需修改。</p>
    <pre><code class="language-xml">&lt;Item type="Activity2" select="cn_state,is_milestone,expected_duration,work_est,
  name,deliv_required,deliv_type,is_required,prev_item,locked_by_id,
  managed_by_id,lead_role,bcs_is_deliverable_released,
  timeout_duration,reminder_interval,reminder_count"&gt;
  &lt;!-- cn_state 放在 select 最前面 --&gt;
  &lt;Relationships&gt;
    &lt;Item type="Predecessor" select="related_id,precedence_type,lead_lag" related_expand="0"/&gt;
    &lt;Item type="Activity2 Assignment" select="related_id(keyed_name,name,description,is_alias),role,state"/&gt;
    &lt;Item type="Activity2 Deliverable" select="related_id(keyed_name,itemtype)"/&gt;
  &lt;/Relationships&gt;
&lt;/Item&gt;</code></pre>

    <h2>第 4 步：template.xsl（编辑模式渲染）</h2>
    <p>
      该 XSL 控制<strong>编辑模式</strong>下网格的 HTML 渲染。需修改 <strong>4 处</strong>：
    </p>

    <h3>4.1 &lt;thead&gt; — 添加列头</h3>
    <pre><code class="language-xml">&lt;thead&gt;
  &lt;th align="center"&gt;tree_node&lt;/th&gt;
  &lt;th align="center"&gt;n&lt;/th&gt;
  &lt;!-- ... 其他系统列 ... --&gt;
  &lt;th align="center"&gt;attach&lt;/th&gt;
  &lt;th align="center"&gt;cn_state&lt;/th&gt;   &lt;!-- ← Kong.A 新增 --&gt;
&lt;/thead&gt;</code></pre>

    <h3>4.2 &lt;list&gt; — 注册 List 下拉数据源</h3>
    <p>
      若新列为 List 下拉类型，需在 <code>&lt;columns&gt;</code> 之前声明 <code>&lt;list&gt;</code>。
      <strong>id 值必须唯一且递增</strong>，后续 <code>&lt;column edit="COMBO:N"&gt;</code> 中的 N 引用此 id。
    </p>
    <pre><code class="language-xml">&lt;list id="0" name="Project Role"&gt;
  &lt;!-- role values --&gt;
&lt;/list&gt;
&lt;list id="1" name="Deliverable"&gt;
  &lt;!-- deliv_type values --&gt;
&lt;/list&gt;
&lt;!-- Add Kong.A添加项目阶段 --&gt;
&lt;list id="2" name="cn_state"&gt;
  &lt;!-- 值由 Aras List 自动填充 --&gt;
&lt;/list&gt;</code></pre>

    <h3>4.3 &lt;columns&gt; — 添加列定义</h3>
    <p>
      <code>edit="COMBO:2"</code> 中的 <strong>2</strong> 对应上方 <code>&lt;list id="2"&gt;</code>。
      若为普通文本列则不需要 edit 属性；若为布尔列则 <code>edit="boolean"</code>。
    </p>
    <pre><code class="language-xml">&lt;columns&gt;
  &lt;!-- ... 其他列 ... --&gt;
  &lt;column width="50" order="10" align="center" name="attach"/&gt;
  &lt;!-- Add Kong.A添加项目阶段 --&gt;
  &lt;column width="50" edit="COMBO:2" order="14" align="center" name="cn_state"/&gt;
&lt;/columns&gt;</code></pre>

    <h3>4.4 getACT 模板 — Activity2 行数据单元格</h3>
    <p>
      在 <code>mode="getACT"</code> 模板的 <code>&lt;tr&gt;</code> 末尾（Attach 列之后）添加 <code>&lt;td&gt;</code>：
    </p>
    <pre><code class="language-xml">&lt;!-- Add Kong.A添加项目阶段 --&gt;
&lt;td name="cn_state"&gt;
  &lt;xsl:value-of select="cn_state"/&gt;
&lt;/td&gt;</code></pre>
    <p>
      注意：<code>mode="getWBS"</code> 模板中 WBS Element 行<strong>不需要</strong>添加此 td，
      因为 <code>cn_state</code> 是 Activity2 的属性，WBS 节点没有该值。
      但 <code>template.xsl</code> 的 getWBS 模板中<strong>也不需要加空 td</strong>（与 wbs_branch.xsl 不同）。
    </p>

    <h2>第 5 步：wbs_branch.xsl（只读模式渲染）</h2>
    <p>
      该 XSL 控制<strong>只读/查看模式</strong>下网格的渲染。需修改 <strong>2 处</strong>：
    </p>

    <h3>5.1 getWBS 模板 — WBS Element 行添加空 td</h3>
    <p>
      只读模式中 WBS 行和 Activity 行<strong>共用同一组列</strong>，因此 WBS 行必须添加<strong>空的</strong>
      <code>&lt;td name="cn_state"/&gt;</code> 占位，否则列会错位。
    </p>
    <pre><code class="language-xml">&lt;!-- 在 getWBS 模板的 Attach td 之后 --&gt;
&lt;td name="Attach"&gt;
  &lt;!-- ... attach 逻辑 ... --&gt;
&lt;/td&gt;
&lt;!-- Add Kong.A添加项目阶段 --&gt;
&lt;td name="cn_state"/&gt;   &lt;!-- WBS 行无此属性，留空占位 --&gt;</code></pre>

    <h3>5.2 getACT 模板 — Activity2 行数据单元格</h3>
    <pre><code class="language-xml">&lt;!-- 在 getACT 模板的 Attach td 之后 --&gt;
&lt;td name="Attach"&gt;
  &lt;!-- ... attach 逻辑 ... --&gt;
&lt;/td&gt;
&lt;!-- Add Kong.A添加项目阶段 --&gt;
&lt;td name="cn_state"&gt;
  &lt;xsl:value-of select="cn_state"/&gt;
&lt;/td&gt;</code></pre>

    <h2>第 6 步：Project_CloneProjectOrTemplate（C# 系统方法）</h2>
    <p>
      该服务器方法负责<strong>克隆/复制项目或模板</strong>时逐节点重建 WBS 和 Activity2。
      若不在此处添加新属性的拷贝逻辑，克隆后的项目将<strong>丢失</strong>该字段值。需修改 <strong>2 处</strong>：
    </p>

    <h3>6.1 Activity2 克隆 — setProperty 拷贝值</h3>
    <p>
      在 <code>ProjectTreeActivity2Item</code> 构造函数中，<code>deliv_type</code> 赋值之后添加：
    </p>
    <pre><code class="language-csharp">this.item.setProperty("deliv_required", source.getProperty("deliv_required"));
this.item.setProperty("deliv_type", source.getProperty("deliv_type"));
//add Kong.A待入数据调整
this.item.setProperty("cn_state", source.getProperty("cn_state"));
//end----</code></pre>

    <h3>6.2 WBS 查询 AML 模板 — select 加入新属性</h3>
    <p>
      在 <code>ProjectTreeWbsItem</code> 类的 <code>GET_EXIST_WBS_AML_TEMPLATE</code> 常量中，
      <code>Activity2</code> 的 <code>select</code> 属性末尾追加新字段，确保克隆时能<strong>查询到</strong>该值：
    </p>
    <pre><code class="language-csharp">//Kong.A  增加查询条件，让其可以正确被赋值
private const string GET_EXIST_WBS_AML_TEMPLATE = "&lt;AML&gt;" +
  "&lt;Item type=\"WBS Element\" select=\"name,wbs_index,is_top,keyed_name,prev_item,deliv_required,deliv_type,wbs_index\" action=\"GetItemRepeatConfig\"&gt;" +
  // ... Sub WBS 部分省略 ...
  "&lt;Item type=\"Activity2\" select=\"name,is_milestone,date_start_act,date_due_act," +
  "expected_duration,is_required,deliv_required,deliv_type,keyed_name," +
  "work_earned,work_est,prev_item,lead_role,cn_state\"&gt;" +
  //                                          ^^^^^^^^ Kong.A 新增
  // ... Relationships 部分省略 ...
  "&lt;/Item&gt;&lt;/AML&gt;";</code></pre>

    <h2>修改检查清单</h2>
    <table>
      <thead>
        <tr><th>检查项</th><th>文件</th><th>状态</th></tr>
      </thead>
      <tbody>
        <tr><td>GridLayout position/width/label</td><td>projectGridLayoutXML（所有语系）</td><td>☐</td></tr>
        <tr><td>编辑模式 select 加入新字段</td><td>query.xml（所有语系）</td><td>☐</td></tr>
        <tr><td>模板模式 select 加入新字段</td><td>queryTemplate.xml（所有语系）</td><td>☐</td></tr>
        <tr><td>thead 列头</td><td>template.xsl</td><td>☐</td></tr>
        <tr><td>list 定义（若为 List 类型）</td><td>template.xsl</td><td>☐</td></tr>
        <tr><td>column 定义 + edit="COMBO:N"</td><td>template.xsl</td><td>☐</td></tr>
        <tr><td>getACT td 数据单元格</td><td>template.xsl</td><td>☐</td></tr>
        <tr><td>getWBS 空 td 占位</td><td>wbs_branch.xsl</td><td>☐</td></tr>
        <tr><td>getACT td 数据单元格</td><td>wbs_branch.xsl</td><td>☐</td></tr>
        <tr><td>Activity2 克隆 setProperty</td><td>Project_CloneProjectOrTemplate</td><td>☐</td></tr>
        <tr><td>WBS AML select 加入新字段</td><td>Project_CloneProjectOrTemplate</td><td>☐</td></tr>
      </tbody>
    </table>

    <h2>效果图</h2>
    <p>修改完成后，项目计划网格中将显示新增的「项目阶段」列，支持下拉选择：</p>
    <img src="/pm-images/add-column-effect.png" alt="项目计划添加列效果图" style="max-width:100%;border:1px solid #e5e7eb;border-radius:8px;margin:16px 0;" />

    <h2>常见问题</h2>
    <h3>Q: 为什么修改后列不显示？</h3>
    <p>
      检查以下几点：① projectGridLayoutXML 的 position 是否与已有列冲突；
      ② query.xml / queryTemplate.xml 的 select 是否遗漏新字段；
      ③ template.xsl 的 thead 列数与 columns 定义数是否一致；
      ④ 浏览器缓存 — 清除缓存后重试。
    </p>
    <h3>Q: List 下拉为空？</h3>
    <p>
      确认 <code>&lt;list id="N" name="xxx"&gt;</code> 的 <code>name</code> 与 Aras 中 List 的 name 完全一致，
      且 <code>&lt;column edit="COMBO:N"&gt;</code> 的 N 与 list id 匹配。
    </p>
    <h3>Q: 克隆项目后新列值为空？</h3>
    <p>
      检查 <code>Project_CloneProjectOrTemplate</code> 中是否同时完成了 setProperty 拷贝和 AML select 查询两处修改。
    </p>
  </article>
</template>

<script setup lang="ts">
// 项目计划模板 - 添加列 笔记组件
</script>
