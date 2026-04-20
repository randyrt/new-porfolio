export const contactExamples = [
  {
    keywords: 'contact|email|mail|message|joindre|reach|écrire|write|comment te contacter|comment le contacter|comment vous contacter|how to contact|comment t\'écrire|comment lui écrire|comment lui parler|moyen de contact|contact info|adresse email|coordonnées|contact details|prise de contact|entrer en contact|me contacter|nous contacter|le contacter|la contacter|les contacter|contacter randy',
    response: "Randy n'a pas donné d'informations dessus, mais regarde la partie Contact ! Tu y trouveras tous les moyens de joindre Randy. 📧",
    category: 'contact',
    action: 'route',
    actionTarget: '/contact',
    confidence: 0.95
  },
  {
    keywords: 'tu sais|sais-tu|sais tu|do you know|connais-tu|connais tu comment contacter|how to reach|as-tu son contact|avez-vous son contact|auriez-vous son email|peux-tu me donner son contact|donne moi son email|quel est son contact|son adresse mail|son numéro|son whatsapp',
    response: "Randy ne m'a pas donné d'informations dessus, mais regarde la partie Contact ! Tu y trouveras tous les moyens de joindre Randy. 📧",
    category: 'contact',
    action: 'route',
    actionTarget: '/contact',
    confidence: 0.95
  },
  {
    keywords: 'collaboration|travailler|work together|freelance|mission|project|projet|partenariat|partnership|coopérer|cooperation|travailler ensemble|bosser ensemble|projet commun|collaborer|aide|besoin d\'aide|soutien|support|entraide|team up|join forces|collaborate',
    response: 'Randy est intéressé par les collaborations et les projets stimulants ! Que ce soit du freelance, du consulting, ou une mission à temps plein, il est ouvert à en discuter. N\'hésitez pas à le contacter pour échanger sur vos idées ! 💼',
    category: 'contact',
    confidence: 0.90
  },
  {
    keywords: 'linkedin|github|social|réseau|network|portfolio|site|linkedin de randy|github de randy|profil linkedin|profil github|réseaux sociaux|ses réseaux|twitter|instagram|facebook|mastodon|discord|slack|communauté|dev.to|stackoverflow|medium|blog|site web|son site|sa page|ses projets en ligne|ses contributions',
    response: 'Tu peux trouver Randy sur les réseaux professionnels. Son portfolio montre une bonne partie de son travail et de ses projets. Il est aussi actif sur GitHub où tu peux voir son code et ses contributions. N\'hésitez pas à le suivre ! 🌐',
    category: 'contact',
    confidence: 0.85
  },
  {
    keywords: 'whatsapp|appel|call|phone|téléphone|discuter|chat|whatsapp de randy|son whatsapp|appeler randy|téléphoner|sms|texto|message vocal|voice message|visio|visioconférence|zoom|skype|telegram|signal|messenger|fb messenger|imessage',
    response: 'WhatsApp est un super moyen pour contacter Randy rapidement. Il est généralement disponible pour des discussions directes. Ou tu peux utiliser le formulaire de contact pour une première approche plus formelle. À toi de choisir ! 📱',
    category: 'contact',
    confidence: 0.85
  },
  {
    keywords: 'réponse rapide|rapidement|urgent|asap|vite|urgence|besoin rapide|délai court|fast reply|quick response|réactivité|réactif|prompt|immédiat|sans attendre|au plus vite|dès que possible|urgence absolue|très urgent|besoin immédiat',
    response: 'Randy fait son possible pour répondre rapidement aux messages ! Généralement, il réagit dans les 24 heures. Si c\'est vraiment urgent, utilise WhatsApp pour une réponse plus immédiate. ⚡',
    category: 'contact',
    confidence: 0.80
  },
  {
    keywords: 'rdv|rencontre|meeting|rendez-vous|voir randy|rencontrer randy|entretien|discussion en personne|face à face|visio|appel visio|café|déjeuner|afterwork|event|événement|conférence|meetup|rencontrer|le voir en personne|entretien physique',
    response: 'Pour rencontrer Randy, il est préférable de le contacter d\'abord par email ou WhatsApp pour fixer un rendez-vous. Il est généralement disponible pour des discussions professionnelles ou informelles autour d\'un café ! ☕',
    category: 'contact',
    confidence: 0.75
  },
  {
    keywords: 'prestation|service|tarif|prix|coût|combien|budget|devis|facturation|payer|rémunération|tjm|taux journalier|forfait|consulting rate|freelance rate|hourly rate|prix prestation|coût mission|estimation',
    response: 'Pour toute question sur les tarifs et prestations, Randy vous invite à le contacter directement. Il pourra vous faire un devis personnalisé selon vos besoins et la nature du projet. 💰',
    category: 'contact',
    confidence: 0.85
  },
  {
    keywords: 'disponibilité|disponible|free|libre|occupé|busy|schedule|agenda|planning|quand|moment|créneau|date|dispo|est-ce qu\'il est disponible|peut-il me consacrer du temps|a-t-il du temps|charge de travail|workload|temps libre',
    response: "La disponibilité de Randy varie selon ses projets en cours. Le mieux est de le contacter directement pour discuter de vos besoins et trouver un créneau qui vous convient. Il est généralement très réactif ! 📅",
    category: 'contact',
    confidence: 0.80
  },
  {
    keywords: 'curriculum vitae|cv|resume|parcours|expérience|competences|skills|formation|diplôme|job|emploi|recrutement|embauche|poste|candidature|recruteur|offre d\'emploi|travail|carrière|évolution professionnelle',
    response: 'Le CV et le parcours de Randy sont disponibles sur son portfolio ! 📄',
    category: 'contact',
    action: 'route',
    actionTarget: '/home',
    confidence: 0.85
  },
  {
    keywords: 'recommandation|avis|témoignage|client|projet réalisé|référence|feedback|review|recommend|recommande|fiabilité|sérieux|professionnalisme|qualité|satisfait|content|bon retour|expérience client|ancien client',
    response: "Randy a travaillé sur de nombreux projets avec des clients satisfaits. Pour avoir des retours d'expérience, n'hésitez pas à le contacter directement, il pourra vous mettre en relation avec d'anciens clients si nécessaire. ⭐",
    category: 'contact',
    confidence: 0.75
  },
  {
    keywords: 'urgence technique|bug|problème|incident|panne|dysfonctionnement|emergency|critical|pépin|souci technique|besoin immédiat|dépannage|hotfix|correction rapide|support technique|assistance urgente',
    response: 'Pour une urgence technique, privilégiez WhatsApp ou l\'appel téléphonique. Randy essaiera de vous répondre dans les meilleurs délais pour résoudre votre problème. ⚠️',
    category: 'contact',
    confidence: 0.80
  },
  {
    keywords: 'devis gratuit|estimation gratuite|sans engagement|consultation gratuite|premier contact|découverte|prise de contact initiale|premier échange|appel découverte|café découverte',
    response: "Le premier contact avec Randy est sans engagement. N'hésitez pas à le contacter pour un premier échange afin de discuter de votre projet et voir comment il peut vous aider. C'est toujours gratuit ! 🎯",
    category: 'contact',
    confidence: 0.85
  },
  {
    keywords: 'horaires|quand contacter|meilleurs moments|heures|time zone|fuseau horaire|soir|weekend|jour férié|ferié|vacances|congés|absence|indisponible',
    response: 'Randy est généralement joignable en journée en semaine. Pour les urgences, vous pouvez toujours essayer de le contacter, il répondra dès que possible ! ⏰',
    category: 'contact',
    confidence: 0.75
  },
  {
    keywords: 'langue|english|anglais|français|french|bilingue|parle anglais|speak english|langue étrangère|communication|langage',
    response: 'Randy parle couramment français et anglais. N\'hésitez pas à le contacter dans la langue de votre choix, il se fera un plaisir de vous répondre ! 🌍',
    category: 'contact',
    confidence: 0.90
  }
]

export type ContactExample = typeof contactExamples[number]