<template>
  <div class="relative">
    <MiniAlert :eventName="error" bg-color="bg-red-500" />
    <MiniAlert :eventName="success" bg-color="bg-green-500" />
    <AlertConfirm :isOpen="isAlertOpen" :title="alertTitle" :message="alertMessage" :confirm-text="alertConfirmText"
      :cancel-text="alertCancelText" @confirm="confirmDelete()" @cancel="cancelDelete" :loading="loading" />
    <div class="container mx-auto">
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-4 sm:gap-32 mx-auto">
        <div class="sm:col-start-2">
          <h1 class="text-center text-4xl font-bold mb-8 text-black">Categorias</h1>
        </div>
        <div class="sm:col-start-3 text-center">
          <ButtonDefault @click="handleCreateCategory" label="Adicionar Categoria" type="button" class="w-52 mx-auto" />
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-4">
        <CardObject v-for="category in categories" :key="category.id" :image="category.image || null"
          :title="category.name" :description="category.description" @edit="() => handleEdit(category.id)"
          @delete="() => handleDelete(category.id)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AlertConfirm from '@/components/alerts/AlertConfirm.vue';
import MiniAlert from '@/components/alerts/MiniAlert.vue';
import ButtonDefault from '@/components/buttons/buttonDefault.vue';
import CardObject from '@/components/cards/CardObject.vue';
import { useAdsCategories } from '@/composables/useAdsCategories';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const { error, success, loading, categories, fetchCategories, deleteCategory, clearError, clearSuccess } = useAdsCategories()

const isAlertOpen = ref(false)
const alertTitle = ref('Excluir Categoria')
const alertMessage = ref('Tem certeza que deseja excluir essa categoria?')
const alertConfirmText = ref('Excluir')
const alertCancelText = ref('Cancelar')
const selectedCategoryId = ref<number | null>(null)


function cancelDelete() {
  isAlertOpen.value = false
  selectedCategoryId.value = null
}

function confirmDelete() {
  if (!selectedCategoryId.value) return
  deleteCategory(selectedCategoryId.value)
  isAlertOpen.value = false
  selectedCategoryId.value = null
}

function handleDelete(id: number) {
  isAlertOpen.value = true
  selectedCategoryId.value = id

}

function handleEdit(id: number) {
  router.push({ name: 'ads-edit-category-page', params: { id } })
}

function handleCreateCategory() {
  router.push({ name: 'ads-create-category-page' })
}

onMounted(() => fetchCategories())

watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    setTimeout(() => clearError(), 5000)
  } else if (newSuccess) {
    setTimeout(() => clearSuccess(), 5000)
  }
})

</script>
