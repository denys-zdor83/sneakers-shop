<script setup lang="ts">
import CardList from '@components/CardList.vue'

import { API } from '@api'
import { asyncGlobalSpinner } from "@loader-worker"

import type { 
  IOneGoodsItem,
  RGetAllFavorites,
} from "@api/interfaces";

// --- Interfaces
interface IParams {
  _relations: string
}
// --- Interfaces

const favorites: Ref<IOneGoodsItem[]> = ref([])

onMounted(async () => {
  try {
    const params: IParams = {
      _relations: 'goods'
    }
    const [data]: RGetAllFavorites[] = await asyncGlobalSpinner(
      API.UrlsService.GetAllFavorites(params)
    )

    favorites.value = data.map((item: RGetAllFavorites) => item.good)

  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">
    {{ $t('favorites.title') }}
  </h2>
  <CardList 
    :items="favorites"
    :isFavorites="true"
  />
</template>