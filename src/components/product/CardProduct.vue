<template>
  <div class="product-card" @click="$emit('selected-product', product)">
    <div class="image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <span class="product-stamp">
        {{ showCategory ? product?.category : 'Destaque' }}
      </span>
    </div>

    <div class="product-info">
      <div class="product-header">
        <h3>{{ product.name }}</h3>
      </div>

      <div  class="product-description">
        <p>{{ product.description }}</p>
      </div>

      <InfoProduct v-if="!showCategory" :product="product" />

      <div class="product-footer">
        <strong class="product-price">{{ FloatToMoney(product.base_price) }}</strong>
          <Button
            text="Adicionar"
            @click.stop="$emit('open-modal', product)"
          />
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import InfoProduct from '@/components/ui/InfoProduct.vue'
  import Button from '@/components/ui/Button.vue'
  import { FloatToMoney } from '@/utils/money'
  import { useCartStore } from '@/stores/cartStore'
  import { useRoute } from 'vue-router'
  import { useRestaurantStore } from '@/stores/useRestaurantStore'
  const restaurantStore = useRestaurantStore()

  const cartStore = useCartStore()
  const route = useRoute()

  defineProps({
    product: {
      type: Object,
      required: true,
    },
    showCategory: {
      type: Boolean,
      default: false,
    },
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }

  .product-card:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-lg);
  }

  .product-card:hover h3 {
    color: var(--color-primary);
  }

  .image-wrapper {
    position: relative;
  }

  .product-stamp {
    background: var(--color-primary);
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-white);
    padding: 4px 20px;
  }

  .product-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .product-info {
    padding: 2rem;
  }

  .product-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .product-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--color-text);
  }

  .product-header p {
    font-size: 1rem;
    color: var(--color-muted);
    font-weight: 600;
    line-height: 1.6;
  }

  .product-description {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }

  .product-price {
    font-size: 25px;
  }

  @media (max-width: 758px) {
    .product-info {
      padding: 1rem;
    }
  }
  </style>
