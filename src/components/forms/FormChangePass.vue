<template>
  <div class="relative">
    <MiniAlert :eventName="error" bg-color="bg-red-500" />
    <MiniAlert :eventName="success" bg-color="bg-blue-300" />
    <form @submit="resetPass" class="w-full p-6 m-2 bg-white shadow-lg rounded-2xl">
      <div class="flex gap-2 items-center justify-center">
        <img :src="logo" alt="Logo" class="w-12" />
        <h3 class="text-center text-[#71c6e5]">Alterar senha:</h3>
      </div>
      <InputText input-name="currentPassword" class="text-gray-400" label="Senha atual:" input="currentPassword"
        type="text" v-model="currentPassword" />
      <InputText input-name="new_password" class="text-gray-400" label="Senha atual:" input="new_password" type="text"
        v-model="new_password" />
      <InputText input-name="confirm_new_password" class="text-gray-400" label="Confirme sua senha:"
        input="confirm_new_password" type="text" v-model="confirm_new_password" />

      <ButtonDefault v-if="!loading" label="Enviar" type="submit" class="w-full mx-auto" />
      <LogoLoading :loading="loading" />
    </form>
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import InputText from '../inputs/inputText.vue';
import ButtonDefault from '../buttons/buttonDefault.vue';
import logo from "@/assets/logos/logo_admaker.png";
import { useAuth } from '@/composables/useAuth';
import LogoLoading from '../loading/LogoLoading.vue';
import MiniAlert from '../alerts/MiniAlert.vue';


const currentPassword = ref('');
const new_password = ref('');
const confirm_new_password = ref('');
const { changePassword, error, loading, success, clearError, clearSuccess } = useAuth();

watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    setTimeout(() => clearError(), 5000)
  }

  if (newSuccess) {
    setTimeout(() => clearSuccess(), 5000)
  }
})

function resetPass(e: Event) {
  e.preventDefault();
  changePassword(currentPassword.value, new_password.value, confirm_new_password.value);
}


</script>
