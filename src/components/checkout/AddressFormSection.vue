<template>
  <section class="rounded-xl bg-white shadow-sm border border-border overflow-hidden">
    <div class="flex items-center gap-2 px-5 py-3 border-b border-border">
      <Icon icon="lucide:map-pin" class="w-5 h-5 text-[var(--color-cart)]" />
      <h2 class="text-base font-bold text-text-dark m-0">Endereço de entrega</h2>
    </div>

    <div class="px-5 py-4 flex flex-col gap-4">
      <div>
        <label class="block text-sm font-medium text-text-dark mb-1.5">
          Endereço <span class="text-error">*</span>
        </label>
        <input
          type="text"
          :value="modelValue.address"
          @input="update('address', $event.target.value)"
          placeholder="Rua, número"
          class="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
        />
      </div>

      <div class="grid grid-cols-2 gap-3 max-[758px]:grid-cols-1">
        <div>
          <label class="block text-sm font-medium text-text-dark mb-1.5">Complemento</label>
          <input
            type="text"
            :value="modelValue.complement"
            @input="update('complement', $event.target.value)"
            placeholder="Apto, bloco..."
            class="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-text-dark mb-1.5">
            Bairro <span class="text-error">*</span>
          </label>
          <input
            type="text"
            :value="modelValue.neighborhood"
            @input="update('neighborhood', $event.target.value)"
            placeholder="Bairro"
            class="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-text-dark mb-1.5">Referência</label>
        <input
          type="text"
          :value="modelValue.reference"
          @input="update('reference', $event.target.value)"
          placeholder="Próximo a..."
          class="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  modelValue: { type: Object, required: true }
})

const emit = defineEmits(['update:modelValue'])

function update(field, value) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>
