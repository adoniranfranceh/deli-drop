<template>
  <h3 class="font-semibold text-gray-600">FILTROS</h3>
  <div class="flex flex-wrap gap-2 my-4 mb-8 justify-start">
    <AppButton
      v-for="(value, key) in categories"
      :key="key"
      :iconLeft="value"
      :variant="selected === key ? 'primary' : 'secondary'"
      @click="$emit('update:selected', key)"
      :text="key"
    />
  </div>
</template>

<script setup>
import AppButton from '@/components/ui/AppButton.vue';

defineProps({
  categories: Object,
  selected: String
})

defineEmits(['update:selected'])
</script>
