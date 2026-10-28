<template>
  <section id="experience" class="landing scroll-mt-24 relative bg-abyss">
    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <header class="max-w-2xl" data-aos="fade-up">
        <p
          class="text-xs font-semibold uppercase tracking-[0.28em] text-vue"
        >
          {{ t('landing.experience.eyebrow') }}
        </p>
        <h2
          class="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          {{ t('landing.experience.title') }}
        </h2>
      </header>

      <div class="mt-14 grid gap-14 lg:grid-cols-2" data-aos="fade-up">
        <!-- Parcours -->
        <div>
          <ol class="relative space-y-10 border-l border-white/10 pl-8">
            <li v-for="(step, index) in timeline" :key="step.period" class="relative pb-10 last:pb-0">
              <span
                class="absolute top-2 h-3 w-3 rounded-full"
                :class="index === 0 ? 'bg-laravel' : 'bg-vue/70'"
                :style="index === 0 ? 'left: -22px; box-shadow: 0 0 12px rgba(255 45 32 / 0.8)' : 'left: -22px; box-shadow: 0 0 12px rgba(66 184 131 / 0.6)'"
              ></span>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{{ step.period }}</p>
              <h3 class="mt-2 font-display text-xl font-semibold text-ink">{{ step.role }}</h3>
              <p class="mt-1 text-sm font-medium text-vue">{{ step.company }}</p>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ step.description }}</p>
            </li>
          </ol>
        </div>

        <!-- Valeurs -->
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.28em] text-muted"
            data-aos="fade-up"
          >
            {{ t('workingmind.personality_title') }}
          </p>
          <div class="mt-8 grid gap-5 sm:grid-cols-3">
            <div
              v-for="value in values"
              :key="value.title"
              class="rounded-2xl border border-white/5 bg-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:border-vue/40"
            >
              <div class="font-display text-3xl text-vue">{{ value.icon }}</div>
              <h3 class="mt-4 font-display text-lg font-semibold text-ink">{{ value.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface TimelineStep {
  period: string
  role: string
  company: string
  description: string
}

const timeline = computed<TimelineStep[]>(() => [
  {
    period: '2024 - Present',
    role: t('workingmind.timeline.current_role'),
    company: 'MG Consulting ACT & IT',
    description: t('workingmind.timeline.current_desc'),
  },
  {
    period: '2023 - 2024',
    role: t('workingmind.timeline.remote_role'),
    company: 'Remote / Freelance',
    description: t('workingmind.timeline.remote_desc'),
  },
  {
    period: '2022 - 2023',
    role: t('workingmind.timeline.backend_role'),
    company: 'Pixel-Z',
    description: t('workingmind.timeline.backend_desc'),
  },
  {
    period: '2021 - 2022',
    role: t('workingmind.timeline.frontend_role'),
    company: 'Fihary Soft',
    description: t('workingmind.timeline.frontend_desc'),
  },
])

interface Value {
  icon: string
  title: string
  description: string
}

const values = computed<Value[]>(() => [
  {
    icon: '✦',
    title: t('workingmind.personality_curiosity_title'),
    description: t('workingmind.personality_curiosity_desc'),
  },
  {
    icon: '❖',
    title: t('workingmind.personality_structure_title'),
    description: t('workingmind.personality_structure_desc'),
  },
  {
    icon: '✧',
    title: t('workingmind.personality_team_title'),
    description: t('workingmind.personality_team_desc'),
  },
])
</script>
