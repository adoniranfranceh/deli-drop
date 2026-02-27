<script setup>
import { computed } from 'vue'
import { useTotalPriceStore } from '@/stores/totalPriceStore'
import { FloatToMoney } from '@/utils/money'
import WrapperQuantity from '@/components/ui/WrapperQuantity.vue'
import ModifierHeader from '@/components/ui/ModifierHeader.vue'
import { useProductSelectionStore } from '../../stores/productSelectionStore'

const productSelectionStore = useProductSelectionStore()

const props = defineProps({
  modifier_groups: { type: Object, required: true }
})

const totalStore = useTotalPriceStore()

const getBasePrice = item => item?.base_price || 0

const selectedGroup = computed(() => {
  return productSelectionStore.selectedModifiers.find(m => m.id === props.modifier_groups.id)
})

const quantities = computed({
  get() {
    return selectedGroup.value?.selected?.quantities || {}
  },
  set(newQuantities) {
    productSelectionStore.updateSelection({
      modifierId: props.modifier_groups.id,
      selectedItems: { quantities: { ...newQuantities } },
      min: props.modifier_groups.min,
      max: props.modifier_groups.max
    })
  }
})

const totalSelected = computed(() => {
  return Object.values(quantities.value).reduce((sum, entry) => sum + (entry?.quantity || 0), 0)
})

const incrementQuantity = (item) => {
  productSelectionStore.incrementQuantity(
    props.modifier_groups.id,
    item,
    {
      constraints: {
        min: props.modifier_groups.min,
        max: props.modifier_groups.max
      }
    }
  )

  const total = totalSelected.value
  if (total > props.modifier_groups.free_limit) {
    totalStore.addExtraPrice(getBasePrice(item))
  }
}

const decrementQuantity = (item) => {
  const total = totalSelected.value
  productSelectionStore.decrementQuantity(
    props.modifier_groups.id,
    item,
    {
      constraints: {
        min: props.modifier_groups.min,
        max: props.modifier_groups.max
      }
    }
  )

  if (total >= props.modifier_groups.free_limit) {
    totalStore.removeExtraPrice(getBasePrice(item))
  }
}

const reachedMax = computed(() =>
  props.modifier_groups.max && totalSelected.value >= props.modifier_groups.max
)

const headerProps = computed(() => ({
  name: props.modifier_groups.name,
  min: props.modifier_groups.min,
  max: props.modifier_groups.max,
  freeLimit: props.modifier_groups.free_limit,
  totalSelected: totalSelected.value
}))

function getPriceLabel(item) {
  if (props.modifier_groups.free_limit === props.modifier_groups.max) return "Grátis"
  if (totalSelected.value >= props.modifier_groups.free_limit) {
    return `+ ${FloatToMoney(getBasePrice(item))}`
  }
  return "Grátis"
}
</script>

<template>
  <ModifierHeader v-bind="headerProps" />
  <ul class="p-0">
    <li
      v-for="item in modifier_groups.modifiers"
      :key="item.id"
      class="grid border-b border-border pt-6 pr-4 pb-2 pl-2"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center h-[50px]">
          <img :src="item.image" :alt="item.name" class="w-10 h-[80%] rounded mr-2" />
          <div class="flex flex-col justify-around h-full">
            {{ item.name }}
            <div class="text-[var(--color-cart,var(--color-restaurant))]">
              {{ getPriceLabel(item) }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
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

