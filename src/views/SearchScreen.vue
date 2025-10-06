<template>
  <div class="search-content">
    <SearchInput v-model="query" placeholder="Buscar por restaurantes, pratos, ingredientes..." /> 

    <CategoryFilter
      :categories="categories"
      v-model:selected="selectedCategory"
    />

    <PopularSearches :terms="popularTerms" @update:query="term => query = term" />

    <div v-if="filteredRestaurants.length">
      <h3 class="section-title">
        <Icon icon="ri:restaurant-line" class="restaurant-icon" /> RESTAURANTES
      </h3>

      <div class="restaurant-list">
        <RestaurantList
          v-for="restaurant in limitedRestaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>
      <button v-if="filteredRestaurants.length > restaurantLimit" @click="showMoreRestaurants" class="show-more">
        Mostrar mais restaurantes
      </button>
    </div>

    <div v-if="filteredProducts.length">
      <h3 class="section-title">
        <Icon icon="tabler:meat" class="restaurant-icon" /> COMIDAS
      </h3>
      <div class="products-grid">
        <FeaturedProducts
          class="featured-products"
          :products="limitedProducts"
          :showCategory="true"
        />
      </div>
      <button v-if="filteredProducts.length > productLimit" @click="showMoreProducts" class="show-more">
        Mostrar mais comidas
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { extractAllProductsFromCategories } from '@/utils/restaurant_products'
import SearchInput from '@/components/ui/SearchInput.vue'
import CategoryFilter from '@/components/ui/CategoryFilter.vue'
import PopularSearches from '@/components/ui/PopularSearches.vue'
import RestaurantList from '@/components/restaurant/RestaurantList.vue'
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue'
import { Icon } from '@iconify/vue'
import { apiGet } from '../stores/totalPriceStore/helpers/apiHelpers'

const query = ref('')
const selectedCategory = ref('Tudo')
const restaurantsData = ref([])

const restaurantLimit = ref(3)
const productLimit = ref(3)

watch(query, () => {
  restaurantLimit.value = 3
  productLimit.value = 3
})

watch(selectedCategory, () => {
  restaurantLimit.value = 3
  productLimit.value = 3
})

const popularTerms = ['Pizza de Calabresa', 'Açaí 500ml', 'Combo Mix', 'Pizzaria do Dony']
const categories = {
  'Tudo': 'fluent:search-32-regular', 'Restaurantes': 'ri:restaurant-line',
  'Comidas': 'tabler:meat', 'Pizza': 'mynaui:pizza',
  'Hambúrgueres': 'lucide:hamburger', 'Japonesa': 'hugeicons:sushi-03',
  'Açaí': 'material-symbols:icecream-outline'
}

onMounted(async () => {
  const data = await apiGet({ endpoint: '/restaurants?full=true' })
  restaurantsData.value = data
})

const filteredRestaurants = computed(() => {
  if (selectedCategory.value === 'Comidas') return []

  let restaurants = restaurantsData.value
  if (selectedCategory.value === 'Restaurantes' || selectedCategory.value === 'Tudo') {
    return filterByQuery(restaurants)
  }

  return []
})

const filteredProducts = computed(() => {
  const allProducts = restaurantsData.value.flatMap(r => {
    const products = extractAllProductsFromCategories(r.categories || [])
    return products.map(p => ({
      ...p,
      restaurantName: r.name
    }))
  })

  let products = allProducts

  if (selectedCategory.value === 'Restaurantes') return []

  const categoryMap = {
    'Pizza': p => p.category?.toLowerCase().includes('pizza'),
    'Hambúrgueres': p => p.category?.toLowerCase().includes('hambúrguer'),
    'Japonesa': p => p.restaurantName.toLowerCase().includes('sushi') || p.category?.toLowerCase().includes('combinado'),
    'Açaí': p => p.category?.toLowerCase().includes('açaí'),
  }

  if (selectedCategory.value !== 'Comidas' && selectedCategory.value !== 'Tudo') {
    const filterFn = categoryMap[selectedCategory.value]
    if (filterFn) {
      products = products.filter(filterFn)
    } else {
      products = products.filter(p =>
        p.category?.toLowerCase().includes(selectedCategory.value.toLowerCase())
      )
    }
  }

  if (query.value.trim() !== '') {
    const q = query.value.toLowerCase()
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    )
  }

  return products
})

const limitedRestaurants = computed(() =>
  filteredRestaurants.value.slice(0, restaurantLimit.value)
)

const limitedProducts = computed(() =>
  filteredProducts.value.slice(0, productLimit.value)
)

function filterByQuery(restaurants) {
  if (query.value.trim() === '') return restaurants
  const q = query.value.toLowerCase()
  return restaurants.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description?.toLowerCase().includes(q)
  )
}

async function showMoreRestaurants() {
  if (selectedCategory.value === 'Tudo') {
    selectedCategory.value = 'Restaurantes'
    await nextTick()
  }
  restaurantLimit.value += 3
}

async function showMoreProducts() {
  if (selectedCategory.value === 'Tudo') {
    selectedCategory.value = 'Comidas'
    await nextTick()
  }
  productLimit.value += 3
}
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
