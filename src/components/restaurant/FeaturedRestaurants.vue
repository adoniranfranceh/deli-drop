<template>
  <div class="flex overflow-x-auto scrollbar-none scroll-smooth gap-4 py-4 mb-8 max-[758px]:my-8">
    <div
      v-for="restaurant in restaurantsFetch.items.value"
      :key="restaurant.id"
      class="flex-none text-center"
    >
      <router-link :to="`/restaurante/${restaurant.id}`">
        <img :src="restaurant.logo" :alt="restaurant.name" class="border-2 border-primary w-[70px] h-[70px] rounded-full object-cover shadow-sm" />
        <span class="block mt-2 text-sm text-text whitespace-nowrap">{{ restaurant.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePaginatedFetch } from '../../composables/usePaginatedFetch';

onMounted(async () => {
  restaurantsFetch.load()
})

const restaurantsFetch = usePaginatedFetch('/restaurants')
</script>
