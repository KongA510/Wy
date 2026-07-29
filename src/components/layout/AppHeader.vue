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
      <router-link v-if="currentUser && currentUser.role === 'admin'" to="/user-manage" class="header-link">用户管理</router-link>

      <!-- 用户头像区域 -->
      <div v-if="currentUser" class="user-area">
        <div class="user-avatar" @click="showMenu = !showMenu">
          {{ avatarText }}
        </div>
        <span class="user-welcome">欢迎 {{ displayName }}</span>
        <div v-if="showMenu" class="user-dropdown">
          <div class="dropdown-item" @click="openChangePwd">修改密码</div>
          <div class="dropdown-item danger" @click="handleLogout">退出登录</div>
        </div>
      </div>
    </div>

    <ChangePasswordDialog
      v-model:visible="showChangePwd"
      :username="currentUser?.username || ''"
      @logout="handleLogout"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentUser, logout } from '../../utils/auth'
import type { UserAccount } from '../../utils/auth'
import ChangePasswordDialog from '../ChangePasswordDialog.vue'

const router = useRouter()
const route = useRoute()
const currentUser = ref<UserAccount | null>(null)
const showMenu = ref(false)
const showChangePwd = ref(false)

const isDocs = computed(() => route.path.startsWith('/aras-docs'))
const isAbout = computed(() => route.path === '/about')

const displayName = computed(() => {
  if (!currentUser.value) return ''
  return currentUser.value.displayName || currentUser.value.username
})

const avatarText = computed(() => {
  const name = displayName.value
  return name ? name.charAt(0).toUpperCase() : '?'
})

function refreshUser() {
  currentUser.value = getCurrentUser()
}

function openChangePwd() {
  showMenu.value = false
  showChangePwd.value = true
}

function handleLogout() {
  showMenu.value = false
  logout()
  currentUser.value = null
  router.replace('/login')
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.user-area')) {
    showMenu.value = false
  }
}

onMounted(() => {
  refreshUser()
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
.header-left { display: flex; align-items: center; }
.logo-link { display: flex; align-items: center; gap: 8px; text-decoration: none; color: #111827; }
.logo-icon { font-size: 24px; }
.logo-text { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
.logo-divider { color: #d1d5db; font-size: 18px; margin: 0 4px; }
.logo-sub { font-size: 15px; color: #6b7280; font-weight: 400; }
.header-right { display: flex; align-items: center; gap: 20px; }
.header-link { font-size: 14px; color: #6b7280; cursor: pointer; text-decoration: none; transition: color 0.2s; }
.header-link:hover, .header-link.active { color: #111827; }
.user-area {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  padding-left: 16px;
  border-left: 1px solid #e5e7eb;
}
.user-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: #6366f1; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.2s;
}
.user-avatar:hover { background: #4f46e5; }
.user-welcome { font-size: 13px; color: #374151; white-space: nowrap; }
.user-dropdown {
  position: absolute; top: 42px; right: 0;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1); min-width: 120px; overflow: hidden; z-index: 200;
}
.dropdown-item { padding: 10px 16px; font-size: 13px; color: #374151; cursor: pointer; transition: background 0.15s; }
.dropdown-item:hover { background: #f3f4f6; }
.dropdown-item.danger { color: #ef4444; }
.dropdown-item.danger:hover { background: #fef2f2; }
</style>
