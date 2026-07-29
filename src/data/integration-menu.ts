import type { ArasDocNode } from './aras-menu'

/**
 * 客户集成菜单数据
 * 复用 ArasDocNode 类型，与 Aras 文档共用 TreeNode 渲染组件
 *
 * 组织结构：顶层 group 按「客户」划分，未来新增客户时追加新的 group 即可。
 * 每个 group 的 children 放 { id, name, type:'item', path:'/integration/xxx' }，
 * 对应 src/views/integration/ 下的独立 View 组件，由 IntegrationDocView 动态加载。
 *
 * 祥记（XJ_ 前缀）：博克裁片/估算成本系统 ↔ Aras PLM 集成接口
 */
/** 客户元信息：slug 用于路由 /integration/customer/:slug，icon/description 用于卡片与侧边栏 */
export interface CustomerMeta { slug: string; icon: string; description: string }
export const customerMeta: Record<string, CustomerMeta> = {
  'xj-plm': {
    slug: 'xj',
    icon: '🏭',
    description: '博克 CAD/CAM 裁片与估算成本系统 ↔ Aras PLM 双向集成（物料分类 / 部位编码 / BOM 抛转）'
  }
}

/** 接口文档元信息：用于客户详情页卡片展示 */
export interface DocMeta { icon: string; description: string }
export const docMeta: Record<string, DocMeta> = {
  'xj-overview': { icon: '🧭', description: '认证机制、统一返回格式、接口日志、接口地址规则等集成通用约定' },
  'xj-get-class-structure': { icon: '🗂️', description: '查询 Part 的 class_structure，递归返回多级物料分类树' },
  'xj-get-body-part-code': { icon: '🔖', description: '查询 XJ_Body_Part_Code，返回部位编码 → 名称键值对' },
  'xj-bom-interface': { icon: '🚪', description: 'BOM 接口入口：权限提升、委托核心服务、统一异常与日志' },
  'xj-bom-interface-server': { icon: '⚙️', description: 'BOM 核心服务：add/edit/delete 批量 AML，含文件上传' }
}

export const integrationMenu: ArasDocNode[] = [
  {
    id: 'xj-plm',
    name: '祥记 PLM 集成',
    type: 'group',
    path: '/integration/customer/xj',
    children: [
      { id: 'xj-overview', name: '集成总览', type: 'item', path: '/integration/xj-overview' },
      { id: 'xj-get-class-structure', name: '获取物料分类 XJ_GetClassStructure', type: 'item', path: '/integration/xj-get-class-structure' },
      { id: 'xj-get-body-part-code', name: '获取部位编码 XJ_GetBodyPartCode', type: 'item', path: '/integration/xj-get-body-part-code' },
      { id: 'xj-bom-interface', name: 'BOM 接口入口 XJ_BOMInterface', type: 'item', path: '/integration/xj-bom-interface' },
      { id: 'xj-bom-interface-server', name: 'BOM 核心服务 XJ_BOMInterfaceServer', type: 'item', path: '/integration/xj-bom-interface-server' }
    ]
  }
]
