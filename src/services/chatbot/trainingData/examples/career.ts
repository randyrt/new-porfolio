export const careerExamples = [
  {
    keywords: 'actuellement|now|today|present|travaille|work|entreprise|company',
    response: 'Je travaille actuellement en tant que Senior Developer chez MG CONSULTING ACT & IT depuis avril 2024. Je travaille principalement avec Laravel 11 et Vue.js 3, et je m\'occupe d\'optimisation backend, de CI/CD avec GitHub Actions et Docker, et aussi du mentoring de développeurs juniors. C\'est une belle expérience en équipe distribuée (Maroc, Belgique).',
    category: 'career',
    confidence: 0.98
  },
  {
    keywords: 'expérience|experience|parcours|career path|cv',
    response: 'Mon parcours a commencé comme stagiaire Frontend chez Fihary Soft (2021), puis j\'ai travaillé comme Backend Developer chez PixelZ (2022). J\'ai ensuite  fait du freelance fullstack de 2023 à 2024, et maintenant je suis Senior Developer chez MG CONSULTING ACT & IT. Chaque étape m\'a permis de progresser et d\'élargir mes compétences !',
    category: 'career',
    confidence: 0.97
  },
  {
    keywords: 'freelance|indépendant|consultant',
    response: 'J\'ai eu une belle période en freelance fullstack de janvier 2023 à mars 2024. J\'ai créé des applications custom avec Laravel 10 et Vue.js 3, des apps mobiles IONIC 6, et j\'ai géré les intégrations de paiement et APIs tierces. C\'était une bonne expérience d\'indépendance !',
    category: 'career',
    confidence: 0.92
  },
  {
    keywords: 'senior|manager|lead|leadership|mentoring|mentor',
    response: 'En tant que Senior Developer, je ne fais pas que code ! Je mentorise 3 développeurs juniors, je contribue à l\'architecture des projets, et je m\'assure que les bonnes pratiques sont respectées. C\'est une responsabilité que j\'apprécie beaucoup.',
    category: 'career',
    confidence: 0.93
  },
  {
    keywords: 'stage|intern|internship|fihary',
    response: 'J\'ai commencé mon parcours avec un stage chez Fihary Soft de mai 2021 à décembre 2021. J\'ai appris l\'intégration de maquettes Figma en HTML5/CSS3, et le JavaScript vanilla. C\'était une bonne introduction au web development !',
    category: 'career',
    confidence: 0.90
  },
  {
    keywords: 'pixelz|backend|api',
    response: 'Chez PixelZ (février 2022 - novembre 2022), j\'ai travaillé comme Backend Web Developer. J\'ai construit des APIs avec Laravel 9, travaillé avec Eloquent ORM, géré les bases de données relationnelles, et implémenté l\'authentification Laravel Sanctum. C\'était une belle fondation pour ma carrière backend.',
    category: 'career',
    confidence: 0.92
  },
  {
    keywords: 'défi|challenge|apprentissage|learning',
    response: 'Je suis toujours en quête de nouveaux défis ! J\'apprécie apprendre de nouvelles technologies, optimiser les performances, résoudre des problèmes complexes, et partager mes connaissances. C\'est ça qui me motive dans le développement.',
    category: 'career',
    confidence: 0.88
  }
]

export type CareerExample = typeof careerExamples[number]
