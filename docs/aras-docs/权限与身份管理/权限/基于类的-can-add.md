---
title: 类结构的可添加权限
---

<div data-condition="Others:NewFor91">
<div class="Section1">
# 类结构的可添加权限
## 简介
<p class="Content_body"><a href="#" class="internal-doc-link">类结构</a> 允许将单个 Aras Innovator ItemType（物料类型）细分为类和子类，可用于组织属性、启动不同的输入表单，还可以通过 <span class="MsoHyperlink"><a href="#" class="internal-doc-link">可添加</a></span> 设置为 ItemType（物料类型）的实例设置 <span class="glosstext"><a href="#" style="font-style: normal;" class="internal-doc-link">权限</a></span>。</p>
<p class="Content_body">例如，一个名为 <i>Inspection Result</i> 的 ItemType（物料类型）可以被分类为 <i><span style="font-size: 10.0pt; line-height: 107%; font-family: Arial, sans-serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Aesthetic、Packaging、Tolerance、Product</span></i> <span style="font-size: 10.0pt; line-height: 107%; font-family: Arial, sans-serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA; mso-bidi-font-style: italic;">和 <i>Software</i></span> <span style="font-size: 10.0pt; line-height: 107%; font-family: Arial, sans-serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">类</span>。使用分类功能，不同的组和身份组可以根据业务需求以不同方式使用同一个 Inspection Result 条目。</p>
<p class="Content_body">在本帮助页面中，我们将学习如何授予特定组/身份组 <i>创建</i>（即可添加）Inspection Result 条目的权限。有关使用基于类的<i>属性</i>和基于类的<i>表单</i>的详细信息，请参阅相关的 <span class="MsoHyperlink"><a href="#" class="internal-doc-link">类特定属性</a></span> 和 <span class="MsoHyperlink"><a href="#" class="internal-doc-link">类结构</a></span> 帮助页面。</p>
## 为 ItemType（物料类型）定义分类特定的创建权限
<p class="Content_body">为了解释分类特定的创建/可添加权限在 Aras Innovator 中的工作原理，我们将使用一个名为 <span class="glosstext" style="color: #000000;">Inspection Result</span> 的理论 ItemType（物料类型）。假设 <i><span style="font-size: 10.0pt; line-height: 107%; font-family: Arial, sans-serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Aesthetic、Packaging、Tolerance、Product</span></i> <span style="font-size: 10.0pt; line-height: 107%; font-family: Arial, sans-serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA; mso-bidi-font-style: italic;">和 <i>Software</i></span> <span style="font-size: 10.0pt; line-height: 107%; font-family: Arial, sans-serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">类</span> 已经添加完毕，以下是我们在其分类浏览器中将看到的内容。</p>
<p class="Content_body_indented"><img :src="'/aras-images/classtruck.jpg'"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
## <span class="glosstext" style="color: #000000; font-style: normal; font-weight: bold;">添加无类/类型限制的创建权限</span>
<p class="Content_body">创建权限在 ItemType（物料类型）窗口的 <b>可添加</b> 选项卡下分配。这是我们指定谁可以添加（即创建）此 ItemType（物料类型）实例的地方。在全新的 ItemType（物料类型）中进行任何分配之前，没有任何组或单独的身份组可以创建 Inspection Result，因为可添加列表为空。</p>
<p class="Content_body">下面 <i>Inspectors</i> 组身份组已被添加到可添加网格中，以允许 <i>Inspectors</i> 组的成员在数据库中创建记录。通过将分类列（最右侧）留空，组成员可以创建任何类类型的检查结果。换句话说，我们没有将 Inspectors 限制为任何一种 Inspection Results 的分类：</p>
<img height="645" :src="'/aras-images/inspectresult.jpg'" width="904"><br>
<!--?rh-list_end ?-->
## <span class="glosstext" style="font-style: normal; color: #000000; font-weight: bold;">将组/身份组限制为特定分类类型</span>
<p class="Content_body">在我们的用例中，还有两个额外的组参与检查 - <i>Aesthetics 和 Packaging</i>。我们需要允许这些组创建 <i>Inspection Results</i>，但只允许他们创建适当类类型的条目。这是通过在可添加行中指定 <span class="Bold">类路径</span> 来完成的。</p>
<p class="Content_body">此处，三个额外的组已被添加到可添加选项卡中，并且正确的分类已分配给每一行：</p>
<img height="685" :src="'/aras-images/inspectresult.jpg'" width="961"><br>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Content_body">保存后，这些组的成员将只能创建（或选择）已配置的类路径类型。请确保勾选可添加复选框。通过指定类路径，这些组将只能使用指定的子类型。更改将在保存 ItemType（物料类型）时提交。</p>
<p class="Content_body">再次提醒，请注意，如果未指定分类，该组/身份组将能够创建任何类型的结果。</p>
## <span class="glosstext" style="color: #000000; font-weight: bold; font-style: normal;">分类特定的"可添加"权限如何执行</span>
<p class="Content_body">当创建条目（即 Inspection Results）时，创建 Inspection Result 的用户将在分类选择窗口中仅获得<i>符合条件的选项</i>。通过这种方式，每个组"可添加"的仅是管理员为业务规则配置的分类。</p>
<p class="Content_body">请注意，在下面的窗口中，不符合条件的类选项显示为灰色且不可选择，这是 Aesthetic 组成员的情况。</p>
<p class="Content_body"><span class="glosstext" style="color: #000000; font-style: normal;">此用户属于 Aesthetics 组，因此仅被授权为 Inspection Results 选择 Aesthetic 类类型：</span></p>
<p class="Content_body_indented"><img :src="'/aras-images/aestheticclass.jpg'" style="cursor: nesw-resize;"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<!--?rh-list_start an="1" class="rl-p-Note" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Note_indented">注意：创建新条目时，在条目保存之前将显示通用表单：</p>
<!--?rh-list_end ?-->
<p class="Content_body_indented"><img :src="'/aras-images/inspresform.jpg'"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Content_body">保存条目后，表单和属性将刷新以反映为该类类型配置的属性和表单：</p>
<!--?rh-list_start class="Bullet_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<ul class="Disc">
<li class="Bulleted_list">根据配置，给定用户/组可能有多个可用选项。<br>
</li>
<li>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Bullet_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->由于用户可能属于多个组并拥有多个分类权限，因此无法按用户自动选择分类</li>
</ul>
<!--?rh-list_end ?-->
</div>

</div>
