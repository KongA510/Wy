<template>
  <div class="manage-page">
    <div class="page-header">
      <h1 class="page-title">用户管理</h1>
      <p class="page-desc">管理知识库用户账号，可启用/禁用账号、修改密码和显示名称</p>
    </div>
    <div class="toolbar">
      <button class="btn-add" @click="showAdd = true">+ 新增用户</button>
    </div>
    <div class="user-table">
      <div class="table-header">
        <span class="col-user">账号</span>
        <span class="col-name">显示名称</span>
        <span class="col-pwd">密码</span>
        <span class="col-role">角色</span>
        <span class="col-status">状态</span>
        <span class="col-actions">操作</span>
      </div>
      <div v-for="user in users" :key="user.username" class="table-row">
        <span class="col-user">{{ user.username }}</span>
        <span class="col-name">
          <template v-if="editingUser === user.username">
            <input v-model="editName" class="inline-input" />
          </template>
          <template v-else>{{ user.displayName || '-' }}</template>
        </span>
        <span class="col-pwd">
          <template v-if="editingUser === user.username">
            <input v-model="editPwd" class="inline-input" type="text" />
          </template>
          <template v-else>{{ '\u2022'.repeat(user.password.length) }}</template>
        </span>
        <span class="col-role">
          <span :class="['role-tag', user.role]">{{ user.role === 'admin' ? '管理员' : '普通用户' }}</span>
        </span>
        <span class="col-status">
          <span :class="['status-dot', user.enabled ? 'on' : 'off']"></span>
          {{ user.enabled ? '启用' : '禁用' }}
        </span>
        <span class="col-actions">
          <template v-if="editingUser === user.username">
            <button class="act-btn save" @click="saveEdit(user)">保存</button>
            <button class="act-btn cancel" @click="cancelEdit">取消</button>
          </template>
          <template v-else>
            <button class="act-btn edit" @click="startEdit(user)">编辑</button>
            <button v-if="user.role !== 'admin'" class="act-btn toggle" @click="toggleUser(user)">
              {{ user.enabled ? '禁用' : '启用' }}
            </button>
            <button v-if="user.role !== 'admin'" class="act-btn delete" @click="deleteUser(user)">删除</button>
          </template>
        </span>
      </div>
    </div>
    <div v-if="showAdd" class="dialog-overlay" @click.self="showAdd = false">
      <div class="dialog-card">
        <h3 class="dialog-title">新增用户</h3>
        <form class="dialog-form" @submit.prevent="handleAdd">
          <div class="form-group">
            <label class="form-label">账号</label>
            <input v-model="addForm.username" class="form-input" placeholder="登录账号" />
          </div>
          <div class="form-group">
            <label class="form-label">密码</label>
            <input v-model="addForm.password" class="form-input" placeholder="登录密码" />
          </div>
          <div class="form-group">
            <label class="form-label">显示名称</label>
            <input v-model="addForm.displayName" class="form-input" placeholder="显示名称（可选）" />
          </div>
          <div v-if="addError" class="form-error">{{ addError }}</div>
          <div class="dialog-actions">
            <button type="button" class="btn-cancel" @click="showAdd = false">取消</button>
            <button type="submit" class="btn-confirm">添加</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers, adminUpdateUser, adminAddUser, adminDeleteUser } from '../utils/auth'
import type { UserAccount } from '../utils/auth'

const users = ref<UserAccount[]>([])
const editingUser = ref('')
const editName = ref('')
const editPwd = ref('')
const showAdd = ref(false)
const addError = ref('')
const addForm = ref({ username: '', password: '', displayName: '' })

function loadUsers() { users.value = getUsers() }
onMounted(loadUsers)

