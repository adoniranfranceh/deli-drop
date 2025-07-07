import {
  isMaxReached,
  getNextQuantity,
  shouldDecrement
} from './quantityRules'

import {
  findModifierGroupById,
  extractQuantitiesFromGroup
} from './quantityHelpers'

function handleIncrement({ selectedModifiers, updateSelection }) {
  return (groupId, item, options = {}) => {
    const { min, max } = options
    const group = findModifierGroupById(selectedModifiers.value, groupId)
    if (!group) return

    const quantities = extractQuantitiesFromGroup(group)
    if (isMaxReached(quantities, max)) return

    quantities[item.id] = {
      item,
      quantity: getNextQuantity(quantities[item.id])
    }

    updateSelection({ modifierId: groupId, selectedItems: { quantities }, min, max })
  }
}

function handleDecrement({ selectedModifiers, updateSelection }) {
  return (groupId, item, options = {}) => {
    const { min, max } = options
    const group = findModifierGroupById(selectedModifiers.value, groupId)
    if (!group) return

    const quantities = extractQuantitiesFromGroup(group)
    const current = quantities[item.id]

    if (!shouldDecrement(current)) return

    const newQty = current.quantity - 1

    if (newQty === 0) {
      delete quantities[item.id]
    } else {
      quantities[item.id] = { ...current, quantity: newQty }
    }

    updateSelection({ modifierId: groupId, selectedItems: { quantities }, min, max })
  }
}

export function createQuantityHandlers(deps) {
  return {
    incrementQuantity: handleIncrement(deps),
    decrementQuantity: handleDecrement(deps)
  }
}
