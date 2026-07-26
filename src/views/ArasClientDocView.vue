<template>
  <div class="pm-doc-view">
    <div class="pm-doc-body">
      <div class="pm-doc-content">
        <div class="breadcrumb">
          <router-link to="/" class="bc-link">首页</router-link>
          <span class="bc-sep">/</span>
          <router-link to="/aras-client" class="bc-link">Aras 客户端文档</router-link>
          <template v-for="(crumb, i) in breadcrumbs" :key="i">
            <span class="bc-sep">/</span>
            <span v-if="i === breadcrumbs.length - 1" class="bc-current">{{ crumb.name }}</span>
            <router-link v-else :to="crumb.path" class="bc-link">{{ crumb.name }}</router-link>
          </template>
        </div>

        <component v-if="comp" :is="comp" />

        <div v-else class="not-found">
          <div class="not-found-icon">🔍</div>
          <h2>文档未找到</h2>
          <p>该文档尚未创建，请在 ArasClientDocView 中注册对应组件</p>
          <router-link to="/aras-client" class="back-link">← 返回 Aras 客户端文档</router-link>
        </div>

        <nav v-if="comp" class="doc-nav">
          <router-link v-if="prevDoc" :to="prevDoc.path!" class="nav-link prev">
            <span class="nav-dir">← 上一篇</span>
            <span class="nav-title">{{ prevDoc.name }}</span>
          </router-link>
          <span v-else></span>
          <router-link v-if="nextDoc" :to="nextDoc.path!" class="nav-link next">
            <span class="nav-dir">下一篇 →</span>
            <span class="nav-title">{{ nextDoc.name }}</span>
          </router-link>
        </nav>
      </div>
    </div>

    <!-- 固定右侧目录导航 -->
    <aside v-if="comp && tocItems.length" class="pm-doc-toc">
      <div class="toc-title">本页目录</div>
      <ul class="toc-list">
        <li
          v-for="item in tocItems"
          :key="item.id"
          :class="['toc-item', `toc-h${item.level}`, { 'toc-active': activeId === item.id }]"
        >
          <a :href="`#${item.id}`" class="toc-link" @click.prevent="scrollToHeading(item.id)">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onBeforeUnmount, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { arasClientMenu } from '../data/aras-client-menu'
import type { ArasDocNode } from '../data/aras-menu'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import '../assets/styles/doc-content.css'

// ── Doc Components ──
import IntroView from './aras-client/IntroView.vue'
import DevPrinciplesView from './aras-client/DevPrinciplesView.vue'
import ProjectStructureView from './aras-client/ProjectStructureView.vue'
import ApiOverviewView from './aras-client/ApiOverviewView.vue'
import PropertiesEventsView from './aras-client/PropertiesEventsView.vue'
import CustomEditorsView from './aras-client/CustomEditorsView.vue'
import CuiLayoutView from './aras-client/CuiLayoutView.vue'
import CuiControlsView from './aras-client/CuiControlsView.vue'
import CuiToolbarView from './aras-client/CuiToolbarView.vue'
import CuiGridView from './aras-client/CuiGridView.vue'
import CuiContextMenuView from './aras-client/CuiContextMenuView.vue'
import CuiTocView from './aras-client/CuiTocView.vue'
import GridComponentView from './aras-client/GridComponentView.vue'
import ToolbarComponentView from './aras-client/ToolbarComponentView.vue'
import MenuComponentView from './aras-client/MenuComponentView.vue'
import DashboardsOverviewView from './aras-client/DashboardsOverviewView.vue'
import WidgetsView from './aras-client/WidgetsView.vue'
import ContextSharingView from './aras-client/ContextSharingView.vue'
import DeprecatedHtmlEditorView from './aras-client/DeprecatedHtmlEditorView.vue'
import DeprecatedCellView from './aras-client/DeprecatedCellView.vue'
import DeprecatedGridContainerView from './aras-client/DeprecatedGridContainerView.vue'
import DeprecatedTreeGridContainerView from './aras-client/DeprecatedTreeGridContainerView.vue'
import DeprecatedToolbarItemView from './aras-client/DeprecatedToolbarItemView.vue'
import DeprecatedToolbarView from './aras-client/DeprecatedToolbarView.vue'
import DeprecatedVaultView from './aras-client/DeprecatedVaultView.vue'
import DeprecatedUtilsView from './aras-client/DeprecatedUtilsView.vue'
import DeprecatedCmfStyleView from './aras-client/DeprecatedCmfStyleView.vue'
import DeprecatedComputeMethodResultBuilderView from './aras-client/DeprecatedComputeMethodResultBuilderView.vue'
import DeprecatedElementView from './aras-client/DeprecatedElementView.vue'
import DeprecatedFactoryView from './aras-client/DeprecatedFactoryView.vue'
import DeprecatedPropertyItemView from './aras-client/DeprecatedPropertyItemView.vue'
import DeprecatedTreeView from './aras-client/DeprecatedTreeView.vue'
import DeprecatedMappingModelView from './aras-client/DeprecatedMappingModelView.vue'
import DeprecatedNamespacesView from './aras-client/DeprecatedNamespacesView.vue'

