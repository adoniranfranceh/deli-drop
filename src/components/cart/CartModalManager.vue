<template>
  <div>
    <CartModal
      v-if="showCartModal"
      @close="closeCartModal"
      @edit-product="openEditProduct"
    />

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct.product"
      :selectedModifiers="selectedProduct.selectedModifiers"
      :cartItemId="selectedProduct.cartItemId"
      :restaurantColor="cartStore.currentRestaurantInfo.color"
      :finalTotalPrice="selectedProduct.finalTotalPrice"
      @add-to-cart="handleEditedItem"
      @close="closeProductModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartModal from '@/components/cart/CartModal.vue'
import ProductModal from '../product/ProductModal.vue'
import { useCartStore } from '@/stores/cartStore'
import { useProductSelectionStore } from '../../stores/productSelectionStore'

const productSelectionStore = useProductSelectionStore()
const route = useRoute()
const router = useRouter()

const showCartModal = ref(false)
const cartStore = useCartStore()
const selectedProduct = ref(null)

function openModal() {
  showCartModal.value = true
  router.replace({ query: { ...route.query, cart: 'open' } })
  pushStateOnce()
}

function onPopState() {
  if (selectedProduct.value) {
    closeProductModal(true)
  } else if (showCartModal.value) {
    closeCartModal(true)
  }
}

function pushStateOnce() {
  if (!window.history.state || window.history.state !== 'modal') {
    history.pushState('modal', '', window.location.href)
  }
}



function closeProductModal(fromPopState = false) {
  selectedProduct.value = null

  if (fromPopState) {
    showCartModal.value = true
  } else {
    openModal()
  }
}

function closeCartModal(fromPopState = false) {
  showCartModal.value = false

  if (!fromPopState) {
    const newQuery = { ...route.query }
    delete newQuery.cart
    router.replace({ query: newQuery })
  }
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
    cartItemId: payload.cartItemId,
    finalTotalPrice: payload.finalTotalPrice
  }

  pushStateOnce()
  closeCartModal()
}

function handleEditedItem(item) {
  cartStore.updateCartItem({
    cartItemId: item.cartItemId,
    quantity: item.quantity,
    selectedModifiers: item.selectedModifiers,
    totalPrice: item.totalPrice,
    comment: item.comment
  })

  selectedProduct.value = null
  showCartModal.value = true
}

defineExpose({ openModal })

onMounted(() => {
  if (route.query.cart === 'open') {
    showCartModal.value = true
  }

  window.addEventListener('popstate', onPopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', onPopState)
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
