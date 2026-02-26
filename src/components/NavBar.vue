<template>
  <div class="flex h-screen flex-col md:flex-row">
    <header class="md:hidden flex justify-between items-center p-4 shadow bg-gray-50">
      <div class="flex items-center gap-3">
        <span class="animated-gradient-text font-bold text-xl">{{ brand }}</span>
        <span class="rounded-full p-1 border-3 border-violet-500 bg-white cursor-pointer" @click="cycleTheme">
          <font-awesome-icon :icon="themeIcon" class="text-gray-500" />
        </span>
      </div>
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
        class="decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100 flex items-center gap-2"
        active-class="bg-violet-200 font-bold">
        <font-awesome-icon :icon="route.icon" class="text-gray-500" />
        <span>{{ route.name }}</span>
      </router-link>
    </nav>
    <aside class="hidden md:flex w-64 h-screen shadow-lg flex-col bg-gray-50">
      <div class="p-6 text-xl font-bold flex items-center justify-between">
        <span class="animated-gradient-text cursor-pointer" @click="goHome">{{ brand }}</span>
        <span class="rounded-full p-1 border-2 border-violet-500 bg-white
         hover:bg-white hover:shadow-[0_0_14px_rgba(255,255,255,0.95)]
         hover:-translate-y-[1px]
         transition duration-300 cursor-pointer" @click="cycleTheme">
          <font-awesome-icon :icon="themeIcon" class="text-yellow-500" />
        </span>
      </div>
      <nav class="flex-1 flex flex-col px-4 space-y-2">
        <router-link v-for="route in routes" :key="route.path" :to="route.path"
          class="decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100 flex items-center gap-2"
          active-class="bg-violet-200 font-bold">
          <font-awesome-icon :icon="route.icon" class="text-gray-500" />
          <span>{{ route.name }}</span>
        </router-link>

      </nav>
    </aside>

    <main class="flex-1 p-6 min-h-screen h-screen overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { toggleTheme, getStoredTheme } from '../services/theme.js';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router'


interface RouteItem {
  icon: any;
  path: string;
  name: string;
}

const props = defineProps<{
  brand: string;
  routes: RouteItem[];
}>();

const isOpen = ref(false);
const currentTheme = ref<string>(getStoredTheme());
const router = useRouter();

// Icône du thème en fonction de currentTheme
const themeIcon = computed(() => {
  return currentTheme.value === 'light' ? ['fas', 'moon'] : ['fas', 'sun'];
});

function cycleTheme() {
  const next = toggleTheme();
  currentTheme.value = next;
}

function goHome() {
  router.push('/')
}

onMounted(() => {
  currentTheme.value = getStoredTheme()
})
</script>

<style scoped>
@media screen and (max-width: 748px) {
  .decoration {
    font-size: 10px !important;
    text-decoration: none !important;
  }

}
</style>