<template>
  <div class="grid gap-8 my-8 mx-auto px-4 grid-cols-1 min-[758px]:grid-cols-2 min-[1250px]:grid-cols-3 min-[1250px]:my-12">
    <div
      class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col gap-4 pointer-events-none"
      v-for="n in count"
      :key="'skeleton-'+n"
    >
      <div>
        <div class="w-full h-40 bg-border rounded-lg animate-pulse"></div>
      </div>
      <div class="p-4">
        <div class="flex flex-col justify-center items-center">
          <div class="h-3.5 bg-border rounded-[7px] mb-2 animate-pulse w-[40%]"></div>
          <div class="h-3.5 bg-border rounded-[7px] mb-2 animate-pulse w-[80%]"></div>
        </div>
        <div class="flex justify-center items-center text-center h-[100px]">
          <div class="h-3.5 bg-border rounded-[7px] mb-2 animate-pulse w-[80%]"></div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="h-3.5 bg-border rounded-[7px] mb-2 animate-pulse w-[40%]"></div>
          <div class="h-[25px] bg-border rounded-[7px] mb-2 animate-pulse w-[30%]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 5
  }
})
</script>
