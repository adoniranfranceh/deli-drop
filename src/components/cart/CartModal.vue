<template>
  <BaseModal @close="$emit('close')" v-if="hasItems">
    <div class="overflow-auto">
      <CartHeader
        :restaurantName="restaurantName"
        :totalItems="totalItems"
        @close="$emit('close')"
      />

      <hr class="w-[calc(100%-1rem)] max-[1068px]:w-full" />

      <div class="h-full flex flex-col overflow-hidden max-[1068px]:overflow-visible">
        <div class="overflow-y-auto max-[1068px]:overflow-y-visible">
          <CartItem
            v-for="item in cartItems"
            :key="item.cartItemId"
            :item="item"
            @edit="handleEditItem"
            @quantityChange="handleQuantityChange"
          />
        </div>

        <hr class="w-[calc(100%-1rem)] max-[1068px]:w-full" />

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
  </BaseModal>
  <EmptyCart v-else @close="$emit('close')" />
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import CartHeader from './CartHeader.vue'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
import EmptyCart from './EmptyCart.vue'
import BaseModal from '../modal/BaseModal.vue'

const cartStore = useCartStore()

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
</script>

