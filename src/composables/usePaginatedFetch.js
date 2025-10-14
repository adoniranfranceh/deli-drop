import { ref, onMounted, onBeforeUnmount } from 'vue'
import { apiGet } from '@/stores/totalPriceStore/helpers/apiHelpers'

export function usePaginatedFetch(endpointBase, { infiniteScroll = false, offset = 200 } = {}) {
  const items = ref([])
  const page = ref(1)
  const allLoaded = ref(false)
  const loading = ref(false)

  async function load({ query = '', category = '' } = {}) {
    if (allLoaded.value) return

    loading.value = true
    const categoryParam = category === 'Tudo' ||
                          category === 'Comidas' ||
                          category === 'Restaurantes' ? '' : category

    const data = await apiGet({
      endpoint: `${endpointBase}?page=${page.value}&query=${query}&category=${categoryParam}`
    })

    const key = Object.keys(data)[0]
    const newItems = data[key] || []

    if (newItems.length === 0) {
      allLoaded.value = true
    } else {
      items.value.push(...newItems)
      page.value += 1
    }

    loading.value = false
  }

  function reset() {
    items.value = []
    page.value = 1
    allLoaded.value = false
  }

 const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottom = document.documentElement.offsetHeight - offset;

    if (scrollPosition >= bottom && !loading.value && !allLoaded.value) {
      load();
    }
  };

  if (infiniteScroll) {
    onMounted(() => window.addEventListener('scroll', handleScroll));
    onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll));
  }

  return { items, page, allLoaded, loading, load, reset };
}
