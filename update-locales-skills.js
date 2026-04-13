import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

fr.skills = {
  "loading": "Mes compétences...",
  "quote": " « Entrons dans le vif du sujet, Parlons de mes compétences » ",
  "description": "Je crois que l’apprentissage continu est essentiel pour rester en avance dans le monde en constante évolution des technologies. Je cherche toujours à enrichir mes compétences, et ma capacité à apprendre rapidement me permet de m’adapter aux nouveaux outils.",
  "meta_title": "Compétences de Randy",
  "meta_desc": "Parlons de mes compétences ",
  
  "vue_title": "Compétences en VueJs",
  "vue_s1_name": "VueJS avec Typescript",
  "vue_s1_desc": "Je peux créer des composants typés de façon claire. Je peux aussi définir des interfaces solides, sécurisées. Gérer des classes et des décorateurs efficacement.",
  "vue_s2_name": "SPA (Single Page Application)",
  "vue_s2_desc": "Je peux construire des applications fluides sans rechargement complet. L’expérience utilisateur est ainsi plus agréable et rapide.",
  "vue_s3_name": "PINIA",
  "vue_s3_desc": "Je peux centraliser et organiser la gestion de l’état global. Cela simplifie le développement de projets complexes et modulaires.",

  "laravel_title": "Compétences en Laravel",
  "laravel_s1_name": "Eloquent ORM",
  "laravel_s1_desc": "Gérer les relations entre modèles, effectuer des requêtes complexes et manipuler les données de manière intuitive,efficace.",
  "laravel_s2_name": "Routing & Middleware",
  "laravel_s2_desc": "Je peux définir des routes claires, sécuriser les accès avec des middlewares et organiser la logique des contrôleurs..",
  "laravel_s3_name": "Blade & API",
  "laravel_s3_desc": "Je peux créer des vues dynamiques avec Blade et développer des API RESTful robustes pour la communication front/back.",

  "docker_title": "Compétences en Docker",
  "docker_s1_name": "Conteneurisation",
  "docker_s1_desc": "Je peux créer et gérer des conteneurs pour isoler les applications.Permettre un déploiement cohérent sur tous les environnements.",
  "docker_s2_name": "Docker Compose",
  "docker_s2_desc": "Je peux orchestrer plusieurs conteneurs avec Docker Compose. Cela simplifie la configuration de projets complexes.",
  "docker_s3_name": "Images et Volumes",
  "docker_s3_desc": "Je peux créer des images optimisées et gérer les volumes de données. Persistance et réutilisabilité des environnements.",

  "ionic_title": "Compétences en IONIC",
  "ionic_s1_name": "Applications hybrides",
  "ionic_s1_desc": "Je peux créer des applications mobiles qui fonctionnent sur Android et iOS. Cela permet de toucher un maximum d’utilisateurs avec un seul codebase.",
  "ionic_s2_name": "Intégration avec Vue",
  "ionic_s2_desc": "Je peux intégrer IONIC avec Vue.js pour des interfaces dynamiques. Offre une expérience utilisateur réactive et dynamique.",
  "ionic_s3_name": "Plugins natifs",
  "ionic_s3_desc": "Utiliser des plugins natifs pour accéder aux fonctionnalités du téléphone. Cela permet d’ajouter caméra, GPS, notifications et etc.",

  "python_title": "Compétences en Python",
  "python_s1_name": "Programmation Orientée Objet",
  "python_s1_desc": "Je peux structurer le code avec classes et objets pour des projets modulaires. Cela facilite la maintenance et l’évolution du code de façon progressive.",
  "python_s2_name": "Automatisation & Scripts",
  "python_s2_desc": "Je peux écrire des scripts pour automatiser des tâches répétitives. Cela améliore l’efficacité et réduit les erreurs humaines.",
  "python_s3_name": "Frameworks Web",
  "python_s3_desc": "Je peux développer des applications web avec Flask ou Django. Capacité de créer des APIs et des interfaces web.",

  "nuxt_title": "Compétences en Nuxt.js",
  "nuxt_s1_name": "Rendu universel (SSR/SSG)",
  "nuxt_s1_desc": "Je peux développer des applications avec rendu côté serveur ou génération statique. Cela améliore le SEO et les performances globales.",
  "nuxt_s2_name": "Auto-importation",
  "nuxt_s2_desc": "Je maîtrise l'auto-importation des composants, composables et utilitaires. Le code est plus propre et la productivité est augmentée.",
  "nuxt_s3_name": "Modules & Layers",
  "nuxt_s3_desc": "Je peux étendre les fonctionnalités avec les modules Nuxt et organiser le code en couches. Architecture modulaire et maintenable.",

  "symfony_title": "Compétences en Symfony",
  "symfony_s1_name": "Architecture MVC",
  "symfony_s1_desc": "Je peux structurer des applications robustes selon le patron MVC. Séparation claire des responsabilités pour une meilleure maintenabilité.",
  "symfony_s2_name": "Doctrine ORM",
  "symfony_s2_desc": "Je peux gérer la persistance des données avec Doctrine. Création d'entités, relations avancées et requêtes DQL optimisées.",
  "symfony_s3_name": "Formulaires & Sécurité",
  "symfony_s3_desc": "Je peux créer des formulaires complexes avec validation native. Gestion de l'authentification, des voters et des firewalls.",

  "cicd_title": "Compétences en CI & CD",
  "cicd_s1_name": "Intégration continue",
  "cicd_s1_desc": "Je peux automatiser les tests et la validation du code à chaque push. Détection précoce des erreurs et qualité garantie.",
  "cicd_s2_name": "Déploiement continu",
  "cicd_s2_desc": "Je peux mettre en place des pipelines de déploiement automatisés. Livraison rapide et fiable vers les environnements de production.",
  "cicd_s3_name": "Outils (GitHub Actions/GitLab CI)",
  "cicd_s3_desc": "Je peux configurer des workflows personnalisés avec les principaux outils. Exécution parallèle, caches et déploiements multi-environnements.",

  "flutter_title": "Compétences en Flutter",
  "flutter_s1_name": "Widgets & Composition",
  "flutter_s1_desc": "Je peux construire des interfaces riches et réactives avec des widgets. Approche déclarative et composition flexible pour des UIs personnalisées.",
  "flutter_s2_name": "État (Provider/Riverpod)",
  "flutter_s2_desc": "Je peux gérer l'état applicatif de manière efficace. Mise à jour réactive des interfaces et séparation des préoccupations.",
  "flutter_s3_name": "Multi-plateforme",
  "flutter_s3_desc": "Je peux développer des applications pour mobile, web et desktop. Codebase unique pour plusieurs cibles avec rendu natif.",

  "express_title": "Compétences en Express.js",
  "express_s1_name": "API RESTful",
  "express_s1_desc": "Je peux concevoir et développer des API RESTful robustes avec Express. Gestion des routes, des middlewares et des réponses HTTP adaptées.",
  "express_s2_name": "Middleware personnalisé",
  "express_s2_desc": "Je peux créer des middlewares sur mesure pour la validation, l'authentification, la journalisation et la gestion d'erreurs.",
  "express_s3_name": "Intégration avec bases de données",
  "express_s3_desc": "Je peux connecter Express à MongoDB, PostgreSQL ou MySQL. Utilisation d'ODM/ORM comme Mongoose ou Sequelize pour les opérations données."
};

