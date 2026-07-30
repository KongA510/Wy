import type { ArasDocNode } from './aras-menu'

/**
 * Aras 开发手册菜单
 * 复用 ArasDocNode 类型，与项目管理共用 TreeNode 渲染组件
 * 内容涵盖 Aras Innovator 服务端开发核心知识
 * 面向版本：2025R / R37+
 */
export const arasDevMenu: ArasDocNode[] = [
  {
    id: 'aras-dev-iom',
    name: 'IOM 核心对象',
    type: 'group',
    children: [
      { id: 'aras-dev-iom-overview', name: 'IOM 总览与架构', type: 'item', path: '/aras-dev/iom-overview' },
      { id: 'aras-dev-innovator', name: 'Innovator 对象 API', type: 'item', path: '/aras-dev/innovator-api' },
      { id: 'aras-dev-item', name: 'Item 对象 API', type: 'item', path: '/aras-dev/item-api' },
      { id: 'aras-dev-arasbody', name: 'XML Body 构造', type: 'item', path: '/aras-dev/body-builder' }
    ]
  },
  {
    id: 'aras-dev-methods',
    name: '服务端方法 (Method)',
    type: 'group',
    children: [
      { id: 'aras-dev-method-types', name: 'Method 类型与代码模板', type: 'item', path: '/aras-dev/method-types' },
      { id: 'aras-dev-server-events', name: 'Server Event 事件体系', type: 'item', path: '/aras-dev/server-events' },
      { id: 'aras-dev-call-method', name: '客户端→服务端调用', type: 'item', path: '/aras-dev/call-method' }
    ]
  },
  {
    id: 'aras-dev-aml',
    name: 'AML 查询语言',
    type: 'group',
    children: [
      { id: 'aras-dev-aml-syntax', name: 'AML 语法与结构', type: 'item', path: '/aras-dev/aml-syntax' },
      { id: 'aras-dev-aml-actions', name: 'AML 操作 (CRUD)', type: 'item', path: '/aras-dev/aml-actions' },
      { id: 'aras-dev-aml-advanced', name: 'AML 高级查询', type: 'item', path: '/aras-dev/aml-advanced' }
    ]
  },
  {
    id: 'aras-dev-security',
    name: '安全与权限',
    type: 'group',
    children: [
      { id: 'aras-dev-perm-model', name: '权限模型与 Identity', type: 'item', path: '/aras-dev/perm-model' },
      { id: 'aras-dev-perm-code', name: '权限提升代码模板', type: 'item', path: '/aras-dev/perm-code' }
    ]
  },
  {
    id: 'aras-dev-query',
    name: '查询相关',
    type: 'group',
    children: [
      { id: 'aras-dev-aml-pagination', name: 'AML 分页查询', type: 'item', path: '/aras-dev/aml-pagination' }
    ]
  },
  {
    id: 'aras-dev-practice',
    name: '开发规范与最佳实践',
    type: 'group',
    children: [
      { id: 'aras-dev-best-practice', name: '服务端开发规范', type: 'item', path: '/aras-dev/best-practice' },
      { id: 'aras-dev-debug', name: '调试与排错', type: 'item', path: '/aras-dev/debug' },
      { id: 'aras-dev-examples', name: '常用代码片段', type: 'item', path: '/aras-dev/examples' }
    ]
  }
]
