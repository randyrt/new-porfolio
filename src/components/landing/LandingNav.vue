<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'border-b border-white/5 bg-abyss/80 backdrop-blur-xl'
      : 'bg-transparent'"
  >
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      aria-label="Navigation principale"
    >
      <a
        href="#home"
        class="group flex items-center gap-3"
        :aria-label="`${brand} - Accueil`"
        @click.prevent="scrollToSection('home')"
      >
        <span
          class="font-display text-lg font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-vue sm:text-xl"
        >
          {{ brand }}
        </span>
      </a>

      <div class="hidden items-center gap-1 lg:flex">
        <a
          v-for="link in links"
          :key="link.id"
          href="#"
          class="rounded-full px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:bg-white/5 hover:text-ink"
          :aria-label="link.label"
          @click.prevent="scrollToSection(link.id)"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-3">
        <a
          v-for="social in socials"
          :key="social.id"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.aria"
          class="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:border-vue/50 hover:text-vue hover:shadow-[0_0_24px_rgba(66,184,131,0.25)] hover:-translate-y-0.5"
        >
          <font-awesome-icon :icon="social.icon" class="text-base" />
        </a>

        <button
          type="button"
          class="btn-landing-primary btn-landing-sm hidden !rounded-full !px-5 !py-2.5 text-sm sm:inline-flex"
          @click="scrollToSection('contact')"
        >
          {{ t('landing.hero.cta_contact') }}
        </button>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink transition-colors duration-300 hover:border-vue/50 hover:text-vue lg:hidden"
          :aria-expanded="isOpen"
          aria-controls="mobile-landing-nav"
          :aria-label="isOpen ? t('landing.nav.close') : t('landing.nav.open')"
          @click="toggleMenu"
        >
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <div
      id="mobile-landing-nav"
      v-if="isOpen"
      class="border-b border-white/5 bg-abyss/95 backdrop-blur-xl lg:hidden"
    >
      <ul class="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
        <li v-for="link in links" :key="link.id">
          <a
            href="#"
            class="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors duration-300 hover:bg-white/5 hover:text-ink"
            :aria-label="link.label"
            @click.prevent="scrollToSection(link.id)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
      <div class="border-t border-white/5 px-4 py-4 sm:px-6">
        <button type="button" class="btn-landing-primary btn-landing-sm w-full" @click="scrollToSection('contact')">
          {{ t('landing.hero.cta_contact') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  brand?: string
}>()

const { t } = useI18n()

const brand = computed(() => props.brand || 'randy@art.dev')
const isOpen = ref(false)
const scrolled = ref(false)

const links = computed(() => [
  { id: 'home', label: t('landing.nav.home') },
  { id: 'expertise', label: t('landing.nav.expertise') },
  { id: 'projects', label: t('landing.nav.projects') },
  { id: 'experience', label: t('landing.nav.experience') },
  { id: 'contact', label: t('landing.nav.contact') },
])

const socials = computed(() => [
  { id: 'github', href: 'https://github.com/randyrt', icon: ['fab', 'github'] as any, aria: t('landing.hero.github') },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/randy-andriantsiory-3a935828a/', icon: ['fab', 'linkedin-in'] as any, aria: t('landing.hero.linkedin') },
])

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  isOpen.value = false
}

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
