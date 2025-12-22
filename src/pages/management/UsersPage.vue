<template>
  <div class="container mx-auto">
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-4 sm:gap-32 mx-auto">
      <div class="sm:col-start-2">
        <h1 class="text-center text-4xl font-bold mb-8 text-black">Usuários</h1>
      </div>
      <div class="sm:col-start-3 text-center">
        <ButtonDefault label="Adicionar Usuário" type="button" class="w-42 mx-auto" @click="isModalOpen = true" />
      </div>
    </div>
    <div class="flex flex-row items-center justify-center">
      <div class="p-6 bg-white rounded-lg shadow overflow-auto">
        <UserTable :users="users" @open-menu="openMenu" />
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @change-page="fetchUsers" />
        <ModalUser :isOpen="isModalOpen" @close="isModalOpen = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonDefault from '@/components/buttons/buttonDefault.vue';
import ModalUser from '@/components/modal/ModalUser.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import UserTable from '@/components/tables/UserTable.vue';
import { useUsers } from '@/composables/useUsers';
import type { User } from '@/types/user.types';

import { onMounted, ref } from 'vue'
const { users, currentPage, totalPages, fetchUsers } = useUsers()

const isModalOpen = ref(false);

function openMenu(user: User) {
  console.log('Menu do usuário', user)
}

onMounted(() => fetchUsers())

</script>
