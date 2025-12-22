import { useAdsCategoriesStore } from '@/stores/ads.categories.store'
import { computed } from 'vue'

export const useAdsCategories = () => {
  const store = useAdsCategoriesStore()

  const error = computed(() => store.error)
  const success = computed(() => store.success)
  const loading = computed(() => store.loading)

  const fetchCategories = (page = 1) => store.fetchCategories(page)
  const fetchCategory = (id: number) => store.fetchCategory(id)
  const createCategory = (payload: FormData) => store.createCategory(payload)
  const updateCategory = async (payload: FormData, id: number) => {
    await store.updateCategory(payload, id)
    await fetchCategories()
  }
  const deleteCategory = async (id: number) => {
    await store.deleteCategory(id)
    await fetchCategories()
  }
  const clearError = () => store.clearError()
  const clearSuccess = () => store.clearSuccess()

  return {
    error,
    success,
    loading,
    categories: computed(() => store.categories),
    total: computed(() => store.total),
    next: computed(() => store.next),
    previous: computed(() => store.previous),
    currentPage: computed(() => store.currentPage),
    totalPages: computed(() => store.totalPages),
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError,
    clearSuccess,
  }
}
