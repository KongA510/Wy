import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue'), meta: { title: '首页' } },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue'), meta: { title: '关于站长' } },
  { path: '/aras-docs', name: 'ArasDocsIndex', component: () => import('../views/ArasDocsIndex.vue'), meta: { title: '系统操作手册' } },
  { path: '/aras-docs/:pathMatch(.*)*', name: 'ArasDoc', component: () => import('../views/ArasDocView.vue'), meta: { title: '系统操作手册' } },
  { path: '/frontend', name: 'FrontendCategory', component: () => import('../views/CategoryView.vue'), meta: { title: '前端技术', categoryId: 'frontend' } },
  { path: '/frontend/:articleId', name: 'FrontendArticle', component: () => import('../views/ArticleView.vue'), meta: { title: '文章详情' } },
  { path: '/backend', name: 'BackendCategory', component: () => import('../views/CategoryView.vue'), meta: { title: '后端技术', categoryId: 'backend' } },
  { path: '/backend/:articleId', name: 'BackendArticle', component: () => import('../views/ArticleView.vue'), meta: { title: '文章详情' } },
  { path: '/notes', name: 'NotesCategory', component: () => import('../views/CategoryView.vue'), meta: { title: '日常笔记', categoryId: 'notes' } },
  { path: '/notes/:articleId', name: 'NotesArticle', component: () => import('../views/ArticleView.vue'), meta: { title: '文章详情' } },
  { path: '/pm', name: 'PmIndex', component: () => import('../views/PmIndex.vue'), meta: { title: '项目管理' } },
  { path: '/pm/:docId', name: 'PmDoc', component: () => import('../views/PmDocView.vue'), meta: { title: '项目管理笔记' } },
  { path: '/aras-dev', name: 'ArasDevIndex', component: () => import('../views/ArasDevIndex.vue'), meta: { title: 'Aras 开发笔记' } },
  { path: '/aras-dev/:docId', name: 'ArasDevDoc', component: () => import('../views/ArasDevDocView.vue'), meta: { title: 'Aras 开发笔记' } },
  { path: '/server-api', name: 'ServerApiIndex', component: () => import('../views/ServerApiIndex.vue'), meta: { title: 'Aras 开发目录' } },
  { path: '/server-api/:docId', name: 'ServerApiDoc', component: () => import('../views/ServerApiDocView.vue'), meta: { title: 'Aras 开发目录' } },
  { path: '/aras-client', name: 'ArasClientIndex', component: () => import('../views/ArasClientIndex.vue'), meta: { title: 'Aras 客户端文档' } },
  { path: '/aras-client/:docId', name: 'ArasClientDoc', component: () => import('../views/ArasClientDocView.vue'), meta: { title: 'Aras 客户端文档' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  document.title = title ? `${title} - Kong.A Blog` : 'Kong.A Blog'
  next()
})

export default router
