<template>
  <div class="grid gap-8 my-8 min-[1250px]:my-12 mx-auto px-4 grid-cols-1 min-[758px]:grid-cols-2 min-[1250px]:grid-cols-3">
    <CardProduct
      v-for="product in products"
      :key="product.id"
      :product="product"
      :showCategory="showCategory"
      @selected-product="openModal"
    />

    <ProductModalManager ref="modalManager" :products="products" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CardProduct from '@/components/product/CardProduct.vue';
import ProductModalManager from '@/components/product/ProductModalManager.vue';

defineProps({
  products: { type: Array, required: true },
  showCategory: Boolean
});

const modalManager = ref(null);
const openModal = (product) => modalManager.value?.openModal(product);
</script>
