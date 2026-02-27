<template>
  <span class="flex items-center">
    <Icon icon="system-uicons:location" class="w-5 h-5" />
    {{ location }}
  </span>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  location: String
})
</script>
