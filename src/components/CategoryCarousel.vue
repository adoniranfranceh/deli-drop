<template>
  <section class="category-carousel">
    <h2>Escolha por categoria</h2>
    <div class="category-list">
      <div
        v-for="category in categories"
        :key="category.name"
        class="category-item"
        @click="goToCategory(category)"
      >
        <img
          :src="category.icon"
          :alt="category.name"
          @error="onImageError($event)"
        />
        <span>{{ category.name }}</span>
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

<style scoped>
.category-carousel {
  margin: 2rem 0;
  text-align: center;
}

.category-carousel h2 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.category-list {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  gap: 1rem;
  padding: 0 1rem;
  scroll-snap-type: x mandatory;
}

.category-item {
  flex: 0 0 auto;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  width: 90px;
}

.category-item:hover {
  transform: scale(1.05);
}

.category-item img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  background: white;
  padding: 8px;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
}

.category-item span {
  font-size: 0.85rem;
  color: var(--color-text);
  white-space: nowrap;
}
</style>
