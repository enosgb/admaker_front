<template>
  <div class="flex flex-col relative">
    <label :for="inputId" class="mb-2" :id="inputName">{{ label }}</label>
    <div class="relative">
      <input :name="inputName" :type="showPassword ? 'text' : 'password'" :id="inputId" v-model="localValue"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{ 'border-red-500': error }" @blur="$emit('blur')" />
      <EyeIcon
        class="h-6 w-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
        @click="showPassword = !showPassword" />
    </div>
    <div v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { EyeIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  modelValue: string
  inputName: string
  label: string
  input?: string
  error?: string
}>()

const emit = defineEmits(['update:modelValue', 'blur'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const showPassword = ref(false)

const inputId = computed(() => props.input || 'password-input')


</script>
