<template>
  <footer class="cart-bar" v-if="cartStore.cartItems.length">
    <img :src="cartStore.currentRestaurantInfo?.logo" alt="" class="logo-cart" />
    <p>{{ dropLabel }}</p>
    <Button @click="goToCart" aria-label="Ver sacola com itens adicionados" text="Ver sacola" />
  </footer>
  <CartModalManager
    ref="modalManager"  
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useCartStore } from '../stores/cartStore';
import CartModalManager from './CartModalManager.vue';
import Button from './ui/Button.vue';
const cartStore = useCartStore()
const modalManager = ref(null)

onMounted(() => 
  document.documentElement.style.setProperty('--color-cart', cartStore.currentRestaurantInfo.color)
)

watch(
  () => cartStore.currentRestaurantInfo?.color,
  (newColor) => {
    if (newColor) {
      document.documentElement.style.setProperty('--color-cart', newColor)
    }
  },
  { immediate: true }
)

const openModal = () => {
  modalManager.value?.openModal()
}

function goToCart() {
  openModal()
}

const dropLabel = computed(() => {
  const total = cartStore.totalItems || 0
  return `${total} ${total === 1 ? 'Drop' : 'Drops'} na sua sacola`
})
</script>

<style scoped>
.cart-bar {
  position: fixed;
  bottom: 10px;
  left: 1;
  right: 10px;
  background-color: var(--color-cart);
  color: white;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-lg);
  z-index: 100;
  border-radius: 1rem;
  width: 430px;

  img {
    margin: 0 15px;
    right: 1;
  }

  button {
    background: var(--color-cart);
  }
}

.logo-cart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

@media (max-width: 758px) {
  .cart-bar {
    width: 90%;
  }
}
</style>