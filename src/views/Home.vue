<template>
  <div>
    <main class="main-content">
      <section class="hero">
        <h1>Peça sua comida favorita sem sair de casa</h1>
        <p>Entrega rápida, pratos variados e promoções exclusivas.</p>
      </section>

      <Button text="Pedir agora" path="/pedir" />

      <section class="showcase">
        <h2>Restaurantes em destaque</h2>
        <FeaturedRestaurants />
      </section>
    </main>
  </div>  
</template>

<script setup>
import FeaturedRestaurants from '@/components/FeaturedRestaurants.vue'
import Button from '../components/Button.vue';
</script>

<style scoped>
.main-content {
  padding: 2rem;
  text-align: center;
  background-color: var(--bg-color);
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