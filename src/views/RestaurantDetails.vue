<template>
  <div 
    class="restaurant-page"
    v-if="restaurant"
  >
    <div
      class="background-cover"
      :style="{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
      }"
    >
      <div class="overlay"></div>
    </div>
    <div class="restaurant-container">
      <header class="restaurant-header">
        <img :src="restaurant.logo" :alt="restaurant.name" />
        <h1>{{ restaurant.name }}</h1>
      </header>
  
      <section class="menu-product">
        <CardProduct
          v-for="product in restaurant.menu"
          :key="product.id"
          :product="product"
          :bgColor="bgColor"
          @selected-product="openModal"
          @add-to-cart="addToCart($event)"
        />
        <ProductModalManager
          ref="modalMananger"
          @add-to-cart="addToCart"
          :products="restaurant.menu"/>
      </section>
    </div>

    <footer class="cart-bar" v-if="cart.length">
      <img :src="restaurant.logo" alt="" class="logo-cart" />
      <p>{{ cart.length }} {{ cart.length > 1 ? 'Drops' : 'Drop' }} na sua sacola</p>
      <button @click="goToCart">Ver sacola</button>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useRestaurantData } from '@/composables/useRestaurantData'
import CardProduct from '../components/CardProduct.vue'
import ProductModalManager from '../components/ProductModalManager.vue'

const modalMananger = ref(null)

function openModal(product) {
  modalMananger.value?.openModal(product)
}

const route = useRoute()
const router = useRouter()

const { restaurant, bgColor, backgroundImage, loadRestaurantData } = useRestaurantData(router)

const cart = ref([])

function addToCart(item) {
  cart.value.push(...Array(item.quantity).fill(item.product))
  console.log('cart', cart)
}

function goToCart() {
  router.push('/sacola')
}

onMounted(() => {
  loadRestaurantData(Number(route.params.id))
})

watch(() => route.params.id, (newId) => {
  loadRestaurantData(Number(newId))
})

onBeforeRouteLeave((to, from, next) => {
  if (cart.value.length > 0) {
    const confirmLeave = window.confirm('Você tem itens na sacola. Deseja descartá-los?')
    if (!confirmLeave) return next(false)
  }
  next()
})
</script>

<style>
.restaurant-page {
  font-family: 'Arial', sans-serif;
}

.restaurant-container {
  padding: 1rem;
}

.background-cover {
  height: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: color-mix(in srgb, var(--color-restaurant-hover) 50%, transparent);
}

.restaurant-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  text-align: center;
  z-index: 2;
  position: relative;
  margin-top: -75px;
}

.restaurant-header h1 {
  font-size: 1.8rem;
  color: var(--color-restaurant);
  word-break: break-word;
}

.restaurant-header img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  background-color: white;
}

.menu-product {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 600px) {
  .menu-product {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .menu-product {
    grid-template-columns: repeat(3, 1fr);
  }
}

button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1rem;
  width: fit-content;
}

button:hover {
  background-color: var(--color-link-hover);
}

.cart-bar {
  margin-top: 3rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-restaurant);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
}

.logo-cart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
