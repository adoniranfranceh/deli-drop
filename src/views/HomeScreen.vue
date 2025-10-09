<template>
  <div>
    <main class="main-content">
      <FeaturedRestaurants />

      <section class="container-hero">
        <div class="hero">
          <h1>Peça sua comida favorita sem sair de casa</h1>
          <p>Entrega rápida, pratos variados e promoções exclusivas.</p>
        </div>

        <AppButton text="Pedir agora" path="/buscar" icon="radix-icons:arrow-right" />
      </section>

      <transition name="fade" tag="section" class="showcase">
        <div>
          <h2>Seu restaurante favorito a um clique</h2>
          <FeaturedProducts
            :products="productsFetch.items.value"
            :showCategory="true"
            v-if="!productsFetch.loading.value && productsFetch.items.value.length > 0"
          />
          <FeaturedProductsSkeleton v-if="productsFetch.loading.value" :count="6" />
        </div>
      </transition>
    </main>
  </div>
  <MainFooter />

</template>

<script setup>
import { ref, onMounted } from 'vue';
import FeaturedRestaurants from '@/components/restaurant/FeaturedRestaurants.vue';
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue'
import AppButton from '@/components/ui/AppButton.vue';
import MainFooter from '@/components/ui/MainFooter.vue';

import FeaturedProductsSkeleton from '../components/product/FeaturedProductsSkeleton.vue'
import { usePaginatedFetch } from '../composables/usePaginatedFetch';

onMounted(async () => {
  productsFetch.load()
})

const productsFetch = usePaginatedFetch('/products')
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

@media (max-width: 758px){
  .main-content {
    padding: 0;
  }

  .hero h1 {
    font-size: 1.5rem;
  }

  .hero p {
    font-size: 0.7rem;
  }

  .showcase h2 {
    font-size: 1.2rem;
  }

  .container-hero {
    padding: 1rem 0;
  }
}
</style>
