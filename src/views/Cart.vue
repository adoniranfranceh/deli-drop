<template>
  <div class="cart-page">
    <h1>Sua Sacola</h1>

    <div v-if="cart?.length > 0">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="cart-item"
      >
        <img :src="item.image" alt="" />
        <div>
          <p class="product-name">{{ item.name }}</p>
          <p class="product-price">R$ {{ FloatToMoney(item.price) }}</p>
        </div>
      </div>

      <div class="total">
        <p>Total: R$ {{ total }}</p>
        <button @click="checkout">Finalizar Pedido</button>
      </div>
    </div>
    <div v-else>
      <p>Sua sacola está vazia.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FloatToMoney } from '../utils/money'

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price, 0).toFixed(2)
})

const router = useRouter()

function checkout() {
  alert('Pedido finalizado!')
  cart.value = []
  localStorage.removeItem('cart')
  router.push('/')
}
</script>

<style scoped>
.cart-page {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-name {
  font-weight: bold;
}

.total {
  margin-top: 2rem;
  font-size: 1.2rem;
}

button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: var(--color-link-hover);
}
</style>
