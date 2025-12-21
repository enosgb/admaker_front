// src/stores/auth.store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/auth.service'

export interface User {
  id: number
  name: string
  email: string
  is_staff?: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const response = await authService.login(email, password)

      user.value = response.user

      console.log('User atualizado na store:', user.value)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao logar'
      user.value = null
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      error.value = null
    }
  }

  const isAuthenticated = () => !!user.value

  const clearError = () => {
    error.value = null
  }

  interface AxiosErrorResponse {
    response?: {
      data?: {
        message?: string
      }
    }
  }
  async function checkAuth() {
    if (user.value) return

    try {
      const response = await authService.me()
      user.value = response.user
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = axiosError?.response?.data?.message || 'Erro ao verificar autenticação'
      user.value = null
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    clearError,
    checkAuth,
  }
})
