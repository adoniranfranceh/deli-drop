import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTotalPriceStore = defineStore('totalPrice', () => {
  const basePrice = ref(0)
  const extraPrice = ref(0)
  const productQuantity = ref(1)

  const totalPrice = computed(() =>
    (basePrice.value + extraPrice.value) * productQuantity.value
  )

  function setBasePrice(price) {
    basePrice.value = price
  }

  function setQuantity(qty) {
    productQuantity.value = qty
  }

  function setExtraPrice(extra) {
    extraPrice.value = extra
  }

  function addExtraPrice(amount) {
    extraPrice.value += amount
  }

  function removeExtraPrice(amount) {
    extraPrice.value = Math.max(0, extraPrice.value - amount)
  }

  function reset() {
    basePrice.value = 0
    extraPrice.value = 0
    productQuantity.value = 1
  }

  function resetExtraPrice() {
    extraPrice.value = 0
  }

  function getDebugInfo() {
    return {
      basePrice: basePrice.value,
      extraPrice: extraPrice.value,
      quantity: productQuantity.value,
      totalPrice: totalPrice.value
    }
  }


  return {
    basePrice,
    extraPrice,
    productQuantity,
    setExtraPrice,
    totalPrice,
    setBasePrice,
    addExtraPrice,
    removeExtraPrice,
    setQuantity,
    resetExtraPrice,
    reset,
    getDebugInfo
  }
})
