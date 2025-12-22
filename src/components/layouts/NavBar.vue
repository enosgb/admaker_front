<template>
  <nav class="bg-white p-4 text-black shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <div @click="handleHome" class="flex items-center gap-3 cursor-pointer">
        <img :src="logoUrl" alt="Logo" class="w-12" />
        <span class="text-lg font-semibold">Ad Maker</span>
      </div>

      <div class="relative">
        <UserCircleIcon v-if="!avatar"
          class="h-8 w-8 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors" @click="toggleMenu" />

        <img v-else :src="avatar" alt="User"
          class="h-8 w-8 rounded-full object-cover hover:opacity-80 transition cursor-pointer" @click="toggleMenu" />

        <ul v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 rounded-xl bg-white py-2 shadow-lg z-50">
          <li v-for="(option, index) in menuExtraOptions" :key="index">
            <a @click="handleNavigate(option)"
              class="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              {{ option.label }}
            </a>
          </li>
          <li>
            <a @click="handleProfile" class="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
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
import { useRouter } from 'vue-router'
import { MENU_OPTIONS } from '@/constants/MENU_OPTIONS'
import type { MenuOption } from '@/types/menu_option.types'

const { logout, user, role } = useAuth()
const avatar = user.value?.image
const isMenuOpen = ref(false)
const router = useRouter()
const menuExtraOptions = ref<MenuOption[]>(MENU_OPTIONS[role.value] || [])
console.log(role.value)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

function handleHome() {
  isMenuOpen.value = false
  router.push({ name: 'home-user' })
}

function handleProfile() {
  isMenuOpen.value = false
  router.push({ name: 'profile-page' })
}

function handleLogout() {
  isMenuOpen.value = false
  logout()
}

function handleNavigate(option: MenuOption) {
  isMenuOpen.value = false
  router.push({ name: option.name })
}

</script>
