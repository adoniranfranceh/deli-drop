<template>
  <div class="products-container">
    <CardProduct
      v-for="product in products"
      :key="product.id"
      :product="product"
      @selected-product="openModal"
    />
    <ProductModalManager
      ref="modalMananger"
      @add-to-cart="$emit('add-to-cart', $event)"
      :products="products"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductModalManager from '@/components/ProductModalManager.vue'
import CardProduct from '@/components/CardProduct.vue'

const products = [
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

const modalMananger = ref(null)

function openModal(product) {
  modalMananger.value?.openModal(product)
}
</script>

<style scoped>
.products-container {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 600px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
