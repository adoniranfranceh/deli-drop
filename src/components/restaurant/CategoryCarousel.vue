<template>
  <section class="my-8 text-center">
    <h2 class="mb-4 text-text">Escolha por categoria</h2>
    <div class="flex justify-center overflow-x-auto gap-4 px-4 snap-x snap-mandatory">
      <div
        v-for="category in categories"
        :key="category.name"
        class="flex-none snap-center flex flex-col items-center cursor-pointer transition-transform duration-200 w-[90px] hover:scale-105"
        @click="goToCategory(category)"
      >
        <img
          :src="category.icon"
          :alt="category.name"
          @error="onImageError($event)"
          class="w-16 h-16 object-contain mb-2 rounded-xl bg-white p-2 shadow-sm"
        />
        <span class="text-sm text-text whitespace-nowrap">{{ category.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const fallbackIcon = '/img/categorias/default.png';

const categories = [
  { name: 'Pizza', icon: '/img/categorias/pizza.png' },
  { name: 'Lanches', icon: '/img/categorias/lanches.png' },
  { name: 'Japonesa', icon: '/img/categorias/japonesa.png' },
  { name: 'Sobremesas', icon: '/img/categorias/sobremesa.png' },
  { name: 'Saudável', icon: '/img/categorias/saudavel.png' },
  { name: 'Bebidas', icon: '/img/categorias/bebidas.png' }
];

function goToCategory(category) {
  router.push({ path: '/pedir', query: { categoria: category.name } });
}

function onImageError(event) {
  event.target.src = fallbackIcon;
}
</script>
