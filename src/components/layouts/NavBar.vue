<template>
  <nav class="bg-white p-4 text-black shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img :src="logoUrl" alt="Logo" class="w-12" />
        <span class="text-lg font-semibold">Ad Maker</span>
      </div>

      <div class="relative">
        <UserCircleIcon class="h-8 w-8 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
          @click="toggleMenu" />

        <ul v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 rounded-xl bg-white py-2 shadow-lg z-50">
          <li>
            <a href="#" class="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Minha Conta
            </a>
          </li>
          <li>
            <a @click="handleLogout" class="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Sair
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import logoUrl from '@/assets/logos/logo_admaker.png'
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

function handleLogout() {
  logout()
  isMenuOpen.value = false
}

</script>
