<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card 
      title="Men's sneakers" 
      imageUrl="sneakers/sneakers-1.jpg" 
      :price="1200"
      :isAdded="true"
      :isFavorite="false"
    />
  </div>
</template>