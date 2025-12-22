<template>
  <div class="bg-white w-full h-52 sm:h-64 shadow-lg p-2 rounded-2xl">

    <div class="h-full w-full rounded-2xl border border-dashed border-gray-400 cursor-pointer" @dragover.prevent
      @drop.prevent="handleDrop" @click="triggerFileInput">
      <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />

      <div class="flex items-center justify-center flex-col h-full">
        <template v-if="preview">
          <img :src="preview" class="object-contain w-full h-full rounded-2xl" />
        </template>
        <template v-else>
          <ArrowUpOnSquareIcon class="h-12 sm:h-32 text-gray-400" />
          <span class="text-gray-400 text-center mt-2">
            Arraste e solte uma imagem ou clique para selecionar
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
  modelValue?: File | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const fileInput = ref<HTMLInputElement | null>(null);
const preview = ref<string | null>(null);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal instanceof File) {
      preview.value = URL.createObjectURL(newVal);
    } else if (typeof newVal === 'string') {
      preview.value = newVal;
    } else {
      preview.value = null;
    }
  },
  { immediate: true }
);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    emit('update:modelValue', target.files[0]);
  }
};

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    emit('update:modelValue', event.dataTransfer.files[0]);
  }
};
</script>
