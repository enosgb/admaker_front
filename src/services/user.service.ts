import { api } from './api.service'

export const userService = {
  updateProfileImage: async (file: File, id: number) => {
    const form = new FormData()
    form.append('image', file)
    return await api.patch(`users/${id}/`, form)
  },
}
