<template>
  <div class="restaurant-card skeleton">
    <div class="logo"></div>
    <div class="info">
      <div class="line short"></div>
      <div class="line long"></div>
      <div class="details">
        <div class="line short"></div>
        <div class="line short"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.restaurant-card.skeleton {
  display: flex;
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  padding: 0.75rem;
  gap: 0.75rem;
  pointer-events: none;
  box-shadow: var(--shadow-md);
  height: 115px;
}

.restaurant-card.skeleton .logo {
  width: 80px;
  height: 80px;
  background: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

.restaurant-card.skeleton .info {
  flex: 1;
}

.info .line {
  height: 14px;
  background: #e0e0e0;
  border-radius: 7px;
  margin-bottom: 0.5rem;
  animation: pulse 1.5s infinite;
}

.line.short { width: 40%; }
.line.long { width: 80%; }

.details { display: flex; gap: 0.5rem; }
.details .line { width: 30%; }

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

@media (max-width: 758px) {
  .restaurant-card {
    height: 125px;
  }
}
</style>
