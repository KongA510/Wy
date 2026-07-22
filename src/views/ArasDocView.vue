<template>
  <div class="aras-doc-view">
    <div class="breadcrumb">
      <router-link to="/" class="bc-link">首页</router-link>
      <span class="bc-sep">/</span>
      <router-link to="/aras-docs" class="bc-link">Aras 文档</router-link>
      <template v-for="(crumb, i) in breadcrumbs" :key="i">
        <span class="bc-sep">/</span>
        <span v-if="i === breadcrumbs.length - 1" class="bc-current">{{ crumb.name }}</span>
        <router-link v-else :to="crumb.path" class="bc-link">{{ crumb.name }}</router-link>
      </template>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载文档中...</p>
    </div>

    <article v-else-if="docContent" class="doc-content" v-html="docContent.html"></article>

    <div v-else class="not-found">
      <div class="not-found-icon">📄</div>
      <h2>文档未找到</h2>
      <p>该文档内容尚未提取或路径不正确</p>
      <router-link to="/aras-docs" class="back-link">← 返回 Aras 文档目录</router-link>
    </div>

    <nav v-if="docContent" class="doc-nav">
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
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { arasDocMenu } from '../data/aras-menu'
import type { ArasDocNode } from '../data/aras-menu'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import '../assets/styles/doc-content.css'

const route = useRoute()
const loading = ref(false)
const docContent = ref<{ title: string; html: string } | null>(null)

const flatDocs = computed(() => {
  const result: ArasDocNode[] = []
  function walk(nodes: ArasDocNode[]) {
    for (const n of nodes) {
      if (n.type === 'item' && n.jsonFile) result.push(n)
      if (n.children) walk(n.children)
    }
  }
  walk(arasDocMenu)
  return result
})

function findNode(nodes: ArasDocNode[], targetPath: string): ArasDocNode | null {
  for (const n of nodes) {
    if (n.path === targetPath) return n
    if (n.children) { const f = findNode(n.children, targetPath); if (f) return f }
  }
  return null
}

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
  walk(arasDocMenu, [])
  return crumbs
})

const currentIndex = computed(() => flatDocs.value.findIndex(d => d.path === route.path))
const prevDoc = computed(() => currentIndex.value > 0 ? flatDocs.value[currentIndex.value - 1] : null)
const nextDoc = computed(() => currentIndex.value < flatDocs.value.length - 1 ? flatDocs.value[currentIndex.value + 1] : null)

async function loadDoc() {
  const node = findNode(arasDocMenu, route.path)
  if (!node || !node.jsonFile) { docContent.value = null; return }
  loading.value = true
  try {
    const mod = await import(`../data/aras-docs/${node.jsonFile}.json`)
    docContent.value = mod.default || mod
    await nextTick()
    highlightCode()
  } catch (e) {
    console.error('Failed to load doc:', node.jsonFile, e)
    docContent.value = null
  } finally {
    loading.value = false
  }
}

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

watch(() => route.path, loadDoc, { immediate: true })
onMounted(loadDoc)
</script>

<style scoped>
.aras-doc-view { max-width: 800px; }
.breadcrumb { display: flex; align-items: center; gap: 6px; margin-bottom: 32px; font-size: 13px; flex-wrap: wrap; }
.bc-link { color: #6b7280; text-decoration: none; transition: color 0.2s; }
.bc-link:hover { color: #6366f1; }
.bc-sep { color: #d1d5db; }
.bc-current { color: #111827; font-weight: 600; }
.loading-state { text-align: center; padding: 80px 20px; color: #9ca3af; }
.loading-spinner { width: 32px; height: 32px; border: 3px solid #e5e7eb; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }
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
</style>
