<script setup lang="ts">
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const { cartItems, removeFromCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4 justify-between" v-auto-animate>
    <CartItem 
      v-for="item in cartItems" 
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      @on-click-remove="removeFromCart(item)"
    />
  </div>
</template>