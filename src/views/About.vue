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
    <div class="relative w-full max-w-4xl mx-auto mt-8" data-aos="fade-up">
      <div class="relative flex flex-col md:flex-row items-center gap-8 p-6 card">
        <div class="relative flex-shrink-0">
          <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4">
            <img 
              src="/images/me/real.jpeg" 
              alt="Photo de Randy" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 rounded-full border-2 border-violet-300/50 animate-pulse"></div>
          </div>
          <div class="absolute -bottom-2 -right-2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {{ $t('about.badge') }}
          </div>
        </div>
        <div class="flex-1 text-center md:text-left space-y-3">
          <h2 class="text-2xl font-bold text-violet-800 dark:text-violet-400">
            {{ $t('about.who_am_i') }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ $t('about.intro_text') }}
          </p>
          <div class="flex flex-wrap gap-2 justify-center md:justify-start">
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 !text-white dark:text-blue-300 text-sm rounded-full">
               {{ $t('about.skills.frontend') }}
            </span>
            <span class="px-3 py-1 bg-violet-300 dark:bg-violet-900/30 !text-white dark:text-violet-300 text-sm rounded-full">
               {{ $t('about.skills.backend') }}
            </span>
            <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 !text-white dark:text-green-300 text-sm rounded-full">
               {{ $t('about.skills.devops') }}
            </span>
          </div>
        </div>

        <!-- Éléments décoratifs flottants -->
        <div class="absolute -top-4 -left-4 w-12 h-12 bg-violet-200/30 dark:bg-violet-800/20 rounded-full blur-xl"></div>
        <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl"></div>
      </div>
    </div>
  </div>
  
  <!-- Le reste du template reste inchangé -->
 <div class="p-4 w-full flex flex-col items-center justify-center max-w-4xl  mx-auto">
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
/* Vos styles existants... */
</style>


