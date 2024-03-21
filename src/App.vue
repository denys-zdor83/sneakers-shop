<script setup lang="ts">
import { onMounted, ref, watch, reactive, provide, computed } from 'vue';
import axios from 'axios';

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const products = ref([])
const cartItems = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const isDrawerOpen = ref(false)
const isCreatingOrder = ref(false)

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() =>  Math.round((totalPrice.value * 5) / 100))
const isCartEmpty = computed(() => cartItems.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || isCartEmpty.value)

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const addToCart = item => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = item => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true

    const { data } = await axios.post('https://03eef75a3e96a712.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: totalPrice.value,
    })
    cartItems.value = []

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

const onClickPlus = item => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const fetchFavorites = async () => {
  try {
    const {data: favorites} = await axios.get('https://03eef75a3e96a712.mokky.dev/favorites')

    products.value = products.value.map(item => {
      const favorite = favorites.find(favorite => favorite.parentId === item.id)

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

const addToFavorites = async item => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      }
      item.isFavorite = true

      const { data } = await axios.post('https://03eef75a3e96a712.mokky.dev/favorites', obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      
      await axios.delete(`https://03eef75a3e96a712.mokky.dev/favorites/${item.favoriteId}`)
      
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  const params = {
    sortBy: filters.sortBy,
  }

  if (filters.searchQuery) {
    params.title = `*${filters.searchQuery}*`
  }

  try {
    const {data} = await axios.get('https://03eef75a3e96a712.mokky.dev/goods', { 
      params 
    })

    products.value = data.map(obj => {
      return {
        ...obj,
        isAdded: false,
        favoriteId: null,
        isFavorite: false,
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const onChangeSelect = event => {
  filters.sortBy = event.target.value
}

const onChangeSearch = event => {
  filters.searchQuery = event.target.value
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cartItems.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  products.value = products.value.map(item => {
    return {
      ...item,
      isAdded: cartItems.value.some(cartItem => cartItem.id === item.id)
    }
  })
})

watch(
  filters, 
  fetchItems
)

watch(
  cartItems,
  () => {
    products.value = products.value.map(item => {
      return {
        ...item,
        isAdded: false,
      }
    })
  }
)

watch(
  cartItems,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', {
  cartItems,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
})
</script>

<template>
  <Drawer 
    v-if="isDrawerOpen" 
    :totalPrice="totalPrice"
    :vatPrice="vatPrice"
    :isButtonDisabled="cartButtonDisabled"
    @create-order="createOrder"
  />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header
      :totalPrice="totalPrice"
      @open-drawer="openDrawer" 
    />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">
          {{ $t('main_page.title') }}
        </h2>

        <div class="flex gap-4">
          <select 
            class="py-2 px-3 border rounded-md outline-none"
            @change="onChangeSelect" 
          >
            <option value="name">{{ $t('main_page.by_name') }}</option>
            <option value="price">{{ $t('main_page.by_price_cheap') }}</option>
            <option value="-price">{{ $t('main_page.by_price_expensive') }}</option>
          </select>

          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="Search">
            <input 
              type="text"
              :placeholder="$t('main_page.search')"  
              class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400 transition"
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

    </div>
  </div>
</template>

<style scoped>
</style>
