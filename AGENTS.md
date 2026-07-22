# Kong.A Blog - 项目规范

## 技术栈

- **框架**: Vue 3 + TypeScript + Vite
- **UI 库**: Element Plus
- **路由**: Vue Router 4
- **搜索**: Fuse.js (模糊搜索)
- **代码高亮**: highlight.js
- **HTML 解析**: cheerio (构建时脚本)

## 项目结构

```
src/
├── types/index.ts              # 类型定义
├── data/
│   ├── menu.ts                 # 博客菜单数据 + 搜索索引
│   ├── aras-menu.ts            # Aras 文档菜单树 (自动生成，勿手动编辑)
│   └── aras-docs/              # Aras 文档内容 JSON (自动生成，勿手动编辑)
├── router/index.ts             # 路由配置
├── views/
│   ├── HomeView.vue            # 首页
│   ├── AboutView.vue           # 关于站长
│   ├── CategoryView.vue        # 分类卡片页
│   ├── ArticleView.vue         # 文章详情页
│   ├── ArasDocsIndex.vue       # Aras 文档目录页
│   └── ArasDocView.vue         # Aras 文档渲染页
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue       # 顶部导航栏
│   │   ├── AppSidebar.vue      # 侧边栏 (博客菜单 / Aras 文档树)
│   │   └── AppLayout.vue       # 布局容器
│   ├── SearchDialog.vue        # 搜索弹窗 (⌘K)
│   ├── CategoryCards.vue       # 分类卡片组件
│   └── TreeNode.vue            # 递归树节点组件
├── assets/styles/
│   └── doc-content.css         # 文档内容样式
└── scripts/
    └── extract-aras-docs.cjs   # Aras 文档提取脚本
```

## 新增文章/功能规范

### 铁律 1: 每个子菜单对应独立路由

每个子菜单项都是一个独立的路由页面。新增文章只需：
1. 在 `src/views/` 下创建对应的 `.vue` 文件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在 `src/data/menu.ts` 的 `menuData` 中添加菜单项

### 铁律 2: 菜单数据集中管理

所有菜单数据集中在 `src/data/menu.ts`，修改一处即可同步：
- 侧边栏菜单 (`AppSidebar.vue` 读取 `menuData`)
- 搜索索引 (`searchableItems` 自动从 `menuData` + `arasDocMenu` 构建)
- 分类卡片 (`categoryCardsMap`)

### 铁律 3: Aras 文档菜单自动生成

`src/data/aras-menu.ts` 和 `src/data/aras-docs/` 由脚本自动生成：
```bash
node scripts/extract-aras-docs.cjs
```
**禁止手动编辑**这两个路径下的文件。如需更新 Aras 文档，修改源 HTML 后重新运行脚本。

### 铁律 4: 新增功能检查清单

```
□ src/data/menu.ts — 添加菜单项 (含 icon, path, description)
□ src/router/index.ts — 添加路由配置
□ src/views/ — 创建对应的 View 组件
□ 若为 Aras 文档: 运行 extract-aras-docs.cjs 重新生成
□ 搜索自动同步 (无需额外操作)
```

## Git 规范

### 分支策略

- 主分支: `main`
- 功能分支: `codex/feature-name` 或 `feat/feature-name`
- 修复分支: `fix/bug-name`

### Commit 规范

使用 Conventional Commits 格式：

```
<type>(<scope>): <description>

[optional body]
```

**Type 类型:**
| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 样式调整 (不影响逻辑) |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `chore` | 构建/工具变更 |

**Scope 范围:**
- `menu` — 菜单/导航变更
- `router` — 路由变更
- `view` — 页面视图变更
- `component` — 组件变更
- `style` — 样式变更
- `data` — 数据/内容变更
- `aras` — Aras 文档相关
- `search` — 搜索功能
- `build` — 构建配置

**示例:**
```
feat(aras): 添加 Aras 文档中心，支持多级树形菜单
fix(search): 修复搜索结果无法跳转到 Aras 文档的问题
docs(menu): 更新前端技术板块菜单结构
style(doc): 优化代码块显示样式，添加复制按钮
chore(build): 添加 highlight.js 依赖
```

### 提交前检查

```bash
# 构建验证
npx vite build

# 开发服务器测试
npx vite --port 5173
```

## 常用命令

```bash
npm install                          # 安装依赖
npx vite --port 5173                 # 启动开发服务器
npx vite build                       # 生产构建
node scripts/extract-aras-docs.cjs   # 重新提取 Aras 文档
```

## 设计风格

```
简约白底 + 靛蓝强调色
- 主背景: #FFFFFF    侧边栏: #FAFBFC
- 主文字: #111827    辅助文字: #6B7280
- 强调色: #6366F1    悬停: #4F46E5
- 边框:   #E5E7EB    圆角: 8-12px
- 代码块: #1E1E2E (Catppuccin Mocha 风格)
```

## Aras 文档提取说明

源文档位于 `D:\博威\项目\ICS\ArasDocs\docs-zh\`，由 Adobe RoboHelp 生成。
提取脚本 (`scripts/extract-aras-docs.cjs`) 执行以下操作：
1. 解析 `whxdata/toc*.new.js` 构建完整菜单树
2. 读取每个 HTML 文件，使用 cheerio 提取正文内容
3. 清理 RoboHelp 样板代码 (script/style/header/copyright)
4. 输出菜单树到 `src/data/aras-menu.ts`
5. 输出文档内容到 `src/data/aras-docs/*.json`

## 图片资源说明

Aras 文档中的图片已复制到 `public/` 目录：
- `public/aras-images/` — docs-zh 用户/管理文档图片 (727+ 张)
- `public/aras-api-images/` — docs/zh API 文档图片 (19 张)

提取脚本会自动将 HTML 中的相对路径重写为：
- docs-zh 图片 → `/aras-images/xxx`
- docs/zh API 图片 → `/aras-api-images/xxx`

**如需更新图片**：重新从 ArasDocs 源目录复制到 public 对应目录。

## Aras 文档来源说明

| 目录 | 内容 | 路由前缀 | 菜单变量 |
|------|------|---------|---------|
| `ArasDocs/docs-zh/` | 用户手册 + 管理配置 (RoboHelp) | `/aras-docs/` | `arasDocMenu` |
| `ArasDocs/docs/zh/` | 客户端 API 文档 (Docusaurus) | `/aras-api/` | `arasApiMenu` |
| `ArasDocs/docs-js/` | 同 docs/zh 的英文版 | 未集成 | — |
| `ArasDocs/docs-api/` | API 搜索门户 | 未集成 | — |

## 文档提取统计

- docs-zh: **150 个菜单节点**, **116 篇文档** (含 16 个 book+url 节点)
- docs-api: **43 个菜单节点**, **35 篇文档**
- 图片引用: **448 + 19 = 467 个**, 全部正确重写
