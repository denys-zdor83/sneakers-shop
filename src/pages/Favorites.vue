<script setup lang="ts">
import CardList from '@components/CardList.vue'
import Infoblock from '@components/Infoblock.vue';

import { API } from '@api'
import { asyncGlobalSpinner } from "@loader-worker"

import PackageIcon from '@images/package-icon.png'

import type { 
  IOneOrder,
  IOneGoodsItem,
  RGetAllFavorites,
} from "@api/interfaces";

// --- Interfaces
interface IParams {
  _relations: string
}
// --- Interfaces

const favorites: Ref<IOneGoodsItem[]> = ref([])
const isFavorites: Ref<boolean> = computed(() => favorites.value.length > 0)

const GetFavorites = async () => {
  try {
    const params: IParams = {
      _relations: 'goods'
    }
    const [data]: RGetAllFavorites[] = await asyncGlobalSpinner(
      API.UrlsService.GetAllFavorites(params)
    )
    
    favorites.value = data.map((item: RGetAllFavorites) => {
      return {
        ...item.good,
        isFavorite: true,
        favoriteId: item.id,
      }
    })

  } catch (error) {
    console.error(`[GetFavorites]: error ${error}`)
  }
}

const removeFromFavorites = async (item: IOneOrder): Promise<void> => { 
  try {
      item.isFavorite = false
      
      await asyncGlobalSpinner(
        API.UrlsService.DeleteFromFavorites(item.favoriteId)
      )
      
      await GetFavorites()

  } catch (error) {
    console.error(`[addToFavorites]: error ${error}`)

  }
}

onMounted(GetFavorites)
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">
    {{ $t('favorites.title') }}
  </h2>
  <Infoblock 
    v-if="!isFavorites"
    :title="$t('messages.empty_favorites.title')" 
    :description="$t('messages.empty_favorites.description')" 
    :imageUrl="PackageIcon" 
  />
  <CardList
    v-else
    @add-to-favorites="removeFromFavorites"
    :items="favorites"
  />
</template>