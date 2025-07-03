<template>
  <p class="ingredients-title">Ingredientes:</p>

  <div class="ingredients-chips">
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

<style scoped>
.ingredients-title {
  display: flex;
  font-weight: 600;
  margin-bottom: 0.7rem;
  color: var(--color-text, #222);
}

.ingredients-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
