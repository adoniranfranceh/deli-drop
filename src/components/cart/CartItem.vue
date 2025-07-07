<template>
  <div class="cart-item" @click="emitEdit" @keydown.enter="emitEdit">
    <div class="item-info">
      <div class="wrapper-info">
        <img :src="item.image" alt="" class="item-image" />
        <div class="header-item">
          <strong class="item-name">{{ item.name }}</strong>
          <div v-for="selectedModifier in item.selectedModifiers" :key="selectedModifier.id" class="modifier-group">
            <ul v-if="selectedModifier.selected.quantities">
              <li v-for="(value, key) in selectedModifier.selected.quantities" :key="key">
                {{ value.quantity }}x {{ value.item.name }}
              </li>
            </ul>

            <ul v-else>
              <li v-for="selected in selectedModifier.selected" :key="selected.id">
                {{ selected.name }}
              </li>
            </ul>
          </div>

          <WrapperQuantity
            class="wrapper-quantity"
            v-model="localQuantity"
            @update:modelValue="onQuantityChange"
            :noLabel="true"
          />
        </div>
      </div>
    </div>
    <div class="wrapper-price">
      <Icon
        icon="streamline-ultimate:bin-1"
        class="remove-btn"
        @click.stop="handleRemoveItem"
        tabindex="0"
        aria-label="Remover item"
        @keydown.enter.stop="handleRemoveItem"
      />
      <div class="price-info">
        <div class="price">{{ FloatToMoney(item.totalPrice * localQuantity) }}</div>
        <small>{{ FloatToMoney(item.base_price) }} cada</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import WrapperQuantity from '@/components/ui/WrapperQuantity.vue'
import { useCartStore } from '@/stores/cartStore'
import { Icon } from '@iconify/vue'
import { FloatToMoney } from '@/utils/money'

const cartStore = useCartStore()

const props = defineProps({
  item: Object
})
const emit = defineEmits(['edit', 'remove', 'quantityChange'])

const localQuantity = ref(props.item.quantity)

watch(() => props.item.quantity, val => {
  localQuantity.value = val
})

function emitEdit() {
  emit('edit', props.item)
}

function handleRemoveItem() {
  cartStore.removeItem(props.item.cartItemId)
}

function onQuantityChange(val) {
  emit('quantityChange', props.item.id, val)
}
</script>

<style scoped>
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

.cart-item:hover {
  box-shadow: var(--shadow-md);

  .item-image {
    width: 75px;
    height: 75px;
  }
}

.item-info {
  display: flex;
  flex-direction: column;
}

.wrapper-info {
  display: flex;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  margin-right: 1rem;
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

.remove-btn {
  color: var(--color-cart);
  cursor: pointer;
  transition: color 0.2s;
  height: 18px;
  width: 18px;
}

.remove-btn:hover {
  color: var(--color-cart);
  opacity: 0.9;
}

.price-info {
  text-align: right;
  min-width: 80px;
}

.price {
  font-weight: 700;
  color: #222;
}

.modifier-group {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.modifier-group ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.modifier-group li {
  margin-left: 1rem;
  line-height: 1.2;
}

@media (max-width: 758px) {
  .item-image {
    width: 60px;
    height: 60px;
  }
}
</style>