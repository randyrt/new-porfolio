<template>
  <div class="flex h-screen flex-col md:flex-row">
    <header class="md:hidden flex justify-between items-center p-4 shadow bg-gray-50">
      <span class="animated-gradient-text font-bold text-xl">{{ brand }}</span>
      <button @click="isOpen = !isOpen" class="p-2 focus:outline-none">
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </header>
    <nav v-if="isOpen" class="md:hidden flex flex-col bg-gray-50 shadow px-4 py-2 space-y-2">
      <router-link v-for="route in routes" :key="route.path" :to="route.path"
        class="decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100"
        active-class="bg-violet-200 font-bold" @click="isOpen = false">
        {{ route.name }}
      </router-link>
    </nav>
    <aside class="hidden md:flex w-64 h-screen shadow-lg flex-col bg-gray-50">
      <div class="p-6 text-xl font-bold">
        <span class="animated-gradient-text">{{ brand }}</span>
      </div>
      <nav class="flex-1 flex flex-col px-4 space-y-2">
        <router-link v-for="route in routes" :key="route.path" :to="route.path"
          class="decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100"
          active-class="bg-violet-200 font-bold">
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
import { ref, defineProps } from 'vue';

interface RouteItem {
  path: string;
  name: string;
}

const props = defineProps<{
  brand: string;
  routes: RouteItem[];
}>();

const isOpen = ref(false);
</script>

<style scoped>
@media screen and (max-width: 748px) {
  .decoration {
    font-size: 10px !important;
  }

}
</style>