export function countSelected(mod) {
  const selected = mod.selected
  if (Array.isArray(selected)) return selected.length
  if (selected?.quantities) {
    return Object.values(selected.quantities).reduce(
      (sum, entry) => sum + (entry?.quantity || 0), 0
    )
  }
  return 0
}

export function normalizeSelectedItems(selectedItems) {
  if (Array.isArray(selectedItems)) return selectedItems
  if (selectedItems?.quantities) return selectedItems
  if (selectedItems != null) return [{ id: selectedItems }]
  return []
}
