<template>
  <div>
    <Icon
      icon="solar:close-circle-bold"
      class="absolute top-3 right-3 w-[42px] h-[42px] bg-white/90 rounded-full text-[var(--color-product-modal)] flex items-center justify-center cursor-pointer border-none max-md:hidden"
      @click="$emit('close')"
    />
    <Icon
      icon="material-symbols-light:arrow-circle-left"
      class="absolute top-3 left-3 w-[50px] h-[50px] bg-white/90 rounded-full text-[var(--color-product-modal)] flex items-center justify-center cursor-pointer border-none hidden max-md:block"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineEmits(['close'])
</script>
