<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/10 z-50">

    <div class="relative">
      <MiniAlert :eventName="error" bg-color="bg-red-500" />
      <MiniAlert :eventName="success" bg-color="bg-blue-400" />
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">

        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ props.user ? 'Editar Usuário' : 'Novo Usuário' }}</h2>
          <button @click="close"
            class="cursor-pointer text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
        </div>

        <div
          :class="` flex items-center justify-center my-2 relative cursor-pointer  ${props.user ? 'col-span-2' : ''}`"
          @click="triggerFile">
          <img v-if="previewImage" :src="previewImage" alt="Avatar" class="w-32 h-32 object-cover rounded-full" />
          <input ref="fileInput" type="file" @change="handleFileChange" @click.stop
            :class="`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${form.image ? 'hidden' : ''}`" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <input v-model="form.name" type="text" placeholder="Nome completo"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
          <input v-model="form.email" type="email" placeholder="Email corporativo"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
          <input v-if="!props.user" v-model="form.password" type="password" placeholder="Senha provisória"
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
            {{ props.user ? 'Editar Usuário' : 'Criar Usuário' }}
          </button>
        </div>
        <LogoLoading :loading="loading" />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useUsers } from '@/composables/useUsers';
import MiniAlert from '../alerts/MiniAlert.vue';
import LogoLoading from '../loading/LogoLoading.vue';
import type { User, UserPayload } from '@/types/user.types';

const props = defineProps<{ isOpen: boolean, user?: User | null }>();
const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'close'): void
}>();

const { createUser, error, success, loading, clearError, clearSuccess, updateUser } = useUsers();


const form = reactive<UserPayload>({
  name: '',
  email: '',
  password: '',
  image: null,
  is_active: true,
  is_staff: false,
})


const triggerFile = () => {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.image = target.files?.[0] ?? null;
}

function close() {
  clearForm()
  emit('close');
}

async function submit(e: Event) {
  e.preventDefault()
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('email', form.email);
  if (form.image && form.image instanceof File) formData.append('image', form.image);
  formData.append('is_active', String(form.is_active));
  formData.append('is_staff', String(form.is_staff));


  if (props.user) {
    await updateUser(formData, props.user?.id)
  } else {
    await createUser(formData)
  }


}

function clearForm() {
  Object.assign(form, {
    id: null,
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

watch(
  () => props.user,
  (user) => {
    if (user) {
      form.name = user.name
      form.email = user.email
      form.password = ''
      form.image = user.image
      form.is_active = user.is_active ?? true
      form.is_staff = user.is_staff ?? false
    } else {
      form.name = ''
      form.email = ''
      form.password = ''
      form.image = null
      form.is_active = true
      form.is_staff = false
    }
  },
  { immediate: true }
)
watch(
  () => form.image,
  (file) => {
    if (file instanceof File) {
      previewImage.value = URL.createObjectURL(file)
    } else if (typeof file === 'string') {
      previewImage.value = file
    } else {
      previewImage.value = null
    }
  }
)

</script>
