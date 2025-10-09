<template>
  <div class="products-container">
    <div 
      class="product-card skeleton"
      v-for="n in count" 
      :key="'skeleton-'+n"
      >
      <div class="image-wrapper">
        <div class="image"></div>
      </div>
      <div class="product-info">
        <div class="product-header">
          <div class="line short"></div>
          <div class="line long"></div>
        </div>
        <div class="product-description">
          <div class="line long"></div>
        </div>
        <div class="product-footer">
          <div class="line short"></div>
          <div class="line button"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 5
  }
})
</script>

<style scoped>
.products-container {
  display: grid;
  gap: 2rem;
  margin: 2rem auto;
  padding: 0 1rem;
  grid-template-columns: repeat(1, 1fr);
}

.product-card.skeleton {
  background: var(--color-white);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;
}

.image-wrapper .image {
  width: 100%;
  height: 160px;
  background: var(--color-border);
  border-radius: 0.5rem;
  animation: pulse 1.5s infinite;
}

.line {
  height: 14px;
  background: var(--color-border);
  border-radius: 7px;
  margin-bottom: 0.5rem;
  animation: pulse 1.5s infinite;
}

.line.short { width: 40%; }
.line.long { width: 80%; }
.line.button { width: 30%; height: 25px; }

@media (min-width: 758px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1250px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
    margin: 3rem auto;
  }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
