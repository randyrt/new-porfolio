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
  { path: '/technology', name: 'Technologies', icon: 'cogs' },
  { path: '/projects', name: 'Projets', icon: 'project-diagram' },
  { path: '/testimoniales', name: 'Testimoniales', icon: 'user' },
  { path: '/contact', name: 'Contact', icon: ['far', 'envelope'] }
];

</script>

