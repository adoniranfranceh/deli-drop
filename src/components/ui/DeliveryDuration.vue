<template>
  <span v-if="duration">
    <Icon icon="mdi-light:clock" style="width: 20px; height: 20px; margin: 5px;" />
    {{ duration }} min
  </span>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  duration: {
    type: [String, Number],
    required: true
  }
})
</script>

<style setup>
  span {
    display: flex;
    align-items: center;
  }
</style>