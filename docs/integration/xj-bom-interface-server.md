---
title: BOM 核心服务 XJ_BOMInterfaceServer
---

<h1>BOM 核心服务 XJ_BOMInterfaceServer</h1>
<p>
<code>XJ_BOMInterfaceServer</code> 是 BOM 接口的<strong>核心业务方法</strong>，由入口方法
[<code>XJ_BOMInterface</code>](/integration/xj-bom-interface) 通过 <code>this.apply</code> 委托调用。
它解析请求 XML，按 <code>action</code> 分发到<strong>批量新增 / 逐条修改 / 批量删除</strong>三条处理链，
最终合并为一段 AML 一次性执行；纸格图片栏位会先上传文件再回填关联。
</p>

<a href="/integration-source/XJ_BOMInterfaceServer.txt" download="XJ_BOMInterfaceServer.txt" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;margin:8px 0;background:#6366F1;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;">📥 下载源码：XJ_BOMInterfaceServer.txt</a>

<blockquote>
<p><strong>说明</strong>：本方法源码在原始导出文件中部分符号丢失，此处提供的是按逻辑<strong>重建还原</strong>后的可编译版本，已收录于可下载源码。</p>
</blockquote>

<h2>一、action 分发</h2>
<table>
<thead><tr><th>action</th><th>处理方法</th><th>说明</th></tr></thead>
<tbody>
<tr><td>add</td><td>HandleBomAdd</td><td>批量新增，需 source_id，合并为单段 AML 执行</td></tr>
<tr><td>edit</td><td>HandleBomEdit</td><td>逐条修改，每个 Item 必须带 id，按 edit_property 指定字段</td></tr>
<tr><td>delete</td><td>HandleBomDelete</td><td>按 type_name + id 批量删除</td></tr>
</tbody>
</table>
<p><code>type_name</code> 逗号分隔，有效值为 <code>XJ_Valuation_Part</code>、<code>XJ_Valuation_Part_List</code>，可同时传两个。</p>

<h2>二、XJ_Valuation_Part 字段</h2>
<table>
<thead><tr><th>字段名</th><th>标签</th><th>数据类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>source_id</td><td>源对象</td><td>String</td><td>关联源对象 ID</td></tr>
<tr><td>xj_cad</td><td>材料类型</td><td>List</td><td>有效值见下方有效值表</td></tr>
<tr><td>xj_knife_usage</td><td>排刀用量</td><td>Float</td><td>浮点数</td></tr>
<tr><td>xj_part</td><td>物料名称</td><td>Item</td><td>需传入 PLM 中已存在的 Item ID</td></tr>
<tr><td>xj_quantity</td><td>数量</td><td>Float</td><td>浮点数</td></tr>
</tbody>
</table>

<h2>三、XJ_Valuation_Part_List 字段</h2>
<table>
<thead><tr><th>字段名</th><th>标签</th><th>数据类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td>source_id</td><td>源对象</td><td>String</td><td>关联源对象 ID</td></tr>
<tr><td>xj_cad</td><td>材料类型</td><td>List</td><td>有效值见下方有效值表</td></tr>
<tr><td>xj_color</td><td>色名</td><td>Item</td><td>需传入 PLM 中已存在的 Item ID</td></tr>
<tr><td>xj_customer</td><td>客供</td><td>Boolean</td><td>只能传入 0 或 1</td></tr>
<tr><td>xj_knife_usage</td><td>排刀用量</td><td>Float</td><td>浮点数</td></tr>
<tr><td>xj_number_of_cuts</td><td>刀数</td><td>Float</td><td>浮点数</td></tr>
<tr><td>xj_occupation_width</td><td>占用宽度</td><td>Float</td><td>浮点数</td></tr>
<tr><td>xj_occupied_length</td><td>占用长度</td><td>Float</td><td>浮点数</td></tr>
<tr><td>xj_paper_grid_image</td><td>纸格图片</td><td>Image</td><td>传入文件路径，系统自动上传</td></tr>
<tr><td>xj_part</td><td>物料编码</td><td>Item</td><td>需传入 PLM 中已存在的 Item ID</td></tr>
<tr><td>xj_part_name</td><td>部位名称</td><td>String</td><td>文本</td></tr>
<tr><td>xj_partname</td><td>品名</td><td>String</td><td>文本</td></tr>
<tr><td>xj_price</td><td>单价</td><td>Float</td><td>浮点数</td></tr>
<tr><td>xj_quantity</td><td>数量</td><td>Integer</td><td>整数</td></tr>
<tr><td>xj_remark</td><td>备注</td><td>Text</td><td>文本</td></tr>
<tr><td>xj_secondary_process</td><td>二次加工</td><td>String</td><td>文本</td></tr>
<tr><td>xj_secondary_vendor</td><td>二次加工厂商</td><td>String</td><td>文本</td></tr>
<tr><td>xj_shipment</td><td>出货地</td><td>List</td><td>列表值</td></tr>
<tr><td>xj_vendor</td><td>厂商</td><td>Item</td><td>需传入 PLM 中已存在的 Item ID</td></tr>
<tr><td>xj_width</td><td>幅宽</td><td>Float</td><td>浮点数</td></tr>
</tbody>
</table>

