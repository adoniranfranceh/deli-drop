import { ref } from 'vue'
import ColorThief from 'colorthief'
import { getComputedColor } from '@/utils/colors'
import { setDefaultStyles } from '@/utils/theme'
import data_restaurants from '@/json/restaurantes_com_menu.json'
import { useRestaurantStore } from '@/stores/useRestaurantStore'

export function useRestaurantData(router) {
  const restaurant = ref(null)
  const bgColor = ref('black')
  const backgroundImage = ref(null)
  const restaurantStore = useRestaurantStore()

  const restaurantMap = new Map(data_restaurants.map(r => [r.id, r]))

  function setRandomBackgroundImage() {
    if (!backgroundImage.value && restaurantStore.allProducts?.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurantStore.allProducts.length)
      backgroundImage.value = restaurantStore.allProducts[randomIndex].image
    }
  }

  function applyRestaurantColor(restaurantData, color) {
    bgColor.value = color
    setDefaultStyles(color)
    restaurantData.color = color
    restaurantStore.setRestaurant(restaurantData)
    restaurant.value = restaurantData
    setRandomBackgroundImage()
  }

  function loadRestaurantData(id) {
    const restaurantData = { ...restaurantMap.get(id), color: null }

    if (!restaurantData) {
      alert('Restaurante não encontrado.')
      router.replace('/')
      return
    }

    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = restaurantData.logo || ''

    img.onload = () => {
      try {
        const colorThief = new ColorThief()
        const dominantColor = colorThief.getColor(img) || [0, 0, 0]
        applyRestaurantColor(restaurantData, `rgb(${dominantColor.join(',')})`)
      } catch {
        const fallback = getComputedColor('--color-primary')
        applyRestaurantColor(restaurantData, fallback)
      }
    }

    img.onerror = () => {
      const fallback = getComputedColor('--color-primary')
      applyRestaurantColor(restaurantData, fallback)
    }

    if (img.complete) {
      img.onload()
    }
  }

  return {
    restaurant,
    bgColor,
    backgroundImage,
    loadRestaurantData
  }
}
