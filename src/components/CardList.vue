<script setup lang="ts">
import Card from './Card.vue'

defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorites'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card 
      v-for="item in items" 
      :key="item.id"
      :id="item.id"
      :title="item.title" 
      :imageUrl="item.imageUrl" 
      :price="item.price"
      :isFavorite="item.isFavorite"
      :onClickFavorite="() => emit('addToFavorites', item)"
    />
  </div>
</template>