<template>
  <BaseModal
    @close="closeModal"
    :style="{ '--color-product-modal' : restaurantColor }"
  >
    <div>
      <div class="relative">
        <CloseButton @close="$emit('close')" />

        <img :src="product.image" :alt="product.name" class="w-full h-[400px] block object-cover max-[768px]:h-[35vh]" />
      </div>

      <div class="p-6 max-[768px]:px-4 max-[768px]:py-8">
        <div class="flex justify-between items-center max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-2">
          <h2 class="text-[var(--color-product-modal)] text-2xl mb-0">{{ product.name }}</h2>
          <div class="text-[1.8rem] font-bold leading-9">{{ FloatToMoney(finalPrice) }}</div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <p class="text-base text-text-subtle mb-4">{{ product.description }}</p>
            <RatingProduct v-if="product.rating" :rating="product.rating" />
          </div>
          <DeliveryDuration :duration="product.duration" />
        </div>

        <hr class="my-6" />

        <ModifierGroup
          v-for="group in product.modifier_groups"
          :key="group.id"
          :modifier_groups="group"
        />

        <ProductIngredients
          v-if="product.ingredients"
          :ingredients="product.ingredients"
        />

        <div class="flex flex-col items-start my-8">
          <label for="comment" class="font-bold">Algum comentário?</label>
          <textarea
            id="comment"
            rows="5"
            placeholder="Ex: sem cebola, sem maionese..."
            v-model="comment"
            class="w-full max-[768px]:w-[97%] border border-border rounded-lg mt-4 resize-none"
          />
        </div>

        <hr class="my-6" />

        <div class="h-4 max-[768px]:h-20 text-center">
          <p
            v-if="!modifiersValid && product.modifier_groups"
            class="text-red-500 text-[0.8rem] m-0"
          >
            Escolha os itens obrigatórios antes de adicionar ao carrinho.
          </p>
        </div>

        <div class="flex items-center justify-between bg-white w-full gap-2 my-6 max-[768px]:fixed max-[768px]:top-[85%] max-[768px]:gap-4 max-[768px]:w-[95%] max-[768px]:pb-[100px] [&>button]:bg-[var(--color-product-modal)] [&>button:hover]:bg-[var(--color-product-modal)] [&>button:hover]:opacity-90">
          <WrapperQuantity v-model="quantity"/>
          <AppButton
            variant="restaurant"
            :text="buttonText"
            iconLeft="ph:shopping-bag-open-thin"
            :disabled="!modifiersValid && product.modifier_groups"
            @click="handleAddToCart"
          />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import WrapperQuantity from '@/components/ui/WrapperQuantity.vue'
import ProductIngredients from '@/components/product/ProductIngredients.vue'
import AppButton from '@/components/ui/AppButton.vue'
import RatingProduct from '@/components/ui/RatingProduct.vue'
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue'
import ModifierGroup from '@/components/modifier/ModifierGroup.vue'
import { FloatToMoney } from '@/utils/money'
import { useUIStore } from '@/stores/uiStore'
import { useTotalPriceStore } from '@/stores/totalPriceStore'
import { useRestaurantStore } from '@/stores/useRestaurantStore'
import { useProductSelectionStore } from '@/stores/productSelectionStore'
import BaseModal from '../modal/BaseModal.vue'

const ui = useUIStore()
const totalStore = useTotalPriceStore()
const restaurantStore = useRestaurantStore()
const productSelectionStore = useProductSelectionStore()

const modifiersValid = computed(() => productSelectionStore.modifiersValid)

const props = defineProps({
  product: Object,
  restaurantColor: String,
  selectedModifiers: { type: Array, default: () => [] },
  cartItemId: { type: String, default: null },
  finalTotalPrice: Number
})

const emit = defineEmits(['add-to-cart', 'close'])

const quantity = ref(props.product.quantity || 1)
const comment = ref('')

const totalPrice = computed(() => totalStore.totalPrice)
const finalPrice = computed(() =>
  (totalPrice.value) * quantity.value
)

watch(
  () => props.product?.id,
  (newId) => {
    if (!newId) return
    totalStore.reset()
    totalStore.setBasePrice(props.product.base_price)

    productSelectionStore.resetSelectedModifiersForProduct(props.product.modifier_groups || [])

    if (props.selectedModifiers && props.selectedModifiers.length) {
      loadSelectedModifiers()
    }

    comment.value = props.product.comment || ''
    quantity.value = props.product.quantity || 1
  },
  { immediate: true }
)


watch(quantity, (qty) => {
  if (totalStore.productQuantity !== qty) {
    totalStore.setQuantity(qty)
    totalStore.setBasePrice(props.product.base_price)
  }
})

onMounted(() => {
  setupModal()
  hydrateModifierGroups()
  loadSelectedModifiers()
})

onUnmounted(() => ui.closeModal())

function setupModal() {
  ui.openModal()
  const justExtraPrice = props.finalTotalPrice - props.product.base_price
  totalStore.addExtraPrice(justExtraPrice || 0)

  totalStore.setBasePrice(props.product.base_price)
  totalStore.setQuantity(quantity.value)
  productSelectionStore.basePrice = props.product.base_price
  comment.value = props.product.comment || ''
}

function hydrateModifierGroups() {
  props.product.modifier_groups?.forEach(group => {
    group.modifiers = group.modifiers.map(item => {
      return {
        ...item,
        ...restaurantStore.getProduct(item)
      }
    })
  })
}

function loadSelectedModifiers() {
  productSelectionStore.reset()

  if (props.selectedModifiers.length) {
    props.selectedModifiers.forEach(mod => {
      productSelectionStore.updateSelection({
        modifierId: mod.id,
        selectedItems: mod.selected,
        min: mod.min ?? 0,
        max: mod.max ?? null
      })
    })
  }
}

const buttonText = computed(() =>
  (props.cartItemId ? 'Atualizar ' : 'Adicionar ') + FloatToMoney(finalPrice.value)
)

function closeModal() {
  emit('close');
  totalStore.reset();
  productSelectionStore.reset()
}

function handleAddToCart() {
  emit('add-to-cart', {
    product: { ...props.product },
    quantity: quantity.value,
    selectedModifiers: productSelectionStore.plainSelectedModifiers,
    comment: comment.value,
    cartItemId: props.cartItemId,
    totalPrice: totalPrice.value
  })

  productSelectionStore.reset()
}
</script>

