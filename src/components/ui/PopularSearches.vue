<template>
  <h3 class="flex text-gray-600">
    <Icon class="text-primary mr-2 w-6 h-6" icon="streamline:graph-arrow-increase" />
    BUSCAS POPULARES
  </h3>
  <div class="my-4 flex flex-wrap gap-2 justify-start">
    <ItemChip
      v-for="term in terms"
      :key="term"
      @click="$emit('update:query', term)"
      class="cursor-pointer !bg-border-light !py-1 !px-3 !rounded-full !text-sm"
      :item="term"
    />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import ItemChip from './ItemChip.vue';

defineProps({
  terms: Array
})
</script>
