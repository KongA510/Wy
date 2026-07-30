---
title: 实现方式
---

# 工时管理系统 — 实现方式
<p>
本文档详细说明 <strong>Kong_A_Hours 工时管理系统</strong>的项目结构、架构设计与关键功能实现。
该系统基于 <code>Vue 3 + TypeScript + Element Plus + ECharts + Pinia</code> 构建，
以 IFRAME 方式嵌入 Aras Innovator，通过 <code>top.aras.newIOMInnovator().applyMethod()</code> 调用后端 C# Method，
实现工时填报、审核、统计报表等完整业务闭环。
</p>
<blockquote>
<p><strong>核心架构</strong>：Mock/Real 双模调度 + XML Body 构造器 + Wire↔View 双向映射 + 6 策略安全解析器，
将 Aras IOM 通信细节完全封装在 API 层，视图层仅面向 TypeScript 类型编程。</p>
</blockquote>
## 仓库链接
<p>本项目源码托管于 GitHub，可通过以下命令克隆到本地：</p>

```bash
git clone https://github.com/KongA510/Kong_A_Hours.git
```
<p>仓库主页：<a href="https://github.com/KongA510/Kong_A_Hours" target="_blank" rel="noopener">KongA510/Kong_A_Hours</a></p>
## 一、项目结构

```text
Kong_A_Hours/
├── src/
│   ├── api/
│   │   ├── client.ts          # 统一调用入口：Mock/Real 分流 + safeParseResult
│   │   ├── methods.ts         # Aras Method 名称常量注册表
│   │   ├── arasBody.ts        # XML Body 构造器（BUILDERS 表 + defaultBody）
│   │   └── modules/
│   │       ├── timesheet.ts   # 工时填报 API + Wire↔View 映射
│   │       ├── review.ts      # 审核 API + Wire↔View 映射
│   │       └── report.ts      # 报表 API + Wire↔View 映射
│   ├── views/
│   │   ├── DataView.vue       # 周工时填报（7 天输入网格，逐行提交/修改）
│   │   ├── FillRecord.vue     # 填报历史（分页 + 列筛选）
│   │   ├── TimeReport.vue     # 年度报表（ECharts 柱状图 + 饼图）
│   │   ├── ProjectDetail.vue  # 项目维度明细
│   │   ├── HoursDetail.vue    # 工时明细查询（按年月检索，支持导出Excel）
│   │   └── manage/
│   │       ├── TimeReview.vue      # 管理员审核（单笔/批量 通过/驳回）
│   │       ├── PersonalReport.vue  # 个人项目报表
│   │       └── ManageCenter.vue    # 管理中心路由出口
│   ├── components/
│   │   ├── common/  (PageHeader, StatCard, StatusTag, WeekNavigator)
│   │   └── layout/  (AppHeader, AppLayout)
│   ├── composables/ (useChart, useCountUp, useWeekNav)
│   ├── locales/     (zh-CN.ts, en-US.ts)
│   ├── mock/data.ts           # Mock 数据（开发/测试环境）
│   ├── store/app.ts           # Pinia 全局状态
│   ├── utils/       (exportExcel, status, week)
│   └── types/index.ts         # 全部 TypeScript 接口定义
├── .env.development           # VITE_USE_MOCK=true
├── .env.production            # VITE_USE_MOCK=false
└── vite.config.ts
```
## 二、架构设计
### 2.1 Mock/Real 双模调度（client.ts）
<p>系统通过环境变量 <code>VITE_USE_MOCK</code> 控制数据来源。开发/测试环境使用本地 Mock 数据，生产环境通过 Aras IOM 真实调用。业务层只面向 <code>callArasMethod(method, payload)</code> 统一接口，无需关心底层通信方式。</p>

