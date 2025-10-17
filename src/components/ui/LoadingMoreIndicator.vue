<template>
  <div class="loading-more">
    <Icon icon="svg-spinners:ring-resize" class="loading-icon" />
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

<style scoped>
.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  color: var(--color-muted);
  font-size: 0.95rem;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-icon {
  font-size: 1.5rem;
  color: var(--color-primary);
}
</style>
