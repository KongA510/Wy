<template>
  <div class="category-view">
    <div class="category-header">
      <h1 class="category-title">{{ categoryLabel }}</h1>
      <p class="category-desc">{{ categoryDesc }}</p>
    </div>

    <CategoryCards v-if="cards.length" :cards="cards" />

    <div v-else class="empty-state">
      <div class="empty-icon">📄</div>
      <p>该分类下暂无内容</p>
    </div>

    <!-- 底部快捷链接 -->
    <div class="category-footer" v-if="cards.length">
      <router-link
        v-for="card in cards"
        :key="card.path"
        :to="card.path"
        class="footer-link"
      >
        {{ card.title }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuData, categoryCardsMap } from '../data/menu'
import CategoryCards from '../components/CategoryCards.vue'

const route = useRoute()

const categoryId = computed(() => {
  return (route.meta.categoryId as string) || route.path.split('/')[1]
})

const categoryLabel = computed(() => {
  const node = menuData.find(n => n.id === categoryId.value)
  return node?.label || ''
})

const categoryDesc = computed(() => {
  const node = menuData.find(n => n.id === categoryId.value)
  return node?.description || ''
})

const cards = computed(() => {
  return categoryCardsMap[categoryId.value] || []
})
</script>

<style scoped>
.category-view {
  max-width: 800px;
}

.category-header {
  margin-bottom: 36px;
}
.category-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}
.category-desc {
  font-size: 15px;
  color: #6b7280;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #9ca3af;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.category-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
}
.footer-link {
  font-size: 14px;
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}
.footer-link:hover {
  text-decoration: underline;
}
.footer-link + .footer-link::before {
  content: '|';
  color: #d1d5db;
  margin-right: 8px;
}
</style>