```typescript
// api/client.ts — 统一调用入口
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export async function callArasMethod<T = unknown>(
  method: string,
  payload: Record<string, unknown> = {},
  options: { type?: 'json' | 'item' } = {},
): Promise<T> {
  const type = options.type ?? 'json'
  if (USE_MOCK) {
    await delay(160 + Math.random() * 280)
    return mockDispatch(method, payload) as T
  }
  return arasApplyMethod<T>(method, payload, type)
}

// 真实 Aras IOM 调用
function arasApplyMethod<T>(
  method: string,
  payload: Record<string, unknown>,
  type: string
): T {
  const inn = (top as any).aras.newIOMInnovator()
  const body = buildArasBody(method, payload)
  const result = inn.applyMethod(method, body)
  if (result.isError())
    throw new Error(result.getErrorString())
  const raw = result.getResult()
  return (type === 'item'
    ? result : safeParseResult(raw)) as T
}
```
### 2.2 安全解析器 safeParseResult（6 策略）
<p>Aras IOM 的 <code>getResult()</code> 返回值格式不确定（可能是纯 JSON、XML 包装、BOM 污染、简单字面量等），<code>safeParseResult</code> 依次尝试 6 种策略提取有效数据，确保前端不会因解析失败而崩溃。</p>

```typescript
function safeParseResult(raw: string): unknown {
  const s = raw
    .replace(/[\uFEFF\u200B\u200C\u200D\u00A0]/g, '')
    .trim()
  if (!s) return null
  // 策略 1: 直接 JSON.parse
  try { return JSON.parse(s) } catch { /* fallthrough */ }
  // 策略 2: 提取首个 JSON 对象/数组片段
  const braceStart = s.indexOf('{')
  const bracketStart = s.indexOf('[')
  let jsonStart = -1, endChar = ''
  if (braceStart >= 0 &&
      (bracketStart < 0 || braceStart < bracketStart)) {
    jsonStart = braceStart; endChar = '}'
  } else if (bracketStart >= 0) {
    jsonStart = bracketStart; endChar = ']'
  }
  if (jsonStart >= 0) {
    const jsonEnd = s.lastIndexOf(endChar)
    if (jsonEnd > jsonStart) {
      try {
        return JSON.parse(
          s.substring(jsonStart, jsonEnd + 1))
      } catch {}
    }
  }
  // 策略 3: 简单字面量
  if (s === 'true')  return true
  if (s === 'false') return false
  if (s === 'null')  return null
  // 策略 4: 数字开头
  const numMatch = s.match(/^-?\d+(?:\.\d+)?/)
  if (numMatch) {
    const n = Number(numMatch[0])
    if (Number.isFinite(n)) return n
  }
  // 策略 5: XML 开头 → 操作成功
  if (s.startsWith('<')) return { success: true }
  // 策略 6: 兜底
  return undefined
}
```
### 2.3 XML Body 构造器（arasBody.ts）
<p>每个 Aras Method 的入参需要序列化为结构化 XML 字符串。<code>BUILDERS</code> 表登记了每个方法的专用构造器，未登记的方法走 <code>defaultBody</code> 通用逻辑。<strong>关键设计</strong>：承载 JSON 的标签（如 <code>&lt;projectData&gt;</code>）内不做 XML 转义，与后端 <code>Newtonsoft.Json.JsonConvert.DeserializeObject</code> 直接反序列化保持一致。</p>

```typescript
// api/arasBody.ts — XML Body 构造器
const BUILDERS: Partial<Record<string, BodyBuilder>> = {
  [ARAS_METHODS.getProjectList]: (p) =>
    `<weekrangetext>${escapeXml(p.weekStart)}</weekrangetext>`,
  [ARAS_METHODS.saveProjectData]: (p) =>
    `<projectData>${JSON.stringify(p.row)}</projectData>` +
    `<weekrangetext>${escapeXml(p.weekStart)}</weekrangetext>`,
  [ARAS_METHODS.allReviewPassOrReject]: (p) =>
    `<HoursReviewList>${JSON.stringify(p.rows)}</HoursReviewList>` +
    `<methodtype>${escapeXml(p.methodtype)}</methodtype>`,
  [ARAS_METHODS.getReportData]: (p) =>
    `<year>${escapeXml(p.year)}</year>`,
}

export function buildArasBody(
  method: string,
  payload: Record<string, unknown>
): string {
  const builder = BUILDERS[method]
  return builder ? builder(payload) : defaultBody(payload)
}
```
### 2.4 方法注册表（methods.ts）
<p>所有后端 Method 名称集中管理，前端通过常量引用，避免硬编码字符串散落在各模块。</p>

