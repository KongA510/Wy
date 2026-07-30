---
title: BOM（物料清单）关系
---

<div>
<h1>BOM（物料清单）关系</h1>
<p><a class="glossterm" data-rhwidget="ExpandSpot" data-target="glossary">BOM</a><span class="expanding-content" data-targetname="glossary"> </span>关系是父零件与其各子零件之间的关系，定义在父零件的 BOM 表中。例如，假设我们有一个父零件 F41 涡轮，其 BOM 表中指定了以下零件：11Casing；1smBlade；2smBlade；以及 12Casing Assembly。</p>
<p>要查看每个子零件的 BOM 关系：</p>
<ol class="Decimal">
<li>打开父零件的零件表单（在我们的示例中是 F41 涡轮）。</li>
<br>
<li>在 BOM 表中选择子零件，在我们的示例中是 12 Casing Assembly。</li>
<br>
<li>右键单击子零件以弹出快捷菜单。</li>
</ol>
<p class="Content_body_indented"><img height="280" :src="'/aras-images/F12BOMenu.jpg'" width="903"></p>

<ol class="Numbered_list">
<li style="counter-set: item1 3;">选择 <strong>BOM&gt;打开</strong>。会出现类似以下的表单，显示父零件（F41 涡轮）与子零件（12 Casing Assembly）之间的关系。</li>
</ol>
<p class="Content_body_indented"><img :src="'/aras-images/BOMForm.jpg'"></p>

<p>请注意，该关系有三个选项卡：实例、替代件和有效性。点击链接可了解更多详细信息。</p>
<ol class="Bullet_list">
<li><a href="#" class="internal-doc-link">实例</a></li>
<li><a href="#" class="internal-doc-link">替代件</a></li>
</ol>

</div>
