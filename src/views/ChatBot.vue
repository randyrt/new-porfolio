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

                <button @click="clearConversation" class="btn-violet btn-effect-5">
                    <font-awesome-icon icon="fa-solid fa-trash-alt" class="" />
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
                                <span class="text-xs font-semibold text-violet-500"> {{ $t('chat.card_big_title')
                                    }}</span>
                            </div>
                            <div class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</div>
                            <div class="text-xs opacity-70 mt-2"
                                :class="message.role === 'user' ? 'text-white/70' : 'text-gray-400'">
                            </div>
                        </div>
                    </div>

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
    '📈 Mon parcours professionnel',
    '📧 Comment te contacter ?'
]


const GEMINI_API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY_1,
    import.meta.env.VITE_GEMINI_API_KEY_2,
    import.meta.env.VITE_GEMINI_API_KEY_3
].filter(key => key && key !== 'votre_api_key_ici') as string[]

let currentKeyIndex = 0
let model: GenerativeModel | null = null

const initModelWithKey = (apiKey: string, keyIndex: number): GenerativeModel | null => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey)
        console.log(`✅ Gemini initialisé avec la clé ${keyIndex + 1}`)
        return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    } catch (error) {
        console.error(`❌ Erreur initialisation avec la clé ${keyIndex + 1}:`, error)
        return null
    }
}

const switchToNextApiKey = (): boolean => {
    currentKeyIndex++
    if (currentKeyIndex < GEMINI_API_KEYS.length) {
        console.log(`🔄 Basculement vers la clé API ${currentKeyIndex + 1}...`)
        model = initModelWithKey(GEMINI_API_KEYS[currentKeyIndex], currentKeyIndex)
        return model !== null
    }
    console.warn('⚠️ Plus aucune clé API disponible')
    return false
}

// Initialisation avec la première clé disponible
if (GEMINI_API_KEYS.length > 0) {
    model = initModelWithKey(GEMINI_API_KEYS[0], 0)
} else {
    console.warn('⚠️ Aucune clé API Gemini configurée')
}

// ==================== CONTEXTE DU PORTFOLIO ====================
const portfolioContext: string = `
Tu es un assistant IA pour le portfolio de Randy Andriantsiory. Voici les informations importantes :

NOM: RAZAFIMANDIMBY Randy Andriantsiory
PROFESSION: Développeur Full Stack passionné par la création d'applications web et mobile modernes et performantes.

PRÉSENTATION PERSONNELLE:
Je suis Randy, un développeur Full Stack passionné par la création d'applications web et mobile, modernes et performantes. J'adore explorer les nouvelles technologies et relever des défis techniques. Cela signifie que je suis capable de mener un projet de A à Z, du design de l'interface utilisateur jusqu'à la gestion du serveur et de la base de données.

COMPÉTENCES TECHNIQUES:
- Frontend: Vue.js, Nuxt.js, TypeScript, TailwindCSS
- Backend:  Laravel, Symfony, Node.js, Express.js, Python
- DevOps: Docker Engine, Docker Compose
- GitOps: GitHub, GitLab, CI/CD
- Mobile: IONIC (applications cross-platform), FLUTTER (En cours d'apprentissage)
- Base de données: MySQL, PostgreSQL, MariaDB
- Autres: UX/UI Design, automatisations Python

PROJETS RÉALISÉS:

🎯 **Fid-Connect**
Plateforme de gestion comptable et administrative. Application complète permettant la gestion des finances, des factures et des documents administratifs. Technologies: Vue.js, Laravel, MariaDB, TailwindCSS, Docker.

📊 **QCP (Gestion de Crédits)**
Application de gestion de crédits et amortissements. Outil professionnel pour le suivi des prêts, calculs d'amortissements et gestion des échéances. Technologies: Vue.js, Symfony, MariaDB.

🏥 **echo-webLine**
Plateforme médicale pour l'imagerie cardiovasculaire. Solution innovante pour la gestion et l'analyse d'images médicales. Technologies: Vue.js, Laravel, MySQL, TailwindCSS, Docker.

👩‍⚕️ **Nurse**
Application de gestion pour professionnels de santé. Outil de suivi des patients, planning et gestion administrative. Technologies: Vue.js, Symfony, MySQL.

⚽ **AFR-Fan**
Application communautaire pour les fans de football. Plateforme de partage et d'actualités sportives. Technologies: Vue.js, Laravel, TailwindCSS.

📁 **Portfolio personnel**
Site actuel avec animations, thème personnalisable et assistant IA. Technologies: Vue.js, TypeScript, TailwindCSS.

EXPÉRIENCE: 5 ans de développement web
LOCALISATION: Antananarivo, Madagascar
LANGUES: Français (natif), Anglais (courant), Malgache (natif)

RÈGLES DE RÉPONSE:
- Réponds de manière naturelle, professionnelle mais amicale
- Reste concis (max 150 mots par réponse)
- Utilise des émojis pour rendre les réponses plus vivantes 🚀
- Mentionne les projets spécifiques quand on te pose des questions sur les réalisations
- Si on te pose une question hors sujet, redirige poliment vers le portfolio
- Mets en avant la capacité à mener un projet de A à Z
`

