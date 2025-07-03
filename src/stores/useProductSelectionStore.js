import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductSelectionStore = defineStore('productSelection', () => {
  const quantity = ref(1)
  const comment = ref('')
  const selectedModifiers = ref([])
  const basePrice = ref(0)

  const resetSelectedModifiersForProduct = (modifierGroups) => {
    if (!modifierGroups || modifierGroups.length === 0) {
      selectedModifiers.value = []
    } else {
      selectedModifiers.value = modifierGroups.map(group => ({
        id: group.id,
        min: group.min ?? 0,
        max: group.max ?? null,
        selected: []
      }))
    }
  }

  const updateModifierSelection = (modifierId, selectedItems, min = 0, max = null) => {
    let normalizedSelected

    if (Array.isArray(selectedItems) || (selectedItems && selectedItems.quantities)) {
      normalizedSelected = selectedItems
    } else if (selectedItems !== null && selectedItems !== undefined) {
      normalizedSelected = [{ id: selectedItems }]
    } else {
      normalizedSelected = []
    }

    const index = selectedModifiers.value.findIndex(m => m.id === modifierId)

    if (index !== -1) {
      const existing = selectedModifiers.value[index]
      selectedModifiers.value.splice(index, 1, {
        ...existing,
        selected: normalizedSelected,
        min,
        max
      })
    } else {
      selectedModifiers.value.push({
        id: modifierId,
        min,
        max,
        selected: normalizedSelected
      })
    }
  }

  const plainSelectedModifiers = computed(() =>
    selectedModifiers.value.map(mod => ({
      id: mod.id,
      min: mod.min,
      max: mod.max,
      selected: mod.selected
    }))
  )

  const modifiersValid = computed(() => {
    return selectedModifiers.value.every(mod => {
      const selected = mod.selected
      const min = mod.min ?? 0
      const max = mod.max ?? Infinity

      let count = 0

      if (Array.isArray(selected)) {
        count = selected.length
      } else if (selected && typeof selected === 'object' && selected.quantities) {
        count = Object.values(selected.quantities).reduce((sum, entry) => sum + (entry?.quantity || 0), 0)
      }

      return count >= min && count <= max
    })
  })


  function incrementQuantity(groupId, item, min, max) {
    const group = selectedModifiers.value.find(g => g.id === groupId)
    if (!group) return

    const quantities = group.selected?.quantities ? { ...group.selected.quantities } : {}

    const total = Object.values(quantities).reduce((a, b) => a + (b.quantity || 0), 0)
    if (max && total >= max) return

    const prevQty = quantities[item.id]?.quantity || 0

    quantities[item.id] = {
      item,
      quantity: prevQty + 1
    }

    updateModifierSelection(groupId, { quantities }, min, max)
  }


function decrementQuantity(groupId, itemId, min, max) {
  const group = selectedModifiers.value.find(g => g.id === groupId)
  if (!group) return

  const quantities = group.selected?.quantities ? { ...group.selected.quantities } : {}
  const current = quantities[itemId]

  if (!current || current.quantity <= 0) return

  const newQty = current.quantity - 1

  if (newQty === 0) {
    delete quantities[itemId]
  } else {
    quantities[itemId] = {
      ...current,
      quantity: newQty
    }
  }

  updateModifierSelection(groupId, { quantities }, min, max)
}


  const reset = () => {
    quantity.value = 1
    comment.value = ''
    selectedModifiers.value = []
    basePrice.value = 0
  }

  return {
    quantity,
    comment,
    resetSelectedModifiersForProduct,
    selectedModifiers,
    plainSelectedModifiers,
    modifiersValid,
    incrementQuantity,
    decrementQuantity,

    reset,
    updateModifierSelection
  }
})
