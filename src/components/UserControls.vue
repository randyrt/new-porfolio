<!-- components/UserControls.vue -->
<template>
    <div class="flex items-center gap-2 mb-2">
        <!-- Toggle Sidebar Button -->
        <div class="relative group" @click="toggleSidebar">
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
          bg-gray-800 text-white text-xs py-1 px-2 rounded
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none">
                <font-awesome-icon :icon="['fas', sidebarVisible ? 'chevron-left' : 'chevron-right']"
                    class="text-white text-xs mr-1" />
                {{ t('nav.toggle_sidebar') }}
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
                <font-awesome-icon :icon="['fas', sidebarVisible ? 'chevron-left' : 'chevron-right']" class="text-white text-lg filter drop-shadow-md
          group-hover:rotate-12 transition-transform duration-300" />
            </span>
        </div>

        <!-- Language Switcher -->
        <div class="relative group" @click="toggleLanguage">
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
          bg-gray-900 text-white text-xs py-1 px-2 rounded
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none">
                {{ t('nav.change_language') }}
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
                {{ t('nav.change_theme') }}
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
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { toggleTheme, getStoredTheme } from '../services/theme.js';

// Props
const props = defineProps<{
    sidebarVisible: boolean;
}>();

// Emits
const emit = defineEmits<{
    (e: 'update:sidebarVisible', value: boolean): void;
}>();

// I18n
const { t, locale } = useI18n();
const currentLocale = ref<string>(localStorage.getItem('locale') || 'fr');

// Theme
const currentTheme = ref<string>(getStoredTheme());

// Computed
const themeIcon = computed(() => {
    return currentTheme.value === 'light' ? ['fas', 'moon'] : ['fas', 'sun'];
});

// Methods
const toggleSidebar = () => {
    emit('update:sidebarVisible', !props.sidebarVisible);
};

const toggleLanguage = () => {
    const newLocale = currentLocale.value === 'fr' ? 'en' : 'fr';
    currentLocale.value = newLocale;
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
};

const cycleTheme = () => {
    const next = toggleTheme();
    currentTheme.value = next;
};

const openGithub = () => {
    window.open("https://github.com/randyrt", "_blank");
};

const openLinkedin = () => {
    window.open("https://www.linkedin.com/in/randy-andriantsiory-3a935828a", "_blank");
};

onMounted(() => {
    currentTheme.value = getStoredTheme();
});
</script>

<style scoped>
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
</style>