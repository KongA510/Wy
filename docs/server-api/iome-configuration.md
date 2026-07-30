---
title: 配置构建器
---

<h1>配置构建器</h1>
<blockquote><p><strong>IOME 文件操作前的配置构建工具。</strong>用于在签入/签出前构建文件的目标 Item 配置和关联结构。命名空间：Aras.IOME，程序集：IOM.dll（15.0.1）。</p></blockquote>

<h2>一、类型定义</h2>

```csharp
// IItemConfigurationBuilder — Item 配置构建器接口
public interface IItemConfigurationBuilder
{
    // 构建单个 Item 的文件配置
    ItemConfiguration Build(Item item);
}

// MultiParentConfigurationBuilder — 多父项配置构建器
// 用于文件关联到多个父 Item 的场景（如一个文件属于多个 BOM）
public class MultiParentConfigurationBuilder : IItemConfigurationBuilder
{
    public MultiParentConfigurationBuilder()

    // 添加父 Item
    public void AddParentItem(Item parentItem)
    // 构建包含所有父项关联的配置
    public ItemConfiguration Build(Item item)
}

// ItemConfiguration — 构建结果
public class ItemConfiguration
{
    public Item TargetItem { get; set; }              // 目标 Item
    public IReadOnlyList<Item> ParentItems { get; set; } // 父项列表
}
```


<h2>二、代码示例</h2>

```csharp
using Aras.IOM;
using Aras.IOME;

var inn = IomFactory.CreateInnovator();
inn.Login(/* ... */);

// ===== 单父项签入（常规场景） =====
var checkinMgr = new CheckinManager(inn);
var partItem = inn.getItemById("Part", "partId");

// 默认配置 — 文件直接关联到该 Part
await checkinMgr.CheckinAsync(partItem);

// ===== 多父项签入 — 文件关联到多个父 Item =====
// 场景：一个 CAD 文件同时用于多个 Part
var multiBuilder = new MultiParentConfigurationBuilder();

// 添加多个父项
var parent1 = inn.getItemById("Part", "P-001");
var parent2 = inn.getItemById("Part", "P-002");
var parent3 = inn.getItemById("Part", "P-003");

multiBuilder.AddParentItem(parent1);
multiBuilder.AddParentItem(parent2);
multiBuilder.AddParentItem(parent3);

// 构建配置
var fileItem = inn.newItem("File", "add");
fileItem.setProperty("filename", "assembly.step");

var config = multiBuilder.Build(fileItem);

// 配置中包含 3 个父项关联
Console.WriteLine($"父项数量: {config.ParentItems.Count}");

// 使用配置签入
// checkinMgr 内部使用此配置来创建多个关系连接
await checkinMgr.CheckinAsync(config.TargetItem);

// ===== 自定义配置构建器 =====
public class CustomConfigurationBuilder : IItemConfigurationBuilder
{
    private readonly Innovator _inn;

    public CustomConfigurationBuilder(Innovator inn)
    {
        _inn = inn;
    }

    public ItemConfiguration Build(Item item)
    {
        // 根据 item 类型查找相关父项
        var relatedFile = _inn.newItem("File", "get");
        relatedFile.setProperty("id", item.getID());
        relatedFile.setAttribute("select", "id,filename,source_id");

        // 查找所有引用此文件的 Part
        // ... 复杂的业务逻辑 ...

        var config = new ItemConfiguration
        {
            TargetItem = item
            // ParentItems = ...
        };

        return config;
    }
}
```


<h2>三、实践笔记</h2>
<ul>
<li><strong>多父项场景：</strong>CAD 装配体中一个零件文件可能属于多个装配体，MultiParentConfigurationBuilder 处理这种 n:m 关系</li>
<li><strong>接口扩展：</strong>实现 IItemConfigurationBuilder 接口可插入自定义配置逻辑</li>
<li><strong>配置与事件独立：</strong>配置构建过程与签入/签出事件体系无关，在操作前同步完成</li>
</ul>

<p><strong>参考：</strong></p>
<ul><li><a href="http://10.7.44.28/ICS50/Client/WebHelp/APIReferenceDotNet/Html/html/N_Aras_IOME.htm">Aras.IOME Namespace</a></li></ul>
