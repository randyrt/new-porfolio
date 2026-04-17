<template>
    <Loading v-if="loading" :message="$t('chat.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('chat.title')" aos="fade-down" />
        <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-2" data-aos="fade-up">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">
                <span class="text-violet-800 text-lg">«</span>
                {{ $t('chat.quote') }}
                <span class="text-violet-800 text-lg">»</span>
            </p>
        </div>
        <div class="chatbot-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">

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

                <div class="hidden md:flex flex-col items-end gap-1">
                    <button @click="clearConversation" class="btn-violet btn-effect-5">
                        <font-awesome-icon icon="fa-solid fa-trash-alt" class="" />
                        {{ $t('chat.clear_conversation') }}
                    </button>
                </div>
            </div>

            <div
                class="mb-6 p-4 bg-red-600 dark:bg-red-700 border border-red-500 rounded-xl flex items-start gap-4 shadow-lg animate-pulse-slow">
                <div class="p-2 bg-white/20 rounded-lg text-white">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="text-xl" />
                </div>
                <div>
                    <h4 class="text-sm font-bold !text-white mb-1">
                        {{ $t('chat.card_big_title') }} (Experimental)
                    </h4>
                    <p class="text-xs !text-white leading-relaxed opacity-95">
                        {{ $t('chat.disclaimer') }}
                    </p>
                </div>
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

                            <!-- 🔘 BOUTONS D'ACTION RAPIDES -->
                            <div v-if="message.actions && message.actions.length > 0"
                                class="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                                <button v-for="(action, aIndex) in message.actions" :key="aIndex"
                                    @click="handleAction(action)"
                                    class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 border border-violet-100 dark:border-violet-800 transition-all duration-200">
                                    <font-awesome-icon :icon="action.icon" />
                                    {{ action.label }}
                                </button>
                            </div>

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

                    <div class="suggestions flex flex-wrap gap-2 justify-center mt-4">
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
import { useHead } from '@vueuse/head'
import { ref, nextTick, onMounted, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'
import { useRouter } from 'vue-router'

const { t } = useI18n()

useHead({
    title: computed(() => t('chat.page_title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('chat.page_description'))
        }
    ]
})

interface Action {
    label: string
    type: 'route' | 'link' | 'download'
    target: string
    icon: string
}

interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    actions?: Action[]
}

const { tm, locale } = useI18n()

watch(locale, () => {
    if (messages.value.length > 0 && messages.value[0].role === 'assistant') {
        const welcomeContent = t('chat.welcome_message')
        messages.value[0] = {
            ...messages.value[0],
            content: welcomeContent,
            actions: detectActions(welcomeContent)
        }
        saveHistory()
    }
})

const loading = ref<boolean>(true)
const isTyping = ref<boolean>(false)
const userInput = ref<string>('')
const messagesContainer = ref<HTMLDivElement | null>(null)
const messages = ref<Message[]>([])
const lastRequestTime = ref<number>(0)
const REQUEST_COOLDOWN_MS = 3000

const router = useRouter()


const quotaExhausted = ref<boolean>(false)
const onTopicAttempts = ref<number>(0)
const isComponentMounted = ref<boolean>(false)
let quotaIntervalId: any = null
let navTimeoutId: any = null
const apiCallCount = ref<number>(0)
const MAX_API_CALLS = 100

