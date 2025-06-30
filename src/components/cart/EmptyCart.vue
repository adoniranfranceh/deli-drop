<template>
  <div class="empty-modal-content" v-if="cartStore.cartItems.length === 0">
    <header class="modal-header">
      <div class="wrapper-close">
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
        <h2>
          Sua sacola está vazia
        </h2>
      </header>
      <div class="info-empty">
        <Icon icon="lucide:shopping-bag" class="bag-icon"/>
        <p>Adicione alguns itens deliciosos</p>

        <Button text="Continuar comprando" @click="$emit('close')"/>
      </div>
  </div>
</template>

<style scoped>
.empty-modal-content {
  width: 520px;
  height: 340px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

.close-btn {
  font-size: 1.5rem;
  background: transparent;
  cursor: pointer;
  color: #555;
  transition: color 0.2s;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.wrapper-header {
  margin: 1rem 1.5rem;
}

.wrapper-info {
  display: flex;
}

.wrapper-close {
  display: flex;
  justify-content: end;
}

.modal-header h2 {
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0;
  color: var(--color-black);
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

.info-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;

  button {
    margin-top: 1rem;
    background: var(--color-cart)
  }

  button:hover {
    background: var(--color-cart);
    opacity: 0.9;
  }
}

.bag-icon {
  width: 4rem;
  height: 4rem;
  color: rgb(209, 213, 219);
}

@media (max-width: 758px) {
  .empty-modal-content {
    border-radius: 0;
  }
}

</style>

<script setup>
import { Icon } from '@iconify/vue';
import { useCartStore } from '@/stores/cartStore'
import Button from '@/components/ui/Button.vue'

defineProps({
  restauranName: String
})

const cartStore = useCartStore()
</script>