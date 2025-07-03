<script setup>
import { computed } from 'vue'
import { useTotalPriceStore } from '@/stores/totalPriceStore'
import { FloatToMoney } from '@/utils/money'
import WrapperQuantity from '@/components/ui/WrapperQuantity.vue'
import ModifierHeader from '@/components/ui/ModifierHeader.vue'
import { useProductSelectionStore } from '../../stores/useProductSelectionStore'

const productSelectionStore = useProductSelectionStore()

const props = defineProps({
  modifier_group: { type: Object, required: true }
})

const totalStore = useTotalPriceStore()

const getBasePrice = item => item?.base_price || 0

const selectedGroup = computed(() => {
  return productSelectionStore.selectedModifiers.find(m => m.id === props.modifier_group.id)
})

const quantities = computed({
  get() {
    return selectedGroup.value?.selected?.quantities || {}
  },
  set(newQuantities) {
    productSelectionStore.updateModifierSelection(
      props.modifier_group.id,
      { quantities: { ...newQuantities } },
      props.modifier_group.min,
      props.modifier_group.max
    )
  }
})

const totalSelected = computed(() => {
  return Object.values(quantities.value).reduce((sum, entry) => sum + (entry?.quantity || 0), 0)
})

const incrementQuantity = (item) => {
  productSelectionStore.incrementQuantity(
    props.modifier_group.id,
    item,
    props.modifier_group.min,
    props.modifier_group.max
  )

  const total = totalSelected.value
  if (total > props.modifier_group.free_limit) {
    totalStore.addExtraPrice(getBasePrice(item))
  }
}

const decrementQuantity = (item) => {
  const total = totalSelected.value
  productSelectionStore.decrementQuantity(
    props.modifier_group.id,
    item.id,
    props.modifier_group.min,
    props.modifier_group.max
  )

  if (total >= props.modifier_group.free_limit) {
    totalStore.removeExtraPrice(getBasePrice(item))
  }
}

const reachedMax = computed(() =>
  props.modifier_group.max && totalSelected.value >= props.modifier_group.max
)

const headerProps = computed(() => ({
  name: props.modifier_group.name,
  min: props.modifier_group.min,
  max: props.modifier_group.max,
  freeLimit: props.modifier_group.free_limit,
  totalSelected: totalSelected.value
}))

function getPriceLabel(item) {
  if (props.modifier_group.free_limit === props.modifier_group.max) return "Grátis"
  if (totalSelected.value >= props.modifier_group.free_limit) {
    return `+ ${FloatToMoney(getBasePrice(item))}`
  }
  return "Grátis"
}
</script>

<template>
  <ModifierHeader v-bind="headerProps" />
  <ul class="modifiers">
    <li
      v-for="item in modifier_group.modifiers"
      :key="item.id"
      class="modifiers-options"
    >
      <div class="content-option">
        <div class="item-details">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-info">
            {{ item.name }}
            <div class="free-modifier">
              {{ getPriceLabel(item) }} 
            </div>
          </div>
        </div>

        <div class="quantity-controls">
          <WrapperQuantity
            :modelValue="quantities[item.id]?.quantity ?? 0"
            @plus="() => incrementQuantity(item)"
            @minus="() => decrementQuantity(item)"
            :noLabel="true"
            :min="0"
            :disablePlus="reachedMax"
            :justPlus="(quantities[item.id]?.quantity ?? 0) <= 0"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.header-modifier {
  background: rgb(249, 250, 251);
  padding: 1rem;
}

.modifier-chip {
  background-color: var(--color-product-modal);
  color: var(--color-white);
}

.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}

.header-info {
  display: flex;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  
  p {
    margin: 0;
    margin-right: 0.2rem;
  }
}

.modifier-free {
  margin-top: 0.5rem;
  color: var(--color-success);
  font-weight: 600;
}


.modifiers {
  padding: 0;
}

.modifiers-options {
  display: grid;
  border-bottom: 1px solid var(--color-border);
  padding: 1.5rem 1rem 0.5rem 0.5rem;
}

.content-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-details {
  display: flex;
  align-items: center;
  height: 50px;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.item-image {
  width: 2.5rem;
  height: 80%;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}

.free-modifier {
  color: var(--color-cart, var(--color-restaurant));
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  background-color: #eee;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.chip-maxed {
  background-color: #f87171;
}
</style>
