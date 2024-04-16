<script setup lang="ts">
import { API } from '@api'
import { asyncGlobalSpinner } from "@loader-worker"

import CartWhite from '@images/cart-white.svg'
import Like2 from '@images/like-2.svg'
import Like1 from '@images/like-1.svg'

import type { 
  RGetAllProducts 
} from "@api/interfaces";

const route = useRoute()
const product: Ref<RGetAllProducts | null> = ref(route.meta.product)

</script>

<template>
  <div class="product">
    <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5">
      <img 
        class="w-full object-contain" 
        :src="product.imageUrl" 
        alt="Photo of product"
      >
      <div class="product__info">
        <h1 class="text-3xl font-bold mb-4">
          {{ product.title }}
        </h1>
        <p class="text-2xl mb-4">
          {{ $t('product.sizes') }}:
        </p>
        <div class="flex mb-3">
          <button 
            v-for="size in product.sizes" 
            :key="size" 
            class="flex items-center justify-center font-bold w-10 h-10 rounded bg-gray-200 duration-500 focus:shadow-md focus:bg-lime-600 mr-2 cursor-pointer focus:-translate-y-0.5 focus:translate-x-0.5"
          >
            {{ size }}
          </button>
        </div>
        <div class="flex mb-3">
          <button class="flex items-center justify-center bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 transition cursor-pointer">
            <img 
              :src="CartWhite" 
              class="mr-3"
              alt="Cart"
            >
            {{ $t('product.add_to_cart') }}
          </button>
          <img 
            :src="false ? Like2 : Like1" 
            alt="Favorite"
            class="w-12 h-12 ml-3 cursor-pointer"
          />
        </div>
      </div>
    </div>

    <div class="product__description">
      <p class="text-2xl font-bold mb-4">
        {{ $t('product.description') }}
      </p>
      <div v-html="product.description"></div>
    </div>
  </div>
</template>