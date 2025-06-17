<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="wrapper-header">
        <header class="modal-header">
          <h2>
            Sua sacola ({{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'item' : 'itens' }})
          </h2>
          <button class="close-btn" @click="$emit('close')">×</button>
        </header>
        <span class="restaurant-name">
          <Icon icon="material-symbols:circle" style="color: var(--color-cart); margin-right: 0.4rem;" /> {{ cartStore.currentRestaurantInfo?.name }}
        </span>
      </div>

      <hr />

      <div class="cart-info">
        <div class="items">
          <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
            <div class="item-info">
              <div class="wrapper-info">
                <img :src="item.image" alt="" class="item-image" />
                <div class="header-item">
                  <strong class="item-name">{{ item.name }}</strong>
                  <Chip :item="item.category" />
                  <WrapperQuantity
                    class="wrapper-quantity"
                    v-model="item.quantity"
                    @update:modelValue="val => updateQuantity(item.id, val)"
                    :noLabel="true"
                  />
                </div>
              </div>
            </div>
            <div class="wrapper-price">
              <Icon icon="streamline-ultimate:bin-1" class="remove-btn" @click="removeItem(item.id)" />
              <div class="price-info">
                <div class="price">R$ {{ FloatToMoney(item.price * item.quantity) }}</div>
                <small>R$ {{ FloatToMoney(item.price) }} cada</small>
              </div>
            </div>
          </div>
        </div>
        <hr />
  
  
        <div class="wrapper-delivery">
          <div class="delivery-info">
            <DeliveryDuration :duration="cartStore.currentRestaurantInfo?.deliveryDuration" />
            <div class="bike-delivery"><Icon icon="tabler:bike" style="height: 16px; width: 16px;" /> Entrega</div>
            <div><Location :location="deliveryAddress" /></div>
          </div>
  
          <hr />
    
          <div class="cost-summary">
            <div>
              <span>Subtotal ({{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'item' : 'itens' }})</span>
              <span>R$ {{ FloatToMoney(cartStore.subtotal) }}</span>
            </div>
            <div>
              <span>Taxa de entrega</span>
              <span>R$ {{ FloatToMoney(deliveryFee) }}</span>
            </div>
            <div>
              <span>Taxa de serviço</span>
              <span>R$ {{ FloatToMoney(serviceFee) }}</span>
            </div>
            <hr />
            <div class="total">
              <strong>Total</strong>
              <strong>R$ {{ FloatToMoney(cartStore.subtotal + serviceFee + deliveryFee) }}</strong>
            </div>
          </div>
          <Button 
            class="checkout-btn"
            text="Finalizar pedido"
            iconLeft="si:credit-card-line"
          />
          <Button 
            @click="clearCart"
            class="clear-cart-btn"
            text="Limpar sacola"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import WrapperQuantity from './WrapperQuantity.vue'
import { FloatToMoney } from '../utils/money'
import Chip from './ui/Chip.vue'
import { Icon } from '@iconify/vue'
import Button from './ui/Button.vue'
import DeliveryDuration from './ui/DeliveryDuration.vue'
import Location from './ui/Location.vue'
import { useUIStore } from '@/stores/uiStore'

const cartStore = useCartStore()

const {
  removeItem,
  clearCart,
  updateQuantity
} = cartStore

const props = defineProps({
  deliveryAddress: {
    type: String,
    default: 'Rua das Flores, 123'
  },
  deliveryFee: {
    type: Number,
    default: 4.99
  },
  serviceFee: {
    type: Number,
    default: 0.45
  }
})

const emit = defineEmits(['close', 'checkout'])


const ui = useUIStore()

onMounted(() => {
  ui.openModal()
})

onUnmounted(() => {
  ui.closeModal()
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 850px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
}

.wrapper-header {
  margin: 1rem 1.5rem;
}

.wrapper-info {
  display: flex;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-weight: 700;
  font-size: 1.4rem;
  margin: 0;
}

hr {
  border-top: 1px solid var(--color-border);
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}


.close-btn {
  font-size: 1.5rem;
  background: transparent;
  cursor: pointer;
  color: #555;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #b94a48;
}

.restaurant-name {
  font-weight: 100;
  line-height: 20px;
  color: rgb(101, 109, 121);
}

.header-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cart-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.items {
  max-height: 400px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.04),
    0 4px 6px rgba(0, 0, 0, 0.03);
  justify-content: space-between;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  margin-right: 1rem;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  color: var(--color-cart);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.wrapper-quantity {
  padding: 2rem 0 0;
}

.wrapper-price {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100px;
}

.price-info {
  text-align: right;
  min-width: 80px;
}

.price {
  font-weight: 700;
  color: #222;
}

.remove-btn {
  color: var(--color-cart);
  cursor: pointer;
  transition: color 0.2s;
  height: 18px;
  width: 18px;
}

.remove-btn:hover {
  color: var(--color-cart-hover);
}

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

.total {
  display: flex;
  justify-content: space-between;
  
  strong {
    font-weight: 800;
    font-size: 1.1rem;
  }
}

.checkout-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.checkout-btn {
  background: var(--color-cart);
}

.checkout-btn:hover {
  background: var(--color-cart-hover);
}

.clear-cart-btn {
  background: none;
  border: none;
  color: #555;
  margin-top: 0.5rem;
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

@media (max-width: 768px) {
  .modal-content {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    margin: 0;
    overflow-y: auto;
  }

  .items {
    max-height: 100%;
    overflow-y: unset;
  }

  .cart-info {
    overflow: unset;
  }

  .wrapper-delivery {
    padding-bottom: 1rem;
  }

  .modal-header h2 {
    font-size: 1.1rem;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }

  .checkout-btn,
  .clear-cart-btn {
    font-size: 0.95rem;
  }
}
</style>
