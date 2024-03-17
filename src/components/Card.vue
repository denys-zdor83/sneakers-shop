<script setup lang="ts">
defineProps({
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
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img 
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" 
      alt="Favorite" 
      class="absolute top-8 left-8" 
      @click="onClickFavorite"
    />
    <img :src="imageUrl" alt="Sneaker" />
    <p class="mt-2">
      {{ title }}
    </p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-400">
          {{ $t('card.price') }}:
        </span>
        <span class="font-bold">{{ price }} usd</span>
      </div>
      <img 
        :src="isAdded ? '/checked.svg' : '/plus.svg'" 
        alt="Plus" 
        @click="onClickAdd" 
      />
    </div>

  </div>
</template>