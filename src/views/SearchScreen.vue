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

      <transition name="fade" tag="div">
        <div class="restaurant-list">
          <RestaurantListSkeleton v-if="restaurantsFetch.loading.value" v-for="n in 3" :key="'skeleton-'+n" />

          <RestaurantList
            v-for="restaurant in restaurantsFetch.items.value"
            :key="restaurant.id"
            :restaurant="restaurant"
            v-if="!restaurantsFetch.loading.value && restaurantsFetch.items.value.length > 0"
          />
        </div>
      </transition>

      <div v-if="!restaurantsFetch.loading.value && restaurantsFetch.items.value.length === 0">
        Nenhum restaurante encontrado.
      </div>
    </div>

    <div v-if="selectedCategory !== 'Restaurantes'">
        <h3 class="section-title">
          <Icon icon="tabler:meat" class="restaurant-icon" /> COMIDAS
        </h3>
        <transition name="fade" tag="div" class="products-grid">
          <div>
            <FeaturedProductsSkeleton v-if="productsFetch.loading.value" :count="6" />

            <FeaturedProducts
              class="featured-products"
              :products="productsFetch.items.value"
              :showCategory="true"
              v-if="!productsFetch.loading.value && productsFetch.items.value.length > 0"
            />
          </div>
        </transition>

        <div v-if="!productsFetch.loading.value && productsFetch.items.value.length === 0">
          Nenhum produto encontrado.
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { usePaginatedFetch } from '@/composables/usePaginatedFetch'
import { useDebounce } from '@vueuse/core'
import SearchInput from '@/components/ui/SearchInput.vue'
import CategoryFilter from '@/components/ui/CategoryFilter.vue'
import PopularSearches from '@/components/ui/PopularSearches.vue'
import RestaurantList from '@/components/restaurant/RestaurantList.vue'
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue'
import { Icon } from '@iconify/vue'
import RestaurantListSkeleton from '../components/restaurant/RestaurantListSkeleton.vue'
import FeaturedProductsSkeleton from '../components/product/FeaturedProductsSkeleton.vue'

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

const restaurantsFetch = usePaginatedFetch('/restaurants')
const productsFetch = usePaginatedFetch('/products')

watch([debouncedQuery, selectedCategory], async () => {
  restaurantsFetch.reset()
  productsFetch.reset()

  restaurantsFetch.loading.value = true
  productsFetch.loading.value = true

  await Promise.all([
    restaurantsFetch.load({ query: query.value, category: selectedCategory.value }),
    productsFetch.load({ query: query.value, category: selectedCategory.value })
  ])
})

onMounted(async () => {
  await Promise.all([
    restaurantsFetch.load(),
    productsFetch.load()
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

.show-more {
  margin-top: 1rem;
  background: transparent;
  border: none;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
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
