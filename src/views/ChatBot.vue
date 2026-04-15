<template>
    <Loading v-if="loading" :message="$t('chat.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('chat.title')" aos="fade-down" />
        <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-4" data-aos="fade-up">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">
                <span class="text-violet-800 text-lg">«</span>
                {{ $t('chat.quote') }}
                <span class="text-violet-800 text-lg">»</span>
            </p>
        </div>
        <div class="chatbot-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-16">

            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <font-awesome-icon icon="fa-solid fa-robot" class="text-white text-2xl" />
                    </div>
                    <div>
                        <h2
                            class="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                           {{ $t('chat.card_big_title') }}
                        </h2>
                        <p class="text-sm !text-gray-600 !dark:text-gray-500">
                            {{ $t('chat.card_small_title') }}
                        </p>
                    </div>
                </div>

                <button @click="clearConversation"
                    class="btn-violet btn-effect-5">
                    <font-awesome-icon icon="fa-solid fa-trash-alt"
                        class="" />
                    {{ $t('chat.clear_conversation') }}
                </button>
            </div>
            <div class="chat-main">
                <div class="messages-container h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    ref="messagesContainer">
                    <div v-if="messages.length === 0"
                        class="flex flex-col items-center justify-center h-full text-center">
                        <font-awesome-icon icon="fa-solid fa-comments" class="text-gray-400 text-5xl mb-4" />
                        <p class="text-gray-500 dark:text-gray-400">{{ $t('chat.start_conversation') }}</p>
                    </div>

                    <div v-for="(message, index) in messages" :key="index"
                        :class="message.role === 'user' ? 'flex justify-end mb-4' : 'flex justify-start mb-4'">

                        <div
                            :class="message.role === 'user'
                                ? 'user-message bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl rounded-tr-sm max-w-[80%] p-3 shadow-md'
                                : 'assistant-message bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl rounded-tl-sm max-w-[80%] p-3 shadow-md border border-gray-200 dark:border-gray-700'">

                            <div class="flex items-center gap-2 mb-1" v-if="message.role === 'assistant'">
                                <font-awesome-icon icon="fa-solid fa-robot" class="text-violet-500 text-xs" />
                                <span class="text-xs font-semibold text-violet-500">Assistant IA</span>
                            </div>
                            <div class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</div>
                            <div class="text-xs opacity-70 mt-2"
                                :class="message.role === 'user' ? 'text-white/70' : 'text-gray-400'">
                                {{ formatTime(message.timestamp) }}
                            </div>
                        </div>
                    </div>

                    <!-- Indicateur de frappe -->
                    <div v-if="isTyping" class="flex justify-start mb-4">
                        <div
                            class="assistant-message bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm p-4 shadow-md">
                            <div class="flex space-x-2">
                                <div class="typing-dot"></div>
                                <div class="typing-dot" style="animation-delay: 0.2s"></div>
                                <div class="typing-dot" style="animation-delay: 0.4s"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Zone de saisie -->
                <div class="input-area mt-4">
                    <div class="flex gap-3">
                        <input v-model="userInput" @keypress.enter="sendMessage" type="text"
                            :placeholder="$t('chat.placeholder')"
                            class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white transition" />
                        <button @click="sendMessage" :disabled="isTyping || !userInput.trim()"
                            class="send-button bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100">
                            <font-awesome-icon icon="fa-solid fa-paper-plane" class="mr-2" />
                            {{ $t('chat.send') }}
                        </button>
                    </div>

                    <!-- Suggestions -->
                    <div class="suggestions flex flex-wrap gap-2 mt-4">
                        <button v-for="suggestion in suggestions" :key="suggestion" @click="sendSuggestion(suggestion)"
                            class="suggestion-chip px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200">
                            <font-awesome-icon icon="fa-solid fa-bolt" class="text-xs mr-1" />
                            {{ suggestion }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'



interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}


const loading = ref<boolean>(true)
const isTyping = ref<boolean>(false)
const userInput = ref<string>('')
const messagesContainer = ref<HTMLDivElement | null>(null)
const messages = ref<Message[]>([])
const lastRequestTime = ref<number>(0)
const REQUEST_COOLDOWN_MS = 3000


const suggestions: string[] = [
    '🤖 Présente-toi',
    '💻 Quels sont tes projets ?',
    '⚡ Compétences techniques',
    '📈 Expérience professionnelle',
    '📧 Comment te contacter ?'
]


const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string
let model: GenerativeModel | null = null

if (GEMINI_API_KEY && GEMINI_API_KEY !== 'votre_api_key_ici') {
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
        model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        console.log('✅ Gemini initialisé avec succès')
    } catch (error) {
        console.error('❌ Erreur initialisation Gemini:', error)
    }
} else {
    console.warn('⚠️ Clé API Gemini non configurée')
}

