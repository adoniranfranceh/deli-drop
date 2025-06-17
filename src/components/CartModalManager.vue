<template>
  <div>
    <CartModal
      v-if="showCartModal"
      :cartItems="cart"
      @close="showCartModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import CartModal from '@/components/CartModal.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const showCartModal = ref(false)

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

function openModal() {
  showCartModal.value = true
  router.push({ query: { showCart: true } });
}

function handleUpdateQuantity({ id, quantity }) {
  const index = cart.value.findIndex(item => item.id === id)
  if (index !== -1) {
    cart.value[index].quantity = quantity
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
}

defineExpose({ openModal })

onMounted(() => {
  const showCart = route.query.showCart;
  console.log(route.query)
  if (showCart) {
    showCartModal.value = true
  }
});

watch(showCartModal, (visible) => {
  console.log(route.query)
  if (visible) {
    router.replace({ query: { ...route.query, showCart: true } });
  } else {
    const newQuery = { ...route.query };
    delete newQuery.showCart;
    router.replace({ query: newQuery });
  }
});

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
}, { deep: true })

</script>