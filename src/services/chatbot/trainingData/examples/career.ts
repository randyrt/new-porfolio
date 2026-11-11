export const careerExamples = [
  {
    keywords: 'actuellement|now|today|present|travaille|work|entreprise|company',
    response: 'Il travaille actuellement en tant que **Senior Developer** chez **MG CONSULTING ACT & IT** depuis avril 2024. Il travaille principalement avec **Laravel 11** et **Vue.js 3**, et il s\'occupe d\'optimisation backend, de CI/CD avec **GitHub Actions**, **Docker** et **Kubernetes**, ainsi que du mentoring de développeurs juniors. Il est aussi en train de monter en compétence sur **Terraform** pour l\'Infrastructure as Code. C\'est une belle expérience en équipe distribuée (Maroc, Belgique) !',
    category: 'career',
    confidence: 0.98
  },
  {
    keywords: 'expérience|experience|parcours|career path|cv',
    response: 'Son parcours a commencé comme stagiaire **Frontend** chez **Fihary Soft** (2021), puis il a travaillé comme **Backend Developer** chez **PixelZ** (2022). Il a ensuite fait du **freelance fullstack** de 2023 à 2024, et maintenant il est **Senior Developer** chez **MG CONSULTING ACT & IT**. En 2024, il a aussi renforcé ses compétences **DevOps** avec **Kubernetes** et **Terraform**. Chaque étape lui a permis de progresser et d\'élargir ses compétences !',
    category: 'career',
    confidence: 0.97
  },
  {
    keywords: 'freelance|indépendant|consultant',
    response: 'Il a eu une belle période en **freelance fullstack** de janvier 2023 à mars 2024. Il a créé des applications custom avec **Laravel 10** et **Vue.js 3**, des apps mobiles **IONIC 6**, et il a géré les intégrations de paiement et APIs tierces. C\'était une bonne expérience d\'indépendance qui lui a permis de toucher à différents domaines !',
    category: 'career',
    confidence: 0.92
  },
  {
    keywords: 'senior|manager|lead|leadership|mentoring|mentor',
    response: 'En tant que Senior Developer, il ne fais pas que coder ! il mentorise 3 développeurs juniors, je contribue à l\'architecture des projets, et je m\'assure que les bonnes pratiques sont respectées. C\'est une responsabilité que j\'apprécie beaucoup.',
    category: 'career',
    confidence: 0.93
  },
  {
    keywords: 'stage|intern|internship|fihary',
    response: 'il a commencé Son parcours avec un stage chez Fihary Soft de mai 2021 à décembre 2021. il a appris l\'intégration de maquettes Figma en HTML5/CSS3, et le JavaScript vanilla. C\'était une bonne introduction au web development !',
    category: 'career',
    confidence: 0.90
  },
  {
    keywords: 'pixelz|backend|api',
    response: 'Chez PixelZ (février 2022 - novembre 2022), il a travaillé comme Backend Web Developer. il a construit des APIs avec Laravel 9, travaillé avec Eloquent ORM, géré les bases de données relationnelles, et implémenté l\'authentification Laravel Sanctum. C\'était une belle fondation pour ma carrière backend.',
    category: 'career',
    confidence: 0.92
  },
  {
    keywords: 'défi|challenge|apprentissage|learning|veille|monter en compétence',
    response: 'Il est toujours en quête de nouveaux défis ! Il aime apprendre de nouvelles technologies, optimiser les performances, résoudre des problèmes complexes, et partager ses connaissances. Actuellement, il monte en compétence sur **Kubernetes** et **Terraform** pour le DevOps. C\'est cette curiosité et cette volonté d\'apprendre qui le motivent dans le développement !',
    category: 'career',
    confidence: 0.90
  }
]

export type CareerExample = typeof careerExamples[number]
