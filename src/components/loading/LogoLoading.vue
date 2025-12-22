<template>
  <div v-if="loading" class="flex justify-center m-2">
    <img class="w-10 animate-spin" src="@/assets/logos/logo_admaker.png" alt="Logo Ad Maker">
  </div>
</template>

<script setup lang="ts">


defineProps<{
  loading: boolean;
}>();

</script>
