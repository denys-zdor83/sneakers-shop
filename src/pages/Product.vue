<script setup lang="ts">
import { API } from '@api'
import { asyncGlobalSpinner } from "@loader-worker"

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
        <h1 class="text-3xl font-bold max-md:mb-4">
          {{ product.title }}
        </h1>
      </div>
    </div>

    <div class="product__description">
      <p class="text-2xl font-bold mb-4">
        {{ $t('product.description') }}
      </p>
      <div v-html="product.description" class="description_text"></div>
    </div>
  </div>
</template>