const offTopicResponses = {
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

let offTopicCounter = 0

const defaultSuggestions = computed<string[]>(() => tm('chat.suggestions') as string[])
const suggestions = ref<string[]>([])

// Mettre à jour les suggestions quand la langue change
watch(locale, () => {
    suggestions.value = defaultSuggestions.value
})

const updateDynamicSuggestions = (text: string) => {
    const lowerText = text.toLowerCase()
    const dyn = tm('chat.dynamic_suggestions') as any

    if (!dyn) return

    if (lowerText.includes('projet') || lowerText.includes('project') || lowerText.includes('fid-connect') || lowerText.includes('qcp') || lowerText.includes('réalisations')) {
        suggestions.value = dyn.projects
    } else if (lowerText.includes('compétence') || lowerText.includes('skill') || lowerText.includes('techno') || lowerText.includes('stack')) {
        suggestions.value = dyn.skills
    } else if (lowerText.includes('parcours') || lowerText.includes('career') || lowerText.includes('expérience') || lowerText.includes('mg consulting') || lowerText.includes('freelance')) {
        suggestions.value = dyn.career
    } else if (lowerText.includes('contact') || lowerText.includes('joindre') || lowerText.includes('email')) {
        suggestions.value = dyn.contact
    } else if (lowerText.includes('retour au début') || lowerText.includes('back to start') || lowerText.includes('merci') || lowerText.includes('revoir')) {
        suggestions.value = defaultSuggestions.value
    }
}

const GEMINI_API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY_1,
    import.meta.env.VITE_GEMINI_API_KEY_2,
    import.meta.env.VITE_GEMINI_API_KEY_3,
].filter(key => key && key.startsWith('AIza')) as string[]

let currentKeyIndex = 0
let model: GenerativeModel | null = null

const initModelWithKey = (apiKey: string, keyIndex: number): GenerativeModel | null => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey)
        return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    } catch (error) {
        return null
    }
}

if (GEMINI_API_KEYS.length > 0) {
    model = initModelWithKey(GEMINI_API_KEYS[0], 0)
}

const isOnTopic = (question: string): boolean => {
    const topicKeywords = [
        'compétence', 'skill', 'projet', 'project', 'parcours', 'career',
        'expérience', 'experience', 'portfolio', 'randy', 'développeur',
        'developer', 'full stack', 'laravel', 'vue', 'react', 'node',
        'présente', 'introduce', 'qui es-tu', 'who are you', 'technologie',
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

    const lowerQuestion = question.toLowerCase().trim()

    return topicKeywords.some(keyword => {
        try {
            const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`\\b${escaped}\\b`, 'i')
            return regex.test(lowerQuestion)
        } catch (e) {
            return lowerQuestion.includes(keyword)
        }
    })
}

const isPersonalInfoRequest = (question: string): boolean => {
    const personalKeywords = [
        'âge', 'age', 'téléphone', 'phone', 'numéro', 'number', 'naissance', 'birth',
        'adresse', 'address', 'habite', 'live', 'salaire', 'salary', 'privé', 'private',
        'situation', 'marié', 'married', 'enfant', 'children'
    ]
    const lowerQuestion = question.toLowerCase().trim()

    return personalKeywords.some(keyword => {
        try {
            const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`\\b${escaped}\\b`, 'i')
            return regex.test(lowerQuestion)
        } catch (e) {
            return lowerQuestion.includes(keyword)
        }
    })
}

const personalInfoResponses = {
    fr: "Randy ne m'a pas donné d'informations à ce sujet 😊",
    en: "Randy didn't give me any information about that 😊"
}


const resetQuota = (): void => {
    quotaExhausted.value = false
    onTopicAttempts.value = 0
    apiCallCount.value = 0
    offTopicCounter = 0
    console.log('✅ Quota réinitialisé')
}


const initQuotaReset = (): void => {
    const lastReset = localStorage.getItem('last_quota_reset')
    const now = Date.now()
    if (!lastReset || now - parseInt(lastReset) > 24 * 60 * 60 * 1000) {
        resetQuota()
        localStorage.setItem('last_quota_reset', now.toString())
    }


    if (quotaIntervalId) clearInterval(quotaIntervalId)
    quotaIntervalId = setInterval(() => {
        const lastResetCheck = localStorage.getItem('last_quota_reset')
        const nowCheck = Date.now()
        if (!lastResetCheck || nowCheck - parseInt(lastResetCheck) > 24 * 60 * 60 * 1000) {
            resetQuota()
            localStorage.setItem('last_quota_reset', nowCheck.toString())
        }
    }, 60 * 60 * 1000)
}

