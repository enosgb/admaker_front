<template>
  <div class="relative">
    <MiniAlert :eventName="error" bg-color="bg-red-500" />
    <MiniAlert :eventName="success" bg-color="bg-green-500" />
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
          <UserTable :users="users" @open-menu="openMenu" @delete-user="handleDeleteUser" />
          <Pagination :currentPage="currentPage" :totalPages="totalPages" @change-page="fetchUsers" />
          <ModalUser :isOpen="isModalOpen" @close="closeMenu" :user="selectedUser" />
          <AlertConfirm :isOpen="isAlertOpen" :title="alertTitle" :message="alertMessage"
            :confirm-text="alertConfirmText" :cancel-text="alertCancelText" @confirm="confirmDelete" :loading="loading"
            @cancel="cancelDelete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertConfirm from '@/components/alerts/AlertConfirm.vue';
import MiniAlert from '@/components/alerts/MiniAlert.vue';
import ButtonDefault from '@/components/buttons/buttonDefault.vue';
import ModalUser from '@/components/modal/ModalUser.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import UserTable from '@/components/tables/UserTable.vue';
import { useUsers } from '@/composables/useUsers';
import type { User } from '@/types/user.types';

import { onMounted, ref } from 'vue'
const { users, currentPage, totalPages, fetchUsers, deleteUser, error, success, loading } = useUsers()

const isModalOpen = ref(false);
const isAlertOpen = ref(false);
const alertTitle = ref('Excluir Usuário');
const alertMessage = ref('Tem certeza que deseja excluir esse usuário?');
const alertConfirmText = ref('Excluir');
const alertCancelText = ref('Cancelar');
const selectedUser = ref<User | null>(null);

function openMenu(user: User) {
  selectedUser.value = user ?? null
  isModalOpen.value = true
}

function closeMenu() {
  isModalOpen.value = false
  selectedUser.value = null
}

function handleDeleteUser(user: User) {
  isAlertOpen.value = true
  selectedUser.value = user ?? null
}

function cancelDelete() {
  isAlertOpen.value = false
  selectedUser.value = null
}

async function confirmDelete() {
  const id = selectedUser.value?.id
  if (!id) return
  deleteUser(id)
  isAlertOpen.value = false
  selectedUser.value = null
}

onMounted(() => fetchUsers())

</script>
