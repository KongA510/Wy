<template>
  <aside class="app-sidebar">
    <div class="search-box" @click="openSearch">
      <el-icon class="search-icon"><Search /></el-icon>
      <span class="search-placeholder">搜索文档</span>
      <span class="search-shortcut">⌘K</span>
    </div>

    <!-- Aras 文档树 -->
    <nav v-if="treeMode" class="sidebar-nav aras-tree">
      <div class="tree-header" @click="backFromTree">
        <el-icon class="nav-icon"><ArrowLeft /></el-icon>
        <span class="tree-title">{{ treeTitle }}</span>
      </div>
      <div class="tree-body">
        <TreeNode v-for="node in treeMenu" :key="node.id" :node="node" :current-path="route.path" :depth="0" />
      </div>
    </nav>

    <!-- 普通博客菜单 -->
    <nav v-else class="sidebar-nav">
      <template v-for="node in menuData" :key="node.id">
        <div v-if="!node.children" class="nav-item" :class="{ active: isActive(node.path) }" @click="navigate(node.path)">
          <el-icon v-if="node.icon" class="nav-icon"><component :is="iconMap[node.icon]" /></el-icon>
          <span class="nav-label">{{ node.label }}</span>
        </div>
        <div v-else class="nav-group">
          <div class="nav-group-title" @click="toggleGroup(node.id)">
            <el-icon v-if="node.icon" class="nav-icon"><component :is="iconMap[node.icon]" /></el-icon>
            <span class="nav-label">{{ node.label }}</span>
            <el-icon class="nav-arrow" :class="{ expanded: expandedGroups.has(node.id) }"><ArrowRight /></el-icon>
          </div>
          <transition name="slide">
            <div v-show="expandedGroups.has(node.id)" class="nav-children">
              <div v-for="child in node.children" :key="child.id" class="nav-item child" :class="{ active: isActive(child.path) }" @click="navigate(child.path)">
                <span class="nav-dot"></span>
                <span class="nav-label">{{ child.label }}</span>
              </div>
            </div>
          </transition>
        </div>
      </template>
    </nav>

    <SearchDialog v-model:visible="searchVisible" />
  </aside>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, ArrowRight, ArrowLeft, HomeFilled, Monitor, ChromeFilled, Promotion, EditPen, Brush, SetUp, Platform, Coin, Share, Notebook, Calendar, Reading, ChatDotRound, UserFilled, DataLine } from '@element-plus/icons-vue'
import { menuData } from '../../data/menu'
import { arasDocMenu } from '../../data/aras-menu'
import { pmMenu } from '../../data/pm-menu'
import { arasDevMenu } from '../../data/aras-dev-menu'
import { serverApiMenu } from '../../data/server-api-menu'
import { arasClientMenu } from '../../data/aras-client-menu'
import SearchDialog from '../SearchDialog.vue'
import TreeNode from '../TreeNode.vue'

const router = useRouter()
const route = useRoute()
const searchVisible = ref(false)
const expandedGroups = reactive(new Set<string>())

const iconMap: Record<string, any> = {
  HomeFilled, Monitor, ChromeFilled, Promotion, EditPen, Brush, SetUp, Platform,
  Coin, Share, Notebook, Calendar, Reading, ChatDotRound, UserFilled, DataLine
}

const treeMode = computed(() => route.path.startsWith('/aras-docs') ? 'aras' : route.path.startsWith('/pm') ? 'pm' : route.path.startsWith('/aras-dev') ? 'aras-dev' : route.path.startsWith('/server-api') ? 'server-api' : route.path.startsWith('/aras-client') ? 'aras-client' : null)
const treeMenu = computed(() => treeMode.value === 'pm' ? pmMenu : treeMode.value === 'aras-dev' ? arasDevMenu : treeMode.value === 'server-api' ? serverApiMenu : treeMode.value === 'aras-client' ? arasClientMenu : arasDocMenu)
const treeTitle = computed(() => treeMode.value === 'pm' ? '项目管理' : treeMode.value === 'aras-dev' ? 'Aras 开发笔记' : treeMode.value === 'server-api' ? 'Aras 开发目录' : treeMode.value === 'aras-client' ? 'Aras 客户端文档' : '系统操作手册')

function autoExpand() {
  const p = route.path
  for (const node of menuData) {
    if (node.children) {
      if (node.children.some(c => c.path && p.startsWith(c.path.split('/:')[0])) || p.startsWith('/' + node.id))
        expandedGroups.add(node.id)
    }
  }
}
autoExpand()

function toggleGroup(id: string) { expandedGroups.has(id) ? expandedGroups.delete(id) : expandedGroups.add(id) }
function isActive(p?: string) { return p ? route.path === p : false }
function navigate(p?: string) { if (p) router.push(p) }
function backFromTree() {
  const indexMap: Record<string, string> = { pm: '/pm', aras: '/aras-docs', 'aras-dev': '/aras-dev', 'server-api': '/server-api', 'aras-client': '/aras-client' }
  const index = treeMode.value ? indexMap[treeMode.value] : '/'
  if (index && route.path === index) router.push('/')
  else router.push(index)
}
function openSearch() { searchVisible.value = true }
function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchVisible.value = true }
}
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.app-sidebar { position: fixed; top: 60px; left: 0; bottom: 0; width: 280px; background: #fafbfc; border-right: 1px solid #e5e7eb; overflow-y: auto; padding: 20px 16px; z-index: 50; }
.app-sidebar::-webkit-scrollbar { width: 4px; }
.app-sidebar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
.search-box { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 24px; }
.search-box:hover { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.08); }
.search-icon { color: #9ca3af; font-size: 16px; }
.search-placeholder { flex: 1; font-size: 14px; color: #9ca3af; }
.search-shortcut { font-size: 12px; color: #9ca3af; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
.sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
.tree-header { display: flex; align-items: center; gap: 8px; padding: 8px 12px; margin-bottom: 8px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 700; color: #111827; transition: background 0.15s; }
.tree-header:hover { background: #f3f4f6; }
.tree-title { flex: 1; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; cursor: pointer; transition: all 0.15s; font-size: 14px; color: #374151; }
.nav-item:hover { background: #f3f4f6; color: #111827; }
.nav-item.active { background: #eef2ff; color: #4f46e5; font-weight: 600; }
.nav-item.child { padding-left: 20px; }
.nav-icon { font-size: 16px; color: #6b7280; flex-shrink: 0; }
.nav-item.active .nav-icon { color: #4f46e5; }
.nav-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nav-dot { width: 5px; height: 5px; border-radius: 50%; background: #d1d5db; flex-shrink: 0; }
.nav-item.active .nav-dot { background: #4f46e5; }
.nav-group-title { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; color: #111827; transition: background 0.15s; }
.nav-group-title:hover { background: #f3f4f6; }
.nav-arrow { font-size: 12px; color: #9ca3af; transition: transform 0.2s; }
.nav-arrow.expanded { transform: rotate(90deg); }
.nav-children { display: flex; flex-direction: column; gap: 2px; margin-left: 8px; padding-left: 8px; border-left: 1px solid #e5e7eb; }
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; overflow: hidden; }
.slide-enter-from, .slide-leave-to { opacity: 0; max-height: 0; }
.slide-enter-to, .slide-leave-from { opacity: 1; max-height: 500px; }
</style>
