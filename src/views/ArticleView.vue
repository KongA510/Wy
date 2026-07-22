<template>
  <div class="article-view">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <router-link to="/" class="bc-link">首页</router-link>
      <span class="bc-sep">/</span>
      <router-link :to="categoryPath" class="bc-link">{{ categoryLabel }}</router-link>
      <span class="bc-sep">/</span>
      <span class="bc-current">{{ articleTitle }}</span>
    </div>

    <!-- 文章头部 -->
    <header class="article-header">
      <h1 class="article-title">{{ articleTitle }}</h1>
      <div class="article-meta">
        <span class="meta-tag">{{ categoryLabel }}</span>
        <span class="meta-date">更新于 2026-07-20</span>
      </div>
    </header>

    <!-- 文章内容 -->
    <article class="article-content">
      <div class="placeholder-content">
        <div class="placeholder-block">
          <h2>📝 文章占位</h2>
          <p>
            这是一个文章模板页面。每个子菜单对应一个独立路由，
            后续可以在此页面编写具体的技术文档内容。
          </p>
        </div>

        <div class="placeholder-block">
          <h3>使用方式</h3>
          <p>在 <code>src/views/</code> 目录下创建对应的 <code>.vue</code> 文件，
          或在路由配置中指向独立组件，即可替换此占位内容。</p>
        </div>

        <div class="placeholder-block">
          <h3>推荐结构</h3>
          <pre class="code-block"><code>src/views/
├── aras/
│   ├── OverviewView.vue
│   ├── FrontendView.vue
│   ├── BackendView.vue
│   ├── ApiView.vue
│   └── TipsView.vue
├── frontend/
│   ├── VueView.vue
│   ├── TypescriptView.vue
│   └── ...
└── ...</code></pre>
        </div>

        <div class="placeholder-block tip">
          <strong>💡 提示：</strong>
          每个 <code>.vue</code> 文件就是一个独立页面，方便后续维护和更新文章。
        </div>
      </div>
    </article>

    <!-- 文章导航 -->
    <nav class="article-nav">
      <router-link :to="categoryPath" class="nav-back">
        ← 返回 {{ categoryLabel }}
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuData } from '../data/menu'

const route = useRoute()

const categoryPath = computed(() => {
  const segments = route.path.split('/')
  return '/' + segments[1]
})

const categoryLabel = computed(() => {
  const catId = route.path.split('/')[1]
  const node = menuData.find(n => n.id === catId)
  return node?.label || ''
})

const articleTitle = computed(() => {
  const catId = route.path.split('/')[1]
  const articleId = route.params.articleId as string
  const node = menuData.find(n => n.id === catId)
  if (node?.children) {
    const child = node.children.find(c => c.path?.includes(articleId))
    if (child) return child.label
  }
  return articleId || '文章详情'
})
</script>

<style scoped>
.article-view {
  max-width: 720px;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  font-size: 13px;
}
.bc-link {
  color: #6b7280;
  text-decoration: none;
}
.bc-link:hover {
  color: #6366f1;
}
.bc-sep {
  color: #d1d5db;
}
.bc-current {
  color: #111827;
  font-weight: 500;
}

/* 文章头部 */
.article-header {
  margin-bottom: 36px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}
.article-title {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  line-height: 1.3;
}
.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}
.meta-tag {
  font-size: 12px;
  color: #6366f1;
  background: #eef2ff;
  padding: 3px 10px;
  border-radius: 4px;
  font-weight: 500;
}
.meta-date {
  font-size: 13px;
  color: #9ca3af;
}

/* 文章内容 */
.article-content {
  line-height: 1.8;
  color: #374151;
  font-size: 15px;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.placeholder-block {
  background: #fafbfc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 24px;
}
.placeholder-block h2 {
  font-size: 20px;
  margin: 0 0 12px 0;
  color: #111827;
}
.placeholder-block h3 {
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #111827;
}
.placeholder-block p {
  margin: 0;
  color: #6b7280;
}
.placeholder-block code {
  background: #eef2ff;
  color: #4f46e5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}
.placeholder-block.tip {
  background: #fffbeb;
  border-color: #fde68a;
}

.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 12px 0 0 0;
}

/* 导航 */
.article-nav {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}
.nav-back {
  font-size: 14px;
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}
.nav-back:hover {
  text-decoration: underline;
}
</style>
