<template>
  <Loading v-if="loading" message="Mes service..." />
  <div v-else class="flex flex-col space-y-10 ">
    <AnimatedTitle text="Découvrons ensemble les services que je propose pour donner vie à vos projets numériques"
      aos="fade-down" />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6" data-aos="fade-up">

      <!-- Version control -->
      <div class="card p-6 service card !bg-pink-100"  >
        <h2 class="title">Git & version control</h2>
        <p class="text-gray-600">
          Gestion efficace du code source avec Git, incluant le travail en équipe,
          la résolution de conflits et la structuration propre des branches.
        </p>
        <ul>
          <li class="text-sm text-gray-700">✔ Branching strategies (feature, staging, production)</li>
          <li class="text-sm text-gray-700">✔ Conflict resolution</li>
          <li class="text-sm text-gray-700">✔ Clean commits & history</li>
          <li class="text-sm text-gray-700">✔ Code reviews ready workflow</li>
        </ul>
      </div>

      <!-- Team workflow -->
      <div class="card p-6 service card !bg-sky-100" >
        <h2 class="title">Team workflow & merges</h2>
        <p class="text-gray-600">
          Mise en place de workflows efficaces pour équipes de développement,
          assurant des merges propres, des releases stables et une bonne
          coordination entre développeurs.
        </p>
        <ul>
          <li class="text-sm text-gray-700">✔ Pull requests workflow</li>
          <li class="text-sm text-gray-700">✔ Safe merges</li>
          <li class="text-sm text-gray-700">✔ Release management</li>
          <li class="text-sm text-gray-700">✔ Collaboration GitHub / GitLab</li>
        </ul>
      </div>

      <!-- Deployment -->
      <div class="card p-6 service card !bg-green-100" >
        <h2 class="title">Deployment & server security</h2>
        <p class="text-gray-600">
          Déploiement d’applications web sur serveurs Linux avec configuration
          sécurisée, gestion des accès et optimisation pour la production.
        </p>
        <ul>
          <li class="text-sm text-gray-700">✔ Linux server setup</li>
          <li class="text-sm text-gray-700">✔ Secure SSH & permissions</li>
          <li class="text-sm text-gray-700">✔ Environment configuration</li>
          <li class="text-sm text-gray-700">✔ Production deployment</li>
        </ul>
      </div>

      <!-- Personnalisation -->
      <div class="card p-6 service card !bg-pink-100" >
        <h2 class="title">Personnalisation sur mesure</h2>
        <p class="text-gray-600">
          Je suis ouvert à discuter de service personnalisés adaptés à vos besoins spécifiques.
          N’hésitez pas à me contacter pour en parler !
        </p>
        <ul>
          <li class="text-sm text-gray-700">✔ Service personnalisés</li>
          <li class="text-sm text-gray-700">✔ Adaptation aux besoins</li>
          <li class="text-sm text-gray-700">✔ Flexibilité</li>
        </ul>

      </div>


      <!-- Collaboration -->
      <div class="card p-6 service card !bg-sky-100" >
        <h2 class="title">Collaboration & partenariat</h2>
        <p class="text-gray-600">
          Je suis également intéressé par des collaborations à long terme ou des partenariats pour développer des
          projets innovants ensemble. N’hésitez pas à me contacter pour en discuter !
        </p>
        <ul>
          <li class="text-sm text-gray-700">✔ Collaborations à long terme</li>
          <li class="text-sm text-gray-700">✔ Partenariats</li>
          <li class="text-sm text-gray-700">✔ Projets innovants</li>
        </ul>
      </div>

       <!-- Autres service cards -->
      <div class="card p-6 service card !bg-green-100" >
        <h2 class="title">Autres...</h2>
        <p class="text-gray-600">
          En plus de mes compétences principales, je propose également des service
          de conseil technique, de revue de code et d’accompagnement pour vos projets numériques.
        </p>
        <ul>
          <li class="text-sm text-gray-700">✔ Conseil technique</li>
          <li class="text-sm text-gray-700">✔ Revue de code</li>
          <li class="text-sm text-gray-700">✔ Accompagnement projet</li>
        </ul>
      </div>
    </div>


    <div class="flex justify-center mt-6">
      <button class="btn-violet btn-effect-5" @click="goToContact">
        Travaillons ensemble
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const loading = ref<boolean>(true)
const router = useRouter()

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
.service  {
  transition: all 0.25s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.service:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

ul {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #444;
}

li {
  margin-bottom: 4px;
}
</style>
