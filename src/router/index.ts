import { createRouter, createWebHistory } from 'vue-router'

import AuthPage from '@/pages/auth/AuthPage.vue'

const routes = [
  {
    path: '/login',
    name: 'auth-page',
    component: AuthPage,
  },
] as const

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
