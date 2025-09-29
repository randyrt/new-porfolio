<template>
  <div class="flex h-screen">
    <aside class="w-64 h-screen  shadow-lg flex flex-col bg-gray-50"  data-aos="fade-left">
      <div class="p-6 text-xl font-bold">
        <span class="animated-gradient-text">{{ brand }}</span>
      </div>
      <nav class="flex-1 flex flex-col px-4 space-y-2">
        <router-link
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-gray-100"
          active-class="bg-gray-200 font-bold"
        >
          {{ route.name }}
        </router-link>
      </nav>
    </aside>

    <main class="flex-1 p-6 min-h-screen h-screen overflow-y-auto">
    <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface RouteItem {
  path: string;
  name: string;
}

const props = defineProps<{
  brand: string;
  routes: RouteItem[];
}>();
</script>

<style scoped>
.animated-gradient-text {
  background: linear-gradient(90deg, #facc15, #f87171, #3b82f6, #10b981, #facc15);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-move 5s ease infinite;
}

@keyframes gradient-move {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}


.decoration {
  text-decoration: none;
}
</style>
