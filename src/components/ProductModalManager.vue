<template>
  <div>
    <slot @open="openModal" />

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ProductModal from '@/components/ProductModal.vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

const selectedProduct = ref(null);
const route = useRoute();
const router = useRouter();

function openModal(product) {
  selectedProduct.value = product;
  router.push({ query: { productId: product.id } });
}

function closeModal() {
  selectedProduct.value = null;
  router.push({ query: {} });
}

defineExpose({ openModal })

const productMap = new Map();
props.products.forEach(product => {
  productMap.set(product.id, product);
});


onMounted(() => {
  const idFromURL = route.query.productId;
  console.log('Mounted with query productId:', idFromURL);
  if (idFromURL) {
    console.log('Mounted with product ID:', idFromURL);
    const product = productMap.get(Number(idFromURL));
    if (product) selectedProduct.value = product;
  }
  console.log('Mounted with selected product:', selectedProduct.value);
});

watch(() => route.query.productId, (newId) => {
  if (newId) {
    const product = productMap.get(Number(newId));
    if (product) selectedProduct.value = product;
  } else {
    selectedProduct.value = null;
  }
})
</script>