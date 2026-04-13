import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

fr.about = {
  "loading": "Pour en conclure...",
  "quote": " « Rien d'autre à dire, à part ceci » ",
  "values": {
    "innovation_title": "Innovation",
    "innovation_desc": "Toujours à la pointe de la technologie",
    "trust_title": "Confiance",
    "trust_desc": "Relation transparente avec les clients",
    "creativity_title": "Créativité",
    "creativity_desc": "Des solutions uniques pour chaque projet"
  },
  "stats": {
    "projects": "Projets réalisés",
    "clients": "Clients satisfaits",
    "years": "Années d'expérience"
  },
  "curious": "Vous êtes curieux ?",
  "discover_arch": "Découvrez l'architecture technique de ce portfolio",
  "explore": "Explorer",
  "view_perf": "Voir la performance brute",
  "tech_stack": "Stack technique",
  "close": "Fermer",
  "vue_lifecycle": "Cycle de vie",
  "vue_desc": "Réactivité fine basée sur Proxy, meilleure performance et réutilisation du code",
  "ts_strict": "TypeScript strict",
  "ts_desc": "100% type-safe, inférence automatique, refactoring serein",
  "tests_quality": "Tests & Qualité",
  "tests_unit": "Tests unitaires + intégration",
  "tests_mount": "Montage de composants",
  "tests_coverage": "Rapport de couverture",
  "tests_type": "Vérification type en CI",
  "ci_cd": "Github Actions CI/CD",
  "ci_desc": "À chaque push : typage vérifié, tests passants, déploiement automatique",
  "perf_time": "Temps d'exécution tests",
  "pipeline": "Pipeline CI (Chaque commit)",
  "deploy": "Déploiement Netlify",
  "source_code": "Code source",
  "view_github": "Voir sur GitHub",
  "web_quality": "Qualité web",
  "view_pagespeed": "Voir sur PageSpeed Insights",
  "meta_title": "A propos de Randy",
  "meta_desc": "Pour en conclure, voici les statistique"
};

en.about = {
  "loading": "In conclusion...",
  "quote": " \"Nothing else to say, except this\" ",
  "values": {
    "innovation_title": "Innovation",
    "innovation_desc": "Always at the cutting edge of technology",
    "trust_title": "Trust",
    "trust_desc": "Transparent relationship with clients",
    "creativity_title": "Creativity",
    "creativity_desc": "Unique solutions for each project"
  },
  "stats": {
    "projects": "Completed projects",
    "clients": "Satisfied clients",
    "years": "Years of experience"
  },
  "curious": "Are you curious?",
  "discover_arch": "Discover the technical architecture of this portfolio",
  "explore": "Explore",
  "view_perf": "View raw performance",
  "tech_stack": "Technical stack",
  "close": "Close",
  "vue_lifecycle": "Lifecycle",
  "vue_desc": "Fine-grained reactivity based on Proxy, better performance and code reuse",
  "ts_strict": "Strict TypeScript",
  "ts_desc": "100% type-safe, automatic inference, serene refactoring",
  "tests_quality": "Tests & Quality",
  "tests_unit": "Unit + integration tests",
  "tests_mount": "Component mounting",
  "tests_coverage": "Coverage report",
  "tests_type": "Type verification in CI",
  "ci_cd": "Github Actions CI/CD",
  "ci_desc": "On every push: typing verified, passing tests, automatic deployment",
  "perf_time": "Test execution time",
  "pipeline": "CI Pipeline (Every commit)",
  "deploy": "Netlify deployment",
  "source_code": "Source code",
  "view_github": "View on GitHub",
  "web_quality": "Web quality",
  "view_pagespeed": "View on PageSpeed Insights",
  "meta_title": "About Randy",
  "meta_desc": "In conclusion, here are the statistics"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
