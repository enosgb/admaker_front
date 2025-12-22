<template>
  <div class="container mx-auto">
    <div class="flex-center items-center mt-8">
      <h1 class="text-center text-4xl font-bold mb-8 text-black">Usuários</h1>
    </div>
    <div class="flex flex-row items-center justify-center">
      <div class="p-6 bg-white rounded-lg shadow overflow-auto">
        <UserTable :users="users" @open-menu="openMenu" />
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @change-page="fetchUsers" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/pagination/Pagination.vue';
import UserTable from '@/components/tables/UserTable.vue';
import { useUsers } from '@/composables/useUsers';
import type { User } from '@/types/user.types';

import { onMounted } from 'vue'
const { users, currentPage, totalPages, fetchUsers } = useUsers()

function openMenu(user: User) {
  console.log('Menu do usuário', user)
}

onMounted(() => fetchUsers())

</script>
