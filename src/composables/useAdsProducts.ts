import { useAuthProductsStore } from '@/stores/ads.products.store'
import { computed } from 'vue'

export const useAdsProducts = () => {
  const store = useAuthProductsStore()

  const error = computed(() => store.error)
  const success = computed(() => store.success)
  const loading = computed(() => store.loading)

  const fetchProducts = (page = 1) => store.fetchProducts(page)
  const fetchProduct = (id: number) => store.fetchProduct(id)
  const createProduct = (payload: FormData) => store.createProduct(payload)
  const updateProduct = async (payload: FormData, id: number) => {
    await store.updateProduct(payload, id)
    await fetchProducts()
  }
  const deleteProduct = async (id: number) => {
    await store.deleteProduct(id)
    await fetchProducts()
  }
  const clearError = () => store.clearError()
  const clearSuccess = () => store.clearSuccess()

  const fetchPublicProducts = async () => {
    const data = await store.fetchPublicProducts()
    return data
  }
  const addFavorite = async (id: number) => {
    await store.addFavorite(id)
  }

  return {
    error,
    success,
    loading,
    products: computed(() => store.products),
    total: computed(() => store.total),
    next: computed(() => store.next),
    previous: computed(() => store.previous),
    currentPage: computed(() => store.currentPage),
    totalPages: computed(() => store.totalPages),
    pageSize: computed(() => store.pageSize),
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
    clearSuccess,
    fetchPublicProducts,
    addFavorite,
  }
}
