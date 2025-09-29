<template>
  <Loading v-if="loading" message="Webcup 2024..." />
  <div v-else class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
    <div class="card w-full p-4 flex flex-col justify-center">
      <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-down">
        « Qu'est-ce qui rend Randy unique ? »
      </span>
    </div>
  </div>

  <div class="flex justify-between p-8">
    <div class="min-h-screen p-8 space-y-16">
      <div class="w-full max-w-4xl card p-4 " data-aos="fade-right">
        <img src="/src/assets/images/webcup24/webcup.jpg" alt="WebCup 2024"
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
        <button class="btn-violet inline-block text-center decoration click-me">
          En savoir plus
        </button>
      </div>
    </div>

    <div class="min-h-screen p-8 flex items-center">
      <div class=" w-full max-w-4xl border p-8 card justify-center" data-aos="fade-up">
        <h1 class="text-3xl font-bold mt-0 mb-2 text-black">WebCup 2024 <span class="text-5xl emoji">🏆</span> !</h1>
        <p class="text-lg text-gray-700 mb-4">
          La WebCup est une compétition de développement web qui se déroule chaque année à Madagascar. En 2024, j'ai eu
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

img {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  filter: grayscale(100%) brightness(0.9);
}

.emoji {
  display: inline-block;
  animation: rotateEmoji 2s infinite alternate ease-in-out;
}

@keyframes rotateEmoji {
  0% {
    transform: rotate(0deg) translateY(0);
  }

  50% {
    transform: rotate(15deg) translateY(-10px);
  }

  100% {
    transform: rotate(-15deg) translateY(0);
  }
}

.click-me {
  display: inline-block;
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
}
</style>