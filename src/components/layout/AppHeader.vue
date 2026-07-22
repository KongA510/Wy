<template>
  <header class="app-header">
    <div class="header-left">
      <router-link to="/" class="logo-link">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Kong.A</span>
        <span class="logo-divider">/</span>
        <span class="logo-sub">技术博客</span>
      </router-link>
    </div>
    <div class="header-right">
      <a class="header-link" href="https://github.com" target="_blank">GitHub</a>
      <router-link to="/aras-docs" class="header-link" :class="{ active: isDocs }">文档</router-link>
      <router-link to="/about" class="header-link" :class="{ active: isAbout }">关于</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDocs = computed(() => route.path.startsWith('/aras-docs'))
const isAbout = computed(() => route.path === '/about')
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #111827;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-divider {
  color: #d1d5db;
  font-size: 18px;
  margin: 0 4px;
}

.logo-sub {
  font-size: 15px;
  color: #6b7280;
  font-weight: 400;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 28px;
}

.header-link {
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
}

.header-link:hover,
.header-link.active {
  color: #111827;
}
</style>
