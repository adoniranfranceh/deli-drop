import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
})

export async function apiGet({
  endpoint
}) {
 try {
    const response = await api.get(endpoint)
    return response.data || null
  } catch (error) {
    console.error(error)
    return null
  }
}
