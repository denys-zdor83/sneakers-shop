<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const {data} = await axios.get('https://03eef75a3e96a712.mokky.dev/favorites?_relations=goods')
    favorites.value = data.map(item => item.good)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">
    {{ $t('bookmarks.title') }}
  </h2>
  <CardList 
    :items="favorites"
    :isFavorites="true"
  />
</template>