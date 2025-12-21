<template>
  <button :type="$props.type"
    class="bg-[#71c6e5] hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-xl m-2 cursor-pointer">
    {{ $props.label }}
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';


defineProps<{
  label: string;
  error?: string;
  type?: ButtonHTMLAttributes['type'];
}>();

</script>
