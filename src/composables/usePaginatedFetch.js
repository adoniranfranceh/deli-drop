import { ref } from 'vue'
import { apiGet } from '@/stores/totalPriceStore/helpers/apiHelpers'
import { useInfiniteScrollListener } from './useInfiniteScrollListener'

export function usePaginatedFetch(endpointBase, { offset = 200 } = {}) {
  const items = ref([])
  const page = ref(1)
  const allLoaded = ref(false)
  const loading = ref(false)

  let currentEndpoint = endpointBase
  let currentQuery = ''
  let currentCategory = ''

  const scrollLoadCallback = () => {
    return load({
      query: currentQuery,
      category: currentCategory,
      endpoint: currentEndpoint,
      enableInfiniteScroll: true,
      isScrollLoad: true
    })
  }

  const { manageScrollListener, scrollState } = useInfiniteScrollListener(
    scrollLoadCallback,
    offset,
    loading,
    allLoaded
  )

  async function load({
    query = '',
    category = '',
    endpoint,
    enableInfiniteScroll = false,
    isScrollLoad = false,
    per_page = 10
  } = {}) {
    if (loading.value) return

    if (allLoaded.value && isScrollLoad) return

    loading.value = true

    currentQuery = query
    currentCategory = category
    currentEndpoint = endpoint || currentEndpoint

    manageScrollListener(enableInfiniteScroll)

    try {
      const categoryParam = ['Tudo', 'Comidas', 'Restaurantes'].includes(category) ? '' : category

      const params = new URLSearchParams()
      params.append('page', page.value)
      params.append('per_page', per_page)

      if (query) {
          params.append('query', query)
      }
      if (categoryParam) {
          params.append('category', categoryParam)
      }

      const url = `${currentEndpoint}?${params.toString()}`
      const data = await apiGet({ endpoint: url })
      const key = Object.keys(data)[0]
      const newItems = data[key] || []

      if (newItems.length === 0) {
        allLoaded.value = true
      } else {
        items.value.push(...newItems)
        page.value += 1
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      allLoaded.value = true
    } finally {
      loading.value = false
    }
  }

  function reset() {
    items.value = []
    page.value = 1
    allLoaded.value = false
    loading.value = false
    scrollState.detach()

    currentQuery = ''
    currentCategory = ''
    currentEndpoint = endpointBase
  }

  return { items, page, allLoaded, loading, load, reset }
}
