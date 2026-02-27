<template>
  <nav class="sticky top-[100px] max-[768px]:top-0 z-[1] bg-white py-2 px-4 border-b-2 border-border overflow-x-auto">
    <div class="categories-scroll flex gap-4 overflow-x-auto p-4">
      <button
        v-for="(category) in categories"
        :key="category.id"
        class="bg-transparent border-none py-2 px-4 font-semibold text-muted cursor-pointer whitespace-nowrap border-b-2 border-transparent transition-all duration-200"
        :class="{ 'text-[var(--color-restaurant)]': activeCategory === category.id }"
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
.categories-scroll {
  scrollbar-width: none;
}
.categories-scroll::-webkit-scrollbar {
  display: none;
}
</style>
