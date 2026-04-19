export const contactExamples = [
  {
    keywords: 'contact|email|mail|message|joindre|reach|écrire|write|comment te contacter|comment le contacter|comment vous contacter|how to contact|comment t\'écrire',
    response: 'Je n\'ai pas d\'informations dessus, mais regarde la partie Contact ! Tu y trouveras tous les moyens de joindre Randy. 📧',
    category: 'contact',
    action: 'route',
    actionTarget: '/contact',
    confidence: 0.95
  },
  {
    keywords: 'tu sais|sais-tu|sais tu|do you know|connais-tu|connais tu comment contacter|how to reach',
    response: 'Je n\'ai pas d\'informations dessus, mais regarde la partie Contact ! Tu y trouveras tous les moyens de joindre Randy. 📧',
    category: 'contact',
    action: 'route',
    actionTarget: '/contact',
    confidence: 0.95
  },
  {
    keywords: 'collaboration|travailler|work together|freelance|mission|project',
    response: 'il est intéressé par les collaborations et les projets stimulants ! Que ce soit du freelance, du consulting, ou une mission à temps plein, je suis ouvert à en discuter. N\'hésite pas à me contacter avec les détails de ton projet.',
    category: 'contact',
    confidence: 0.90
  },
  {
    keywords: 'linkedin|github|social|réseau|network|portfolio|site',
    response: 'Tu peux me trouver sur les réseaux professionnels. Mon portfolio montre une bonne partie de mon travail et de mes projets. il est aussi actif sur GitHub où tu peux voir mon code et mes contributions. N\'hésite pas à me suivre !',
    category: 'contact',
    confidence: 0.85
  },
  {
    keywords: 'whatsapp|appel|call|phone|téléphone|discuter|chat',
    response: 'WhatsApp est un super moyen pour me contacter rapidement. il est généralement disponible pour des discussions directes. Ou tu peux utiliser le formulaire de contact pour une première approche plus formelle. À toi de choisir !',
    category: 'contact',
    confidence: 0.85
  },
  {
    keywords: 'réponse rapide|rapidement|urgent|asap|vite',
    response: 'Je fais mon possible pour répondre rapidement aux messages ! Généralement, je réagis dans les 24 heures. Si c\'est vraiment urgent, utilise WhatsApp pour une réponse plus immédiate.',
    category: 'contact',
    confidence: 0.80
  }
]

export type ContactExample = typeof contactExamples[number]
