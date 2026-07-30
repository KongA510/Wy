import type { ArasDocNode } from './aras-menu'

/**
 * 项目管理菜单数据
 * 复用 ArasDocNode 类型，与 Aras 文档共用 TreeNode 渲染组件
 * 结构：顶层 group → children 中放 { id, name, type:'item', path:'/pm/xxx' }
 *      对应 src/views/pm/ 下的独立 View 组件，由 PmDocView 动态加载
 */
export const pmMenu: ArasDocNode[] = [
  {
    id: 'pm-baseline',
    name: '项目基线快照',
    type: 'group',
    children: [
      { id: 'pm-full-tree', name: '完整获取项目树', type: 'item', path: '/pm/full-tree' }
    ]
  },
  {
    id: 'pm-template',
    name: '项目计划模板',
    type: 'group',
    children: [
      { id: 'pm-add-column', name: '添加列', type: 'item', path: '/pm/add-column' }
    ]
  },
  {
    id: 'pm-hours',
    name: '工时管理',
    type: 'group',
    children: [
      { id: 'pm-hours-impl', name: '实现方式', type: 'item', path: '/pm/hours-impl' },
      { id: 'pm-hours-guide', name: '功能说明', type: 'item', path: '/pm/hours-guide' }
    ]
  }
]