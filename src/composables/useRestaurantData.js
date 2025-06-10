import { ref } from 'vue'
import ColorThief from 'colorthief'
import { darkenColor, setDefaultStyles, getComputedColor } from '@/utils/colors'
import data_restaurants from '@/json/restaurantes_com_menu.json'

export function useRestaurantData(router) {
  const restaurant = ref(null)
  const bgColor = ref('black')
  const backgroundImage = ref(null)

  const restaurantMap = new Map()
  data_restaurants.forEach(r => restaurantMap.set(r.id, r))

  function loadRestaurantData(id) {
    console.log('olaaaaaaaaaaa')
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
    }

    img.onerror = () => {
      const fallback = getComputedColor('--color-primary')
      bgColor.value = fallback

      const hoverColor = darkenColor(fallback, 20)
      document.documentElement.style.setProperty('--color-restaurant-hover', hoverColor)

      setDefaultStyles(bgColor.value)
    }
  }

  return {
    restaurant,
    bgColor,
    backgroundImage,
    loadRestaurantData
  }
}
