import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'

export function useUsers() {
  const store = useUserStore()

  const error = computed(() => store.error)
  const success = computed(() => store.success)
  const loading = computed(() => store.loading)

  const fetchUsers = (page = 1) => store.fetchUsers(page)
  const createUser = (payload: FormData) => store.createUser(payload)
  const clearError = () => store.clearError()
  const clearSuccess = () => store.clearSuccess()

  return {
    users: computed(() => store.users),
    total: computed(() => store.total),
    currentPage: computed(() => store.currentPage),
    totalPages: computed(() => store.totalPages),
    fetchUsers,
    createUser,
    error,
    success,
    loading,
    clearError,
    clearSuccess,
  }
}
