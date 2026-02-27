<template>
  <BaseModal @close="$emit('close')">
    <div class="p-4" v-if="cartStore.cartItems.length === 0">
      <header>
        <div class="flex justify-end">
          <button
            class="text-2xl bg-transparent cursor-pointer text-text-subtle transition-colors duration-200 hover:text-close-hover border-none p-0 rounded-none"
            @click="$emit('close')"
          >×</button>
        </div>
        <h2 class="flex justify-center font-bold text-xl m-0 text-black">
          Sua sacola está vazia
        </h2>
      </header>
      <div class="flex flex-col items-center my-12">
        <Icon icon="lucide:shopping-bag" class="w-16 h-16 text-gray-300" />
        <p>Adicione alguns itens deliciosos</p>
        <AppButton
          class="mt-4"
          variant="cart"
          text="Continuar comprando"
          @click="$emit('close')"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useCartStore } from '@/stores/cartStore'
import AppButton from '@/components/ui/AppButton.vue'
import BaseModal from '../modal/BaseModal.vue';

defineProps({
  restauranName: String
})

const cartStore = useCartStore()
</script>
