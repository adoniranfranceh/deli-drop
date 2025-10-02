import { ref } from 'vue'
import ColorThief from 'colorthief'
import { getComputedColor } from '@/utils/colors'
import { setDefaultStyles } from '@/utils/theme'
import { useRestaurantStore } from '@/stores/useRestaurantStore'
import { getSecureRandomIndex, getRestaurantDataById } from '../stores/productSelectionStore/utils/restaurantUtils'

function createImageWithHandlers(restaurantData, onSuccess, onError) {
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = restaurantData.logo || ''
  img.onload = () => onSuccess(img)
  img.onerror = () => onError(img)
  if (img.complete) img.onload()
}

function handleApplyColor({ restaurantData, color, store, refs }) {
  const { restaurant, bgColor } = refs
  bgColor.value = color
  setDefaultStyles(color)
  restaurantData.color = color
  store.setRestaurant(restaurantData)
  restaurant.value = restaurantData
}

function setRandomBackgroundImageIfNeeded(restaurantStore, backgroundImage) {
  if (!backgroundImage.value && restaurantStore.allProducts?.length > 0) {
    const index = getSecureRandomIndex(restaurantStore.allProducts.length)
    backgroundImage.value = restaurantStore.allProducts[index].image
  }
}

function handleFallbackColor({ restaurantData, store, refs, backgroundImage }) {
  const fallback = getComputedColor('--color-primary')
  handleApplyColor({
    restaurantData,
    color: fallback,
    store,
    refs
  })
  setRandomBackgroundImageIfNeeded(store, backgroundImage)
}

function handleImageSuccess({ img, restaurantData, store, refs, backgroundImage }) {
  try {
    const colorThief = new ColorThief()
    const dominantColor = colorThief.getColor(img) || [0, 0, 0]
    handleApplyColor({
      restaurantData,
      color: `rgb(${dominantColor.join(',')})`,
      store,
      refs
    })
    setRandomBackgroundImageIfNeeded(store, backgroundImage)
  } catch {
    handleFallbackColor({ restaurantData, store, refs, backgroundImage })
  }
}

export async function loadRestaurantData({
  id,
  router,
  restaurantStore,
  restaurant,
  bgColor,
  backgroundImage
}) {
  const restaurantData = await getRestaurantDataById(id)

  if (!restaurantData.id) {
    alert('Restaurante não encontrado.')
    router.replace('/')
    return
  }

  createImageWithHandlers(
    restaurantData,
    (img) => handleImageSuccess({
      img,
      restaurantData,
      store: restaurantStore,
      refs: { restaurant, bgColor },
      backgroundImage
    }),
    () => handleFallbackColor({
      restaurantData,
      store: restaurantStore,
      refs: { restaurant, bgColor },
      backgroundImage
    })
  )
}

export function useRestaurantData(router) {
  const restaurant = ref(null)
  const bgColor = ref('black')
  const backgroundImage = ref(null)
  const restaurantStore = useRestaurantStore()

  return {
    restaurant,
    bgColor,
    backgroundImage,
    loadRestaurantData: (id) => loadRestaurantData({
      id,
      router,
      restaurantStore,
      restaurant,
      bgColor,
      backgroundImage
    })
  }
}