```typescript
// api/methods.ts — Aras Method 注册表
export const ARAS_METHODS = {
  getProjectList:        'IC_getProjectList',
  saveProjectData:       'IC_saveProjectData',
  updateProjectData:     'IC_updateProjectData',
  getProjectHourData:    'getProjectHourData',
  getReportData:         'IC_getReportData',
  getHourReviewData:     'IC_getHourReviewData',
  reviewPassOrReject:    'IC_reviewPassOrReject',
  allReviewPassOrReject: 'IC_allReviewPassOrReject',
  getProjectDetailData:  'IC_getProjectDetailData',
  hoursDetails:          'IC_Hours_Details',
  checkProject:          'IC_checkProject',
  getHoursProjectReport: 'IC_getHoursProjectReport',
} as const
```
## 三、Wire↔View 双向映射
<p>后端 <code>HoursProject</code> 的星期字段为 <code>string</code> 类型（如 <code>"8"</code>），前端视图模型 <code>ProjectHourRow</code> 使用 <code>number[]</code>（7 个元素对应周一~周日）。每个 API 模块内置 <code>toView()</code> / <code>toWire()</code> 函数，在调用边界自动转换。</p>

```typescript
// api/modules/timesheet.ts — Wire↔View 映射
function toView(w: HoursProject): ProjectHourRow {
  return {
    hourId: w.id ?? null,
    projectId: w.project_id ?? '',
    name: w.project_name ?? '',
    nameEn: w.project_name ?? '',
    code: w.project_number ?? '',
    manager: w.project_manager ?? '',
    managerEn: w.project_manager ?? '',
    state: (w.state ?? '') as HourState,
    hours: [
      toNum(w.monday), toNum(w.tuesday),
      toNum(w.wednesday), toNum(w.thursday),
      toNum(w.friday), toNum(w.saturday),
      toNum(w.sunday),
    ],
  }
}

function toWire(r: ProjectHourRow): HoursProject {
  const s = (n: number) => String(n ?? 0)
  return {
    id: r.hourId ?? null,
    project_id: r.projectId,
    project_number: r.code,
    project_name: r.name,
    project_manager: r.manager,
    state: r.state,
    monday: s(r.hours[0]),
    tuesday: s(r.hours[1]),
    wednesday: s(r.hours[2]),
    thursday: s(r.hours[3]),
    friday: s(r.hours[4]),
    saturday: s(r.hours[5]),
    sunday: s(r.hours[6]),
  }
}
```
## 四、后端核心 Method 实现
<p>所有后端 Method 共享统一的权限提升模式：</p>

```csharp
// 所有后端 Method 共享的权限提升模式
Aras.Server.Security.Identity plmIdentity =
    Aras.Server.Security.Identity.GetByName("Aras PLM");
bool PermissionWasSet =
    Aras.Server.Security.Permissions.GrantIdentity(plmIdentity);
try {
    // ... 业务逻辑 ...
} catch (Exception ex) {
    throw new Exception(ERR_PREFIX + ex.Message);
} finally {
    if (PermissionWasSet)
        Aras.Server.Security.Permissions.RevokeIdentity(plmIdentity);
}
```
### 4.1 IC_getProjectList — 获取可填报项目列表
<p>核心逻辑：通过 SQL JOIN <code>PROJECT + ACTIVITY2 + PROJECT_TEAM</code> 按当前用户 Identity 筛选参与的项目，再按日期范围过滤活跃项目，最后合并已有的 <code>IC_Working_Hour</code> 记录，返回含填报状态的完整列表。</p>

