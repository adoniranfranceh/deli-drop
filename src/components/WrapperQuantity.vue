<template>
  <div class="quantity-wrapper">
    <span class="label-quantity">Quantidade:</span>

    <button
      class="btn"
      @click="decreaseQuantity"
      :disabled="modelValue <= 1"
    >−</button>

    <span class="value">{{ modelValue }}</span>

    <button
      class="btn"
      @click="increaseQuantity"
    >+</button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const increaseQuantity = () => {
  emit('update:modelValue', props.modelValue + 1)
}

const decreaseQuantity = () => {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
</script>

<style scoped>
.quantity-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease;
}

.label-quantity {
  font-weight: 600;
  font-size: 1.125rem;
}

.btn {
  width: 3rem;
  height: 3rem;
  font-size: 1.4rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 10px;
}

@media (max-width: 1000px) {
  .label-quantity {
    display: none;
  }
}
</style>
