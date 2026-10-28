<template>
  <section id="projects" class="landing scroll-mt-24 relative bg-abyss">
    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <header class="max-w-2xl" data-aos="fade-up">
        <p
          class="text-xs font-semibold uppercase tracking-[0.28em] text-vue"
        >
          {{ t('landing.projects.eyebrow') }}
        </p>
        <h2
          class="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          {{ t('landing.projects.title') }}
        </h2>
      </header>

      <div class="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-panel transition-all duration-500 hover:-translate-y-2 hover:border-vue/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          data-aos="fade-up"
          :data-aos-delay="index * 90"
        >
          <div class="relative h-56 overflow-hidden bg-[#0b1017]">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div class="flex flex-1 flex-col p-6">
            <div class="flex items-start justify-between gap-4">
              <h3 class="font-display text-xl font-semibold text-ink">{{ project.title }}</h3>
              <a
                v-if="project.productionUrl"
                :href="project.productionUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${project.title} - Voir en production`"
                class="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:border-vue/50 hover:text-vue"
              >
                <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-xs" />
              </a>
            </div>

            <p class="mt-4 flex-1 text-sm leading-relaxed text-muted">
              {{ t(project.descriptionKey) }}
            </p>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-muted"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-12 flex justify-center">
        <button type="button" class="btn-landing-ghost" @click="goToProjects">
          {{ t('landing.projects.all') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

interface FeaturedProject {
  id: string
  title: string
  descriptionKey: string
  productionUrl: string
  image: string
  stack: string[]
}

const featuredProjects = computed<FeaturedProject[]>(() => [
  {
    id: 'fid-connect',
    title: 'FID-CONNECT',
    descriptionKey: 'projects.fid_connect',
    productionUrl: 'https://mastery-pro.be/',
    image: '/images/projects/fid-connect/capture0.png',
    stack: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
  },
  {
    id: 'echo-webline',
    title: 'ECHO WEBLINE',
    descriptionKey: 'projects.echo_webline',
    productionUrl: 'https://www.echowebline.com/',
    image: '/images/projects/echo-webLine/echo-1.PNG',
    stack: ['React.js', 'Symfony', 'Redis'],
  },
  {
    id: 'infi-swap',
    title: 'INFI-SWAP',
    descriptionKey: 'projects.infi_swap',
    productionUrl: 'https://infiswap.be/',
    image: '/images/projects/swap/swap1.png',
    stack: ['Nuxt.js', 'Symfony', 'Redis'],
  },
  {
    id: 'petsfollow-pro',
    title: 'PETSFOLLOW PRO',
    descriptionKey: 'projects.petsfollow_pro',
    productionUrl: 'https://petsfollow.app/',
    image: '/images/projects/petsfollow-pro/1.webp',
    stack: ['Vue.js', 'Laravel', 'Redis'],
  },
  {
    id: 'afr-fan',
    title: 'AFR-FAN',
    descriptionKey: 'projects.afr_fan',
    productionUrl: 'https://www.instagram.com/afrifan_ci/?hl=fr',
    image: '/images/projects/afr/afr-1.PNG',
    stack: ['Vue.js', 'Laravel', 'Redis'],
  },
  {
    id: 'qcp',
    title: 'QCP',
    descriptionKey: 'projects.qcp',
    productionUrl: '',
    image: '/images/projects/QCP/capture1.png',
    stack: ['Vue.js', 'Laravel', 'Redis'],
  },
])

const goToProjects = () => {
  router.push('/projects')
}
</script>
