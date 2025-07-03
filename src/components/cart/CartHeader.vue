<template>
  <div class="wrapper-header">
    <header class="modal-header">
      <h2>
        Sua sacola ({{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }})
      </h2>
      <button
        class="close-btn"
        aria-label="Fechar modal"
        @click="$emit('close')"
      >×</button>
    </header>
    <span class="restaurant-name">
      <Icon icon="material-symbols:circle" style="color: var(--color-cart); margin-right: 0.4rem;" />
      {{ restaurantName }}
    </span>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  restaurantName: String,
  totalItems: Number
})
</script>

<style scoped>
.wrapper-header {
  margin: 1rem 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-weight: 700;
  font-size: 1.4rem;
  margin: 0;
}

.close-btn {
  font-size: 1.5rem;
  background: transparent;
  cursor: pointer;
  color: #555;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #b94a48;
}

.restaurant-name {
  font-weight: 100;
  line-height: 20px;
  color: rgb(101, 109, 121);
}

@media (max-width: 768px) {
  .modal-header h2 {
    font-size: 1.1rem;
  }
}
</style>
