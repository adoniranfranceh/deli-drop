<template>
  <span class="rating-container" v-if="rating">
    <Icon icon="mdi:star" style="color: gold; width: 22; height: 22; margin: 5px;" />
    {{ rating }}
  </span>
</template>

<script setup>
  import { Icon } from '@iconify/vue';
 
  defineProps({
    rating: Number
  })
</script>

<style scoped>
  .rating-container {
    display: flex;
    align-items: center;
  }
</style>
