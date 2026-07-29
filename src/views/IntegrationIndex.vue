<template>
  <div class="integ-index">
    <div class="page-header">
      <h1 class="page-title">客户集成专区</h1>
      <p class="page-desc">
        记录各客户系统与 Aras PLM 的集成接口实现。每个客户独立成组，点击进入客户详情查看接口说明、关键代码与可下载源码。
        当前共 {{ integrationMenu.length }} 个客户，后续持续新增。
      </p>
    </div>

    <div class="category-grid">
      <div
        v-for="customer in integrationMenu"
        :key="customer.id"
        class="category-card"
        @click="go(customer.path)"
      >
        <div class="card-icon">{{ customerMeta[customer.id] ? customerMeta[customer.id].icon : '🏭' }}</div>
        <h3 class="card-title">{{ customer.name }}</h3>
        <p class="card-desc">{{ customerMeta[customer.id] ? customerMeta[customer.id].description : '' }}</p>
        <div class="card-meta">
          <span class="meta-tag">{{ countDocs(customer) }} 篇接口文档</span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { integrationMenu, customerMeta } from '../data/integration-menu'
import type { ArasDocNode } from '../data/aras-menu'

const router = useRouter()

function countDocs(node: ArasDocNode): number {
  let c = 0
  if (node.type === 'item') c = 1
  if (node.children) node.children.forEach((ch) => { c += countDocs(ch) })
  return c
}
function go(path?: string) { if (path) router.push(path) }
</script>

<style scoped>
.integ-index { max-width: 860px; }
.page-header { margin-bottom: 32px; }
.page-title { font-size: 32px; font-weight: 800; color: #111827; margin: 0 0 12px 0; letter-spacing: -0.5px; }
.page-desc { font-size: 15px; color: #6b7280; margin: 0; line-height: 1.7; }
.category-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.category-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; cursor: pointer; transition: all 0.2s ease; }
.category-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(99,102,241,0.08); transform: translateY(-2px); }
.card-icon { font-size: 28px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0; line-height: 1.4; }
.card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0 0 16px 0; }
.card-meta { display: flex; align-items: center; justify-content: space-between; }
.meta-tag { font-size: 12px; color: #4f46e5; background: #eef2ff; padding: 2px 8px; border-radius: 4px; }
.card-arrow { font-size: 18px; color: #d1d5db; transition: all 0.2s; }
.category-card:hover .card-arrow { color: #6366f1; transform: translateX(4px); }
@media (max-width: 640px) { .category-grid { grid-template-columns: 1fr; } }
</style>
