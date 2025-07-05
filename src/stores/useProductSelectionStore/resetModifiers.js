export function resetSelectedModifiersForProduct(selectedModifiers, modifierGroups) {
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
