import axios from 'axios'

let data_restaurants = []

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
})

export async function fetchRestaurant(id) {
  try {
    const response = await api.get(`/restaurants/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar restaurante:', error)
  }
}

export function getSecureRandomIndex(length) {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0] % length
}

export async function getRestaurantDataById(id) {
  const restaurantData = await fetchRestaurant(id)
  return { ...restaurantData, color: null }
}
