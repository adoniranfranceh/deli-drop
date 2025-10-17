<template>
  <div class="search-content">
    <SearchInput v-model="query" placeholder="Buscar por restaurantes, pratos, ingredientes..." /> 

    <CategoryFilter
      :categories="categories"
      v-model:selected="selectedCategory"
    />

    <PopularSearches :terms="popularTerms" @update:query="term => query = term" />

    <div v-if="selectedCategory !== 'Comidas'">
      <h3 class="section-title">
        <Icon icon="ri:restaurant-line" class="restaurant-icon" /> RESTAURANTES
      </h3>

      <div class="restaurant-list">
        <RestaurantListSkeleton v-if="restaurantsFetch.loading.value && restaurantsFetch.items.value.length === 0" v-for="n in 3" :key="'skeleton-'+n" />

        <RestaurantList
          v-for="restaurant in restaurantsFetch.items.value"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>

      <AppButton
        v-if="showRestaurantButton"
        text="Mostrar mais"
        @click="showMoreRestaurants"
        class="show-more-btn"
      />

      <p
        v-if="restaurantsFetch.allLoaded.value && selectedCategory === 'Restaurantes' && restaurantsFetch.items.value.length > 0"
        class="end-list"
      >
        Todos os restaurantes foram carregados
      </p>

      <div
        v-if="!restaurantsFetch.loading.value && restaurantsFetch.items.value.length === 0"
        class="empty-state">
        <Icon icon="mdi:store-off-outline" class="empty-icon" />
        <p>Nenhum restaurante encontrado.</p>
      </div>
      <LoadingMoreIndicator
        v-if="restaurantsFetch.loading.value && restaurantsFetch.items.value.length > 0"
        text="Carregando mais restaurantes..."
      />
    </div>

    <div v-if="selectedCategory !== 'Restaurantes'">
        <h3 class="section-title">
          <Icon icon="tabler:meat" class="restaurant-icon" /> COMIDAS
        </h3>

        <div class="products-section">
          <FeaturedProductsSkeleton
            v-if="productsFetch.loading.value && productsFetch.items.value.length === 0"
            :count="6"
          />

          <FeaturedProducts
            class="featured-products"
            :products="productsFetch.items.value"
            :showCategory="true"
            v-if="productsFetch.items.value.length > 0"
          />

          <LoadingMoreIndicator
            v-if="productsFetch.loading.value && productsFetch.items.value.length > 0"
          />
        </div>

        <div v-if="!productsFetch.loading.value && productsFetch.items.value.length === 0" class="empty-state">
          <Icon icon="mdi:food-off-outline" class="empty-icon" />
          <p>Nenhum produto encontrado.</p>
        </div>

        <p
          v-if="productsFetch.allLoaded.value && productsFetch.items.value.length > 0"
          class="end-list"
        >
          Todos os produtos foram carregados
        </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useDebounce } from '@vueuse/core'
import { usePaginatedFetch } from '@/composables/usePaginatedFetch'
import SearchInput from '@/components/ui/SearchInput.vue'
import CategoryFilter from '@/components/ui/CategoryFilter.vue'
import PopularSearches from '@/components/ui/PopularSearches.vue'
import RestaurantList from '@/components/restaurant/RestaurantList.vue'
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue'
import { Icon } from '@iconify/vue'
import RestaurantListSkeleton from '../components/restaurant/RestaurantListSkeleton.vue'
import FeaturedProductsSkeleton from '../components/product/FeaturedProductsSkeleton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import LoadingMoreIndicator from '@/components/ui/LoadingMoreIndicator.vue'

const query = ref('')
const selectedCategory = ref('Tudo')
const debouncedQuery = useDebounce(query, 400)

const popularTerms = ['Pizza de Calabresa', 'Açaí 500ml', 'Combo Mix', 'Pizzaria do Dony']
const categories = {
  'Tudo': 'fluent:search-32-regular', 'Restaurantes': 'ri:restaurant-line',
  'Comidas': 'tabler:meat', 'Pizzas': 'mynaui:pizza',
  'Hambúrgueres': 'lucide:hamburger', 'Japonesas': 'hugeicons:sushi-03',
  'Açaís': 'material-symbols:icecream-outline'
}

const restaurantsFetch = usePaginatedFetch('/restaurants?per_page=3')
const productsFetch = usePaginatedFetch('/products')

const showRestaurantButton = computed(() => {
  return selectedCategory.value !== 'Restaurantes' &&
         restaurantsFetch.items.value.length >= 3 &&
         !restaurantsFetch.allLoaded.value
})

function showMoreRestaurants() {
  selectedCategory.value = 'Restaurantes'
}

watch([debouncedQuery, selectedCategory], async () => {
  restaurantsFetch.reset()
  productsFetch.reset()

  const enableRestaurantScroll = selectedCategory.value === 'Restaurantes'
  const enableProductScroll = selectedCategory.value === 'Comidas' || selectedCategory.value === 'Tudo'

  await Promise.all([
    restaurantsFetch.load({
      query: query.value,
      category: selectedCategory.value,
      endpoint: '/restaurants',
      enableInfiniteScroll: enableRestaurantScroll
    }),
    productsFetch.load({
      query: query.value,
      category: selectedCategory.value,
      endpoint: '/products',
      enableInfiniteScroll: enableProductScroll
    })
  ])
})

onMounted(async () => {
  await Promise.all([
    restaurantsFetch.load({
      endpoint: '/restaurants',
      enableInfiniteScroll: false,
      per_page: 3
    }),
    productsFetch.load({
      endpoint: '/products',
      enableInfiniteScroll: true
    })
  ])
})
</script>

<style scoped>
.search-content {
  margin: 5rem;
}

.restaurant-icon {
  color: var(--color-primary);
}

.section-title {
  margin: 2rem 0 1rem;
  color: rgb(75, 85, 99);
}

.featured-products {
  margin: 0;
}

.show-more-btn {
  margin-top: 1rem;
  border: none;
  background-color: var(--color-primary);
}

.restaurant-list {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, 1fr);
  will-change: transform, opacity;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.end-list {
  text-align: center;
  margin: 2rem 0;
  color: var(--color-muted);
}

@media (max-width: 758px) {
  .search-content {
    margin: 1rem;
    padding-top: 3rem;
  }
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
