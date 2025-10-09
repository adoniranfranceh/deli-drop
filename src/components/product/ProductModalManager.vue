<template>
  <div>
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeModal"
      :restaurantColor="restaurantStore.restaurantInfo.color"
      @add-to-cart="addtoCart($event)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ProductModal from '@/components/product/ProductModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { useRestaurantStore } from '@/stores/useRestaurantStore';

const cartStore = useCartStore()
const restaurantStore = useRestaurantStore()

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

const selectedProduct = ref(null);
const route = useRoute();
const router = useRouter();

async function openModal(product) {
  const restaurantPath = `/restaurante/${product.restaurant_id}`;
  if (route.path !== restaurantPath) {
    await router.push({ path: restaurantPath });
  }

  router.push({ path: restaurantPath, query: { productId: product.id } });
  selectedProduct.value = product;
}

function closeModal() {
  selectedProduct.value = null;
  router.push({ query: {} });
}

defineExpose({ openModal })

defineEmits('add-to-cart')

function addtoCart(event) {
  if (!Array.isArray(event.selectedModifiers)) {
    event.selectedModifiers = [];
  }

  cartStore.addCart(event, restaurantStore.restaurantInfo);
  closeModal();
}

const productMap = new Map();
props.products.forEach(product => {
  productMap.set(product.id, product);
});

onMounted(() => {
  const idFromURL = route.query.productId;
  if (idFromURL) {
    const product = productMap.get(Number(idFromURL));
    if (product) selectedProduct.value = product;
  }
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
