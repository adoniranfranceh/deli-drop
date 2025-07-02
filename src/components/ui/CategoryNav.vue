<template>
  <nav class="floating-category-nav">
    <div class="categories-scroll">
      <button
        v-for="(category, index) in categories"
        :key="category.id"
        :class="{ active: activeCategory === category.id }"
        :data-id="category.id"
        @click="scrollToCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})

const activeCategory = ref(null)

const handleScroll = () => {
  const OFFSET_TOP = 210
  let lastVisible = null

  for (const category of props.categories) {
    const el = document.getElementById(`category-${category.id}`)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= OFFSET_TOP) {
        lastVisible = category.id
      }
    }
  }

  if (lastVisible && activeCategory.value !== lastVisible) {
    activeCategory.value = lastVisible
    scrollActiveButtonIntoView(lastVisible)
  }
}

const scrollActiveButtonIntoView = (id) => {
  const btn = document.querySelector(`.categories-scroll button[data-id="${id}"]`)
  if (btn) {
    btn.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }
}

const scrollToCategory = (id) => {
  const el = document.getElementById(`category-${id}`)
  if (el) {
    const headerOffset = 200
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.floating-category-nav {
  position: sticky;
  top: 100px;
  z-index: 1;
  background-color: white;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid var(--color-border);
  overflow-x: auto;
}

.categories-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
  scrollbar-width: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}


button {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: 0.2s;
}

button.active {
  color: var(--color-restaurant);
}
</style>
