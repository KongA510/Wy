<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    :close-on-click-modal="true"
    width="560px"
    top="15vh"
    class="search-dialog"
    @opened="focusInput"
  >
    <div class="search-container">
      <div class="search-input-wrap">
        <el-icon class="search-input-icon"><Search /></el-icon>
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="搜索文档、技术关键字..."
          class="search-input"
          @keydown.down.prevent="moveDown"
          @keydown.up.prevent="moveUp"
          @keydown.enter.prevent="selectCurrent"
          @keydown.escape="visible = false"
        />
        <span v-if="query" class="search-clear" @click="query = ''">✕</span>
      </div>

      <div class="search-results" v-if="query">
        <div v-if="results.length === 0" class="search-empty">
          未找到匹配结果
        </div>
        <div
          v-for="(item, index) in results"
          :key="item.id"
          class="search-result-item"
          :class="{ highlighted: index === activeIndex }"
          @click="goTo(item.path)"
          @mouseenter="activeIndex = index"
        >
          <div class="result-title">{{ item.title }}</div>
          <div class="result-meta">
            <span class="result-category">{{ item.category }}</span>
            <span class="result-desc">{{ item.description }}</span>
          </div>
        </div>
      </div>

      <div class="search-hints" v-else>
        <div class="hint-item">
          <kbd>↑↓</kbd> 导航
        </div>
        <div class="hint-item">
          <kbd>↵</kbd> 选择
        </div>
        <div class="hint-item">
          <kbd>esc</kbd> 关闭
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import Fuse from 'fuse.js'
import { searchableItems } from '../data/menu'
import type { SearchResult } from '../types'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ 'update:visible': [val: boolean] }>()

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const router = useRouter()
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement>()

const fuse = new Fuse(searchableItems, {
  keys: ['title', 'description', 'category'],
  threshold: 0.4,
  includeScore: true
})

const results = computed<SearchResult[]>(() => {
  if (!query.value.trim()) return []
  return fuse.search(query.value).map(r => r.item).slice(0, 8)
})

watch(query, () => { activeIndex.value = 0 })

function focusInput() {
  setTimeout(() => inputRef.value?.focus(), 100)
}

function moveDown() {
  if (activeIndex.value < results.value.length - 1) activeIndex.value++
}
function moveUp() {
  if (activeIndex.value > 0) activeIndex.value--
}
function selectCurrent() {
  const item = results.value[activeIndex.value]
  if (item) goTo(item.path)
}
function goTo(path: string) {
  visible.value = false
  query.value = ''
  router.push(path)
}
</script>

<style scoped>
.search-container {
  margin: -20px;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
}
.search-input-icon {
  font-size: 20px;
  color: #9ca3af;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #111827;
  background: transparent;
}
.search-input::placeholder {
  color: #9ca3af;
}
.search-clear {
  cursor: pointer;
  color: #9ca3af;
  font-size: 14px;
  padding: 4px;
}
.search-clear:hover {
  color: #374151;
}

.search-results {
  max-height: 360px;
  overflow-y: auto;
  padding: 8px;
}

.search-empty {
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 14px;
}

.search-result-item {
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.1s;
}
.search-result-item.highlighted {
  background: #f3f4f6;
}
.result-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}
.result-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}
.result-category {
  color: #6366f1;
  font-weight: 500;
}
.result-desc {
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-hints {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-top: 1px solid #f3f4f6;
}
.hint-item {
  font-size: 12px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 4px;
}
.hint-item kbd {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 11px;
  font-family: monospace;
}
</style>

<style>
.search-dialog .el-dialog__header {
  display: none;
}
.search-dialog .el-dialog__body {
  padding: 0;
}
.search-dialog .el-dialog {
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}
</style>
