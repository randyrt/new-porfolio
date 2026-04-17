<!-- components/MobileHeader.vue -->
<template>
    <header class="md:hidden flex justify-between items-center p-4 shadow bg-gray-50">
        <div class="flex items-center">
            <span class="animated-gradient-text font-bold text-xl">{{ brand }}</span>
            <button @click="isOpen = !isOpen" class="p-2 !mr-4 focus:outline-none">
                <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Version simplifiée des contrôles pour mobile -->
            <div class="flex items-center gap-1 ml-2">
                <div class="relative group" @click="toggleLanguageMobile">
                    <span
                        class="flex h-8 w-8 items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg cursor-pointer">
                        <span class="text-white text-xs font-bold uppercase">{{ currentLocaleMobile }}</span>
                    </span>
                </div>

                <div class="relative group" @click="cycleThemeMobile">
                    <span
                        class="flex h-8 w-8 items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-lg cursor-pointer">
                        <font-awesome-icon :icon="themeIconMobile" class="text-white text-xs" />
                    </span>
                </div>

                <div class="relative group" @click="openGithubMobile">
                    <span
                        class="flex h-8 w-8 items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg cursor-pointer">
                        <font-awesome-icon :icon="['fab', 'github']" class="text-white text-xs" />
                    </span>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { toggleTheme, getStoredTheme } from '../services/theme.js';

defineProps<{
    brand: string;
    isOpen: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
}>();

const { t, locale } = useI18n();
const currentLocaleMobile = ref(localStorage.getItem('locale') || 'fr');
const currentThemeMobile = ref(getStoredTheme());

const themeIconMobile = computed(() => {
    return currentThemeMobile.value === 'light' ? ['fas', 'moon'] : ['fas', 'sun'];
});

const toggleLanguageMobile = () => {
    const newLocale = currentLocaleMobile.value === 'fr' ? 'en' : 'fr';
    currentLocaleMobile.value = newLocale;
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
};

const cycleThemeMobile = () => {
    const next = toggleTheme();
    currentThemeMobile.value = next;
};

const openGithubMobile = () => {
    window.open("https://github.com/randyrt", "_blank");
};
</script>