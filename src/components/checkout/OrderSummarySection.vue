<template>
  <section class="rounded-xl bg-white shadow-sm border border-border overflow-hidden">
    <div class="flex items-center justify-between px-5 py-3 border-b border-border">
      <div class="flex items-center gap-2">
        <Icon icon="lucide:shopping-bag" class="w-5 h-5" :style="{ color: restaurantColor }" />
        <h2 class="text-base font-bold text-text-dark m-0">
          Resumo
          <span class="font-normal text-text-subtle text-sm ml-1">
            ({{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }})
          </span>
        </h2>
      </div>
      <button
        class="flex items-center gap-1 text-sm font-semibold bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
        :style="{ color: restaurantColor }"
        @click="$emit('edit-cart')"
      >
        <Icon icon="lucide:pencil" class="w-3.5 h-3.5" />
        Editar
      </button>
    </div>

    <div class="px-5 py-3 flex flex-col gap-3">
      <div
        v-for="item in cartItems"
        :key="item.cartItemId"
        class="flex items-start gap-3"
      >
        <img
          :src="item.image"
          alt=""
          class="w-14 h-14 max-[758px]:w-11 max-[758px]:h-11 rounded-lg object-cover shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm text-text-dark truncate m-0">{{ item.name }}</p>
          <div
            v-for="mod in item.selectedModifiers"
            :key="mod.id"
            class="text-xs text-text-subtle leading-relaxed"
          >
            <template v-if="mod.selected?.quantities">
              <span v-for="(val, key) in mod.selected.quantities" :key="key" class="block ml-2">
                {{ val.quantity }}x {{ val.item.name }}
              </span>
            </template>
            <template v-else-if="Array.isArray(mod.selected)">
              <span v-for="sel in mod.selected" :key="sel.id" class="block ml-2">
                {{ sel.name }}
              </span>
            </template>
          </div>
        </div>
        <div class="text-right shrink-0">
          <span class="text-xs text-text-subtle">{{ item.quantity }}x</span>
          <p class="text-sm font-bold text-text-dark m-0">{{ FloatToMoney(item.totalPrice * item.quantity) }}</p>
        </div>
      </div>
    </div>

    <div class="px-5 py-3 bg-surface border-t border-border">
      <div class="flex justify-between text-sm text-text-subtle mb-1.5">
        <span>Subtotal</span>
        <span>{{ FloatToMoney(subtotal) }}</span>
      </div>
      <div class="flex justify-between text-sm text-text-subtle mb-2">
        <span class="flex items-center gap-1">
          <Icon icon="tabler:bike" class="w-3.5 h-3.5" />
          Taxa de entrega
        </span>
        <span>{{ FloatToMoney(deliveryFee) }}</span>
      </div>
      <div class="flex justify-between font-bold text-text-dark pt-2 border-t border-border">
        <span>Total</span>
        <span class="text-lg">{{ FloatToMoney(subtotal + deliveryFee) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { FloatToMoney } from '@/utils/money'

defineProps({
  cartItems: { type: Array, required: true },
  subtotal: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  deliveryFee: { type: Number, default: 500 },
  restaurantColor: { type: String, default: '#E53935' }
})

defineEmits(['edit-cart'])
</script>
