<script setup>
import { ref, watch, onMounted } from 'vue'
import ModifierCheckbox from './ModifierCheckbox.vue'
import ModifierRadio from './ModifierRadio.vue'
import ModifierQuantity from './ModifierQuantity.vue'
import { useProductSelectionStore } from '@/stores/productSelectionStore'

const productSelectionStore = useProductSelectionStore()

const props = defineProps({
  modifier_groups: {
    type: Object,
    required: true
  }
})

const componentMap = {
  checkbox: ModifierCheckbox,
  radio: ModifierRadio,
  quantity: ModifierQuantity
}

const localValue = ref([])

function updateLocalValue() {
  const mod = productSelectionStore.selectedModifiers.find(m => m.id === props.modifier_groups.id)
  localValue.value = mod ? mod.selected : []
}

onMounted(updateLocalValue)

watch(
  () => productSelectionStore.selectedModifiers,
  updateLocalValue,
  { deep: true }
)

watch(localValue, (newSelected) => {
  productSelectionStore.updateSelection({
    modifierId: props.modifier_groups.id,
    selectedItems: newSelected,
    min: props.modifier_groups.min,
    max: props.modifier_groups.max
  })
})
</script>

<template>
  <div>
    <component
      :is="componentMap[modifier_groups.input_type]"
      :modifier_groups="modifier_groups"
    />
  </div>
</template>
