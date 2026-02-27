import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
})

export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const orderCode = ref(null)

  const terminalStatuses = ['delivered', 'cancelled', 'rejected']
  let pollingInterval = null

  async function createOrder(payload) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/orders', payload)
      const order = data.order
      currentOrder.value = order
      orderCode.value = order.code
      return order
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao criar pedido'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchOrder(code) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/orders/${code}`)
      const order = data.order
      currentOrder.value = order
      orderCode.value = order.code
      return order
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao buscar pedido'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function cancelOrder(code, reason) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.patch(`/orders/${code}/cancel`, { reason })
      const order = data.order
      currentOrder.value = order
      return order
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao cancelar pedido'
      throw err
    } finally {
      loading.value = false
    }
  }

  function startPolling(code) {
    stopPolling()
    pollingInterval = setInterval(async () => {
      try {
        const { data } = await api.get(`/orders/${code}`)
        const order = data.order
        currentOrder.value = order
        if (terminalStatuses.includes(order.status)) {
          stopPolling()
        }
      } catch {
      }
    }, 15000)
  }

  function stopPolling() {
    if (pollingInterval) {
      clearInterval(pollingInterval)
      pollingInterval = null
    }
  }

  return {
    currentOrder,
    loading,
    error,
    orderCode,
    createOrder,
    fetchOrder,
    cancelOrder,
    startPolling,
    stopPolling
  }
})
