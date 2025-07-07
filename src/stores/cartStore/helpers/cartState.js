import { ref } from 'vue'
import { parseJSON } from './localStorageHelpers'

export function createCartState() {
  const cartItems = ref(Array.isArray(parseJSON('cart', [])) ? parseJSON('cart', []) : [])
  const currentRestaurantId = ref(localStorage.getItem('restaurantId') || null)
  const currentRestaurantInfo = ref(parseJSON('restaurantInfo') || null)

  return { cartItems, currentRestaurantId, currentRestaurantInfo }
}
