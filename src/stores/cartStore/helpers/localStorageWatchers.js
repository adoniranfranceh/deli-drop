import { watch } from "vue"
import { persistLocalStorage } from "./localStorageHelpers"

export function setupCartWatchers({ cartItems, currentRestaurantId, currentRestaurantInfo }) {
  watch(cartItems, (newVal) => {
    persistLocalStorage('cart', newVal)

    if (newVal.length === 0 && currentRestaurantId.value !== null) {
      currentRestaurantId.value = null
      currentRestaurantInfo.value = null
    }
  }, { deep: true })

  watch(currentRestaurantId, (newVal) => {
    if (newVal) persistLocalStorage('restaurantId', newVal)
  })

  watch(currentRestaurantInfo, (newVal) => {
    if (newVal) persistLocalStorage('restaurantInfo', newVal)
  }, { deep: true })
}
