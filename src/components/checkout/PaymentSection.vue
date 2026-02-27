<template>
  <section class="rounded-xl bg-white shadow-sm border border-border overflow-hidden">
    <div class="flex items-center gap-2 px-5 py-3 border-b border-border">
      <Icon icon="lucide:wallet" class="w-5 h-5 text-[var(--color-cart)]" />
      <h2 class="text-base font-bold text-text-dark m-0">Pagamento</h2>
    </div>

    <div class="px-5 py-4">
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="select('pix')"
          :class="[
            'flex flex-col items-center justify-center gap-2 py-5 rounded-xl border-2 cursor-pointer transition-all bg-white',
            modelValue === 'pix'
              ? 'border-[var(--color-cart)] shadow-md scale-[1.02]'
              : 'border-border hover:border-[var(--color-cart)] hover:shadow-sm'
          ]"
        >
          <Icon icon="ic:baseline-pix" class="w-8 h-8 text-[var(--color-cart)]" />
          <span class="text-sm font-semibold text-text-dark">Pix</span>
        </button>

        <button
          @click="select('cash')"
          :class="[
            'flex flex-col items-center justify-center gap-2 py-5 rounded-xl border-2 cursor-pointer transition-all bg-white',
            modelValue === 'cash'
              ? 'border-[var(--color-cart)] shadow-md scale-[1.02]'
              : 'border-border hover:border-[var(--color-cart)] hover:shadow-sm'
          ]"
        >
          <Icon icon="mdi:cash-multiple" class="w-8 h-8 text-[var(--color-cart)]" />
          <span class="text-sm font-semibold text-text-dark">Dinheiro</span>
        </button>
      </div>

      <div v-if="modelValue === 'cash'" class="mt-4">
        <label class="block text-sm font-medium text-text-dark mb-1.5">Troco para</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-subtle">R$</span>
          <input
            type="number"
            :value="changeFor"
            @input="$emit('update:changeFor', Number($event.target.value))"
            placeholder="0,00"
            min="0"
            step="0.01"
            class="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
          />
        </div>
        <p class="text-xs text-text-subtle mt-1.5">Deixe vazio se não precisar de troco</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  modelValue: { type: String, required: true },
  changeFor: { type: Number, default: 0 }
})

const emit = defineEmits(['update:modelValue', 'update:changeFor'])

function select(method) {
  emit('update:modelValue', method)
}
</script>
