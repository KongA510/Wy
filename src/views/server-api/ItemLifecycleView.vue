<template>
  <article class="doc-content">
    <h1>生命周期与工作流</h1>
    <blockquote>
      <p><strong>Item 提供生命周期推进、工作流实例化和锁定/解锁操作。</strong>这些方法均为服务器通信方法。命名空间：Aras.IOM，程序集：IOM.dll（15.0.1）。</p>
    </blockquote>

    <h2>一、promote(String) — 生命周期推进</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item promote(string targetState)

// 将 Item 推进到指定的生命周期状态
var item = inn.newItem("Part", "promote");
item.setID(partId);
item.setProperty("comments", "设计评审通过");
var result = item.promote("In Review");
// 触发 onBeforePromote、onAfterPromote 事件

if (result.isError()) {
    return inn.newError("推进失败：" + result.getErrorString());
}</code></pre>

    <h2>二、instantiateWorkflow(String) — 实例化工作流</h2>
    <pre v-pre><code class="language-csharp">// 签名
public Item instantiateWorkflow(string workflowMapId)

// 使用指定的工作流映射为 Item 实例化工作流
var item = inn.newItem("Part");
item.setID(partId);
var result = item.instantiateWorkflow(workflowMapId);

// 典型流程：
// Part promote 到某个状态 → Server Event 触发 → 实例化审批工作流</code></pre>

    <h2>三、lockItem / unlockItem — 锁定/解锁</h2>
    <pre v-pre><code class="language-csharp">// lockItem() — 锁定 Item
public Item lockItem()
var lockResult = item.lockItem();
if (lockResult.isError()) {
    return inn.newError("锁定失败：" + lockResult.getErrorString());
}

// unlockItem() — 解锁 Item
public Item unlockItem()
var unlockResult = item.unlockItem();</code></pre>

    <h2>四、fetchLockStatus / getLockStatus</h2>
    <pre v-pre><code class="language-csharp">// fetchLockStatus() — 从服务器获取锁定状态
public Item fetchLockStatus()
var statusItem = item.fetchLockStatus();

// getLockStatus() — 从属性读取锁定状态（仅内存操作）
// 基于属性 locked_by_id 判断
public string getLockStatus()
string lockStatus = item.getLockStatus();
// 返回锁定者 ID，未锁定时返回空</code></pre>

    <h2>五、已废弃的工作流方法</h2>
    <pre v-pre><code class="language-csharp">// 以下方法均已废弃
// [Obsolete] startWorkflow()    — 启动工作流
// [Obsolete] cancelWorkflow()   — 取消工作流
// [Obsolete] closeWorkflow()    — 关闭工作流
// [Obsolete] isLocked()         — 使用 fetchLockStatus 或 getLockStatus</code></pre>

    <h2>六、完整示例：推进审批流</h2>
    <pre v-pre><code class="language-csharp">var inn = this.newInnovator();

// 1. 提交流程（从 Draft → In Review）
var promote1 = inn.newItem("Part", "promote");
promote1.setID(partId);
promote1.setProperty("comments", "提交设计评审");
var r1 = promote1.promote("In Review");
if (r1.isError()) return inn.newError("提交失败：" + r1.getErrorString());

// 2. 锁定 Part 防止并发编辑
var lockItem = inn.newItem("Part", "lock");
lockItem.setID(partId);
var lockRes = lockItem.lockItem();
if (lockRes.isError()) {
    // 可能已被他人锁定
    string lockedBy = lockRes.getProperty("locked_by_id", "");
    return inn.newError("该 Part 已被 " + lockedBy + " 锁定");
}

// 3. 编辑 Part
var edit = inn.newItem("Part", "edit");
edit.setID(partId);
edit.setProperty("approved_description", "已审核通过");
edit.apply();

// 4. 推进到 Released
var promote2 = inn.newItem("Part", "promote");
promote2.setID(partId);
var r2 = promote2.promote("Released");
if (r2.isError()) return inn.newError("发布失败：" + r2.getErrorString());

// 5. 解锁
var unlock = inn.newItem("Part", "unlock");
unlock.setID(partId);
unlock.unlockItem();</code></pre>

    <h2>七、实践笔记</h2>
    <ul>
      <li><strong>promote 触发事件：</strong>每次 promote 都会执行 onBeforePromote 和 onAfterPromote 事件方法</li>
      <li><strong>promote 的权限：</strong>需要目标状态的 Promote 权限，由 Identity 和 Permission 控制</li>
      <li><strong>lock 是排他的：</strong>同一时间只有一个用户能锁定 Item</li>
      <li><strong>版本控制：</strong>release 后不可编辑，需要通过 new version 生成新版本才可修改</li>
      <li><strong>instantiateWorkflow：</strong>在 onAfterPromote 事件中调用，自动触发审批流程</li>
    </ul>

    <p><strong>参考：</strong></p>
    <ul>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_promote.htm">promote Method</a></li>
      <li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/M_Aras_IOM_Item_lockItem.htm">lockItem Method</a></li>
    </ul>
  </article>
</template>
