<template>
  <div>
    <CartModal
      v-if="showCartModal"
      :cartItems="cart"
      @close="closeCartModal"
      @edit-product="openEditProduct"
    />

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct.product"
      :selectedModifiers="selectedProduct.selectedModifiers"
      :cartItemId="selectedProduct.cartItemId"
      @add-to-cart="handleEditedItem"
      @close="closeProductModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartModal from '@/components/cart/CartModal.vue'
import ProductModal from '../product/ProductModal.vue'
import { useRestaurantStore } from '@/stores/useRestaurantStore'
import { useCartStore } from '@/stores/cartStore'
import { useProductSelectionStore } from '../../stores/useProductSelectionStore'

const productSelectionStore = useProductSelectionStore()

const restaurantStore = useRestaurantStore()
const route = useRoute()
const router = useRouter()

const showCartModal = ref(false)
const cartStore = useCartStore()
const selectedProduct = ref(null)

function openModal() {
  showCartModal.value = true
  router.replace({ query: { ...route.query, cart: 'open' } })
}

function closeProductModal() {
  selectedProduct.value = null
  openModal()
}

function closeCartModal() {
  showCartModal.value = false
  const newQuery = { ...route.query }
  delete newQuery.cart
  router.replace({ query: newQuery })
}

function openEditProduct(payload) {
  const normalizedSelectedModifiers = payload.selectedModifiers.map(mod => {
    if (
      mod.input_type === 'quantity' || 
      (mod.selected && mod.selected.quantities)
    ) {
      return {
        ...mod,
        selected: mod.selected.quantities ? mod.selected : { quantities: {} }
      }
    }
    return mod
  })

  productSelectionStore.selectedModifiers = normalizedSelectedModifiers

  selectedProduct.value = {
    product: payload.product,
    quantity: payload.quantity,
    selectedModifiers: payload.selectedModifiers,
    cartItemId: payload.cartItemId
  }
  closeCartModal()
}

function handleEditedItem(item) {
  cartStore.updateCartItem(item.cartItemId, item.quantity, item.selectedModifiers, item.totalPrice, item.comment)
  selectedProduct.value = null
  showCartModal.value = true
}

defineExpose({ openModal })

onMounted(() => {
  if (route.query.cart === 'open') {
    showCartModal.value = true
  }
})

watch(
  () => route.query.cart,
  (value) => {
    if (value === 'open') {
      showCartModal.value = true
    } else {
      showCartModal.value = false
    }
  }
)

watch(
  () => cartStore.cartItems,
  (newCartItems) => {
    localStorage.setItem('cart', JSON.stringify(newCartItems))
  },
  { deep: true }
)
</script>
