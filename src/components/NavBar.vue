<template>
  <div class="flex h-screen flex-col md:flex-row">
    <header class="md:hidden flex justify-between items-center p-4 shadow bg-gray-50">
      <div class="flex items-center">
        <span class="animated-gradient-text font-bold text-xl">{{ brand }}</span>
        <button @click="isOpen = !isOpen" class="p-2 !mr-4 focus:outline-none">
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="flex items-center">
          <!-- Language Switcher -->
          <div class="relative group" @click="toggleLanguage">
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                bg-gray-900 text-white text-xs py-1 px-2 rounded
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none">
              {{ $t('nav.change_language') }}
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 
                  border-4 border-transparent border-t-gray-900"></div>
            </div>

            <span class="group relative flex h-10 w-10 items-center justify-center
                 bg-gradient-to-br from-emerald-500 to-teal-600
                 rounded-xl shadow-lg shadow-emerald-500/30
                 hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]
                 hover:scale-110 hover:from-emerald-400 hover:to-teal-500
                 active:scale-95
                 transition-all duration-300 ease-out cursor-pointer
                 border border-white/30">
              <span class="text-white text-sm font-bold uppercase tracking-wide filter drop-shadow-md
                   group-hover:rotate-12 transition-transform duration-300">
                {{ currentLocale }}
              </span>
            </span>
          </div>

          <!-- Theme Switcher -->
          <div class="relative group" @click="cycleTheme">
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                bg-gray-900 text-white text-xs py-1 px-2 rounded
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none">
              {{ $t('nav.change_theme') }}
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
          <!-- GitHub Button -->
          <div class="relative group" @click="openGithub">
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                bg-gray-900 text-white text-xs py-1 px-2 rounded
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none">
              GitHub
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 
                  border-4 border-transparent border-t-gray-900"></div>
            </div>

            <span class="group relative flex h-10 w-10 items-center justify-center
                 bg-gradient-to-br from-gray-700 to-gray-900
                 rounded-xl shadow-lg shadow-gray-700/30
                 hover:shadow-[0_0_25px_rgba(51,65,85,0.7)]
                 hover:scale-110 hover:from-gray-600 hover:to-gray-800
                 active:scale-95
                 transition-all duration-300 ease-out cursor-pointer
                 border border-white/30">
              <font-awesome-icon :icon="['fab', 'github']" class="text-white text-lg filter drop-shadow-md
               group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </div>

          <!-- LinkedIn Button -->
          <div class="relative group" @click="openLinkedin">
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                bg-gray-900 text-white text-xs py-1 px-2 rounded
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none">
              LinkedIn
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 
                  border-4 border-transparent border-t-gray-900"></div>
            </div>

            <span class="group relative flex h-10 w-10 items-center justify-center
                 bg-gradient-to-br from-blue-600 to-blue-800
                 rounded-xl shadow-lg shadow-blue-600/30
                 hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]
                 hover:scale-110 hover:from-blue-500 hover:to-blue-700
                 active:scale-95
                 transition-all duration-300 ease-out cursor-pointer
                 border border-white/30">
              <font-awesome-icon :icon="['fab', 'linkedin']" class="text-white text-lg filter drop-shadow-md
               group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </div>
    </header>
    <Transition name="menu-slide">
      <nav v-if="isOpen" class="md:hidden flex flex-col bg-gray-50 shadow px-4 py-2 space-y-2">
        <router-link v-for="route in routes" :key="route.path" :to="route.path"
          class="decoration rounded-md !text-gray-500 hover:bg-violet-100 flex items-center"
          active-class="bg-violet-200 font-bold">
          <font-awesome-icon :icon="route.icon" class="text-gray-500" />
          <span>{{ route.name }}</span>
        </router-link>
      </nav>
    </Transition>
    <Transition name="sidebar-slide">
      <aside v-if="sidebarVisible" class="hidden md:flex w-64 shadow-lg flex-col bg-gray-50 transition-all duration-300 p-2">
      <div class="p-4 text-xl font-bold flex items-center justify-between">
        <span class="animated-gradient-text cursor-pointer text-3xl" @click="goHome">{{ brand }}</span>
      </div>

      <div class="flex items-center gap-2 mb-2">
        <!-- Toggle Sidebar Button  -->
        <div class="relative group" @click="sidebarVisible = !sidebarVisible">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
        bg-gray-800 text-white text-xs py-1 px-2 rounded
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none">
            <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white text-xs mr-1" />
            {{ $t('nav.reading_mode') }}
            <div class="absolute -bottom-1 left-1/3 -translate-x-1/2 
          border-4 border-transparent border-t-gray-800"></div>
          </div>

          <span class="group relative flex h-10 w-10 items-center justify-center
         bg-gradient-to-br from-gray-500 to-gray-600
         rounded-xl shadow-lg shadow-gray-500/30
         hover:shadow-[0_0_25px_rgba(107,114,128,0.7)]
         hover:scale-110 hover:from-gray-400 hover:to-gray-500
         active:scale-95
         transition-all duration-300 ease-out cursor-pointer
         border border-white/30">
            <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white text-lg filter drop-shadow-md
           group-hover:rotate-12 transition-transform duration-300" />
          </span>
        </div>

        <!-- Language Switcher -->
        <div class="relative group" @click="toggleLanguage">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
            bg-gray-900 text-white text-xs py-1 px-2 rounded
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none">
            {{ $t('nav.change_language') }}
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 
              border-4 border-transparent border-t-gray-900"></div>
          </div>

          <span class="group relative flex h-10 w-10 items-center justify-center
             bg-gradient-to-br from-emerald-500 to-teal-600
             rounded-xl shadow-lg shadow-emerald-500/30
             hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]
             hover:scale-110 hover:from-emerald-400 hover:to-teal-500
             active:scale-95
             transition-all duration-300 ease-out cursor-pointer
             border border-white/30">
            <span class="text-white text-sm font-bold uppercase tracking-wide filter drop-shadow-md
               group-hover:rotate-12 transition-transform duration-300">
              {{ currentLocale }}
            </span>
          </span>
        </div>

        <!-- Theme Switcher -->
        <div class="relative group" @click="cycleTheme">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
            bg-gray-900 text-white text-xs py-1 px-2 rounded
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none">
            {{ $t('nav.change_theme') }}
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
             border border-white/30">
            <font-awesome-icon :icon="themeIcon" class="text-white text-lg filter drop-shadow-md
                    group-hover:rotate-12 transition-transform duration-300" />
          </span>
        </div>

        <!-- GitHub Button -->
        <div class="relative group" @click="openGithub">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
            bg-gray-900 text-white text-xs py-1 px-2 rounded
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none">
            GitHub
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 
              border-4 border-transparent border-t-gray-900"></div>
          </div>

          <span class="group relative flex h-10 w-10 items-center justify-center
             bg-gradient-to-br from-gray-700 to-gray-900
             rounded-xl shadow-lg shadow-gray-700/30
             hover:shadow-[0_0_25px_rgba(51,65,85,0.7)]
             hover:scale-110 hover:from-gray-600 hover:to-gray-800
             active:scale-95
             transition-all duration-300 ease-out cursor-pointer
             border border-white/30">
            <font-awesome-icon :icon="['fab', 'github']" class="text-white text-lg filter drop-shadow-md
           group-hover:rotate-12 transition-transform duration-300" />
          </span>
        </div>

        <!-- LinkedIn Button -->
        <div class="relative group" @click="openLinkedin">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
            bg-gray-900 text-white text-xs py-1 px-2 rounded
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none">
            LinkedIn
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 
              border-4 border-transparent border-t-gray-900"></div>
          </div>

          <span class="group relative flex h-10 w-10 items-center justify-center
             bg-gradient-to-br from-blue-600 to-blue-800
             rounded-xl shadow-lg shadow-blue-600/30
             hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]
             hover:scale-110 hover:from-blue-500 hover:to-blue-700
             active:scale-95
             transition-all duration-300 ease-out cursor-pointer
             border border-white/30">
            <font-awesome-icon :icon="['fab', 'linkedin']" class="text-white text-lg filter drop-shadow-md
           group-hover:rotate-12 transition-transform duration-300" />
          </span>
        </div>

      </div>
      <div class="px-1">
        <div class="h-0.5" style="background: linear-gradient(to right, 
            #858182 0%,
            #858182 20%,
            #10b981 20%,
            #10b981 40%,
            #8b5cf6 40%,
            #8b5cf6 60%,
            #374151 60%,
            #374151 80%,
            #2563eb 80%,
            #2563eb 100%);">
        </div>
      </div>
      <CurrentActivity />
      <Transition name="menu-slide">
        <nav class="flex-1 flex flex-col px-2 space-y-2 rounded-lg pt-4 text-sm">
          <router-link v-for="route in routes" :key="route.path" :to="route.path"
            class="decoration border-1 border-purple-200  px-4 py-2 rounded-md !text-gray-500 hover:bg-purple-100 flex items-center gap-2"
            active-class="bg-purple-200 font-bold">
            <font-awesome-icon :icon="route.icon" class="text-gray-500" />
            <span>{{ route.name }}</span>
          </router-link>
        </nav>
      </Transition>
      <MultiWorldClock />
    </aside>
    </Transition>

    <button v-if="!sidebarVisible" @click="sidebarVisible = true"
      class="fixed top-4 left-4 z-50 p-3 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-110 transition-all duration-300 focus:outline-none flex justify-center items-center animate-pulse-slow">
      <font-awesome-icon :icon="['fas', 'bars']" class="text-white text-lg" />
    </button>

    <main class="flex-1 p-6 min-h-screen h-screen overflow-y-auto transition-all duration-300"
      :class="{ 'md:ml-0': !sidebarVisible }">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { toggleTheme, getStoredTheme } from '../services/theme.js';
import MultiWorldClock from './MultiWorldClock.vue'
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n';
import CurrentActivity from './CurrentActivity.vue';


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
const sidebarVisible = ref(true);

const { locale } = useI18n();
const currentLocale = ref<string>(localStorage.getItem('locale') || 'fr');

function toggleLanguage() {
  const newLocale = currentLocale.value === 'fr' ? 'en' : 'fr';
  currentLocale.value = newLocale;
  locale.value = newLocale; // Update i18n
  localStorage.setItem('locale', newLocale);
}

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

function openGithub() {
  window.open("https://github.com/randyrt", "_blank")
}

function openLinkedin() {
  window.open("https://www.linkedin.com/in/randy-andriantsiory-3a935828a", "_blank")
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

/* Animation personnalisée pour le thème uniquement */
@keyframes pulse-slow {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
  }

  50% {
    box-shadow: 0 0 0 6px rgba(139, 92, 246, 0);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s infinite;
}

@keyframes pulse-slow {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
    opacity: 1;
  }

  50% {
    box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
    opacity: 0.9;
  }
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.menu-slide-enter-to,
.menu-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Sidebar slide transition */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: all 0.3s ease;
}

.sidebar-slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.sidebar-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>