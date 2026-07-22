<template>
  <div class="category-cards">
    <div
      v-for="card in cards"
      :key="card.path"
      class="card"
      @click="$router.push(card.path)"
    >
      <div class="card-icon">{{ card.icon }}</div>
      <h3 class="card-title">{{ card.title }}</h3>
      <p class="card-desc">{{ card.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryCard } from '../types'

defineProps<{ cards: CategoryCard[] }>()
</script>

<style scoped>
.category-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 28px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.card:hover {
  border-color: #c7d2fe;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.08);
  transform: translateY(-2px);
}

.card-icon {
  font-size: 28px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.card-desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}
</style>
