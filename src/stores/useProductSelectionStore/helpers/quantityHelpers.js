export function findModifierGroupById(modifiers, groupId) {
  return modifiers.find(g => g.id === groupId)
}

export function extractQuantitiesFromGroup(group) {
  return group.selected?.quantities ? { ...group.selected.quantities } : {}
}

export function updateQuantity({ updateSelection, groupId, quantities, min, max }) {
  updateSelection({
    modifierId: groupId,
    selectedItems: { quantities },
    min,
    max
  })
}
