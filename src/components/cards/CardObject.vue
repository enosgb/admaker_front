<template>
  <div class="bg-white w-full h-30 sm:h-50 shadow-lg p-4 rounded-2xl">
    <div class="grid grid-cols-2">
      <img v-if="image" :src="image" alt="Logo" class="h-22 sm:h-42 object-cover rounded-2xl" />
      <PhotoIcon v-else class="h-22 sm:h-42 text-[#71c6e5]" />
      <div class="relative">
        <div class="max-h-22 sm:max-h-42 overflow-y-auto">
          <h3 class="text-center text-black">{{ title }}</h3>
          <p class="text-center text-gray-400">
            {{ description }}
          </p>

        </div>
        <div class="absolute bottom-2 right-2 flex gap-2">
          <PencilIcon @click="$emit('edit')" class="cursor-pointer h-5 w-5 text-[#71c6e5]" />
          <TrashIcon @click="$emit('delete')" class="cursor-pointer h-5 w-5 text-[#71c6e5]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, PhotoIcon, TrashIcon } from "@heroicons/vue/24/solid";

defineProps<{
  image: string | null;
  title: string;
  description: string | string[];
  extraData?: string | string[];
}>()


defineEmits(['edit', 'delete'])
</script>
