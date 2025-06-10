<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <CloseButton @close="$emit('close')" />
      <h2>{{ product.name }}</h2>
      <p>Categoria: {{ product.category }}</p>

      <div class="product-details">
        <img :src="product.image" class="modal-image" />

        <div class="about-product"> 
          <p class="product-description">{{ product.description }}</p>
          <div class="product-price">
            R$ {{ (product.price * quantity).toFixed(2).replace('.', ',') }}
          </div>

          <Ingredients :ingredients="product.ingredients" />

          <div class="comment-content">
            <label for="comment">Algum comentário?</label>
            <textarea id="comment" rows="7" placeholder="Ex: sem cebola, sem maionese..."></textarea>
          </div>
        </div>
      </div>
      
      <div class="add-wrapper">
        <WrapperQuantity v-model="quantity" />
        <button class="add-button" @click="$emit('add-to-cart', { product, quantity })">
          Adicionar ao carrinho
          R$ {{ totalPrice }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  background: white;
  max-width: 1200px;
  width: 100%;
  height: 65%;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

.modal-content h2 {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
  text-align: center;
}

.modal-content p {
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-bottom: 1rem;
}

.product-details {
  display: flex;
  height: 125vw;
}

.modal-image {
  flex: 1;
  width: 400px;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.about-product {
  flex: 1;
  margin-left: 1rem;
}

.product-description {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.comment-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  margin-left: 1rem;
  flex: 1;
}

.comment-content textarea {
  width: 97%;
  padding: 0.4rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-top: 1rem;
  resize: none;
}

.add-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  z-index: 2;
}

.add-button {
  width: 40%;
  height: 3.5rem;
  padding: 0.8rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.product-price {
  font-size: 1rem;
  color: #28a745;
  margin-bottom: 1rem;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 100%;
    height: 100%;
    max-width: none;
    border-radius: 0;
    flex-wrap: wrap;
  }

  .add-wrapper {
    align-items: center;
  }

  .add-wrapper .add-button {
    width: 100%;
  }

  .modal-image {
    width: 100%;
    height: 200px;
  }

  .about-product {
    margin-left: 0;
  }

  .product-details {
    flex-direction: column;
  }

  .comment-content {
    margin-left: 0;
  }
}
</style>

<script setup>
import { ref, computed } from 'vue';
import CloseButton from './CloseButton.vue';
import WrapperQuantity from './WrapperQuantity.vue';
import Ingredients from './Ingredients.vue';

const quantity = ref(1);

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const totalPrice = computed(() => {
  return (props.product.price * quantity.value).toFixed(2).replace('.', ',');
});
</script>
