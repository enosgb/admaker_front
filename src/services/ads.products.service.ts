import { api } from '@/services/api.service'

export const adsProductsService = {
  fetchProducts: async (page = 1, page_size = 10) => {
    const response = await api.get(`ads/products/?page=${page}&page_size=${page_size}`)
    return response.data
  },
  fetchProduct: async (id: number) => {
    const response = await api.get(`ads/products/${id}`)
    return response.data
  },
  createProduct: async (payload: FormData) => {
    const { data } = await api.post(`ads/products/`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
  updateProduct: async (payload: FormData, id: number) => {
    const { data } = await api.patch(`ads/products/${id}/`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
  deleteProduct: async (id: number) => {
    const { data } = await api.delete(`ads/products/${id}/`)
    return data
  },

  fetchPublicProducts: async (page = 1, page_size = 10) => {
    const response = await api.get(`ads/products/public/?page=${page}&page_size=${page_size}`)
    return response.data
  },

  addFavorite: async (id: number) => {
    const { data } = await api.post(`ads/favorites/`, {
      product: id,
    })
    return data
  },
  listFavorites: async (page = 1, page_size = 10) => {
    const response = await api.get(`ads/favorites/?page=${page}&page_size=${page_size}`)
    return response.data
  },
}
