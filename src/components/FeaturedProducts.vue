<template>
  <div class="restaurants-container">
    <div
      class="restaurant-card"
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      @click="openModal(restaurant)"
    >
      <img :src="restaurant.image" :alt="restaurant.name" class="restaurant-image" />
      <div class="restaurant-info">
        <h3>{{ restaurant.name }}</h3>
        <p>{{ restaurant.eta }} min • {{ restaurant.category }}</p>
      </div>
    </div>

    <ProductModel
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import ProductModel from '@/components/ProductModel.vue'
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const selectedProduct = ref(null)

function openModal(product) {
  router.push({ query: { productId: product.id } })
  selectedProduct.value = product
}

function closeModal() {
  selectedProduct.value = null
  router.push({ query: {} })
}

const restaurants = [
  {
    id: 1,
    name: 'Pizzaria La Vera',
    eta: 35,
    category: 'Pizza',
    price: 29.99,
    description: 'Deliciosa pizza de pepperoni com massa fina e crocante.',
    ingredients: ['Massa fina', 'Molho de tomate', 'Queijo muçarela', 'Pepperoni'],
    image: 'https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg',
  },
  {
    id: 2,
    name: 'Sushi House',
    eta: 25,
    category: 'Sushi',
    price: 49.99,
    description: 'Sushi fresco com uma variedade de peixes e vegetais.',
    ingredients: ['Arroz de sushi', 'Peixe fresco', 'Alga nori', 'Vegetais variados'],
    image: 'https://media.istockphoto.com/id/1053854126/pt/foto/all-you-can-eat-sushi.jpg?s=612x612&w=0&k=20&c=3RMMIy05HDxFzejgbMWSgxmh72ZhEwm3oyUNU-tTrqY=',
  },
  {
    id: 3,
    name: 'Burguer King',
    eta: 20,
    category: 'Hambúrguer',
    price: 19.99,
    description: 'Saboroso hambúrguer com queijo, alface e tomate.',
    ingredients: ['Pão de hambúrguer', 'Carne bovina', 'Queijo cheddar', 'Alface', 'Tomate'],
    image: 'https://d3sn2rlrwxy0ce.cloudfront.net/BK_Taste_1.0_new_2025-01-08-161052_ajor.png?mtime=20250108161053&focal=none',
  },
]
const restaurantMap = new Map()
restaurants.forEach(r => restaurantMap.set(r.id, r))

onMounted(() => {
  const idFromURL = route.query.productId
  if(idFromURL) {
    const product = restaurantMap.get(Number(idFromURL))
    if (product) selectedProduct.value = product
  }
})

watch(() => route.query.productId, (newId) => {
  if (newId) {
    const product = restaurants.get(r => r.id === Number(newId))
    if (product) selectedProduct.value = product
  } else {
    selectedProduct.value = null
  }
})

</script>

<style scoped>
.restaurants-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.restaurant-card {
  background: var(--color-white);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.3s;
  border: 1px solid var(--color-border);
}
.restaurant-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

.restaurant-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.restaurant-info {
  padding: 1rem;
}
.restaurant-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-text);
}
.restaurant-info p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-muted);
}
</style>
