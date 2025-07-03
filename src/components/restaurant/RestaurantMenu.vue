<template>
  <div>
    <CategoryNav v-if="categories" :categories="categories" />
  
    <div
      v-for="(category, index) in categories"
      :key="category.id"
      :id="`category-${category.id}`"
    >
      <h2>{{ category.name }}</h2>

      <FeaturedProducts
        v-if="category.name.toLowerCase() === 'destaques'"
        :products="category.products"
        :showInRestaurant="true"
        class="featured-products"
      />

      <div
        v-else
        class="product-grid"
        :class="{ 'last-grid': isLastGrid(index) }"
      >
        <ProductGrid :products="category.products" />
      </div>
    </div>

    </div>
</template>

<script setup>
import CategoryNav from '@/components/ui/CategoryNav.vue';
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue';
import ProductGrid from '@/components/product/ProductGrid.vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const isLastGrid = (index) => {
  const nonFeaturedIndexes = props.categories
    .map((c, i) => ({ ...c, index: i }))
    .filter(c => c.name.toLowerCase() !== 'destaques')

  const lastIndex = nonFeaturedIndexes.at(-1)?.index
  return index === lastIndex
}
</script>

<style scoped >
h2 {
  scroll-margin-top: 210px;
}

.featured-products :deep(.product-stamp) {
  background-color: var(--color-restaurant);
}

.featured-products :deep(.add-btn) {
  background-color: var(--color-restaurant);
}

.featured-products :deep(.product-card:hover h3) {
  color: var(--color-restaurant);
}

.last-grid {
  height: calc(100vh - 329px);
  overflow-y: auto;
}
</style>
