<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
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
            <Rating v-if="product.rating" :rating="product.rating" />
          </div>
          <DeliveryDuration :duration="product.duration" />
        </div>

        <hr />

        <ModifierGroup
          v-for="group in product.modifier_group"
          :key="group.id"
          :modifier_group="group"
        />

        <Ingredients
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

        <p
          v-if="!modifiersValid && product.modifier_group"
          style="color: red; font-size: 0.9rem;"
        >
          Escolha os itens obrigatórios antes de adicionar ao carrinho.
        </p>

        <div class="add-wrapper">
          <WrapperQuantity v-model="quantity"/>
          <Button
            class="add-btn"
            :text="buttonText"
            iconLeft="ph:shopping-bag-open-thin"
            :disabled="!modifiersValid && product.modifier_group"
            @click="handleAddToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import CloseButton from '@/components/ui/CloseButton.vue'
import WrapperQuantity from '@/components/ui/WrapperQuantity.vue'
import Ingredients from '@/components/product/Ingredients.vue'
import Button from '@/components/ui/Button.vue'
import Rating from '@/components/ui/Rating.vue'
import DeliveryDuration from '@/components/ui/DeliveryDuration.vue'
import ModifierGroup from '@/components/modifier/ModifierGroup.vue'
import { FloatToMoney } from '@/utils/money'
import { useUIStore } from '@/stores/uiStore'
import { useTotalPriceStore } from '@/stores/totalPriceStore'
import { useRestaurantStore } from '@/stores/useRestaurantStore'
import { useProductSelectionStore } from '@/stores/useProductSelectionStore'

const ui = useUIStore()
const totalStore = useTotalPriceStore()
const restaurantStore = useRestaurantStore()
const productSelectionStore = useProductSelectionStore()

const modifiersValid = computed(() => productSelectionStore.modifiersValid)

const props = defineProps({
  product: Object,
  selectedModifiers: { type: Array, default: () => [] },
  cartItemId: { type: String, default: null }
})
const emit = defineEmits(['add-to-cart'])

watch(() => props.product, (newProduct) => {
  if (!newProduct) return

  productSelectionStore.resetSelectedModifiersForProduct(newProduct.modifier_group || [])

  if (props.selectedModifiers && props.selectedModifiers.length) {
    loadSelectedModifiers()
  }
})

const quantity = ref(props.product.quantity || 1)
const comment = ref('')

const totalPrice = computed(() => totalStore.totalPrice)
const finalPrice = computed(() =>
  totalPrice.value * quantity.value
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
  totalStore.setBasePrice(props.product.base_price)
  totalStore.setQuantity(quantity.value)
  productSelectionStore.basePrice = props.product.base_price
}

function hydrateModifierGroups() {
  props.product.modifier_group?.forEach(group => {
    group.modifiers = group.modifiers.map(item => ({
      ...item,
      ...restaurantStore.getProduct(item)
    }))
  })
}

function loadSelectedModifiers() {
  productSelectionStore.reset()

  if (props.selectedModifiers.length) {
    props.selectedModifiers.forEach(mod => {
      productSelectionStore.updateModifierSelection(
        mod.id,
        mod.selected,
        mod.min ?? 0,
        mod.max ?? null
      )
    })
  }
}

const buttonText = computed(() =>
  (props.cartItemId ? 'Atualizar ' : 'Adicionar ') + FloatToMoney(finalPrice.value)
)

function handleAddToCart() {
  emit('add-to-cart', {
    product: { ...props.product },
    quantity: quantity.value,
    selectedModifiers: productSelectionStore.plainSelectedModifiers,
    comment: comment.value,
    cartItemId: props.cartItemId,
    totalPrice: totalPrice.value
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background: #fff;
  max-width: 1200px;
  width: 800px;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

.modal-content h2 {
  color: var(--color-restaurant);
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

.add-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-white);
  width: 100%;
  gap: 0.5rem;
  margin: 1.5rem 0;

  button {
    background: var(--color-restaurant);
  }

  button:hover {
    background: var(--color-restaurant);
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


@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .product-details {
    padding: 2rem 1rem;
  }

  .modal-image {
    height: 270px;
  }

  .add-wrapper {
    position: fixed;
    top: 89%;
    gap: 1rem;
    width: 90%;
    padding-bottom: 100px;
  }


  .comment-content textarea {
    width: 97%;
  }

  .about-product {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
