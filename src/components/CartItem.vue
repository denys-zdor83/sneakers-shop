<script setup lang="ts">
import Close from '@images/close.svg'

const emit = defineEmits(['onClickRemove'])

defineProps({
  title: String,
  imageUrl: String,
  price: Number,
})
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img 
      class="w-16 h-16" 
      :src="imageUrl" 
      :alt="title"
    >

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} {{ $t('card.currency') }}</b>
        <img 
          class="opacity-40 hover:opacity-100 cursor-pointer transition" 
          :src="Close"
          alt="Close"
          @click="emit('onClickRemove')"
        >
      </div>
    </div>
  </div>
</template>