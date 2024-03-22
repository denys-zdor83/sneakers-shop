<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import axios from 'axios';

import CartItemList from './CartItemList.vue';
import DrawerHead from './DrawerHead.vue';
import Infoblock from './Infoblock.vue';

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

const isCreatingOrder = ref(false)
const { cartItems, closeDrawer } = inject('cart')
const isCartEmpty = computed(() => cartItems.value.length === 0)
const isCartButtonDisabled = computed(() => isCreatingOrder.value || isCartEmpty.value)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true

    const { data } = await axios.post('https://03eef75a3e96a712.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: props.totalPrice.value,
    })

    cartItems.value = []
    orderId.value = data.id

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-500 z-10  opacity-50"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div 
      v-if="!totalPrice || orderId" 
      class="flex h-full items-center"
    >
      <Infoblock 
        v-if="!totalPrice && !orderId"
        :title="$t('messages.empty_cart.title')" 
        :description="$t('messages.empty_cart.description')" 
        imageUrl="/package-icon.png" 
      />
      <Infoblock 
        v-if="orderId"
        :title="$t('messages.order_sent.title', { orderId })" 
        :description="$t('messages.order_sent.description')" 
        imageUrl="/order-success-icon.png" 
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
          :disabled="isCartButtonDisabled "
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 transition cursor-pointer"
          @click="createOrder"
        >
          {{ $t('drawer.order') }}
        </button>
      </div>
    </div>

  </div>
</template>