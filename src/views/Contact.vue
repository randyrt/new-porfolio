<template>
   <Loading v-if="loading" message="Page d'accueil..." />
  <div v-else class="p-6">
    <h1 class="text-2xl font-bold">Contact</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue'

const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>


<style scoped></style>