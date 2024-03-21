<script setup lang="ts">
import { inject } from 'vue';

const { closeDrawer } = inject('cart')
</script>

<template>
  <div class="flex items-center gap-5 mb-8">
    <img 
      src="/arrow-next-black.svg" 
      alt="Arrow next" 
      class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
      @click="closeDrawer"
    >
    <h2 class="text-2xl font-bold">
      {{ $t('drawer.cart') }}
    </h2>
  </div>
</template>