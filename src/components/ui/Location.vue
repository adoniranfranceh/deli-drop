<template>
  <span>
    <Icon icon="system-uicons:location" style="width: 20px; height: 20px;" />
    {{ location }}
  </span>
</template>

<script setup>
  import { Icon } from '@iconify/vue';
  defineProps({
    location: String
  })
</script>