const localKnowledgeBase: Record<string, string> = {
    'présente-toi|presentation|qui es-tu|who are you': '👋 Je suis l\'assistant IA du portfolio de Randy Andriantsiory, un développeur Full Stack passionné avec plus de 5 ans d\'expérience. Je suis ici pour répondre à vos questions sur ses compétences, projets et expériences. Comment puis-je vous aider ?',

    'projets|projects|what projects|réalisations': '💻 Randy a travaillé sur plusieurs projets professionnels et personnels:\n\n• **Fid-Connect** - Plateforme de gestion comptable et administrative\n• **QCP** - Application de gestion de crédits et amortissements\n• **echo-webLine** - Plateforme médicale pour imagerie cardiovasculaire\n• **Nurse** - Application de gestion pour professionnels de santé\n• **AFR-Fan** - Application communautaire pour fans de football\n• **Portfolio personnel** - Site actuel\n\nChaque projet a été mené de A à Z ! 🚀',

    'compétences|skills|technologies|what can you do': '⚡ **Compétences principales:**\n\n• Frontend: Vue.js, Nuxt.js, TypeScript, TailwindCSS\n• Backend: Laravel, Symfony, Node.js, Python\n• DevOps: Docker, Docker Compose, CI/CD\n• Mobile: IONIC\n• Base de données: MySQL, PostgreSQL, MariaDB\n\n**Plus de 5 ans d\'expérience !** 💪',

    'parcours professionnel|mon parcours|expérience pro|career|parcours': '📈 **Voici mon parcours professionnel détaillé :**\n\n' +
        '🏢 **Développeur Senior** - MG CONSULTING ACT & IT (Avril 2024 – Présent)\n' +
        '• Architecture Laravel 11 & Vue.js 3\n' +
        '• Optimisation backend → +35% performances\n' +
        '• CI/CD avec GitHub Actions, Docker\n' +
        '• Mentorat de 3 développeurs juniors\n\n' +
        '💼 **Développeur Fullstack Freelance** - Indépendant (Janv 2023 – Mars 2024)\n' +
        '• Applications sur mesure Laravel 10 & Vue.js 3\n' +
        '• Applications mobiles IONIC 6\n\n' +
        '💻 **Développeur Web Back-end** - PixelZ (Fév 2022 – Nov 2022)\n' +
        '• Laravel 9, APIs REST\n\n' +
        '🏆 **2ème place WebCup Madagascar 2024**\n\n' +
        '**Plus de 5 ans d\'expérience cumulée !** 🚀',

    'contact|comment te contacter|how to contact': '📧 Vous pouvez contacter Randy via:\n\n• **WhatsApp** - section Contact\n• **Email** - formulaire de contact\n• **GitHub** et **LinkedIn** - liens sur le portfolio',

    'localisation|location|madagascar': '🌍 Randy est basé à **Antananarivo, Madagascar**.',

    'langues|languages|speaks': '🗣️ Randy parle:\n\n• **Français** (natif)\n• **Anglais** (courant)\n• **Malgache** (natif)'
}

