import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { addExtraPrice, removeExtraPrice, resetPrices } from './helpers/priceHelpers'
import { setQuantity } from './helpers/quantityHelpers'

export const useTotalPriceStore = defineStore('totalPrice', () => {
  const basePrice = ref(0)
  const extraPrice = ref(0)
  const productQuantity = ref(1)

  const totalPrice = computed(() => basePrice.value + extraPrice.value)
  const totalPriceWithQty = computed(() => totalPrice.value * productQuantity.value)

  function setBasePrice(price) {
    basePrice.value = price
  }

  function setQuantityWrapper(qty) {
    setQuantity(productQuantity, qty)
  }

  function addExtraPriceWrapper(amount) {
    addExtraPrice(extraPrice, amount)
  }

  function removeExtraPriceWrapper(amount) {
    removeExtraPrice(extraPrice, amount)
  }

  function reset() {
    resetPrices(basePrice, extraPrice)
    productQuantity.value = 1
  }

  function resetExtraPrice() {
    extraPrice.value = 0
  }

  return {
    basePrice,
    extraPrice,
    productQuantity,
    setBasePrice,
    setQuantity: setQuantityWrapper,
    addExtraPrice: addExtraPriceWrapper,
    removeExtraPrice: removeExtraPriceWrapper,
    totalPrice,
    totalPriceWithQty,
    resetExtraPrice,
    reset
  }
})
