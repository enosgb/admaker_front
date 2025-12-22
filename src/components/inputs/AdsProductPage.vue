<template>

  <form @submit="handleCreateProduct" class="relative">
    <div class="container mx-auto">
      <h1 class="my-6 text-center text-4xl font-bold">
        {{ productId ? 'Editar Produto' : 'Criar Produto' }}
      </h1>
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
          <ButtonDefault v-if="!loading" :label="productId ? 'Atualizar' : 'Criar'" type="submit"
            class="w-full mx-auto col-span-2" />
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


import { useAdsProducts } from '@/composables/useAdsProducts';
import type { AdProductPayload } from '@/types/ads.types';
import { onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const productId = route.params.id as string | undefined
const { error, success, loading, createProduct, clearError, clearSuccess, updateProduct, fetchProduct } = useAdsProducts()
const { categories } = useAdsCategoriess()

const form = reactive<AdProductPayload>({
  name: '',
  description: '',
  category: 0,
  stock: 0,
  cost_price: '',
  sale_price: '',
  active: true,
})

function clearForm() {
  Object.assign(form, {
    name: '',
    description: '',
    category: 0,
    stock: 0,
    image: null,
    cost_price: '',
    sale_price: '',
    active: true
  });
}

function handleCreateProduct(e: Event) {
  e.preventDefault()
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('category', String(form.category));
  formData.append('stock', String(form.stock));
  formData.append('cost_price', String(form.cost_price));
  formData.append('sale_price', String(form.sale_price));
  formData.append('active', String(form.active));
  if (form.image && form.image instanceof File) formData.append('image', form.image);
  if (productId) {
    updateProduct(formData, Number(productId))
  } else {
    createProduct(formData)
  }
}

watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    setTimeout(() => clearError(), 5000)
  } else if (newSuccess) {
    setTimeout(() => {
      clearForm()
      clearSuccess()
      if (productId) {
        handleFetchProducts()
      }
      close()
    }, 5000)
  }
})

async function handleFetchProducts() {
  if (productId) {
    const product = await fetchProduct(Number(productId))
    Object.assign(form, {
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      cost_price: product.cost_price,
      sale_price: product.sale_price,
      active: product.active
    })
  }
}

onMounted(async () => {
  handleFetchProducts()
})

</script>
