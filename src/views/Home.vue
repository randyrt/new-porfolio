<template>
  <Loading v-if="loading" message="Page d'accueil..." />
  <div v-else class="p-8 flex flex-col">
    <AnimatedTitle text="« Le code ne dort jamais, et moi non plus tant que je n’ai pas atteint mes objectifs. »"  aos="fade-down" />
    <div class="flex justify-between space-x-8 items-center flex-col md:flex-row min-h-screen">
      <div class="box p-2 view" data-aos="fade-down">
        <span class="borderline"></span>
        <img src="/images/me/randy.jpg" alt="Photo de Randy">
      </div>
      <div class="md:text-sm lg:text-base max-w-3xl pad border p-6 card flex flex-col justify-between min-h-[500px]"
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
            Si vous avez des questions ou souhaitez collaborer, n'hésitez pas à me <span class="text-sky-700 cursor-pointer underline" @click="goToContact">contacter</span> !
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Loading from '../components/Loading.vue'
import { getData } from '../services/api'
import { useToast } from 'vue-toastification'
import AnimatedTitle from '../components/AnimatedTitle.vue'


const toast = useToast()
const router = useRouter()
const clickCount = ref<number>(0)
const loading = ref<boolean>(true)

function notify() {
  clickCount.value++

  if (clickCount.value === 1) {
    toast.info("Mon CV est en anglais 😄. Cliquez une deuxième fois sur le bouton si cela ne vous pose  pas de problème !");
  } else if (clickCount.value === 2) {
    window.open("/images/cv/cv.pdf", "_blank")
    clickCount.value = 0
  }
}

const goToContact = () => {
  router.push('/contact')
}


onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000);
});

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

  .flex {
    padding: 5px !important;
    width: 100%;
  }

  .pad {
    padding: 5px !important;
  }

  .decoration {
    font-size: 10px !important;
  }
  .box {
    margin-left: 40px;
    margin-bottom: 20px;
  }
  p, span, boutton, h1 {
    font-size: 10px !important;
  }
  .click-me {
    animation: none;
  }
}
</style>
