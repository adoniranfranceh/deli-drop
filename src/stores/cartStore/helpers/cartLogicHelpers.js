import { generateCartItemId, safeQuantity } from './cartItemsHelpers'

export function isValidItem(item, restaurantInfo) {
  return restaurantInfo?.id && item?.product
}

export function resetRestaurantInfoIfEmptyCart(cartItems, currentRestaurantId, currentRestaurantInfo) {
  if (cartItems.value.length === 0) {
    currentRestaurantId.value = null
    currentRestaurantInfo.value = null
  }
}

export function isFromDifferentRestaurant(currentRestaurantId, newId) {
  console.log(currentRestaurantId, newId.value)
  return newId.value && currentRestaurantId != newId.value
}

export function updateCurrentRestaurant(info, currentRestaurantId, currentRestaurantInfo) {
   if (!info?.id) return
  currentRestaurantId.value = info.id
  currentRestaurantInfo.value = info
}

export function prepareCartItemData(item) {
  const quantity = safeQuantity(item.quantity)
  const selectedModifiers = item.selectedModifiers || []
  const comment = item.comment || ''
  const totalPrice = item.totalPrice
  const cartItemId = generateCartItemId(item.product, selectedModifiers)

  return {
    product: item.product,
    quantity,
    selectedModifiers,
    comment,
    totalPrice,
    cartItemId
  }
}

export function handleUpdateCartItem({
  cartItems,
  cartItemId,
  quantity,
  selectedModifiers,
  totalPrice,
  comment
}) {
  const NOT_FOUND = -1
  const index = cartItems.value.findIndex(i => i.cartItemId === cartItemId)
  if (index === NOT_FOUND) return

  const product = cartItems.value[index]
  const newCartItemId = generateCartItemId(product, selectedModifiers)

  const existingIndex = cartItems.value.findIndex(
    (item, i) => item.cartItemId === newCartItemId && i !== index
  )

  if (existingIndex !== NOT_FOUND) {
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

export function pushOrIncrementCartItem(cartItems, { product, quantity, selectedModifiers, comment, totalPrice, cartItemId }) {
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
