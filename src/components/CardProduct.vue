<template>
  <div
    class="product-card"
    @click="$emit('selected-product', product)"
  >
    <img :src="product.image" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>{{ product.eta }} min • {{ product.category }}</p>
      <strong>R$ {{ product.price.toFixed(2) }}</strong>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.product-card {
  background: var(--color-white);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.3s;
  border: 1px solid var(--color-border);
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}
.product-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-text);
}
.product-info p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-muted);
}
</style>