const portfolioContext = computed<string>(() => {
    const langInstruction = locale.value === 'fr'
        ? 'LANGUE DE RÉPONSE : Réponds de préférence en français. Toutefois, si l\'utilisateur s\'exprime en anglais, réponds-lui en anglais. Adapte-toi systématiquement à la langue utilisée par l\'utilisateur (Français ou Anglais).'
        : 'RESPONSE LANGUAGE: Preferably respond in English. However, if the user speaks in French, respond in French. Always adapt to the language used by the user (French or English).'

    return `
${langInstruction}

You are an AI assistant for Randy Andriantsiory's portfolio. Here is the key information:

NAME: RAZAFIMANDIMBY Randy Andriantsiory
PROFESSION: Passionate Full Stack Developer specializing in modern and performant web and mobile applications.

PERSONAL PRESENTATION:
Randy is a Full Stack Developer passionate about creating modern web and mobile applications end-to-end: from UI design to server and database management. He loves exploring new technologies and tackling technical challenges.

TECHNICAL SKILLS:
- Frontend: Vue.js, Nuxt.js, TypeScript, TailwindCSS
- Backend: Laravel, Symfony, Node.js, Express.js, Python
- DevOps: Docker Engine, Docker Compose
- GitOps: GitHub, GitLab, CI/CD
- Mobile: IONIC (cross-platform), FLUTTER (learning)
- Databases: MySQL, PostgreSQL, MariaDB
- Other: UX/UI Design, Python automations

CAREER PATH:

🏢 **Senior Developer** - MG CONSULTING ACT & IT (April 2024 – Present)
- Laravel 11 & Vue.js 3 architecture
- Backend optimisation (SQL, Redis, Laravel Horizon) → +35% performance
- CI/CD with GitHub Actions, Docker
- Collaboration with teams in Morocco/Belgium
- Mentoring 3 junior developers
- Real-time WebSockets, Vue 3 Composition API, Laravel Octane

💼 **Fullstack Freelance Developer** - Independent (Jan 2023 – Mar 2024)
- Custom Laravel 10 & Vue.js 3 applications
- Hybrid mobile apps IONIC 6 + Capacitor
- Payment & third-party API integration
- Full project cycle management

💻 **Back-end Web Developer** - PixelZ (Feb 2022 – Nov 2022)
- Laravel 9, REST APIs, Eloquent ORM
- Relational database design
- Laravel Sanctum/JWT authentication

🎨 **Frontend Developer Intern** - Fihary Soft (May 2021 – Dec 2021)
- HTML5, CSS3, vanilla JavaScript
- Figma mockup integration

🏠 **Web Developer Intern** - IMMO Fianarantsoa (April 2020 – Sep 2020)
- Laravel 8 real estate platform
- Database modelling, Linux server deployment

PROJECTS:

🎯 **Fid-Connect** - Accounting & administrative management platform. Vue.js, Laravel, MariaDB, TailwindCSS, Docker.
📊 **QCP** - Credit & amortization management app. Vue.js, Symfony, MariaDB.
🏥 **echo-webLine** - Medical platform for cardiovascular imaging. Vue.js, Laravel, MySQL, TailwindCSS, Docker.
👩‍⚕️ **Nurse** - Healthcare professionals management app. Vue.js, Symfony, MySQL.
⚽ **AFR-Fan** - Football fan community app. Vue.js, Laravel, TailwindCSS.
📁 **Personal portfolio** - Current site with animations, AI assistant. Vue.js, TypeScript, TailwindCSS.

KEY ACHIEVEMENTS:
🏆 2nd place WebCup Madagascar 2024
📈 +35% application performance
👥 +10% user engagement
⏱️ -25% delivery time

LOCATION: Antananarivo, Madagascar
LANGUAGES: French (native), English (fluent), Malagasy (native)

SERVICES & OFFERING:
- **DevOps & Infrastructure**: Git management, team workflows, server deployment (Linux, SSH), CI/CD implementation.
- **Custom Development**: Tailored web/mobile solutions, long-term collaboration, maintenance and code reviews.
- **Strategic Consulting**: Functional documentation, technical popularization for clients, business strategy alignment.

CORE QUALITIES (THE "RANDY" MINDSET):
- **Continuous Learning**: Quick adaptation to new tech (Flutter, Golang, C++ currently).
- **Problem Solver**: Strategic and durable solutions to complex challenges.
- **Responsive & Design-focused**: Expertise in UX/UI, minimalist and clear designs.
- **Team Player**: Strong belief in collaboration and supportive work environments.
- **Perseverance**: Highly motivated to go beyond talent through hard work.

TESTIMONIALS:
- **Olivier Le Grand (Manager, FID-CONNECT)**: "Randy is dynamic, meticulous, and professional. A developer I love collaborating with."
- **Pascal (Director, MCP Belgium)**: "Impressive adaptability and a constant drive to evolve. A profile that will go far."

WEBCUP 2024:
- 2nd Place in Madagascar (Prestige competition). Awarded by Sylvain (Director of FullDigits). Demonstrated extreme speed and code quality under 24h pressure.

=================================================================
🚨 **CRITICAL RULES FOR QUOTA MANAGEMENT** 🚨
=================================================================

1. **OFF-TOPIC QUESTIONS** (weather, news, sports, politics, health advice, jokes, etc.):
   → NEVER send the request to Google or any external API for these subjects.
   → Reply with ONE of the following 3 messages (choose randomly or rotate):

   **Option A (Polite redirect):**
   "Désolé, je ne peux répondre qu'aux questions sur le portfolio, les compétences ou le parcours de Randy. Sur ordre de Randy et c'est sa consigne ! 😊"
   
   **Option B (Friendly with emoji):**
   "Je suis spécialisé dans le parcours de Randy uniquement. Pose-moi des questions sur ses projets ou ses compétences technique 🚀"
   
   **Option C (Short & direct):**
   "Hors sujet ! Je ne parle que du portfolio de Randy. Parle-moi de ses compétences ou de son expérience 👨‍💻"

   **English versions (if user speaks English):**
   - Option A: "Sorry, I can only answer questions about Randy's portfolio, skills, or career. That's his instruction! 😊"
   - Option B: "I'm specialized only in Randy's background. Ask me about his projects or technical skills 🚀"
   - Option C: "Off topic! I only talk about Randy's portfolio. Ask me about his skills or experience 👨‍💻"

2. **FORMALITIES, PRAISE & REACTIONS** (hello, thank you, bravo, super, cool, ok, etc.):
   → ALWAYS respond naturally, warmly and positively.
   → NEVER use the off-topic messages for these.
   → If the user praises you or Randy (e.g., "Bravo !", "Cool !"), thank them politely and ask if they have more questions.
   → Example: "Merci beaucoup ! 😊 C'est très gentil. Avez-vous d'autres questions sur le parcours de Randy ?"

3. **ON-TOPIC QUESTIONS** (portfolio, skills, career, projects):
   - Check if external API quota (Google/search) is exhausted.
   - If quota AVAILABLE → Answer normally using local portfolio data.
   - If quota EXHAUSTED → Allow up to 3 consecutive on-topic attempts before showing default message.

3. **QUOTA EXHAUSTED BEHAVIOR**:
   - 1st on-topic question → Try to answer with local data, if incomplete say: "Je n'ai pas assez d'infos localement. Je réessaie..." 
   - 2nd on-topic question → Same as above
   - 3rd on-topic question → Same as above
   - 4th on-topic question (after 3 attempts) → Show DEFAULT QUOTA MESSAGE.

4. **DEFAULT QUOTA MESSAGE** (exact wording):
   "Le nombre de requêtes vers les services externes est épuisé pour le moment. Je ne peux pas récupérer de nouvelles informations, mais je peux encore répondre avec les données locales de mon portfolio. Posez-moi une question précise sur mes compétences ou projets."

5. **LOCAL-ONLY MODE**:
   You already have ALL portfolio data above. Answer from this data whenever possible without external calls.

6. **ABSOLUTE PROHIBITIONS**:
   ❌ Never call external APIs for off-topic questions.
   ❌ Never waste quota on unrelated topics.
   ❌ Never show quota message before 3 on-topic attempts.

=================================================================
**RESPONSE STYLE**:
- Respond naturally, professionally but friendly tone
- Keep it concise (max 150 words per response)
- Use emojis to make responses lively 🚀
- Mention specific projects when asked about achievements
- When asked about career, provide full experience details
- Highlight ability to lead a project from A to Z
`
})

