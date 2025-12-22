<template>

  <form @submit="handleCreateCategory" class="relative">
    <div class="container mx-auto">
      <h1 class="my-6 text-center text-4xl  mb-8 text-black font-bold">Criar Categoria:</h1>
    </div>
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="bg-white p-6 shadow-lg rounded-2xl">

        <div class="grid grid-cols-2 gap-4">
          <InputFileImage v-model="form.image" input-name="image" class="col-span-2" label="Imagem:" input="image" />
          <div class="flex items-center justify-center relative col-span-2">
            <MiniAlert :eventName="error" bg-color="bg-red-500" class="mx-auto" />
            <MiniAlert :eventName="success" bg-color="bg-green-500" class="mx-auto" />
          </div>
          <InputText v-model="form.name" input-name="name" class="text-gray-400 col-span-2" label="Nome:"
            input="name" />
          <InputTextArea v-model="form.description" input-name="description" class="text-gray-400 col-span-2"
            label="Descrição:" input="description" />
          <InputCheckbox input-name="active" class="text-gray-400 col-span-2" label="Ativo:" input="active"
            v-model="form.active" />
          <ButtonDefault v-if="!loading" label="Criar" type="submit" class="w-full mx-auto col-span-2" />
          <LogoLoading class="col-span-2" :loading="loading" />

        </div>
      </div>

    </div>
  </form>
</template>
<script setup lang="ts">
import MiniAlert from '@/components/alerts/MiniAlert.vue';
import ButtonDefault from '@/components/buttons/buttonDefault.vue';
import InputCheckbox from '@/components/inputs/inputCheckbox.vue';
import InputFileImage from '@/components/inputs/InputFileImage.vue';
import InputText from '@/components/inputs/inputText.vue';
import InputTextArea from '@/components/inputs/inputTextArea.vue';
import LogoLoading from '@/components/loading/LogoLoading.vue';

import { useAdsCategories } from '@/composables/useAdsCategories';
import type { AdCategoryPayload } from '@/types/ads.types';
import { reactive, watch } from 'vue';

const { error, success, loading, createCategory, clearError, clearSuccess } = useAdsCategories()

const form = reactive<AdCategoryPayload>({
  name: '',
  description: '',
  active: true,
  image: null
})

function clearForm() {
  Object.assign(form, {
    name: '',
    description: '',
    active: true,
    image: null
  });
}

function handleCreateCategory(e: Event) {
  e.preventDefault()
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('active', String(form.active));
  if (form.image && form.image instanceof File) formData.append('image', form.image);
  createCategory(formData)
}

watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    setTimeout(() => clearError(), 5000)
  } else if (newSuccess) {
    setTimeout(() => {
      clearForm()
      clearSuccess()
      close()
    }, 5000)
  }
})


</script>
