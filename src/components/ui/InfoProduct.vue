<template>
  <div class="flex [&>p]:font-medium [&>p]:mr-5 [&>p]:text-base [&>p]:text-muted [&>p]:leading-relaxed">
    <p class="flex">
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