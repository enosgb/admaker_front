import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'

export function useUsers() {
  const store = useUserStore()

  const fetchUsers = (page = 1) => store.fetchUsers(page)

  return {
    users: computed(() => store.users),
    total: computed(() => store.total),
    currentPage: computed(() => store.currentPage),
    totalPages: computed(() => store.totalPages),
    fetchUsers,
  }
}
