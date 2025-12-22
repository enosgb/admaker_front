import type { ApiResponse } from '@/types/axios.types'
import { api } from './api.service'
import type { User } from '@/types/user.types'

export const userService = {
  updateProfileImage: async (file: File, id: number) => {
    const form = new FormData()
    form.append('image', file)
    return await api.patch(`users/${id}/`, form)
  },

  async fetchUsers(page = 1, page_size = 10): Promise<ApiResponse<User>> {
    const response = api.get(`users/?page=${page}&page_size=${page_size}`)
    return response.then((res) => res.data)
  },
  async createUser(payload: FormData): Promise<User> {
    const { data } = await api.post<User>('users/', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  async updateUser(payload: FormData, id: number): Promise<User> {
    const { data } = await api.patch<User>(`users/${id}/`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
}
