<script setup lang="ts">
import Cart from '@images/cart.svg'
import Heart from '@images/heart.svg'
import Profile from '@images/profile.svg'
import Logo from '@images/logo.png'

const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8 max-sm:px-4 max-sm:py-4 max-lg:flex-col">

    <router-link to="/">
      <div class="flex items-center gap-4 max-lg:mb-4">
        <img :src="Logo" alt="Logo" class="w-10">
        <div>
          <h2 class="text-xl font-bold uppercase">{{ $t('header.shop_name') }}</h2>
          <p class="text-slate-400">
            {{ $t('header.title') }}
          </p>
        </div>
      </div>  
    </router-link>

    <nav>
      <ul class="flex items-center gap-10 max-lg:justify-between max-sm:gap-2 max-sm:flex-col">
        <li @click="emit('openDrawer')" class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img :src="Cart" alt="Cart">
          <b>{{ totalPrice }} {{ $t('header.currency') }}</b>
        </li>

        <router-link to="/favorites">
          <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
            <img :src="Heart" alt="Favorites">
            <span>{{ $t('header.favorites') }}</span>
          </li>
        </router-link>

        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img :src="Profile" alt="Profile">
          <span>{{ $t('header.profile') }}</span>
        </li>
      </ul>
    </nav>
  </header>
</template>