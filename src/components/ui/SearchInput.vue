<template>
  <div
    class="floating-search"
    :class="{ 'is-focused': isFocused }"
  >
    <div class="search-bar">
      <Icon class="search-icon" icon="fluent:search-32-regular" />
      <input
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <Icon 
        v-if="modelValue"
        class="close-icon"
        icon="material-symbols-light:close"
        @click="$emit('update:modelValue', '')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const isFocused = ref(false);

defineProps({
  placeholder: {
    type: String,
    default: 'Buscar...'
  },
  modelValue: String
});

defineEmits(['update:modelValue', 'search']);
</script>

<style scoped>
.floating-search {
  position: sticky;
  top: env(safe-area-inset-top, 0);
  z-index: 1000;
  overflow-x: auto;
  background-color: var(--color-white);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.search-bar {
  background: var(--color-white);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  font-size: 1.2rem;
}

.close-icon {
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
  color: var(--color-primary);
  font-size: 1.2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.7rem 2.3rem;
  border: 1px solid #ccc;
  border-radius: 7px;
  outline: none;
}

@media (max-width: 758px) {
  .floating-search.is-focused {
    position: fixed;
    top: env(safe-area-inset-top, 0);
    left: 0;
    right: 0;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  .search-bar input {
    width: 90%;
  }
}
</style>
