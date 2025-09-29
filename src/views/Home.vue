<template>
  <Loading v-if="loading" message="Page d'accueil..." />
  <div v-else class="p-8 flex flex-col">
    <div class="card w-full p-4 flex justify-center">
      <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-up">
        « Le code ne dort jamais, et moi non plus tant que je n’ai pas atteint mes objectifs. »
      </span>
    </div>
    <div class="flex justify-between space-x-8 items-center flex-col md:flex-row min-h-screen">
      <div class="box p-2" data-aos="fade-down">
        <span class="borderline"></span>
        <img src="/src/assets/images/me/randy.jpg" alt="Photo de Randy">
      </div>
      <div class="md:text-sm lg:text-base max-w-3xl border p-6 card flex flex-col justify-between min-h-[500px]"
        data-aos="fade-up">
        <div>
          <h1 class="text-3xl font-bold mt-6 mb-2 text-black">Bienvenue sur mon portfolio <span
              class="text-5xl emoji">😎</span> !</h1>
          <p class="text-lg text-gray-700 mb-4">
            Je suis Randy, un développeur fullStack passionné par la création d'applications web modernes et
            performantes.
            J'adore explorer les nouvelles technologies et relever des défis techniques.
            Cela signifique que je suis capable de mener un projet de A à Z, du design de l'interface utilisateur
            jusqu'à la gestion
            du serveur et de la base de données.
          </p>
          <p class="text-lg text-gray-700">
            Dans mes projets, j’utilise régulièrement <span class="font-semibold">Vue.js</span> et <span
              class="font-semibold">TypeScript</span> pour construire des interfaces réactives, <span
              class="font-semibold">TailwindCSS</span> pour des designs modernes en plus d'avoir une solide expérience en <span class="font-semibold"> UX et UI design</span>, et <span
              class="font-semibold">Laravel</span> pour le backend.
            Ainsi qu’avec <span class="font-semibold">Docker Engine et Docker Compose</span> pour
            containeriser et orchestrer mes applications. Côté mobile, je me familiarise avec <span
              class="font-semibold">IONIC</span> pour développer des applications cross-platform. Et j’ai également de
            l’expérience avec <span class="font-semibold">Python</span> pour des scripts et
            automatisations,
          </p>
          <p class="text-lg text-gray-700 mt-4">
            N'hésitez pas à parcourir mon portfolio pour découvrir mes projets, compétences et expériences.
            Si vous avez des questions ou souhaitez collaborer, n'hésitez pas à me contacter !
          </p>
        </div>
        <div class="flex justify-center mt-2">
          <button class="btn-violet inline-block text-center decoration click-me" @click="notify">
            Voir mon CV
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';
import { getData } from '../services/api';
import { useToast } from 'vue-toastification'

const toast = useToast()
const clickCount = ref(0)

function notify() {
  clickCount.value++

  if (clickCount.value === 1) {
    toast.info("Mon CV est en anglais 😄. Cliquez une deuxième fois sur le bouton si cela ne vous pose  pas de problème !");
  } else if (clickCount.value === 2) {
    window.open("/src/assets/images/cv/RandyAndriantsioryResume.pdf", "_blank")
    clickCount.value = 0
  }
}

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



.box {
  position: relative;
  overflow: hidden !important;
  border-radius: 8px;
  width: 317px;
  height: auto;
  background: #000;
  z-index: 1;
  box-sizing: border-box
}

.box .randy-img {
  width: 305px !important
}

.box::after,
.box::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 350px;
  height: 450px;
  transform-origin: bottom right
}

.box::before {
  background: linear-gradient(0deg, transparent, transparent, #1cac99fd, #939797, #1b9988);
  z-index: 0;
  animation: 6s linear infinite animate
}

.box::after {
  background: linear-gradient(0deg, transparent, transparent, #56435f, #811a9b, #9108a379);
  z-index: -1;
  animation: 6s linear -3s infinite animate
}

img {
  position: relative;
  width: 300px;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  filter: grayscale(100%) brightness(0.9);
}

@keyframes animate {
  0% {
    transform: rotate(0)
  }

  100% {
    transform: rotate(360deg)
  }
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

.decoration {
  text-decoration: none;
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
