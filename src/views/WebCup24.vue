<template>
  <Loading v-if="loading" message="Webcup 2024..." />
  <div v-else class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
     <AnimatedTitle text=" « Qu'est-ce qui rend Randy unique ? » " aos="fade-down"/>
  </div>

  <div class="flex justify-between p-8">
    <div class="min-h-screen p-8 space-y-16">
      <div class="w-full max-w-4xl card p-4 " data-aos="fade-right">
        <img src="/images/webcup24/webcup.jpg" alt="WebCup 2024"
          class="w-full rounded-lg shadow-lg filter grayscale brightness-90" />
      </div>
      <div class="w-full card p-4 flex justify-center" data-aos="fade-down">
        <p class="text-lg text-gray-700">
          Le prix a été remis par M. Sylvain, le directeur de l'entreprise IT
          <span class="ml-1" aria-label="https://www.fulldigits.com">
            <a href="https://www.fulldigits.com" class="fullDigits" target="_blank">FullDigits</a>
          </span>
        </p>
      </div>
      <div class="w-full max-w-4xl flex justify-center p-4 " data-aos="fade-left">
        <button class="btn-violet inline-block text-center decoration btn-effect-5" @click="webCup">
          En savoir plus
        </button>
      </div>
    </div>
    <div class="min-h-screen p-8 flex items-center">
      <div class=" w-full max-w-4xl border card justify-center !p-8" >
        <h1 class="text-3xl font-bold mt-0 mb-2 text-violet-800">WebCup 2024 !<span class="text-5xl emoji">🏆</span></h1>
        <p class="text-lg text-gray-700 mb-4">
          La webCup est une compétition de développement web qui se déroule chaque année à Madagascar. En 2024, j'ai eu
          l'honneur de participer à cet événement prestigieux et de me classer à la 2ème place.
        </p>
        <p class="text-lg text-gray-700 mb-4">
          Durant cette compétition, j'ai pu mettre en pratique mes compétences en développement web, en travaillant sur
          des projets concrets et en collaborant avec d'autres développeurs talentueux. J'ai également eu l'occasion
          d'apprendre de nouvelles technologies et de relever des défis techniques stimulants.
        </p>
        <p class="text-lg text-gray-700 mb-4">
          Cette expérience a été extrêmement enrichissante pour moi, tant sur le plan professionnel que personnel. Elle
          m'a permis de renforcer mes compétences en développement web, de développer mon esprit d'équipe et de
          découvrir de nouvelles perspectives dans le domaine du développement web.
        </p>
        <p class="text-lg text-gray-700 mb-4">
          Je suis fier de cette réalisation et je suis motivé à continuer à progresser dans ma carrière de développeur
          web. La WebCup 2024 restera une étape importante dans mon parcours professionnel, et je suis reconnaissant
          pour l'opportunité qui m'a été offerte de participer à cet événement exceptionnel.
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from "canvas-confetti"



const loading = ref<boolean>(true)

const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]
  })
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    launchConfetti()
  }, 1000)
})


function webCup(){
  window.open("https://24h.webcup.fr/madagascar", "_blank")
}

</script>

<style scoped>
img {
  position: relative;
  width: 300px;
  height: 100%;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  filter: grayscale(100%) brightness(0.9);
}

@media screen and (max-width: 748px) {

  .min-h-screen {
    padding: 0 !important;
  }

  .flex.justify-between {
    flex-direction: column;
    padding: 1rem; 
  }

  .flex.justify-between > div {
    min-height: auto;
    width: 100%;
    padding: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .card {
    margin-bottom: 1.5rem;
  }

  .click-me {
    animation: none !important;
  }

  p, h1, button, span {
    font-size: 10px;
  }
}
</style>