const portfolioContext: string = `
Tu es un assistant IA pour le portfolio de Randy Andriantsiory. Voici les informations importantes :

NOM: Randy Andriantsiory
PROFESSION: Développeur Full Stack passionné par la création d'applications web et mobile modernes et performantes.

PRÉSENTATION PERSONNELLE:
Je suis Randy, un développeur Full Stack passionné par la création d'applications web et mobile, modernes et performantes. J'adore explorer les nouvelles technologies et relever des défis techniques. Cela signifie que je suis capable de mener un projet de A à Z, du design de l'interface utilisateur jusqu'à la gestion du serveur et de la base de données.

COMPÉTENCES TECHNIQUES:
- Frontend: Vue.js, TypeScript, TailwindCSS
- Backend: Node.js, Laravel, Symfony, Python
- DevOps: Docker Engine, Docker Compose
- Mobile: IONIC (applications cross-platform)
- Base de données: MySQL, PostgreSQL
- Autres: UX/UI Design, automatisations Python

PROJETS RÉALISÉS:

🎯 **Fid-Connect**
Plateforme de gestion comptable et administrative. Application complète permettant la gestion des finances, des factures et des documents administratifs. Technologies: Laravel, MySQL, TailwindCSS, Docker.

📊 **QCP (Gestion de Crédits)**
Application de gestion de crédits et amortissements. Outil professionnel pour le suivi des prêts, calculs d'amortissements et gestion des échéances. Technologies: Vue.js, Node.js, PostgreSQL.

🏥 **echo-webLine**
Plateforme médicale pour l'imagerie cardiovasculaire. Solution innovante pour la gestion et l'analyse d'images médicales. Technologies: Symfony, MySQL, TailwindCSS, Docker.

👩‍⚕️ **Nurse**
Application de gestion pour professionnels de santé. Outil de suivi des patients, planning et gestion administrative. Technologies: IONIC, Laravel, MySQL.

⚽ **AFR-Fan**
Application communautaire pour les fans de football. Plateforme de partage et d'actualités sportives. Technologies: Vue.js, Node.js, TailwindCSS.

📁 **Portfolio personnel**
Site actuel avec animations, thème personnalisable et assistant IA. Technologies: Vue.js, TypeScript, TailwindCSS.

✅ **Application de gestion de tâches**
Outil de productivité pour la gestion de projets et tâches. Technologies: Vue.js, Node.js.

📈 **Dashboard analytics**
Visualisation de données interactive avec graphiques dynamiques. Technologies: D3.js.

🛍️ **API E-commerce**
Backend robuste pour plateforme de vente en ligne. Technologies: Laravel, MySQL.

EXPÉRIENCE: 5 ans de développement web
LOCALISATION: Madagascar
LANGUES: Français (natif), Anglais (courant), Malgache (natif)

MESSAGE PERSONNALISÉ:
Dans mes projets, j'utilise régulièrement Vue.js et TypeScript pour construire des interfaces réactives, TailwindCSS pour des designs modernes en plus d'avoir une solide expérience en UX et UI design, et Laravel/Symfony pour le backend. Avec Docker Engine et Docker Compose pour containeriser et orchestrer mes applications. Côté mobile, je développe avec IONIC pour des applications cross-platform. J'ai également de l'expérience avec Python pour des scripts et automatisations.

RÈGLES DE RÉPONSE:
- Réponds de manière naturelle, professionnelle mais amicale
- Reste concis (max 150 mots par réponse)
- Utilise des émojis pour rendre les réponses plus vivantes 🚀
- Mentionne les projets spécifiques quand on te pose des questions sur les réalisations
- Si on te pose une question hors sujet, redirige poliment vers le portfolio
- Mets en avant la capacité à mener un projet de A à Z (du design UI à la gestion serveur/DB)
- Insiste sur la passion pour les nouvelles technologies et les défis techniques
`

