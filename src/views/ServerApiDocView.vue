<template>
  <div class="pm-doc-view">
    <div class="pm-doc-body">
      <div class="pm-doc-content">
        <div class="breadcrumb">
          <router-link to="/" class="bc-link">首页</router-link>
          <span class="bc-sep">/</span>
          <router-link to="/server-api" class="bc-link">Aras 开发目录</router-link>
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
          <p>该文档尚未创建，请在 ServerApiDocView 中注册对应组件</p>
          <router-link to="/server-api" class="back-link">← 返回 Aras 开发目录</router-link>
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
import { serverApiMenu } from '../data/server-api-menu'
import type { ArasDocNode } from '../data/aras-menu'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import '../assets/styles/doc-content.css'

// ── Doc Components ──
// Group 1: Innovator 类 (7)
import InnovatorOverviewView from './server-api/InnovatorOverviewView.vue'
import InnovatorItemCreationView from './server-api/InnovatorItemCreationView.vue'
import InnovatorAmlSqlView from './server-api/InnovatorAmlSqlView.vue'
import InnovatorMethodView from './server-api/InnovatorMethodView.vue'
import InnovatorQueryView from './server-api/InnovatorQueryView.vue'
import InnovatorFileView from './server-api/InnovatorFileView.vue'
import InnovatorUtilityView from './server-api/InnovatorUtilityView.vue'
// Group 2: Item 类 (14)
import ItemOverviewView from './server-api/ItemOverviewView.vue'
import ItemPropertiesView from './server-api/ItemPropertiesView.vue'
import ItemPropertyConditionView from './server-api/ItemPropertyConditionView.vue'
import ItemPropertyAttributeView from './server-api/ItemPropertyAttributeView.vue'
import ItemAttributesView from './server-api/ItemAttributesView.vue'
import ItemIdentityView from './server-api/ItemIdentityView.vue'
import ItemAmlView from './server-api/ItemAmlView.vue'
import ItemApplyView from './server-api/ItemApplyView.vue'
import ItemRelationshipsView from './server-api/ItemRelationshipsView.vue'
import ItemCollectionView from './server-api/ItemCollectionView.vue'
import ItemLogicalView from './server-api/ItemLogicalView.vue'
import ItemFilesView from './server-api/ItemFilesView.vue'
import ItemLifecycleView from './server-api/ItemLifecycleView.vue'
import ItemErrorsView from './server-api/ItemErrorsView.vue'
// Group 3: IOM 其他类型 (6)
import ConnectionHttpView from './server-api/ConnectionHttpView.vue'
import I18nSessionView from './server-api/I18nSessionView.vue'
import FactoryRequestView from './server-api/FactoryRequestView.vue'
import EnumsFileView from './server-api/EnumsFileView.vue'
import HttpParamsView from './server-api/HttpParamsView.vue'
import ArasItemNodeListView from './server-api/ArasItemNodeListView.vue'
// Group 4: OAuth 认证 (12)
import OauthOverviewView from './server-api/OauthOverviewView.vue'
import OauthGrantTypeView from './server-api/OauthGrantTypeView.vue'
import OauthInterfacesView from './server-api/OauthInterfacesView.vue'
import OauthTokenProviderOptionsView from './server-api/OauthTokenProviderOptionsView.vue'
import OauthPasswordView from './server-api/OauthPasswordView.vue'
import OauthAuthcodeView from './server-api/OauthAuthcodeView.vue'
import OauthCertificateView from './server-api/OauthCertificateView.vue'
import OauthWindowsView from './server-api/OauthWindowsView.vue'
import OauthImpersonateView from './server-api/OauthImpersonateView.vue'
import OauthRefreshView from './server-api/OauthRefreshView.vue'
import OauthJwtBearerView from './server-api/OauthJwtBearerView.vue'
import OauthDiscoveryView from './server-api/OauthDiscoveryView.vue'
// Group 5: IOME 文件管理 (10)
import IomeOverviewView from './server-api/IomeOverviewView.vue'
import IomeCheckinView from './server-api/IomeCheckinView.vue'
import IomeCheckoutView from './server-api/IomeCheckoutView.vue'
import IomeCheckinEventsView from './server-api/IomeCheckinEventsView.vue'
import IomeUploadEventsView from './server-api/IomeUploadEventsView.vue'
import IomeDownloadEventsView from './server-api/IomeDownloadEventsView.vue'
import IomeResultsView from './server-api/IomeResultsView.vue'
import IomeConfigurationView from './server-api/IomeConfigurationView.vue'
import IomeExceptionsView from './server-api/IomeExceptionsView.vue'
import IomeDelegatesView from './server-api/IomeDelegatesView.vue'
// Group 6: Aras.Net (1)
import ArasnetView from './server-api/ArasnetView.vue'

const route = useRoute()

const docComponents: Record<string, any> = {
  // Group 1: Innovator 类
  'innovator-overview': InnovatorOverviewView,
  'innovator-item-creation': InnovatorItemCreationView,
  'innovator-aml-sql': InnovatorAmlSqlView,
  'innovator-method': InnovatorMethodView,
  'innovator-query': InnovatorQueryView,
  'innovator-file': InnovatorFileView,
  'innovator-utility': InnovatorUtilityView,
  // Group 2: Item 类
  'item-overview': ItemOverviewView,
  'item-properties': ItemPropertiesView,
  'item-property-condition': ItemPropertyConditionView,
  'item-property-attribute': ItemPropertyAttributeView,
  'item-attributes': ItemAttributesView,
  'item-identity': ItemIdentityView,
  'item-aml': ItemAmlView,
  'item-apply': ItemApplyView,
  'item-relationships': ItemRelationshipsView,
  'item-collection': ItemCollectionView,
  'item-logical': ItemLogicalView,
  'item-files': ItemFilesView,
  'item-lifecycle': ItemLifecycleView,
  'item-errors': ItemErrorsView,
  // Group 3: IOM 其他类型
  'connection-http': ConnectionHttpView,
  'i18n-session': I18nSessionView,
  'factory-request': FactoryRequestView,
  'enums-file': EnumsFileView,
  'http-params': HttpParamsView,
  'aras-item-node-list': ArasItemNodeListView,
  // Group 4: OAuth 认证
  'oauth-overview': OauthOverviewView,
  'oauth-grant-type': OauthGrantTypeView,
  'oauth-interfaces': OauthInterfacesView,
  'oauth-token-provider-options': OauthTokenProviderOptionsView,
  'oauth-password': OauthPasswordView,
  'oauth-authcode': OauthAuthcodeView,
  'oauth-certificate': OauthCertificateView,
  'oauth-windows': OauthWindowsView,
  'oauth-impersonate': OauthImpersonateView,
  'oauth-refresh': OauthRefreshView,
  'oauth-jwt-bearer': OauthJwtBearerView,
  'oauth-discovery': OauthDiscoveryView,
  // Group 5: IOME 文件管理
  'iome-overview': IomeOverviewView,
  'iome-checkin': IomeCheckinView,
  'iome-checkout': IomeCheckoutView,
  'iome-checkin-events': IomeCheckinEventsView,
  'iome-upload-events': IomeUploadEventsView,
  'iome-download-events': IomeDownloadEventsView,
  'iome-results': IomeResultsView,
  'iome-configuration': IomeConfigurationView,
  'iome-exceptions': IomeExceptionsView,
  'iome-delegates': IomeDelegatesView,
  // Group 6: Aras.Net
  'arasnet': ArasnetView
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
  walk(serverApiMenu)
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
  walk(serverApiMenu, [])
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
