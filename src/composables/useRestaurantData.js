import { ref } from 'vue'
import ColorThief from 'colorthief'
import { darkenColor, getComputedColor } from '@/utils/colors'
import { setDefaultStyles } from '@/utils/theme'
import data_restaurants from '@/json/restaurantes_com_menu.json'
import { useRestaurantStore } from '../stores/useRestaurantStore'

export function useRestaurantData(router) {
  const restaurant = ref(null)
  const bgColor = ref('black')
  const backgroundImage = ref(null)
  const restaurantStore = useRestaurantStore()

  const restaurantMap = new Map()
  data_restaurants.forEach(r => restaurantMap.set(r.id, r))

  function loadRestaurantData(id) {
    const restaurantData = restaurantMap.get(id)
    restaurant.value = restaurantData

    if (!restaurantData) {
      alert('Restaurante não encontrado.')
      router.replace('/')
      return
    }

    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = restaurantData.logo || ''

    if (restaurantData.menu?.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurantData.menu.length)
      backgroundImage.value = restaurantData.menu[randomIndex].image
    }

    img.onload = () => {
      const colorThief = new ColorThief()
      const dominantColor = colorThief.getColor(img) || [0, 0, 0]
      bgColor.value = `rgb(${dominantColor.join(',')})`
      setDefaultStyles(bgColor.value)

      restaurantStore.setRestaurant({
        id: restaurantData.id,
        name: restaurantData.name,
        deliveryDuration: restaurantData.delivery_duration,
        logo: restaurantData.logo,
        color: bgColor.value
      })
    }

    img.onerror = () => {
      const fallback = getComputedColor('--color-primary')
      bgColor.value = fallback

      const hoverColor = darkenColor(fallback, 20)
      document.documentElement.style.setProperty('--color-primary-hover', hoverColor)

      setDefaultStyles(bgColor.value)
      restaurantStore.setRestaurant({
        id: restaurantData.id,
        name: restaurantData.name,
        deliveryDuration: restaurantData.delivery_duration,
        logo: restaurantData.logo,
        color: bgColor.value
      })
    }
  }

  return {
    restaurant,
    bgColor,
    backgroundImage,
    loadRestaurantData
  }
}
