<template>
  <div>
    <main class="p-8 text-center bg-[var(--bg-color)] max-[758px]:p-0">
      <FeaturedRestaurants />

      <section class="bg-surface p-12 max-[758px]:py-4 max-[758px]:px-0">
        <div class="mb-12">
          <h1 class="text-text max-[758px]:text-2xl">Peça sua comida favorita sem sair de casa</h1>
          <p class="text-text max-[758px]:text-xs">Entrega rápida, pratos variados e promoções exclusivas.</p>
        </div>

        <AppButton text="Pedir agora" path="/buscar" icon="radix-icons:arrow-right" />
      </section>

      <section class="py-8">
        <h2 class="text-black mb-6 max-[758px]:text-xl">Seu restaurante favorito a um clique</h2>
        <FeaturedProducts
          :products="productsFetch.items.value"
          :showCategory="true"
          v-if="productsFetch.items.value.length > 0"
        />

        <FeaturedProductsSkeleton v-if="productsFetch.loading.value && productsFetch.items.value.length === 0" :count="6" />

        <LoadingMoreIndicator v-if="productsFetch.loading.value && productsFetch.items.value.length > 0" />

        <p v-if="productsFetch.allLoaded.value && productsFetch.items.value.length > 0" class="text-center my-8 text-muted">
          Todos os produtos foram carregados
        </p>
      </section>
    </main>

    <MainFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import FeaturedRestaurants from '@/components/restaurant/FeaturedRestaurants.vue';
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue';
import AppButton from '@/components/ui/AppButton.vue';
import MainFooter from '@/components/ui/MainFooter.vue';
import FeaturedProductsSkeleton from '@/components/product/FeaturedProductsSkeleton.vue';
import { usePaginatedFetch } from '@/composables/usePaginatedFetch';
import LoadingMoreIndicator from '../components/ui/LoadingMoreIndicator.vue';

const productsFetch = usePaginatedFetch('/products');

onMounted(async () => {
  await productsFetch.load({ enableInfiniteScroll: true });
});
</script>
