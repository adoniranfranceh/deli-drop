<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content" v-if="hasItems">
      <CartHeader
        :restaurantName="restaurantName"
        :totalItems="totalItems"
        @close="$emit('close')"
      />

      <hr />

      <div class="cart-info">
        <div class="items">
          <CartItem
            v-for="item in cartItems"
            :key="item.cartItemId"
            :item="item"
            @edit="handleEditItem"
            @quantityChange="handleQuantityChange"
          />
        </div>

        <hr />

        <CartSummary
          :subtotal="subtotal"
          :deliveryFee="deliveryFee"
          :serviceFee="serviceFee"
          :totalItems="totalItems"
          :deliveryDuration="deliveryDuration"
          :deliveryAddress="deliveryAddress"
          @checkout="handleCheckout"
          @clearCart="handleClearCart"
        />
      </div>
    </div>

    <EmptyCart v-else @close="$emit('close')" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import CartHeader from './CartHeader.vue'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
import EmptyCart from './EmptyCart.vue'
import { useUIStore } from '@/stores/uiStore'

const cartStore = useCartStore()
const uiStore = useUIStore()

defineProps({
  deliveryAddress: { type: String, default: 'Rua das Flores, 123' },
  deliveryFee: { type: Number, default: 4.99 },
  serviceFee: { type: Number, default: 0.45 }
})

const emit = defineEmits(['close', 'checkout', 'edit-product'])

const cartItems = computed(() => cartStore.cartItems)
const totalItems = computed(() => cartStore.totalItems)
const subtotal = computed(() => cartStore.subtotal)
const restaurantName = computed(() => cartStore.currentRestaurantInfo?.name || '')
const deliveryDuration = computed(() => cartStore.currentRestaurantInfo?.deliveryDuration || null)
const hasItems = computed(() => cartItems.value.length > 0)

function handleEditItem(item) {
  emit('edit-product', {
    product: item,
    quantity: item.quantity,
    selectedModifiers: item.selectedModifiers,
    cartItemId: item.cartItemId,
    finalTotalPrice: item.totalPrice
  })
}

function handleQuantityChange(id, quantity) {
  cartStore.updateQuantity(id, quantity)
}

function handleClearCart() {
  cartStore.clearCart()
}

function handleCheckout() {
  emit('checkout')
}

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
  background: white;
  width: 850px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
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

hr {
  border-top: 1px solid var(--color-border);
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

.cart-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.items {
  max-height: 400px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .modal-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
    margin: 0;
    overflow-y: auto;
  }

  .items {
    max-height: 100%;
    overflow-y: unset;
  }

  .cart-info {
    overflow: unset;
  }
}
</style>
