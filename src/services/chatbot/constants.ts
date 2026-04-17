export const TOPIC_KEYWORDS = [
    'compétence', 'skill', 'projet', 'project', 'parcours', 'career',
    'expérience', 'experience', 'portfolio', 'randy', 'développeur',
    'developer', 'full stack', 'laravel', 'vue', 'react', 'node',
    'présente', 'introduce', 'qui es-tu', 'who are you', 'vrai ia', 'real ai', 'intelligence artificielle', 'technologie',
    'tech', 'backend', 'frontend', 'base de donnée', 'database',
    'formation', 'education', 'diplôme', 'degree', 'travail', 'work',
    'job', 'mission', 'client', 'freelance', 'mg consulting', 'pixelz',
    'compétences', 'skills', 'projets', 'projects', 'parcours professionnel',
    'expérience pro', 'career path', 'technique', 'technical', 'code',
    'programming', 'programmation', 'api', 'docker', 'git', 'github',
    'ci/cd', 'mysql', 'postgresql', 'mongodb', 'symfony', 'express.js',
    'node.js', 'typescript', 'tailwindcss', 'ionic', 'flutter', 'devops',
    'fid-connect', 'qcp', 'echo-webline', 'afr-fan', 'nurses', 'webcup',
    'stack', 'mobile', 'whatsapp', 'linkedin', 'email', 'début', 'recommencer',
    'histoire', 'background', 'techno', 'quitter', 'menu', 'cv',

    // 🎯 Emplacement / Location
    'localisation', 'location', 'emplacement', 'ville', 'pays', 'situé', 'localisé',
    'city', 'country', 'madagascar', 'antananarivo', 'lieu',

    // 🎯 Services, Témoignages & Qualités
    'service', 'offres', 'témoignage', 'avis', 'qualité', 'force', 'atout', 'client',
    'testimonial', 'recommandation', 'recommandé', 'expert', 'conseil', 'accompagnement',

    // 🎯 Recrutement / Hiring
    'recruteur', 'recruter', 'hiring', 'honnêtement', 'honnête', 'honestly', 'honest',
    'interview', 'hire', 'engager', 'embaucher', 'recommander', 'recommend', 'recruiter',

    // 🎯 Réactions & Politesse (Autorisés pour éviter le blocage)
    'merci', 'thanks', 'thank you', 'thx', 'bravo', 'félicitations', 'congrats', 'félicitation',
    'super', 'cool', 'génial', 'top', 'wow', 'magnifique', 'parfait', 'perfect', 'nice', 'awesome',
    'incroyable', 'bien', 'good', 'excellent', 'intéressant', 'interesting', 'extraordinaire',
    'ok', 'd\'accord', 'entendu', 'compris', 'd\'acc', 'okey', 'vrai', 'true', 'vraiment', 'really',
    'oui', 'non', 'yes', 'no', 'ouais', 'yah', 'bien sûr', 'of course', 'sure', 'certainement',
    'de rien', 'prière', 'svp', 'please', 's\'il vous plaît', 's\'il te plaît', 'tkt', 'pas de souci',
    'pas de soucis', 'bonne continuation', 'bon courage', 'bonne chance',
    'bonjour', 'hello', 'salut', 'hey', 'coucou', 'hi', 'bonsoir', 'salutations',
    'ça va', 'how are you', 'how is it going', 'ça roule', 'vas-tu', 'allez-vous', 'tu vas', 'vous allez',
    'comment va', 'comment vas', 'cv', 'bien ou quoi', 'ah', 'oh', 'hum', 'intéressant', 'tell me more',
    'dis-moi en plus', 'continue', 'reprends', 'vas-y', 'go on', 'je vois', 'i see',

    // 🎯 Langues & Discussion
    'anglais', 'english', 'français', 'french', 'langue', 'language', 'parler', 'speak',
    'traduis', 'translate', 'discuter', 'discuss', 'conversation', 'chat', 'parle', 'parlez'
]

export const PERSONAL_KEYWORDS = [
    'âge', 'age', 'téléphone', 'phone', 'numéro', 'number', 'naissance', 'birth',
    'adresse', 'address', 'habite', 'live', 'salaire', 'salary', 'privé', 'private',
    'situation', 'marié', 'married', 'enfant', 'children'
]

export const REQUEST_COOLDOWN_MS = 3000
export const MAX_API_CALLS = 100

export const OFF_TOPIC_RESPONSES = {
    fr: [
        "Désolé, je ne peux répondre qu'aux questions sur le portfolio, les compétences ou le parcours de Randy. Sur ordre de Randy et c'est sa consigne ! 😊",
        "Je suis spécialisé dans le parcours de Randy uniquement. Pose-moi des questions sur ses projets ou ses compétences techniques 🚀",
        "Hors sujet ! Je ne parle que du portfolio de Randy. Parle-moi de ses compétences ou de son expérience 👨‍💻"
    ],
    en: [
        "Sorry, I can only answer questions about Randy's portfolio, skills, or career. That's his instruction! 😊",
        "I'm specialized only in Randy's background. Ask me about his projects or technical skills 🚀",
        "Off topic! I only talk about Randy's portfolio. Ask me about his skills or experience 👨‍💻"
    ]
}

export const PERSONAL_INFO_RESPONSES = {
    fr: "Randy ne m'a pas donné d'informations à ce sujet 😊",
    en: "Randy didn't give me any information about that 😊"
}
