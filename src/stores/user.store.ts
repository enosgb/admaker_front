import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '@/services/user.service'
import type { User } from '@/types/user.types'
import { getMsgErrDRF } from '@/utils/helpers/getMsgErrDRF'
import type { AxiosErrorResponse } from '@/types/axios.types'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([])
  const total = ref(0)
  const next = ref<string | null>(null)
  const previous = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const pageSize = 10
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  async function fetchUsers(page = 1, page_size = 10) {
    const data = await userService.fetchUsers(page, page_size)
    users.value = data.results
    total.value = data.count
    next.value = data.next
    previous.value = data.previous
    currentPage.value = data.current_page
    totalPages.value = Math.ceil(data.count / pageSize)
  }

  async function createUser(payload: FormData) {
    loading.value = true
    try {
      const newUser = await userService.createUser(payload)
      users.value.unshift(newUser)
      total.value += 1
      totalPages.value = Math.ceil(total.value / pageSize)
      success.value = 'Usuário criado com sucesso!'
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = getMsgErrDRF(axiosError?.response?.data) || 'Erro ao criar usuário'
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearSuccess = () => {
    success.value = null
  }

  return {
    users,
    total,
    next,
    previous,
    currentPage,
    totalPages,
    fetchUsers,
    createUser,
    error,
    success,
    loading,
    clearError,
    clearSuccess,
  }
})
