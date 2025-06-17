import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'

function parseJSON(key, fallback = null) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function persistLocalStorage(key, value) {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref(parseJSON('cart', []))
  const currentRestaurantId = ref(localStorage.getItem('restaurantId') || null)
  const currentRestaurantInfo = ref(parseJSON('restaurantInfo', null))

  watch(cartItems, (newVal) => {
    persistLocalStorage('cart', newVal)
    if (newVal.length === 0) {
      currentRestaurantId.value = null
      currentRestaurantInfo.value = null
    }
  }, { deep: true })

  watch(currentRestaurantId, (newVal) => {
    if (newVal) persistLocalStorage('restaurantId', newVal)
  })

  watch(currentRestaurantInfo, (newVal) => {
    if (newVal) persistLocalStorage('restaurantInfo', newVal)
  }, { deep: true })

  const totalItems = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
  )

  async function addCart(item, restaurantInfo) {
    const restaurantId = restaurantInfo?.id
    const product = item?.product

    if (!restaurantId || !product) return

    if (!currentRestaurantId.value) {
      currentRestaurantId.value = restaurantId
    }

    if (Number(currentRestaurantId.value) !== restaurantId) {
      const result = await Swal.fire({
        title: 'Limpar sacola?',
        text: 'Sua sacola está com itens de outro restaurante. Deseja esvaziá-la para adicionar novos itens?',
        showCancelButton: true,
        confirmButtonText: 'Sim, esvaziar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#E53935',
        cancelButtonColor: '#ccc',
        customClass: {
          popup: 'my-alert',
          confirmButton: 'my-confirm-button',
          cancelButton: 'my-cancel-button'
        }
      })

      if (!result.isConfirmed) return

      cartItems.value = []
    }

    currentRestaurantId.value = restaurantId
    currentRestaurantInfo.value = restaurantInfo

    const quantity = Math.max(item.quantity || 1, 1)
    const cartMap = new Map(cartItems.value.map(p => [p.id, p]))

    const existing = cartMap.get(product.id)

    if (existing) {
      existing.quantity += quantity
      cartMap.set(product.id, { ...existing })
    } else {
      cartMap.set(product.id, { ...product, quantity })
    }

    cartItems.value = Array.from(cartMap.values())
  }

  function updateQuantity(id, quantity) {
    const safeQty = Math.max(quantity, 1)
    cartItems.value = cartItems.value.map(item =>
      item.id === id ? { ...item, quantity: safeQty } : item
    )
  }

  function removeItem(id) {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  }

  function clearCart() {
    cartItems.value = []
    currentRestaurantId.value = null
    currentRestaurantInfo.value = null
  }

  return {
    cartItems,
    totalItems,
    subtotal,
    currentRestaurantId,
    currentRestaurantInfo,
    addCart,
    updateQuantity,
    removeItem,
    clearCart,
  }
})
