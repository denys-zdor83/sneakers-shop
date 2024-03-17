<script setup lang="ts">
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header />

    <div class="p-10">
      <div class="text-3xl font-bold mb-8">
        {{ $t('main_page.title') }}
      </div>

      <CardList />
    </div>
  </div>
</template>

<style scoped>
</style>
