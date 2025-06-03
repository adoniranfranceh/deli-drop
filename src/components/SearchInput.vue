<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Pesquisar..."
      class="search-input"
      @input="$emit('search', $event.target.value)"
      aria-label="Campo de pesquisa"
    />
  </div>
</template>

<style scope>
.search-container {
  display: flex;
  max-width: 400px;
  margin: 1rem auto;
  background-color: var(--color-white);
  border-radius: 2rem;
}
.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>