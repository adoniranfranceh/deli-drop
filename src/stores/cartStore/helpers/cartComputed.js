import { computed } from "vue"

export function useCartComputed(cartItems) {
  const totalItems = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity * item.totalPrice, 0)
  )

  return { totalItems, subtotal }
}
