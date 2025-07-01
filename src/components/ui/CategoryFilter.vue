<template>
  <h3>FILTROS</h3>
  <div class="filters">
    <Button
      v-for="(value, key) in categories"
      :key="key"
      :iconLeft="value"
      :class="{ active: selected === key }"
      @click="$emit('update:selected', key)"
      :text="key"
    />
  </div>
</template>

<script setup>
import Button from '@/components/ui/Button.vue';

const props = defineProps({
  categories: Object,
  selected: String
})

defineEmits(['update:selected'])
</script>

<style scoped>
h3 {
  font-weight: 600;
  color: rgb(75, 85, 99);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 2rem 0;
  justify-content: flex-start;
}
.filters button {
  border: 1px solid #ddd;
  background: white;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  color: var(--color-black);
}

.filters button:hover {
  background-color: var(--bg-soft);
}

.filters button.active {
  background: var(--color-primary);
  color: white;
}
</style>
