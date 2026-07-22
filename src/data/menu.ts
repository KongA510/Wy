import type { MenuNode, CategoryCard, SearchResult } from '../types'
import { arasDocMenu } from './aras-menu'
import type { ArasDocNode } from './aras-menu'

export const menuData: MenuNode[] = [
  { id: 'home', label: '首页', icon: 'HomeFilled', path: '/', description: '博客首页，总览所有板块' },
  { id: 'aras-docs', label: 'Aras 文档', icon: 'Monitor', path: '/aras-docs', description: 'Aras Innovator 系统管理文档，164 篇' },
  {
    id: 'frontend', label: '前端技术', icon: 'ChromeFilled', description: '前端开发技术栈学习笔记',
    children: [
      { id: 'fe-vue', label: 'Vue.js', icon: 'Promotion', path: '/frontend/vue', description: 'Vue 3 组合式 API、Pinia、Router 等' },
      { id: 'fe-ts', label: 'TypeScript', icon: 'EditPen', path: '/frontend/typescript', description: 'TypeScript 类型系统、泛型、工具类型' },
      { id: 'fe-css', label: 'CSS / 样式', icon: 'Brush', path: '/frontend/css', description: 'CSS 布局、动画、Tailwind、SCSS' },
      { id: 'fe-tools', label: '工程化工具', icon: 'SetUp', path: '/frontend/tools', description: 'Vite、Webpack、ESLint、Prettier 等' }
    ]
  },
  {
    id: 'backend', label: '后端技术', icon: 'Platform', description: '后端开发技术栈学习笔记',
    children: [
      { id: 'be-dotnet', label: '.NET / C#', icon: 'Coin', path: '/backend/dotnet', description: '.NET 生态、C# 语言特性、ASP.NET' },
      { id: 'be-db', label: '数据库', icon: 'Coin', path: '/backend/database', description: 'SQL Server、EF Core、数据库设计' },
      { id: 'be-api', label: 'API 设计', icon: 'Share', path: '/backend/api-design', description: 'RESTful API 设计原则与实践' }
    ]
  },
  {
    id: 'notes', label: '日常笔记', icon: 'Notebook', description: '日常学习、工作随笔',
    children: [
      { id: 'note-daily', label: '工作日志', icon: 'Calendar', path: '/notes/daily', description: '每日工作记录与复盘' },
      { id: 'note-reading', label: '读书笔记', icon: 'Reading', path: '/notes/reading', description: '技术书籍阅读笔记与心得' },
      { id: 'note-thoughts', label: '随想杂谈', icon: 'ChatDotRound', path: '/notes/thoughts', description: '技术思考、行业观察、个人感悟' }
    ]
  },
  { id: 'about', label: '关于站长', icon: 'UserFilled', path: '/about', description: '关于 Kong.A 的个人简介' }
]

export const categoryCardsMap: Record<string, CategoryCard[]> = {
  frontend: [
    { icon: '💚', title: 'Vue.js', description: 'Vue 3 组合式 API、响应式系统、组件设计模式', path: '/frontend/vue' },
    { icon: '🔷', title: 'TypeScript', description: '类型体操、泛型编程、声明文件编写', path: '/frontend/typescript' },
    { icon: '🎨', title: 'CSS / 样式', description: 'Flexbox、Grid、动画、CSS 变量、预处理器', path: '/frontend/css' },
    { icon: '🛠️', title: '工程化工具', description: 'Vite 配置、构建优化、代码规范工具链', path: '/frontend/tools' }
  ],
  backend: [
    { icon: '🟣', title: '.NET / C#', description: 'C# 新特性、LINQ、异步编程、依赖注入', path: '/backend/dotnet' },
    { icon: '🗄️', title: '数据库', description: 'SQL 优化、EF Core 映射、数据库设计规范', path: '/backend/database' },
    { icon: '🌐', title: 'API 设计', description: 'RESTful 规范、接口版本管理、文档生成', path: '/backend/api-design' }
  ],
  notes: [
    { icon: '📝', title: '工作日志', description: '每日工作记录、问题追踪、经验复盘', path: '/notes/daily' },
    { icon: '📖', title: '读书笔记', description: '技术书籍精华摘录与个人理解', path: '/notes/reading' },
    { icon: '💭', title: '随想杂谈', description: '技术趋势观察、学习方法论、个人感悟', path: '/notes/thoughts' }
  ]
}

export const searchableItems: SearchResult[] = []

function buildSearchIndex(nodes: MenuNode[], parentLabel = '') {
  for (const node of nodes) {
    const category = parentLabel || node.label
    if (node.path) searchableItems.push({ id: node.id, title: node.label, category, path: node.path, description: node.description || '' })
    if (node.children) buildSearchIndex(node.children, node.label)
  }
}
buildSearchIndex(menuData)

function buildArasSearchIndex(nodes: ArasDocNode[], parentLabel = '') {
  for (const node of nodes) {
    const category = parentLabel ? `${parentLabel} > ${node.name}` : node.name
    if (node.type === 'item' && node.path) {
      searchableItems.push({ id: 'aras-' + node.id, title: node.name, category, path: node.path, description: `Aras 文档 - ${category}` })
    }
    if (node.children) buildArasSearchIndex(node.children, category)
  }
}
buildArasSearchIndex(arasDocMenu)
