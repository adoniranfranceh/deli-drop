<template>
  <div>
    <slot :items="visibleItems" />

    <div ref="sentinel" class="infinite-scroll-sentinel">
      <span v-if="loading">Carregando...</span>
      <span v-else-if="allLoaded">Todos os itens carregados</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  perPage: { type: Number, default: 10 }
})

const visibleItems = ref([])
const page = ref(1)
const loading = ref(false)
const allLoaded = ref(false)
const sentinel = ref(null)

function loadMore() {
  if (loading.value || allLoaded.value) return
  loading.value = true

  const start = (page.value - 1) * props.perPage
  const end = page.value * props.perPage
  const nextBatch = props.items.slice(start, end)

  if (nextBatch.length === 0) {
    allLoaded.value = true
  } else {
    visibleItems.value.push(...nextBatch)
    page.value++
  }

  loading.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) loadMore()
  }, { rootMargin: '200px' })

  if (sentinel.value) observer.observe(sentinel.value)
})

watch(() => props.items, () => {
  visibleItems.value = []
  page.value = 1
  allLoaded.value = false
  loadMore()
}, { deep: true })

defineExpose({ visibleItems })
</script>

<style scoped>
.infinite-scroll-sentinel {
  text-align: center;
  padding: 1rem;
  color: #777;
}
</style>
