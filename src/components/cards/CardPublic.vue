<!-- components/products/ProductCardCompact.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div class="relative aspect-square bg-gray-100">
      <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover" loading="lazy" />
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
        <span class="text-gray-400 text-sm">Sem imagem</span>
      </div>
    </div>

    <div class="p-3">
      <h3 class="font-medium text-gray-900 line-clamp-2 text-sm mb-1">
        {{ title }}
      </h3>
      <p class="text-xs text-gray-600 line-clamp-2 mb-3">
        {{ description || 'Sem descrição' }}
      </p>

      <div v-if="is_admin" class="flex justify-between items-center">
        <button @click="$emit('edit')" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
          Editar
        </button>
        <button @click="$emit('delete')" class="text-xs text-red-600 hover:text-red-800 font-medium">
          Excluir
        </button>
      </div>
      <div v-else class="flex justify-end">
        <button @click="$emit('favorite')" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
          Favoritar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

defineProps<{
  image?: string | null
  title: string
  description?: string | null
}>()

const { is_admin } = useAuth()
defineEmits(['edit', 'delete', 'favorite'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
