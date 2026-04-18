export const projectsExamples = [
  {
    keywords: 'fid-connect|fidconnect|fid connect',
    response: 'FID-Connect est un projet majeur que j\'ai développé. C\'est une plateforme Laravel + Vue.js pour la gestion de connexions sécurisées. J\'ai géré l\'authentification, les API RESTful, et l\'optimisation des performances. Le projet a atteint +35% d\'amélioration de performance grâce à l\'optimisation SQL et Redis.',
    category: 'projects',
    link: '/projects#fid-connect',
    confidence: 0.95
  },
  {
    keywords: 'qcp|quality|qualité',
    response: 'QCP est un projet de gestion de qualité que j\'ai créé. C\'est une application Vue.js + Laravel avec des dashboards interactifs et des rapports détaillés pour suivre les métriques de qualité.',
    category: 'projects',
    link: '/projects#qcp',
    confidence: 0.90
  },
  {
    keywords: 'echo-webline|echo webline|echo',
    response: 'Echo Webline est une plateforme web innovante que j\'ai développée. Elle utilise une architecture moderne avec Vue.js en frontend et Laravel en backend, intégrant des WebSockets pour les mises à jour en temps réel.',
    category: 'projects',
    link: '/projects#echo-webline',
    confidence: 0.90
  },
  {
    keywords: 'afr-fan|afrfan|afr',
    response: 'AFR-Fan est un projet de plateforme communautaire que j\'ai construit avec Nuxt.js et Laravel. Il inclut des fonctionnalités sociales, des notifications en temps réel, et une bonne expérience utilisateur.',
    category: 'projects',
    link: '/projects#afr-fan',
    confidence: 0.85
  },
  {
    keywords: 'nurse|nurses|application infirmiere',
    response: 'Nurses est une application mobile/web que j\'ai développée avec IONIC + Capacitor et Laravel backend. C\'est une solution pour la gestion des services infirmiers avec synchronisation temps réel.',
    category: 'projects',
    link: '/projects#nurses',
    confidence: 0.90
  },
  {
    keywords: 'webcup|webcup24|compétition|competition',
    response: 'WebCup24 était une compétition web de 48h où j\'ai développé une solution complète fullstack. C\'était une expérience incroyable de travail sous pression avec un équipe talentueuse. Je peux t\'en parler plus en détail !',
    category: 'projects',
    link: '/webcup24',
    confidence: 0.95
  },
  {
    keywords: 'projet|project|portfolio',
    response: 'J\'ai travaillé sur plusieurs projets passionnants couvrant des domaines variés : plateforme SaaS, applications mobiles, dashboards temps réel, API complexes... Chaque projet m\'a permis d\'apprendre et de progressive dans ma maîtrise des technologies.',
    category: 'projects',
    confidence: 0.85
  }
]

export type ProjectExample = typeof projectsExamples[number]
