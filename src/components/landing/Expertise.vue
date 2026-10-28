<template>
  <section id="expertise" class="landing scroll-mt-24 relative bg-abyss">
    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <header class="max-w-2xl" data-aos="fade-up">
        <p
          class="text-xs font-semibold uppercase tracking-[0.28em] text-laravel"
        >
          {{ t('landing.expertise.eyebrow') }}
        </p>
        <h2
          class="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          {{ t('landing.expertise.title') }}
        </h2>
        <p
          class="mt-6 text-lg leading-relaxed text-muted"
        >
          {{ t('landing.expertise.description') }}
        </p>
      </header>

      <div class="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(card, index) in cards"
          :key="card.id"
          class="group relative overflow-hidden rounded-2xl border border-white/5 bg-panel p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-vue/40 hover:bg-panel/80 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:p-7"
          data-aos="fade-up"
          :data-aos-delay="index * 90"
        >
          <div
            class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-vue/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          ></div>

          <div
            class="flex h-13 w-13 items-center justify-center rounded-2xl border border-white/10 bg-[#0b1017] sm:h-14 sm:w-14"
          >
            <font-awesome-icon :icon="card.icon" class="text-2xl" :class="card.iconClass" />
          </div>

          <h3 class="mt-6 font-display text-xl font-semibold text-ink">
            {{ card.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-muted">
            {{ card.text }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface ExpertiseCard {
  id: string
  icon: any
  iconClass: string
  title: string
  text: string
}

const cards = computed<ExpertiseCard[]>(() => [
  {
    id: 'backend',
    icon: ['fab', 'laravel'],
    iconClass: 'text-laravel',
    title: t('landing.expertise.backend_title'),
    text: t('landing.expertise.backend_text'),
  },
  {
    id: 'api',
    icon: ['fas', 'network-wired'],
    iconClass: 'text-vue',
    title: t('landing.expertise.api_title'),
    text: t('landing.expertise.api_text'),
  },
  {
    id: 'frontend',
    icon: ['fab', 'vuejs'],
    iconClass: 'text-[#42b883]',
    title: t('landing.expertise.frontend_title'),
    text: t('landing.expertise.frontend_text'),
  },
  {
    id: 'data',
    icon: ['fas', 'database'],
    iconClass: 'text-[#38bdf8]',
    title: t('landing.expertise.data_title'),
    text: t('landing.expertise.data_text'),
  },
  {
    id: 'ops',
    icon: ['fab', 'docker'],
    iconClass: 'text-[#38bdf8]',
    title: t('landing.expertise.ops_title'),
    text: t('landing.expertise.ops_text'),
  },
  {
    id: 'quality',
    icon: ['fas', 'shield-alt'],
    iconClass: 'text-vue',
    title: t('landing.expertise.quality_title'),
    text: t('landing.expertise.quality_text'),
  },
])
</script>
