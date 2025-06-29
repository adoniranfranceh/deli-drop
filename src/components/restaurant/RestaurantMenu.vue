<template>
  <div>
    <CategoryNav v-if="categories" :categories="categories" />
  
    <div
      v-for="category in categories"
        :key="category.id"
        :id="`category-${category.id}`"
      >
        <h2>{{ category.name }}</h2>
        <FeaturedProducts
          v-if="category.name.toLowerCase() === 'destaques'"
          :products="category.products"
          :showInRestaurant="true"
        />
  
        <ProductGrid
          v-else
          :products="category.products"
        />
      </div>
    </div>
</template>

<script setup>
import CategoryNav from '@/components/ui/CategoryNav.vue';
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue';
import ProductGrid from '@/components/product/ProductGrid.vue';

defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>
