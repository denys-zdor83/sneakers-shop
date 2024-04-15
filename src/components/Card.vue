<script setup lang="ts">
import Like2 from '@images/like-2.svg'
import Like1 from '@images/like-1.svg'
import Checked from '@images/checked.svg'
import Plus from '@images/plus.svg'

const props = defineProps({
  id: Number,
  price: Number,
  title: String,
  imageUrl: String,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>

<template>
  <div
    class="flex flex-col justify-between relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img 
      :src="isFavorite ? Like2 : Like1" 
      alt="Favorite" 
      class="absolute top-8 left-8" 
      @click="onClickFavorite"
    />
    <div>
      <img 
        class="w-full object-contain" 
        :src="imageUrl" 
        alt="Sneaker" 
      />
      <p class="mt-2">
        {{ title }}
      </p>
    </div>

    <div 
      v-if="onClickAdd"
      class="flex justify-between mt-5"
    >
      <div class="flex flex-col gap-2">
        <span class="text-slate-400">
          {{ $t('card.price') }}:
        </span>
        <span class="font-bold">{{ price }} {{ $t('card.currency') }}</span>
      </div>
      <img 
        :src="isAdded ? Checked : Plus" 
        alt="Plus" 
        @click="onClickAdd" 
      />
    </div>

  </div>
</template>