<template>
  <section id="home" class="landing scroll-mt-24 relative overflow-hidden">
    <!-- Ambient glows -->
    <div
      class="animate-hero-glow pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-laravel/10 blur-[130px]"
      aria-hidden="true"
    />
    <div
      class="animate-hero-glow pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-vue/10 blur-[130px]"
      style="animation-delay: -2.5s"
      aria-hidden="true"
    />
    <div class="bg-grid-landing pointer-events-none absolute inset-0" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-44">
      <div class="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <!-- ── Contenu ─────────────────────────────────────────── -->
        <div>
          <p
            class="animate-hero-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-muted"
            style="--d: 0.05s"
          >
            <span class="mr-3 inline-block h-2 w-2 rounded-full bg-laravel align-middle"></span>
            {{ t('landing.hero.eyebrow') }}
          </p>

          <h1 class="animate-hero-line mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <span style="--d: 0.15s" class="block">{{ t('landing.hero.line_1') }}</span>
            <span style="--d: 0.35s" class="block bg-gradient-to-r from-vue to-emerald-400 bg-clip-text font-display text-transparent">{{
              t('landing.hero.line_2') }}</span>
          </h1>

          <p
            class="animate-hero-fade-up mt-8 max-w-xl text-lg leading-relaxed text-muted"
            style="--d: 0.55s"
          >
            {{ t('landing.hero.description') }}
          </p>

          <div
            class="animate-hero-fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
            style="--d: 0.7s"
          >
            <span class="text-sm font-semibold text-ink">{{ t('landing.hero.years') }}</span>
            <span class="hidden h-4 w-px bg-white/10 md:block" aria-hidden="true"></span>
            <span class="text-sm text-muted">Laravel · Vue.js · Nuxt.js · PHP</span>
          </div>

          <div class="animate-hero-fade-up mt-10 flex flex-col gap-4 sm:flex-row" style="--d: 0.85s">
            <button type="button" class="btn-landing-primary btn-landing-lg group" @click="scrollToSection('projects')">
              <span class="inline-flex items-center gap-2">
                {{ t('landing.hero.cta_projects') }}
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="text-sm transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
            <button type="button" class="btn-landing-ghost btn-landing-lg" @click="scrollToSection('contact')">
              {{ t('landing.hero.cta_contact') }}
            </button>
          </div>

          <div class="animate-hero-fade-up mt-10 flex flex-wrap items-center gap-4" style="--d: 1s">
            <a
              v-for="social in socials"
              :key="social.id"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.aria"
              class="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:border-vue/50 hover:text-vue hover:shadow-[0_0_24px_rgba(66,184,131,0.25)] hover:-translate-y-0.5"
            >
              <font-awesome-icon :icon="social.icon" class="text-base" />
            </a>
            <a
              :href="cvUrl"
              :download="cvFileName"
              class="group inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-muted transition-all duration-300 hover:border-laravel/60 hover:text-laravel"
            >
              <font-awesome-icon icon="fa-solid fa-download" />
              {{ t('landing.hero.cv') }}
            </a>
          </div>
        </div>

        <!-- ── Carte code ───────────────────────────────────────── -->
        <div class="animate-hero-fade-up" style="--d: 0.45s">
          <div
            class="animate-hero-float relative overflow-hidden rounded-2xl border border-white/10 bg-panel/80 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div class="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
              <span class="h-2.5 w-2.5 rounded-full bg-laravel"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#f59e0b]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-vue"></span>
              <span class="ml-3 font-mono text-xs text-muted">Laravel + Vue.js</span>
            </div>
            <pre class="overflow-x-auto px-5 py-6"><code class="font-mono text-[13px] leading-7"><span class="text-muted">// routes/api.php</span><br /><span class="text-ink">Route::middleware('auth:sanctum')</span><br /><span class="text-vue">-&gt;get('/projects', ProjectController::class);</span></code></pre>
            <div class="border-t border-white/10 px-5 py-3">
              <div class="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
                <span class="text-laravel">● Laravel 11</span>
                <span class="text-vue">● Vue.js 3</span>
                <span class="text-muted">● Composition API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <button
      type="button"
      class="animate-hero-fade-up absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-muted transition-colors duration-300 hover:text-ink"
      style="--d: 1.2s"
      :aria-label="t('landing.hero.scroll')"
      @click="scrollToSection('expertise')"
    >
      <span class="text-[10px] font-semibold uppercase tracking-[0.3em]">{{ t('landing.hero.scroll') }}</span>
      <span class="relative flex h-10 w-[1px] overflow-hidden bg-white/10">
        <span class="absolute top-0 h-full w-0.5 animate-hero-float bg-vue" style="animation-duration: 2s"></span>
      </span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const cvUrl = '/images/cv/CV_Randy_Andriantsiory_Laravel_symfony.pdf'
const cvFileName = 'CV_Randy_Andriantsiory_Laravel_symfony.pdf'

const socials = computed(() => [
  { id: 'github', href: 'https://github.com/randyrt', icon: ['fab', 'github'] as any, aria: t('landing.hero.github') },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/randy-andriantsiory-3a935828a/', icon: ['fab', 'linkedin-in'] as any, aria: t('landing.hero.linkedin') },
])

const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
