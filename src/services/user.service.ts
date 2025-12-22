import type { ApiResponse } from '@/types/axios.types'
import { api } from './api.service'
import type { User } from '@/types/user.types'

export const userService = {
  updateProfileImage: async (file: File, id: number) => {
    const form = new FormData()
    form.append('image', file)
    return await api.patch(`users/${id}/`, form)
  },

  async fetchUsers(page = 1): Promise<ApiResponse<User>> {
    const response = api.get(`users/?page=${page}&page_size=3`)
    return response.then((res) => res.data)
  },
}
