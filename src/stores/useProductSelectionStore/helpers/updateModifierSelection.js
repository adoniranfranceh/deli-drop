import { normalizeSelectedItems } from '../utils/modifiersUtils'

const ANY_FOUND = -1

export function updateModifierSelection(selectedModifiers, { modifierId, selectedItems, min = 0, max = null }) {
  const normalizedSelected = normalizeSelectedItems(selectedItems)
  const index = selectedModifiers.value.findIndex(m => m.id === modifierId)
  const newEntry = { id: modifierId, min, max, selected: normalizedSelected }
  if (index !== ANY_FOUND) {
    selectedModifiers.value[index] = { ...selectedModifiers.value[index], ...newEntry }
  } else {
    selectedModifiers.value.push(newEntry)
  }
}
