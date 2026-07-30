<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { ref, onMounted } from 'vue'
import { isLoggedIn, logout as doLogout, getCurrentUser } from './utils/auth'
import LoginPage from './components/LoginPage.vue'

const { Layout } = DefaultTheme

const checked = ref(false)
const authenticated = ref(false)
const currentUser = ref<any>(null)

onMounted(() => {
  currentUser.value = getCurrentUser()
  authenticated.value = !!currentUser.value
  checked.value = true
})

function handleLoginSuccess() {
  currentUser.value = getCurrentUser()
  authenticated.value = true
}

function handleLogout() {
  doLogout()
  authenticated.value = false
  currentUser.value = null
}
</script>

<template>
  <Layout v-if="!checked" />

  <div v-else-if="!authenticated" class="login-overlay">
    <LoginPage @success="handleLoginSuccess" />
  </div>

  <Layout v-else>
    <template #nav-bar-content-after>
      <div class="user-controls">
        <span class="user-name">{{ currentUser?.displayName || currentUser?.username }}</span>
        <button class="logout-btn" @click="handleLogout">退出</button>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.login-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
}
.user-name {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.logout-btn {
  font-size: 12px;
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.logout-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
