import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue'), meta: { title: '首页' } },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue'), meta: { title: '关于站长' } },
  { path: '/aras-docs', name: 'ArasDocsIndex', component: () => import('../views/ArasDocsIndex.vue'), meta: { title: 'Aras 文档中心' } },
  { path: '/aras-docs/:pathMatch(.*)*', name: 'ArasDoc', component: () => import('../views/ArasDocView.vue'), meta: { title: 'Aras 文档' } },
  { path: '/frontend', name: 'FrontendCategory', component: () => import('../views/CategoryView.vue'), meta: { title: '前端技术', categoryId: 'frontend' } },
  { path: '/frontend/:articleId', name: 'FrontendArticle', component: () => import('../views/ArticleView.vue'), meta: { title: '文章详情' } },
  { path: '/backend', name: 'BackendCategory', component: () => import('../views/CategoryView.vue'), meta: { title: '后端技术', categoryId: 'backend' } },
  { path: '/backend/:articleId', name: 'BackendArticle', component: () => import('../views/ArticleView.vue'), meta: { title: '文章详情' } },
  { path: '/notes', name: 'NotesCategory', component: () => import('../views/CategoryView.vue'), meta: { title: '日常笔记', categoryId: 'notes' } },
  { path: '/notes/:articleId', name: 'NotesArticle', component: () => import('../views/ArticleView.vue'), meta: { title: '文章详情' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  document.title = title ? `${title} - Kong.A Blog` : 'Kong.A Blog'
  next()
})

export default router
