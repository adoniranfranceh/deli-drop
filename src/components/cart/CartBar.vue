<template>
  <footer class="cart-bar-wrapper" v-if="cartStore.cartItems.length">
    <div class="logo-wrapper">
      <img
        :src="cartStore.currentRestaurantInfo?.logo"
        alt="Logo do restaurante"
        class="logo-cart"
        @click="goToRestaurant"
        style="cursor: pointer"
      />
    </div>
    <div class="cart-bar">
      <p>{{ dropLabel }}</p>
      <Button @click="goToCart" text="Ver sacola" aria-label="Ver sacola com itens adicionados" />
    </div>
  </footer>

  <CartModalManager
    ref="modalManager"
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import CartModalManager from '@/components/cart/CartModalManager.vue';
import Button from '@/components/ui/Button.vue';
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const modalManager = ref(null)
const router = useRouter()

console.log('🔍 CartBar mounted, currentRestaurantInfo:', cartStore.cartItems)
onMounted(() => 
  document.documentElement.style.setProperty('--color-cart', cartStore.currentRestaurantInfo?.color)
)

function goToRestaurant() {
  const restaurantId = cartStore.currentRestaurantInfo?.id
  if (restaurantId) {
    if (router.currentRoute.value.path !== `/restaurante/${restaurantId}`) {
      router.replace({ path: `/restaurante/${restaurantId}` })
    }
  }
}

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
.cart-bar-wrapper {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.logo-wrapper {
  position: relative;
  margin-right: 7px;
  z-index: 101;
}

.logo-cart {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--color-cart);
  object-fit: cover;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.cart-bar {
  background-color: var(--color-cart);
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 9999px;
  max-width: 340px;
  width: 100%;
  height: 30px;
  font-weight: 600;
  box-shadow: var(--shadow-lg);
}

.cart-bar p {
  flex: 1;
  margin: 0 1rem;
}

.cart-bar :deep(button) {
  background-color: white !important;
  color: var(--color-cart) !important;
  font-weight: bold;
  border-radius: 9999px;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  border: none;
}

@media (max-width: 758px) {
  .cart-bar {
    font-size: 12px;
  }
}
</style>
