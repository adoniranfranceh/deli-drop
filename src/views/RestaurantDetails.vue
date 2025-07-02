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
          <DeliveryDuration :duration="restaurant.duration" v-if="restaurant.duration"/>
          <Location location="Entrega disponível" />
        </div>
      </header>

      <hr />
      <div class="menu">
        <RestaurantMenu :categories="restaurant.categories"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRestaurantData } from '@/composables/useRestaurantData'
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue'
import Rating from '@/components/ui/Rating.vue'
import Location from '@/components/ui/Location.vue'
import RestaurantMenu from '@/components/restaurant/RestaurantMenu.vue'

const route = useRoute()
const router = useRouter()

const { restaurant, backgroundImage, loadRestaurantData } = useRestaurantData(router)


onMounted(() => {
  const id = Number(route.params.id)
  loadRestaurantData(id)
})

watch(
  () => route.params.id,
  (newId, oldId) => {
    const id = Number(newId)
    if (id && id !== Number(oldId)) {
      loadRestaurantData(id)
    }
  }
)
</script>

<style>
html {
  scroll-behavior: smooth;
}

.restaurant-page {
  font-family: 'Inter', sans-serif;
}

.restaurant-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
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
  background-color: color-mix(in srgb, var(--color-restaurant-hover) 70%, transparent);
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
    color: var(--color-restaurant);
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
  /* background-color: var(--color-restaurant); */
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
  color: var(--color-restaurant);
}

.menu {
  padding: 0 3rem;
}

@media (max-width: 758px) {
  .restaurant-rating {
    margin-bottom: 10px;
  }

  .products {
    padding: 1rem;
  }

  .cart-bar {
    width: 90%;
  }
  
  .menu {
    padding: 1rem;
  }

  .restaurant-container {
    padding: 0;
  }
}
</style>
