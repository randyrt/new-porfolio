export const skillsExamples = [
  // Frontend
  {
    keywords: 'vue|vuejs|vue.js|composition api|vue 3',
    response: 'Je maîtrise Vue.js 3 avec la Composition API. J\'utilise TypeScript et je suis très à l\'aise avec les composables, les refs réactifs, et la gestion d\'état. Vue 3 est mon framework préféré pour les interfaces modernes et performantes.',
    category: 'frontend',
    confidence: 0.95
  },
  {
    keywords: 'nuxt|nuxtjs|nuxt.js',
    response: 'Nuxt.js est mon framework de prédilection pour les applications Vue.js full-stack. Je l\'utilise pour les rendu côté serveur (SSR), la génération statique, et l\'optimisation des performances. Les auto-imports et la structure modules me font gagner beaucoup de temps.',
    category: 'frontend',
    confidence: 0.95
  },
  {
    keywords: 'typescript|ts|typage',
    response: 'Je maîtrise TypeScript et son système de typage avancé (Generics, Unions, Interfaces, Types). C\'est devenu incontournable dans mon workflow pour une meilleure maintenabilité et une détection d\'erreurs précoce.',
    category: 'frontend',
    confidence: 0.92
  },
  {
    keywords: 'tailwind|css|styling|style|design',
    response: 'TailwindCSS est mon outil de choix pour le styling. Je crée des designs modernes et responsifs en utilisant l\'utility-first approach. C\'est rapide, maintenable et cohérent.',
    category: 'frontend',
    confidence: 0.90
  },

  // Backend
  {
    keywords: 'laravel|framework php',
    response: 'Laravel est mon framework backend principal. Je maîtrise Laravel 11 avec Eloquent ORM, les migrations, les APIs RESTful, la validation, l\'authentification Sanctum/JWT, et les WebSockets en temps réel. J\'optimise aussi les performances avec Redis et Laravel Horizon.',
    category: 'backend',
    confidence: 0.98
  },
  {
    keywords: 'symfony|sf|php',
    response: 'Je connais bien Symfony, particulièrement pour les applications d\'entreprise complexes. J\'ai de l\'expérience avec les bundles, les services, Doctrine ORM, et l\'architecture MVC structurée.',
    category: 'backend',
    confidence: 0.88
  },
  {
    keywords: 'nodejs|node|express|javascript backend',
    response: 'J\'ai de l\'expérience avec Node.js et Express.js pour construire des APIs légères et performantes. Node.js est excellent pour les applications en temps réel avec les WebSockets.',
    category: 'backend',
    confidence: 0.85
  },
  {
    keywords: 'python|django|flask',
    response: 'Je maîtrise Python pour des automatisations, des scripts d\'administration, et du data processing. J\'ai aussi de l\'expérience avec Django et Flask pour des applications web.',
    category: 'backend',
    confidence: 0.80
  },

  // Database
  {
    keywords: 'mysql|mariadb|postgres|postgresql|base de données|database|sql',
    response: 'Je suis très à l\'aise avec MySQL, MariaDB et PostgreSQL. Je conçois des schémas relationnels optimisés, j\'écris des requêtes complexes, et j\'optimise les performances avec des index et des requêtes bien structurées.',
    category: 'database',
    confidence: 0.93
  },
  {
    keywords: 'redis|cache|caching',
    response: 'Redis est un atout majeur dans mon arsenal. Je l\'utilise pour le caching, les sessions, les queues, et les opérations en temps réel. C\'est crucial pour optimiser les performances.',
    category: 'database',
    confidence: 0.90
  },

  // DevOps
  {
    keywords: 'docker|container|containerization',
    response: 'Docker est incontournable dans mes projets. Je maîtrise Docker Engine, Docker Compose, et je crée des images optimisées. J\'utilise Docker pour la cohérence dev/prod et le déploiement.',
    category: 'devops',
    confidence: 0.92
  },
  {
    keywords: 'cicd|ci/cd|github actions|gitlab ci|déploiement|deployment|pipeline',
    response: 'Je configure des pipelines CI/CD robustes avec GitHub Actions et GitLab CI. Tests automatisés, builds optimisés, déploiements sécurisés... c\'est mon quotidien pour garantir une qualité et une vitesse de déploiement optimales.',
    category: 'devops',
    confidence: 0.90
  },

  // Mobile
  {
    keywords: 'ionic|mobile|app mobile|cross-platform',
    response: 'IONIC 6 est ma solution de choix pour les applications mobiles cross-platform. Avec Capacitor, je crée des apps natives qui fonctionnent sur iOS et Android avec une codebase unique. C\'est très productif !',
    category: 'mobile',
    confidence: 0.93
  },
  {
    keywords: 'flutter|mobile app',
    response: 'Je suis actuellement en apprentissage de Flutter. C\'est un framework prometteur pour le mobile cross-platform, même si IONIC est ma priorité actuellement.',
    category: 'mobile',
    confidence: 0.70
  },

  // Autres
  {
    keywords: 'websocket|temps réel|real time|live',
    response: 'J\'ai une bonne expérience avec les WebSockets pour les applications en temps réel. Je les utilise avec Laravel (avec packages comme Laravel WebSockets) ou Node.js pour des interactions utilisateurs instantanées.',
    category: 'autres',
    confidence: 0.88
  },
  {
    keywords: 'api|rest|restful|endpoint',
    response: 'Je conçois et implémente des APIs RESTful robustes avec une bonne documentation, une validation stricte, une gestion d\'erreurs appropriée, et une sécurité renforcée via JWT/Sanctum.',
    category: 'autres',
    confidence: 0.95
  },
  {
    keywords: 'git|github|gitlab|versionning|source control',
    response: 'Git est ma base ! Je maîtrise les workflows (GitFlow, trunk-based development), les branches, les pull requests, et les merges. GitHub et GitLab sont mes plateformes préférées.',
    category: 'autres',
    confidence: 0.94
  }
]

export type SkillExample = typeof skillsExamples[number]