const getLocalKnowledgeBase = (): Record<string, string> => ({
    // PRIORITÉ 1 : SUJETS TRÈS SPÉCIFIQUES
    'fid-connect|fidconnect|fid connect': t('chat.local.project_fid'),
    'qcp|crédit|credit|amortissement': t('chat.local.project_qcp'),
    'echo-webline|echo webline|médical|cardio': t('chat.local.project_echo'),
    'afr-fan|afrfan|réseau social|social network': t('chat.local.project_afrfan'),
    'nurse|souper of nurses|restaurant|réservation': t('chat.local.project_nurse'),
    'webcup|compétition|award|prix|2ème': t('chat.local.award_webcup'),
    'laravel|php|backend|api|sanctum': t('chat.local.tech_laravel'),
    'vue|vuejs|nuxt|frontend|typescript|ts': t('chat.local.tech_vue'),
    'docker|container|conteneur|devops': t('chat.local.tech_docker'),
    'mobile|ionic|flutter|hybride': t('chat.local.tech_mobile'),

    // PRIORITÉ 2 : CATÉGORIES GÉNÉRALES
    'bonjour|hello|salut|hey|hi|coucou': t('chat.local.greeting'),
    'merci|thanks|thank you': t('chat.local.thanks'),
    'au revoir|goodbye|bye': t('chat.local.farewell'),
    'ça va|how are you|how is it going|comment ça va|comment vas|comment va|tu vas|allez-vous': t('chat.local.mood'),
    'présente-toi|presentation|qui es-tu|who are you|introduce yourself': t('chat.local.introduce'),
    'projets|projects|what projects|réalisations|what are your projects': t('chat.local.projects'),
    'compétences|skills|technologies|what can you do|technical skills': t('chat.local.skills'),
    'parcours professionnel|mon parcours|expérience pro|career|parcours|career path|my career': t('chat.local.career'),
    'contact|comment te contacter|how to contact|contacter': t('chat.local.contact'),
    'localisation|location|madagascar|emplacement|ville|pays|situé|localisé|city|country|lieu|habite|où vivez|où est': t('chat.local.location'),
    'services|offre|expertise|que proposes-tu|tarif|prix|devis': t('chat.local.services'),
    'témoignages|avis|recommandation|feedback|clients|testimonials': t('chat.local.testimonials'),
    'qualités|forces|atouts|points forts|pourquoi toi|why you|qualities': t('chat.local.qualities'),
    'langues|languages|speaks': t('chat.local.languages')
})

