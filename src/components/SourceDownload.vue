<template>
  <div class="src-download">
    <div class="sd-icon">📄</div>
    <div class="sd-info">
      <div class="sd-title">接口完整源码</div>
      <div class="sd-file">{{ file }}</div>
    </div>
    <a class="sd-btn" :href="href" :download="file">⬇ 下载源码</a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ file: string; href: string }>()
</script>

<style scoped>
.src-download {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 20px 0 28px;
  padding: 16px 18px;
  background: linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%);
  border: 1px solid #c7d2fe;
  border-radius: 12px;
}
.sd-icon { font-size: 28px; }
.sd-info { flex: 1; min-width: 0; }
.sd-title { font-size: 13px; font-weight: 700; color: #4f46e5; margin-bottom: 2px; }
.sd-file { font-size: 12.5px; color: #6b7280; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sd-btn {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: #6366f1;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s, transform 0.1s;
}
.sd-btn:hover { background: #4f46e5; }
.sd-btn:active { transform: scale(0.97); }
</style>
