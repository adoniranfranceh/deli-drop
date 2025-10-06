import { apiGet } from '../../totalPriceStore/helpers/apiHelpers'

export function getSecureRandomIndex(length) {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0] % length
}

export async function getRestaurantDataById(id) {
  const restaurantData = await apiGet({ endpoint: `/restaurants/${id}` })
  if (!restaurantData) return null
  return { ...restaurantData, color: null }
}