<h2>四、xj_cad 材料类型有效值</h2>
<table>
<thead><tr><th>标签</th><th>值</th><th>标签</th><th>值</th></tr></thead>
<tbody>
<tr><td>主材料</td><td>M</td><td>免扣帶</td><td>B</td></tr>
<tr><td>副材料</td><td>A</td><td>包邊</td><td>T</td></tr>
<tr><td>襯裡</td><td>I</td><td>五金</td><td>H</td></tr>
<tr><td>拉鏈</td><td>Z</td><td>印刷</td><td>P</td></tr>
<tr><td>布帶</td><td>C</td><td>車線</td><td>L</td></tr>
<tr><td>鬆緊帶</td><td>E</td><td>刺繡</td><td>S</td></tr>
<tr><td>管條</td><td>W</td><td>其他</td><td>O</td></tr>
</tbody>
</table>

<h2>五、关键代码</h2>
<h3>5.1 参数提取、校验与分发</h3>
<p>从请求 XML 根节点提取 <code>action</code>、<code>source_id</code>、<code>type_name</code> 等参数；<code>type_name</code> 拆分后校验非空且每个值合法，最后按 <code>action</code> 分发。</p>

```csharp
{{ dispatchCode }}
```


    <h3>5.2 批量新增 HandleBomAdd</h3>
    <p>按字段白名单遍历每个数据节点拼装 <code>&lt;Item action='add'&gt;</code>，所有 Item 合并进一段 <code>&lt;AML&gt;</code> 一次性执行（任一失败整体失败）。<code>xj_paper_grid_image</code> 为文件栏位，先调用 <code>UploadFileToAras</code> 上传取得 File ID 再回填；其余字段统一经 <code>SecurityElement.Escape</code> 转义防注入。</p>
    
```csharp
{{ addCode }}
```


<h3>5.3 文件上传 UploadFileToAras</h3>
<p>通过 Aras 标准 <code>File</code> ItemType 的 <code>attachPhysicalFile</code> 上传共享路径下的物理文件，成功后返回 <code>vaultfileId=</code> 前缀的关联值。</p>

```csharp
{{ uploadCode }}
```


    <h2>六、实现要点</h2>
    <ul>
      <li><strong>字段白名单</strong>：add 仅接受预定义字段数组（<code>partFields</code> / <code>partListFields</code>），杜绝任意字段写入。</li>
      <li><strong>单段 AML 批量</strong>：多条 Item 合并为一个 <code>applyAML</code> 调用，减少往返；新增失败抛异常由入口统一兜底。</li>
      <li><strong>edit 必须带 id</strong>：修改/删除均通过 <code>where="{typeName}.id='{itemId}'"</code> 精确定位，缺 id 直接返回 400。</li>
      <li><strong>XML 转义防注入</strong>：所有文本值经 <code>System.Security.SecurityElement.Escape</code> 处理后再拼入 AML。</li>
      <li><strong>文件先传后填</strong>：图片栏位上传失败立即返回 400，避免产生无图片的脏数据。</li>
      <li><strong>全程日志</strong>：add/edit/delete 各分支成功与失败均写 <code>XJ_Interface_Log</code>。</li>
    </ul>
