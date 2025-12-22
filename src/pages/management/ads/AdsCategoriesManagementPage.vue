<template>
  <div class="relative">
    <MiniAlert :eventName="error" bg-color="bg-red-500" />
    <MiniAlert :eventName="success" bg-color="bg-green-500" />
    <div class="container mx-auto">
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-4 sm:gap-32 mx-auto">
        <div class="sm:col-start-2">
          <h1 class="text-center text-4xl font-bold mb-8 text-black">Categorias</h1>
        </div>
        <div class="sm:col-start-3 text-center">
          <ButtonDefault label="Adicionar Categoria" type="button" class="w-52 mx-auto" />
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
import MiniAlert from '@/components/alerts/MiniAlert.vue';
import ButtonDefault from '@/components/buttons/buttonDefault.vue';
import CardObject from '@/components/cards/CardObject.vue';
import { useAdsCategories } from '@/composables/useAdsCategories';
import { onMounted } from 'vue';

const { error, success, loading, categories, fetchCategories } = useAdsCategories()

function handleDelete(id: number) {
  console.log(id)
}

function handleEdit(id: number) {
  console.log(id)
}

onMounted(() => fetchCategories())

</script>
