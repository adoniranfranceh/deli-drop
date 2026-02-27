<template>
  <div>
    <CategoryNav v-if="categories" :categories="categories" />

    <div
      v-for="(category, index) in categories"
      :key="category.id"
      :id="`category-${category.id}`"
    >
      <h2 class="scroll-mt-[210px]">{{ category.name }}</h2>

      <FeaturedProducts
        v-if="category.name.toLowerCase() === 'destaques'"
        :products="category.products"
        :showInRestaurant="true"
        class="[&_.product-stamp]:bg-[var(--color-restaurant)] [&_.add-btn]:bg-[var(--color-restaurant)] [&_.product-card:hover_h3]:text-[var(--color-restaurant)]"
      />

      <div
        v-else
        :class="isLastGrid(index) ? 'h-[calc(100vh-329px)] max-[768px]:h-[calc(100vh-150px)] overflow-y-auto' : ''"
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
