<template>
  <div class="app-container relative min-h-screen overflow-x-hidden">
    <div v-if="isMobile"
      class="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6 text-center">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-sm">
        <div class="text-6xl mb-6">{{ t('mobile.emoji') }}</div>
        <h2 class="text-2xl font-bold text-white mb-3">{{ t('mobile.title') }}</h2>
        <p class="!text-amber-500 mb-6">
          {{ t('mobile.message') }}
        </p>
        <div class="flex items-center justify-center gap-2 text-white/60 text-sm">
          <span>{{ t('mobile.recommendation_emoji') }}</span>
          <span>{{ t('mobile.recommendation') }}</span>
        </div>
      </div>
    </div>
    <GamificationToast />
    <GamificationWidget />
    <Navbar :brand="'randy@art.dev'" :routes="navRoutes" />

    <div v-if="$route.path !== '/chatbot'" class="hidden md:flex fixed top-30 left-70 z-[999] group">
      <div class="bg-green-500 rounded-lg">
        <div class="absolute top-full left-6 border-8 border-transparent border-t-gray-900/90"></div>
      </div>

      <router-link to="/chatbot"
        class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl shadow-xl shadow-green-500/40 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:shadow-green-500/60 transition-all duration-300 animate-float-bot relative group-active:scale-95 outline-none focus:ring-4 focus:ring-green-500/30 group"
        @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="cycleTooltipMessage">

        <div
          class="robot-smile w-16 h-16 bg-gradient-to-br from-green-600 to-sky-800 rounded-xl flex items-center justify-center shadow-lg relative">
          <font-awesome-icon icon="fa-solid fa-robot" class=" text-green-300 text-4xl relative icon-delay" />

          <font-awesome-icon icon="fa-solid fa-bolt"
            class="absolute text-green-300 text-sm top-1 left-1/2 transform -translate-x-1/2 icon-delay" />


          <div
            class="absolute top-6 right-4.5 w-3 h-3 bg-green-800 rounded-full flex items-center justify-center icon-delay">
            <div class="w-2.5 h-0.5 bg-green-400 rotate-45 absolute"></div>
            <div class="w-2.5 h-0.5 bg-green-400 -rotate-45 absolute"></div>
            <div class="absolute w-0.5 h-1 bg-green-300 -top-0.5"></div>
          </div>
        </div>

        <span v-if="showTooltip && $route.path !== '/chatbot'" :key="animationKey"
          class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-lg chat-tooltip-text whitespace-nowrap">
          {{ currentTooltipMessage }}
        </span>
        <span class="absolute inset-0 rounded-2xl animate-pulse-purple -z-10"></span>
      </router-link>
    </div>
    <AnalyticsDashboard />

  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Navbar from './components/NavBar.vue';
import { initColor } from './services/theme.js';
import { analytics } from './composables/analytics';
import { useGamification } from './composables/useGamification';

const { initSession } = useGamification()
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};


const redirectIfMobile = () => {
  if (isMobile.value && !sessionStorage.getItem('mobile_redirected')) {
    sessionStorage.setItem('mobile_redirected', 'true');
  }
};

onMounted(() => {
  checkMobile();
  redirectIfMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

onMounted(() => {
  initSession()
})

const { t, tm } = useI18n();
const route = useRoute();
const isHoveringBot = ref(false);
const tooltipMessageIndex = ref(0);
const animationKey = ref(0);
const showTooltip = ref(true);
let hideTimeout: ReturnType<typeof setTimeout>;


const getTooltipKeyFromPath = (path: string): string => {
  const routeMap: Record<string, string> = {
    '/': 'home',
    '/quality': 'quality',
    '/skills': 'skills',
    '/technology': 'technology',
    '/webcup24': 'webcup24',
    '/projects': 'projects',
    '/services': 'services',
    '/testimoniales': 'testimoniales',
    '/contact': 'contact',
    '/github-stats': 'github-stats',
    '/about': 'about'
  };
  return routeMap[path] || 'default';
};


const getContextualMessages = (): string[] => {
  const currentPath = route.path;
  const tooltipKey = getTooltipKeyFromPath(currentPath);


  const contextualMessages = tm(`chat.chat_tooltips.${tooltipKey}`) as string[];

  if (contextualMessages && contextualMessages.length > 0) {
    return contextualMessages;
  }


  const defaultMessages = tm('chat.chat_tooltips.default') as string[];
  return defaultMessages || [t('chat.chat_tooltip')];
};


const currentMessages = ref<string[]>([]);


watch(() => route.path, () => {
  currentMessages.value = getContextualMessages();
}, { immediate: true });


const tooltipMessages = computed(() => currentMessages.value);

const currentTooltipMessage = computed(() => {
  const messages = tooltipMessages.value;
  if (messages && messages.length > 0) {
    const index = tooltipMessageIndex.value % messages.length;
    return messages[index];
  }
  return t('chat.chat_tooltip');
});

const getRandomMessage = () => {
  const messages = tooltipMessages.value;
  if (messages && messages.length > 1) {
    return Math.floor(Math.random() * messages.length);
  }
  return 0;
};

const handleMouseEnter = () => {
  isHoveringBot.value = true;
  showTooltip.value = false;
};

const handleMouseLeave = () => {
  isHoveringBot.value = false;

  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }

  hideTimeout = setTimeout(() => {
    if (route.path !== '/chatbot') {
      showTooltip.value = true;
      animationKey.value++;
    }
  }, 100);
};

const cycleTooltipMessage = () => {
  tooltipMessageIndex.value = getRandomMessage();
  animationKey.value++;
};

let rotationInterval: ReturnType<typeof setInterval>;

const startAutoRotation = () => {
  rotationInterval = setInterval(() => {
    if (document.visibilityState === 'visible' && !isHoveringBot.value && route.path !== '/chatbot') {
      tooltipMessageIndex.value = getRandomMessage();
      animationKey.value++;
    }
  }, 15000);
};


watch(() => route.path, (newPath, oldPath) => {
  if (newPath === '/chatbot') {
    showTooltip.value = false;
    return;
  }


  if (oldPath === '/chatbot' || oldPath !== newPath) {
    showTooltip.value = true;
    tooltipMessageIndex.value = getRandomMessage();
    animationKey.value++;
  }
});

onMounted(() => {
  initColor();
  currentMessages.value = getContextualMessages();

  if (route.path !== '/chatbot') {
    showTooltip.value = true;
    tooltipMessageIndex.value = getRandomMessage();
    animationKey.value++;
  } else {
    showTooltip.value = false;
  }

  startAutoRotation();
});

onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
});

