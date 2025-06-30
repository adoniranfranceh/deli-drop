import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'

function parseJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function persistLocalStorage(key, value) {
  const plain = JSON.parse(JSON.stringify(value))
  localStorage.setItem(key, JSON.stringify(plain))
}

export const useCartStore = defineStore('cart', () => {
  const initialCart = parseJSON('cart', [])
  const cartItems = ref(Array.isArray(initialCart) ? initialCart : [])
  const currentRestaurantId = ref(localStorage.getItem('restaurantId') || null)
  const currentRestaurantInfo = ref(parseJSON('restaurantInfo') || null)

  watch(cartItems, (newVal) => {
    persistLocalStorage('cart', newVal)

    if (newVal.length === 0 && currentRestaurantId.value !== null) {
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
    cartItems.value.reduce((sum, item) => sum + item.quantity * item.totalPrice, 0)
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
    const selectedModifiers = item.selectedModifiers || []
    const comment = item.comment || ''
    const cartItemId = generateCartItemId(product, selectedModifiers)
    const totalPrice = item.totalPrice
    const existing = cartItems.value.find(i => i.cartItemId === cartItemId)

    if (existing) {
      existing.quantity += quantity
    } else {
      cartItems.value.push({
        ...product,
        quantity,
        selectedModifiers,
        comment,
        cartItemId,
        totalPrice
      })
    }
  }

  function updateCartItem(cartItemId, quantity, selectedModifiers, totalPrice, comment) {
    const index = cartItems.value.findIndex(i => i.cartItemId === cartItemId)
    if (index === -1) return

    const product = cartItems.value[index]
    const newCartItemId = generateCartItemId(product, selectedModifiers)

    const existingIndex = cartItems.value.findIndex(
      (item, i) => item.cartItemId === newCartItemId && i !== index
    )

    if (existingIndex !== -1) {
      cartItems.value[existingIndex].quantity += quantity
      cartItems.value.splice(index, 1)
    } else {
      cartItems.value.splice(index, 1, {
        ...product,
        quantity,
        totalPrice,
        comment,
        selectedModifiers,
        cartItemId: newCartItemId
      })
    }
  }

  function normalizeModifiers(mods) {
    return (mods || [])
      .map(mod => ({
        id: mod.id,
        selected: [...(mod.selected || [])].sort((a, b) => a.id - b.id)
      }))
      .sort((a, b) => a.id - b.id)
  }

  const generateCartItemId = (product, selectedModifiers) => {
    const normalized = normalizeModifiers(selectedModifiers)
    return `${product.id}--${btoa(JSON.stringify(normalized))}`
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
    updateCartItem,
    updateQuantity,
    removeItem,
    clearCart,
  }
})