function startEdit(user: UserAccount) {
  editingUser.value = user.username
  editName.value = user.displayName
  editPwd.value = user.password
}
function cancelEdit() { editingUser.value = '' }
function saveEdit(user: UserAccount) {
  adminUpdateUser(user.username, { displayName: editName.value, password: editPwd.value })
  editingUser.value = ''
  loadUsers()
}
function toggleUser(user: UserAccount) {
  adminUpdateUser(user.username, { enabled: !user.enabled })
  loadUsers()
}
function deleteUser(user: UserAccount) {
  if (!confirm('确定删除用户 ' + user.username + ' ？')) return
  adminDeleteUser(user.username)
  loadUsers()
}
function handleAdd() {
  addError.value = ''
  if (!addForm.value.username || !addForm.value.password) { addError.value = '账号和密码不能为空'; return }
  const ok = adminAddUser({ username: addForm.value.username, password: addForm.value.password, displayName: addForm.value.displayName, role: 'user', enabled: true })
  if (!ok) { addError.value = '账号已存在'; return }
  showAdd.value = false
  addForm.value = { username: '', password: '', displayName: '' }
  loadUsers()
}
</script>

<style scoped>
.manage-page { max-width: 900px; }
.page-header { margin-bottom: 24px; }
.page-title { font-size: 28px; font-weight: 800; color: #111827; margin: 0 0 8px 0; }
.page-desc { font-size: 14px; color: #6b7280; margin: 0; }
.toolbar { margin-bottom: 16px; }
.btn-add { height: 36px; padding: 0 16px; border: none; border-radius: 8px; background: #6366f1; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; }
.btn-add:hover { background: #4f46e5; }
.user-table { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
.table-header { display: grid; grid-template-columns: 120px 100px 120px 80px 80px 180px; padding: 12px 16px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; font-size: 12px; font-weight: 600; color: #6b7280; }
.table-row { display: grid; grid-template-columns: 120px 100px 120px 80px 80px 180px; padding: 12px 16px; border-bottom: 1px solid #f3f4f6; align-items: center; font-size: 14px; color: #374151; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #fafbfc; }
.inline-input { height: 28px; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0 8px; font-size: 13px; width: 90px; outline: none; }
.inline-input:focus { border-color: #6366f1; }
.role-tag { font-size: 12px; padding: 2px 8px; border-radius: 4px; }
.role-tag.admin { background: #fef3c7; color: #92400e; }
.role-tag.user { background: #e0e7ff; color: #3730a3; }
.status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; }
.status-dot.on { background: #22c55e; }
.status-dot.off { background: #ef4444; }
.act-btn { height: 26px; padding: 0 10px; border: 1px solid #e5e7eb; border-radius: 4px; background: #fff; font-size: 12px; cursor: pointer; margin-right: 4px; }
.act-btn.edit { color: #6366f1; border-color: #c7d2fe; }
.act-btn.edit:hover { background: #eef2ff; }
.act-btn.toggle { color: #d97706; border-color: #fde68a; }
.act-btn.toggle:hover { background: #fffbeb; }
.act-btn.delete { color: #ef4444; border-color: #fecaca; }
.act-btn.delete:hover { background: #fef2f2; }
.act-btn.save { color: #16a34a; border-color: #bbf7d0; }
.act-btn.save:hover { background: #f0fdf4; }
.act-btn.cancel { color: #6b7280; }
.dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.dialog-card { width: 360px; background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 12px 48px rgba(0,0,0,0.15); }
.dialog-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 16px 0; }
.dialog-form { display: flex; flex-direction: column; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-label { font-size: 13px; font-weight: 600; color: #374151; }
.form-input { height: 36px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0 12px; font-size: 14px; color: #111827; outline: none; }
.form-input:focus { border-color: #6366f1; }
.form-error { font-size: 13px; color: #ef4444; background: #fef2f2; padding: 6px 10px; border-radius: 6px; }
.dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
.btn-cancel { height: 34px; padding: 0 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; color: #374151; font-size: 14px; cursor: pointer; }
.btn-confirm { height: 34px; padding: 0 16px; border: none; border-radius: 8px; background: #6366f1; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; }
</style>
