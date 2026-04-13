import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

fr.projects = {
  "loading": "Mes récents projets...",
  "quote": "« Quelques projets dont je suis particulièrement fier »",
  "fid_connect": "Fid-Connect est une plateforme tout-en-un qui centralise la gestion comptable, fiscale et administrative des entreprises. Elle va au-delà du simple suivi des tâches en intégrant la gestion des réformes fiscales, le suivi des parts, la génération de lettres d’engagement, l’automatisation de processus clés, ammortissement, TVA, gestion de rendez-vous, payment en ligne, ect. Développée avec Vue.js et Laravel, elle est adaptée aux exigences de la réglementation belge et permet d’optimiser la productivité tout en sécurisant les opérations.",
  "qcp": "QCP est une application sur mesure développée pour un client belge, axée sur la gestion du crédit, le suivi de l’amortissement et la planification financière. Propulsée par Vue.js et Laravel, elle offre une interface intelligente et intuitive qui simplifie les opérations financières complexes, automatise les calculs et permet une génération fluide de documents essentiels. Conçue pour répondre aux besoins spécifiques du client, elle optimise la gestion financière et améliore la prise de décision grâce à des fonctionnalités avancées et une expérience utilisateur exceptionnelle.",
  "echo_webline": "echo-webLine est une plateforme web développée pour un client basé à Paris, spécialisée dans l’imagerie cardiovasculaire et la gestion d’événements scientifiques. Conçue avec Nuxt.js et Laravel, elle propose une interface moderne et dynamique permettant de présenter des contenus médicaux, gérer les inscriptions à des congrès et valoriser les activités d’une communauté professionnelle. L’application met l’accent sur une expérience utilisateur fluide, une navigation intuitive et une mise en avant visuelle des informations clés, tout en garantissant performance et fiabilité.",
  "afr_fan": "Afr-fan est un réseau social dédié à la communauté africaine, offrant une plateforme pour échanger des contenus culturels, sociaux et économiques. Développé avec Nuxt.js et Laravel, il propose une interface moderne et intuitive qui facilite les interactions entre membres, la création de groupes d'intérêt et la diffusion de contenus variés. Afr-fan vise à renforcer les liens au sein de la diaspora africaine en fournissant un espace de partage sécurisé et engageant, tout en mettant à l'honneur les richesses culturelles du continent. La plateforme intègre également un système de paiement en ligne par VISA ou PayPal permettant aux utilisateurs de soutenir la communauté ou d'accéder à des fonctionnalités premium.",
  "nurses": "Souper of Nurses est un restaurant belge qui accueille de grands événements sur de longues périodes. Ce site web permet aux utilisateurs de faire des réservations de groupe en ligne, de contacter directement le restaurant, et comprend un panneau d’administration pour gérer les inscriptions, les événements et les places VIP. Développé avec Vue.js et Symfony, il offre une expérience utilisateur fluide et une gestion efficace des réservations, tout en mettant en valeur les événements à venir et les services exclusifs du restaurant.",
  "toast_click": "Cliquez sur une image pour l'agrandir 🙂 !",
  "meta_title": "Projets de Randy",
  "meta_desc": "Quelques projets dont je suis particulièrement fier "
};

en.projects = {
  "loading": "My recent projects...",
  "quote": "\"Some projects I am particularly proud of\"",
  "fid_connect": "Fid-Connect is an all-in-one platform that centralizes accounting, tax, and administrative management for businesses. It goes beyond simple task tracking by integrating tax reform management, share tracking, engagement letter generation, key process automation, depreciation, VAT, appointment management, online payment, etc. Developed with Vue.js and Laravel, it is adapted to the requirements of Belgian regulations and optimizes productivity while securing operations.",
  "qcp": "QCP is a custom-built application developed for a Belgian client, focusing on credit management, depreciation tracking, and financial planning. Powered by Vue.js and Laravel, it offers an intelligent and intuitive interface that simplifies complex financial operations, automates calculations, and enables seamless generation of essential documents. Designed to meet the client's specific needs, it optimizes financial management and improves decision-making through advanced features and an exceptional user experience.",
  "echo_webline": "echo-webLine is a web platform developed for a Paris-based client, specializing in cardiovascular imaging and scientific event management. Designed with Nuxt.js and Laravel, it offers a modern and dynamic interface allowing the presentation of medical content, congress registration management, and highlighting the activities of a professional community. The application emphasizes a fluid user experience, intuitive navigation, and visual highlighting of key information, while ensuring performance and reliability.",
  "afr_fan": "Afr-fan is a social network dedicated to the African community, offering a platform to exchange cultural, social, and economic content. Developed with Nuxt.js and Laravel, it offers a modern and intuitive interface that facilitates interactions between members, the creation of interest groups, and the dissemination of various content. Afr-fan aims to strengthen ties within the African diaspora by providing a secure and engaging sharing space, while celebrating the continent's cultural richness. The platform also integrates an online payment system via VISA or PayPal allowing users to support the community or access premium features.",
  "nurses": "Souper of Nurses is a Belgian restaurant that hosts major events over long periods. This website allows users to make online group reservations, contact the restaurant directly, and includes an administration panel to manage registrations, events, and VIP seating. Developed with Vue.js and Symfony, it offers a fluid user experience and efficient reservation management, while highlighting upcoming events and exclusive restaurant services.",
  "toast_click": "Click on an image to enlarge it 🙂!",
  "meta_title": "Randy's Projects",
  "meta_desc": "Some projects I am particularly proud of"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
