import type { AdProduct } from '@/types/ads.types'
import { adsProductsService } from '@/services/ads.products.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMsgErrDRF } from '@/utils/helpers/getMsgErrDRF'
import type { AxiosErrorResponse } from '@/types/axios.types'

export const useAuthProductsStore = defineStore('adsProducts', () => {
  const products = ref<AdProduct[]>([])
  const total = ref(0)
  const next = ref<string | null>(null)
  const previous = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const pageSize = 10
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  async function fetchProducts(page = 1, page_size = 10) {
    loading.value = true
    const data = await adsProductsService.fetchProducts(page, page_size)
    products.value = data.results
    total.value = data.count
    next.value = data.next
    previous.value = data.previous
    currentPage.value = data.current_page
    totalPages.value = Math.ceil(data.count / pageSize)
    loading.value = false
  }

  async function fetchProduct(id: number) {
    loading.value = true
    const data = await adsProductsService.fetchProduct(id)
    loading.value = false
    return data
  }

  async function createProduct(payload: FormData) {
    loading.value = true
    try {
      const data = await adsProductsService.createProduct(payload)
      products.value.unshift(data)
      total.value += 1
      totalPages.value = Math.ceil(total.value / pageSize)
      success.value = 'Produto criado com sucesso!'
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = getMsgErrDRF(axiosError?.response?.data)
    } finally {
      loading.value = false
    }
  }

  async function updateProduct(payload: FormData, id: number) {
    loading.value = true
    try {
      await adsProductsService.updateProduct(payload, id)
      success.value = 'Produto atualizado com sucesso!'
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = getMsgErrDRF(axiosError?.response?.data)
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id: number) {
    loading.value = true
    try {
      await adsProductsService.deleteProduct(id)
      products.value = products.value.filter((product) => product.id !== id)
      total.value -= 1
      totalPages.value = Math.ceil(total.value / pageSize)
      success.value = 'Produto deletado com sucesso!'
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = getMsgErrDRF(axiosError?.response?.data)
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function clearSuccess() {
    success.value = null
  }

  return {
    products,
    total,
    next,
    previous,
    currentPage,
    totalPages,
    pageSize,
    loading,
    error,
    success,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
    clearSuccess,
  }
})
