<template>
  <div>
    <h3 class="section-title">
      <Icon icon="ri:restaurant-line" class="restaurant-icon" /> RESTAURANTES
    </h3>

    <div class="restaurant-list">
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
      class="show-more-btn"
    />

    <p
      v-if="shouldShowAllLoaded"
      class="end-list"
    >
      Todos os restaurantes foram carregados
    </p>

    <div
      v-if="shouldShowEmptyState"
      class="empty-state"
    >
      <Icon icon="mdi:store-off-outline" class="empty-icon" />
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

<style scoped>
.section-title {
  margin: 2rem 0 1rem;
  color: rgb(75, 85, 99);
}

.restaurant-icon {
  color: var(--color-primary);
}

.restaurant-list {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, 1fr);
  will-change: transform, opacity;
}

.show-more-btn {
  margin-top: 1rem;
  border: none;
  background-color: var(--color-primary);
}

.empty-state {
  display: flex;
  gap: 1rem;

  p { margin: 0; }
}

.end-list {
  text-align: center;
  margin: 2rem 0;
  color: var(--color-muted);
}

@media (min-width: 900px) {
  .restaurant-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1450px) {
  .restaurant-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
