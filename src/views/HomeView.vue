<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-badge">👋 Welcome</div>
      <h1 class="hero-title">Kong.A 的技术博客</h1>
      <p class="hero-subtitle">
        记录 Aras 开发、前端技术、后端架构的学习与实践。<br />
        一个在学习 Aras .NET 前端的程序员的个人知识库。
      </p>
    </section>

    <section class="section">
      <h2 class="section-title">📚 技术板块</h2>
      <div class="category-cards">
        <div v-for="card in mainCards" :key="card.path" class="card" @click="$router.push(card.path)">
          <div class="card-icon">{{ card.icon }}</div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-desc">{{ card.description }}</p>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </section>

    <section class="footer-links">
      <router-link to="/about">关于</router-link>
      <span class="divider">|</span>
      <a href="https://github.com" target="_blank">GitHub</a>
    </section>
  </div>
</template>

<script setup lang="ts">
const mainCards = [
  { icon: '📖', title: 'Aras 文档中心', description: '164 篇系统管理文档：核心概念、表单视图、工作流、权限等', path: '/aras-docs' },
  { icon: '💚', title: '前端技术', description: 'Vue 3、TypeScript、CSS 布局、工程化工具链', path: '/frontend' },
  { icon: '🟣', title: '后端技术', description: '.NET / C#、数据库设计、RESTful API 规范', path: '/backend' },
  { icon: '📝', title: '日常笔记', description: '工作日志、读书笔记、技术随想与个人感悟', path: '/notes' }
]
</script>

<style scoped>
.home-view { max-width: 800px; }
.hero { margin-bottom: 48px; }
.hero-badge { display: inline-block; background: #eef2ff; color: #4f46e5; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }
.hero-title { font-size: 36px; font-weight: 800; color: #111827; margin: 0 0 16px 0; letter-spacing: -1px; line-height: 1.2; }
.hero-subtitle { font-size: 16px; color: #6b7280; line-height: 1.8; margin: 0; }
.section { margin-bottom: 48px; }
.section-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 20px 0; }
.category-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.card { position: relative; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; cursor: pointer; transition: all 0.2s ease; }
.card:hover { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(99,102,241,0.08); transform: translateY(-2px); }
.card-icon { font-size: 28px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0; }
.card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }
.card-arrow { position: absolute; top: 24px; right: 24px; font-size: 18px; color: #d1d5db; transition: color 0.2s, transform 0.2s; }
.card:hover .card-arrow { color: #6366f1; transform: translateX(4px); }
.footer-links { display: flex; align-items: center; gap: 12px; padding-top: 32px; border-top: 1px solid #e5e7eb; }
.footer-links a { font-size: 14px; color: #6366f1; text-decoration: none; }
.footer-links a:hover { text-decoration: underline; }
.footer-links .divider { color: #d1d5db; }
</style>
