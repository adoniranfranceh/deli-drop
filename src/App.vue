<template>
  <div id="layout">
    <MainNavbar />
    <main id="container">
      <router-view />
      <CartBar />
    </main>
  </div>
</template>

<script setup>
import MainNavbar from '@/components/navigation/MainNavbar.vue'
import CartBar from '@/components/cart/CartBar.vue';


import { watch } from 'vue'
import { useUIStore } from '@/stores/uiStore'

const ui = useUIStore()

watch(() => ui.modalOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})
</script>

<style scoped>
#layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#container {
  flex: 1;
  background-color: var(--bg-color);
}
</style>
