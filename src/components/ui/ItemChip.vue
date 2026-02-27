<template>
  <span class="bg-chip font-semibold text-text py-1.5 px-3 m-0 rounded-full text-sm transition-colors duration-200 shrink-0 hover:bg-chip-hover">
    {{ item }}
  </span>
</template>

<script setup>
defineProps({
  item: {
    type: String,
    required: true
  }
})
</script>
