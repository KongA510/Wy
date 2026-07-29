<template>
  <div v-if="visible" class="dialog-overlay" @click.self="close">
    <div class="dialog-card">
      <h3 class="dialog-title">修改密码</h3>
      <form class="dialog-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">当前密码</label>
          <input v-model="oldPwd" type="password" class="form-input" placeholder="请输入当前密码" />
        </div>
        <div class="form-group">
          <label class="form-label">新密码</label>
          <input v-model="newPwd" type="password" class="form-input" placeholder="请输入新密码" />
        </div>
        <div class="form-group">
          <label class="form-label">确认新密码</label>
          <input v-model="confirmPwd" type="password" class="form-input" placeholder="再次输入新密码" />
        </div>
        <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>
        <div v-if="successMsg" class="form-success">{{ successMsg }}</div>
        <div class="dialog-actions">
          <button type="button" class="btn-cancel" @click="close">取消</button>
          <button type="submit" class="btn-confirm">确认修改</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { changePassword, logout } from '../utils/auth'

const props = defineProps<{ visible: boolean; username: string }>()
const emit = defineEmits<{ (e: 'update:visible', v: boolean): void; (e: 'logout'): void }>()

const oldPwd = ref('')
const newPwd = ref('')
const confirmPwd = ref('')
const errorMsg = ref('')
const successMsg = ref('')

watch(() => props.visible, (v) => {
  if (v) { oldPwd.value = ''; newPwd.value = ''; confirmPwd.value = ''; errorMsg.value = ''; successMsg.value = '' }
})

function close() { emit('update:visible', false) }

function handleSubmit() {
  errorMsg.value = ''
  successMsg.value = ''
  if (!oldPwd.value || !newPwd.value || !confirmPwd.value) {
    errorMsg.value = '请填写所有字段'
    return
  }
  if (newPwd.value !== confirmPwd.value) {
    errorMsg.value = '两次输入的新密码不一致'
    return
  }
  if (newPwd.value.length < 3) {
    errorMsg.value = '新密码长度不能少于3位'
    return
  }
  const ok = changePassword(props.username, oldPwd.value, newPwd.value)
  if (!ok) {
    errorMsg.value = '当前密码错误'
    return
  }
  successMsg.value = '密码修改成功，即将退出登录...'
  setTimeout(() => {
    logout()
    emit('logout')
  }, 1200)
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.dialog-card {
  width: 380px;
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.15);
}
.dialog-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px 0;
}
.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.form-input {
  height: 38px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: #6366f1;
}
.form-error {
  font-size: 13px;
  color: #ef4444;
  background: #fef2f2;
  padding: 6px 10px;
  border-radius: 6px;
}
.form-success {
  font-size: 13px;
  color: #16a34a;
  background: #f0fdf4;
  padding: 6px 10px;
  border-radius: 6px;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}
.btn-cancel {
  height: 36px;
  padding: 0 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
}
.btn-cancel:hover { background: #f9fafb; }
.btn-confirm {
  height: 36px;
  padding: 0 18px;
  border: none;
  border-radius: 8px;
  background: #6366f1;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.btn-confirm:hover { background: #4f46e5; }
</style>
