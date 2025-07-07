import data_restaurants from '@/json/restaurantes_com_menu.json'

export function getSecureRandomIndex(length) {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0] % length
}


export function getRestaurantDataById(id) {
  const restaurantMap = new Map(data_restaurants.map(r => [r.id, r]))
  return { ...restaurantMap.get(id), color: null }
}
