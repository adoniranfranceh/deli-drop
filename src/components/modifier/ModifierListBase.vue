<template>
  <div>
    <ModifierHeader
      :name="modifier_groups.name"
      :min="modifier_groups.min"
      :max="modifier_groups.max"
      :freeLimit="modifier_groups.free_limit"
      :totalSelected="totalSelected"
      :isCheckbox="isCheckbox"
      :isRadio="isRadio"
    />

    <ul class="modifiers">
      <li
      v-for="item in modifier_groups.modifiers"
      :key="item.id"
      class="modifiers-options"
      :class="{
        selected: isSelected(item),
        faded: faded(item)
      }"
      >
        <label class="content-option">
          <div class="item-details">
            <input
              type="checkbox"
              :checked="isSelected(item)"
              @change="() => toggle(item)"
              :name="`modifier-${modifier_groups.id}`"
            />
            <span 
              class="custom-checkbox"
              :class="{ 'multiple-border-radius': multiple }"
            ></span>

            <img
              :src="item.image"
              alt="Product"
              class="item-image"
            />

            <div class="item-name">
              <strong>{{ item.name }}</strong>
              <span class="ingredients" v-if="Array.isArray(item.ingredients)">
                {{ item.ingredients.join(', ') }}
              </span>
              <span v-else>
                {{ item.ingredients || item.description }}
              </span>
            </div>
          </div>

          <div class="item-info">
            <div class="free-modifier">Incluso</div>
            <div class="item-price">
              {{ FloatToMoney(getBasePrice(item)) }}
            </div>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { FloatToMoney } from '@/utils/money'
import ModifierHeader from '@/components/ui/ModifierHeader.vue'

defineProps({
  modifier_groups: Object,
  totalSelected: Number,
  isSelected: Function,
  faded: Function,
  toggle: Function,
  getBasePrice: Function,
  multiple: {
    type: Boolean,
    default: false
  },
  isCheckbox: Boolean,
  isRadio: Boolean
})
</script>

<style scoped>
@reference "../../style.css";

.modifiers {
  @apply p-0 list-none;
}

.modifiers-options {
  @apply border border-border rounded-lg p-4 mb-2 cursor-pointer transition-all duration-200 flex items-center justify-start opacity-100;
}

.modifiers-options.selected {
  background-color: color-mix(in srgb, var(--color-product-modal, var(--color-restaurant)) 10%, white);
  border-color: var(--color-product-modal, var(--color-restaurant));
}

.modifiers-options.faded {
  @apply opacity-40 pointer-events-none;
}

.content-option {
  @apply flex items-center justify-between cursor-pointer w-full;
}

.content-option input[type='checkbox'] {
  @apply absolute opacity-0 w-5 h-5 m-0 cursor-pointer;
}

.item-details {
  @apply flex items-center h-[50px];
}

.custom-checkbox {
  @apply w-4 h-4 rounded-full border-2 border-border mr-4 shrink-0 relative transition-all duration-200;
}

.custom-checkbox.multiple-border-radius {
  @apply rounded;
}

.content-option input[type='checkbox']:checked + .custom-checkbox {
  background-color: var(--color-product-modal, var(--color-restaurant));
  border-color: var(--color-product-modal, var(--color-restaurant));
}

.content-option input[type='checkbox']:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 4px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.item-image {
  @apply w-10 h-10 rounded mr-4 object-cover;
}

.item-name {
  @apply flex flex-col justify-center;
}

.ingredients {
  @apply text-sm text-muted max-[758px]:text-[11px];
}

.item-info {
  @apply flex flex-col justify-center items-end;
}

.free-modifier {
  @apply text-success text-sm font-semibold;
}

.item-price {
  @apply font-extralight text-xs text-text-light line-through;
}
</style>
