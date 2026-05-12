<template>
  <Loading v-if="loading" :message="$t('about.loading')" />
  <div v-else class="p-4 w-full space-y-4 flex flex-col items-center justify-center">
    <AnimatedTitle :text="$t('about.quote')" aos="fade-down" />
    <div class="text-center max-w-2xl mx-auto px-4" data-aos="fade-up">
      <p class="text-lg italic text-gray-700 dark:text-gray-300">
        <span class="text-violet-800 text-lg">« </span>
        <span class="typing-text">{{ $t('about.text_italic') }}</span>
        <span class="text-violet-800 text-lg"> »</span>
      </p>
    </div>
    <div class="relative group" data-aos="fade-down" data-aos-delay="1000">
      <div class="absolute top-3.5 right-3 z-10">
        <div class="bg-sky-500 text-blue-500 text-xs px-2 py-1 rounded-lg shadow-lg animate-pulse">
         Focus. Build. Result.
        </div>
      </div>
      <div class="absolute -top-2 -left-2 w-6 h-6 border-t-3 border-l-3 border-sky-800 rounded-tl-lg"></div>
      <div class="absolute -top-2 -right-2 w-6 h-6 border-t-3 border-r-3 border-sky-800 rounded-tr-lg"></div>
      <div class="absolute -bottom-2 -left-2 w-6 h-6 border-b-3 border-l-3 border-sky-800 rounded-bl-lg"></div>
      <div class="absolute -bottom-2 -right-2 w-6 h-6 border-b-3 border-r-3 border-sky-800 rounded-br-lg"></div>

      <div class="bg-white dark:bg-white rounded-lg p-2 shadow-lg">
        <img src="/images/me/me_working.png" alt="Randy's portrait" class="max-w-lg mx-auto" />
      </div>
    </div>
  </div>
  <div class="p-4 w-full flex flex-col items-center justify-center max-w-4xl mx-auto">
    <section class="stats-section flex flex-wrap justify-center gap-8 py-8">
      <div v-for="stat in stats" :key="stat.labelKey" class="text-center">
        <div class="text-6xl font-bold text-violet-600">
          {{ stat.displayValue }}{{ stat.suffix }}
        </div>
        <div class="text-sm text-gray-500">{{ $t(stat.labelKey) }}</div>
      </div>
    </section>
    <section class="grid md:grid-cols-3 gap-6 ">
      <div v-for="value in values" :key="value.title"
        class="text-center p-4 border-2 border-purple-50 rounded-lg bg-gradient-to-br from-purple-50 to-white">
        <font-awesome-icon :icon="value.icon" class="text-4xl text-violet-600 mb-3" />
        <h3 class="font-bold">{{ value.title }}</h3>
        <p class="text-sm text-gray-500">{{ value.description }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted, onUnmounted, computed } from "vue"
import { useI18n } from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const { t } = useI18n()

useHead({
  title: computed(() => t('about.meta_title')),
  meta: [
    {
      name: 'Conclusion',
      content: computed(() => t('about.meta_desc'))
    }
  ]
})


const loading = ref(true)

const stats = ref([
  { value: 15, displayValue: 0, labelKey: "about.stats.projects", suffix: "+" },
  { value: 15, displayValue: 0, labelKey: "about.stats.clients", suffix: "+" },
  { value: 5, displayValue: 0, labelKey: "about.stats.years", suffix: "+" },
])

let animationFrame: number
let startTime: number | null = null
const duration = 2000

const values = computed(() => [
  { icon: "fas fa-rocket", title: t('about.values.innovation_title'), description: t('about.values.innovation_desc') },
  { icon: "fas fa-handshake", title: t('about.values.trust_title'), description: t('about.values.trust_desc') },
  { icon: "fas fa-lightbulb", title: t('about.values.creativity_title'), description: t('about.values.creativity_desc') }
])

const animateCounters = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const progress = Math.min((timestamp - startTime) / duration, 1)

  stats.value.forEach(stat => {
    stat.displayValue = Math.floor(progress * stat.value)
  })

  if (progress < 1) {
    animationFrame = requestAnimationFrame(animateCounters)
  } else {
    stats.value.forEach(stat => {
      stat.displayValue = stat.value
    })
  }
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animateCounters)
    }, 500)
  }, 1000)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})


</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar-button {
  display: none !important;
  height: 0 !important;
  width: 0 !important;
}

.custom-scrollbar {
  border-radius: 0.5rem;
  overflow-y: auto;
  clip-path: inset(0 round 0.5rem);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
  opacity: 0;
}

.modal-enter-to .bg-white,
.modal-leave-from .bg-white {
  transform: scale(1);
  opacity: 1;
}

.custom-multi-gradient {
  background: linear-gradient(to bottom,
      #22c55e 0%,
      #22c55e 25%,
      #3b82f6 25%,
      #3b82f6 50%,
      #8b5cf6 50%,
      #8b5cf6 75%,
      #000000 75%,
      #000000 100%);
}
</style>