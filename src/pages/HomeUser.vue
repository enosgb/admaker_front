<template>
  <div class="relative min-h-screen">

    <MiniAlert :eventName="error" bg-color="bg-red-500" />
    <MiniAlert :eventName="success" bg-color="bg-green-500" />


    <AlertConfirm :isOpen="isAlertOpen" title="Excluir Produto" message="Tem certeza que deseja excluir este produto?"
      confirm-text="Excluir" cancel-text="Cancelar" :loading="deleting" @confirm="confirmDelete"
      @cancel="cancelDelete" />

    <div class="container mx-auto px-4 py-8">

      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 class="text-3xl font-bold text-gray-900">Meus Produtos</h1>
        <ButtonDefault v-if="is_admin" @click="handleCreateProduct" label="Adicionar produto"
          class="w-full sm:w-auto" />
      </div>


      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

        <SkeletonLoading v-if="isInitialLoading" v-for="n in 18" :key="'init-' + n" />


        <CardPublic v-for="product in products" v-else :key="product.id" :image="product.image || null"
          :title="product.name" :description="product.description" @edit="() => handleEdit(product.id)"
          @delete="() => handleDelete(product.id)" @favorite="handleFavorite(product.id)" />


        <SkeletonLoading v-if="isLoadingMore" v-for="n in 6" :key="'more-' + n" />
      </div>


      <div v-if="!loading && products.length === 0" class="text-center py-16">
        <p class="text-gray-500 text-lg mb-6">Nenhum produto encontrado.</p>
        <ButtonDefault @click="handleCreateProduct" label="Criar primeiro produto" />
      </div>


      <div ref="sentinel" class="h-20 mt-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAdsProducts } from '@/composables/useAdsProducts'
import AlertConfirm from '@/components/alerts/AlertConfirm.vue'
import MiniAlert from '@/components/alerts/MiniAlert.vue'
import ButtonDefault from '@/components/buttons/buttonDefault.vue'
import CardPublic from '@/components/cards/CardPublic.vue'
import SkeletonLoading from '@/components/loading/SkeletonLoading.vue'

import { useAuth } from '../composables/useAuth'
const { is_admin } = useAuth()
const router = useRouter()
const {
  error,
  success,
  loading,
  products,
  next,
  currentPage,
  fetchProducts,
  deleteProduct,
  clearError,
  clearSuccess,
  addFavorite,
} = useAdsProducts()


const isAlertOpen = ref(false)
const selectedProductId = ref<number | null>(null)
const deleting = ref(false)
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null


const hasMore = computed(() => !!next.value)
const isInitialLoading = computed(() => loading.value && products.length === 0)
const isLoadingMore = computed(() => loading.value && products.length > 0)


onMounted(() => {

  fetchProducts(1)


  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loading.value) {
        loadMore()
      }
    },
    {
      rootMargin: '300px', // carrega antes de chegar no final
      threshold: 0.1
    }
  )

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

function handleFavorite(productId: number) {
  addFavorite(productId)
}

onUnmounted(() => {
  observer?.disconnect()
})

async function loadMore() {
  if (!hasMore.value || loading.value) return
  await fetchProducts(currentPage.value + 1)

}


function handleDelete(id: number) {
  selectedProductId.value = id
  isAlertOpen.value = true
}

async function confirmDelete() {
  if (!selectedProductId.value) return
  deleting.value = true
  await deleteProduct(selectedProductId.value)
  deleting.value = false
  isAlertOpen.value = false
}

function cancelDelete() {
  isAlertOpen.value = false
}

function handleEdit(id: number) {
  router.push({ name: 'ads-edit-product-page', params: { id } })
}

function handleCreateProduct() {
  router.push({ name: 'ads-create-product-page' })
}

// Limpa mensagens automáticas
watch([error, success], () => {
  if (error.value || success.value) {
    setTimeout(() => {
      if (error.value) clearError()
      if (success.value) clearSuccess()
    }, 5000)
  }
})
</script>
