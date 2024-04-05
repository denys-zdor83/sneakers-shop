<script setup lang="ts">
import CartItemList from '@components/CartItemList.vue';
import DrawerHead from '@components/DrawerHead.vue';
import Infoblock from '@components/Infoblock.vue';

import { asyncGlobalSpinner } from "@loader-worker"
import { API } from '@api'

import PackageIcon from '@images/package-icon.png'
import OrderSuccessIcon from '@images/order-success-icon.png'

import type { 
  IOneOrder,
  RPostAllOrders,
} from "@api/interfaces";

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

// --- Interfaces
interface IPayload {
  items: IOneOrder[]
  totalPrice: number
}
// --- Interfaces

const isCreatingOrder: Ref<boolean> = ref(false)
const orderId: Ref<number | null> = ref(null)
const vatRate: Ref<number> = ref(5)
const { cartItems, closeDrawer } = inject('cart')
const isCartEmpty: Ref<boolean> = computed(() => cartItems.value.length === 0)
const isCartButtonDisabled: Ref<boolean> = computed(() => isCreatingOrder.value || isCartEmpty.value)
const totalPrice: Ref<number> = computed(() => props.totalPrice)

const createOrder = async (): Promise<void> => {
  try {
    isCreatingOrder.value = true

    const payload: IPayload = {
      items: cartItems.value,
      totalPrice: totalPrice.value,
    }

    const [data]: RPostAllOrders = await asyncGlobalSpinner(
      API.UrlsService.PostAllOrders(payload)
    )

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
  <div 
    class="fixed top-0 left-0 w-full h-full bg-slate-500 z-10 opacity-50"
    @click="closeDrawer"
  >
  </div>
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
        :imageUrl="PackageIcon" 
      />
      <Infoblock 
        v-if="orderId"
        :title="$t('messages.order_sent.title', { orderId })" 
        :description="$t('messages.order_sent.description')" 
        :imageUrl="OrderSuccessIcon" 
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
          <b>{{ totalPrice }} {{ $t('drawer.currency') }}</b>
        </div>

        <div class="flex gap-2">
          <span>
            {{ $t('drawer.tax') }} {{ vatRate }}%:
          </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} {{ $t('drawer.currency') }}</b>
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