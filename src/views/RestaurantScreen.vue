<template>
  <div class="font-sans" v-if="restaurant">
    <div
      class="h-[350px] bg-cover bg-center bg-no-repeat relative"
      :style="{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
      }"
    >
      <div class="absolute inset-0 bg-[color-mix(in_srgb,var(--color-restaurant-hover)_70%,transparent)]"></div>
    </div>
    <div class="p-8 flex flex-col mb-16 max-[758px]:p-0">
      <header class="flex flex-col items-center justify-center">
        <div class="relative -mt-[350px] text-center z-[2] py-20">
          <img :src="restaurant.logo" :alt="restaurant.name" class="w-[120px] h-[120px] rounded-full object-cover border-4 border-white bg-white" />
        </div>
        <h1 class="text-4xl mx-5 leading-10 font-bold mt-20 flex items-center text-[var(--color-restaurant)]">{{ restaurant.name }}</h1>
        <p class="font-normal leading-7 max-w-[672px] mx-10 my-5">
          {{ restaurant.description }}
        </p>
        <div class="flex [&>span]:flex [&>span]:items-center [&>span]:px-5 [&>span]:py-1.5 [&>span]:mb-2.5 max-[758px]:mb-2.5">
          <RatingProduct :rating="restaurant.rating" />
          <DeliveryDuration :duration="restaurant.duration" v-if="restaurant.duration"/>
          <LocationRestaurant location="Entrega disponível" />
        </div>
      </header>

      <hr />
      <div class="px-12 max-[758px]:px-4">
        <RestaurantMenu :categories="restaurant.categories"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRestaurantData } from '@/composables/useRestaurantData'
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue'
import RatingProduct from '@/components/ui/RatingProduct.vue'
import LocationRestaurant from '@/components/ui/LocationRestaurant.vue'
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

