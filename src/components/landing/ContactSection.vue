<template>
  <section id="contact" class="landing scroll-mt-24 relative overflow-hidden bg-abyss">
    <div
      class="animate-hero-glow pointer-events-none absolute -top-32 left-0 h-96 w-96 rounded-full bg-laravel/10 blur-[130px]"
      aria-hidden="true"
    />
    <div
      class="animate-hero-glow pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-vue/10 blur-[130px]"
      style="animation-delay: -2.5s"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
      <p
        class="text-xs font-semibold uppercase tracking-[0.28em] text-laravel"
        data-aos="fade-up"
      >
        {{ t('landing.contact.eyebrow') }}
      </p>

      <h2
        class="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {{ t('landing.contact.title') }}
      </h2>

      <p
        class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {{ t('landing.contact.description') }}
      </p>

      <div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row" data-aos="fade-up" data-aos-delay="300">
        <button type="button" class="btn-landing-primary btn-landing-lg" @click="goToContact">
          {{ t('landing.hero.cta_contact') }}
        </button>
        <a
          :href="cvUrl"
          :download="cvFileName"
          class="inline-flex h-14 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-muted transition-all duration-300 hover:border-laravel/60 hover:text-laravel"
        >
          <font-awesome-icon icon="fa-solid fa-download" />
          {{ t('landing.hero.cv') }}
        </a>
      </div>

      <div class="mt-14 flex flex-wrap items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="400">
        <a
          v-for="social in socials"
          :key="social.id"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.aria"
          class="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:border-vue/50 hover:text-vue hover:shadow-[0_0_24px_rgba(66,184,131,0.25)] hover:-translate-y-0.5"
        >
          <font-awesome-icon :icon="social.icon" class="text-base" />
        </a>
        <a
          :href="`https://wa.me/261333026839`"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('landing.contact.whatsapp')"
          class="group inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-muted transition-all duration-300 hover:border-laravel/60 hover:text-laravel"
        >
          <font-awesome-icon icon="fa-brands fa-whatsapp" class="text-base" />
          WhatsApp
        </a>
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

const cvUrl = '/images/cv/CV_Randy_Andriantsiory_Laravel_symfony.pdf'
const cvFileName = 'CV_Randy_Andriantsiory_Laravel_symfony.pdf'

const socials = computed(() => [
  { id: 'github', href: 'https://github.com/randyrt', icon: ['fab', 'github'] as any, aria: t('landing.hero.github') },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/randy-andriantsiory-3a935828a/', icon: ['fab', 'linkedin-in'] as any, aria: t('landing.hero.linkedin') },
  { id: 'whatsapp', href: 'https://wa.me/261333026839', icon: ['fab', 'whatsapp'] as any, aria: t('landing.contact.whatsapp') },
])

const goToContact = () => {
  router.push('/contact')
}
</script>
