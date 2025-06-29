<template>
  <Icon
    icon="solar:close-circle-bold"
    class="close-button desktop"
    @click="$emit('close')"
  />
  <Icon
    icon="material-symbols-light:arrow-circle-left"
    class="close-button mobile"
    @click="$emit('close')"
  />
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineEmits(['close'])
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 12px;
  width: 42px;
  height: 42px;
  color: rgb(255 255 255 / 0.9);
  background: none;
  border: none;
  cursor: pointer;
}

.close-button.desktop {
  right: 12px;
}

.close-button.mobile {
  display: none;
}

@media (max-width: 768px) {
  .close-button.desktop {
    display: none;
  }

  .close-button.mobile {
    display: block;
    left: 12px;
    width: 50px;
    height: 50px;
  }
}
</style>
