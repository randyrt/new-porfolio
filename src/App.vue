<template>
  <div>
    <Navbar :brand="'randy@artdev'" :routes="navRoutes" />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/NavBar.vue';

const navRoutes = [
  { path: '/', name: 'Page d\'accueil' },
  { path: '/webcup24', name: 'Webcup 2024' },
  {path: '/quality', name: 'Mes qualités'},
  { path: '/about', name: 'À propos' }
];
</script>

<style scoped>

</style>
