<script setup lang="ts">
import debounce from 'lodash.debounce'

import CardList from '@components/CardList.vue'

import { asyncGlobalSpinner } from "@loader-worker"
import { API } from '@api'
import type { 
  IOneOrder, 
  RGetAllFavorites, 
  RAddToFavorites, 
  RGetAllGoods 
} from "@api/interfaces";

// ---Interfaces
interface IFilters {
  sortBy: string
  searchQuery: string
}

interface GoodsItemId {
  good_id: number
}

interface IParams {
  sortBy: string
  title?: string
}
// ---Interfaces

const { cartItems, addToCart, removeFromCart } = inject('cart')
const filters: IFilters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const products: Ref<IOneOrder[]> = ref([])

const onClickPlus = (item: IOneOrder): void => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const addToFavorites = async (item: IOneOrder): Promise<void> => {
  try {
    if (!item.isFavorite) {
      const goodsItemId: GoodsItemId = {
        good_id: item.id,
      }
      item.isFavorite = true

      const [data]: RAddToFavorites = await asyncGlobalSpinner(
        API.UrlsService.AddToFavorites(goodsItemId)
      )   

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      
      await asyncGlobalSpinner(
        API.UrlsService.DeleteFromFavorites(item.favoriteId)
      )
      
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async (): Promise<void> => {
  try {
    const [favorites]: RGetAllFavorites[] = await asyncGlobalSpinner(
      API.UrlsService.GetAllFavorites()
    )
    
    products.value = products.value.map((item: IOneOrder) => {
      const favorite = favorites.find((favorite: RGetAllFavorites) => favorite.good_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async (): Promise<void> => {
  const params: IParams = {
    sortBy: filters.sortBy,
  }

  if (filters.searchQuery) {
    params.title = `*${filters.searchQuery}*`
  }

  try {
    const [data]: RGetAllGoods[] = await asyncGlobalSpinner(
      API.UrlsService.GetAllGoods(params)
    )
  
    products.value = data.map((item: RGetAllGoods) => {
      return {
        ...item,
        isAdded: false,
        favoriteId: null,
        isFavorite: false,
      }
    })

  } catch (error) {
    console.log(error)
  }
}

const onChangeSelect = (event: Event): void => {
  filters.sortBy = event.target.value
}

const onChangeSearch = debounce((event: Event): void => {
  filters.searchQuery = event.target.value
}, 400)

watch(
  filters, 
  fetchItems
)

watch(
  cartItems,
  () => {
    products.value = products.value.map((item: IOneOrder) => {
      return {
        ...item,
        isAdded: false,
      }
    })
  }
)

onMounted(async () => {
  const localCart: string = localStorage.getItem('cart')
  cartItems.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  products.value = products.value.map((item: IOneOrder) => {
    return {
      ...item,
      isAdded: cartItems.value.some((cartItem: IOneOrder) => cartItem.id === item.id)
    }
  })
})
</script>

<template>
  <div class="flex justify-between items-center gap-4 max-lg:flex-col max-lg:items-start">
    <h2 class="text-3xl font-bold max-lg:mb-4">
      {{ $t('main_page.title') }}
    </h2>

    <div class="flex gap-4 justify-end max-lg:flex-1 max-lg:w-full max-md:flex-col">
      <select 
        class="py-2 px-3 border flex-1 rounded-md outline-none bg-white"
        @change="onChangeSelect" 
      >
        <option value="name">{{ $t('main_page.by_name') }}</option>
        <option value="price">{{ $t('main_page.by_price_cheap') }}</option>
        <option value="-price">{{ $t('main_page.by_price_expensive') }}</option>
      </select>

      <div class="relative flex-1">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search">
        <input 
          type="text"
          :placeholder="$t('main_page.search')"  
          class="border w-full rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400 transition"
          @input="onChangeSearch"
        >
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList 
      :items="products" 
      @add-to-favorites="addToFavorites"
      @add-to-cart="onClickPlus"
    />
  </div>
</template>