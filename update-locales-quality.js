import fs from 'fs';
import path from 'path';

const frPath = path.resolve('src/locales/fr.json');
const enPath = path.resolve('src/locales/en.json');

const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

fr.quality = {
  "loading": "Mes qualités...",
  "quote": " « Randy en tant que dévellopeur web et mobile  » ",
  "description": "Au fil des projets que j'ai réalisés seul ou avec une équipe, j’ai compris que les compétences techniques ne suffisent pas. Ce qui différencie un développeur efficace, c’est son état d’esprit. Voici les principes qui guident mon travail au quotidien.",
  "q1_title": "Apprentissage continu",
  "q1_desc": "\"Je crois que l’apprentissage continu est essentiel pour rester en avance dans le monde en constante évolution des technologies. Je cherche toujours à enrichir mes compétences, et ma capacité à apprendre rapidement me permet de m’adapter aux nouveaux outils.\"",
  "q2_title": "Résolution de problèmes",
  "q2_desc": "\"J’aborde chaque défi avec l’objectif de trouver des solutions efficaces et créatives plutôt que de me laisser freiner par les obstacles. En ce qui me concene, chaque problème est une opportunité d’innover et d’améliorer, et j’aime relever les situations complexes avec une approche stratégique fiable et durable\"",
  "q3_title": "Sens du design responsive",
  "q3_desc": "\"J’ai fait de nombreux efforts, recherches et pratiques afin de garantir que chaque produit soit accessible sur tous les appareils, qu’il s’agisse d’un smartphone ou d’un ordinateur. Cette approche permet d’apporter des solutions adaptées et d’élargir efficacement la cible de nos projets.\"",
  "q4_title": "Minimalisme",
  "q4_desc": "\"Le minimalisme est une façon de concevoir qui vise à produire un design épuré, clair et agréable à utiliser. Cela permet de créer une expérience simple mais complète, qui économise du temps tout en garantissant un rendu de qualité.\"",
  "q5_title": "Persévérance et créativité",
  "q5_desc": "\"On m’a souvent dit que le talent seul ne suffit pas pour réussir. Pour moi, l’essentiel réside dans le soutien mutuel, la persistance, la volonté d’agir et les efforts fournis pour acquérir de l’expérience. Le développement web est une forme d’art et d'inspiration, où la créativité et la persévérance font toute la différence.\"",
  "q6_title": "Esprit d’équipe",
  "q6_desc": "\"Le facteur le plus important dans l’évolution d’une entreprise est l’esprit d’équipe et la qualité des relations entre collaborateurs. Il est essentiel de créer des liens solides, de collaborer dans une bonne ambiance et d’apporter un soutien réciproque.\"",
  "view_projects": "Voir mes projets",
  "meta_title": "Qualités de Randy",
  "meta_desc": " Randy en tant que dévellopeur web et mobile"
};

en.quality = {
  "loading": "My qualities...",
  "quote": " \"Randy as a web and mobile developer\" ",
  "description": "Through the projects I have done alone or with a team, I have understood that technical skills are not enough. What differentiates an effective developer is their mindset. Here are the principles that guide my daily work.",
  "q1_title": "Continuous learning",
  "q1_desc": "\"I believe continuous learning is essential to stay ahead in the ever-evolving world of technology. I always seek to enrich my skills, and my ability to learn quickly allows me to adapt to new tools.\"",
  "q2_title": "Problem-solving",
  "q2_desc": "\"I approach every challenge with the goal of finding effective and creative solutions rather than letting obstacles hold me back. As far as I am concerned, every problem is an opportunity to innovate and improve, and I enjoy tackling complex situations with a reliable and sustainable strategic approach.\"",
  "q3_title": "Responsive design sense",
  "q3_desc": "\"I have made significant efforts, research, and practice to ensure that every product is accessible on all devices, whether it is a smartphone or a computer. This approach allows us to provide tailored solutions and effectively broaden the target of our projects.\"",
  "q4_title": "Minimalism",
  "q4_desc": "\"Minimalism is a design approach that aims to produce a clean, clear, and pleasant-to-use design. This creates a simple yet complete experience that saves time while ensuring high-quality output.\"",
  "q5_title": "Perseverance and creativity",
  "q5_desc": "\"I am often told that talent alone is not enough to succeed. For me, the essential lies in mutual support, persistence, the will to act, and the efforts made to gain experience. Web development is a form of art and inspiration, where creativity and perseverance make all the difference.\"",
  "q6_title": "Team spirit",
  "q6_desc": "\"The most important factor in a company's evolution is team spirit and the quality of relationships between collaborators. It is essential to build strong bonds, collaborate in a good atmosphere, and provide mutual support.\"",
  "view_projects": "View my projects",
  "meta_title": "Randy's Qualities",
  "meta_desc": "Randy as a web and mobile developer"
};

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
