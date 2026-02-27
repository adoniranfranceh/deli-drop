<template>
  <div
    class="flex justify-between gap-4 p-4 border border-border-light rounded-lg shadow-sm mb-6 bg-white items-center cursor-pointer hover:shadow-md group"
    @click="openModal(product)"
    v-for="product in products"
    :key="product.id"
  >
    <div class="flex-1">
      <h3 class="m-0 text-lg font-semibold group-hover:text-[var(--color-restaurant)]">{{ product.name }}</h3>
      <p class="text-sm my-2 text-text-subtle flex justify-center">{{ product.description }}</p>

      <div class="flex gap-4 text-sm text-text-secondary">
        <span><DeliveryDuration :duration="product.duration || '25-35'" /></span>
      </div>

      <strong class="text-lg font-bold text-text-dark block mb-2">A partir de {{ FloatToMoney(product.base_price) }}</strong>
    </div>

    <div>
      <img :src="product.image" alt="product image" class="w-[100px] h-[100px] object-cover rounded-lg transition-transform group-hover:scale-105" />
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