en.skills = {
  "loading": "My skills...",
  "quote": " \"Let's get straight to the point, let's talk about my skills\" ",
  "description": "I believe continuous learning is essential to stay ahead in the ever-evolving world of technology. I always seek to enrich my skills, and my ability to learn quickly allows me to adapt to new tools.",
  "meta_title": "Randy's Skills",
  "meta_desc": "Let's talk about my skills",
  
  "vue_title": "VueJs Skills",
  "vue_s1_name": "VueJS with Typescript",
  "vue_s1_desc": "I can create clearly typed components. I can also define solid, secure interfaces. Manage classes and decorators efficiently.",
  "vue_s2_name": "SPA (Single Page Application)",
  "vue_s2_desc": "I can build smooth applications without full reloads. The user experience is thus more pleasant and fast.",
  "vue_s3_name": "PINIA",
  "vue_s3_desc": "I can centralize and organize global state management. This simplifies the development of complex and modular projects.",

  "laravel_title": "Laravel Skills",
  "laravel_s1_name": "Eloquent ORM",
  "laravel_s1_desc": "Manage relations between models, perform complex queries and manipulate data intuitively and efficiently.",
  "laravel_s2_name": "Routing & Middleware",
  "laravel_s2_desc": "I can define clear routes, secure access with middlewares and organize controller logic.",
  "laravel_s3_name": "Blade & API",
  "laravel_s3_desc": "I can create dynamic views with Blade and develop robust RESTful APIs for front/back communication.",

  "docker_title": "Docker Skills",
  "docker_s1_name": "Containerization",
  "docker_s1_desc": "I can create and manage containers to isolate applications. Allow consistent deployment across all environments.",
  "docker_s2_name": "Docker Compose",
  "docker_s2_desc": "I can orchestrate multiple containers with Docker Compose. This simplifies the configuration of complex projects.",
  "docker_s3_name": "Images and Volumes",
  "docker_s3_desc": "I can create optimized images and manage data volumes. Persistence and reusability of environments.",

  "ionic_title": "IONIC Skills",
  "ionic_s1_name": "Hybrid applications",
  "ionic_s1_desc": "I can create mobile applications that run on Android and iOS. This allows reaching a maximum of users with a single codebase.",
  "ionic_s2_name": "Integration with Vue",
  "ionic_s2_desc": "I can integrate IONIC with Vue.js for dynamic interfaces. Provides a reactive and dynamic user experience.",
  "ionic_s3_name": "Native plugins",
  "ionic_s3_desc": "Use native plugins to access phone features. This allows adding camera, GPS, notifications, etc.",

  "python_title": "Python Skills",
  "python_s1_name": "Object-Oriented Programming",
  "python_s1_desc": "I can structure code with classes and objects for modular projects. This facilitates the progressive maintenance and evolution of code.",
  "python_s2_name": "Automation & Scripts",
  "python_s2_desc": "I can write scripts to automate repetitive tasks. This improves efficiency and reduces human errors.",
  "python_s3_name": "Web Frameworks",
  "python_s3_desc": "I can develop web applications with Flask or Django. Ability to create APIs and web interfaces.",

  "nuxt_title": "Nuxt.js Skills",
  "nuxt_s1_name": "Universal Rendering (SSR/SSG)",
  "nuxt_s1_desc": "I can develop applications with server-side rendering or static generation. This improves SEO and overall performance.",
  "nuxt_s2_name": "Auto-import",
  "nuxt_s2_desc": "I master the auto-import of components, composables, and utilities. The code is cleaner and productivity is increased.",
  "nuxt_s3_name": "Modules & Layers",
  "nuxt_s3_desc": "I can extend functionalities with Nuxt modules and organize code in layers. Modular and maintainable architecture.",

  "symfony_title": "Symfony Skills",
  "symfony_s1_name": "MVC Architecture",
  "symfony_s1_desc": "I can structure robust applications according to the MVC pattern. Clear separation of responsibilities for better maintainability.",
  "symfony_s2_name": "Doctrine ORM",
  "symfony_s2_desc": "I can manage data persistence with Doctrine. Creation of entities, advanced relationships, and optimized DQL queries.",
  "symfony_s3_name": "Forms & Security",
  "symfony_s3_desc": "I can create complex forms with native validation. Authentication management, voters, and firewalls.",

  "cicd_title": "CI & CD Skills",
  "cicd_s1_name": "Continuous Integration",
  "cicd_s1_desc": "I can automate tests and code validation on each push. Early detection of errors and guaranteed quality.",
  "cicd_s2_name": "Continuous Deployment",
  "cicd_s2_desc": "I can set up automated deployment pipelines. Fast and reliable delivery to production environments.",
  "cicd_s3_name": "Tools (GitHub Actions/GitLab CI)",
  "cicd_s3_desc": "I can configure custom workflows with main tools. Parallel execution, caches, and multi-environment deployments.",

  "flutter_title": "Flutter Skills",
  "flutter_s1_name": "Widgets & Composition",
  "flutter_s1_desc": "I can build rich and reactive interfaces with widgets. Declarative approach and flexible composition for customized UIs.",
  "flutter_s2_name": "State (Provider/Riverpod)",
  "flutter_s2_desc": "I can efficiently manage application state. Reactive updating of interfaces and separation of concerns.",
  "flutter_s3_name": "Cross-platform",
  "flutter_s3_desc": "I can develop applications for mobile, web, and desktop. Single codebase for multiple targets with native rendering.",

  "express_title": "Express.js Skills",
  "express_s1_name": "RESTful API",
  "express_s1_desc": "I can design and develop robust RESTful APIs with Express. Routing, middlewares, and adapted HTTP responses.",
  "express_s2_name": "Custom Middleware",
  "express_s2_desc": "I can create custom middlewares for validation, authentication, logging, and error management.",
  "express_s3_name": "Database Integration",
  "express_s3_desc": "I can connect Express to MongoDB, PostgreSQL, or MySQL. Use of ODM/ORM like Mongoose or Sequelize for data operations."
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
