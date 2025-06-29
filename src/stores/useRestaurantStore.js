import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { extractAllProductsFromCategories } from '@/utils/restaurant_products'
import { createProductLookupMap } from '@/utils/product_lookup'

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurantInfo = ref(null)

  function setRestaurant(info) {
    restaurantInfo.value = info
  }

  const allProducts = computed(() => {
    return restaurantInfo.value?.categories
      ? extractAllProductsFromCategories(restaurantInfo.value.categories)
      : []
  })

  const productMap = computed(() => createProductLookupMap(allProducts.value))

  function getProduct(item) {
    return productMap.value.get(item?.product_id) || item
  }

  return {
    restaurantInfo,
    setRestaurant,
    allProducts,
    productMap,
    getProduct
  }
})


