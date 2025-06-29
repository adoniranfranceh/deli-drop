<script setup>
import { computed, onMounted, watch } from 'vue'
import ModifierListBase from '@/components/modifier/ModifierListBase.vue'
import { useProductSelectionStore } from '@/stores/useProductSelectionStore'

const props = defineProps({
  modifier_group: { type: Object, required: true },
  selectedModifiers: {
    type: Array,
    default: () => []
  }
})

const productSelectionStore = useProductSelectionStore()

const selectedId = computed(() => {
  const group = productSelectionStore.selectedModifiers.find(m => m.id === props.modifier_group.id)
  return group?.selected?.[0]?.id || null
})

function toggle(item) {
  const isAlreadySelected = selectedId.value === item.id
  const newSelection = isAlreadySelected ? [] : [item]

  productSelectionStore.updateModifierSelection(
    props.modifier_group.id,
    newSelection,
    props.modifier_group.min ?? 0,
    props.modifier_group.max ?? 1
  )
}

function isSelected(item) {
  return selectedId.value === item.id
}

function faded(item) {
  return selectedId.value !== null && selectedId.value !== item.id
}

function getBasePrice(item) {
  return item.base_price || 0
}

function registerModifierGroup() {
  productSelectionStore.updateModifierSelection(
    props.modifier_group.id,
    [],
    props.modifier_group.min ?? 0,
    props.modifier_group.max ?? 1
  )
}

onMounted(() => registerModifierGroup())

watch(
  () => props.selectedModifiers,
  (newVal) => {
    const group = newVal.find(m => m.id === props.modifier_group.id)
    const selected = group?.selected || []
    productSelectionStore.updateModifierSelection(
      props.modifier_group.id,
      selected,
      props.modifier_group.min ?? 0,
      props.modifier_group.max ?? 1
    )
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <ModifierListBase
    :modifier_group="modifier_group"
    :totalSelected="selectedId ? 1 : 0"
    :isSelected="isSelected"
    :faded="faded"
    :toggle="toggle"
    :getBasePrice="getBasePrice"
    :multiple="false"
    :isRadio="true"
  />
</template>
