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
        <h1 class="text-xl font-bold text-text-dark m-0">Meus pedidos</h1>
      </div>

      <section v-if="!phoneSubmitted" class="rounded-lg border border-[var(--color-border)] shadow-sm bg-white p-4">
        <p class="text-sm text-text-subtle m-0 mb-3">Informe seu telefone para ver seus pedidos</p>
        <form @submit.prevent="searchOrders" class="flex gap-2">
          <input
            v-model="phoneInput"
            type="tel"
            maxlength="15"
            placeholder="(00) 00000-0000"
            class="flex-1 border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-cart)]"
            @input="phoneInput = phoneMask(phoneInput)"
          />
          <button
            type="submit"
            :disabled="stripPhone(phoneInput).length < 10"
            class="bg-[var(--color-cart)] text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buscar
          </button>
        </form>
      </section>

      <div v-if="loading" class="flex justify-center py-12">
        <Icon icon="lucide:loader-2" class="w-8 h-8 text-[var(--color-cart)] animate-spin" />
      </div>

      <div v-else-if="phoneSubmitted && orders.length === 0" class="text-center py-12">
        <Icon icon="lucide:package-x" class="w-12 h-12 text-text-subtle mx-auto mb-3" />
        <p class="text-text-subtle m-0">Nenhum pedido encontrado</p>
        <button
          class="mt-4 bg-transparent border-none text-[var(--color-cart)] cursor-pointer text-sm font-semibold underline"
          @click="resetSearch"
        >
          Buscar com outro telefone
        </button>
      </div>

      <template v-else-if="orders.length > 0">
        <button
          class="bg-transparent border-none text-[var(--color-cart)] cursor-pointer text-xs font-semibold self-end"
          @click="resetSearch"
        >
          Trocar telefone
        </button>

        <router-link
          v-for="order in orders"
          :key="order.code"
          :to="`/order/${order.code}`"
          class="rounded-lg border border-[var(--color-border)] shadow-sm bg-white p-4 no-underline text-inherit hover:border-[var(--color-cart)] transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <p class="text-lg font-bold text-text-dark m-0">{{ order.code }}</p>
            <span :class="statusBadgeClass(order.status)">
              {{ statusLabel(order.status) }}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm text-text-subtle">
            <span>{{ order.restaurant_name }}</span>
            <span class="font-semibold text-text-dark">{{ FloatToMoney(order.total) }}</span>
          </div>
          <div class="flex items-center justify-between text-xs text-text-subtle mt-2">
            <span>{{ order.items_count }} {{ order.items_count === 1 ? 'item' : 'itens' }}</span>
            <span>{{ formatDate(order.created_at) }}</span>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import { phoneMask, stripPhone } from '@/utils/checkout'
import { FloatToMoney } from '@/utils/money'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
})

const phoneInput = ref('')
const phoneSubmitted = ref(false)
const orders = ref([])
const loading = ref(false)

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

function statusLabel(status) {
  return statusMap[status] || status
}

function statusBadgeClass(status) {
  const base = 'px-3 py-1 rounded-full text-xs font-semibold'
  if (status === 'cancelled' || status === 'rejected')
    return `${base} bg-[var(--color-error)]/10 text-[var(--color-error)]`
  if (status === 'delivered')
    return `${base} bg-[var(--color-success)]/10 text-[var(--color-success)]`
  return `${base} bg-[var(--color-cart)]/10 text-[var(--color-cart)]`
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function searchOrders() {
  const phone = stripPhone(phoneInput.value)
  if (phone.length < 10) return

  loading.value = true
  phoneSubmitted.value = true
  try {
    const { data } = await api.get('/orders', { params: { phone } })
    orders.value = data.orders || []
  } catch {
    orders.value = []
  } finally {
    loading.value = false
  }
}

function resetSearch() {
  phoneSubmitted.value = false
  orders.value = []
}

onMounted(() => {
  const saved = localStorage.getItem('checkout_customer')
  if (saved) {
    try {
      const customer = JSON.parse(saved)
      if (customer.phone) {
        phoneInput.value = customer.phone
        searchOrders()
      }
    } catch {}
  }
})
</script>
