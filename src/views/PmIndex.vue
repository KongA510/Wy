<template>
  <div class="pm-index">
    <div class="page-header">
      <h1 class="page-title">??????</h1>
      <p class="page-desc">Aras Innovator ???????????????? WBS ????????????CPM ????? {{ totalDocs }} ??</p>
    </div>

    <div class="category-grid">
      <div
        v-for="cat in pmMenu"
        :key="cat.id"
        class="category-card"
        @click="navigateToCategory(cat)"
      >
        <div class="card-icon">{{ getCategoryIcon(cat.name) }}</div>
        <h3 class="card-title">{{ cat.name }}</h3>
        <p class="card-desc">{{ getCategoryDesc(cat) }}</p>
        <div class="card-meta">
          <span class="meta-count">{{ countDocs(cat) }} ???</span>
          <span class="card-arrow">?</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { pmMenu } from '../data/pm-menu'
import type { ArasDocNode } from '../data/aras-menu'

const router = useRouter()

const totalDocs = computed(() => {
  let c = 0
  function count(n: ArasDocNode) { if (n.type === 'item') c++; if (n.children) n.children.forEach(count) }
  pmMenu.forEach(count)
  return c
})

const iconMap: Record<string, string> = {
  '???????': '??'
}

function getCategoryIcon(name: string) { return iconMap[name] || '??' }
function getCategoryDesc(node: ArasDocNode) {
  if (!node.children) return ''
  const names = node.children.slice(0, 3).map(c => c.name).join('?')
  return node.children.length > 3 ? `${names} ?` : names
}
function countDocs(node: ArasDocNode): number {
  let c = 0
  if (node.type === 'item') c = 1
  if (node.children) node.children.forEach(ch => { c += countDocs(ch) })
  return c
}
function findFirstDoc(node: ArasDocNode): ArasDocNode | null {
  if (node.type === 'item') return node
  if (node.children) { for (const ch of node.children) { const f = findFirstDoc(ch); if (f) return f } }
  return null
}
function navigateToCategory(cat: ArasDocNode) {
  const first = findFirstDoc(cat)
  if (first?.path) router.push(first.path)
}
</script>

<style scoped>
.pm-index { max-width: 800px; }
.page-header { margin-bottom: 40px; }
.page-title { font-size: 32px; font-weight: 800; color: #111827; margin: 0 0 12px 0; letter-spacing: -0.5px; }
.page-desc { font-size: 15px; color: #6b7280; margin: 0; line-height: 1.6; }
.category-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.category-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; cursor: pointer; transition: all 0.2s ease; }
.category-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(99,102,241,0.08); transform: translateY(-2px); }
.card-icon { font-size: 28px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0; }
.card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0 0 16px 0; }
.card-meta { display: flex; align-items: center; justify-content: space-between; }
.meta-count { font-size: 12px; color: #9ca3af; background: #f3f4f6; padding: 2px 8px; border-radius: 4px; }
.card-arrow { font-size: 18px; color: #d1d5db; transition: all 0.2s; }
.category-card:hover .card-arrow { color: #6366f1; transform: translateX(4px); }
</style>
