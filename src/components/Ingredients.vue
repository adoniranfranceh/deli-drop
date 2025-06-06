<template>
  <p class="ingredients-title">Ingredientes:</p>
  <div class="ingredients-chips">
    <span v-for="ingredient in ingredients" :key="ingredient" class="ingredient-chip">
      {{ ingredient }}
    </span>
  </div>
</template>

<style scoped>
.ingredients-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #222;
}

.ingredients-chips {
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.ingredient-chip {
  background-color: #f1f1f1;
  color: #333;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  transition: background-color 0.2s;
}

.ingredient-chip:hover {
  background-color: #e0e0e0;
}
</style>

<script setup>
defineProps({
  ingredients: {
    type: Array,
    required: true
  }
})
</script>
