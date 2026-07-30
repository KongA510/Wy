---
title: 输入 ItemType 属性
---

<div>
<h1>输入 ItemType 属性</h1>
<p class="Content_body">ItemType 表单中的属性选项卡包含了该条目的所有属性，包括系统属性。点击 ItemType 表单中的"属性"选项卡，您将看到类似以下的内容：</p>
<p class="Content_body_indented"><img :src="'/aras-images/program2.jpg'"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Content_body">当您创建一个新属性时，会在属性网格中创建一行新记录，随后需要由用户填写相应的值。</p>
<p class="Procedure_Title">创建属性</p>
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<ol style="list-style-type: decimal;">
<li class="Numbered" style="margin-left: 50px;">
<p class="Content_body">打开 ItemType 并点击 <img :src="'/aras-images/edit.jpg'">。该 ItemType 将被您锁定，这意味着其他人无法编辑它。</p>
</li>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<li class="Numbered" style="margin-left: 50px;">
<p class="Content_body">点击<strong>属性</strong>选项卡。</p>
</li>
<li class="Numbered" style="margin-left: 50px;">
<p class="Content_body">点击<strong>添加行</strong>图标 <img :src="'/aras-images/addrow.jpg'">。网格底部将添加一行新记录。</p>
</li>
<li class="Numbered" style="margin-left: 50px;">
<p class="Content_body">根据需要为每列输入相应的值。有关每列含义的说明，请参阅下表。</p>
</li>
</ol>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<!--?rh-list_start class="Numbered_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<!--?rh-list_end ?-->
<table cellspacing="0" class="Aras_Blue" style="left: 0px; top: 883px; height: 623px;">
<tbody>
<tr class="t1st">
<td style="border: Solid 1px #c0c0c0;">
<p class="Table_header">列名</p>
</td>
<td style="border-top: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_header">说明</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Name（名称）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">属性的唯一内部名称</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Label（标签）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">属性在条目表单和网格中显示的名称标签</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Data Type（数据类型）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">确定属性的数据类型，例如 String（字符串）、List（列表）等。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Data Source（数据源）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">如果属性的数据类型为 List（列表）、Sequence（序列）、Item（条目）或其他需要信息源来接收数据的数据类型，则在此处指定数据源。数据源的类型取决于数据类型。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Length（长度）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">String（字符串）数据类型的最大字符数。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Precision（精度）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">对于数据类型为"Decimal（小数）"的属性，精度用于设置小数点左右两侧的总位数。例如，如果 Decimal 属性 A 的精度设置为 5，则 A 的有效值可以是：12345、12.345、1234.5 等。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Scale（小数位数）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">用于设置数据类型为"Decimal（小数）"时小数点右侧的位数。例如，如果 Decimal 属性 A 的精度设置为 5，小数位数设置为 2，则有效值为：123.45、12.45、12.40</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Required（必填）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">布尔值。勾选后表示该属性的值不能为空。对于数据类型为 Text（文本）的属性，目前在设置和重置 Required 值时有特殊的处理方式。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Unique（唯一）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">如果设为 true，则该属性的值在此 ItemType 的所有条目实例中必须唯一。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Indexed（索引）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">如果设为 true，表示数据库表将对此属性建立索引，以提高针对该属性的频繁搜索的性能。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Federated（联合）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">此属性的值将由自定义方法（Method）从 Innovator 外部提供。数据应与属性的数据类型匹配，以便进行设置和显示。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Hidden（隐藏）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">如果设为 true，则此属性将不会显示在条目的任何属性网格中。例如，当从目录（TOC）中选择 ItemType 时，会显示其中一个属性网格。</p>
<p class="Content_body_indented"><img :src="'/aras-images/hidden.jpg'"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Table_Body">上图中可以看到未被隐藏的属性。其余属性（如系统属性）不会显示在网格中。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Hidden2（隐藏2）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">如果设为 true，则此属性将不会出现在关系网格中。例如，查看 Part（零件）ItemType。请注意，唯一未将 Hidden2 设为 true 的属性（在 Hidden2 搜索条件中输入 0 进行搜索）为：</p>
<p class="Content_body_indented"><img :src="'/aras-images/hidden2.jpg'"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Table_Body">当创建 Part 实例并显示 BOM 选项卡时，请注意只有这些属性（以及一些 BOM 关系属性，如 Sequence（序列）、Quantity（数量）和 Reference Designator（参考标识符））是可见的：</p>
<p class="Content_body_indented"><img :src="'/aras-images/partbom5.jpg'"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Alignment（对齐）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">确定值在网格单元格中的对齐方式。可选值为 Left（左对齐）、Right（右对齐）或 Center（居中对齐）。默认为左对齐。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Width（宽度）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">确定属性网格中列的宽度（以像素为单位）。在下面的示例中，Length 列的宽度设置为 30，而其余列的宽度为 100。</p>
<p class="Content_body_indented"><img :src="'/aras-images/length.jpg'"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Sort Order（排序顺序）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">整数值用于控制搜索网格显示中列的相对位置，值较小的列排在左侧。例如，GeometricShape 属性 Classification、Color 和 Radius 的设置如下：</p>
<img :src="'/aras-images/sortorder.jpg'">
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Table_Body">结果在主条目网格中显示如下：</p>
<p class="Content_body_indented"><img alt="" border="0" height="229" :src="'/aras-images/image814.gif'" style="border: none;" width="643"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Keyed Name Order（键名排序）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">键名（Keyed Name）是系统消息中用于引用条目的名称，通常是条目的标签或名称。如果未为 ItemType 指定键名，则将使用唯一的内部名称。您可以根据需要连接任意数量的属性值，以便以有意义的方式标识条目。用于键名的属性必须为其分配顺序编号。例如，假设您有一个 Employee（员工）条目，其中包含 Firstname（名字）和 Lastname（姓氏）属性。在 Firstname 字段中设置键名顺序值为 1，在 Lastname 字段中设置为 2，则生成的键名格式为"John Jones"。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Order By（排序依据）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body"><a id="OrderBy" name="OrderBy"></a>控制主条目网格中显示条目的排序顺序（从上到下），无论是手动搜索还是自动搜索后。Order By 值最小的属性优先控制排序。例如，如果您希望按姓氏再按名字对员工进行排序，则 Lastname 属性的 Order By 值应为 1，Firstname 属性的 Order By 值应为 2。以下是一个名为 Employees 的 ItemType 示例，请注意每个属性都有 Order By 值。</p>
<p class="Content_body_indented"><img height="133" :src="'/aras-images/orderprops.jpg'" width="770"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Table_Body">以下是按上述属性设置排序的几位员工的示例：</p>
<p class="Content_body_indented"><img alt="" border="0" :src="'/aras-images/image816.gif'" style="border: none;"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
<p class="Table_Body">请注意，姓氏（Last Name）是第一排序条件，然后在相同姓氏的所有成员中，Innovator 按名字（Order By = 20）进行排序。接着，在相同姓氏和名字的成员中，Innovator 按社保号码（SS Number）进行排序。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Default Value（默认值）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">当未给出值时使用的属性默认值。空白表示 Null 值。有时为必填属性设置默认值是一个好做法。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Default Search（默认搜索）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">当用户进入主条目页面时，通常会执行搜索，或自动执行搜索（如果勾选了 Auto Search 属性）。Default Search 属性的值将作为搜索条件输入，显示在网格上方的蓝色行中。例如，如果在 GeometricShape 中，我们在 Name 属性的 Default Search 列中输入 *cir*，那么当访问主 GeometricShape 页面并执行搜索时，结果如下所示。请注意，Default Search 值出现在指定属性的蓝色行中。</p>
<p class="Content_body_indented"><img alt="" border="0" :src="'/aras-images/image818.gif'" style="border: none;"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;
list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Pattern（模式）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">此项仅适用于 String（字符串）类型或 Filtered List（筛选列表）类型的属性。</p>
<p class="Table_Body">在以前的版本中，Pattern 用于格式化 Date（日期）类型的属性，但日期格式化现在是<a href="#" class="internal-doc-link">国际化和本地化</a>的一部分。</p>
<p class="Table_Body">如果属性类型为 String（字符串），则模式将遵循基本的正则表达式语法。这些模式用于服务器端的数据验证，应适用于电话号码、电子邮件地址或社会安全号码等字段。例如，对于电话号码，您可以使用以下模式：\d{3}-\d{3}-\d{4}。</p>
<p class="Table_Body">如果属性类型为 Filtered List（筛选列表），则 Pattern 是指向定义筛选器的属性的指针。有关更多信息，请参阅筛选列表。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Foreign Property（外部属性）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">此字段基本上是回显为另一个条目定义的属性值。要求已定义另一个属性（设为属性 A），其类型为 Item（条目）。然后，外部属性可以引用由属性 A 定义的条目的任何属性。保存 ItemType 定义时，此字段也会自动填充。</p>
<p class="Table_Body">例如，假设您想为 Part（零件）创建 ItemType 定义。您希望将工程技术规范与每个 Part 实例关联。因此，对于 Part ItemType 定义，您可以创建一个名为 Specification Document（规格文档）的属性，其类型为 Item（条目），数据源为 Document（文档）。然后，您可以创建另一个名为 Spec ID（规格编号）的属性，类型为 Foreign（外部），其数据源指向 Document 的 Name 属性。保存 Part 的 ItemType 定义后，您应该能看到 name 出现在 Foreign Property 字段中。有关更多示例和工作原理的定义，请参阅 <a href="#" class="internal-doc-link">Foreign</a> 数据类型。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Item Behavior（条目行为）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">对于数据类型 = Item（条目）且目标条目可版本控制的属性，Item Behavior 指定为 Fixed（固定）或 Float（浮动）。Fixed 表示此属性指向目标条目的特定版本，即使创建了更新的版本也是如此。Float 表示此属性指向目标条目的最新版本。</p>
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Class Path（类路径）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">如果条目具有类结构，您可以指定此属性所属的子类。所选子类以下的所有子类也将继承此属性。如果未指定子类，则假定该属性属于父 ItemType。有关更多信息，请参阅<a href="#" class="internal-doc-link">类结构</a>。要插入属性的类路径，只需点击此单元格。将显示类结构对话框（如下所示）。选择此属性所属的子类节点。点击绿色勾选标记 <img alt="" border="0" :src="'/aras-images/image819.gif'" style="border: none;"> 完成选择。</p>
<p class="Content_body_indented"><img alt="" border="0" :src="'/aras-images/image820.gif'" style="border: none;"></p>
<!--?rh-list_start level="1" an="1" class="rl-p-Figure_indented" style="list-style: rh-list;" ?-->

<!--?rh-list_end ?-->
</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Tooltip（工具提示）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">

</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Help Text（帮助文本）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">

</td>
</tr>
<tr>
<td style="border-left: Solid 1px #c0c0c0; border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">
<p class="Table_Body">Track History（跟踪历史）</p>
</td>
<td style="border-right: Solid 1px #c0c0c0; border-bottom: Solid 1px #c0c0c0;">

</td>
</tr>
</tbody>
</table>

</div>
