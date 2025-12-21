import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { computed, watch } from 'vue'

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()

  const user = computed(() => store.user)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)

  const login = async (email: string, password: string) => {
    await store.login(email, password)
  }

  const logout = async () => {
    await store.logout()
    router.push({ name: 'auth-page' })
  }

  const clearError = () => {
    store.clearError()
  }

  watch(
    user,
    (newUser) => {
      if (newUser) {
        if (newUser.is_staff) {
          router.push({ name: 'home-admin' })
        } else {
          router.push({ name: 'home-user' })
        }
      }
    },
    { immediate: true },
  )

  return {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
  }
}
