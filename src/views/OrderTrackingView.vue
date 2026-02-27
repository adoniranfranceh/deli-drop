<template>
  <div class="min-h-screen bg-[var(--bg-color)]">
    <div class="max-w-[600px] mx-auto px-4 py-6 flex flex-col gap-5">
      <div class="flex items-center gap-3">
        <button
          class="bg-transparent border-none cursor-pointer p-1 hover:opacity-70"
          @click="$router.push('/')"
        >
          <Icon icon="lucide:arrow-left" class="w-6 h-6 text-text-dark" />
        </button>
        <h1 class="text-xl font-bold text-text-dark m-0">Acompanhar pedido</h1>
      </div>

      <div v-if="orderStore.loading && !order" class="flex-center py-12">
        <Icon icon="lucide:loader-2" class="w-8 h-8 text-[var(--color-cart)] animate-spin" />
      </div>

      <div v-else-if="orderStore.error && !order" class="text-center py-12">
        <p class="text-[var(--color-error)]">{{ orderStore.error }}</p>
        <AppButton variant="secondary" text="Voltar" @click="$router.push('/')" />
      </div>

      <template v-else-if="order">
        <section class="rounded-lg border border-[var(--color-border)] shadow-sm bg-white p-4">
          <div class="flex items-center justify-between mb-2">
            <div>
              <p class="text-sm text-text-subtle m-0">Código do pedido</p>
              <p class="text-2xl font-bold text-text-dark m-0">{{ order.code }}</p>
            </div>
            <span :class="statusBadgeClass">
              {{ statusLabel }}
            </span>
          </div>

          <p v-if="order.estimated_delivery_time" class="text-sm text-text-subtle m-0 mt-2">
            <Icon icon="lucide:clock" class="w-4 h-4 inline-block align-text-bottom" />
            Previsão: {{ order.estimated_delivery_time }}
          </p>
        </section>

        <section
          v-if="isActiveStatus"
          class="rounded-lg border border-[var(--color-border)] shadow-sm bg-white p-4"
        >
          <OrderProgress :status="order.status" />
        </section>

        <section
          v-if="isCancelled"
          class="rounded-lg border border-[var(--color-error)] shadow-sm bg-white p-4 text-center"
        >
          <Icon icon="lucide:x-circle" class="w-12 h-12 text-[var(--color-error)] mx-auto mb-2" />
          <p class="font-bold text-[var(--color-error)] m-0">Pedido cancelado</p>
          <p v-if="order.cancel_reason" class="text-sm text-text-subtle m-0 mt-1">
            Motivo: {{ order.cancel_reason }}
          </p>
        </section>

        <section
          v-if="isRejected"
          class="rounded-lg border border-[var(--color-error)] shadow-sm bg-white p-4 text-center"
        >
          <Icon icon="lucide:x-circle" class="w-12 h-12 text-[var(--color-error)] mx-auto mb-2" />
          <p class="font-bold text-[var(--color-error)] m-0">Pedido recusado pelo restaurante</p>
        </section>

        <section
          v-if="isDelivered"
          class="rounded-lg border border-[var(--color-success)] shadow-sm bg-white p-4 text-center"
        >
          <Icon icon="lucide:check-circle-2" class="w-12 h-12 text-[var(--color-success)] mx-auto mb-2" />
          <p class="font-bold text-[var(--color-success)] m-0">Pedido entregue!</p>
        </section>

        <section class="rounded-lg border border-[var(--color-border)] shadow-sm bg-white p-4">
          <h2 class="text-lg font-bold text-text-dark mb-3">Itens do pedido</h2>
          <div class="flex flex-col gap-2">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex justify-between text-sm"
            >
              <span>{{ item.quantity }}x {{ item.product_name || item.name }}</span>
              <span class="font-semibold">{{ FloatToMoney(item.total_price || item.unit_price * item.quantity) }}</span>
            </div>
          </div>
          <hr class="my-3" />
          <div class="flex justify-between font-bold">
            <span>Total</span>
            <span>{{ FloatToMoney(order.total) }}</span>
          </div>
        </section>

        <AppButton
          v-if="canCancel"
          class="w-full flex justify-center"
          variant="danger"
          text="Cancelar pedido"
          icon="lucide:x"
          @click="handleCancel"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useOrderStore } from '@/stores/useOrderStore'
import { FloatToMoney } from '@/utils/money'
import OrderProgress from '@/components/tracking/OrderProgress.vue'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const order = computed(() => orderStore.currentOrder)

const statusMap = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  preparing: 'Preparando',
  ready: 'Pronto',
  out_for_delivery: 'Em entrega',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
  rejected: 'Recusado'
}

const statusLabel = computed(() => statusMap[order.value?.status] || order.value?.status)

const statusBadgeClass = computed(() => {
  const status = order.value?.status
  const base = 'px-3 py-1 rounded-full text-xs font-semibold'
  if (status === 'cancelled' || status === 'rejected')
    return `${base} bg-[var(--color-error)]/10 text-[var(--color-error)]`
  if (status === 'delivered')
    return `${base} bg-[var(--color-success)]/10 text-[var(--color-success)]`
  return `${base} bg-[var(--color-cart)]/10 text-[var(--color-cart)]`
})

const isActiveStatus = computed(() =>
  ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'].includes(order.value?.status)
)

const isCancelled = computed(() => order.value?.status === 'cancelled')
const isRejected = computed(() => order.value?.status === 'rejected')
const isDelivered = computed(() => order.value?.status === 'delivered')

const canCancel = computed(() =>
  ['pending', 'confirmed'].includes(order.value?.status)
)

async function handleCancel() {
  const reason = prompt('Motivo do cancelamento (opcional):')
  try {
    await orderStore.cancelOrder(route.params.code, reason || '')
  } catch {
  }
}

onMounted(async () => {
  const code = route.params.code
  try {
    await orderStore.fetchOrder(code)
    orderStore.subscribe(code)
  } catch {
  }
})

onUnmounted(() => {
  orderStore.unsubscribe()
})
</script>
