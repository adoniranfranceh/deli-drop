import { defineStore } from 'pinia'
import { setupCartWatchers } from './helpers/localStorageWatchers'
import { createCartState } from './helpers/cartState'
import { createCartActions } from './helpers/cartActions'
import { useCartComputed } from './helpers/cartComputed'

export const useCartStore = defineStore('cart', () => {
  const { cartItems, currentRestaurantId, currentRestaurantInfo } = createCartState()

  setupCartWatchers({ cartItems, currentRestaurantId, currentRestaurantInfo })

  const { addCart, updateCartItem, updateQuantity, removeItem, clearCart } =
    createCartActions(cartItems, currentRestaurantId, currentRestaurantInfo)

  const { totalItems, subtotal } = useCartComputed(cartItems)

  return {
    cartItems,
    currentRestaurantId,
    currentRestaurantInfo,
    totalItems,
    subtotal,
    addCart,
    updateCartItem,
    updateQuantity,
    removeItem,
    clearCart,
  }
})