```csharp
// IC_getProjectList — 按用户 Identity 筛选项目
var created_by_id = inn.getUserID();
var user = inn.newItem("User", "get");
user.setAttribute("select", "id,owned_by_id");
user.setProperty("id", created_by_id);
user = user.apply();
var ident_id = user.getProperty("owned_by_id", "");

// SQL JOIN: PROJECT + ACTIVITY2 + PROJECT_TEAM
var getPropjectIds = inn.applySQL(string.Format(
    "select p.id from innovator.PROJECT p " +
    "join innovator.ACTIVITY2 act " +
    "  on p.PROJECT_NUMBER=act.PROJ_NUM " +
    "join innovator.PROJECT_TEAM ptm " +
    "  on ptm.SOURCE_ID=p.id " +
    "where act.OWNED_BY_ID='{0}' " +
    "  or ptm.RELATED_ID='{1}' " +
    "group by p.id", ident_id, ident_id));

// 按日期范围过滤活跃项目
var projects = inn.newItem("Project", "get");
projects.setProperty("date_start_sched", date_start_sched);
projects.setProperty("date_due_sched", date_due_sched);
projects.setPropertyCondition("date_start_sched", "le");
projects.setPropertyCondition("date_due_sched", "ge");
projects.setAttribute("where",
    string.Format("project.id in ({0})", projectIds));
projects = projects.apply();

// 合并已有 IC_Working_Hour 记录
var getHours = inn.newItem("IC_Working_Hour", "get");
getHours.setProperty("created_by_id", created_by_id);
getHours.setProperty("ic_start", ic_start);
getHours.setPropertyCondition("ic_start", "between");
getHours = getHours.apply();
```
### 4.2 IC_saveProjectData — 提交新工时
<p>接收前端序列化的 <code>HoursProject</code> JSON，先查重（同项目+同用户+同周不允许重复），然后创建 <code>IC_Working_Hour</code> 主记录 + 7 条 <code>IC_Hour_Details</code> 子记录（每天一条）。</p>

```csharp
// IC_saveProjectData — 提交新工时
var projectData = Newtonsoft.Json.JsonConvert
    .DeserializeObject<HoursProject>(
        this.getProperty("projectData", ""));

// 查重：同项目 + 同用户 + 同周不允许重复
var checkItem = inn.newItem("IC_Working_Hour", "get");
checkItem.setProperty("ic_project", projectData.project_id);
checkItem.setProperty("created_by_id", inn.getUserID());
checkItem = checkItem.apply();
if (checkItem.getItemCount() > 0)
    throw new Exception(projectData.project_name +
        ":当前工时数据已存在，不允许重复提交");

// 创建主记录 + 7 条子记录
var add = inn.newItem("IC_Working_Hour", "add");
add.setProperty("ic_project", projectData.project_id);
add.setProperty("ic_monday", projectData.monday);
// ... 周二~周日同理 ...
var propertyList = new List<string>() {
    projectData.monday, projectData.tuesday,
    projectData.wednesday, projectData.thursday,
    projectData.friday, projectData.saturday,
    projectData.sunday
};
var sort_order = 1;
foreach (var property in propertyList) {
    var detail = inn.newItem("IC_Hour_Details", "add");
    detail.setProperty("ic_hours", property);
    detail.setProperty("ic_date",
        selectData.ToString("yyyy-MM-ddTHH:mm:ss"));
    detail.setProperty("ic_user", userId);
    detail.setProperty("sort_order", sort_order.ToString());
    detail.setProperty("ic_project", projectData.project_id);
    sort_order++;
    add.addRelationship(detail);
    selectData = selectData.AddDays(1);
}
add = add.apply();
```
### 4.3 IC_updateProjectData — 修改工时
<p>仅允许 <code>state ≠ pass</code> 的记录修改。编辑主记录后<strong>删除原有明细再重新添加</strong>（delete + re-add），修改完成后自动 <code>promote("Start")</code> 将状态重置为待审核。</p>

