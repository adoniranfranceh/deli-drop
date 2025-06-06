<template>
  <div class="close-button-container">
    <button class="close-button-desktop" @click="$emit('close')">x</button>
    <button class="close-button-mobile" @click="$emit('close')"><</button>
  </div>
</template>

<script setup>
defineEmits(['close']);
</script>

<style scoped>
.close-button-container {
  display: flex;
  justify-content: flex-end;
}
.close-button-desktop {
  display: flex;
  justify-content: flex-end;
  width: 10%;
  padding: 0.5rem;
  color: var(--color-error);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-button-mobile {
  display: none;
}

@media (max-width: 768px) {
  .close-button-container {
    display: flex;
    justify-content: flex-start;
  }
  .close-button-desktop {
    display: none;
  }

  .close-button-mobile {
    display: block;
    width: 10%;
    padding: 0.5rem;
    color: var(--color-error);
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
}
</style>
