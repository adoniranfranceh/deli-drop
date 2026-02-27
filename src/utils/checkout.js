export function phoneMask(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function stripPhone(masked) {
  return masked.replace(/\D/g, '')
}

export function extractModifiers(selectedModifiers) {
  const result = []

  for (const group of selectedModifiers) {
    if (group.selected?.quantities) {
      for (const [, entry] of Object.entries(group.selected.quantities)) {
        if (entry.quantity > 0) {
          result.push({ modifier_id: entry.item.id, quantity: entry.quantity })
        }
      }
    } else if (Array.isArray(group.selected)) {
      for (const item of group.selected) {
        result.push({ modifier_id: item.id, quantity: 1 })
      }
    }
  }

  return result
}

export function buildOrderPayload(cartStore, formData) {
  const items = cartStore.cartItems.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    comment: item.comment || '',
    modifiers: extractModifiers(item.selectedModifiers || [])
  }))

  return {
    order: {
      restaurant_id: cartStore.currentRestaurantId,
      customer: {
        name: formData.name,
        phone: stripPhone(formData.phone)
      },
      delivery_address: formData.address,
      delivery_complement: formData.complement || '',
      delivery_neighborhood: formData.neighborhood,
      delivery_reference: formData.reference || '',
      delivery_fee: 500,
      payment_method: formData.paymentMethod,
      change_for: formData.paymentMethod === 'cash'
        ? Math.round(formData.changeFor * 100)
        : null,
      customer_note: formData.notes || '',
      items
    }
  }
}
