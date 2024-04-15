<script setup lang="ts">
import Card from '@components/Card.vue'

const props = defineProps({
  items: Array,
  isFavorites: Boolean,
})

const emit = defineEmits(['addToFavorites', 'addToCart'])
</script>

<template>
  <div 
    class="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5" 
    v-auto-animate
  >
    <Card 
      v-for="item in items" 
      :key="item.id"
      :id="item.id"
      :title="item.title" 
      :imageUrl="item.imageUrl" 
      :price="item.price"
      :isFavorite="item.isFavorite"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorites', item)"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>