import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

export function setupAuthGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.user) {
      next({ name: 'auth-page' })
      return
    }

    if (authStore.user?.is_staff) {
      if (to.name !== 'home-admin') {
        next({ name: 'home-admin' })
        return
      }
    } else if (authStore.user && !authStore.user.is_staff) {
      if (to.name === 'auth-page' || to.name === 'home-admin') {
        next({ name: 'home-user' })
        return
      }
    }

    if (to.name === 'auth-page' && authStore.user) {
      if (authStore.user.is_staff) {
        next({ name: 'home-admin' })
      } else {
        next({ name: 'home-user' })
      }
      return
    }

    next()
  })
}
