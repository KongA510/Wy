---
title: 创建包含关联条目的关系
---

<div>
# 创建包含关联条目的关系
<p class="Content_body">关系将两个条目绑定在一起——源（父）条目和关联（子）条目，使源（父）条目能够引用关联条目中保存的信息。该关系是从源（父）条目出发，创建一个指向关联（子）条目的链接来建立的。</p>
<p class="Content_body">在此关系类型中，添加关联条目是必需的。您可以添加一个已有的条目，也可以创建一个新条目。</p>
<p class="Content_body">示例：让我们以零件ItemType（物料类型）作为源条目，定义一个零件-BOM关系。在本示例中，我们将向椅子条目（零件）添加关联（子）条目，例如螺母、坐垫、扶手。</p>
<p class="Procedure_Title">创建包含关联条目的关系：</p>
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<ol style="list-style-type: decimal;">
<li class="Numbered">登录 Aras Innovator。</li>
<li class="Numbered">从目录中导航到源（父）条目。</li>
<li class="Numbered">在本示例中，我们以零件ItemType（物料类型）作为源（父）条目。从导航窗格中选择<strong>Design&gt;Parts</strong>。</li>
<li class="Numbered">从主网格中，选择您要为其添加关系的源（父）条目。</li>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
</ol>

<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Figure_indented" style="margin-left: 50px;"><img :src="'/aras-images/partrel1.jpg'"></p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="rl-p-Figure_indented" an="1" level="1" style="list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->

<ol start="5">
<li class="Numbered">在BOM选项卡中，点击<img :src="'/aras-images/selitems.jpg'">（选择条目）。搜索对话框将出现：</li>
</ol>
<p class="Figure_indented"><img :src="'/aras-images/searchpart2.jpg'"></p>
<ol start="6">
<li class="Numbered">选择要添加到源（父）条目（椅子）的关联（子）条目。<span class="Bold" style="font-weight: normal;"></span><span class="Bold" style="font-weight: normal;"></span><span class="Bold" style="font-weight: normal;"></span>                        <span class="Bold" style="font-weight: normal;"></span> <span class="Bold" style="font-weight: normal;"></span><span class="Bold" style="font-weight: normal;"></span>一个新行将出现在<span class="Bold">BOM</span>选项卡中。</li>
</ol>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="3" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->

<p class="Numbered" style="margin-left: 112px;"><img height="131" :src="'/aras-images/partbom3.jpg'" width="913"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<p class="Content_body_indented" style="margin-left: 90px;">您需要为关联（子）条目的属性提供值。在本示例中，<span class="Bold">序列</span>属性是自动填充的。自动填充取决于系统属性。我们需要为以下属性提供值：</p>
<!--?rh-list_start class="Bullet_list" level="3" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 100px;"><span class="Bold">零件编号</span></p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Bullet_list" level="3" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 100px;"><span class="Bold">修订版</span></p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Bullet_list" level="3" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 100px;"><span class="Bold">名称</span></p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Bullet_list" level="3" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 100px;"><span class="Bold">类型</span></p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Bullet_list" level="3" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 100px;"><span class="Bold">数量</span></p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="rl-p-Note" level="1" an="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Note_indented">注意：每个条目的属性取决于ItemType（物料类型），并由管理员进行配置。因此，每个ItemType（物料类型）的属性可能因管理员的配置不同而有所差异。</p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" style="list-style: rh-list; list-style: rh-list;" ?-->
<ol start="7">
<li class="Numbered">点击<img :src="'/aras-images/save.jpg'">。</li>
</ol>
<!--?rh-list_end ?-->


<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Figure_indented"><img :src="'/aras-images/partbom4.jpg'"></p>
<!--?rh-list_end ?-->

</div>
