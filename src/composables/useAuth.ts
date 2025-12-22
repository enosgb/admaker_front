import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { computed } from 'vue'

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()

  const user = computed(() => store.user)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const success = computed(() => store.success)

  const login = async (email: string, password: string) => {
    await store.login(email, password)
    if (store.user?.is_staff) {
      await router.replace({ name: 'home-admin' })
    } else {
      await router.replace({ name: 'home-user' })
    }
  }

  const logout = async () => {
    await store.logout()
    if (!store.user) {
      await router.replace({ name: 'auth-page' })
    }
  }

  const changePassword = async (
    old_password: string,
    new_password: string,
    confirm_new_password: string,
  ) => {
    await store.changePassword(old_password, new_password, confirm_new_password)
  }

  const clearError = () => {
    store.clearError()
  }
  const clearSuccess = () => {
    store.clearSuccess()
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    changePassword,
    success,
    clearSuccess,
  }
}
