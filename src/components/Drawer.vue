<script setup lang="ts">
import CartItemList from './CartItemList.vue';
import DrawerHead from './DrawerHead.vue';
import Infoblock from './Infoblock.vue';

const emit = defineEmits(['createOrder'])

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isButtonDisabled: Boolean,
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-500 z-10  opacity-50"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div 
      v-if="!totalPrice" 
      class="flex h-full items-center"
    >
      <Infoblock 
        title="dddddd" 
        description="wwwwww" 
        imageUrl="/package-icon.png" 
      />
    </div>

    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-5 my-7">
        <div class="flex gap-2">
          <span>
            {{ $t('drawer.total') }}:
          </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} $</b>
        </div>

        <div class="flex gap-2">
          <span>
            {{ $t('drawer.tax') }} 5%:
          </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} $</b>
        </div>

        <button 
          :disabled="isButtonDisabled"
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 transition cursor-pointer"
          @click="emit('createOrder')"
        >
          {{ $t('drawer.order') }}
        </button>
      </div>
    </div>

  </div>
</template>