<template>
  <div class="relative flex flex-col items-center group cursor-pointer images" @click="haha">
    <img
      :src="logo"
      :alt="name"
      class="!w-15 !h-15 transition-transform duration-300 group-hover:scale-110 p-3 rounded-full card"
    />

    <div
      class="absolute bottom-[-60px] card text-gray-600 text-sm rounded-xl px-3 py-2 shadow-lg opacity-0 translate-y-3 
             group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-auto"
    >
      <p class="font-bold text-xs">{{ name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'

const toast = useToast()

function haha() {
  toast.info("Oups 😆 ! Cette action n’a aucun effet.");
}


defineProps<{
  logo: string;     
  name: string;     
}>();
</script>

<style scoped>
img {
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3));
}

@media screen and (max-width: 748px) {
  img {
    width: 20px !important;
    height: 20px !important;
  }
}
</style>
