<template>
  <h3>
    <Icon class="graph-arrow-icon" icon="streamline:graph-arrow-increase" />
    BUSCAS POPULARES
  </h3>
  <div class="popular-searches">
    <Chip 
      v-for="term in terms"
      :key="term"
      @click="$emit('update:query', term)"
      class="tag"
      :item="term"
    />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import Chip from './Chip.vue';

defineProps({
  terms: Array
})
</script>

<style scoped>
h3 {
  display: flex;
  color: rgb(75, 85, 99);
}

.graph-arrow-icon {
  color: var(--color-primary);
  margin-right: 0.5rem;
  width: 23px;
  height: 23px;
}

.popular-searches {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
}

.popular-searches .tag {
  cursor: pointer;
  background: #eee;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.85rem;
}
</style>
