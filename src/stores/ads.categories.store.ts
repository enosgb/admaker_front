import { adsCategoriesService } from '@/services/ads.categories.service'
import type { AdCategory } from '@/types/ads.types'
import type { AxiosErrorResponse } from '@/types/axios.types'
import { getMsgErrDRF } from '@/utils/helpers/getMsgErrDRF'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdsCategoriesStore = defineStore('adsCategories', () => {
  const categories = ref<AdCategory[]>([])
  const total = ref(0)
  const next = ref<string | null>(null)
  const previous = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const pageSize = 10
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  async function fetchCategories(page = 1, page_size = 10) {
    loading.value = true
    const data = await adsCategoriesService.fetchCategories(page, page_size)
    categories.value = data.results
    total.value = data.count
    next.value = data.next
    previous.value = data.previous
    currentPage.value = data.current_page
    totalPages.value = Math.ceil(data.count / pageSize)
    loading.value = false
  }

  async function fetchCategory(id: number) {
    loading.value = true
    const data = await adsCategoriesService.fetchCategory(id)
    loading.value = false
    return data
  }

  async function createCategory(payload: FormData) {
    loading.value = true
    try {
      const data = await adsCategoriesService.createCategory(payload)
      categories.value.unshift(data)
      total.value += 1
      totalPages.value = Math.ceil(total.value / pageSize)
      success.value = 'Categoria criada com sucesso!'
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = getMsgErrDRF(axiosError?.response?.data)
    } finally {
      loading.value = false
    }
  }

  async function updateCategory(payload: FormData, id: number) {
    loading.value = true
    try {
      await adsCategoriesService.updateCategory(payload, id)
      success.value = 'Categoria atualizada com sucesso!'
    } catch (err: unknown) {
      const axiosError = err as AxiosErrorResponse
      error.value = getMsgErrDRF(axiosError?.response?.data)
    } finally {
      loading.value = false
    }
  }

  async function deleteCategory(id: number) {
    loading.value = true
    try {
      await adsCategoriesService.deleteCategory(id)
      categories.value = categories.value.filter((category) => category.id !== id)
      total.value -= 1
      totalPages.value = Math.ceil(total.value / pageSize)
      success.value = 'Categoria deletada com sucesso!'
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
    categories,
    total,
    next,
    previous,
    currentPage,
    totalPages,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  }
})
