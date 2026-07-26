<template>
  <div class="app-layout">
    <AppHeader />
    <AppSidebar />
    <main class="app-main" :class="{ 'wide-main': isDocZone }">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'

const route = useRoute()
const isDocZone = computed(() => route.path.startsWith('/aras-docs') || route.path.startsWith('/aras-api') || route.path.startsWith('/pm') || route.path.startsWith('/aras-dev') || route.path.startsWith('/server-api'))
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #fff;
}

.app-main {
  margin-left: 280px;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  padding: 40px 48px;
  max-width: 1100px;
}

.wide-main {
  max-width: 900px;
}
</style>

