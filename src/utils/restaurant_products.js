export function extractAllProductsFromCategories(categories) {
  return categories.flatMap(category => category.products || [])
}