const localKnowledgeBase: Record<string, string> = {
    'présente-toi|presentation|qui es-tu|who are you': '👋 Je suis l\'assistant IA du portfolio de Randy Andriantsiory, un développeur Full Stack passionné avec plus de 5 ans d\'expérience. Je suis ici pour répondre à vos questions sur ses compétences, projets et expériences. Comment puis-je vous aider ?',
    
    'projets|projects|what projects|réalisations': '💻 Randy a travaillé sur plusieurs projets professionnels et personnels:\n\n• **Fid-Connect** - Plateforme de gestion comptable et administrative (Laravel, MySQL)\n• **QCP** - Application de gestion de crédits et amortissements (Vue.js, Node.js)\n• **echo-webLine** - Plateforme médicale pour imagerie cardiovasculaire (Symfony)\n• **Nurse** - Application de gestion pour professionnels de santé (IONIC, Laravel)\n• **AFR-Fan** - Application communautaire pour fans de football (Vue.js, Node.js)\n• **Portfolio personnel** - Site actuel avec animations et thème personnalisable\n\nChaque projet a été mené de A à Z, du design UI à la gestion serveur ! 🚀',
    
    'fid-connect|fidconnect': '📊 **Fid-Connect** est une plateforme de gestion comptable et administrative. Développée avec Laravel, MySQL, TailwindCSS et Docker. Elle permet la gestion des finances, des factures et des documents administratifs de manière centralisée.',
    
    'qcp': '📈 **QCP** est une application de gestion de crédits et amortissements. Développée avec Vue.js, Node.js et PostgreSQL. Elle permet le suivi professionnel des prêts, les calculs d\'amortissements et la gestion des échéances.',
    
    'echo-webline|echowebline': '🏥 **echo-webLine** est une plateforme médicale pour l\'imagerie cardiovasculaire. Développée avec Symfony, MySQL, TailwindCSS et Docker. Une solution innovante pour la gestion et l\'analyse d\'images médicales.',
    
    'nurse': '👩‍⚕️ **Nurse** est une application de gestion pour professionnels de santé. Développée avec IONIC, Laravel et MySQL. Elle permet le suivi des patients, la planification et la gestion administrative.',
    
    'afr-fan|afrfan': '⚽ **AFR-Fan** est une application communautaire pour les fans de football. Développée avec Vue.js, Node.js et TailwindCSS. Une plateforme de partage et d\'actualités sportives.',
    
    'compétences|skills|technologies|what can you do': '⚡ **Compétences principales:**\n\n• Frontend: Vue.js, React, TypeScript, TailwindCSS\n• Backend: Node.js, Laravel, Symfony, Python\n• DevOps: Docker, Docker Compose\n• Mobile: IONIC\n• Base de données: MySQL, PostgreSQL\n• Design: UX/UI Design\n\nRandy possède **plus de 5 ans d\'expérience** en développement web fullstack, capable de mener un projet de A à Z ! 💪',
    
    'expérience|experience|how many years': '📈 Randy a **plus de 5 ans d\'expérience** en développement web. Il a travaillé sur des projets variés : plateformes de gestion administrative (Fid-Connect), applications médicales (echo-webLine), gestion de crédits (QCP), applications mobiles (Nurse) et communautaires (AFR-Fan). Son expertise lui permet de livrer des solutions robustes et performantes.',
    
    'contact|comment te contacter|how to contact': '📧 Vous pouvez contacter Randy via:\n\n• **WhatsApp** - disponible dans la section Contact\n• **Email** - via le formulaire de contact\n• **GitHub** et **LinkedIn** - liens disponibles sur le portfolio\n\nN\'hésitez pas à le contacter pour collaborer !',
    
    'localisation|location|où|madagascar|mada': '🌍 Randy est basé à **Madagascar**. Il est capable de travailler avec des équipes internationales et maîtrise le français, l\'anglais et le malgache.',
    
    'langues|languages|speaks': '🗣️ Randy parle:\n\n• **Français** (natif)\n• **Anglais** (courant)\n• **Malgache** (natif)\n\nCela lui permet de collaborer efficacement avec des équipes internationales.'
}

const findLocalResponse = (userQuestion: string): string | null => {
    const question = userQuestion.toLowerCase().trim()

    for (const [keywords, response] of Object.entries(localKnowledgeBase)) {
        const keywordList = keywords.split('|')
        if (keywordList.some(keyword => question.includes(keyword))) {
            return response
        }
    }

    return null
}

// Simuler le chargement
onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)

    loadChatHistory()
})

// Charger l'historique
const loadChatHistory = (): void => {
    const savedHistory = localStorage.getItem('chat_history')
    if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        // Convertir les timestamps string en Date
        messages.value = parsedHistory.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
        }))
    } else {
        messages.value = [{
            role: 'assistant',
            content: '👋 Bonjour ! Je suis l\'assistant IA de ce portfolio. Je peux vous parler des projets, des compétences ou de l\'expérience du développeur. Que souhaitez-vous savoir ?',
            timestamp: new Date()
        }]
    }
    scrollToBottom()
}

// Sauvegarder l'historique
const saveHistory = (): void => {
    localStorage.setItem('chat_history', JSON.stringify(messages.value))
}

// Formater l'heure
const formatTime = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

// Scroller vers le dernier message
const scrollToBottom = async (): Promise<void> => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

