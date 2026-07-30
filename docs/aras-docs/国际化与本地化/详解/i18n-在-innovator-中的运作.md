---
title: Innovator中国际化与本地化的工作原理
---

<div data-condition="Others:NewFor91">
# 国际化和本地化行为
<p class="Procedure_Title"><b style="font-weight: bold;">当用户登录时</b></p>
<p class="Content_body">Aras Innovator 客户端会检查客户端设置和服务器变量，并建立会话上下文（Session Context），该上下文将一直使用到会话结束。Aras Innovator 会判断客户端文化是否为数据库中的某个区域设置（Locale）。</p>
<p class="Content_body">Aras Innovator 会判断企业时区（CorporateTimeZone）是否已设置：</p>
<!--?rh-list_start class="Numbered_list" style="list-style: rh-list; list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<ul style="list-style-type: disc;">
<li class="Bulleted_list">
<p class="Content_body">如果已设置，则计算客户端时区与企业时区之间的偏移量，并采用客户端时区（ClientTimeZone）</p>
</li>
<li class="Bulleted_list">
<p class="Content_body">如果未设置，则将企业时区的偏移量设为零，并采用客户端时区（ClientTimeZone）</p>
</li>
<li class="Bulleted_list">
<p class="Content_body">如果企业时间偏移量为零，则 Innovator 客户端仅显示本地时间</p>
</li>
<li class="Bulleted_list">
<p class="Content_body">如果企业时间偏移量不为零，则 Innovator 客户端同时显示企业时间和本地时间</p>
</li>
</ul>
<p><b style="font-weight: bold;">当客户端请求信息时</b></p>
<p class="Content_body">对于每个多语言字符串类型的值（最常见的是菜单、标签或列表值），Innovator 会检查是否存在适用于当前上下文语言的值。</p>
<ul style="list-style-type: disc;">
<li class="Bulleted_list">
<p class="Content_body">如果存在，服务器返回上下文语言对应的值。</p>
</li>
<li class="Bulleted_list">
<p class="Content_body">如果不存在，服务器返回默认语言对应的值。请注意，如果该值尚未定义，则可能为空。</p>
</li>
<li class="Bulleted_list">
<p class="Content_Body">对于每个日期或时间类型的值，服务器会根据会话的企业时区（CorporateTimeZone）进行调整，该偏移量可能为 0</p>
</li>
</ul>
<p class="Content_body">对于每个日期、时间或小数类型的值，标准 Innovator 客户端会使用客户端区域设置文化进行格式化（请注意，其他客户端需要执行此步骤才能支持此功能）。</p>
<ul>
<li class="Bulleted_list">
<p class="Content_body">如果是，则采用该 Innovator 区域设置及其对应的 Innovator 语言</p>
</li>
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<li class="Bulleted_list">
<p class="Content_body">如果不是，则采用默认区域设置和语言</p>
</li>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" style="list-style: rh-list; list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" start="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start level="2" class="Bullet_list" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" style="list-style: rh-list; list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" style="list-style: rh-list; list-style: rh-list;" ?-->
</ul>
<!--?rh-list_end ?-->
<p class="Content_body">有关管理国际化（Internationalization）的更多信息，请参阅发布光盘上的文档。</p>

</div>
