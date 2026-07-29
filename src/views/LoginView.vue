<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <span class="login-icon">⚡</span>
        <h1 class="login-title">Kong.A 知识库</h1>
        <p class="login-subtitle">请登录以继续访问</p>
      </div>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label">账号</label>
          <input
            v-model="username"
            type="text"
            class="form-input"
            placeholder="请输入账号"
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label class="form-label">密码</label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </div>
        <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? '验证中...' : '登 录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../utils/auth'

const router = useRouter()
const route = useRoute()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

function handleLogin() {
  errorMsg.value = ''
  if (!username.value || !password.value) {
    errorMsg.value = '请输入账号和密码'
    return
  }
  loading.value = true
  setTimeout(() => {
    const user = login(username.value, password.value)
    loading.value = false
    if (!user) {
      errorMsg.value = '账号或密码错误，或账号已被禁用'
      return
    }
    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  }, 300)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}
.login-card {
  width: 380px;
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
}
.login-header {
  text-align: center;
  margin-bottom: 32px;
}
.login-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 12px;
}
.login-title {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 6px 0;
}
.login-subtitle {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.form-input {
  height: 42px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}
.form-error {
  font-size: 13px;
  color: #ef4444;
  background: #fef2f2;
  padding: 8px 12px;
  border-radius: 6px;
}
.login-btn {
  height: 42px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.login-btn:hover {
  background: #4f46e5;
}
.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