const findLocalResponse = (userQuestion: string): string | null => {
    const question = userQuestion.toLowerCase().trim()
    const kb = getLocalKnowledgeBase()

    // On cherche d'abord dans les clés spécifiques (les premières du dictionnaire)
    for (const [keywords, response] of Object.entries(kb)) {
        const keywordList = keywords.split('|')

        if (keywordList.some(keyword => {
            // On utilise une Regex avec Word Boundaries (\b) pour éviter les correspondances partielles
            // (ex: ne pas faire correspondre "hi" dans "him")
            try {
                // Échapper les caractères spéciaux
                const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i')
                return regex.test(question)
            } catch (e) {
                // Fallback au cas où le mot-clé contient des caractères invalides pour une regex
                return question.includes(keyword.toLowerCase())
            }
        })) {
            return response
        }
    }
    return null
}

onMounted(() => {
    isComponentMounted.value = true
    setTimeout(() => {
        if (isComponentMounted.value) loading.value = false
    }, 1000)

    suggestions.value = defaultSuggestions.value
    loadChatHistory()
    initQuotaReset()

    window.addEventListener('beforeunload', handleBeforeUnload)
})

const handleBeforeUnload = (): void => {
    localStorage.removeItem('chat_history')
}

onUnmounted(() => {
    isComponentMounted.value = false
    if (quotaIntervalId) clearInterval(quotaIntervalId)
    if (navTimeoutId) clearTimeout(navTimeoutId)
    window.removeEventListener('beforeunload', handleBeforeUnload)
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
        const welcomeContent = t('chat.welcome_message')
        messages.value = [{
            role: 'assistant',
            content: welcomeContent,
            timestamp: new Date(),
            actions: detectActions(welcomeContent)
        }]
    }
    scrollToBottom()
}