```csharp
// IC_updateProjectData — 修改工时
var projectData = Newtonsoft.Json.JsonConvert
    .DeserializeObject<HoursProject>(
        this.getProperty("projectData", ""));

var edit = inn.newItem("IC_Working_Hour", "edit");
edit.setProperty("ic_monday", projectData.monday);
// ... 周二~周日同理 ...
edit.setAttribute("where",
    string.Format("IC_Working_Hour.id='{0}'",
        projectData.id));
edit = edit.apply();

// 删除原有明细 → 重新添加
var deleteDetails = inn.newItem("IC_Hour_Details", "delete");
deleteDetails.setAttribute("where",
    string.Format("IC_Hour_Details.source_id='{0}'",
        projectData.id));
deleteDetails.apply();

foreach (var property in propertyList) {
    var detail = inn.newItem("IC_Hour_Details", "add");
    detail.setProperty("ic_hours", property);
    edit.addRelationship(detail);
}
edit = edit.apply("edit");

// 修改后自动 promote 回 Start
if (edit.getProperty("state", "") != "Start")
    edit = edit.promote("Start", "待审核");
```
### 4.4 IC_allReviewPassOrReject — 批量审核
<p>接收 <code>List&lt;ICHoursReview&gt;</code> JSON 数组，循环每条记录执行 <code>promote("pass")</code> 或 <code>promote("reject")</code>，带有状态守卫（已 pass 不能再 reject，空状态不能直接 pass）。</p>

```csharp
// IC_allReviewPassOrReject — 批量审核
var hoursReviews = Newtonsoft.Json.JsonConvert
    .DeserializeObject<List<ICHoursReview>>(
        this.getProperty("HoursReviewList", "[]"));
var type = this.getProperty("methodtype", "pass");

foreach (var hoursReview in hoursReviews) {
    var promoteItem = inn.newItem("IC_Working_Hour", "get");
    promoteItem.setProperty("id", hoursReview.id);
    promoteItem.setAttribute("select", "state,id");
    promoteItem = promoteItem.apply();
    if (type == "pass") {
        if (promoteItem.getProperty("state","") == "Start")
            promoteItem = promoteItem.promote("pass", "审核通过");
    } else {
        if (promoteItem.getProperty("state","") == "Start")
            promoteItem = promoteItem.promote("reject", "审核驳回");
    }
}
```
### 4.5 IC_getReportData — 年度统计报表
<p>12 个月循环查询 <code>IC_Hour_Details</code> 汇总月度工时（柱状图），按项目分组汇总（饼图），计算峰值月份、月均工时等统计指标。</p>

```csharp
// IC_getReportData — 年度统计
var year = Convert.ToInt32(
    this.getProperty("year", "2025"));
var monthHours = new List<double>();
for (var i = 1; i < 13; i++) {
    var monthStart = GetFirstDayOfMonth(year, i)
        .ToString("yyyy-MM-ddTHH:mm:ss");
    var monthEnd = GetLastDayOfMonth(year, i)
        .AddDays(1).AddSeconds(-1)
        .ToString("yyyy-MM-ddTHH:mm:ss");
    var details = inn.newItem("IC_Hour_Details", "get");
    details.setAttribute("select", "id,ic_user,ic_hours,ic_date");
    details.setProperty("created_by_id", created_by_id);
    details.setAttribute("where",
        string.Format("ic_date >= '{0}' and ic_date <= '{1}'",
            monthStart, monthEnd));
    details = details.apply();
    double total = 0;
    for (var j = 0; j < details.getItemCount(); j++)
        total += Convert.ToDouble(
            details.getItemByIndex(j).getProperty("ic_hours", "0"));
    monthHours.Add(total);
}
```
### 4.6 IC_Hours_Details — 工时明细查询
<p>通过 AML 按年月 + 项目 ID 查询 <code>IC_Hour_Details</code>，自动计算当月首末日范围，返回含项目信息、填报人、日期、工时的明细列表。</p>

