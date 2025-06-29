import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductSelectionStore = defineStore('productSelection', () => {
  const quantity = ref(1)
  const comment = ref('')
  const selectedModifiers = ref([])
  const basePrice = ref(0)

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
      let count = 0

      if (Array.isArray(mod.selected)) {
        count = mod.selected.length
      } else if (mod.selected && typeof mod.selected === 'object' && mod.selected.quantities) {
        count = Object.values(mod.selected.quantities).reduce((sum, q) => sum + q, 0)
      }

      const min = mod.min ?? 0
      const max = mod.max ?? Infinity

      return count >= min && count <= max
    })
  })

  const reset = () => {
    quantity.value = 1
    comment.value = ''
    selectedModifiers.value = []
    basePrice.value = 0
  }

  return {
    quantity,
    comment,
    selectedModifiers,
    plainSelectedModifiers,
    modifiersValid,

    reset,
    updateModifierSelection
  }
})
