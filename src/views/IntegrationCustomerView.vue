<template>
  <div class="integ-customer">
    <div class="breadcrumb">
      <router-link to="/" class="bc-link">首页</router-link>
      <span class="bc-sep">/</span>
      <router-link to="/integration" class="bc-link">客户集成</router-link>
      <template v-if="customer">
        <span class="bc-sep">/</span>
        <span class="bc-current">{{ customer.name }}</span>
      </template>
    </div>

    <div v-if="!customer" class="not-found">
      <div class="not-found-icon">🔍</div>
      <h2>客户未找到</h2>
      <p>该客户集成尚未登记，请在 integration-menu.ts 中追加对应分组</p>
      <router-link to="/integration" class="back-link">← 返回客户集成</router-link>
    </div>

    <template v-else>
      <div class="page-header">
        <div class="customer-head">
          <span class="customer-icon">{{ meta ? meta.icon : '🏭' }}</span>
          <h1 class="page-title">{{ customer.name }}</h1>
          <span class="customer-count">{{ docs.length }} 篇</span>
        </div>
        <p class="page-desc">{{ meta ? meta.description : '' }}</p>
        <p class="page-hint">下方为该客户的接口文档，点击卡片查看接口说明、关键代码与可下载源码。</p>
      </div>

      <div class="category-grid">
        <div v-for="doc in docs" :key="doc.id" class="category-card" @click="go(doc.path)">
          <div class="card-icon">{{ docMeta[doc.id] ? docMeta[doc.id].icon : '📄' }}</div>
          <h3 class="card-title">{{ doc.name }}</h3>
          <p class="card-desc">{{ docMeta[doc.id] ? docMeta[doc.id].description : '' }}</p>
          <div class="card-meta">
            <span class="meta-tag">接口文档</span>
            <span class="card-arrow">→</span>
          </div>
        </div>
      </div>

      <div class="back-row">
        <router-link to="/integration" class="back-link">← 返回客户列表</router-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { integrationMenu, customerMeta, docMeta } from '../data/integration-menu'
import type { ArasDocNode } from '../data/aras-menu'

const route = useRoute()
const router = useRouter()

const customer = computed<ArasDocNode | null>(() => {
  const slug = route.params.customerId as string
  return integrationMenu.find((g) => {
    const m = customerMeta[g.id]
    return m ? m.slug === slug : false
  }) || null
})
const meta = computed(() => (customer.value ? customerMeta[customer.value.id] : undefined))
const docs = computed<ArasDocNode[]>(() =>
  (customer.value && customer.value.children ? customer.value.children : []).filter((c) => c.type === 'item')
)

function go(path?: string) { if (path) router.push(path) }
</script>

<style scoped>
.integ-customer { max-width: 860px; }
.breadcrumb { display: flex; align-items: center; gap: 6px; margin-bottom: 24px; font-size: 13px; flex-wrap: wrap; }
.bc-link { color: #6b7280; text-decoration: none; transition: color 0.2s; }
.bc-link:hover { color: #6366f1; }
.bc-sep { color: #d1d5db; }
.bc-current { color: #111827; font-weight: 600; }
.page-header { margin-bottom: 28px; }
.customer-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.customer-icon { font-size: 26px; }
.page-title { font-size: 28px; font-weight: 800; color: #111827; margin: 0; flex: 1; letter-spacing: -0.5px; }
.customer-count { font-size: 12px; color: #9ca3af; background: #f3f4f6; padding: 2px 10px; border-radius: 12px; }
.page-desc { font-size: 15px; color: #374151; margin: 0 0 8px 0; line-height: 1.7; }
.page-hint { font-size: 13px; color: #9ca3af; margin: 0; }
.category-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.category-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; cursor: pointer; transition: all 0.2s ease; }
.category-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(99,102,241,0.08); transform: translateY(-2px); }
.card-icon { font-size: 26px; margin-bottom: 12px; }
.card-title { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 8px 0; line-height: 1.4; }
.card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0 0 16px 0; }
.card-meta { display: flex; align-items: center; justify-content: space-between; }
.meta-tag { font-size: 12px; color: #4f46e5; background: #eef2ff; padding: 2px 8px; border-radius: 4px; }
.card-arrow { font-size: 18px; color: #d1d5db; transition: all 0.2s; }
.category-card:hover .card-arrow { color: #6366f1; transform: translateX(4px); }
.back-row { margin-top: 32px; }
.back-link { color: #6366f1; text-decoration: none; font-weight: 500; }
.back-link:hover { text-decoration: underline; }
.not-found { text-align: center; padding: 80px 20px; }
.not-found-icon { font-size: 48px; margin-bottom: 16px; }
.not-found h2 { font-size: 20px; color: #111827; margin: 0 0 8px; }
.not-found p { color: #6b7280; margin: 0 0 24px; }
@media (max-width: 640px) { .category-grid { grid-template-columns: 1fr; } }
</style>
