<template>
  <footer class="fixed bottom-2.5 right-2.5 flex items-center justify-center z-[100]" v-if="cartStore.cartItems.length">
    <div
      class="relative mr-2 z-[101] w-10 h-10 rounded-full overflow-hidden border-[3px] border-[var(--color-cart)] shadow cursor-pointer shrink-0"
      @click="goToRestaurant"
    >
      <img
        :src="cartStore.currentRestaurantInfo?.logo"
        alt="Logo do restaurante"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="bg-[var(--color-cart)] text-white py-2 px-4 flex items-center justify-between rounded-full max-w-[340px] w-full font-semibold shadow-lg max-[758px]:text-xs">
      <p class="flex-1 mx-2 m-0 whitespace-nowrap">{{ dropLabel }}</p>
      <AppButton @click="goToCart" variant="cart-inverse" text="Ver sacola" aria-label="Ver sacola com itens adicionados" />
    </div>
  </footer>

  <CartModalManager ref="modalManager" />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import CartModalManager from '@/components/cart/CartModalManager.vue';
import AppButton from '../ui/AppButton.vue';
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const modalManager = ref(null)
const router = useRouter()

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
