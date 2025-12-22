import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { ROLES } from '@/constants/roles'

export function setupAuthGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.user) {
      next({ name: 'auth-page' })
      return
    }

    if (!authStore.user) {
      next()
      return
    }

    const userRole = authStore.user.is_staff ? ROLES.ADMIN : ROLES.USER

    const allowedRoles = to.meta.allowedRoles as string[] | undefined
    console.log('to:', to.name)
    console.log('allowedRoles:', allowedRoles)
    console.log('userRole:', userRole)

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      next({
        name: authStore.user.is_staff ? 'home-admin' : 'home-user',
      })
      return
    }

    next()
  })
}
