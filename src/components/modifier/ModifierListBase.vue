<template>
  <div>
    <ModifierHeader
      :name="modifier_group.name"
      :min="modifier_group.min"
      :max="modifier_group.max"
      :freeLimit="modifier_group.free_limit"
      :totalSelected="totalSelected"
      :isCheckbox="isCheckbox"
      :isRadio="isRadio"
    />

    <ul class="modifiers">
      <li
      v-for="item in modifier_group.modifiers"
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
              :name="`modifier-${modifier_group.id}`"
            />
            <span 
              class="custom-checkbox"
              :class="{ 'multiple-border-radius': multiple }"
            ></span>

            <img
              :src="item.image"
              alt="Product Image"
              class="item-image"
            />

            <div class="item-name">
              <strong>{{ item.name }}</strong>
              <span>{{ item.description }}</span>
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

const props = defineProps({
  modifier_group: Object,
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
.modifiers {
  padding: 0;
  list-style: none;
}

.modifiers-options {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  opacity: 1;
}

.modifiers-options.selected {
  background-color: color-mix(in srgb, var(--color-restaurant) 10%, white);
  border-color: var(--color-restaurant);
}

.modifiers-options.faded {
  opacity: 0.4;
  pointer-events: none;
}

.content-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
}

.content-option input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
  cursor: pointer;
}

.item-details {
  display: flex;
  align-items: center;
  height: 50px;
}

.custom-checkbox {
  width: 1rem;
  height: 1rem;
  border-radius: 50%; 
  border: 2px solid var(--color-border);
  margin-right: 1rem;
  flex-shrink: 0;
  position: relative;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.custom-checkbox.multiple-border-radius {
  border-radius: 25%;
}

.content-option input[type='checkbox']:checked + .custom-checkbox {
  background-color: var(--color-restaurant);
  border-color: var(--color-restaurant);
}

.content-option input[type='checkbox']:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
}

.item-image {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  margin-right: 1rem;
  object-fit: cover;
}

.item-name{
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 0.875rem;
    color: var(--color-muted);
  }
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end
}

.free-modifier {
  color: var(--color-success);
  font-size: 0.85rem;
  font-weight: 600;
}

.item-price {
  font-weight: 200;
  font-size: 0.775rem;
  color: var(--color-text-light);
  text-decoration: line-through;
}
</style>
