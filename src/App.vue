<script setup lang="ts">
import { ref, watch, provide, computed } from 'vue';

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cartItems = ref([])

const isDrawerOpen = ref(false)
const isCreatingOrder = ref(false)

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() =>  Math.round((totalPrice.value * 5) / 100))
const isCartEmpty = computed(() => cartItems.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || isCartEmpty.value)

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const addToCart = item => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = item => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true

    const { data } = await axios.post('https://03eef75a3e96a712.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: totalPrice.value,
    })
    cartItems.value = []

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
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
    :isButtonDisabled="cartButtonDisabled"
    @create-order="createOrder"
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
