<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="image-wrapper">
        <CloseButton @close="$emit('close')" />
        <img :src="product.image" :alt="product.name" class="modal-image" />
      </div>

      <div class="product-details">
        <div class="about-product"> 
          <h2>{{ product.name }}</h2>
          <div class="product-price">R$ {{ totalPrice }}</div>
        </div>

        <div class="info">
          <div class="header-wrapper">
            <p>{{ product.description }}</p>
            <Rating v-if="product.rating" :rating="product.rating" />
          </div>
          <DeliveryDuration :duration="product.duration" />
        </div>

        <hr />

        <Ingredients :ingredients="product.ingredients" />

        <div class="comment-content">
          <label for="comment">Algum comentário?</label>
          <textarea
            id="comment"
            rows="5"
            placeholder="Ex: sem cebola, sem maionese..."
          ></textarea>
        </div>

        <hr />

        <div class="add-wrapper">
          <WrapperQuantity v-model="quantity" />
          <Button
            :text="'Adicionar R$ ' + totalPrice"
            iconLeft="ph:shopping-bag-open-thin"
            @click="$emit('add-to-cart', { product, quantity })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CloseButton from './CloseButton.vue'
import WrapperQuantity from './WrapperQuantity.vue'
import Ingredients from './Ingredients.vue'
import Button from './ui/Button.vue'
import Rating from './ui/Rating.vue'
import DeliveryDuration from './ui/DeliveryDuration.vue'
import { FloatToMoney } from '../utils/money'
import { useUIStore } from '@/stores/uiStore'

const quantity = ref(1)

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const totalPrice = computed(() =>
  FloatToMoney(props.product.price * quantity.value)
)


const ui = useUIStore()

onMounted(() => {
  ui.openModal()
})

onUnmounted(() => {
  ui.closeModal()
})
</script>

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
  background: #fff;
  max-width: 1200px;
  width: 800px;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

.modal-content h2 {
  color: var(--color-primary);
  font-size: 1.5rem;
  margin-bottom: 0;
}

.modal-content p {
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-bottom: 1rem;
}

.product-details {
  padding: 1.5rem;
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.image-wrapper {
  height: 40%;
  position: relative;
}

.about-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0;
}

.comment-content label {
  font-weight: 700;
}

.comment-content textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-top: 1rem;
  resize: none;

}

.comment-content textarea::placeholder {
  padding: 0.5rem;
}

.add-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.product-price {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.25rem;
}

hr {
  border-top: 1px solid var(--color-border);
  margin: 1.5rem 0;
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
    border-radius: 0;
  }

  .modal-image {
    height: 270px;
  }

  .add-wrapper {
    gap: 1rem;
  }

  .comment-content textarea {
    width: 100%;
  }

  .about-product {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
