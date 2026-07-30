import os, sys
sys.stdout.reconfigure(encoding='utf-8')
BASE = r"D:\博威\项目\ICS\个人知识库"

BOOK=chr(0x1F4D6); WRENCH=chr(0x1F527); SCREEN=chr(0x1F5A5); MEMO=chr(0x1F4DD)
PLUG=chr(0x1F50C); BULB=chr(0x1F4A1); DEV=chr(0x1F9E0); PM=chr(0x1F4CA)
FE=chr(0x1F3A8); BE=chr(0x1F5C4); DAILY=chr(0x1F4D4)

config = r"""import { defineConfig } from 'vitepress'
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

/** 文档页侧边栏：客户(二级 group, 带图标) -> 接口文档(三级) */
function buildIntegrationItems(): any[] {
  return integrationMenu.map(group => {
    const meta = customerMeta[group.id]
    const icon = meta && meta.icon ? meta.icon + ' ' : ''
    return {
      text: icon + group.name,
      collapsed: false,
      items: buildSidebar(group.children || [])
    }
  })
}

function buildIntegrationSidebar(): any[] {
  return [
    {
      text: '__PLUG__ 客户集成',
      link: '/integration/index',
      collapsed: false,
      items: buildIntegrationItems()
    }
  ]
}

/** 首页分类树：客户集成只展示到客户(二级叶子, 带图标), 不展开接口三级 */
function buildCustomerLeaves(): any[] {
  return integrationMenu.map(group => {
    const meta = customerMeta[group.id]
    const icon = meta && meta.icon ? meta.icon + ' ' : ''
    const home = group.children && group.children[0] ? group.children[0].path : '/integration/index'
    return { text: icon + group.name, link: home }
  })
}

const categoryTree: any[] = [
  { text: '__BOOK__ 系统操作手册', link: '/aras-docs/index' },
  { text: '__WRENCH__ 服务端文档', link: '/server-api/index' },
  { text: '__SCREEN__ 客户端文档', link: '/aras-client/index' },
  {
    text: '__MEMO__ Aras 开发笔记',
    collapsed: false,
    items: [
      { text: '__DEV__ 开发笔记', link: '/aras-dev/index' },
      { text: '__PM__ 项目管理', link: '/pm/index' }
    ]
  },
  {
    text: '__PLUG__ 客户集成',
    link: '/integration/index',
    collapsed: false,
    items: buildCustomerLeaves()
  },
  {
    text: '__BULB__ 技术笔记',
    collapsed: true,
    items: [
      { text: '__FE__ 前端技术', link: '/frontend/index' },
      { text: '__BE__ 后端技术', link: '/backend/index' },
      { text: '__DAILY__ 日常笔记', link: '/notes/index' }
    ]
  }
]

export default defineConfig({
  srcDir: 'docs',
  title: 'Kong.A 知识库',
  description: 'Kong.A 个人技术知识库 — Aras PLM / .NET / 前端 / 客户集成',
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
      { text: '首页', link: '/' },
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
"""

m = {'__BOOK__':BOOK,'__WRENCH__':WRENCH,'__SCREEN__':SCREEN,'__MEMO__':MEMO,
     '__PLUG__':PLUG,'__BULB__':BULB,'__DEV__':DEV,'__PM__':PM,
     '__FE__':FE,'__BE__':BE,'__DAILY__':DAILY}
for k,v in m.items():
    config = config.replace(k, v)
assert '__' not in config, "leftover placeholder"

with open(os.path.join(BASE,'.vitepress','config.ts'),'w',encoding='utf-8') as f:
    f.write(config)
print("[OK] config.ts rewritten (icons + no 3rd level in home tree)")

# ---- style.css: add level-0 .items indent (the missing rule) ----
sty = os.path.join(BASE,'.vitepress','theme','style.css')
with open(sty,'r',encoding='utf-8') as f: s = f.read()
marker = "level-0 > .items"
if marker not in s:
    s += """
/* ===== 二级缩进: VitePress 默认仅 level-1+ 的 .items 缩进, 补 level-0 group 子项 ===== */
.VPSidebarItem.level-0 > .items {
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  margin-top: 4px;
}
"""
    with open(sty,'w',encoding='utf-8') as f: f.write(s)
    print("[OK] style.css: level-0 .items indent added")
else:
    print("[SKIP] style.css already has level-0 indent")
