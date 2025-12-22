  <template>
    <label class="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        class="h-4 w-4 text-blue-500 rounded" />
      <span class="text-gray-700">{{ label }}</span>
    </label>
  </template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue?: boolean
}>()

defineEmits(['update:modelValue'])
</script>
