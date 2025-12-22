import getCookie from '@/utils/helpers/getCookie'
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1/',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
})

api.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken')

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken
  }

  return config
})
