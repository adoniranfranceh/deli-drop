<template>
  <p class="flex font-semibold mb-3 text-text">Ingredientes:</p>

  <div class="flex flex-wrap gap-2 mt-2">
    <ItemChip
      v-for="ingredient in ingredients"
      :key="ingredient"
      :item="ingredient"
    />
  </div>
</template>

<script setup>
import ItemChip from '@/components/ui/ItemChip.vue'

defineProps({
  ingredients: {
    type: Array,
    required: true
  }
})
</script>
