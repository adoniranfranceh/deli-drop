<template>
  <router-link :to="`/restaurante/${restaurant.id}`">
    <div class="restaurant-card" @click="$emit('selected-restaurant', restaurant)">
      <img :src="restaurant.logo" :alt="restaurant.name" class="logo" />

      <div class="info">
        <h4>{{ restaurant.name }}</h4>
        <p class="description">{{ restaurant.description }}</p>

        <div class="details">
          <RatingProduct :rating="restaurant.rating" />
          <DeliveryDuration :duration="restaurant.duration" v-if="restaurant.duration" />
          <LocationRestaurant location="3 km" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import RatingProduct from '@/components/ui/RatingProduct.vue'
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue'
import LocationRestaurant from '@/components/ui/LocationRestaurant.vue'

defineProps({
  restaurant: Object
})
</script>

<style scoped>
.restaurant-card {
  display: flex;
  background: var(--color-white);
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  padding: 0.75rem;
  gap: 0.75rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.2s;
  height: 115px;
}

.restaurant-card:hover {
  box-shadow: var(--shadow-lg);
}

.restaurant-card img.logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.restaurant-card .info {
  flex: 1;
}

.restaurant-card .info h4 {
  font-size: 1.1rem;
  margin: 0;
  font-weight: 600;
}

.restaurant-card .description {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.restaurant-card .details {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  color: #555;
}

@media (max-width: 758px) {
  .restaurant-card {
    height: 125px;
  }
}
</style>