const saveHistory = (): void => {
    localStorage.setItem('chat_history', JSON.stringify(messages.value))
}

const detectActions = (text: string): Action[] => {
    const actions: Action[] = []
    const lowerText = text.toLowerCase()

    if (lowerText.includes('cv') || lowerText.includes('curriculum') || lowerText.includes('parcours')) {
        actions.push({
            label: t('nav.home'),
            type: 'route',
            target: '/',
            icon: 'fa-solid fa-home'
        })
        actions.push({
            label: t('nav.webcup'),
            type: 'route',
            target: '/webcup24',
            icon: 'fa-solid fa-trophy'
        })
        actions.push({
            label: t('home.download_cv'),
            type: 'download',
            target: '/images/cv/Randy_real_cv.pdf',
            icon: 'fa-solid fa-download'
        })
    }

    // 💬 Détection Contact / WhatsApp
    if (lowerText.includes('contact') || lowerText.includes('whatsapp') || lowerText.includes('joindre') || lowerText.includes('écrire') || lowerText.includes('message')) {
        actions.push({
            label: 'WhatsApp',
            type: 'link',
            target: 'https://wa.me/261333026839',
            icon: 'fa-brands fa-whatsapp'
        })
        actions.push({
            label: t('nav.contact'),
            type: 'route',
            target: '/contact',
            icon: 'fa-solid fa-envelope'
        })
    }

    // 🎯 Détection Projets Spécifiques
    const projectMap: Record<string, string> = {
        'fid-connect|fidconnect': 'fid-connect',
        'qcp': 'qcp',
        'echo-webline|echo webline': 'echo-webline',
        'afr-fan|afrfan': 'afr-fan',
        'nurse': 'nurses'
    }

    for (const [pattern, id] of Object.entries(projectMap)) {
        // Version sécurisée avec frontières de mots
        const regex = new RegExp(`\\b(?:${pattern})\\b`, 'i')
        if (regex.test(lowerText)) {
            actions.push({
                label: `${t('chat.actions.view')} ${id.replace('-', ' ').toUpperCase()}`,
                type: 'route',
                target: `/projects#${id}`,
                icon: 'fa-solid fa-arrow-right'
            })
        }
    }

    // 🐘 Détection Technos Spécifiques
    const techMap: Record<string, string> = {
        'laravel': 'laravel',
        'vue|nuxt': 'vue',
        'docker': 'docker',
        'mobile|ionic|flutter': 'mobile',
        'symfony': 'symfony',
        'python': 'python',
        'cicd|ci/cd': 'cicd'
    }

    for (const [pattern, id] of Object.entries(techMap)) {
        // Version sécurisée avec frontières de mots
        const regex = new RegExp(`\\b(?:${pattern})\\b`, 'i')
        if (regex.test(lowerText)) {
            actions.push({
                label: `${t('chat.actions.details')} ${id.toUpperCase()}`,
                type: 'route',
                target: `/skills#${id}`,
                icon: 'fa-solid fa-microchip'
            })
        }
    }

    // 🏆 WebCup
    if (lowerText.includes('webcup')) {
        actions.push({
            label: `${t('chat.actions.details')} WEBCUP`,
            type: 'route',
            target: '/webcup24',
            icon: 'fa-solid fa-trophy'
        })
    }

    // 🚀 Détection Projets (Général) - si pas déjà un projet spécifique
    if ((lowerText.includes('projet') || lowerText.includes('project')) && !actions.some(a => a.target.includes('/projects#'))) {
        actions.push({
            label: t('nav.projects'),
            type: 'route',
            target: '/projects',
            icon: 'fa-solid fa-layer-group'
        })
    }

    // ⚡ Détection Compétences (Général)
    if ((lowerText.includes('compétence') || lowerText.includes('skill') || lowerText.includes('techno')) && !actions.some(a => a.target.includes('/skills#'))) {
        actions.push({
            label: t('nav.skills'),
            type: 'route',
            target: '/skills',
            icon: 'fa-solid fa-code'
        })
    }

    // 📅 Détection Expérience / Parcours
    if (lowerText.includes('expérience') || lowerText.includes('career') || lowerText.includes('parcours')) {
        actions.push({
            label: t('nav.about'),
            type: 'route',
            target: '/about',
            icon: 'fa-solid fa-briefcase'
        })
    }

    return actions
}

