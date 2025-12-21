<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="w-full">
      <FormLogin class="mx-auto md:w-1/2 lg:w-1/3" v-if="activeTab === 'login'" v-model:activeTab="activeTab" />
      <FormForgotPass class="mx-auto md:w-1/2 lg:w-1/3" v-else v-model:activeTab="activeTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FormForgotPass from '@/components/forms/FormForgotPass.vue';
import FormLogin from '@/components/forms/FormLogin.vue';
import { ref } from 'vue';

const activeTab = ref("login");

</script>
