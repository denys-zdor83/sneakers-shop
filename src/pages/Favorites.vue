<script setup lang="ts">
import CardList from '@components/CardList.vue'
import Infoblock from '@components/Infoblock.vue';

import { API } from '@api'
import { asyncGlobalSpinner } from "@loader-worker"

import type { 
  IOneGoodsItem,
  RGetAllFavorites,
} from "@api/interfaces";
import { computed } from 'vue';

// --- Interfaces
interface IParams {
  _relations: string
}
// --- Interfaces

const favorites: Ref<IOneGoodsItem[]> = ref([])
const isFavorites: Ref<boolean> = computed(() => favorites.value.length > 0)

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
  <Infoblock 
    v-if="!isFavorites"
    :title="$t('messages.empty_favorites.title')" 
    :description="$t('messages.empty_favorites.description')" 
    imageUrl="/package-icon.png" 
  />
  <CardList 
    :items="favorites"
    :isFavorites="true"
  />
</template>