<template>
  <div class="relative">
    <!-- <MiniAlert :eventName="error" bg-color="bg-red-500" /> -->
    <form @submit.prevent="handleLogin" class="w-full p-6 m-2 bg-white shadow-lg rounded-2xl">

      <div class="flex gap-2 items-center justify-center">
        <img :src="logo" alt="Logo" class="w-12" />
        <h3 class="text-center text-[#71c6e5]">Bem vindo, novamente!</h3>
      </div>

      <InputText input-name="email" class="text-gray-400" label="Email:" input="email" type="text" v-model="email" />
      <InputPassword input-name="password" class="text-gray-400" label="Senha:" input="password" v-model="password" />

      <ButtonDefault v-if="!loading" label=" Entrar" type="submit" class="w-full mx-auto" />
      <LogoLoading :loading="loading" />

      <span @click="changeTab('forgotPassword')" class="text-[#71c6e5] underline cursor-pointer">
        Esqueci minha senha
      </span>
    </form>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputText from '../inputs/inputText.vue'
import ButtonDefault from '../buttons/buttonDefault.vue'
import logo from "@/assets/logos/logo_admaker.png"
import InputPassword from '../inputs/inputPassword.vue'
import { useAuth } from '@/composables/useAuth'
import LogoLoading from '../loading/LogoLoading.vue'
import MiniAlert from '../alerts/MiniAlert.vue'

const email = ref('')
const password = ref('')

const { login, error, loading, clearError } = useAuth()

watch(error, (newError) => {
  if (newError) {
    setTimeout(() => clearError(), 5000)
  }
})

defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  (e: 'update:activeTab', value: string): void
}>()

function changeTab(tab: string) {
  emit('update:activeTab', tab)
}

async function handleLogin() {
  await login(email.value, password.value)
}
</script>
