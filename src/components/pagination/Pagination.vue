<template>
  <div class="flex justify-between items-center mt-4">
    <span>Página {{ currentPage }} de {{ totalPages }}</span>

    <div class="flex gap-1">
      <button :disabled="currentPage === 1" @click="$emit('change-page', currentPage - 1)"
        class="cursor-pointer px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
        ‹
      </button>

      <button v-for="page in visiblePages" :key="page" @click="$emit('change-page', page)" :class="page === currentPage
        ? 'bg-blue-500 text-white px-3 py-1 rounded '
        : 'bg-gray-200 text-gray-700 px-3 py-1 rounded cursor-pointer'">
        {{ page }}
      </button>

      <button :disabled="currentPage === totalPages" @click="$emit('change-page', currentPage + 1)"
        class="cursor-pointer px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
        ›
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'change-page', page: number): void
}>()


const visiblePages = computed(() => {
  const delta = 2
  const pages: number[] = []
  const start = Math.max(1, props.currentPage - delta)
  const end = Math.min(props.totalPages, props.currentPage + delta)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>
