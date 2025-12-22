import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/auth.service'
import type { AxiosErrorResponse } from '@/types/axios.types'
import { getMsgErrDRF } from '@/utils/helpers/getMsgErrDRF'

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
  const success = ref<string | null>(null)

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null

    try {
      await authService.login(email, password)

      const meResponse = await authService.me()

      user.value = meResponse.user
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = axiosError.response?.data?.message || 'Erro ao logar'
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

  const clearSuccess = () => {
    success.value = null
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

  async function changePassword(
    old_password: string,
    new_password: string,
    confirm_new_password: string,
  ) {
    loading.value = true
    error.value = null
    try {
      const response = await authService.changePassword(
        old_password,
        new_password,
        confirm_new_password,
      )
      success.value = 'Senha alterada com sucesso!'
      return response
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = getMsgErrDRF(axiosError?.response?.data)
    } finally {
      loading.value = false
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
    clearSuccess,
    checkAuth,
    changePassword,
    success,
  }
})