```csharp
// IC_Hours_Details — AML 按年月查询明细
var year = Convert.ToInt32(this.getProperty("year", "1999"));
var month = Convert.ToInt32(this.getProperty("month", "4"));
var project_id = this.getProperty("project_id", "");
var startData = new DateTime(year, month, 1);
var endData = startData.AddMonths(1).AddSeconds(-1);
var getAML =
    "<AML><Item type='IC_Hour_Details' action='get' " +
    "select='id,ic_hours,ic_date,ic_user," +
    "ic_project(id,name,project_number,owned_by_id),ic_state' " +
    "order_by='ic_date'>" +
    "<ic_date condition=\"ge\">" +
    startData.ToString("yyyy-MM-ddTHH:mm:ss") + "</ic_date>" +
    "<ic_date condition=\"le\">" +
    endData.ToString("yyyy-MM-ddTHH:mm:ss") + "</ic_date>" +
    amlProject + "</Item></AML>";
var hoursDatas = inn.applyAML(getAML);
```
### 4.7 IC_getProjectDetailData — 项目维度明细
<p>通过 SQL JOIN <code>IC_Hour_Details + IC_Working_Hour + PROJECT + USER</code>，按项目 ID + 年月范围查询，返回每条填报记录的人员、日期、工时、审核状态。</p>

```csharp
// IC_getProjectDetailData — SQL 多维度 JOIN
var selectSql = string.Format(
    "select u.[KEYED_NAME] username, " +
    "ihd.IC_DATE, ihd.IC_HOURS, iwh.[STATE] " +
    "from innovator.IC_Hour_Details ihd " +
    "left join innovator.IC_Working_Hour iwh " +
    "  on ihd.SOURCE_ID = iwh.id " +
    "left join innovator.PROJECT p " +
    "  on p.id = ihd.IC_PROJECT " +
    "left join innovator.[USER] u " +
    "  on u.ID = ihd.IC_USER " +
    "where ihd.IC_PROJECT = '{0}' " +
    "and IC_DATE between '{1}' and '{2}' " +
    "order by ihd.IC_DATE",
    projectId, startDate, endDate);
var datas = inn.applySQL(selectSql);
```
### 4.8 getProjectHourData — 用户填报记录
<p>按 <code>created_by_id</code> + 周范围 <code>between</code> 条件查询 <code>IC_Working_Hour</code>，关联查询项目名称，返回当前用户在指定周的所有填报记录。</p>

```csharp
// getProjectHourData — 按用户 + 周范围查询
var created_by_id = inn.getUserID();
var weekRangeData = this.getProperty("weekrangetext", "1999-04-06");
var selectData = DateTime.Parse(weekRangeData);
var endData = selectData.AddDays(6);
var ic_start = string.Format("{0} and {1}",
    date_due_sched, date_start_sched);
var ic_end = string.Format("{0} and {1}",
    endData.ToString("yyyy-MM-ddTHH:mm:ss"),
    endData.AddDays(1).AddSeconds(-1)
        .ToString("yyyy-MM-ddTHH:mm:ss"));
var getHours = inn.newItem("IC_Working_Hour", "get");
getHours.setProperty("created_by_id", created_by_id);
getHours.setProperty("ic_start", ic_start);
getHours.setProperty("ic_end", ic_end);
getHours.setPropertyCondition("ic_start", "between");
getHours.setPropertyCondition("ic_end", "between");
getHours.setAttribute("select",
    "created_by_id,ic_end,ic_friday,ic_monday," +
    "ic_project,ic_saturday,ic_start,state," +
    "ic_sunday,ic_thursday,ic_tuesday,ic_wednesday");
getHours = getHours.apply();
for (var i = 0; i < getHours.getItemCount(); i++) {
    var hour = getHours.getItemByIndex(i);
    var project = inn.newItem("Project", "get");
    project.setProperty("id", hour.getProperty("ic_project", ""));
    project.setAttribute("select", "name,project_number,owned_by_id");
    project = project.apply();
    // ... 组装 HoursProject 返回 ...
}
```
### 4.9 工时明细查询 — 按年月检索（IC_Hours_Details + getHoursDetailbyProject）
<p>
该功能面向<strong>财务部门</strong>，支持按<strong>任意年月 + 项目</strong>检索所有人员在该月的工时明细。
与 4.5 年度报表不同，此处返回的是<strong>明细级数据</strong>（每条 IC_Hour_Details 记录），
支持<strong>导出 Excel</strong>，财务人员拿到表格后可快速通过筛选功能分析数据。
</p>
<p>前端通过 <code>IC_Hours_Details</code> Method 查询工时明细，再通过 <code>getHoursDetailbyProject</code> 补充项目维度的聚合信息：</p>

