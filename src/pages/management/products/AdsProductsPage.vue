<template>
  <div class="relative">
    <MiniAlert :eventName="error" bg-color="bg-red-500" />
    <MiniAlert :eventName="success" bg-color="bg-green-500" />
    <AlertConfirm :isOpen="isAlertOpen" :title="alertTitle" :message="alertMessage" :confirm-text="alertConfirmText"
      :cancel-text="alertCancelText" @confirm="confirmDelete()" @cancel="cancelDelete" :loading="loading" />
    <div class="container mx-auto">
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-4 sm:gap-32 mx-auto">
        <div class="sm:col-start-2">
          <h1 class="text-center text-4xl font-bold mb-8 text-black">Produtos</h1>
        </div>
        <div class="sm:col-start-3 text-center">
          <ButtonDefault @click="handleCreateProduct" label="Adicionar produto" type="button" class="w-52 mx-auto" />
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-4">
        <CardObject v-for="product in products" :key="product.id" :image="product.image || null"
          :title="product.name" :description="product.description" @edit="() => handleEdit(product.id)"
          @delete="() => handleDelete(product.id)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AlertConfirm from '@/components/alerts/AlertConfirm.vue';
import MiniAlert from '@/components/alerts/MiniAlert.vue';
import ButtonDefault from '@/components/buttons/buttonDefault.vue';
import CardObject from '@/components/cards/CardObject.vue';
import { useAdsProducts } from '@/composables/useAdsProducts';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const { error, success, loading, products, fetchProducts, deleteProduct, clearError, clearSuccess } = useAdsProducts()

const isAlertOpen = ref(false)
const alertTitle = ref('Excluir Produto')
const alertMessage = ref('Tem certeza que deseja excluir esse produto?')
const alertConfirmText = ref('Excluir')
const alertCancelText = ref('Cancelar')
const selectedProductId = ref<number | null>(null)


function cancelDelete() {
  isAlertOpen.value = false
  selectedProductId.value = null
}

function confirmDelete() {
  if (!selectedProductId.value) return
  deleteProduct(selectedProductId.value)
  isAlertOpen.value = false
  selectedProductId.value = null
}

function handleDelete(id: number) {
  isAlertOpen.value = true
  selectedProductId.value = id

}

function handleEdit(id: number) {
  router.push({ name: 'ads-edit-product-page', params: { id } })
}

function handleCreateProduct() {
  router.push({ name: 'ads-create-product-page' })
}

onMounted(() => fetchProducts())

watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    setTimeout(() => clearError(), 5000)
  } else if (newSuccess) {
    setTimeout(() => clearSuccess(), 5000)
  }
})

</script>
