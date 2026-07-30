---
title: 关系与属性
---

<div>
<h1>关系与属性</h1>
<p class="Content_body">与所有数据建模的情况一样，实现同一件事有多种方式，有些方式可能更高效，有些则更灵活。例如，假设您希望在处理条目1时能够访问条目2的某个属性。实现这一目标的一种方式是在物料类型（ItemType）1和物料类型2之间创建关系，然后即可访问所有必要的属性。另一种方式是在物料类型1的定义中创建一个外部属性，引用条目2的必要属性。（<a href="#" class="internal-doc-link">参见外部数据类型</a>）以下是创建关系与使用外部属性的一些优缺点：</p>
<!--?rh-list_start class="Bullet_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 50px;">关系具有更大的灵活性，允许访问多个属性值，而不仅限于一个</p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Bullet_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 50px;">关系使得条目1的一个实例可以引用条目2的多个实例</p>
<!--?rh-list_end ?-->
<!--?rh-list_start class="Bullet_list" level="1" style="list-style: rh-list;
list-style: rh-list;" ?-->
<p class="Bulleted_list" style="margin-left: 50px;">外部属性比关系更高效，不需要在数据库中额外创建两张表</p>
<!--?rh-list_end ?-->

</div>
