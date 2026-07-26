import type { ArasDocNode } from './aras-menu'

/**
 * Aras 客户端文档菜单
 * 来源：Aras Innovator Client Documentation (Docusaurus)
 * 版本：std_14.37.0.44844-X (ICS50)
 * 内容涵盖客户端 JS API、CUI 引擎、Web Components、仪表板等
 */
export const arasClientMenu: ArasDocNode[] = [
  {
    id: 'aras-client-overview',
    name: '概述',
    type: 'group',
    children: [
      { id: 'aras-client-intro', name: '快速入门', type: 'item', path: '/aras-client/intro' },
      { id: 'aras-client-dev-principles', name: '开发原则', type: 'item', path: '/aras-client/dev-principles' },
      { id: 'aras-client-project-structure', name: '项目结构', type: 'item', path: '/aras-client/project-structure' }
    ]
  },
  {
    id: 'aras-client-core-api',
    name: '核心 API',
    type: 'group',
    children: [
      { id: 'aras-client-api-overview', name: 'API 概览', type: 'item', path: '/aras-client/api-overview' },
      { id: 'aras-client-properties-events', name: '属性事件模型', type: 'item', path: '/aras-client/properties-events' },
      { id: 'aras-client-custom-editors', name: '自定义编辑器开发', type: 'item', path: '/aras-client/custom-editors' }
    ]
  },
  {
    id: 'aras-client-cui',
    name: 'CUI（可配置用户界面）',
    type: 'group',
    children: [
      { id: 'aras-client-cui-layout', name: 'CUI 布局引擎', type: 'item', path: '/aras-client/cui-layout' },
      { id: 'aras-client-cui-controls', name: 'CUI 控件体系', type: 'item', path: '/aras-client/cui-controls' },
      { id: 'aras-client-cui-toolbar', name: 'CUI 工具栏', type: 'item', path: '/aras-client/cui-toolbar' },
      { id: 'aras-client-cui-grid', name: 'CUI 网格与插件', type: 'item', path: '/aras-client/cui-grid' },
      { id: 'aras-client-cui-contextmenu', name: 'CUI 右键菜单', type: 'item', path: '/aras-client/cui-contextmenu' },
      { id: 'aras-client-cui-toc', name: 'CUI 目录导航（TOC）', type: 'item', path: '/aras-client/cui-toc' }
    ]
  },
  {
    id: 'aras-client-components',
    name: 'Web Components 组件库',
    type: 'group',
    children: [
      { id: 'aras-client-grid-comp', name: 'Grid 表格组件', type: 'item', path: '/aras-client/grid-comp' },
      { id: 'aras-client-toolbar-comp', name: 'Toolbar 工具栏组件', type: 'item', path: '/aras-client/toolbar-comp' },
      { id: 'aras-client-menu-comp', name: 'Menu 菜单组件', type: 'item', path: '/aras-client/menu-comp' }
    ]
  },
  {
    id: 'aras-client-dashboards',
    name: '可配置仪表板',
    type: 'group',
    children: [
      { id: 'aras-client-dashboards-overview', name: '仪表板概述', type: 'item', path: '/aras-client/dashboards-overview' },
      { id: 'aras-client-widgets', name: '仪表板 Widget 开发', type: 'item', path: '/aras-client/widgets' },
      { id: 'aras-client-context-sharing', name: '上下文共享机制', type: 'item', path: '/aras-client/context-sharing' }
    ]
  },
  {
    id: 'aras-client-deprecated',
    name: '已弃用 API（Deprecated）',
    type: 'group',
    children: [
      { id: 'aras-client-dep-namespaces', name: '命名空间总览', type: 'item', path: '/aras-client/deprecated-namespaces' },
      {
        id: 'aras-client-dep-controls',
        name: 'Aras.Client.Controls.Public',
        type: 'subgroup',
        children: [
          { id: 'aras-client-dep-cell', name: 'Cell（单元格）', type: 'item', path: '/aras-client/deprecated-cell' },
          { id: 'aras-client-dep-gridcontainer', name: 'GridContainer（网格容器）', type: 'item', path: '/aras-client/deprecated-gridcontainer' },
          { id: 'aras-client-dep-htmleditor', name: 'HtmlEditor（HTML 编辑器）', type: 'item', path: '/aras-client/deprecated-htmleditor' },
          { id: 'aras-client-dep-treegridcontainer', name: 'TreeGridContainer（树形网格）', type: 'item', path: '/aras-client/deprecated-treegridcontainer' },
          { id: 'aras-client-dep-toolbaritem', name: 'ToolbarItem（工具栏项）', type: 'item', path: '/aras-client/deprecated-toolbaritem' },
          { id: 'aras-client-dep-toolbar', name: 'Toolbar（工具栏）', type: 'item', path: '/aras-client/deprecated-toolbar' },
          { id: 'aras-client-dep-vault', name: 'Vault（文件保险库）', type: 'item', path: '/aras-client/deprecated-vault' },
          { id: 'aras-client-dep-utils', name: 'Utils（工具类）', type: 'item', path: '/aras-client/deprecated-utils' }
        ]
      },
      {
        id: 'aras-client-dep-cmf',
        name: 'Aras.Modules.CMF.Public',
        type: 'subgroup',
        children: [
          { id: 'aras-client-dep-cmfstyle', name: 'CmfStyle（样式）', type: 'item', path: '/aras-client/deprecated-cmfstyle' },
          { id: 'aras-client-dep-computeresult', name: 'ComputeMethodResultBuilder', type: 'item', path: '/aras-client/deprecated-computeresult' },
          { id: 'aras-client-dep-element', name: 'Element（元素节点）', type: 'item', path: '/aras-client/deprecated-element' },
          { id: 'aras-client-dep-factory', name: 'Factory（工厂类）', type: 'item', path: '/aras-client/deprecated-factory' },
          { id: 'aras-client-dep-propertyitem', name: 'PropertyItem（属性单元格）', type: 'item', path: '/aras-client/deprecated-propertyitem' },
          { id: 'aras-client-dep-tree', name: 'Tree（CMF 树搜索）', type: 'item', path: '/aras-client/deprecated-tree' },
          { id: 'aras-client-dep-mappingmodel', name: 'MappingModel（映射模型）', type: 'item', path: '/aras-client/deprecated-mappingmodel' }
        ]
      }
    ]
  }
]
