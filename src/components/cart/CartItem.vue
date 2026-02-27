<template>
  <div
    class="flex items-center rounded-xl p-4 m-4 shadow-sm cursor-pointer hover:shadow-md group"
    @click="emitEdit"
    @keydown.enter="emitEdit"
  >
    <div class="flex flex-1 min-w-0 overflow-hidden">
      <img
        :src="item.image"
        alt=""
        class="w-[70px] h-[70px] max-[758px]:w-[60px] max-[758px]:h-[60px] object-cover rounded-lg shrink-0 mr-4 transition-all group-hover:w-[75px] group-hover:h-[75px]"
      />
      <div class="flex-1 min-w-0 overflow-hidden">
        <strong class="text-[var(--color-cart)] font-bold mb-2 block truncate">{{ item.name }}</strong>
        <div
          v-for="selectedModifier in item.selectedModifiers"
          :key="selectedModifier.id"
          class="mb-2 text-sm text-text-subtle"
        >
          <ul v-if="selectedModifier.selected.quantities" class="list-none p-0 m-0">
            <li v-for="(value, key) in selectedModifier.selected.quantities" :key="key" class="ml-4 leading-tight truncate">
              {{ value.quantity }}x {{ value.item.name }}
            </li>
          </ul>

          <ul v-else class="list-none p-0 m-0">
            <li v-for="selected in selectedModifier.selected" :key="selected.id" class="ml-4 leading-tight truncate">
              {{ selected.name }}
            </li>
          </ul>
        </div>

        <WrapperQuantity
          class="pt-4 !p-0 !justify-start"
          v-model="localQuantity"
          @update:modelValue="onQuantityChange"
          :noLabel="true"
        />
      </div>
    </div>
    <div class="flex flex-col justify-between items-end h-[100px] shrink-0 ml-4">
      <Icon
        icon="streamline-ultimate:bin-1"
        class="text-[var(--color-cart)] cursor-pointer transition-opacity w-[18px] h-[18px] hover:opacity-70"
        @click.stop="handleRemoveItem"
        tabindex="0"
        aria-label="Remover item"
        @keydown.enter.stop="handleRemoveItem"
      />
      <div class="text-right min-w-[80px]">
        <div class="font-bold text-text-dark">{{ FloatToMoney(item.totalPrice * localQuantity) }}</div>
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