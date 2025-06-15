<template>
  <div class="wrapper-info">
    <p class="product-rating">
      <Rating :rating="product.rating"/>
    </p>
    <!-- <p>{{ product.eta }} min </p> -->
     <DeliveryDuration :duration="product.eta" />
    <p><Chip :item="product.category"/></p>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import Chip from './Chip.vue';
import Rating from './Rating.vue';
import DeliveryDuration from './DeliveryDuration.vue';

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.wrapper-info {
  display: flex;

  p{
    font-weight: 500;
    margin-right: 20px;
    font-size: 1rem;
    color: var(--color-muted);
    line-height: 1.6;
  }
}

.product-rating {
  display: flex;
}
</style>