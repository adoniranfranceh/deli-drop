import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurantInfo = ref(null)

  function setRestaurant(info) {
    restaurantInfo.value = info
  }

  return { restaurantInfo, setRestaurant }
})
