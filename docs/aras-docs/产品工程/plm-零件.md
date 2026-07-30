---
title: 零件
---

<div>
# 零件
<p class="Content_body">零件是任何 BOM（物料清单）管理应用的基本条目，可以是以下分类类型之一：组件、总成、材料或软件。Aras Innovator 系统管理员可根据需要扩展分类。零件可以是外购件或自制件。零件可以有替代件和替换件。零件可以关联物料清单（<a class="glossterm" data-rhwidget="ExpandSpot" data-target="glossary">BOM</a><span class="expanding-content" data-targetname="glossary"> </span>）、已批准的制造商清单（<a class="glossterm" data-rhwidget="ExpandSpot" data-target="glossary1">AML</a><span class="expanding-content" data-targetname="glossary1"> </span>）、已批准的供应商清单（<a class="glossterm" data-rhwidget="ExpandSpot" data-target="glossary2">AVL</a><span class="expanding-content" data-targetname="glossary2"> </span>）、关联文档列表（如图纸或规格书）以及其他许多选项。</p>
<p class="Content_body">以下是零件的基础数据模型。图中显示的每种关系将在其他主题中详细描述。</p>
<p class="Content_body_indented"><img alt="" class="Image" :src="'/aras-images/images/PartDataModel.jpg'"></p>

<p class="Content_body">上图中心是零件条目。沿树形结构向上，您可以看到一个零件（通常是顶层总成）会关联一个型号。一个<a href="#" class="internal-doc-link">产品</a>可以包含多个型号。以福特汽车公司为例，一个产品可以是客户购买的任何东西，如福特野马。其中一个型号可能是 GT，而该型号又与公司内部的特定零件相关联。</p>
<p class="Content_body">表示组件组合的零件与其他零件之间存在 BOM（物料清单）关系。例如，在野马 GT 父级零件中，BOM 可能包含发动机、车身、轮胎等子级零件。对于 BOM 关系中列出的每个子级零件，您可以定义用于该特定总成的替换件。如果父级零件是电气组件（如电路板），且其 BOM 子级零件包含电阻器等元件，则可以在实例零件中定义具体实例及其参考标识符。</p>
<p class="Content_body">每个零件可以有一个或多个替代件，其作用类似于替换件，但替代件适用于该零件被使用的所有总成。</p>
<p class="Content_body">每个零件可以关联一组文档，例如规格书、图纸、图表及其他文件。每个文档存储在特定文件中，该文件也附加到父级零件上。</p>
<p class="Content_body">如果零件是外购件，AML 存储对应的制造零件信息，包括生产该零件的制造商和销售该零件的供应商。当然，任何给定零件可能有多个制造商或供应商。</p>
<p class="Content_body">每个零件可以关联成本和重量目标。实际成本/重量可以被跟踪并与目标进行比较。目标也可以从 BOM 中"汇总"计算。</p>
<p class="Content_body">以下是零件创建的基本路径：</p>
<ol class="Decimal">
<li><a href="#" title="How to create a basic part" class="internal-doc-link">创建零件</a></li>
<li>
<p class="Content_body">为零件创建 <a href="#" style="background-color: transparent;" class="internal-doc-link">BOM</a></p>
</li>
<li>
<p class="Content_body">为零件创建<a href="#" class="internal-doc-link">替代件</a>列表</p>
</li>
<li>
<p class="Content_body">为零件创建 <a href="#" style="background-color: transparent;" class="internal-doc-link">AML</a></p>
</li>
<li>
<p class="Content_body">为零件创建<a href="#" class="internal-doc-link">文档</a>列表。</p>
</li>
<li>
<p class="Content_body">更新零件的设计和制造<a href="#" class="internal-doc-link">目标</a>。</p>
</li>
</ol>
<p class="Content_body">每个零件还关联一个生命周期，如下所示。</p>
<p class="Content_body_indented"><img :src="'/aras-images/Arasplm.jpg'"></p>

<p class="Content_body">对于零件，其生命周期由 <a class="glossterm" data-rhwidget="ExpandSpot" data-target="glossary3">ECN</a><span class="expanding-content" data-targetname="glossary3"> </span> 的工作流自动控制，前提是该零件出现在受影响条目列表中。零件首次创建时，会自动被赋予"初步"状态。要发布零件，请参阅变更管理手册中的<a href="#" class="internal-doc-link">ECN（工程变更通知）</a>。</p>

</div>
