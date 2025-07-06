const DEFAULT_MIN_QUANTITY = 0
const DEFAULT_INCREMENT = 1

export function isMaxReached(quantities, max) {
  if (!max) return false
  const total = Object.values(quantities).reduce(
    (sum, entry) => sum + (entry?.quantity || DEFAULT_MIN_QUANTITY),
    0
  )
  return total >= max
}

export function getNextQuantity(current) {
  return (current?.quantity || DEFAULT_MIN_QUANTITY) + DEFAULT_INCREMENT
}

export function shouldDecrement(current) {
  return current?.quantity > DEFAULT_MIN_QUANTITY
}