// Envoyer un message
const sendMessage = async (): Promise<void> => {
    if (!userInput.value.trim() || isTyping.value) return

    // Vérifier le cooldown
    const now = Date.now()
    if (now - lastRequestTime.value < REQUEST_COOLDOWN_MS) {
        const waitTime = Math.ceil((REQUEST_COOLDOWN_MS - (now - lastRequestTime.value)) / 1000)
        console.warn(`⏳ Veuillez attendre ${waitTime}s avant d'envoyer un autre message`)
        return
    }

    const userMessage: Message = {
        role: 'user',
        content: userInput.value,
        timestamp: new Date()
    }

    messages.value.push(userMessage)
    saveHistory()
    userInput.value = ''
    await scrollToBottom()

    isTyping.value = true
    lastRequestTime.value = Date.now()

    try {
        if (!model) {
            throw new Error('API Key non configurée')
        }

        const conversationHistory: string = messages.value
            .slice(-5)
            .map(m => `${m.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${m.content}`)
            .join('\n')

        const prompt = `${portfolioContext}\n\nHistorique de conversation:\n${conversationHistory}\n\nUtilisateur: ${userMessage.content}\nAssistant:`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const aiResponse = response.text()

        const assistantMessage: Message = {
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
        }

        messages.value.push(assistantMessage)
        saveHistory()
    } catch (error: any) {
        console.error('Erreur Gemini:', error)

        let errorMessage = '😔 Désolé, une erreur technique est survenue, parce que cet api IA est un plan gratuit. Veuillez réessayer dans quelques instants ou vérifier votre connexion.'

        const errorString = String(error?.message || error?.toString() || '')
        const isQuotaError = errorString.includes('429') ||
            errorString.includes('quota') ||
            errorString.includes('Too Many Requests') ||
            errorString.includes('exceeded')

        if (isQuotaError) {
            console.log('📚 Basculement vers la base de connaissances locale...')

            const localResponse = findLocalResponse(userMessage.content)

            if (localResponse) {
                errorMessage = localResponse
                console.log('✅ Réponse locale trouvée')
            } else {
                errorMessage = '⏳ Le service API a atteint sa limite gratuite.\n\nJ\'utilise maintenant mes connaissances locales pour répondre. Je peux vous parler de:\n- Ma présentation\n- Mes projets\n- Mes compétences\n- Mon expérience\n- Comment me contacter\n\nQue souhaitez-vous savoir ?'
            }
        }

        messages.value.push({
            role: 'assistant',
            content: errorMessage,
            timestamp: new Date()
        })
        saveHistory()
    } finally {
        isTyping.value = false
        await scrollToBottom()
    }
}


const sendSuggestion = (suggestion: string): void => {
    userInput.value = suggestion
    sendMessage()
}

const clearConversation = (): void => {
    messages.value = [{
        role: 'assistant',
        content: '👋 Bonjour ! Je suis l\'assistant IA de ce portfolio. Je peux vous parler des projets, des compétences ou de l\'expérience du développeur. Que souhaitez-vous savoir ?',
        timestamp: new Date()
    }]
    saveHistory()
    scrollToBottom()
}


</script>

<style scoped>
.chatbot-card {
    transition: all 0.3s ease;
}

.chatbot-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.messages-container {
    scroll-behavior: smooth;
}

/* Animation des messages */
.user-message,
.assistant-message {
    animation: slideInMessage 0.3s ease-out;
}

@keyframes slideInMessage {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animation des dots de frappe */
.typing-dot {
    width: 8px;
    height: 8px;
    background-color: #8b5cf6;
    border-radius: 50%;
    animation: typingBounce 1.4s infinite ease-in-out;
}

@keyframes typingBounce {

    0%,
    60%,
    100% {
        transform: translateY(0);
    }

    30% {
        transform: translateY(-10px);
    }
}

/* Scrollbar personnalisée */
.messages-container::-webkit-scrollbar {
    width: 6px;
}

.messages-container::-webkit-scrollbar-track {
    background: #e5e7eb;
    border-radius: 10px;
}

.messages-container::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 10px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
}

/* Mode sombre */
.dark .messages-container::-webkit-scrollbar-track {
    background: #374151;
}

/* Suggestion chips */
.suggestion-chip {
    transition: all 0.2s ease;
}

.suggestion-chip:hover {
    transform: translateY(-2px);
}

/* Bouton send */
.send-button {
    position: relative;
    overflow: hidden;
}

.send-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.send-button:active::before {
    width: 300px;
    height: 300px;
}

/* Loading state pour les messages */
.loading-message {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

/* Texte avec retour à la ligne */
.whitespace-pre-wrap {
    white-space: pre-wrap;
}
</style>