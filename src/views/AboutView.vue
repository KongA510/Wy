<template>
  <div class="about-view">
    <div class="about-card">
      <div class="avatar-placeholder">
        <span class="avatar-text">K</span>
      </div>
      <h1 class="about-name">Kong.A</h1>
      <p class="about-role">一个在学习 Aras .NET 前端的程序员</p>

      <div class="about-bio">
        <p>
          你好！我是 Kong.A，一名专注于 Aras Innovator 平台开发的程序员。
          日常工作中涉及 Aras 前后端开发、.NET / C# 服务端逻辑、
          以及前端 UI 定制与 JavaScript 扩展。
        </p>
        <p>
          这个博客是我的个人知识库，用于记录学习过程中的技术笔记、
          开发经验和踩坑总结。希望这些内容也能帮助到同样在 Aras 领域探索的你。
        </p>
      </div>

      <div class="about-tags">
        <span class="tag">Aras Innovator</span>
        <span class="tag">.NET / C#</span>
        <span class="tag">Vue.js</span>
        <span class="tag">TypeScript</span>
        <span class="tag">SQL Server</span>
        <span class="tag">EF Core</span>
      </div>

      <div class="about-links">
        <a href="https://github.com" target="_blank" class="link-btn">
          <span>🐙</span> GitHub
        </a>
        <a href="mailto:example@email.com" class="link-btn">
          <span>📧</span> Email
        </a>
      </div>
    </div>

    <div class="about-stats">
      <div class="stat-item">
        <div class="stat-number">4</div>
        <div class="stat-label">技术板块</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">15+</div>
        <div class="stat-label">文章分类</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">∞</div>
        <div class="stat-label">持续更新</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-view {
  max-width: 600px;
}

.about-card {
  text-align: center;
  padding: 48px 32px;
  background: #fafbfc;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  margin-bottom: 32px;
}

.avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.avatar-text {
  font-size: 40px;
  font-weight: 800;
  color: #fff;
}

.about-name {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
}
.about-role {
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

.about-bio {
  text-align: left;
  margin-bottom: 24px;
}
.about-bio p {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.8;
  margin: 0 0 12px 0;
}

.about-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}
.tag {
  font-size: 12px;
  color: #4f46e5;
  background: #eef2ff;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.about-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.link-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s;
}
.link-btn:hover {
  border-color: #6366f1;
  color: #4f46e5;
  background: #eef2ff;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.stat-item {
  text-align: center;
  padding: 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 13px;
  color: #6b7280;
}
</style>
