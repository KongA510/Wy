/** 菜单节点 */
export interface MenuNode {
  /** 唯一标识 */
  id: string
  /** 显示名称 */
  label: string
  /** 图标 (Element Plus icon name 或 emoji) */
  icon?: string
  /** 描述 */
  description?: string
  /** 路由路径 */
  path?: string
  /** 子节点 */
  children?: MenuNode[]
}

/** 文章 */
export interface Article {
  /** 唯一标识 */
  id: string
  /** 标题 */
  title: string
  /** 摘要 */
  summary: string
  /** 内容 (Markdown 或 HTML) */
  content: string
  /** 所属分类 ID */
  categoryId: string
  /** 标签 */
  tags: string[]
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/** 分类卡片 */
export interface CategoryCard {
  /** 图标 */
  icon: string
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 路由路径 */
  path: string
}

/** 搜索结果 */
export interface SearchResult {
  id: string
  title: string
  category: string
  path: string
  description: string
}
