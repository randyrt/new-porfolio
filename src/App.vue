<template>
  <div>
    <Navbar :brand="'randy@art.dev'" :routes="navRoutes" />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/NavBar.vue';

const navRoutes = [
  { path: '/', name: 'Accueil', icon: 'home' },
  { path: '/quality', name: 'Qualités', icon: 'star' },
  { path: '/skills', name: 'Compétences', icon: 'code' },
  { path: '/technology', name: 'Technologies', icon: 'cogs' },
  { path: '/webcup24', name: 'Webcup', icon: 'trophy' },
  { path: '/projects', name: 'Projets', icon: 'project-diagram' },
  { path: '/services', name: 'Autres services', icon: 'briefcase' },
  { path: '/testimoniales', name: 'Témoignages', icon: 'quote-right' },
  { path: '/contact', name: 'Contact', icon: ['far', 'envelope'] },
  {path: '/about', name: 'A propos', icon: ['far', 'envelope']}
];
</script>