import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { createConsumer } from '@rails/actioncable'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
})

const cable = createConsumer(import.meta.env.VITE_WS_URL)

export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const orderCode = ref(null)

  const terminalStatuses = ['delivered', 'cancelled', 'rejected']
  let pollingInterval = null
  let subscription = null

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
      if (currentOrder.value) {
        Object.assign(currentOrder.value, data.order)
      }
      return currentOrder.value
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao cancelar pedido'
      throw err
    } finally {
      loading.value = false
    }
  }

  function subscribe(code) {
    unsubscribe()

    subscription = cable.subscriptions.create(
      { channel: 'OrderTrackingChannel', code },
      {
        connected() {
          stopPolling()
        },
        disconnected() {
          startPolling(code)
        },
        received(data) {
          if (currentOrder.value) {
            Object.assign(currentOrder.value, data)
          }
          if (terminalStatuses.includes(data.status)) {
            unsubscribe()
          }
        }
      }
    )
  }

  function unsubscribe() {
    if (subscription) {
      subscription.unsubscribe()
      subscription = null
    }
    stopPolling()
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
    subscribe,
    unsubscribe,
    startPolling,
    stopPolling
  }
})