const route = useRoute()

const docComponents: Record<string, any> = {
  'intro': IntroView,
  'dev-principles': DevPrinciplesView,
  'project-structure': ProjectStructureView,
  'api-overview': ApiOverviewView,
  'properties-events': PropertiesEventsView,
  'custom-editors': CustomEditorsView,
  'cui-layout': CuiLayoutView,
  'cui-controls': CuiControlsView,
  'cui-toolbar': CuiToolbarView,
  'cui-grid': CuiGridView,
  'cui-contextmenu': CuiContextMenuView,
  'cui-toc': CuiTocView,
  'grid-comp': GridComponentView,
  'toolbar-comp': ToolbarComponentView,
  'menu-comp': MenuComponentView,
  'dashboards-overview': DashboardsOverviewView,
  'widgets': WidgetsView,
  'context-sharing': ContextSharingView,
  'deprecated-htmleditor': DeprecatedHtmlEditorView,
  'deprecated-cell': DeprecatedCellView,
  'deprecated-gridcontainer': DeprecatedGridContainerView,
  'deprecated-treegridcontainer': DeprecatedTreeGridContainerView,
  'deprecated-toolbaritem': DeprecatedToolbarItemView,
  'deprecated-toolbar': DeprecatedToolbarView,
  'deprecated-vault': DeprecatedVaultView,
  'deprecated-utils': DeprecatedUtilsView,
  'deprecated-cmfstyle': DeprecatedCmfStyleView,
  'deprecated-computeresult': DeprecatedComputeMethodResultBuilderView,
  'deprecated-element': DeprecatedElementView,
  'deprecated-factory': DeprecatedFactoryView,
  'deprecated-propertyitem': DeprecatedPropertyItemView,
  'deprecated-tree': DeprecatedTreeView,
  'deprecated-mappingmodel': DeprecatedMappingModelView,
  'deprecated-namespaces': DeprecatedNamespacesView
}

const comp = computed(() => docComponents[route.params.docId as string])

const flatDocs = computed(() => {
  const result: ArasDocNode[] = []
  function walk(nodes: ArasDocNode[]) {
    for (const n of nodes) {
      if (n.type === 'item' && n.path) result.push(n)
      if (n.children) walk(n.children)
    }
  }
  walk(arasClientMenu)
  return result
})

const breadcrumbs = computed(() => {
  const crumbs: { name: string; path: string }[] = []
  function walk(nodes: ArasDocNode[], trail: { name: string; path: string }[]): boolean {
    for (const n of nodes) {
      const cur = { name: n.name, path: n.path || '' }
      if (n.path === route.path) { crumbs.push(...trail, cur); return true }
      if (n.children && walk(n.children, [...trail, cur])) return true
    }
    return false
  }
  walk(arasClientMenu, [])
  return crumbs
})

const currentIndex = computed(() => flatDocs.value.findIndex(d => d.path === route.path))
const prevDoc = computed(() => currentIndex.value > 0 ? flatDocs.value[currentIndex.value - 1] : null)
const nextDoc = computed(() => currentIndex.value < flatDocs.value.length - 1 ? flatDocs.value[currentIndex.value + 1] : null)

// ── TOC 逻辑 ──
interface TocItem { id: string; text: string; level: number }
const tocItems = ref<TocItem[]>([])
const activeId = ref('')
let observer: IntersectionObserver | null = null

