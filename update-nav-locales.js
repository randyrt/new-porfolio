import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

fr.nav = {
  change_language: "Language",
  change_theme: "Thème",
  home: "Accueil",
  quality: "Qualités",
  skills: "Compétences",
  technology: "Technologies",
  webcup: "WebCup2024",
  projects: "Projets",
  services: "Services",
  testimonials: "Témoignages",
  contact: "Contact",
  about: "À propos"
};

en.nav = {
  change_language: "Language",
  change_theme: "Theme",
  home: "Home",
  quality: "Qualities",
  skills: "Skills",
  technology: "Technologies",
  webcup: "WebCup2024",
  projects: "Projects",
  services: "Services",
  testimonials: "Testimonials",
  contact: "Contact",
  about: "About"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');

console.log("Nav translations added successfully.");
