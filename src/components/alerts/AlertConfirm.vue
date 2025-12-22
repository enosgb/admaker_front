<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ title }}</h3>
      <p class="text-gray-600 mb-6">{{ message }}</p>

      <div v-if="!loading" class="flex justify-end gap-3">
        <button @click="cancel"
          class="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
          {{ cancelText }}
        </button>
        <button @click="confirm"
          class="cursor-pointer px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
          {{ confirmText }}
        </button>
      </div>
      <LogoLoading :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoLoading from '../loading/LogoLoading.vue';

const props = defineProps<{
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const confirmText = props.confirmText ?? 'Sim'
const cancelText = props.cancelText ?? 'Não'

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}
</script>
