<template>
  <Loading v-if="loading" message="Mes compétences..." />
  <div v-else>
    <AnimatedTitle text=" « Entrons dans le vif du sujet, Parlons de mes compétences » " aos="fade-down" />
  </div>
  <div class="w-full h-auto mt-[100px] flex justify-center items-center  text-lg text-gray-500" data-aos="fade-down">
    <h1 class="p-4">
      Voici les détails de mes compétences acquises au cours de ces cinq dernières années dans le monde professionel.
      <span>😊</span>
    </h1>
  </div>
 <div class="flex items-stretch flex-wrap bg-gray-100 gap-4 p-4 mt-8 text-lg" data-aos="fade-up">
    <SkillSection :title="'Compétences en VueJs'" :bgColor="'bg-yellow-100'" :borderColor="'border-yellow-200'" :skills="[
      {
        name: 'VueJS avec Typescript',
        description: 'Je peux créer des composants typés de façon claire. Je peux aussi définir des interfaces solides, sécurisées. Gérer des classes et des décorateurs efficacement.'
      },
      {
        name: 'SPA (Single Page Application)',
        description: 'Je peux construire des applications fluides sans rechargement complet. L’expérience utilisateur est ainsi plus agréable et rapide.'
      },
      {
        name: 'PINIA',
        description: 'Je peux centraliser et organiser la gestion de l’état global. Cela simplifie le développement de projets complexes et modulaires.'
      }
    ]" />
    <SkillSection :title="'Compétences en Laravel'" :bgColor="'bg-sky-100'" :borderColor="'border-sky-200'" :skills="[
      {
        name: 'Eloquent ORM', description: 'Gérer les relations entre modèles, effectuer des requêtes complexes et manipuler les données de manière intuitive,efficace.'

      },
      {
        name: 'Routing & Middleware', description: 'Je peux définir des routes claires, sécuriser les accès avec des middlewares et organiser la logique des contrôleurs..'

      },
      {
        name: 'Blade & API', description: 'Je peux créer des vues dynamiques avec Blade et développer des API RESTful robustes pour la communication front/back.'

      }
    ]" />
    <SkillSection :title="'Compétences en Docker'" :bgColor="'bg-violet-100'" :borderColor="'border-violet-200'"
      :skills="[
        {
          name: 'Conteneurisation',
          description: 'Je peux créer et gérer des conteneurs pour isoler les applications.Permettre un déploiement cohérent sur tous les environnements.'
        },
        {
          name: 'Docker Compose',
          description: 'Je peux orchestrer plusieurs conteneurs avec Docker Compose. Cela simplifie la configuration de projets complexes.'
        },
        {
          name: 'Images et Volumes',
          description: 'Je peux créer des images optimisées et gérer les volumes de données. Persistance et réutilisabilité des environnements.'
        }
      ]" />
    <SkillSection :title="'Compétences en Python'" :bgColor="'bg-pink-100'" :borderColor="'border-yellow-200'" :skills="[
      {
        name: 'Programmation Orientée Objet',
        description: 'Je peux structurer le code avec classes et objets pour des projets modulaires. Cela facilite la maintenance et l’évolution du code de façon progressive.'
      },
      {
        name: 'Automatisation & Scripts',
        description: 'Je peux écrire des scripts pour automatiser des tâches répétitives. Cela améliore l’efficacité et réduit les erreurs humaines.'
      },
      {
        name: 'Frameworks Web',
        description: 'Je peux développer des applications web avec Flask ou Django. Capacité de créer des APIs et des interfaces web.'
      }
    ]" />
    <SkillSection :title="'Compétences en IONIC'" :bgColor="'bg-green-100'" :borderColor="'border-sky-200'" :skills="[
      {
        name: 'Applications hybrides',
        description: 'Je peux créer des applications mobiles qui fonctionnent sur Android et iOS. Cela permet de toucher un maximum d’utilisateurs avec un seul codebase.'
      },
      {
        name: 'Intégration avec Vue',
        description: 'Je peux intégrer IONIC avec Vue.js pour des interfaces dynamiques. Offre une expérience utilisateur réactive et dynamique.'
      },
      {
        name: 'Plugins natifs',
        description: 'Utiliser des plugins natifs pour accéder aux fonctionnalités du téléphone. Cela permet d’ajouter caméra, GPS, notifications et etc.'
      }
    ]" />

  </div>
</template>

<script setup lang="ts">
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
  .aos-animation {
    animation: none !important;
  }

  p,
  h3,
  span,
  h1 {
    font-size: 10px !important;
  }
}
</style>