---
title: 关于 ItemType（物料类型）
---

<div>



<h1>关于 ItemType（物料类型）</h1>
<p class="Content_body"><span style="font-weight: bold;">ItemType（物料类型）</span>是 Aras Innovator 管理的业务对象。它是由此创建的条目的模板或定义。用面向对象编程的术语来说，ItemType 类似于类定义。由此创建的条目就是类的实例。</p>
<p class="Content_body">Aras Innovator 中几乎所有的内容都通过 ItemType 来定义。ItemType 定义了：</p>
<ul style="list-style: disc;">
<li>
<p class="Content_body"> 条目可用的属性、表单或视图。</p>
</li>
<li>
<p class="Content_body">与条目关联的生命周期。</p>
</li>
<li>
<p class="Content_body">与条目关联的工作流。</p>
</li>
<li>
<p class="Content_body">权限、关系、服务器和客户端方法及事件，以及更多内容。</p>
</li>
</ul>
<p class="Content_body">ItemType 既可用于存储简单的名称信息，也可用于构建最复杂的业务对象，其复杂程度可根据需求而定。</p>
<p class="Content_body">创建 ItemType 时，您会看到一组头部属性和一组选项卡。</p>
<p class="Content_body_indented"><img height="532" :src="'/aras-images/partitem.jpg'" width="888"></p>
<p class="Figure_indented">图 1 </p>
<p class="Content_body">要了解头部属性，请从<a href="#" class="internal-doc-link">创建 ItemType</a>开始。点击以下链接查看各选项卡的说明：</p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span><a href="#" class="internal-doc-link">属性</a></p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span><a href="#" class="internal-doc-link">RelationshipType（关系类型）</a></p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span>视图</p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span>服务器事件</p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span>动作</p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span><a href="#" class="internal-doc-link">工作流</a></p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span><a href="#" class="internal-doc-link">目录访问</a></p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span>客户端事件</p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span><a href="#" class="internal-doc-link">可以添加</a></p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span>权限</p>
<p class="Bulleted_list" style="margin-left: 50px;"><span class="rls-1-Bullet_list"><span style="font-family: 'Microsoft Sans Serif';">●</span></span>报表</p>
<h2>ItemType 报表</h2>
<p class="Content_body">有两个实用的报表用于汇总 ItemType 定义。当在主网格中选中某个 ItemType 时，您可以从目录中选择"报表"来访问它们，也可以在 ItemType 窗口中点击"报表"选项卡来访问。</p>
<p class="Bulleted_list" style="text-indent: 24px;"><span class="rls-1-Bullet_list" style="font-family: 'Microsoft Sans Serif';">●</span><a id="ItemType_Definition_Report" name="ItemType_Definition_Report"></a><span class="Bold">ItemType 定义报表</span>汇总了表单内容、所有非核心属性以及其他所有关系选项卡的内容。</p>
<p class="Bulleted_list" style="text-indent: 24px;"><span class="rls-1-Bullet_list" style="font-family: 'Microsoft Sans Serif';">●</span><a id="ItemType_Permission_Report" name="ItemType_Permission_Report"></a> <span class="Bold">ItemType 权限报表</span>汇总了所有权限信息，显示谁可以获取、更新、删除和更改权限。</p>
<ul style="list-style: disc;">
<li>
<p class="Bulleted_list"><span style="font-weight: bold;"><a id="ItemType_History_Configuration_Report_" name="ItemType_History_Configuration_Report_"></a>ItemType 历史记录配置报表</span>汇总了默认历史记录模板、所有已跟踪属性以及生命周期。如果未分配历史记录模板，则会在弹出窗口中显示消息"此 ItemType 未定义历史记录模板。"</p>
</li>
</ul>
<p class="Content_body">从菜单中选择一个报表。使用标准 Internet Explorer 打印功能来打印报表。</p>


</div>
