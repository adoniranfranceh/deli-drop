<template>
  <span class="rating-container">
    <Icon icon="mdi:star" style="color: gold; width: 22; height: 22; margin: 5px;" />
    {{ rating }}
  </span>
</template>

<script setup>
  import { Icon } from '@iconify/vue';
 
  defineProps({
    rating: {
      type: Number,
      required: true
    }
  })
</script>

<style scoped>
  .rating-container {
    display: flex;
    align-items: center;
  }
</style>