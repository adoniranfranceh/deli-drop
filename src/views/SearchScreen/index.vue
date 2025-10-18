<template>
  <div class="search-content">
    <SearchInput v-model="query" placeholder="..." /> 

    <CategoryFilter
      :categories="categories"
      v-model:selected="selectedCategory"
    />

    <PopularSearches :terms="popularTerms" @update:query="term => query = term" />

    <SearchResultsRestaurants
      v-if="selectedCategory !== 'Comidas'"
      :restaurantsFetch="restaurantsFetch"
      :selectedCategory="selectedCategory"
      @showMoreRestaurants="showMoreRestaurants"
    />

    <SearchResultsProducts
      v-if="selectedCategory !== 'Restaurantes'"
      :productsFetch="productsFetch"
    />
  </div>

</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useDebounce } from '@vueuse/core'
import { usePaginatedFetch } from '@/composables/usePaginatedFetch'
import SearchInput from '@/components/ui/SearchInput.vue'
import CategoryFilter from '@/components/ui/CategoryFilter.vue'
import PopularSearches from '@/components/ui/PopularSearches.vue'
import SearchResultsRestaurants from './SearchResultsRestaurants.vue'
import SearchResultsProducts from './SearchResultsProducts.vue'

const RESTAURANT_INITIAL_PAGE_SIZE = 3;
const RESTAURANT_FULL_PAGE_SIZE = 10

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

const isCategoryRestaurants = computed(() => selectedCategory.value === 'Restaurantes');
const isCategoryProductsOrAll = computed(() => ['Comidas', 'Tudo'].includes(selectedCategory.value));

const restaurantPerPage = computed(() => 
  isCategoryRestaurants.value ? RESTAURANT_FULL_PAGE_SIZE : RESTAURANT_INITIAL_PAGE_SIZE
);

function showMoreRestaurants() {
  selectedCategory.value = 'Restaurantes'
}

watch([debouncedQuery, selectedCategory], async () => {
  restaurantsFetch.reset()
  productsFetch.reset()

  const per_page_restaurants = restaurantPerPage.value;
  const enableRestaurantScroll = isCategoryRestaurants.value;
  const enableProductScroll = isCategoryProductsOrAll.value;

  await Promise.all([
    restaurantsFetch.load({
      query: query.value,
      category: selectedCategory.value,
      endpoint: '/restaurants',
      enableInfiniteScroll: enableRestaurantScroll,
      per_page: per_page_restaurants
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
      per_page: RESTAURANT_INITIAL_PAGE_SIZE
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

.featured-products {
  margin: 0;
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
</style>
