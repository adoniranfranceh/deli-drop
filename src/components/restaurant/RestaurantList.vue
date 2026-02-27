<template>
  <router-link :to="`/restaurante/${restaurant.id}`">
    <div
      class="flex bg-white border border-border-light rounded-xl overflow-hidden p-3 gap-3 cursor-pointer shadow-md transition-shadow duration-200 h-[115px] max-[758px]:h-[125px] hover:shadow-lg"
      @click="$emit('selected-restaurant', restaurant)"
    >
      <img :src="restaurant.logo" :alt="restaurant.name" class="w-20 h-20 object-cover rounded-lg" />

      <div class="flex-1">
        <h4 class="text-lg m-0 font-semibold">{{ restaurant.name }}</h4>
        <p class="text-sm text-muted">{{ restaurant.description }}</p>

        <div class="flex items-center gap-3 text-sm mt-1 text-text-subtle">
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
