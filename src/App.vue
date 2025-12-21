<template>
  <div id="app">
    <Navbar v-if="showNav" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Navbar from './components/layouts/NavBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const noNavRoutes = ["auth-page"];

const showNav = computed(() => {
  return !noNavRoutes.includes(route.name as string);
});

</script>

<style></style>
