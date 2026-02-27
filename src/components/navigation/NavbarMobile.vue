<template>
  <nav class="container-nav-mobile">
    <div class="flex justify-between items-center relative w-full px-4">
      <button
        @click="toggleMenu"
        class="hamburger-btn"
        aria-label="Abrir menu"
      >☰</button>
      <img alt="Deli Drop logo" src="@/assets/logo.png" class="h-14" />
    </div>
  </nav>
  <div class="hidden max-[840px]:block max-[840px]:h-14"></div>

  <div
    v-if="menuOpen"
    class="fixed inset-0 bg-white z-[2000] flex flex-col animate-fadeIn"
  >
    <div class="flex justify-between items-center px-4 ml-12">
      <img alt="Deli Drop logo" src="@/assets/logo.png" class="h-14" />
      <button
        @click="closeMenu"
        class="close-btn"
        aria-label="Fechar menu"
      >✕</button>
    </div>
    <ul class="list-none flex flex-col gap-10 mt-8">
      <li><router-link @click="closeMenu" to="/" class="mobile-link">Início</router-link></li>
      <li><router-link @click="closeMenu" to="/sobre" class="mobile-link">Sobre</router-link></li>
      <li><router-link @click="closeMenu" to="/sobre" class="mobile-link">Quero ser Parceiro</router-link></li>
      <li><router-link @click="closeMenu" to="/sobre" class="mobile-link">Quero ser Entregador</router-link></li>
      <li><router-link @click="closeMenu" to="/meus-pedidos" class="mobile-link">Meus Pedidos</router-link></li>
      <li><router-link @click="closeMenu" to="/buscar" class="mobile-link">Buscar</router-link></li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)
</script>

<style scoped>
@reference "../../style.css";

.container-nav-mobile {
  @apply hidden max-[840px]:flex max-[840px]:w-full max-[840px]:py-3 max-[840px]:sticky max-[840px]:bg-white max-[840px]:shadow-md max-[840px]:z-[1000];
}

.hamburger-btn,
.close-btn {
  @apply text-3xl bg-transparent border-none cursor-pointer text-primary p-0;
}

.mobile-link {
  @apply ml-6 no-underline text-text text-2xl pr-24 hover:text-primary;
}

.mobile-link.router-link-exact-active {
  @apply text-primary;
}
</style>
