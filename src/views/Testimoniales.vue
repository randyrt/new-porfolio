<template>
  <Loading v-if="loading" message="Témoignages..." />
  <div v-else>
    <div class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
      <AnimatedTitle text=" « Quelque témoignages venant de mes clients et employeurs » " aos="fade-down" />
    </div>
    <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-4" data-aos="fade-up">
      <p class="text-lg italic text-gray-700 dark:text-gray-300">
        <span class="text-violet-800 text-lg">«</span>
        Ayant eu l'opportunité de collaborer avec de nombreux clients et hauts responsables à l'international, j'ai pu
        constater une même exigence partout : la confiance se construit sur la fiabilité, l'écoute et la qualité du
        livrable. Voici ce qu'ils ont bien voulu témoigner.
        <span class="text-violet-800 text-lg">»</span>
      </p>
    </div>
    <div class="w-full flex justify-between items-center p-16 gap-16 testimonials-container" data-aos="fade-up">
      <div class="w-1/2 h-[200px] card p-4 flex flex-col justify-center items-center testimonial-card">
        <p class="mb-3 text-center">« Randy est dynamique, travaille de manière soignée et professionnelle. J'aime
          collaborer avec lui et l'apprécie aussi en tant que développeur. »</p>
        <h6 class="text-xs italic">— <em>Olivier Le Grand</em> (Manager, FID-CONNECT)</h6>
      </div>

      <div class="w-1/2 h-[200px] card p-4 flex flex-col justify-center items-center testimonial-card">
        <p class="mb-3 text-center">« Il y a deux choses que j’apprécie chez Randy : sa capacité d’adaptation
          rapide et sa
          volonté constante d’évoluer. Je suis convaincu qu’il ira loin dans le domaine de l’informatique. »
        </p>
        <h6 class="text-xs italic">— <em>Pascal</em> (Client et Directeur, MCP Belgique)</h6>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Témoignages sur Randy',
  meta: [
    {
      name: 'Satisfacation',
      content: 'Quelque témoignages venant de mes clients et employeurs '
    }
  ]
})

import { ref, onMounted } from 'vue'

const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

</script>

<style scoped>
@media screen and (max-width: 748px) {
  .testimonials-container {
    flex-direction: column;
  }

  .testimonial-card {
    width: 100% !important;
    height: auto !important;
  }

  .testimonial-card p {
    font-size: 0.9rem;
  }

  .testimonial-card h6 {
    font-size: 0.8rem;
  }

  .text-xs,
  p {
    font-size: 10px !important;
    padding: 20px;
  }
}
</style>