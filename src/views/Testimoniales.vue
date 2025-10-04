<template>
    <Loading v-if="loading" message="Témoignages..." />
    <div v-else>
        <div class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
            <AnimatedTitle text=" « Quelque témoignages venant de mes clients et employeurs » " aos="fade-down" />
        </div>
        <div class="w-full flex justify-between items-center p-16 gap-16 testimonials-container" data-aos="fade-up">
            <div class="w-1/2 h-[200px] card p-4 flex flex-col justify-center items-center testimonial-card">
                <p class="mb-3 text-center">« Randy est dynamique, travaille de manière soignée et professionnelle, et
                    j’apprécie
                    vraiment collaborer avec lui. Je le considère sincèrement comme un excellent développeur. »</p>
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
import { ref, onMounted } from 'vue'
import Loading from '../components/Loading.vue'

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

  .text-xs, p {
    font-size: 10px !important;
    padding: 20px;
  }
}
</style>