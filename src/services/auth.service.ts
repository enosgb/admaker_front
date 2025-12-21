import getCookie from '@/utils/helpers/getCookie'
import { api } from './api.service'

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post(`/auth/login/`, { email, password })
    return response.data
  },

  logout: async () => {
    const csrfToken = getCookie('csrftoken')
    await api.post(`auth/logout/`, {}, { headers: { 'X-CSRFToken': csrfToken } })
  },

  me: async () => {
    const response = await api.get(`auth/current_user/`)
    return response.data
  },
}
