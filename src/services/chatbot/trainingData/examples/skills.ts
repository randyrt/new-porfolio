export const skillsExamples = [
  // Frontend
  {
    keywords: 'vue|vuejs|vue.js|composition api|vue 3',
    response: 'Il maîtrise Vue.js 3 avec la Composition API. Il utilise TypeScript et il est très à l\'aise avec les composables, les refs réactifs, et la gestion d\'état. Vue 3 est son framework préféré pour les interfaces modernes et performantes.',
    category: 'frontend',
    confidence: 0.95
  },
  {
    keywords: 'nuxt|nuxtjs|nuxt.js',
    response: 'Nuxt.js est son framework de prédilection pour les applications Vue.js full-stack. Il l\'utilise pour le rendu côté serveur (SSR), la génération statique, et l\'optimisation des performances. Les auto-imports et la structure des modules lui font gagner beaucoup de temps.',
    category: 'frontend',
    confidence: 0.95
  },
  {
    keywords: 'typescript|ts|typage',
    response: 'Il maîtrise TypeScript et son système de typage avancé (Generics, Unions, Interfaces, Types). C\'est devenu incontournable dans son workflow pour une meilleure maintenabilité et une détection d\'erreurs précoce.',
    category: 'frontend',
    confidence: 0.92
  },
  {
    keywords: 'tailwind|css|styling|style|design',
    response: 'TailwindCSS est son outil de choix pour le styling. Il crée des designs modernes et responsifs en utilisant l\'approche "utility-first". C\'est rapide, maintenable et cohérent.',
    category: 'frontend',
    confidence: 0.90
  },

  // Backend
  {
    keywords: 'laravel|framework php',
    response: 'Laravel est son framework backend principal. Il maîtrise Laravel avec Eloquent ORM, les migrations, les APIs RESTful, la validation, l\'authentification Sanctum/JWT, et les WebSockets en temps réel. Il optimise aussi les performances avec Redis et Laravel Horizon.',
    category: 'backend',
    confidence: 0.98
  },
  {
    keywords: 'symfony|sf|php',
    response: 'Il connaît bien Symfony, particulièrement pour les applications d\'entreprise complexes. Il a de l\'expérience avec les bundles, les services, Doctrine ORM, et l\'architecture MVC structurée.',
    category: 'backend',
    confidence: 0.88
  },
  {
    keywords: 'nodejs|node|express|javascript backend',
    response: 'Il a de l\'expérience avec Node.js et Express.js pour construire des APIs légères et performantes. Node.js est excellent pour les applications en temps réel avec les WebSockets.',
    category: 'backend',
    confidence: 0.85
  },
  {
    keywords: 'python|django|flask',
    response: 'Il maîtrise Python pour des automatisations, des scripts d\'administration, et du data processing. Il a aussi de l\'expérience avec Django et Flask pour des applications web.',
    category: 'backend',
    confidence: 0.80
  },

  // Database
  {
    keywords: 'mysql|mariadb|postgres|postgresql|base de données|database|sql',
    response: 'Il est très à l\'aise avec MySQL, MariaDB et PostgreSQL. Il conçoit des schémas relationnels optimisés, il écrit des requêtes complexes, et il optimise les performances avec des index et des requêtes bien structurées.',
    category: 'database',
    confidence: 0.93
  },
  {
    keywords: 'redis|cache|caching',
    response: 'Redis est un atout majeur dans son arsenal. Il l\'utilise pour le caching, les sessions, les queues, et les opérations en temps réel. C\'est crucial pour optimiser les performances.',
    category: 'database',
    confidence: 0.90
  },

  // DevOps
  {
    keywords: 'docker|container|containerization',
    response: 'Docker est incontournable dans ses projets. Il maîtrise Docker Engine, Docker Compose, et il crée des images optimisées. Il utilise Docker pour la cohérence entre les environnements de développement et de production ainsi que pour le déploiement.',
    category: 'devops',
    confidence: 0.92
  },
  {
    keywords: 'cicd|ci/cd|github actions|gitlab ci|déploiement|deployment|pipeline',
    response: 'Il configure des pipelines CI/CD robustes avec GitHub Actions et GitLab CI. Tests automatisés, builds optimisés, déploiements sécurisés... C\'est son quotidien pour garantir une qualité et une vitesse de déploiement optimales.',
    category: 'devops',
    confidence: 0.90
  },

  // Mobile
  {
    keywords: 'ionic|mobile|app mobile|cross-platform',
    response: 'Ionic 6 est sa solution de choix pour les applications mobiles cross-platform. Avec Capacitor, il crée des apps natives qui fonctionnent sur iOS et Android avec une base de code unique. C\'est très productif !',
    category: 'mobile',
    confidence: 0.93
  },
  {
    keywords: 'flutter|mobile app',
    response: 'Il est actuellement en apprentissage de Flutter. C\'est un framework prometteur pour le mobile cross-platform, même si Ionic est sa priorité actuellement.',
    category: 'mobile',
    confidence: 0.70
  },

  // Autres
  {
    keywords: 'websocket|temps réel|real time|live',
    response: 'Il a une bonne expérience avec les WebSockets pour les applications en temps réel. Il les utilise avec Laravel (avec des packages comme Laravel WebSockets) ou Node.js pour des interactions utilisateur instantanées.',
    category: 'autres',
    confidence: 0.88
  },
  {
    keywords: 'api|rest|restful|endpoint',
    response: 'Il conçoit et implémente des APIs RESTful robustes avec une bonne documentation, une validation stricte, une gestion d\'erreurs appropriée, et une sécurité renforcée via JWT/Sanctum.',
    category: 'autres',
    confidence: 0.95
  },
  {
    keywords: 'git|github|gitlab|versionning|source control',
    response: 'Git est la base ! Il maîtrise les workflows (GitFlow, trunk-based development), les branches, les pull requests, et les fusions. GitHub et GitLab sont ses plateformes préférées.',
    category: 'autres',
    confidence: 0.94
  }
]

export type SkillExample = typeof skillsExamples[number]