<template>
  <section class="rounded-xl bg-white shadow-sm border border-border overflow-hidden">
    <div class="flex items-center gap-2 px-5 py-3 border-b border-border">
      <Icon icon="lucide:message-square" class="w-5 h-5 text-[var(--color-cart)]" />
      <h2 class="text-base font-bold text-text-dark m-0">Observações</h2>
    </div>

    <div class="px-5 py-4">
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Alguma observação para o restaurante?"
        rows="3"
        class="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white resize-none focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
      />
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  modelValue: { type: String, default: '' }
})

defineEmits(['update:modelValue'])
</script>
