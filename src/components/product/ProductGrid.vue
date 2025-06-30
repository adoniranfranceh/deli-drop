<template>
  <div class="product-card" @click="(openModal(product))" v-for="product in products">
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>

      <div class="product-meta">
        <span class="time"><DeliveryDuration :duration="product.time || '25-35'" /></span>
      </div>

      <strong class="price">A partir de {{ FloatToMoney(product.base_price) }}</strong>
    </div>

    <div class="product-image">
      <img :src="product.image" alt="product image" />
    </div>
  </div>

  <ProductModalManager
    ref="modalManager"
    :products="products"
  />
</template>

<script setup>
import { ref } from 'vue';
import ProductModalManager from '@/components/product/ProductModalManager.vue';
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue';
import { FloatToMoney } from '../../utils/money';

const modalManager = ref(null)

const openModal = (product) => {
  modalManager.value?.openModal(product)
}

defineProps({
  products: Object,
})
</script>

<style scoped>
.product-card {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
  background: white;
  align-items: center;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: var(--shadow-md);

  img{ 
    transform: scale(1.05);
  } 
}

.product-card:hover h3 {
  color: var(--color-restaurant);
}

.product-info {
  flex: 1;
}

.product-info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.description {
  font-size: 0.9rem;
  margin: 0.5rem 0;
  color: #555;
  display: flex;
  justify-content: center;
}

.product-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #777;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #222;
  display: block;
  margin-bottom: 0.5rem;
}

.tag-button {
  display: flex;
  gap: 0.5rem;
  /* align-items: center; */
  justify-content: flex-end;
}

.customize {
  background-color: var(--color-restaurant);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.customize:hover {
  background-color: var(--color-restaurant-hover);
}

.product-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
