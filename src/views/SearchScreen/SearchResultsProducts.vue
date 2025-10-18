<template>
  <div>
    <h3 class="section-title">
      <Icon icon="tabler:meat" class="restaurant-icon" /> COMIDAS
    </h3>

    <div class="products-section">
      <FeaturedProductsSkeleton
        v-if="shouldShowSkeleton"
        :count="6"
      />

      <FeaturedProducts
        class="featured-products"
        :products="productsFetch.items.value"
        :showCategory="true"
        v-if="shouldShowList"
      />

      <LoadingMoreIndicator
        v-if="shouldShowLoadingMore"
      />
    </div>

    <div v-if="shouldShowEmptyState" class="empty-state">
      <Icon icon="mdi:food-off-outline" class="empty-icon" />
      <p>Nenhum produto encontrado.</p>
    </div>

    <p
      v-if="shouldShowAllLoaded"
      class="end-list"
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

<style scoped>
.section-title {
  margin: 2rem 0 1rem;
  color: rgb(75, 85, 99);
}

.restaurant-icon {
  color: var(--color-primary);
}

.empty-state {
  display: flex;
  gap: 1rem;

  p { margin: 0; }
}

.end-list {
  text-align: center;
  margin: 2rem 0;
  color: var(--color-muted);
}
</style>
