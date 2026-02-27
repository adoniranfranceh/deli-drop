<template>
  <span class="flex items-center" v-if="rating">
    <Icon icon="mdi:star" class="text-yellow-400 w-[22px] h-[22px] m-1" />
    {{ rating }}
  </span>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  rating: Number
})
</script>
