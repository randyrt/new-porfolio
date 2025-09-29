<template>
    <Loading v-if="loading" message="Mes compétences..."/>
    <div v-else>
        <div class="card w-full p-4 flex justify-center">
            <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-right">
                « Entrons dans le vif du sujet, Parlons un peu de mes compétences »
            </span>
        </div>
    </div>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 class="text-4xl font-bold text-gray-800">Mes compétences</h1>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

</script>

<style scoped>
.animated-gradient-text {
  background: linear-gradient(90deg, #facc15, #f87171, #3b82f6, #10b981, #facc15);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-move 5s ease infinite;
}

@keyframes gradient-move {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

</style>