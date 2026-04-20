export const projectsExamples = [
  {
    keywords: 'fid-connect|fidconnect|fid connect|fidconnect project|projet fid connect',
    response: 'FID-Connect est un projet majeur que Randy a développé. C\'est une plateforme Laravel + Vue.js pour la gestion de connexions sécurisées. Randy a géré l\'authentification, les API RESTful, et l\'optimisation des performances. Le projet a atteint +35% d\'amélioration de performance grâce à l\'optimisation SQL et Redis.',
    category: 'projects',
    link: '/projects#fid-connect',
    confidence: 0.95
  },
  {
    keywords: 'qcp|quality|qualité|gestion qualité|quality management|projet qcp',
    response: 'QCP est un projet de gestion de qualité que Randy a créé. C\'est une application Vue.js + Laravel avec des dashboards interactifs et des rapports détaillés pour suivre les métriques de qualité.',
    category: 'projects',
    link: '/projects#qcp',
    confidence: 0.90
  },
  {
    keywords: 'echo-webline|echo webline|echo|echo project|projet echo',
    response: 'Echo Webline est une plateforme web innovante que Randy a développée. Elle utilise une architecture moderne avec Vue.js en frontend et Laravel en backend, intégrant des WebSockets pour les mises à jour en temps réel.',
    category: 'projects',
    link: '/projects#echo-webline',
    confidence: 0.90
  },
  {
    keywords: 'afr-fan|afrfan|afr|afr fan|projet afr',
    response: 'AFR-Fan est un projet de plateforme communautaire que Randy a construit avec Nuxt.js et Laravel. Il inclut des fonctionnalités sociales, des notifications en temps réel, et une bonne expérience utilisateur.',
    category: 'projects',
    link: '/projects#afr-fan',
    confidence: 0.85
  },
  {
    keywords: 'nurse|nurses|application infirmiere|infirmier|nursing app|projet nurse',
    response: 'Nurses est une application mobile/web que Randy a développée avec IONIC + Capacitor et Laravel backend. C\'est une solution pour la gestion des services infirmiers avec synchronisation temps réel.',
    category: 'projects',
    link: '/projects#nurses',
    confidence: 0.90
  },
  {
    keywords: 'webcup|webcup24|web cup|compétition|competition|webcup 24|webcup 2024',
    response: 'WebCup24 était une compétition web de 48h où Randy a développé une solution complète fullstack. C\'était une expérience incroyable de travail sous pression avec une équipe talentueuse. Randy peut t\'en parler plus en détail !',
    category: 'projects',
    link: '/webcup24',
    confidence: 0.95
  },
  {
    keywords: 'projet|project|portfolio|réalisations|projects|achievements|travaux|mes projets|ses projets|les projets de randy|randy projects',
    response: 'Randy a travaillé sur plusieurs projets passionnants couvrant des domaines variés : plateforme SaaS, applications mobiles, dashboards temps réel, API complexes... Chaque projet lui a permis d\'apprendre et de progresser dans sa maîtrise des technologies.',
    category: 'projects',
    confidence: 0.85
  },
  {
    keywords: 'sae|sae401|sae 401|projet universitaire|university project|études|study project',
    response: 'SAE 401 est un projet universitaire que Randy a réalisé. C\'est une application complète avec des contraintes techniques spécifiques qui lui ont permis de démontrer ses compétences en développement fullstack.',
    category: 'projects',
    link: '/projects#sae',
    confidence: 0.80
  },
  {
    keywords: 'dashboard|tableau de bord|real time dashboard|dashboard temps réel|monitoring',
    response: 'Randy a développé plusieurs dashboards interactifs avec des graphiques dynamiques et des mises à jour en temps réel. Il utilise Chart.js, D3.js ou ECharts selon les besoins du projet.',
    category: 'projects',
    confidence: 0.85
  },
  {
    keywords: 'saas|plateforme saas|saas platform|abonnement|subscription|multi-tenant',
    response: 'Randy a conçu et développé des plateformes SaaS avec gestion d\'abonnements, authentification multi-tenant, et facturation automatisée. L\'architecture est scalable et sécurisée.',
    category: 'projects',
    confidence: 0.85
  },
  {
    keywords: 'api|rest api|api restful|api platform|web service',
    response: 'Randy a créé de nombreuses APIs RESTful pour différents projets, avec documentation Swagger/OpenAPI, validation des données, authentification JWT/Sanctum, et rate limiting pour la sécurité.',
    category: 'projects',
    confidence: 0.90
  },
  {
    keywords: 'e-commerce|ecommerce|boutique en ligne|online store|shop|panier|cart',
    response: 'Randy a développé des solutions e-commerce avec gestion de panier, paiement sécurisé (Stripe/PayPal), suivi des commandes, et interface d\'administration complète.',
    category: 'projects',
    confidence: 0.80
  },
  {
    keywords: 'crm|gestion client|customer management|client management',
    response: 'Randy a construit des CRM personnalisés avec gestion des contacts, suivi des interactions, pipeline de vente, et reporting avancé pour les équipes commerciales.',
    category: 'projects',
    confidence: 0.85
  },
  {
    keywords: 'pwa|progressive web app|offline|service worker|app hors ligne',
    response: 'Randy a transformé plusieurs applications en PWA pour permettre une expérience hors ligne et des performances améliorées. Il maîtrise les Service Workers et le caching stratégique.',
    category: 'projects',
    confidence: 0.85
  },
  {
    keywords: 'open source|contribution open source|open source contribution|github contribution',
    response: 'Randy contribue régulièrement à des projets open source. Il croit en le partage de connaissances et l\'amélioration collective. Ses contributions sont visibles sur son profil GitHub.',
    category: 'projects',
    confidence: 0.80
  },
  {
    keywords: 'hackathon|hackathon 24h|innovation|concours|prix|award',
    response: 'Randy a participé à plusieurs hackathons et compétitions tech, dont la WebCup24. Ces expériences lui ont permis de travailler sous pression et de livrer des solutions innovantes rapidement.',
    category: 'projects',
    link: '/webcup24',
    confidence: 0.85
  }
]

export type ProjectExample = typeof projectsExamples[number]