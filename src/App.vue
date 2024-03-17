<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue';
import axios from 'axios';

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const products = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

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
    products.value = data
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

onMounted(fetchItems)

watch(
  filters, 
  fetchItems
)

</script>

<template>
  <!-- <Drawer /> -->

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header />

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
        <CardList :items="products" />
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
