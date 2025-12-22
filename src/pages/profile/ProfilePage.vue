<template>
  <div class="container mx-auto p-6 md:w-1/2 w-full">
    <div class="flex items-center justify-center">
      <div class="relative cursor-pointer" @click="triggerFile">
        <!-- Ícone padrão -->
        <UserCircleIcon v-if="!userImage" class="h-30 w-30 text-gray-600 hover:text-gray-900 transition-colors" />

        <!-- Imagem do usuário -->
        <img v-else :src="userImage" alt="User"
          class="h-30 w-30 rounded-full object-cover hover:opacity-80 transition" />

        <!-- input escondido -->
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
      </div>
    </div>

    <FormChangePass />
  </div>
</template>

<script setup lang="ts">
import FormChangePass from '@/components/forms/FormChangePass.vue'
import { useAuth } from '@/composables/useAuth'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { ref, watch } from 'vue'

const { user, updateImageProfile } = useAuth()

const userImage = ref<string | null>(user.value?.image || null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFile = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  userImage.value = URL.createObjectURL(file)
  await updateImageProfile(file)
  target.value = ''
}

watch(
  () => user.value?.image,
  (newImage) => {
    if (newImage) userImage.value = newImage
  }
)
</script>
