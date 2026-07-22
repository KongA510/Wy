<template>
  <div class="tree-node">
    <!-- 文档叶子节点 -->
    <div
      v-if="node.type === 'item'"
      class="tree-item"
      :class="{ active: currentPath === node.path }"
      :style="{ paddingLeft: depth * 16 + 12 + 'px' }"
      @click="goTo(node.path)"
    >
      <span class="tree-dot" :class="{ active: currentPath === node.path }"></span>
      <span class="tree-label">{{ node.name }}</span>
    </div>

    <!-- 分组节点 (group / subgroup) -->
    <template v-else>
      <div
        class="tree-group"
        :class="{ 'is-group': node.type === 'group' }"
        :style="{ paddingLeft: depth * 16 + 12 + 'px' }"
        @click="toggle"
      >
        <span v-if="node.type === 'group'" class="group-bar"></span>
        <el-icon v-else class="tree-arrow" :class="{ expanded: isOpen }"><ArrowRight /></el-icon>
        <span class="tree-label group-label">{{ node.name }}</span>
        <span class="tree-count">{{ itemCount }}</span>
        <el-icon v-if="node.type === 'group'" class="tree-arrow group-arrow" :class="{ expanded: isOpen }"><ArrowRight /></el-icon>
      </div>
      <transition name="tree-slide">
        <div v-show="isOpen" class="tree-children" :class="{ 'group-children': node.type === 'group' }">
          <TreeNode
            v-for="child in node.children"
            :key="child.id"
            :node="child"
            :current-path="currentPath"
            :depth="depth + 1"
          />
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import type { ArasDocNode } from '../../data/aras-menu'

const props = defineProps<{
  node: ArasDocNode
  currentPath: string
  depth: number
}>()

const router = useRouter()
const isOpen = ref(false)

const itemCount = computed(() => {
  let c = 0
  function count(n: ArasDocNode) {
    if (n.type === 'item') c++
    if (n.children) n.children.forEach(count)
  }
  count(props.node)
  return c
})

function isAncestor(node: ArasDocNode, p: string): boolean {
  if (node.path === p) return true
  if (node.children) return node.children.some(c => isAncestor(c, p))
  return false
}

if (isAncestor(props.node, props.currentPath)) isOpen.value = true

watch(() => props.currentPath, (p) => {
  if (isAncestor(props.node, p)) isOpen.value = true
})

function toggle() { isOpen.value = !isOpen.value }
function goTo(p?: string) { if (p) router.push(p) }
</script>

<style scoped>
.tree-item {
  display: flex; align-items: center; gap: 8px; padding: 6px 12px;
  border-radius: 6px; cursor: pointer; font-size: 13px; color: #4b5563;
  transition: all 0.15s; line-height: 1.4;
}
.tree-item:hover { background: #f3f4f6; color: #111827; }
.tree-item.active { background: #eef2ff; color: #4f46e5; font-weight: 600; }
.tree-dot { width: 4px; height: 4px; border-radius: 50%; background: #d1d5db; flex-shrink: 0; }
.tree-dot.active { background: #4f46e5; }

.tree-group {
  display: flex; align-items: center; gap: 6px; padding: 7px 12px;
  border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
  color: #1f2937; transition: background 0.15s;
}
.tree-group:hover { background: #f3f4f6; }
.tree-group.is-group { font-size: 14px; padding: 10px 12px; }

.group-bar {
  width: 3px; height: 16px; border-radius: 2px;
  background: #6366f1; flex-shrink: 0;
}

.tree-count {
  font-size: 11px; color: #9ca3af; background: #f3f4f6;
  padding: 1px 6px; border-radius: 10px; font-weight: 500;
}

.tree-arrow { font-size: 10px; color: #9ca3af; transition: transform 0.2s; flex-shrink: 0; }
.tree-arrow.expanded { transform: rotate(90deg); }
.group-arrow { margin-left: auto; }

.tree-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tree-children { margin-left: 8px; }
.group-children { border-left: none; margin-left: 0; }

.tree-slide-enter-active, .tree-slide-leave-active { transition: all 0.2s ease; overflow: hidden; }
.tree-slide-enter-from, .tree-slide-leave-to { opacity: 0; max-height: 0; }
.tree-slide-enter-to, .tree-slide-leave-from { opacity: 1; max-height: 2000px; }
</style>
