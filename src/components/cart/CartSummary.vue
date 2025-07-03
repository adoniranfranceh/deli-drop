<template>
  <div class="wrapper-delivery">
    <div class="delivery-info">
      <DeliveryDuration :duration="deliveryDuration" />
      <div class="bike-delivery">
        <Icon icon="tabler:bike" style="height: 16px; width: 16px;" /> Entrega
      </div>
      <div><LocationRestaurant :location="deliveryAddress" /></div>
    </div>

    <hr />

    <div class="cost-summary">
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
      <div class="total">
        <strong>Total</strong>
        <strong>{{ FloatToMoney(subtotal + serviceFee + deliveryFee) }}</strong>
      </div>
    </div>

    <AppButton
      class="checkout-btn"
      text="Finalizar pedido"
      iconLeft="si:credit-card-line"
      @click="$emit('checkout')"
    />
    <AppButton
      class="clear-cart-btn"
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

<style scoped>
.wrapper-delivery {
  padding: 0 1.5rem;
}

.delivery-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #555;
  margin: 1rem 0;
}

.bike-delivery {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cost-summary > div {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #222;
  margin: 0.7rem 0;
}

.checkout-btn {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem 0;
  background: var(--color-cart);
}

.checkout-btn:hover {
  background: var(--color-cart);
  opacity: 0.9;
}

.clear-cart-btn {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 0.9rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0 2rem;
}

.clear-cart-btn:hover {
  color: var(--color-cart);
  background-color: var(--color-white);
}

@media (max-width: 758px) {
  .wrapper-delivery {
    padding-bottom: 1rem;
  }

  .checkout-btn,
  .clear-cart-btn {
    font-size: 0.95rem;
  }
}
</style>