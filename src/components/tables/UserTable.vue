<template>
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="border-b border-gray-200">
        <th class="py-2 px-4">Usuário</th>
        <th class="py-2 px-4">Email</th>
        <th class="py-2 px-4">Função</th>
        <th class="py-2 px-4">Status</th>
        <th class="py-2 px-4">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50">
        <td class="py-2 px-4 flex items-center gap-2">
          <img v-if="user.image" :src="user.image" alt="Avatar" class="h-8 w-8 rounded-full object-cover" />
          <span>{{ user.name }}</span>
        </td>
        <td class="py-2 px-4 text-blue-600">{{ user.email }}</td>
        <td class="py-2 px-4">
          <span :class="user.is_staff ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-800'">
            {{ user.is_staff ? 'Admin' : 'User' }}
          </span>
        </td>
        <td class="py-2 px-4">
          <span :class="user.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'">
            {{ user.is_active ? 'Ativo' : 'Inativo' }}
          </span>
        </td>
        <td class="py-2 px-4 text-right flex gap-2">
          <button @click="$emit('open-menu', user)" class="cursor-pointer text-gray-400 hover:text-gray-600">
            <PencilIcon class="h-5 w-5" />
          </button>
          <button @click="$emit('delete-user', user)" class="cursor-pointer text-gray-400 hover:text-gray-600">
            <TrashIcon class="h-5 w-5" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { User } from '@/types/user.types'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';

defineProps<{ users: User[] }>()
defineEmits<{
  (e: 'open-menu', user: User): void
  (e: 'delete-user', user: User): void
}>()
</script>
