<template>
  <header id="container-nav-desktop">
      <img src="@/assets/logo.png" alt="DeliDrop" class="logo" />
      <nav>
        <router-link to="/" exact-active-class="active">Início</router-link>
        <router-link to="/sobre" exact-active-class="active">Sobre</router-link>
        <router-link to="/sobre" exact-active-class="active">Quero ser Parceiro</router-link>
        <router-link to="/sobre" exact-active-class="active">Quero ser Entregador</router-link>

        <a :href="appDownloadLink" target="_blank" exact-active-class="active">Baixe o App</a>
        <router-link to="/login" exact-active-class="active">Entrar</router-link>
      </nav>
    </header>
</template>

<script setup>
const appDownloadLink = 'https://play.google.com/store/apps/details?id=seu.app'
</script>

<style scoped>
nav {
  margin: 20px;
}

nav a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #555;
  font-weight: 500;
}
nav a:hover {
  color: #000;
}
#container-nav-desktop {
  font-family: 'Inter', sans-serif;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  height: 4rem;
  margin-right: 25%;
  position: absolute;
  left: 10px;
}

.active {
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  #container-nav-desktop {
    display: none;
  }
}
</style>
