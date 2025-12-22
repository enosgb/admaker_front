<template>
  <div class="flex flex-col">
    <label :for="input" class="mb-2" :id="inputName">
      {{ label }}
    </label>
    <textarea :name="inputName" :id="input" rows="4" cols="50"
      class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': error }" v-model="localValue" @blur="$emit('blur')" />
    <div v-if="error" class="text-red-500 text-xs">
      {{ error }}
    </div>
  </div>
</template>S

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  input: string;
  inputName: string;
  error?: string;
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue', 'blur']);

const localValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
});
</script>
