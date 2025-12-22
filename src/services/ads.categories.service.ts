import { api } from '@/services/api.service'

export const adsCategoriesService = {
  fetchCategories: async (page = 1, page_size = 10) => {
    const response = await api.get(`ads/categories/?page=${page}&page_size=${page_size}`)
    return response.data
  },

  fetchCategory: async (id: number) => {
    const response = await api.get(`ads/categories/${id}`)
    return response.data
  },

  createCategory: async (payload: FormData) => {
    const { data } = await api.post(`ads/categories/`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  updateCategory: async (payload: FormData, id: number) => {
    const { data } = await api.patch(`ads/categories/${id}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  deleteCategory: async (id: number) => {
    const { data } = await api.delete(`ads/categories/${id}`)
    return data
  },
}
