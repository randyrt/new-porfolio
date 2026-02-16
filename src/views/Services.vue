<template>
  <div class="flex flex-col space-y-10">
    <AnimatedTitle
      text="Découvrons ensemble les services que je propose pour donner vie à vos projets numériques"
      aos="fade-down"
    />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <!-- Frontend -->
      <div class="card p-6 service" data-aos="fade-up">
        <h2 class="title">Frontend moderne</h2>
        <p>
          Création d’interfaces rapides, réactives et élégantes avec Vue.js,
          TypeScript et TailwindCSS. J’accorde une grande importance à
          l’expérience utilisateur et à la performance.
        </p>
        <ul>
          <li>✔ Vue 3 / Composition API</li>
          <li>✔ TypeScript</li>
          <li>✔ TailwindCSS</li>
          <li>✔ Responsive design</li>
        </ul>
      </div>

      <!-- Backend -->
      <div class="card p-6 service" data-aos="fade-up" data-aos-delay="100">
        <h2 class="title">Backend & API</h2>
        <p>
          Développement d’APIs robustes et d’applications web scalables avec Laravel,
          en mettant l’accent sur la maintenabilité, la sécurité et la logique métier.
        </p>
        <ul>
          <li>✔ Laravel / Eloquent</li>
          <li>✔ REST API</li>
          <li>✔ Auth & permissions</li>
          <li>✔ Optimisation de rêquete SQL</li>
        </ul>
      </div>

      <!-- DevOps -->
      <div class="card p-6 service" data-aos="fade-up" data-aos-delay="200">
        <h2 class="title">DevOps & conteneurisation</h2>
        <p>
          Mise en place d’environnements reproductibles avec Docker pour simplifier
          le déploiement, le développement en équipe et la portabilité des projets.
        </p>
        <ul>
          <li>✔ Docker Engine</li>
          <li>✔ Docker Compose</li>
          <li>✔ Environnements isolés</li>
          <li>✔ CI ready</li>
        </ul>
      </div>

      <!-- Mobile -->
      <div class="card p-6 service" data-aos="fade-up">
        <h2 class="title">Applications mobiles</h2>
        <p>
          Développement d’applications mobiles cross-platform avec Ionic,
          en partageant la logique avec le web pour accélérer la production.
        </p>
        <ul>
          <li>✔ Ionic</li>
          <li>✔ Capacitor</li>
          <li>✔ UI mobile optimisée</li>
        </ul>
      </div>

      <!-- UX/UI -->
      <div class="card p-6 service" data-aos="fade-up" data-aos-delay="100">
        <h2 class="title">UX & UI design</h2>
        <p>
          Conception d’interfaces claires, modernes et efficaces, orientées utilisateur
          pour améliorer l’engagement et la compréhension du produit.
        </p>
        <ul>
          <li>✔ Wireframes</li>
          <li>✔ Design system</li>
          <li>✔ Parcours utilisateur</li>
          <li>✔ Accessibilité</li>
        </ul>
      </div>

      <!-- Automatisation -->
      <div class="card p-6 service" data-aos="fade-up" data-aos-delay="200">
        <h2 class="title">Scripts & automatisations</h2>
        <p>
          Automatisation de tâches, intégrations de services et scripts backend
          avec Python pour améliorer la productivité et fiabiliser les processus.
        </p>
        <ul>
          <li>✔ Scripts Python</li>
          <li>✔ Traitement de données</li>
          <li>✔ Intégrations API</li>
        </ul>
      </div>

      <!-- Autres services -->
      <div class="card p-6 service" data-aos="fade-up">
        <h2 class="title">Autres services</h2>
        <p>
          En plus de mes compétences principales, je propose également des services
          de conseil technique, de revue de code et d’accompagnement pour vos projets numériques.
        </p>
        <ul>
          <li>✔ Conseil technique</li>
          <li>✔ Revue de code</li>
          <li>✔ Accompagnement projet</li>
        </ul>
      </div>

      <!-- Personnalisation -->
      <div class="card p-6 service" data-aos="fade-up" data-aos-delay="100">
        <h2 class="title">Personnalisation sur mesure</h2>
        <p>
          Je suis ouvert à discuter de services personnalisés adaptés à vos besoins spécifiques.
          N’hésitez pas à me contacter pour en parler !
        </p>
        <ul>
          <li>✔ Services personnalisés</li>
          <li>✔ Adaptation aux besoins</li>
          <li>✔ Flexibilité</li>
        </ul>

      </div>
      
      
      <!-- Collaboration -->
      <div class="card p-6 service" data-aos="fade-up" data-aos-delay="200">
        <h2 class="title">Collaboration & partenariat</h2>
        <p>
          Je suis également intéressé par des collaborations à long terme ou des partenariats pour développer des projets innovants ensemble. N’hésitez pas à me contacter pour en discuter !
        </p>
        <ul>
          <li>✔ Collaborations à long terme</li>
          <li>✔ Partenariats</li>
          <li>✔ Projets innovants</li>
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

const router = useRouter()

const goToContact = () => {
  router.push('/contact')
}
</script>

<style scoped>
.service {
  transition: all 0.25s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.service:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
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
