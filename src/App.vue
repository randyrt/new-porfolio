<template>
  <div>
    <Navbar :brand="'randy@artdev'" :routes="navRoutes" />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/NavBar.vue';

const navRoutes = [
  { path: '/', name: 'Accueil', icon: 'home' },
  { path: '/webcup24', name: 'Webcup', icon: 'trophy' },
  { path: '/quality', name: 'Qualités', icon: 'star' },
  { path: '/skills', name: 'Compétences', icon: 'code' },
  { path: '/technology', name: 'Technologies', icon: 'cogs' },
  { path: '/testimoniales', name: 'Testimoniales', icon: 'quote-right' },
  { path: '/projects', name: 'Projects', icon: 'project-diagram' },
  { path: '/contact', name: 'Contact', icon: 'user' }
];

</script>

<style scoped></style>
