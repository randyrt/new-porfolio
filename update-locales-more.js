import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

fr.services = {
  "loading": "Mes services...",
  "quote": "Découvrons ensemble les services que je propose pour donner vie à vos projets numériques",
  "git_title": "Git & version control",
  "git_desc": "Gestion efficace du code source avec Git, incluant le travail en équipe, la résolution de conflits et la structuration propre des branches.",
  "team_title": "Team workflow & merges",
  "team_desc": "Mise en place de workflows efficaces pour équipes de développement, assurant des merges propres, des releases stables et une bonne coordination entre développeurs.",
  "deploy_title": "Deployment & server security",
  "deploy_desc": "Déploiement d’applications web sur serveurs Linux avec configuration sécurisée, gestion des accès et optimisation pour la production.",
  "custom_title": "Personnalisation sur mesure",
  "custom_desc": "Je suis ouvert à discuter de service personnalisés adaptés à vos besoins spécifiques. N’hésitez pas à me contacter pour en parler !",
  "custom_li1": "Service personnalisés",
  "custom_li2": "Adaptation aux besoins",
  "custom_li3": "Flexibilité",
  "collab_title": "Collaboration & partenariat",
  "collab_desc": "Je suis également intéressé par des collaborations à long terme ou des partenariats pour développer des projets innovants ensemble. N’hésitez pas à me contacter pour en discuter !",
  "collab_li1": "Collaborations à long terme",
  "collab_li2": "Partenariats",
  "collab_li3": "Projets innovants",
  "maintenance_title": "Maintenance",
  "maintenance_desc": "En plus de mes compétences principales, je propose également des service de conseil technique, de revue de code et d’accompagnement pour vos projets numériques.",
  "maintenance_li1": "Conseil technique",
  "maintenance_li2": "Revue de code",
  "maintenance_li3": "Accompagnement projet",
  "doc_title": "Documentation fonctionnelle",
  "doc_desc": "Je transforme vos besoins en spécifications claires et détaillées. Rédaction de cahiers des charges, user stories et documentations techniques adaptées à tous les intervenants.",
  "doc_li1": "Cahiers des charges",
  "doc_li2": "Spécifications fonctionnelles",
  "doc_li3": "Documentation utilisateur",
  "pedagogy_title": "Pédagogie client",
  "pedagogy_desc": "J'explique simplement des concepts techniques complexes. Formation, démonstration et accompagnement pour que vous maîtrisiez parfaitement vos outils.",
  "pedagogy_li1": "Vulgarisation technique",
  "pedagogy_li2": "Sessions de formation",
  "pedagogy_li3": "Supports pédagogiques",
  "biz_title": "Stratégie business",
  "biz_desc": "Vision orientée métier et résultats. Je vous aide à aligner votre projet avec vos objectifs commerciaux et à communiquer efficacement avec toutes les parties prenantes.",
  "biz_li1": "Alignement métier/technique",
  "biz_li2": "Communication partenaires",
  "biz_li3": "Conseil en stratégie digitale",
  "work_together": "Travaillons ensemble",
  "meta_title": "Services de Randy",
  "meta_desc": "Découvrons ensemble les services que je propose pour donner vie à vos projets numériques"
};

en.services = {
  "loading": "My services...",
  "quote": "Let's discover together the services I offer to bring your digital projects to life",
  "git_title": "Git & version control",
  "git_desc": "Effective source code management with Git, including teamwork, conflict resolution, and clean branching structures.",
  "team_title": "Team workflow & merges",
  "team_desc": "Implementation of efficient workflows for development teams, ensuring clean merges, stable releases, and good coordination between developers.",
  "deploy_title": "Deployment & server security",
  "deploy_desc": "Web application deployment on Linux servers with secure configuration, access management, and production optimization.",
  "custom_title": "Custom personalization",
  "custom_desc": "I am open to discussing personalized services tailored to your specific needs. Do not hesitate to contact me to talk about it!",
  "custom_li1": "Customized services",
  "custom_li2": "Adaptation to needs",
  "custom_li3": "Flexibility",
  "collab_title": "Collaboration & partnership",
  "collab_desc": "I am also interested in long-term collaborations or partnerships to develop innovative projects together. Do not hesitate to contact me to discuss!",
  "collab_li1": "Long-term collaborations",
  "collab_li2": "Partnerships",
  "collab_li3": "Innovative projects",
  "maintenance_title": "Maintenance",
  "maintenance_desc": "In addition to my core skills, I also offer technical consulting, code review, and support services for your digital projects.",
  "maintenance_li1": "Technical consulting",
  "maintenance_li2": "Code review",
  "maintenance_li3": "Project support",
  "doc_title": "Functional documentation",
  "doc_desc": "I translate your needs into clear and detailed specifications. Writing technical specifications, user stories, and technical docs tailored to all stakeholders.",
  "doc_li1": "Statements of work",
  "doc_li2": "Functional specifications",
  "doc_li3": "User documentation",
  "pedagogy_title": "Client pedagogy",
  "pedagogy_desc": "I simply explain complex technical concepts. Training, demonstration, and support so you can perfectly master your tools.",
  "pedagogy_li1": "Technical popularization",
  "pedagogy_li2": "Training sessions",
  "pedagogy_li3": "Educational materials",
  "biz_title": "Business strategy",
  "biz_desc": "Business and results-oriented vision. I help you align your project with your business goals and communicate effectively with all stakeholders.",
  "biz_li1": "Business/technical alignment",
  "biz_li2": "Partner communication",
  "biz_li3": "Digital strategy consulting",
  "work_together": "Let's work together",
  "meta_title": "Randy's Services",
  "meta_desc": "Let's discover together the services I offer to bring your digital projects to life"
};

fr.technology = {
  "loading": "Technologies utilisées...",
  "quote": "« Explorons maintenant les technologies que j’utilise quotidiennement »",
  "description": "Être polyvalent, ce n'est pas connaître un peu de tout, c'est savoir s'adapter et choisir la bonne technologie pour chaque défi. Voici les outils que j'utilise au quotidien pour concrétiser vos idées.",
  "learning": "En cours d'apprentissage",
  "design": "Design",
  "frontend": "Frontend",
  "backend": "Backend & SGBD",
  "frameworks": "Frameworks",
  "dev_env": "Environnement de dev",
  "gitops": "GitOps & Sécurisation",
  "scripting": "Script & Automatisation",
  "toast_hover": "Survolez le logo pour afficher le nom du techno 🙂",
  "meta_title": "Technologies de Randy",
  "meta_desc": " Explorons maintenant les technologies que j’utilise quotidiennement"
};

en.technology = {
  "loading": "Technologies used...",
  "quote": "\"Now let's explore the technologies I use daily\"",
  "description": "Being polyvalent doesn't mean knowing a bit of everything, it means knowing how to adapt and choose the right technology for each challenge. Here are the tools I use every day to bring your ideas to life.",
  "learning": "Currently learning",
  "design": "Design",
  "frontend": "Frontend",
  "backend": "Backend & DBMS",
  "frameworks": "Frameworks",
  "dev_env": "Dev environment",
  "gitops": "GitOps & Security",
  "scripting": "Scripting & Automation",
  "toast_hover": "Hover over the logo to display the tech name 🙂",
  "meta_title": "Randy's Technologies",
  "meta_desc": "Now let's explore the technologies I use daily"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
