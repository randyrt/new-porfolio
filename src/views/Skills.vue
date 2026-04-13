<template>
  <Loading v-if="loading" message="Mes compétences..." />
  <div v-else>
    <AnimatedTitle text=" « Entrons dans le vif du sujet, Parlons de mes compétences » " aos="fade-down" />
  </div>
  <div class="text-center max-w-2xl mx-auto px-4 mt-4" data-aos="fade-up">
    <p class="text-lg italic text-gray-700 dark:text-gray-300">
      <span class="text-violet-800 text-lg">«</span> Je crois que l’apprentissage continu est essentiel pour rester en
      avance dans le monde en constante évolution des technologies. Je cherche toujours à enrichir mes compétences, et
      ma capacité à apprendre rapidement me permet de m’adapter aux nouveaux outils. <span
        class="text-violet-800 text-lg">»</span>
    </p>
  </div>

  <div class="flex items-stretch flex-wrap bg-gray-100 gap-4 p-4 mt-4 text-lg" data-aos="fade-up">
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
  </div>
  <div class="flex items-stretch flex-wrap bg-gray-100 gap-4 p-4 text-lg">
    <SkillSection :title="'Compétences en Nuxt.js'" :bgColor="'bg-orange-100'" :borderColor="'border-orange-200'"
      :skills="[
        {
          name: 'Rendu universel (SSR/SSG)',
          description: 'Je peux développer des applications avec rendu côté serveur ou génération statique. Cela améliore le SEO et les performances globales.'
        },
        {
          name: 'Auto-importation',
          description: 'Je maîtrise l\'auto-importation des composants, composables et utilitaires. Le code est plus propre et la productivité est augmentée.'
        },
        {
          name: 'Modules & Layers',
          description: 'Je peux étendre les fonctionnalités avec les modules Nuxt et organiser le code en couches. Architecture modulaire et maintenable.'
        }
      ]" />

    <SkillSection :title="'Compétences en Symfony'" :bgColor="'bg-cyan-100'" :borderColor="'border-cyan-200'" :skills="[
      {
        name: 'Architecture MVC',
        description: 'Je peux structurer des applications robustes selon le patron MVC. Séparation claire des responsabilités pour une meilleure maintenabilité.'
      },
      {
        name: 'Doctrine ORM',
        description: 'Je peux gérer la persistance des données avec Doctrine. Création d\'entités, relations avancées et requêtes DQL optimisées.'
      },
      {
        name: 'Formulaires & Sécurité',
        description: 'Je peux créer des formulaires complexes avec validation native. Gestion de l\'authentification, des voters et des firewalls.'
      }
    ]" />

    <SkillSection :title="'Compétences en CI & CD'" :bgColor="'bg-amber-100'" :borderColor="'border-amber-200'" :skills="[
      {
        name: 'Intégration continue',
        description: 'Je peux automatiser les tests et la validation du code à chaque push. Détection précoce des erreurs et qualité garantie.'
      },
      {
        name: 'Déploiement continu',
        description: 'Je peux mettre en place des pipelines de déploiement automatisés. Livraison rapide et fiable vers les environnements de production.'
      },
      {
        name: 'Outils (GitHub Actions/GitLab CI)',
        description: 'Je peux configurer des workflows personnalisés avec les principaux outils. Exécution parallèle, caches et déploiements multi-environnements.'
      }
    ]" />

    <SkillSection :title="'Compétences en Flutter'" :bgColor="'bg-teal-100'" :borderColor="'border-teal-200'" :skills="[
      {
        name: 'Widgets & Composition',
        description: 'Je peux construire des interfaces riches et réactives avec des widgets. Approche déclarative et composition flexible pour des UIs personnalisées.'
      },
      {
        name: 'État (Provider/Riverpod)',
        description: 'Je peux gérer l\'état applicatif de manière efficace. Mise à jour réactive des interfaces et séparation des préoccupations.'
      },
      {
        name: 'Multi-plateforme',
        description: 'Je peux développer des applications pour mobile, web et desktop. Codebase unique pour plusieurs cibles avec rendu natif.'
      }
    ]" />
    <SkillSection :title="'Compétences en Express.js'" :bgColor="'bg-red-100'" :borderColor="'border-red-200'" :skills="[
      {
        name: 'API RESTful',
        description: 'Je peux concevoir et développer des API RESTful robustes avec Express. Gestion des routes, des middlewares et des réponses HTTP adaptées.'
      },
      {
        name: 'Middleware personnalisé',
        description: 'Je peux créer des middlewares sur mesure pour la validation, l\'authentification, la journalisation et la gestion d\'erreurs.'
      },
      {
        name: 'Intégration avec bases de données',
        description: 'Je peux connecter Express à MongoDB, PostgreSQL ou MySQL. Utilisation d\'ODM/ORM comme Mongoose ou Sequelize pour les opérations données.'
      }
    ]" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Compétences de Randy',
  meta: [
    {
      name: 'Valorisation',
      content: 'Parlons de mes compétences '
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