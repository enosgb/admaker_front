import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/pages/auth/AuthPage.vue'
import HomeAdmin from '@/pages/HomeAdmin.vue'
import HomeUser from '@/pages/HomeUser.vue'

import { setupAuthGuard } from './guards/auth.guard'

const routes = [
  {
    path: '/admin',
    name: 'home-admin',
    component: HomeAdmin,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'home-user',
    component: HomeUser,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'auth-page',
    component: AuthPage,
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

setupAuthGuard(router)

export default router
