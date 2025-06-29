<template>
  <div id="layout">
    <Navbar />
    <main id="container">
      <router-view />
      <CartBar />
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/navigation/Navbar.vue'
import CartBar from '@/components/cart/CartBar.vue';


import { watch } from 'vue'
import { useUIStore } from '@/stores/uiStore'

const ui = useUIStore()

watch(() => ui.isMobileModalOpen, (isOpen) => {
  const isMobile = window.innerWidth <= 1000
  if (isMobile && isOpen) {
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
