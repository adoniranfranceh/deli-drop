<template>
  <div class="restaurant-card" @click="$emit('selected-restaurant', restaurant)">
    <img :src="restaurant.logo" :alt="restaurant.name" class="logo" />

    <div class="info">
      <h4>{{ restaurant.name }}</h4>
      <p class="description">{{ restaurant.description }}</p>

      <div class="details">
        <Rating :rating="restaurant.rating" />
        <DeliveryDuration :duration="restaurant.delivery_duration" />
        <Location location="3 km" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Rating from '@/components/ui/Rating.vue'
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue'
import Location from '@/components/ui/Location.vue'
import Chip from '@/components/ui/Chip.vue' // opcional

defineProps({
  restaurant: Object
})
</script>

<style scoped>
.restaurant-card {
  display: flex;
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  padding: 0.75rem;
  gap: 0.75rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
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
</style>
