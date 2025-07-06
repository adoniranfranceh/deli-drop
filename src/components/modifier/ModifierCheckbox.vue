<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import ModifierListBase from '@/components/modifier/ModifierListBase.vue'

import { useProductSelectionStore } from '@/stores/useProductSelectionStore'

const props = defineProps({
  modifier_group: Object,
  selectedModifiers: {
    type: Array,
    default: () => []
  }
})

const productSelectionStore = useProductSelectionStore()

const selectedIds = computed(() => {
  if (!props.modifier_group) return []
  const mod = productSelectionStore.selectedModifiers.find(m => m.id === props.modifier_group.id)
  return mod?.selected?.map(sel => sel.id) || []
})

function toggle(item) {
  let updatedSelected = [...(productSelectionStore.selectedModifiers.find(m => m.id === props.modifier_group.id)?.selected || [])]

  const index = updatedSelected.findIndex(sel => sel.id === item.id)

  if (index !== -1) {
    updatedSelected.splice(index, 1)
  } else {
    if (typeof props.modifier_group.max === 'number' && selectedIds.value.length >= props.modifier_group.max) return
    updatedSelected.push(item)
  }

  productSelectionStore.updateSelection({
    modifierId: props.modifier_group.id,
    selectedItems: updatedSelected,
    min: props.modifier_group.min,
    max: props.modifier_group.max
  })
}

const getBasePrice = item => item.base_price || 0

const localSelected = ref([])

function registerModifierGroup() {
  productSelectionStore.updateSelection({
    modifierId: props.modifier_group.id,
    selectedItems: [],
    min: props.modifier_group.min,
    max: props.modifier_group.max
  })
}

onMounted(() => registerModifierGroup())

watch(
  () => props.selectedModifiers,
  (newVal) => {
    const group = newVal.find(m => m.id === props.modifier_group.id)
    localSelected.value = group?.selected || []
  },
  { immediate: true, deep: true }
)

const isSelected = item => selectedIds.value.includes(item.id)

const faded = item =>
  !isSelected(item) &&
  typeof props.modifier_group.max === 'number' &&
  selectedIds.value.length >= props.modifier_group.max

</script>

<template>
  <ModifierListBase
    :modifier_group="modifier_group"
    :totalSelected="selectedIds.length"
    :isSelected="isSelected"
    :faded="faded"
    :toggle="toggle"
    :getBasePrice="getBasePrice"
    :multiple="true"
    :isCheckbox="true"
  />
</template>
