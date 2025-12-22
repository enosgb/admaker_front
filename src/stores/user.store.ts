import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '@/services/user.service'
import type { User } from '@/types/user.types'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([])
  const total = ref(0)
  const next = ref<string | null>(null)
  const previous = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const pageSize = 3

  async function fetchUsers(page = 1) {
    const data = await userService.fetchUsers(page)
    users.value = data.results
    total.value = data.count
    next.value = data.next
    previous.value = data.previous
    currentPage.value = data.current_page
    totalPages.value = Math.ceil(data.count / pageSize)
  }

  return { users, total, next, previous, currentPage, totalPages, fetchUsers }
})