```csharp
// IC_Hours_Details — AML 按年月 + 项目查询工时明细
var year = Convert.ToInt32(this.getProperty("year", "1999"));
var month = Convert.ToInt32(this.getProperty("month", "4"));
var project_id = this.getProperty("project_id", "");
var startData = new DateTime(year, month, 1);
var endData = startData.AddMonths(1).AddSeconds(-1);
var getAML =
    "<AML><Item type='IC_Hour_Details' action='get' " +
    "select='id,ic_hours,ic_date,ic_user(keyed_name)," +
    "ic_project(id,name,project_number,owned_by_id),ic_state' " +
    "order_by='ic_date'>" +
    "<ic_date condition=\"ge\">" +
    startData.ToString("yyyy-MM-ddTHH:mm:ss") + "</ic_date>" +
    "<ic_date condition=\"le\">" +
    endData.ToString("yyyy-MM-ddTHH:mm:ss") + "</ic_date>" +
    amlProject + "</Item></AML>";
var hoursDatas = inn.applyAML(getAML);

// getHoursDetailbyProject — 按项目聚合明细统计
var hoursProject = inn.newItem("IC_Working_Hour", "get");
hoursProject.setProperty("ic_project", project_id);
hoursProject.setProperty("ic_start",
    startData.ToString("yyyy-MM-ddTHH:mm:ss"));
hoursProject.setPropertyCondition("ic_start", "ge");
hoursProject = hoursProject.apply();
var totalHours = 0;
for (var k = 0; k < hoursDatas.getItemCount(); k++)
{
    var detailItem = hoursDatas.getItemByIndex(k);
    totalHours += Convert.ToInt32(
        detailItem.getProperty("ic_hours", "0"));
}
// 返回 { rows: hoursDatas[], summary: { totalHours, projectName, month } }
```
### 4.10 Excel 导出（exportExcel.ts）
<p>
系统所有表格页面（填报记录、工时审核、年度报表、工时明细）均支持<strong>导出 Excel</strong>。
使用 <code>xlsx</code> 库（SheetJS）将前端已加载的数据直接生成 <code>.xlsx</code> 文件并触发浏览器下载，
<strong>无需额外后端 API</strong>，导出速度极快。
</p>

```typescript
// utils/exportExcel.ts — 导出 Excel 文件
import * as XLSX from 'xlsx'

export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  columns: { key: string; label: string; width?: number }[],
  fileName: string,
  sheetName = 'Sheet1',
) {
  // 1. 构建表头 + 数据行
  const header = columns.map(c => c.label)
  const rows = data.map(row =>
    columns.map(c => row[c.key] ?? ''))

  const sheet = XLSX.utils.aoa_to_sheet([header, ...rows])

  // 2. 自动列宽
  const colWidths = columns.map((c, i) => {
    const maxLen = Math.max(
      c.label.length,
      ...data.map(r => String(r[c.key] ?? '').length))
    // 中文按 2 字符宽度计算
    const cnCount = String(c.label).match(/[\u4e00-\u9fff]/g)?.length ?? 0
    return { wch: Math.max(c.width ?? 12, maxLen + cnCount * 0.8 + 2) }
  })
  sheet['!cols'] = colWidths

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, sheet, sheetName)
  XLSX.writeFile(wb, `${fileName}_${formatDate(new Date())}.xlsx`)
}

function formatDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

// 使用示例（在 HoursDetail.vue 中）
function handleExport() {
  exportToExcel(tableData.value, [
    { key: 'username',   label: '填报人',   width: 12 },
    { key: 'ic_date',    label: '日期',     width: 14 },
    { key: 'ic_hours',   label: '工时(h)',  width: 10 },
    { key: 'projectName',label: '所属项目', width: 24 },
    { key: 'state',      label: '审核状态', width: 10 },
  ], `工时明细_${selectedYear}_${String(selectedMonth).padStart(2,'0')}`)
}
```
<p><strong>设计要点</strong>：</p>
<ul>
<li>导出基于前端当前已加载数据，不做额外请求，保证导出内容与用户所见一致</li>
<li>自动文件名含日期（如 <code>工时明细_2025-08.xlsx</code>），便于归档</li>
<li><code>autoWidth</code> 按内容自动推算列宽，中文按 2 字符计算，确保列宽合适</li>
<li>多 sheet 支持：明细页 + 汇总页可分 sheet 导出</li>
</ul>
## 五、状态机
<p>工时记录的审批状态流转如下：</p>

