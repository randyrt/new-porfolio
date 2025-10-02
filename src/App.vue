<template>
  <div>
    <Navbar :brand="'randy@artdev'" :routes="navRoutes" />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/NavBar.vue';

const navRoutes = [
  { path: '/', name: 'Accueil' },
  { path: '/webcup24', name: 'Webcup' },
  { path: '/quality', name: 'Qualités' },
  { path: '/skills', name: 'Compétences' },
  { path: '/technology', name: 'Technologies' },
  { path: '/projects', name: 'Projects' },
  { path: '/about', name: 'À propos' }
];
</script>

<style scoped>

</style>
