import { api } from './api.service'

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post(`/auth/login/`, { email, password })
    return response.data
  },

  logout: async () => {
    await api.post(`auth/logout/`, {})
  },

  me: async () => {
    const response = await api.get(`auth/current_user/`)
    return response.data
  },
}
