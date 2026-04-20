<template>
  <div class="app-container relative min-h-screen overflow-x-hidden">
    <Navbar :brand="'randy@art.dev'" :routes="navRoutes" />

    <div v-if="$route.path !== '/chatbot'" class="hidden md:flex fixed top-30 left-70 z-[999] group">
      <div class="bg-violet-500 rounded-lg">
        <div class="absolute top-full left-6 border-8 border-transparent border-t-gray-900/90"></div>
      </div>

      <router-link to="/chatbot"
        class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-2xl shadow-xl shadow-purple-500/40 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 animate-float-bot relative group-active:scale-95 outline-none focus:ring-4 focus:ring-purple-500/30 group"
        @mouseenter="isHoveringBot = true" @mouseleave="isHoveringBot = false" @click="cycleTooltipMessage">
        <font-awesome-icon icon="fa-solid fa-robot" class="text-3xl filter drop-shadow-lg transition-all duration-200"
          :class="[isHoveringBot ? 'robot-smile' : '', 'text-sky-300']" />

        <span
          :key="animationKey"
          class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-purple-700 text-white text-sm font-medium rounded-lg shadow-lg chat-tooltip-text"
          :class="tooltipVisible ? 'opacity-100' : 'opacity-0'">
          {{ currentTooltipMessage }}
          <span class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-700 rotate-45"></span>
        </span>

        <span class="absolute -top-1 -right-1 flex h-5 w-5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span
            class="relative inline-flex rounded-full h-5 w-5 bg-amber-500 border-3 border-yello-500 dark:border-yellow-200 shadow-lg"></span>
        </span>

        <span class="absolute inset-0 rounded-2xl animate-pulse-purple -z-10"></span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from './components/NavBar.vue';

const { t, tm } = useI18n();
const isHoveringBot = ref(false);
const tooltipMessageIndex = ref(0);
const tooltipVisible = ref(true);
const animationKey = ref(0);


const tooltipMessages = computed(() => {
  return tm('chat.chat_tooltips') as string[];
});


const currentTooltipMessage = computed(() => {
  const messages = tooltipMessages.value;
  if (messages && messages.length > 0) {
    return messages[tooltipMessageIndex.value];
  }
  return t('chat.chat_tooltip');
});


const getRandomMessage = () => {
  const messages = tooltipMessages.value;
  if (messages && messages.length > 1) {
    const randomIndex = 1 + Math.floor(Math.random() * (messages.length - 1));
    return randomIndex;
  }
  return 0;
};


const cycleTooltipMessage = () => {
  tooltipMessageIndex.value = getRandomMessage();
  animationKey.value++; 
};


let rotationInterval: ReturnType<typeof setInterval>;

const startAutoRotation = () => {
  rotationInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      tooltipMessageIndex.value = getRandomMessage();
      animationKey.value++; 
    }
  }, 15000);
};

onMounted(() => {
  tooltipMessageIndex.value = 0;
  startAutoRotation();
});

onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
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
  background-color: #1a1a1a;
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
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
    transform: scale(1);
  }

  70% {
    box-shadow: 0 0 0 20px rgba(139, 92, 246, 0);
    transform: scale(1.1);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
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
  animation: robot-smile 0.5s ease-in-out forwards;
  filter: brightness(1.2) drop-shadow(0 0 8px rgba(255, 255, 0, 0.5));
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #a78bfa;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #8b5cf6;
}
</style>