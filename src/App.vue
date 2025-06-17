<template>
  <div id="layout">
    <NavBar />
    <main id="container">
      <router-view />
      <CartBar />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/Navbar.vue'
import CartBar from './components/CartBar.vue';

import { watch } from 'vue'
import { useUIStore } from '@/stores/uiStore'

const ui = useUIStore()

watch(() => ui.isMobileModalOpen, (isOpen) => {
  const isMobile = window.innerWidth <= 768
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
