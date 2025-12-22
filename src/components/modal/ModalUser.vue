<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/10 z-50">

    <div class="relative">
      <MiniAlert :eventName="error" bg-color="bg-red-500" />
      <MiniAlert :eventName="success" bg-color="bg-red-400" />
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">

        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Cadastro de Usuário</h2>
          <button @click="close"
            class="cursor-pointer text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input v-model="form.name" type="text" placeholder="Nome completo"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
          <input v-model="form.email" type="email" placeholder="Email corporativo"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
          <input v-model="form.password" type="password" placeholder="Senha provisória"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
          <input type="file" @change="handleFileChange"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
        </div>

        <div class="flex gap-4 mt-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.is_active" class="h-4 w-4 text-blue-500 rounded" />
            <span class="text-gray-700">Usuário Ativo</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.is_staff" class="h-4 w-4 text-blue-500 rounded" />
            <span class="text-gray-700">Acesso Staff</span>
          </label>
        </div>

        <div v-if="!loading" class="flex justify-end gap-3 mt-6">
          <button @click="close"
            class="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
            Cancelar
          </button>
          <button @click="submit"
            class="cursor-pointer px-4 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-600 transition">
            Cadastrar
          </button>
        </div>
        <LogoLoading :loading="loading" />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useUsers } from '@/composables/useUsers';
import MiniAlert from '../alerts/MiniAlert.vue';
import LogoLoading from '../loading/LogoLoading.vue';
import type { UserPayload } from '@/types/user.types';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{
  (e: 'close'): void
}>();

const { createUser, error, success, loading, clearError, clearSuccess } = useUsers();


const form = reactive<UserPayload>({
  name: '',
  email: '',
  password: '',
  image: null,
  is_active: true,
  is_staff: false,
});

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.image = target.files?.[0] ?? null;
}

function close() {
  emit('close');
}

async function submit(e: Event) {
  e.preventDefault()
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('email', form.email);
  formData.append('password', form.password);
  if (form.image) formData.append('image', form.image);
  formData.append('is_active', String(form.is_active));
  formData.append('is_staff', String(form.is_staff));

  await createUser(formData);

  Object.assign(form, {
    name: '',
    email: '',
    password: '',
    image: null,
    is_active: true,
    is_staff: false,
  });
}

watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    setTimeout(() => clearError(), 5000)
  } else if (newSuccess) {
    setTimeout(() => {
      clearSuccess()
      close()
    }, 5000)
  }
})
</script>
