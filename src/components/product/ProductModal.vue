<template>
  <BaseModal @close="closeModal" :style="{ '--color-product-modal': restaurantColor }">
    <div class="image-wrapper">
      <CloseButton @close="$emit('close')" />

      <img :src="product.image" :alt="product.name" class="modal-image" />
    </div>

    <div class="product-details">
      <div class="about-product">
        <h2>{{ product.name }}</h2>
        <div class="product-price">{{ FloatToMoney(finalPrice) }}</div>
      </div>

      <div class="info">
        <div class="header-wrapper">
          <p>{{ product.description }}</p>
          <RatingProduct v-if="product.rating" :rating="product.rating" />
        </div>
        <DeliveryDuration :duration="product.duration" />
      </div>

      <hr />

      <ModifierGroup
        v-for="group in product.modifier_groups"
        :key="group.id"
        :modifier_groups="group"
      />

      <ProductIngredients
        v-if="product.ingredients"
        :ingredients="product.ingredients"
      />

      <div class="comment-content">
        <label for="comment">Algum comentário?</label>
        <textarea
          id="comment"
          rows="5"
          placeholder="Ex: sem cebola, sem maionese..."
          v-model="comment"
        />
      </div>

      <hr />

      <div class="invalid-min">
        <p
          v-if="!modifiersValid && product.modifier_groups"
          style="color: red; font-size: 0.8rem; margin: 0;"
        >
          Escolha os itens obrigatórios antes de adicionar ao carrinho.
        </p>
      </div>

      <div class="add-wrapper">
        <WrapperQuantity v-model="quantity"/>
        <AppButton
          class="add-btn"
          :text="buttonText"
          iconLeft="ph:shopping-bag-open-thin"
          :disabled="!modifiersValid && product.modifier_groups"
          @click="handleAddToCart"
        />
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

<style scoped>
.modal-content h2 {
  color: var(--color-product-modal);
  font-size: 1.5rem;
  margin-bottom: 0;
}

.modal-content p {
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-bottom: 1rem;
}

.product-details {
  padding: 1.5rem;
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.image-wrapper {
  height: 40%;
  position: relative;
}

.restaurant-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: var(--color-white);
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0;
}

.comment-content label {
  font-weight: 700;
}

.comment-content textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-top: 1rem;
  resize: none;
}

.invalid-min {
  height: 1rem;
}

.add-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-white);
  width: 100%;
  gap: 0.5rem;
  margin: 1.5rem 0;

  button {
    background: var(--color-product-modal);
  }

  button:hover {
    background: var(--color-product-modal);
    opacity: 0.9;
  }
}

.product-price {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.25rem;
}

hr {
  border-top: 1px solid var(--color-border);
  margin: 1.5rem 0;
}


@media (max-width: 768px) {

  .product-details {
    padding: 2rem 1rem;
  }

  .modal-image {
    height: 270px;
  }

  .add-wrapper {
    position: fixed;
    top: 85%;
    gap: 1rem;
    width: 95%;
    padding-bottom: 100px;
  }


  .comment-content textarea {
    width: 97%;
  }

  .invalid-min {
    height: 5rem;
  }

  .about-product {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
