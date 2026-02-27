<template>
  <div
    class="sticky top-[env(safe-area-inset-top,0)] z-[1000] overflow-x-auto bg-white p-4 border-b border-border transition-all duration-200"
    :class="{ 'max-md:fixed max-md:inset-x-0 max-md:shadow-md': isFocused }"
  >
    <div class="bg-white flex items-center gap-2 relative">
      <Icon
        class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-icon-muted text-xl"
        icon="fluent:search-32-regular"
      />
      <input
        type="text"
        class="w-full max-md:w-[90%] py-3 px-10 border border-input-border rounded-lg outline-none"
        :placeholder="placeholder"
        :value="modelValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <Icon
        v-if="modelValue"
        class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-primary text-xl"
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
