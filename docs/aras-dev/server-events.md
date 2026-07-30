---
title: Server Event 事件体系
---

# Server Event 事件体系
<blockquote>
<p>Aras Innovator 的服务端事件（Server Events）允许开发者在数据操作的<strong>前后</strong>插入自定义逻辑。事件绑定在 ItemType 上，当特定操作发生时自动触发相应的 Method。</p>
</blockquote>

## 一、完整事件列表
<table>
<thead><tr><th>事件名称</th><th>触发时机</th><th>典型用途</th></tr></thead>
<tbody>
<tr><td><code>onBeforeAdd</code></td><td>数据库 INSERT 之前</td><td>数据校验、自动填充字段、阻止创建</td></tr>
<tr><td><code>onAfterAdd</code></td><td>数据库 INSERT 之后</td><td>创建关联记录、发送通知、日志审计</td></tr>
<tr><td><code>onBeforeUpdate</code></td><td>数据库 UPDATE 之前</td><td>版本控制、字段同步、权限验证</td></tr>
<tr><td><code>onAfterUpdate</code></td><td>数据库 UPDATE 之后</td><td>历史记录、通知相关方、触发流程</td></tr>
<tr><td><code>onBeforeDelete</code></td><td>数据库 DELETE 之前</td><td>级联检查、引用完整性验证、阻止删除</td></tr>
<tr><td><code>onAfterDelete</code></td><td>数据库 DELETE 之后</td><td>清理关联数据、日志记录</td></tr>
<tr><td><code>onBeforeVersion</code></td><td>版本创建之前</td><td>版本规则验证、关联项版本同步</td></tr>
<tr><td><code>onAfterVersion</code></td><td>版本创建之后</td><td>更新关联的版本引用</td></tr>
<tr><td><code>onBeforePromote</code></td><td>生命周期推进之前</td><td>签审规则验证、必填字段检查</td></tr>
<tr><td><code>onAfterPromote</code></td><td>生命周期推进之后</td><td>触发下游流程、同步状态到关联项</td></tr>
<tr><td><code>onBeforeCopy</code></td><td>复制操作之前</td><td>清理不需要复制的字段</td></tr>
<tr><td><code>onAfterCopy</code></td><td>复制操作之后</td><td>重命名、重置状态</td></tr>
<tr><td><code>onBeforeLock</code></td><td>锁定之前</td><td>检查锁定权限</td></tr>
<tr><td><code>onAfterLock</code></td><td>锁定之后</td><td>通知其他用户</td></tr>
<tr><td><code>onBeforeUnlock</code></td><td>解锁之前</td><td>验证解锁条件</td></tr>
<tr><td><code>onAfterUnlock</code></td><td>解锁之后</td><td>清理锁定标记</td></tr>
<tr><td><code>onGet</code></td><td>查询数据时</td><td>动态过滤结果、隐藏敏感字段</td></tr>
<tr><td><code>onSearch</code></td><td>搜索操作时</td><td>自定义搜索逻辑、联合搜索</td></tr>
</tbody>
</table>

## 二、事件执行流程

```text
客户端发起 add 操作
       │
       ▼
  ┌─────────────┐
  │ onBeforeAdd  │ ← Method 在此可阻止操作、修改数据
  └──────┬──────┘
         │ 如果 Method 没有返回错误
         ▼
  ┌─────────────┐
  │ SQL INSERT   │ ← Aras 引擎执行数据库操作
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ onAfterAdd   │ ← Method 在此可做后续处理、通知等
  └──────┬──────┘
         │
         ▼
    返回给客户端
```


## 三、this 在事件 Method 中的含义
<p>在 Server Event 的 Method 中，<code>this</code> 代表<strong>正在被操作的 Item</strong>（不是 Method ItemType 自身）：</p>

```csharp
// 假设这是绑定在 Part ItemType 的 onBeforeAdd 事件 Method
// this = 即将被创建的 Part 实例

string name = this.getProperty("name", "");
string number = this.getProperty("item_number", "");

// 自动生成编号（如果没有手动指定）
if (string.IsNullOrEmpty(number)) {
    var inn = this.newInnovator();
    number = "P-" + DateTime.Now.ToString("yyyyMMddHHmmss");
    this.setProperty("item_number", number);
}

// 验证：名称不能为空
if (string.IsNullOrEmpty(name))
    return this.getInnovator().newError("零件名称不能为空");

// 不返回错误 = 允许继续
return this;
```


## 四、阻止操作的方法

```csharp
// onBeforeDelete — 阻止删除已被引用的零件
var itemId = this.getProperty("id", "");
var inn = this.newInnovator();

// 检查是否被 BOM 引用
var boms = inn.newItem("Part BOM", "get");
boms.setProperty("related_id", itemId);
boms.setAttribute("select", "id");
boms = boms.apply();

if (boms.getItemCount() > 0) {
    // 返回错误即可阻止本次删除
    return inn.newError(
        $"该零件被 {boms.getItemCount()} 个 BOM 引用，无法删除。请先移除 BOM 关系。");
}

// 返回 this 表示允许操作继续
return this;
```


## 五、事件注册方式
<p>在 ItemType 的配置界面中绑定 Server Event：</p>
<ol>
<li>打开目标 ItemType（如 Part）</li>
<li>切换到 <strong>Server Events</strong> 标签页</li>
<li>选择事件类型（如 onBeforeAdd）</li>
<li>选择已创建的 Method</li>
<li>保存</li>
</ol>

<p><strong>参考来源：</strong></p>
<ul>
<li><a href="https://community.aras.com/blog/labs/an-overview-of-server-side-method-events/15907">An Overview of Server-Side Method Events — Aras Labs</a></li>
<li><a href="https://www.aras.com/community/f/development/55460/how-to-work-with-onbeforedelete-and-onafterdelete/10982">How to work with onBeforeDelete and onAfterDelete</a></li>
</ul>
