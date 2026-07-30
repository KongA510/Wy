import { defineConfig } from 'vitepress'
import { arasDocMenu } from './data/aras-menu'
import type { ArasDocNode } from './data/aras-menu'
import { arasDevMenu } from './data/aras-dev-menu'
import { serverApiMenu } from './data/server-api-menu'
import { arasClientMenu } from './data/aras-client-menu'
import { pmMenu } from './data/pm-menu'
import { integrationMenu, customerMeta } from './data/integration-menu'

function buildSidebar(nodes: ArasDocNode[]): any[] {
  return nodes.map(node => {
    if (node.type === 'item' && node.path) {
      return { text: node.name, link: node.path }
    }
    if (node.children && node.children.length > 0) {
      return { text: node.name, collapsed: true, items: buildSidebar(node.children) }
    }
    return { text: node.name }
  })
}

function buildIntegrationSidebar(): any[] {
  return [
    {
      text: '🔌 客户集成',
      link: '/integration/index',
      items: integrationMenu.map(group => {
        const meta = customerMeta[group.id]
        return {
          text: group.name,
          collapsed: false,
          items: [
            ...(meta ? [{ text: `${group.name} 概览`, link: group.path }] : []),
            ...buildSidebar(group.children || [])
          ]
        }
      })
    }
  ]
}

const categoryTree: any[] = [
  { text: '📖 系统操作手册', link: '/aras-docs/index' },
  { text: '🔧 服务端文档', link: '/server-api/index' },
  { text: '🔧 客户端文档', link: '/aras-client/index' },
  {
    text: '📝 Aras 开发笔记',
    collapsed: false,
    items: [
      { text: '开发笔记', link: '/aras-dev/index' },
      { text: '项目管理', link: '/pm/index' }
    ]
  },
  { text: '🔌 客户集成', link: '/integration/index' },
  {
    text: '💡 技术笔记',
    collapsed: true,
    items: [
      { text: '前端技术', link: '/frontend/index' },
      { text: '后端技术', link: '/backend/index' },
      { text: '日常笔记', link: '/notes/index' }
    ]
  }
]

export default defineConfig({
  srcDir: 'docs',
  title: 'Kong.A 知识库',
  description: 'Kong.A 个人技术知识库',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: undefined,
    siteTitle: 'Kong.A 知识库',
    nav: [
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/aras-docs/': buildSidebar(arasDocMenu),
      '/server-api/': buildSidebar(serverApiMenu),
      '/aras-client/': buildSidebar(arasClientMenu),
      '/aras-dev/': buildSidebar(arasDevMenu),
      '/pm/': buildSidebar(pmMenu),
      '/integration/': buildIntegrationSidebar(),
      '/': categoryTree
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    outline: { level: [2, 4], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    editLink: undefined,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KongA510/Wy' }
    ]
  },
  vite: {
    optimizeDeps: { include: [] },
    vue: {
      template: {
        transformAssetUrls: {
          img: [],
          video: [],
          source: [],
          image: [],
          use: []
        }
      }
    }
  }
})
