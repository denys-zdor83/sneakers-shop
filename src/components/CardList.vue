<script setup lang="ts">
import Card from './Card.vue'

defineProps({
  items: Array,
})
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card 
      v-for="item in items" 
      :key="item.id"
      :title="item.title" 
      :imageUrl="item.imageUrl" 
      :price="item.price"
      :isAdded="true"
      :isFavorite="false"
    />
  </div>
</template>