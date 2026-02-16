<template>
  <div>
    <Navbar :brand="'randy@art.dev'" :routes="navRoutes" />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/NavBar.vue';

const navRoutes = [
  { path: '/', name: 'Accueil', icon: 'home' },
  { path: '/webcup24', name: 'Webcup', icon: 'trophy' },
  { path: '/quality', name: 'Qualités', icon: 'star' },
  { path: '/skills', name: 'Compétences', icon: 'code' },
  { path: '/services', name: 'Services', icon: 'briefcase' },
  { path: '/technology', name: 'Technologies', icon: 'cogs' },
  { path: '/projects', name: 'Projets', icon: 'project-diagram' },
  { path: '/testimoniales', name: 'Témoignages', icon: 'quote-right' },
  { path: '/contact', name: 'Contact', icon: ['far', 'envelope'] },

];
</script>