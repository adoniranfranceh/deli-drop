function extractSelected(mod) {
  if (Array.isArray(mod.selected)) {
    return mod.selected.slice()
  }

  if (mod.selected && typeof mod.selected === 'object') {
    return Object.values(mod.selected)
  }

  return []
}

function normalizeModifiers(mods) {
  return (mods || [])
    .map(mod => {
      const selectedArray = extractSelected(mod)

      if (selectedArray.length > 0 && selectedArray[0].id !== undefined) {
        selectedArray.sort((a, b) => a.id - b.id)
      }

      return {
        id: mod.id,
        selected: selectedArray
      }
    })
    .sort((a, b) => a.id - b.id)
}

export function generateCartItemId(product, selectedModifiers) {
  const normalized = normalizeModifiers(selectedModifiers)
  return `${product.id}--${btoa(JSON.stringify(normalized))}`
}

export function safeQuantity(quantity) {
  return Math.max(quantity, 1)
}
