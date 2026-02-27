<template>
  <div>
    <h3 class="my-8 text-gray-600">
      <Icon icon="ri:restaurant-line" class="text-primary" /> RESTAURANTES
    </h3>

    <div class="grid gap-8 grid-cols-1 min-[900px]:grid-cols-2 min-[1450px]:grid-cols-3">
      <RestaurantListSkeleton v-if="shouldShowSkeleton" v-for="n in 3" :key="'skeleton-'+n" />

      <RestaurantList
        v-if="shouldShowList"
        v-for="restaurant in restaurantsFetch.items.value"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>

    <AppButton
      v-if="showRestaurantButton"
      text="Mostrar mais"
      @click="$emit('showMoreRestaurants')"
      class="mt-4"
    />

    <p
      v-if="shouldShowAllLoaded"
      class="text-center my-8 text-muted"
    >
      Todos os restaurantes foram carregados
    </p>

    <div
      v-if="shouldShowEmptyState"
      class="flex gap-4 [&>p]:m-0"
    >
      <Icon icon="mdi:store-off-outline" />
      <p>Nenhum restaurante encontrado.</p>
    </div>

    <LoadingMoreIndicator
      v-if="shouldShowLoadingMore"
      text="Carregando mais restaurantes..."
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import RestaurantList from '@/components/restaurant/RestaurantList.vue'
import RestaurantListSkeleton from '@/components/restaurant/RestaurantListSkeleton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import LoadingMoreIndicator from '@/components/ui/LoadingMoreIndicator.vue'

const showRestaurantButton = computed(() => {
  return props.selectedCategory.value !== 'Restaurantes' &&
         props.restaurantsFetch.items.value.length >= 3 &&
         !props.restaurantsFetch.allLoaded.value
})

const props = defineProps({
  restaurantsFetch: {
    type: Object,
    required: true
  },
  selectedCategory: {
    type: String,
    required: true
  }
})

const { loading, items, allLoaded } = props.restaurantsFetch

const shouldShowSkeleton = computed(() =>
  loading.value && items.value.length === 0
)

const shouldShowList = computed(() =>
  items.value.length > 0
)

const shouldShowLoadingMore = computed(() =>
  loading.value && items.value.length > 0
)

const shouldShowEmptyState = computed(() =>
  !loading.value && items.value.length === 0
)

const shouldShowAllLoaded = computed(() =>
  allLoaded.value && items.value.length > 0
)
</script>
