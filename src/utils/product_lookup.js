export function createProductLookupMap(products) {
  const map = new Map()
  products.forEach(product => {
    map.set(product.id, product)
  })
  return map
}
