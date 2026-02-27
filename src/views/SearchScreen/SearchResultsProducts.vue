<template>
  <div>
    <h3 class="my-8 text-gray-600">
      <Icon icon="tabler:meat" class="text-primary" /> COMIDAS
    </h3>

    <div>
      <FeaturedProductsSkeleton
        v-if="shouldShowSkeleton"
        :count="6"
      />

      <FeaturedProducts
        :products="productsFetch.items.value"
        :showCategory="true"
        v-if="shouldShowList"
      />

      <LoadingMoreIndicator
        v-if="shouldShowLoadingMore"
      />
    </div>

    <div v-if="shouldShowEmptyState" class="flex gap-4 [&>p]:m-0">
      <Icon icon="mdi:food-off-outline" />
      <p>Nenhum produto encontrado.</p>
    </div>

    <p
      v-if="shouldShowAllLoaded"
      class="text-center my-8 text-muted"
    >
      Todos os produtos foram carregados
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import FeaturedProducts from '@/components/ui/FeaturedProducts.vue'
import FeaturedProductsSkeleton from '@/components/product/FeaturedProductsSkeleton.vue'
import LoadingMoreIndicator from '@/components/ui/LoadingMoreIndicator.vue'

const props = defineProps({
  productsFetch: {
    type: Object,
    required: true
  }
})

const { loading, items, allLoaded } = props.productsFetch

const shouldShowSkeleton = computed(() =>
  loading.value && items.value.length === 0
)

const shouldShowList = computed(() =>
  items.value.length > 0
)

const shouldShowLoadingMore = computed(() =>
  loading.value && items.value.length > 0
)

const shouldShowEmptyState = computed(() =>
  !loading.value && items.value.length === 0
)

const shouldShowAllLoaded = computed(() =>
  allLoaded.value && items.value.length > 0
)
</script>
