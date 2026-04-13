<template>
  <div>
    <Navbar :brand="'randy@art.dev'" :routes="navRoutes" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from './components/NavBar.vue';

const { t } = useI18n();

const navRoutes = computed(() => [
  { path: '/', name: t('nav.home'), icon: 'home' },
  { path: '/quality', name: t('nav.quality'), icon: 'star' },
  { path: '/skills', name: t('nav.skills'), icon: 'code' },
  { path: '/technology', name: t('nav.technology'), icon: 'cogs' },
  { path: '/webcup24', name: t('nav.webcup'), icon: 'trophy' },
  { path: '/projects', name: t('nav.projects'), icon: 'project-diagram' },
  { path: '/services', name: t('nav.services'), icon: 'briefcase' },
  { path: '/testimoniales', name: t('nav.testimonials'), icon: 'quote-right' },
  { path: '/contact', name: t('nav.contact'), icon: ['far', 'envelope'] },
  { path: '/about', name: t('nav.about'), icon: ['fas', 'info-circle'] },

]);
</script>