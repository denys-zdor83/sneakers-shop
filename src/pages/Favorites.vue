<script setup lang="ts">
import { ref, onMounted } from 'vue';

import CardList from '../components/CardList.vue'

import { API } from '../api'

const favorites = ref([])

onMounted(async () => {
  try {
    const params = {
      _relations: 'goods'
    }
    const data = await API.UrlsService.GetAllFavorites(params)

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