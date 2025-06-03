<template>
  <nav id="container-nav-mobile">
    <div class="mobile-header">
      <button @click="toggleMenu" class="hamburger-btn" aria-label="Abrir menu">☰</button>
      <img alt="Deli Drop logo" src="@/assets/logo.png" class="logo" />
    </div>
  </nav>
  <div id="spacer"></div>

  <div v-if="menuOpen" class="mobile-fullscreen-menu">
    <div class="mobile-header-menu">
      <img alt="Deli Drop logo" src="@/assets/logo.png" class="logo" />
      <button @click="closeMenu" class="close-btn" aria-label="Fechar menu">✕</button>
    </div>
    <ul class="mobile-menu">
      <li><router-link @click="closeMenu" to="/" exact-active-class="active">Início</router-link></li>
      <li><router-link @click="closeMenu" to="/about" exact-active-class="active">Sobre</router-link></li>
      <li><router-link @click="closeMenu" to="/Quero ser Parceiro" exact-active-class="active">Quero ser Parceiro</router-link></li>
      <li><router-link @click="closeMenu" to="/Quero ser Entregador" exact-active-class="active">Quero ser Entregador</router-link></li>
      <li><router-link @click="closeMenu" to="/buscar" exact-active-class="active">Buscar</router-link></li>
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
#container-nav-mobile {
  display: none;
}

@media (max-width: 768px) {
  #container-nav-desktop {
    display: none;
  }

  #container-nav-mobile {
    display: flex;
    width: 100%;
    padding: 0.75rem 1rem;
    position: fixed;
    background-color: #ffffff;
    box-shadow: var(--shadow-md);
  }

  #spacer {
    height: 3.5rem;
  }

  .hamburger-btn {
    font-size: 1.8rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-primary);
  }

  .mobile-fullscreen-menu {
    position: fixed;
    inset: 0;
    background-color: var(--color-white);
    z-index: 2000;
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.3s ease-in-out;
  }

  .mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .mobile-header-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 3rem;
  }

  .close-btn {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-primary);
  }

  .mobile-menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 2rem;
  }

  .mobile-menu a {
    margin-left: 1.5rem;
    text-decoration: none;
    color: var(--color-text);
    font-size: 1.5rem;
    padding-right: 6rem;
  }

  .mobile-menu a:hover,
  .mobile-menu a.active {
    color: var(--color-primary);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .logo {
    height: 3.5rem;
  }
}
</style>
