<template>
  <transition name="fade">
    <div v-if="eventName" :class="[
      bgColor,
      'text-white px-4 py-2 rounded shadow-md z-10 absolute top-2 left-1/2 -translate-x-1/2'
    ]">
      {{ eventName }}
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  eventName: string | null
  bgColor?: string
}>()
</script>
