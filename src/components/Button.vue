<template>
  <router-link :to="path" class="cta-button">{{ text }}</router-link>
</template>

<style scoped>
.cta-button {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  margin-top: 1rem;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: var(--color-secondary);
  color: var(--color-black);
}
</style>

<script setup>
  defineProps({
    path: String,
    text: String
  });
</script>