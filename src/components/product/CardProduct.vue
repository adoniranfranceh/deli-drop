<template>
  <div
    class="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-200 border border-border flex flex-col justify-between cursor-pointer hover:scale-[1.02] hover:shadow-lg group"
    @click="$emit('selected-product', product)"
  >
    <div class="relative">
      <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover" />
      <span class="bg-primary absolute top-[10px] left-[10px] rounded-full text-xs font-semibold text-white py-1 px-5">
        {{ showCategory ? product?.category : 'Destaque' }}
      </span>
    </div>

    <div class="p-8 max-[758px]:p-4">
      <div class="flex flex-col justify-center items-center">
        <h3 class="m-0 text-xl text-text group-hover:text-primary">{{ product.name }}</h3>
      </div>

      <div class="flex justify-center items-center text-center h-[100px]">
        <p>{{ product.description }}</p>
      </div>

      <InfoProduct v-if="!showCategory" :product="product" />

      <div class="flex justify-between items-center mt-4">
        <strong class="text-[25px]">{{ FloatToMoney(product.base_price) }}</strong>
        <AppButton
          text="Adicionar"
          @click.stop="$emit('open-modal', product)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import InfoProduct from '@/components/ui/InfoProduct.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { FloatToMoney } from '@/utils/money'

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
