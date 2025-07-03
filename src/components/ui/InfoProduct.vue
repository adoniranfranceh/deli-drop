<template>
  <div class="wrapper-info">
    <p class="product-rating">
      <RatingProduct :rating="product.rating"/>
    </p>
     <p><DeliveryDuration :duration="product.duration" /></p>
    <p><ItemChip :item="product.category"/></p>
  </div>
</template>

<script setup>
import ItemChip from '@/components/ui/ItemChip.vue';
import RatingProduct from '@/components/ui/RatingProduct.vue';
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue';

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