function buildToc() {
  const article = document.querySelector('.doc-content')
  if (!article) { tocItems.value = []; return }
  const headings = article.querySelectorAll('h2, h3, h4')
  const items: TocItem[] = []
  headings.forEach((el, i) => {
    const id = `toc-${i}`
    el.setAttribute('id', id)
    const tag = el.tagName
    const level = tag === 'H2' ? 2 : tag === 'H3' ? 3 : 4
    items.push({ id, text: el.textContent?.trim() || '', level })
  })
  tocItems.value = items
  setupScrollSpy()
}

function setupScrollSpy() {
  if (observer) observer.disconnect()
  const article = document.querySelector('.doc-content')
  if (!article) return
  const headings = article.querySelectorAll('h2[id], h3[id], h4[id]')
  if (!headings.length) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) { activeId.value = entry.target.id; break }
      }
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  )
  headings.forEach(h => observer!.observe(h))
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
  activeId.value = id
}

// ── 代码高亮 ──
function highlightCode() {
  const container = document.querySelector('.doc-content')
  if (!container) return
  container.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block as HTMLElement))
  container.querySelectorAll('pre').forEach(pre => {
    if (!pre.querySelector('.copy-btn')) {
      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.textContent = '复制'
      btn.onclick = () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent || ''
        navigator.clipboard.writeText(code)
        btn.textContent = '已复制!'
        setTimeout(() => { btn.textContent = '复制' }, 2000)
      }
      pre.style.position = 'relative'
      pre.appendChild(btn)
    }
  })
}

function onRouteChange() {
  nextTick(() => {
    highlightCode()
    requestAnimationFrame(() => buildToc())
  })
}

watch(() => route.path, onRouteChange, { immediate: true })
onMounted(() => nextTick(onRouteChange))
onBeforeUnmount(() => { if (observer) observer.disconnect() })
</script>

<style scoped>
.pm-doc-view { width: 100%; }
.pm-doc-body { display: flex; gap: 32px; align-items: flex-start; }
.pm-doc-content { flex: 1; min-width: 0; max-width: 800px; }
.pm-doc-toc {
  position: fixed;
  right: max(32px, calc((100vw - 1200px) / 2));
  top: 140px;
  width: 220px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  padding: 0 12px 0 16px;
  border-left: 2px solid #e5e7eb;
  z-index: 40;
}
.pm-doc-toc::-webkit-scrollbar { width: 3px; }
.pm-doc-toc::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
.toc-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 12px; letter-spacing: 0.5px; }
.toc-list { list-style: none; margin: 0; padding: 0; }
.toc-item { margin: 0; }
.toc-link {
  display: block;
  font-size: 13px;
  line-height: 1.6;
  color: #6b7280;
  text-decoration: none;
  padding: 3px 0 3px 12px;
  border-left: 2px solid transparent;
  margin-left: -18px;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toc-link:hover { color: #4f46e5; }
.toc-h3 .toc-link { padding-left: 24px; font-size: 12.5px; color: #9ca3af; }
.toc-h4 .toc-link { padding-left: 36px; font-size: 12px; color: #b0b7c3; }
.toc-active .toc-link { color: #4f46e5; font-weight: 600; border-left-color: #6366f1; }
.breadcrumb { display: flex; align-items: center; gap: 6px; margin-bottom: 32px; font-size: 13px; flex-wrap: wrap; }
.bc-link { color: #6b7280; text-decoration: none; transition: color 0.2s; }
.bc-link:hover { color: #6366f1; }
.bc-sep { color: #d1d5db; }
.bc-current { color: #111827; font-weight: 600; }
.not-found { text-align: center; padding: 80px 20px; }
.not-found-icon { font-size: 48px; margin-bottom: 16px; }
.not-found h2 { font-size: 20px; color: #111827; margin: 0 0 8px; }
.not-found p { color: #6b7280; margin: 0 0 24px; }
.back-link { color: #6366f1; text-decoration: none; font-weight: 500; }
.doc-nav { display: flex; justify-content: space-between; margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; gap: 16px; }
.nav-link { display: flex; flex-direction: column; gap: 4px; text-decoration: none; padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 10px; transition: all 0.2s; max-width: 45%; }
.nav-link:hover { border-color: #c7d2fe; background: #f5f3ff; }
.nav-link.next { text-align: right; margin-left: auto; }
.nav-dir { font-size: 12px; color: #9ca3af; }
.nav-title { font-size: 14px; color: #4f46e5; font-weight: 600; }
@media (max-width: 1100px) { .pm-doc-toc { display: none; } }
</style>
