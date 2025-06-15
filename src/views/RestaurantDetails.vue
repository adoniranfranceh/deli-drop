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
        <div class="header-image">
          <img :src="restaurant.logo" :alt="restaurant.name" />
        </div>
        <h1>{{ restaurant.name }}</h1>
        <p>
          {{ restaurant.description }}
        </p>
        <div class="restaurant-rating">
          <Rating :rating="restaurant.rating" />
          <DeliveryDuration :duration="restaurant.delivery_duration"/>
          <span>
            <Icon icon="system-uicons:location" style="width: 20px; height: 20px;" />
            Entrega disponível
          </span>
        </div>
      </header>
  
      <div class="products">
        <FeaturedProducts
          :products="restaurant.menu"
          @add-to-cart="addToCart"
          :showInRestaurant="true"
          :bgColor="bgColorSetted"
        />
      </div>
    </div>

    <footer class="cart-bar" v-if="cart.length">
      <img :src="restaurant.logo" alt="" class="logo-cart" />
      <p>{{ cart.length }} {{ cart.length > 1 ? 'Drops' : 'Drop' }} na sua sacola</p>
      <button @click="goToCart" aria-label="Ver sacola com itens adicionados">Ver sacola</button>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, watchEffect, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useRestaurantData } from '@/composables/useRestaurantData'
import FeaturedProducts from '../components/FeaturedProducts.vue'
import { Icon } from '@iconify/vue'
import DeliveryDuration from '../components/ui/DeliveryDuration.vue'
import Rating from '../components/ui/Rating.vue'

const route = useRoute()
const router = useRouter()

const { restaurant, bgColor, backgroundImage, loadRestaurantData } = useRestaurantData(router)
const bgColorSetted = bgColor

const cart = ref([])

function addToCart(item) {
  cart.value.push(...Array(item.quantity).fill(item.product))
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

function goToCart() {
  router.push('/sacola')
}

onMounted(() => {
  const storedCart = localStorage.getItem('cart')
  if (storedCart) cart.value = JSON.parse(storedCart)
  loadRestaurantData(Number(route.params.id))
})

watchEffect(() => {
  const id = Number(route.params.id)
  if (id) loadRestaurantData(id)
})

onBeforeRouteLeave((to, from, next) => {
  document.documentElement.style.setProperty('--color-primary', '#E53935')
  document.documentElement.style.setProperty('--color-primary-hover', '#c62828')
  next()
})
</script>

<style>
.restaurant-page {
  font-family: 'Inter', sans-serif;
}

.restaurant-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-cover {
  height: 350px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: color-mix(in srgb, var(--color-primary-hover) 70%, transparent);
}

.restaurant-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 36px;
    margin: 0 20px;
    line-height: 40px;
    font-weight: 700;
    margin-top: 5rem;
    display: flex;
    align-items: center;
    color: var(--color-primary);
  }

  p {
    font-weight: 400;
    line-height: 28px;
    max-width: 672px;
    margin: 20px 38px ;
  }
}

.restaurant-rating {
  display: flex;

  span {
    display: flex;
    align-items: center;
    padding: 5px 20px;
    margin-bottom: 10px;
  }
}

.products {
  padding: 1.5rem;
  background: rgb(249, 250, 251);
}

@media (max-width: 1000px) {
  .restaurant-rating {
    margin-bottom: 10px;
  }

  .products {
    padding: 1rem;
  }

  .cart-bar {
    width: 90%;
  }
}

.header-image {
  position: relative;
  margin-top: -350px;
  text-align: center;
  z-index: 2;
  padding: 5rem 0;
}

.header-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  background-color: white;
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
  position: fixed;
  bottom: 10px;
  left: 1;
  right: 10px;
  background-color: var(--color-primary);
  color: white;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-lg);
  z-index: 100;
  border-radius: 1rem;
  max-width: 400px;

  img {
    margin: 0 15px;
  }
}

.logo-cart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