```text
┌──────────┐    提交     ┌──────────┐    通过     ┌──────────┐
│  空状态   │ ────────→  │  Start   │ ────────→  │   pass   │
│  ('')    │            │ (待审核)  │            │ (已通过)  │
└──────────┘            └──────────┘            └──────────┘
                              │                      只读
                              │ 驳回
                              ▼
                        ┌──────────┐    修改重提   ┌──────────┐
                        │  reject  │ ──────────→  │  Start   │
                        │ (已驳回)  │              │ (待审核)  │
                        └──────────┘              └──────────┘
```
<ul>
<li><strong>空状态（''）</strong>：项目已列出但尚未填报，可提交新工时</li>
<li><strong>Start（待审核）</strong>：已提交，等待管理员审核；被驳回后修改也会回到此状态</li>
<li><strong>pass（已通过）</strong>：审核通过，数据只读不可修改</li>
<li><strong>reject（已驳回）</strong>：审核驳回，可修改后重新提交</li>
</ul>
## 六、路由与 IFRAME 兼容
<p>使用 <code>createWebHashHistory()</code> Hash 路由模式，确保在 Aras Innovator IFRAME 嵌入环境下路由跳转不会触发父页面刷新。根路径 <code>/</code> 重定向到 <code>/data-view</code>（工时填报页）。</p>

```typescript
// router/index.ts — Hash 路由（Aras IFRAME 兼容）
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/data-view' },
  { path: '/data-view',
    component: () => import('@/views/DataView.vue') },
  { path: '/fill-record',
    component: () => import('@/views/FillRecord.vue') },
  { path: '/time-report',
    component: () => import('@/views/TimeReport.vue') },
  {
    path: '/manage-center',
    component: () => import('@/views/manage/ManageCenter.vue'),
    redirect: '/manage-center/time-review',
    children: [
      { path: 'time-review',
        component: () => import('@/views/manage/TimeReview.vue') },
      { path: 'personal-report',
        component: () => import('@/views/manage/PersonalReport.vue') },
    ],
  },
  { path: '/project-detail',
    component: () => import('@/views/ProjectDetail.vue') },
  { path: '/hours-detail',
    component: () => import('@/views/HoursDetail.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/data-view' },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
```
## 七、总结
<table>
<thead><tr><th>设计要点</th><th>实现方式</th></tr></thead>
<tbody>
<tr><td>Aras 通信封装</td><td>callArasMethod 统一入口 + Mock/Real 双模调度</td></tr>
<tr><td>入参序列化</td><td>BUILDERS 表 + defaultBody，JSON 标签不转义</td></tr>
<tr><td>返回值解析</td><td>safeParseResult 6 策略容错解析</td></tr>
<tr><td>类型安全</td><td>Wire↔View 双向映射，视图层纯 TypeScript 类型</td></tr>
<tr><td>权限控制</td><td>后端 Aras PLM Identity 提升/释放</td></tr>
<tr><td>状态管理</td><td>IC_Working_Hour 生命周期：'' → Start → pass/reject</td></tr>
<tr><td>IFRAME 兼容</td><td>Hash 路由 + top.aras IOM 调用</td></tr>
<tr><td>数据分页</td><td>后端全量返回，前端 computed 分页/筛选</td></tr>
<tr><td>Excel 导出</td><td>xlsx（SheetJS）前端直接生成，无需后端接口</td></tr>
<tr><td>工时明细查询</td><td>按年月 + 项目检索明细，支持导出供财务分析</td></tr>
</tbody>
</table>