const findLocalResponse = (userQuestion: string): string | null => {
    const question = userQuestion.toLowerCase().trim()

    const parcoursKeywords = ['parcours', 'professionnel', 'expérience', 'carrière', 'mon parcours', 'expérience pro']
    if (parcoursKeywords.some(keyword => question.includes(keyword))) {
        return localKnowledgeBase['parcours professionnel|mon parcours|expérience pro|career|parcours']
    }

    for (const [keywords, response] of Object.entries(localKnowledgeBase)) {
        const keywordList = keywords.split('|')
        if (keywordList.some(keyword => question.includes(keyword))) {
            return response
        }
    }
    return null
}

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
    loadChatHistory()
    clearConversation()
})

const loadChatHistory = (): void => {
    const savedHistory = localStorage.getItem('chat_history')
    if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
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

const saveHistory = (): void => {
    localStorage.setItem('chat_history', JSON.stringify(messages.value))
}

const scrollToBottom = async (): Promise<void> => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

const sendMessage = async (): Promise<void> => {
    if (!userInput.value.trim() || isTyping.value) return

    const now = Date.now()
    if (now - lastRequestTime.value < REQUEST_COOLDOWN_MS) {
        const waitTime = Math.ceil((REQUEST_COOLDOWN_MS - (now - lastRequestTime.value)) / 1000)
        console.warn(`⏳ Veuillez attendre ${waitTime}s`)
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

    const callGeminiAPI = async (apiKey: string, keyIndex: number): Promise<string> => {
        const tempGenAI = new GoogleGenerativeAI(apiKey)
        const tempModel = tempGenAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

        const conversationHistory: string = messages.value
            .slice(-5)
            .map(m => `${m.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${m.content}`)
            .join('\n')

        const prompt = `${portfolioContext}\n\nHistorique de conversation:\n${conversationHistory}\n\nUtilisateur: ${userMessage.content}\nAssistant:`

        const result = await tempModel.generateContent(prompt)
        const response = await result.response
        return response.text()
    }

    try {
        let aiResponse = ''
        let lastError: any = null

        for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
            try {
                console.log(`🔄 Tentative avec la clé API ${i + 1}...`)
                aiResponse = await callGeminiAPI(GEMINI_API_KEYS[i], i)
                console.log(`✅ Succès avec la clé ${i + 1}`)
                if (i !== currentKeyIndex) {
                    currentKeyIndex = i
                    model = initModelWithKey(GEMINI_API_KEYS[i], i)
                }
                break
            } catch (err) {
                lastError = err
                console.warn(`❌ Échec avec la clé ${i + 1}:`, err)
            }
        }

        if (aiResponse) {
            const assistantMessage: Message = {
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            }
            messages.value.push(assistantMessage)
            saveHistory()
        } else {
            throw lastError || new Error('Toutes les clés API ont échoué')
        }

    } catch (error: any) {
        console.error('Erreur avec toutes les clés Gemini:', error)

        let errorMessage = '😔 Désolé, toutes les clés API ont atteint leurs limites gratuites.'

        const localResponse = findLocalResponse(userMessage.content)

        if (localResponse) {
            errorMessage = localResponse
            console.log('✅ Réponse locale trouvée')
        } else {
            errorMessage = '⏳ Toutes les API ont atteint leurs limites gratuites.\n\nJ\'utilise maintenant mes connaissances locales pour répondre. Je peux vous parler de:\n- Ma présentation\n- Mes projets\n- Mes compétences\n- Mon expérience\n- Comment me contacter\n\nQue souhaitez-vous savoir ?'
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

.dark .messages-container::-webkit-scrollbar-track {
    background: #374151;
}

.suggestion-chip {
    transition: all 0.2s ease;
}

.suggestion-chip:hover {
    transform: translateY(-2px);
}

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

.whitespace-pre-wrap {
    white-space: pre-wrap;
}
</style>