watch(() => route.path, (newPath, oldPath) => {
  analytics.trackPageView(newPath);
}, { immediate: true });

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const clickable = target.closest('a, button, [data-track]');
    if (clickable) {
      const element = clickable.getAttribute('data-track') ||
        clickable.tagName.toLowerCase() +
        (clickable.textContent ? ':' + clickable.textContent.slice(0, 30) : '');
      const section = route.path;
      analytics.trackClick(element, section);
    }
  });
});


let pageEnterTime = Date.now();
let currentPath = route.path;

watch(() => route.path, (newPath, oldPath) => {
  if (oldPath) {
    const duration = (Date.now() - pageEnterTime) / 1000;
    if (duration > 3) {
      analytics.trackSectionTime(oldPath, duration);
    }
  }
  pageEnterTime = Date.now();
  currentPath = newPath;
});


const saveTimeOnUnload = () => {
  const duration = (Date.now() - pageEnterTime) / 1000;
  if (duration > 3) {
    analytics.trackSectionTime(currentPath, duration);
  }
};

onMounted(() => {
  window.addEventListener('beforeunload', saveTimeOnUnload);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', saveTimeOnUnload);
});

const navRoutes = computed(() => [
  { path: '/', name: t('nav.home'), icon: 'home' },
  { path: '/quality', name: t('nav.quality'), icon: 'star' },
  { path: '/skills', name: t('nav.skills'), icon: 'code' },
  { path: '/technology', name: t('nav.technology'), icon: 'cogs' },
  { path: '/webcup24', name: t('nav.webcup'), icon: 'trophy' },
  { path: '/projects', name: t('nav.projects'), icon: 'project-diagram' },
  { path: '/services', name: t('nav.services'), icon: 'briefcase' },
  { path: '/testimoniales', name: t('nav.testimonials'), icon: 'quote-right' },
  { path: '/contact', name: t('nav.contact'), icon: ['fas', 'envelope'] },
  { path: '/github-stats', name: t('nav.github_stats'), icon: ['fab', 'github'] },
  { path: '/about', name: t('nav.about'), icon: ['fas', 'info-circle'] },
]);
</script>

<style>
.dark {
  background-color: #1A1A1A;
  color: #ffffff;
}

.reduce-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

@keyframes float-bot {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

.animate-float-bot {
  animation: float-bot 4s ease-in-out infinite;
}

@keyframes pulse-purple {
  0% {
    box-shadow: 0 0 0 0 rgba(19, 131, 175, 0.4);
    transform: scale(1);
  }

  70% {
    box-shadow: 0 0 0 20px rgba(25, 131, 180, 0);
    transform: scale(1.1);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(11, 94, 161, 0);
    transform: scale(1);
  }
}

.animate-pulse-purple {
  animation: pulse-purple 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes typing-text {
  0% {
    max-width: 0;
    opacity: 0;
    transform: translateX(-5px);
  }

  100% {
    max-width: 300px;
    opacity: 1;
    transform: translateX(0);
  }
}

.chat-tooltip-text {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
  max-width: 300px;
  width: auto;
  animation: typing-text 1.5s steps(40, end) forwards;
}

@keyframes typing-text {
  0% {
    max-width: 0;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    max-width: 600px;
    opacity: 1;
  }
}

@keyframes robot-smile {
  0% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(1.1);
  }

  100% {
    transform: scaleY(1.05);
  }
}

.robot-smile {
  animation: robot-smile 3s ease-in-out infinite;
  filter: brightness(1.2) drop-shadow(0 0 8px rgba(218, 218, 9, 0.5));
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #F59E0B;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #F59E0B;
}

.icon-delay {
  animation: arcCircle 1.3s cubic-bezier(0.45, 1.1, 0.3, 0.95) 0.3s forwards;
  opacity: 0;
}

.icon-delay {
  animation: slingEffect 1.3s cubic-bezier(0.5, 1.3, 0.4, 0.9) 0.3s forwards;
  opacity: 0;
}

@keyframes slingEffect {
  0% {
    opacity: 0;
    transform: translate(70px, 100px) rotate(-15deg) scale(0.5);
  }

  30% {
    opacity: 0.6;
    transform: translate(45px, 70px) rotate(-5deg) scale(0.65);
  }

  55% {
    opacity: 0.85;
    transform: translate(10px, 35px) rotate(10deg) scale(0.85);
  }

  75% {
    opacity: 0.95;
    transform: translate(-15px, 5px) rotate(18deg) scale(1.0);
  }

  90% {
    transform: translate(-5px, -3px) rotate(3deg) scale(1.03);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
}

.container-delay {
  animation: containerStable 0.8s ease-out 0s forwards;
  opacity: 0;
}

@keyframes containerStable {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>