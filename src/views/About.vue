<template>
  <Loading v-if="loading" :message="$t('about.loading')" />
  <div v-else class="p-4 w-full space-y-12 flex flex-col items-center justify-center overflow-hidden">
    <AnimatedTitle :text="$t('about.quote')" aos="fade-down" />
    <div class="text-center max-w-2xl mx-auto px-4" data-aos="fade-up">
      <p class="text-lg italic text-slate-700 dark:text-slate-300 sm:text-xl leading-relaxed">
        <span class="text-violet-800 text-lg">« </span>
        <span class="typing-text">{{ $t('about.text_italic') }}</span>
        <span class="text-violet-800 text-lg"> »</span>
      </p>
    </div>
    <div class="relative w-full max-w-5xl mx-auto mt-8" data-aos="fade-up">
      <div class="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.14),_transparent_30%)]"></div>
      <div class="relative glass-panel overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 p-8 shadow-[0_30px_90px_-50px_rgba(99,102,241,0.9)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-950/70">
        <div class="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div class="absolute -bottom-10 left-0 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl"></div>
        <div class="relative flex flex-col gap-10 md:flex-row md:items-center">
          <div class="relative flex-shrink-0">
            <div class="relative h-52 w-52 rounded-full border border-violet-300/30 bg-gradient-to-br from-violet-100/40 to-sky-100/30 p-1 shadow-[0_20px_80px_-40px_rgba(124,58,237,0.7)]">
              <div class="relative h-full w-full overflow-hidden rounded-full bg-slate-950">
                <img src="/images/me/real.jpeg" alt="Photo de Randy" class="h-full w-full object-cover" />
                <div class="absolute inset-0 rounded-full border-2 border-violet-300/50 animate-pulse"></div>
              </div>
            </div>
            <div class="absolute -bottom-2 -right-2 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
              {{ $t('about.badge') }}
            </div>
          </div>
          <div class="flex-1 text-center md:text-left space-y-4">
            <div class="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100/60 px-4 py-2 text-sm font-semibold text-violet-800 shadow-sm dark:border-violet-800/40 dark:bg-violet-900/20 dark:text-violet-200">
              <span class="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]"></span>
              {{ $t('about.who_am_i') }}
            </div>
            <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              {{ $t('about.who_am_i') }}
            </h2>
            <p class="text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
              {{ $t('about.intro_text') }}
            </p>
            <div class="flex flex-wrap gap-3 justify-center md:justify-start">
              <span class="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700 shadow-sm dark:bg-sky-900/20 dark:text-sky-300">
                {{ $t('about.skills.frontend') }}
              </span>
              <span class="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700 shadow-sm dark:bg-violet-900/20 dark:text-violet-300">
                {{ $t('about.skills.backend') }}
              </span>
              <span class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm dark:bg-emerald-900/20 dark:text-emerald-300">
                {{ $t('about.skills.devops') }}
              </span>
              <span class="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700 shadow-sm dark:bg-orange-900/20 dark:text-orange-300">
                {{ $t('about.skills.Génie_logiciel') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 w-full flex flex-col items-center justify-center max-w-4xl mx-auto">
    <section class="stats-section grid gap-6 sm:grid-cols-3 py-8">
      <div v-for="stat in stats" :key="stat.labelKey" class="glass-stat-card p-6 text-center">
        <div class="text-5xl font-extrabold text-violet-600 md:text-6xl">
          {{ stat.displayValue }}{{ stat.suffix }}
        </div>
        <div class="mt-3 text-sm font-medium text-slate-500 dark:text-slate-300">{{ $t(stat.labelKey) }}</div>
      </div>
    </section>
    <section class="grid md:grid-cols-3 gap-6">
      <div v-for="value in values" :key="value.title" class="value-card group">
        <div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-violet-700 shadow-[0_15px_40px_-30px_rgba(124,58,237,0.8)] transition-all duration-300 group-hover:scale-105 dark:bg-violet-900/20 dark:text-violet-300">
          <font-awesome-icon :icon="value.icon" class="text-2xl" />
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ value.title }}</h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ value.description }}</p>
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
.glass-panel {
  position: relative;
  overflow: hidden;
}

.glass-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 72%);
  pointer-events: none;
}

.glass-stat-card {
  border-radius: 2rem;
  border: 1px solid rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.72);
  box-shadow: 0 20px 50px -30px rgba(99,102,241,0.6);
  backdrop-filter: blur(18px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 32px 60px -25px rgba(99,102,241,0.8);
}

.value-card {
  border-radius: 1.75rem;
  border: 1px solid rgba(148,163,184,0.16);
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8));
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 40px -20px rgba(100,116,139,0.25);
}

.typing-text {
  background: linear-gradient(90deg, #7c3aed 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media screen and (max-width: 1024px) {
  .glass-panel,
  .value-card,
  .glass-stat-card {
    border-radius: 1.5rem;
  }
}

@media screen and (max-width: 748px) {
  .glass-panel {
    padding: 1.5rem !important;
  }

  .testimonials-container {
    flex-direction: column;
  }

  .testimonial-card {
    width: 100% !important;
    height: auto !important;
  }

  .testimonial-card p {
    font-size: 0.9rem;
  }

  .testimonial-card h6 {
    font-size: 0.8rem;
  }

  .text-xs,
  p {
    font-size: 10px !important;
    padding: 20px;
  }
}
</style>
