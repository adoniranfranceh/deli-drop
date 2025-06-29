<script setup>
import { ref, watch, onMounted } from 'vue'
import ModifierCheckbox from './ModifierCheckbox.vue'
import ModifierRadio from './ModifierRadio.vue'
import ModifierQuantity from './ModifierQuantity.vue'
import { useProductSelectionStore } from '@/stores/useProductSelectionStore'

const productSelectionStore = useProductSelectionStore()

const props = defineProps({
  modifier_group: {
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
  const mod = productSelectionStore.selectedModifiers.find(m => m.id === props.modifier_group.id)
  localValue.value = mod ? mod.selected : []
}

onMounted(updateLocalValue)

watch(
  () => productSelectionStore.selectedModifiers,
  updateLocalValue,
  { deep: true }
)

watch(localValue, (newSelected) => {
  productSelectionStore.updateModifierSelection(
    props.modifier_group.id,
    newSelected,
    props.modifier_group.min,
    props.modifier_group.max
  )
})
</script>

<template>
  <div>
    <component
      :is="componentMap[modifier_group.input_type]"
      :modifier_group="modifier_group"
    />
  </div>
</template>
