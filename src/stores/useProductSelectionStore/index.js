import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { countSelected } from './modifiersUtils'
import { createQuantityHandlers } from './quantityHandlersFactory'
import { updateModifierSelection } from './updateModifierSelection'
import { resetSelectedModifiersForProduct } from './resetModifiers'
import { computePlainSelectedModifiers } from './computePlainSelectedModifiers'

function resetState(state) {
  state.quantity.value = 1
  state.comment.value = ''
  state.selectedModifiers.value = []
  state.basePrice.value = 0
}

export const useProductSelectionStore = defineStore('productSelection', () => {
  const quantity = ref(1)
  const comment = ref('')
  const selectedModifiers = ref([])
  const basePrice = ref(0)

  function updateSelection(payload) {
    updateModifierSelection(selectedModifiers, payload)
  }

  const { incrementQuantity, decrementQuantity } = createQuantityHandlers({
    selectedModifiers,
    updateSelection
  })

  const modifiersValid = computed(() =>
    selectedModifiers.value.every(mod => {
      const count = countSelected(mod)
      const min = mod.min ?? 0
      const max = mod.max ?? Infinity
      return count >= min && count <= max
    })
  )

  const plainSelectedModifiers = computed(() => computePlainSelectedModifiers(selectedModifiers))

  function reset() {
    resetState({ quantity, comment, selectedModifiers, basePrice })
  }

  return {
    quantity,
    comment,
    basePrice,
    selectedModifiers,
    plainSelectedModifiers,
    modifiersValid,
    resetSelectedModifiersForProduct,
    updateSelection,
    incrementQuantity,
    decrementQuantity,
    reset
  }
})
