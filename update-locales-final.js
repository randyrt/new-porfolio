import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

fr.testimonials = {
  "loading": "Témoignages...",
  "quote": " « Quelque témoignages venant de mes clients et employeurs » ",
  "description": "Ayant eu l'opportunité de collaborer avec de nombreux clients et hauts responsables à l'international, j'ai pu constater une même exigence partout : la confiance se construit sur la fiabilité, l'écoute et la qualité du livrable. Voici ce qu'ils ont bien voulu témoigner.",
  "t1_body": "« Randy est dynamique, travaille de manière soignée et professionnelle. J'aime collaborer avec lui et l'apprécie aussi en tant que développeur. »",
  "t1_author": "— Olivier Le Grand",
  "t1_role": "(Manager, FID-CONNECT)",
  "t2_body": "« Il y a deux choses que j’apprécie chez Randy : sa capacité d’adaptation rapide et sa volonté constante d’évoluer. Je suis convaincu qu’il ira loin dans le domaine de l’informatique. »",
  "t2_author": "— Pascal",
  "t2_role": "(Client et Directeur, MCP Belgique)",
  "meta_title": "Témoignages sur Randy",
  "meta_desc": "Quelque témoignages venant de mes clients et employeurs "
};

en.testimonials = {
  "loading": "Testimonials...",
  "quote": " \"Some testimonials from my clients and employers\" ",
  "description": "Having had the opportunity to collaborate with many international clients and senior managers, I have noticed the same requirement everywhere: trust is built on reliability, listening, and the quality of the deliverable. Here is what they wanted to testify.",
  "t1_body": "\"Randy is dynamic, works neatly and professionally. I like collaborating with him and also appreciate him as a developer.\"",
  "t1_author": "— Olivier Le Grand",
  "t1_role": "(Manager, FID-CONNECT)",
  "t2_body": "\"There are two things I appreciate about Randy: his ability to adapt quickly and his constant desire to evolve. I am convinced he will go far in the IT field.\"",
  "t2_author": "— Pascal",
  "t2_role": "(Client and Director, MCP Belgium)",
  "meta_title": "Testimonials about Randy",
  "meta_desc": "Some testimonials from my clients and employers"
};

fr.webcup = {
  "loading": "Webcup 2024...",
  "quote": " « Qu'est-ce qui rend Randy unique ? » ",
  "award_by": "Le prix a été remis par M. Sylvain, le directeur de l'entreprise IT",
  "more_info": "En savoir plus",
  "title": "WebCup 2024 !",
  "p1": "La webCup est une compétition de développement web qui se déroule chaque année à Madagascar. En 2024, j'ai eu l'honneur de participer à cet événement prestigieux et de me classer à la 2ème place.",
  "p2": "Durant cette compétition, j'ai pu mettre en pratique mes compétences en développement web, en travaillant sur des projets concrets et en collaborant avec d'autres développeurs talentueux. J'ai également eu l'occasion d'apprendre de nouvelles technologies et de relever des défis techniques stimulants.",
  "p3": "Cette expérience a été extrêmement enrichissante pour moi, tant sur le plan professionnel que personnel. Elle m'a permis de renforcer mes compétences en développement web, de développer mon esprit d'équipe et de découvrir de nouvelles perspectives dans le domaine du développement web.",
  "p4": "Je suis fier de cette réalisation et je suis motivé à continuer à progresser dans ma carrière de développeur web. La WebCup 2024 restera une étape importante dans mon parcours professionnel, et je suis reconnaissant pour l'opportunité qui m'a été offerte de participer à cet événement exceptionnel.",
  "meta_title": "WebCup2024 de Randy",
  "meta_desc": "Qu'est-ce qui rend Randy unique ?"
};

en.webcup = {
  "loading": "Webcup 2024...",
  "quote": " \"What makes Randy unique?\" ",
  "award_by": "The award was presented by Mr. Sylvain, the director of the IT company",
  "more_info": "Find out more",
  "title": "WebCup 2024 !",
  "p1": "The WebCup is a web development competition that takes place every year in Madagascar. In 2024, I had the honor of participating in this prestigious event and taking 2nd place.",
  "p2": "During this competition, I was able to put my web development skills into practice, working on concrete projects and collaborating with other talented developers. I also had the opportunity to learn new technologies and take on stimulating technical challenges.",
  "p3": "This experience was extremely enriching for me, both professionally and personally. It allowed me to strengthen my web development skills, develop my team spirit, and discover new perspectives in the field of web development.",
  "p4": "I am proud of this achievement and motivated to continue progressing in my career as a web developer. The WebCup 2024 will remain an important milestone in my professional journey, and I am grateful for the opportunity I was given to participate in this exceptional event.",
  "meta_title": "Randy's WebCup2024",
  "meta_desc": "What makes Randy unique?"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
