export function computePlainSelectedModifiers(selectedModifiers) {
  return selectedModifiers.value.map(mod => ({
    id: mod.id,
    min: mod.min,
    max: mod.max,
    selected: mod.selected
  }))
}
