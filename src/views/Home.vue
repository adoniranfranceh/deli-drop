<template>
  <div>
    <main class="main-content">
      <FeaturedRestaurants />

      <section class="container-hero">
        <div class="hero">
          <h1>Peça sua comida favorita sem sair de casa</h1>
          <p>Entrega rápida, pratos variados e promoções exclusivas.</p>
        </div>

        <Button text="Pedir agora" path="/pedir" icon="radix-icons:arrow-right" />
      </section>

       <!-- <CategoryCarousel /> -->

      <section class="showcase">
        <h2>Seu restaurante favorito a um clique</h2>
        <FeaturedProducts :products="products"/>
      </section>
    </main>
  </div>
  <Footer />

</template>

<script setup>
import FeaturedRestaurants from '../components/FeaturedRestaurants.vue';
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import Button from '../components/ui/Button.vue';
import CategoryCarousel from '../components/CategoryCarousel.vue'
import Footer from '@/components/Footer.vue'

const products = [
  {
    id: 1,
    name: 'Pizzaria La Vera',
    eta: 35,
    category: 'Pizza',
    price: 29.99,
    description: 'Deliciosa pizza de pepperoni com massa fina e crocante.',
    ingredients: ['Massa fina', 'Molho de tomate', 'Queijo muçarela', 'Pepperoni'],
    rating: 4.1,
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
    rating: 4.9,
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
    rating: 4.5,
    image: 'https://d3sn2rlrwxy0ce.cloudfront.net/BK_Taste_1.0_new_2025-01-08-161052_ajor.png?mtime=20250108161053&focal=none',
  },
]
</script>

<style scoped>
.main-content {
  padding: 2rem;
  text-align: center;
  background-color: var(--bg-color);
}

.container-hero {
  background-color: #f9fafb;
  padding: 3rem;
}
.hero {
  margin-bottom: 3rem;
}

.hero h1 {
  color: var(--color-text);
}

.hero p {
  color: var(--color-text);
}

.showcase h2 {
  color: var(--color-black);
  margin-bottom: 1.5rem;
}
</style>
