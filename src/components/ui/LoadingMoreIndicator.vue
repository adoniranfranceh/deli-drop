<template>
  <div class="flex items-center justify-center gap-3 p-8 text-muted text-[0.95rem] animate-[fadeIn_0.3s_ease-in]">
    <Icon icon="svg-spinners:ring-resize" class="text-2xl text-primary" />
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  text: {
    type: String,
    default: 'Carregando mais...'
  }
})
</script>