const handleAction = (action: Action) => {
    if (action.type === 'route') {
        router.push(action.target)
    } else if (action.type === 'link' || action.type === 'download') {
        const link = document.createElement('a')
        link.href = action.target
        if (action.type === 'download') {
            link.download = action.target.split('/').pop() || 'download'
        } else {
            link.target = '_blank'
        }
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

const scrollToBottom = async (): Promise<void> => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

// ========== TYPEWRITER EFFECT FUNCTION ==========
const typeResponse = async (text: string): Promise<void> => {
    isTyping.value = false
    messages.value.push({
        role: 'assistant',
        content: '',
        timestamp: new Date()
    })

    const lastIndex = messages.value.length - 1
    const characters = text.split('')
    let displayedText = ''

    // Vitesse légèrement plus rapide pour une sensation plus fluide
    const speed = text.length > 200 ? 5 : 15

    for (let i = 0; i < characters.length; i++) {
        if (!isComponentMounted.value) return // Sécurité unmount

        displayedText += characters[i]
        // Mise à jour directe dans l'array pour garantir la réactivité
        messages.value[lastIndex].content = displayedText

        // Auto-scroll moins fréquent pour économiser les ressources
        if (i % 8 === 0 || i === characters.length - 1) {
            await nextTick()
            if (messagesContainer.value) {
                messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
            }
        }

        await new Promise(resolve => setTimeout(resolve, speed))
    }

    // Mise à jour des suggestions après la réponse
    updateDynamicSuggestions(text)

    // Détection des actions contextuelles
    const actions = detectActions(text)
    if (actions.length > 0) {
        messages.value[lastIndex] = {
            ...messages.value[lastIndex],
            actions: actions
        }
    }

    saveHistory()

    // 🚀 Navigation automatique si l'intention est forte (ex: "Je vous emmène vers...")
    const lowerText = text.toLowerCase()
    if (lowerText.includes('redirige') || lowerText.includes('direction') || lowerText.includes('emmène')) {
        const navAction = actions.find(a => a.type === 'route')
        if (navAction && isComponentMounted.value) {
            if (navTimeoutId) clearTimeout(navTimeoutId)
            navTimeoutId = setTimeout(() => {
                if (isComponentMounted.value) handleAction(navAction)
            }, 2000)
        }
    }
}

// ========== MODIFIED SEND MESSAGE FUNCTION ==========
const sendMessage = async (): Promise<void> => {
    if (!userInput.value.trim() || isTyping.value) return

    const now = Date.now()
    if (now - lastRequestTime.value < REQUEST_COOLDOWN_MS) {
        return
    }

    const userMessage: Message = {
        role: 'user',
        content: userInput.value,
        timestamp: new Date()
    }

    messages.value.push(userMessage)
    saveHistory()
    const currentQuestion = userInput.value
    userInput.value = ''
    await scrollToBottom()

    if (isPersonalInfoRequest(currentQuestion)) {
        const lang = locale.value === 'fr' ? 'fr' : 'en'
        await typeResponse(personalInfoResponses[lang])
        return
    }

    // 🔍 Vérifier si la question est dans le sujet
    let onTopic = isOnTopic(currentQuestion)

    const allPredefinedSuggestions = [
        ...(defaultSuggestions.value || []),
        ...Object.values(tm('chat.dynamic_suggestions') || {}).flat() as string[]
    ]

    if (!onTopic) {
        onTopic = allPredefinedSuggestions.some(s =>
            currentQuestion.toLowerCase().trim() === s.toLowerCase().trim() ||
            currentQuestion.toLowerCase().includes(s.toLowerCase().trim().replace(/[^\w\sàâäéèêëïîôöùûüç]/gi, '').trim())
        )
    }

    if (!onTopic) {
        const lang = locale.value === 'fr' ? 'fr' : 'en'
        const responseIndex = offTopicCounter % 3
        offTopicCounter++

        await typeResponse(offTopicResponses[lang][responseIndex])
        return
    }

    // ✅ Dans le sujet → vérifier le quota
    if (quotaExhausted.value) {
        onTopicAttempts.value++

        // 3 tentatives autorisées
        if (onTopicAttempts.value <= 3) {
            const localResponse = findLocalResponse(currentQuestion)
            const attemptMessage = localResponse
                ? localResponse
                : `⚠️ ${locale.value === 'fr' ? 'Je n\'ai pas assez d\'infos localement. Tentative ' + onTopicAttempts.value + '/3 avant limitation...' : 'I don\'t have enough local info. Attempt ' + onTopicAttempts.value + '/3 before limit...'}`

            await typeResponse(attemptMessage)
            return
        } else {
            // Après 3 tentatives → message de quota épuisé
            const quotaMessage = locale.value === 'fr'
                ? "❌ Le nombre de requêtes vers les services externes est épuisé pour le moment. Je ne peux pas récupérer de nouvelles informations, mais je peux encore répondre avec les données locales de mon portfolio. Posez-moi une question précise sur mes compétences ou projets."
                : "❌ The number of requests to external services is exhausted for now. I can't retrieve new information, but I can still answer with local portfolio data. Ask me a specific question about my skills or projects."

            await typeResponse(quotaMessage)
            return
        }
    }

    // ✅ Quota disponible → appeler l'API
    isTyping.value = true
    lastRequestTime.value = Date.now()

    const callGeminiAPI = async (apiKey: string, keyIndex: number): Promise<string> => {
        const tempGenAI = new GoogleGenerativeAI(apiKey)
        const tempModel = tempGenAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

        const conversationHistory: string = messages.value
            .slice(-5)
            .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
            .join('\n')

        const prompt = `${portfolioContext.value}\n\nConversation history:\n${conversationHistory}\n\nUser: ${currentQuestion}\nAssistant:`

        const result = await tempModel.generateContent(prompt)
        const response = await result.response
        return response.text()
    }

    try {
        let aiResponse = ''
        let lastError: any = null

        for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
            try {
                aiResponse = await callGeminiAPI(GEMINI_API_KEYS[i], i)
                apiCallCount.value++

                // Vérifier si on approche du quota
                if (apiCallCount.value >= MAX_API_CALLS) {
                    quotaExhausted.value = true
                    console.warn(`⚠️ Quota atteint (${apiCallCount.value}/${MAX_API_CALLS})`)
                }

                if (i !== currentKeyIndex) {
                    currentKeyIndex = i
                    model = initModelWithKey(GEMINI_API_KEYS[i], i)
                }
                break
            } catch (err) {
                lastError = err
                console.warn(`❌ API key ${i + 1} a échoué:`, err)
            }
        }

        if (aiResponse) {
            await typeResponse(aiResponse)
        } else {
            throw lastError || new Error('Toutes les clés API ont échoué')
        }

    } catch (error: any) {
        console.error('Erreur API:', error)
        const localResponse = findLocalResponse(currentQuestion)
        const errorMessage = localResponse ?? t('chat.error_local_fallback')

        await typeResponse(errorMessage)
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
        content: t('chat.welcome_message'),
        timestamp: new Date()
    }]
    suggestions.value = defaultSuggestions.value
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

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.95;
        transform: scale(0.995);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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