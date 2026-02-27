<template>
  <div
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]"
    @click.self="$emit('close')"
  >
    <div class="bg-white flex flex-col rounded-[10px] w-[800px] h-auto max-h-full overflow-auto animate-slideUp max-[768px]:w-full max-[768px]:h-full max-[768px]:rounded-none">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue'
import { useUIStore } from '@/stores/uiStore'
const uiStore = useUIStore()

defineEmits(['close'])

onMounted(() => uiStore.openModal())
onUnmounted(() => uiStore.closeModal())
</script>

