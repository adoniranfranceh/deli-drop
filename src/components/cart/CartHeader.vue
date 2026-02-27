<template>
  <div class="m-4 mx-6">
    <header class="flex justify-between items-center">
      <h2 class="font-bold text-xl max-md:text-lg m-0">
        Sua sacola ({{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }})
      </h2>
      <button
        class="text-2xl bg-transparent cursor-pointer text-text-subtle transition-colors duration-200 hover:text-red-600 p-0 border-none"
        aria-label="Fechar modal"
        @click="$emit('close')"
      >×</button>
    </header>
    <span class="flex font-light leading-5 text-gray-500">
      <Icon icon="material-symbols:circle" class="text-[var(--color-cart)] mr-1.5" />
      {{ restaurantName }}
    </span>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  restaurantName: String,
  totalItems: Number
})
</script>
