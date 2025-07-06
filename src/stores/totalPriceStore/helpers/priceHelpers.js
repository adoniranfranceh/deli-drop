export function addExtraPrice(extraPriceRef, amount) {
  extraPriceRef.value += amount
}

export function removeExtraPrice(extraPriceRef, amount) {
  extraPriceRef.value = Math.max(0, extraPriceRef.value - (amount || 0))
}

export function resetPrices(basePriceRef, extraPriceRef) {
  basePriceRef.value = 0
  extraPriceRef.value = 0
}
