<template>
  <div class="relative flex flex-col items-center group cursor-pointer">
    <img
      :src="logo"
      :alt="name"
      class="!w-20 !h-20 transition-transform duration-300 group-hover:scale-110"
    />

    <div
      class="absolute bottom-[-70px] bg-gray-900 text-white text-sm rounded-xl px-3 py-2 shadow-lg opacity-0 translate-y-3 
             group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-auto"
    >
      <p class="font-bold">{{ name }}</p>
      <p class="text-xs italic opacity-80">{{ command }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logo: string;     
  name: string;     
  command: string; 
}>();
</script>

<style scoped>
img {
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3));
}
</style>
