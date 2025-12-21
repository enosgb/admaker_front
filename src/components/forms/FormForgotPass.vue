<template>
  <form @submit="resetPass" class="w-full p-6 m-2 bg-white shadow-lg rounded-2xl">
    <div class="flex gap-2 items-center justify-center">
      <img :src="logo" alt="Logo" class="w-12" />
      <h3 class="text-center text-[#71c6e5]">Esqueci minha senha</h3>
    </div>
    <InputText input-name="email" class="text-gray-400" label="Email:" input="email" type="text" :model-value="email" />

    <ButtonDefault label="Enviar" type="submit" class="w-full mx-auto" />
    <span @click="changeTab('login')" class="text-[#71c6e5] underline cursor-pointer">Fazer login</span>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from '../inputs/inputText.vue';
import ButtonDefault from '../buttons/buttonDefault.vue';
import logo from "@/assets/logos/logo_admaker.png";

const email = ref('');

defineProps<{
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', value: string): void
}>();

function changeTab(tab: string) {
  emit('update:activeTab', tab);
}

function resetPass(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  console.log(data);
}


</script>
