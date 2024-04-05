<script setup lang="ts">
import Loader from '@images/loader.svg'

const props = defineProps({
  isLoading: Object
})

const loading = ref(props.isLoading);

watch(
  () => props.isLoading,
  (newData) => {
    loading.value = newData;
  }
);
</script>

<template>
  <div
    class="spiner-wrapper spiner-wrapper__page"
    v-if="loading"
  >
    <img :src="Loader" alt="Loader" />
  </div>
</template>


<style lang="scss" scoped>
.spiner-wrapper {
  background: var(--spiner);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 220px;
    height: 248px;
  }

  &.spiner-wrapper__page {
    position: fixed;
  }

}
</style>
