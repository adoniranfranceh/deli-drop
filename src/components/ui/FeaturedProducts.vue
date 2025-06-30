<template>
  <div class="products-container">
    <CardProduct
      v-for="product in products"
      :key="product.id"
      :product="product"
      :showInRestaurant="showInRestaurant"
      :bgColor="bgColor"
      @selected-product="openModal"
      @open-modal="openModal"
    />

    <ProductModalManager
      ref="modalManager"
      :products="products"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import CardProduct from '@/components/product/CardProduct.vue'
import ProductModalManager from '@/components/product/ProductModalManager.vue'

defineProps({
  products: {
    type: Array,
    required: true
  },
  showInRestaurant: Boolean,
  bgColor: String
})

const modalManager = ref(null)

const openModal = (product) => {
  modalManager.value?.openModal(product)
}
</script>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin: 2rem auto;
  padding: 0 1rem;
}

@media (min-width: 600px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
    margin: 3rem auto;
  }
}
</style>
