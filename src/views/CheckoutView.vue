<template>
  <div class="min-h-screen bg-[var(--bg-color)]">
    <div class="w-full border-b border-border bg-white">
      <div class="max-w-[672px] mx-auto flex items-center gap-3 px-4 py-4 max-[758px]:py-3">
        <button
          class="bg-transparent border-none p-0 cursor-pointer hover:opacity-70 transition-opacity shrink-0"
          @click="$router.back()"
        >
          <Icon icon="lucide:arrow-left" class="w-5 h-5 text-text-dark" />
        </button>

        <h1 class="text-lg font-bold text-text-dark m-0">Finalizar pedido</h1>

        <div v-if="restaurantName" class="ml-auto flex items-center gap-2 min-w-0">
          <span class="text-sm text-text-subtle truncate">{{ restaurantName }}</span>
          <img
            v-if="restaurantLogo"
            :src="restaurantLogo"
            alt=""
            class="w-7 h-7 rounded-full object-cover shrink-0 border"
            :style="{ borderColor: restaurantColor }"
          />
        </div>
      </div>
    </div>

    <div class="max-w-[672px] mx-auto px-4 py-6 flex flex-col gap-4 mb-16 max-[758px]:px-4">
      <OrderSummarySection
        :cartItems="cartStore.cartItems"
        :subtotal="cartStore.subtotal"
        :totalItems="cartStore.totalItems"
        :deliveryFee="deliveryFee"
        :restaurantColor="restaurantColor"
        @edit-cart="goBackToCart"
      />

      <CustomerFormSection v-model="customer" />

      <AddressFormSection v-model="address" />

      <PaymentSection
        v-model="paymentMethod"
        v-model:changeFor="changeFor"
      />

      <OrderNotesSection v-model="notes" />

      <div
        v-if="errorMsg"
        class="flex items-center gap-2 bg-error/10 text-error text-sm rounded-lg px-4 py-3"
      >
        <Icon icon="lucide:alert-circle" class="w-4 h-4 shrink-0" />
        {{ errorMsg }}
      </div>

      <AppButton
        class="w-full flex justify-center"
        variant="cart"
        :text="orderStore.loading ? 'Enviando...' : 'Fazer Pedido'"
        :iconLeft="orderStore.loading ? 'lucide:loader-2' : 'lucide:send'"
        :customStyles="{ opacity: orderStore.loading ? 0.7 : 1, pointerEvents: orderStore.loading ? 'none' : 'auto' }"
        @click="submitOrder"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/useOrderStore'
import { buildOrderPayload } from '@/utils/checkout'
import OrderSummarySection from '@/components/checkout/OrderSummarySection.vue'
import CustomerFormSection from '@/components/checkout/CustomerFormSection.vue'
import AddressFormSection from '@/components/checkout/AddressFormSection.vue'
import PaymentSection from '@/components/checkout/PaymentSection.vue'
import OrderNotesSection from '@/components/checkout/OrderNotesSection.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const deliveryFee = 500

const restaurantColor = computed(() => cartStore.currentRestaurantInfo?.color || '#E53935')
const restaurantName = computed(() => cartStore.currentRestaurantInfo?.name || '')
const restaurantLogo = computed(() => cartStore.currentRestaurantInfo?.logo || '')

const customer = ref({ name: '', phone: '' })
const address = ref({ address: '', complement: '', neighborhood: '', reference: '' })
const paymentMethod = ref('pix')
const changeFor = ref(0)
const notes = ref('')
const errorMsg = ref('')

onMounted(() => {
  if (cartStore.cartItems.length === 0) {
    router.replace('/')
    return
  }

  const savedCustomer = localStorage.getItem('checkout_customer')
  if (savedCustomer) {
    try { customer.value = JSON.parse(savedCustomer) } catch {}
  }

  const savedAddress = localStorage.getItem('checkout_address')
  if (savedAddress) {
    try { address.value = JSON.parse(savedAddress) } catch {}
  }
})

watch(customer, (val) => localStorage.setItem('checkout_customer', JSON.stringify(val)), { deep: true })
watch(address, (val) => localStorage.setItem('checkout_address', JSON.stringify(val)), { deep: true })

function validate() {
  if (!customer.value.name.trim()) return 'Informe seu nome'
  if (!customer.value.phone.trim() || customer.value.phone.replace(/\D/g, '').length < 10)
    return 'Informe um telefone válido'
  if (!address.value.address.trim()) return 'Informe o endereço'
  if (!address.value.neighborhood.trim()) return 'Informe o bairro'
  return null
}

async function submitOrder() {
  errorMsg.value = ''
  const validationError = validate()
  if (validationError) {
    errorMsg.value = validationError
    return
  }

  const formData = {
    name: customer.value.name.trim(),
    phone: customer.value.phone,
    address: address.value.address.trim(),
    complement: address.value.complement.trim(),
    neighborhood: address.value.neighborhood.trim(),
    reference: address.value.reference.trim(),
    paymentMethod: paymentMethod.value,
    changeFor: changeFor.value,
    notes: notes.value.trim()
  }

  try {
    const order = await orderStore.createOrder(buildOrderPayload(cartStore, formData))
    cartStore.clearCart()
    router.replace(`/order/${order.code}`)
  } catch {
    errorMsg.value = orderStore.error || 'Erro ao criar pedido. Tente novamente.'
  }
}

function goBackToCart() {
  router.back()
}
</script>
