<template>
  <div class="flex h-screen flex-col md:flex-row">
    <header class="md:hidden flex justify-between items-center p-4 shadow bg-gray-50">
      <div class="flex items-center gap-3">
        <span class="animated-gradient-text font-bold text-xl">{{ brand }}</span>
        <span class="rounded-full p-1 border-3 border-violet-500 bg-white cursor-pointer" @click="cycleTheme">
          <font-awesome-icon :icon="themeIcon" class="text-yellow-500" />
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
        <div class="relative ml-6" @click="cycleTheme">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
            bg-gray-900 text-white text-xs py-1 px-2 rounded
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none">
            Changer de thème
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 
                border-4 border-transparent border-t-gray-900"></div>
          </div>

          <span class="group relative flex h-10 w-10 items-center justify-center
               bg-gradient-to-br from-violet-500 to-purple-600
               rounded-xl shadow-lg shadow-violet-500/30
               hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]
               hover:scale-110 hover:from-violet-400 hover:to-purple-500
               active:scale-95
               transition-all duration-300 ease-out cursor-pointer
               border border-white/30
               animate-pulse-slow">
            <font-awesome-icon :icon="themeIcon" class="text-white text-lg filter drop-shadow-md
                              group-hover:rotate-12 transition-transform duration-300" />
          </span>
        </div>
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