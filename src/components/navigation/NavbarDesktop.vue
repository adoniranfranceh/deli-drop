<template>
  <header class="font-sans text-text flex items-center justify-center py-4 px-8 bg-white shadow-sm sticky top-0 z-[1000] max-[840px]:hidden">
    <img src="@/assets/logo.png" alt="DeliDrop" class="h-16 mr-[25%] absolute left-[10px]" />
    <nav class="m-5">
      <router-link to="/" class="nav-link">Início</router-link>
      <router-link to="/sobre" class="nav-link">Sobre</router-link>
      <router-link to="/sobre" class="nav-link">Quero ser Parceiro</router-link>
      <router-link to="/sobre" class="nav-link">Quero ser Entregador</router-link>

      <router-link to="/meus-pedidos" class="nav-link">Meus Pedidos</router-link>
      <a :href="appDownloadLink" target="_blank" class="nav-link">Baixe o App</a>
      <router-link to="/login" class="nav-link">Entrar</router-link>
    </nav>
  </header>
</template>

<script setup>
const appDownloadLink = 'https://play.google.com/store/apps/details?id=seu.app'
</script>

<style scoped>
@reference "../../style.css";

.nav-link {
  @apply ml-6 no-underline text-text-subtle font-medium hover:text-primary-hover;
}

.nav-link.router-link-exact-active {
  @apply text-primary font-semibold;
}
</style>
