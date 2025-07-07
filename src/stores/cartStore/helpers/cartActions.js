import { confirmClearCart } from './SwalHelpers'
import {
  isValidItem,
  resetRestaurantInfoIfEmptyCart,
  isFromDifferentRestaurant,
  updateCurrentRestaurant,
  prepareCartItemData,
  pushOrIncrementCartItem,
  handleUpdateCartItem
} from './cartLogicHelpers'

export function createCartActions(cartItems, currentRestaurantId, currentRestaurantInfo) {
  async function addCart(item, restaurantInfo) {
    if (!isValidItem(item, restaurantInfo)) return

    resetRestaurantInfoIfEmptyCart(cartItems, currentRestaurantId, currentRestaurantInfo)

    if (isFromDifferentRestaurant(restaurantInfo.id, currentRestaurantId)) {
      const confirmed = await confirmClearCart()
      if (!confirmed) return
      cartItems.value = []
    }

    updateCurrentRestaurant(restaurantInfo, currentRestaurantId, currentRestaurantInfo)
    pushOrIncrementCartItem(cartItems, prepareCartItemData(item))
  }

  function updateCartItem(payload) {
    handleUpdateCartItem({
      cartItems, cartItemId: payload.cartItemId, quantity: payload.quantity,
      selectedModifiers: payload.selectedModifiers, totalPrice: payload.totalPrice,
      comment: payload.comment
    })
  }

  function updateQuantity(id, quantity) {
    cartItems.value = cartItems.value.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  }

  function removeItem(cartItemId) {
    cartItems.value = cartItems.value.filter(item => item.cartItemId !== cartItemId)
  }

  function clearCart() {
    cartItems.value = []
    currentRestaurantId.value = null
    currentRestaurantInfo.value = null
  }

  return {
    addCart,
    updateCartItem,
    updateQuantity,
    removeItem,
    clearCart
  }
}
