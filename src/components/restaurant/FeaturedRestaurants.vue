<template>
  <div class="restaurant-stories">
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="story"
    >
    <router-link :to="`/restaurante/${restaurant.id}`">
      <img :src="restaurant.logo" :alt="restaurant.name" />
      <span>{{ restaurant.name }}</span>
    </router-link>
    </div>
  </div>
</template>

<script setup>
import data_restaurants from '@/json/restaurants_without_menu.json';
const restaurants = data_restaurants;
</script>

<style scoped>
.restaurant-stories {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  gap: 1rem;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.story {
  flex: 0 0 auto;
  text-align: center;
}

.story img {
  border: 2px solid var(--primary-color);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.story span {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text);
  white-space: nowrap;
}
</style>
