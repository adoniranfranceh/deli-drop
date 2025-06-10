<template>
  <div id="layout">
    <NavBar />
    <main id="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/Navbar.vue'
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
