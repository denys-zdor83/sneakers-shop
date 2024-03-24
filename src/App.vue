<script setup lang="ts">
import Header from '@components/Header.vue'
import Drawer from '@components/Drawer.vue'

import type { IOneOrder } from "@api/interfaces";

const cartItems: Ref<IOneOrder[]> = ref([])
const isDrawerOpen: Ref<boolean> = ref(false)
const totalPrice: Ref<number> = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice: Ref<number> = computed(() =>  Math.round((totalPrice.value * 5) / 100))

const closeDrawer = (): void => {
  isDrawerOpen.value = false
}

const openDrawer = (): void => {
  isDrawerOpen.value = true
}

const addToCart = (item: IOneOrder): void => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item: IOneOrder): void => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cartItems,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', {
  cartItems,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
})
</script>

<template>
  <Drawer 
    v-if="isDrawerOpen" 
    :totalPrice="totalPrice"
    :vatPrice="vatPrice"
  />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header
      :totalPrice="totalPrice"
      @open-drawer="openDrawer" 
    />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
