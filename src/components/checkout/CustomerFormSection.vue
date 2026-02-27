<template>
  <section class="rounded-xl bg-white shadow-sm border border-border overflow-hidden">
    <div class="flex items-center gap-2 px-5 py-3 border-b border-border">
      <Icon icon="lucide:user" class="w-5 h-5 text-[var(--color-cart)]" />
      <h2 class="text-base font-bold text-text-dark m-0">Seus dados</h2>
    </div>

    <div class="px-5 py-4 flex flex-col gap-4">
      <div>
        <label class="block text-sm font-medium text-text-dark mb-1.5">
          Nome <span class="text-error">*</span>
        </label>
        <input
          type="text"
          :value="modelValue.name"
          @input="update('name', $event.target.value)"
          placeholder="Seu nome completo"
          class="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-text-dark mb-1.5">
          Telefone <span class="text-error">*</span>
        </label>
        <input
          type="tel"
          :value="modelValue.phone"
          @input="handlePhoneInput($event.target.value)"
          placeholder="(00) 00000-0000"
          maxlength="15"
          class="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-cart)] focus:shadow-sm transition-all"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { phoneMask } from '@/utils/checkout'

const props = defineProps({
  modelValue: { type: Object, required: true }
})

const emit = defineEmits(['update:modelValue'])

function update(field, value) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

function handlePhoneInput(value) {
  update('phone', phoneMask(value))
}
</script>
