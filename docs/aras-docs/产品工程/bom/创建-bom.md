---
title: 创建 BOM（物料清单）
---

<div>
# 创建 BOM（物料清单）
## 填充顶级零件<a class="glossterm" data-rhwidget="ExpandSpot" data-target="glossary">BOM</a><span class="expanding-content" data-targetname="glossary"> </span>
<ol class="Decimal">
<li>打开选定的零件进行编辑。</li>
<br>
<li>零件表单出现，BOM（物料清单）选项卡已选中。</li>
<li><span class="MenuChoice" style="font-weight: normal;">点击 <strong>选择条目</strong> 图标 <img :src="'/aras-images/selitems.jpg'"> 选择相应的零件。</span> 如果您希望直接从 BOM 表格中创建零件，请参阅<a href="#" class="internal-doc-link">从 BOM 创建关联零件</a>。</li>
<li>点击 <strong>创建条目</strong> 图标 <img :src="'/aras-images/createitem.jpg'"> 向 BOM 选项卡上的零件列表添加新条目。一个新的弹出窗口将显示零件列表，您可以从中选择所需的零件。您可以在此窗口中使用基本搜索技术搜索所需的零件。</li>
</ol>
<p class="Content_body_indented"><img height="183" :src="'/aras-images/partbomtab.jpg'" style="cursor: nesw-resize;" width="897"></p>

<ol class="Decimal" start="5">
<li>选择您要包含在 BOM（物料清单）中的一个或多个零件，然后点击绿色勾选 <img :src="'/aras-images/greenarrow.jpg'"> 图标完成选择。所选零件将出现在父级零件的 BOM 选项卡上。</li>
</ol>
<p>完成 BOM（物料清单）零件列表的填充后，请仔细查看列名。您应该会看到每个条目有两个专属于 BOM 关系的属性 - <span class="MenuChoice">数量</span>和<span class="MenuChoice">参考标识符</span>。数量是指父级零件所需的该特定零件的数量，而参考标识符主要用于电子装配，表示每个零件在其父级零件上的实际位置，依据图纸或规范。参考标识符的详细说明请参阅<a href="#" class="internal-doc-link">BOM 关系：实例</a>。</p>
<p style="counter-set: item1 0;">点击数量属性并输入构建父级零件所需的零件数量。</p>

</div>
