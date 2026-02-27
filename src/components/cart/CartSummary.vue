<template>
  <div class="px-6 max-[758px]:pb-4">
    <div class="flex justify-between text-sm text-text-subtle my-4">
      <DeliveryDuration :duration="deliveryDuration" v-if="deliveryDuration"/>
      <div class="flex items-center gap-1.5">
        <Icon icon="tabler:bike" class="w-4 h-4" /> Entrega
      </div>
      <div><LocationRestaurant :location="deliveryAddress" /></div>
    </div>

    <hr />

    <div class="[&>div]:flex [&>div]:justify-between [&>div]:text-[0.95rem] [&>div]:text-text-dark [&>div]:my-3">
      <div>
        <span>Subtotal ({{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }})</span>
        <span>{{ FloatToMoney(subtotal) }}</span>
      </div>
      <div>
        <span>Taxa de entrega</span>
        <span>{{ FloatToMoney(deliveryFee) }}</span>
      </div>
      <div>
        <span>Taxa de serviço</span>
        <span>{{ FloatToMoney(serviceFee) }}</span>
      </div>
      <hr />
      <div>
        <strong>Total</strong>
        <strong>{{ FloatToMoney(subtotal + serviceFee + deliveryFee) }}</strong>
      </div>
    </div>

    <AppButton
      class="flex justify-center w-full my-4"
      variant="cart"
      text="Finalizar pedido"
      iconLeft="si:credit-card-line"
      @click="$emit('checkout')"
    />
    <AppButton
      class="w-full flex justify-center my-4 mb-8 text-text-subtle hover:text-[var(--color-cart)]"
      variant="ghost"
      text="Limpar sacola"
      @click="$emit('clearCart')"
    />
  </div>
</template>

<script setup>
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue'
import LocationRestaurant from '@/components/ui/LocationRestaurant.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { Icon } from '@iconify/vue'
import { FloatToMoney } from '@/utils/money'

defineProps({
  subtotal: Number,
  deliveryFee: Number,
  serviceFee: Number,
  totalItems: Number,
  deliveryDuration: Number,
  deliveryAddress: String
})

defineEmits(['checkout', 'clearCart'])
</script>