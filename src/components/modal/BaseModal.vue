<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue'
import { useUIStore } from '@/stores/uiStore'
const uiStore = useUIStore()

defineEmits(['close'])

onMounted(() => uiStore.openModal())
onUnmounted(() => uiStore.closeModal())
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 800px;
  height: auto;
  max-height: 100%;
  overflow: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}
</style>
