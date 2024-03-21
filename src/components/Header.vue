<script setup lang="ts">
  const emit = defineEmits(['openDrawer'])

  defineProps({
    totalPrice: Number
  })
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-10">
      <div>
        <h2 class="text-xl font-bold uppercase">{{ $t('header.shop_name') }}</h2>
        <p class="text-slate-400">
          {{ $t('header.title') }}
        </p>
      </div>
    </div>

    <nav>
      <ul class="flex items-center gap-10">
        <li @click="emit('openDrawer')" class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/cart.svg" alt="Cart">
          <b>{{ totalPrice }} usd</b>
        </li>

        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Bookmarks">
          <span>{{ $t('header.bookmarks') }}</span>
        </li>

        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="Profile">
          <span>{{ $t('header.profile') }}</span>
        </li>
      </ul>
    </nav>
  </header>
</template>