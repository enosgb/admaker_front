import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/pages/auth/AuthPage.vue'
import HomeAdmin from '@/pages/HomeAdmin.vue'
import HomeUser from '@/pages/HomeUser.vue'

import { setupAuthGuard } from './guards/auth.guard'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import { ROLES } from '@/constants/ROLES'
import UsersPage from '@/pages/management/users/UsersPage.vue'
import AdsCategoriesPage from '@/pages/management/ads/categories/AdsCategoriesPage.vue'
import AdsCreateCategoryPage from '@/pages/management/ads/categories/AdsCreateCategoryPage.vue'

const routes = [
  {
    path: '/admin',
    name: 'home-admin',
    component: HomeAdmin,
    meta: { requiresAuth: true, allowedRoles: [ROLES.ADMIN] },
  },
  {
    path: '/',
    name: 'home-user',
    component: HomeUser,
    meta: { requiresAuth: true, allowedRoles: [ROLES.USER] },
  },
  {
    path: '/profile',
    name: 'profile-page',
    component: ProfilePage,
    meta: { requiresAuth: true, allowedRoles: [ROLES.USER, ROLES.ADMIN] },
  },
  {
    path: '/users',
    name: 'users-page',
    component: UsersPage,
    meta: { requiresAuth: true, allowedRoles: [ROLES.ADMIN] },
  },
  {
    path: '/ads/categories',
    name: 'ads-categories-page',
    component: AdsCategoriesPage,
    meta: { requiresAuth: true, allowedRoles: [ROLES.ADMIN] },
  },
  {
    path: '/ads/category',
    name: 'ads-create-category-page',
    component: AdsCreateCategoryPage,
    meta: { requiresAuth: true, allowedRoles: [ROLES.ADMIN] },
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
