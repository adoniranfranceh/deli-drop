<template>
  <div class="flex items-center justify-between w-full py-4">
    <div
      v-for="(step, index) in steps"
      :key="step.key"
      class="flex flex-col items-center flex-1 relative"
    >
      <div class="flex items-center w-full">
        <div
          v-if="index > 0"
          :class="[
            'h-0.5 flex-1',
            currentIndex >= index ? 'bg-[var(--color-cart)]' : 'bg-[var(--color-border)]'
          ]"
        />
        <div
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all',
            currentIndex > index
              ? 'bg-[var(--color-cart)] text-white'
              : currentIndex === index
                ? 'bg-[var(--color-cart)] text-white animate-pulse'
                : 'bg-[var(--color-border)] text-text-subtle'
          ]"
        >
          <Icon
            v-if="currentIndex > index"
            icon="lucide:check"
            class="w-4 h-4"
          />
          <Icon
            v-else
            :icon="step.icon"
            class="w-4 h-4"
          />
        </div>
        <div
          v-if="index < steps.length - 1"
          :class="[
            'h-0.5 flex-1',
            currentIndex > index ? 'bg-[var(--color-cart)]' : 'bg-[var(--color-border)]'
          ]"
        />
      </div>
      <span
        :class="[
          'text-[10px] mt-1 text-center leading-tight',
          currentIndex >= index ? 'text-[var(--color-cart)] font-semibold' : 'text-text-subtle'
        ]"
      >
        {{ step.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  status: { type: String, required: true }
})

const steps = [
  { key: 'pending', label: 'Pendente', icon: 'lucide:clock' },
  { key: 'confirmed', label: 'Confirmado', icon: 'lucide:check-circle' },
  { key: 'preparing', label: 'Preparando', icon: 'lucide:chef-hat' },
  { key: 'ready', label: 'Pronto', icon: 'lucide:package-check' },
  { key: 'out_for_delivery', label: 'Entrega', icon: 'lucide:bike' },
  { key: 'delivered', label: 'Entregue', icon: 'lucide:house' }
]

const currentIndex = computed(() => {
  const idx = steps.findIndex(s => s.key === props.status)
  return idx >= 0 ? idx : 0
})
</script>
