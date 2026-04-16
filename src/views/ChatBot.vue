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

interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

const { tm, locale } = useI18n()

watch(locale, () => {
    if (messages.value.length > 0 && messages.value[0].role === 'assistant') {
        messages.value[0].content = t('chat.welcome_message')
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

// ========== QUOTA MANAGEMENT VARIABLES ==========
const quotaExhausted = ref<boolean>(false)
const onTopicAttempts = ref<number>(0)
const apiCallCount = ref<number>(0)
const MAX_API_CALLS = 30 // Ajuste selon ton quota gratuit Gemini

// ========== OFF-TOPIC RESPONSES (3 variations) ==========
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

const suggestions = computed<string[]>(() => tm('chat.suggestions') as string[])

const GEMINI_API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY_1,
    import.meta.env.VITE_GEMINI_API_KEY_2,
    import.meta.env.VITE_GEMINI_API_KEY_3
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

// ========== FUNCTION TO CHECK IF QUESTION IS ON TOPIC ==========
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
        'node.js', 'typescript', 'tailwindcss', 'ionic', 'flutter', 'devops'
    ]
    
    const lowerQuestion = question.toLowerCase()
    return topicKeywords.some(keyword => lowerQuestion.includes(keyword))
}

// ========== RESET QUOTA FUNCTION ==========
const resetQuota = (): void => {
    quotaExhausted.value = false
    onTopicAttempts.value = 0
    apiCallCount.value = 0
    offTopicCounter = 0
    console.log('✅ Quota réinitialisé')
}

// ========== AUTO-RESET QUOTA EVERY 24 HOURS ==========
const initQuotaReset = (): void => {
    const lastReset = localStorage.getItem('last_quota_reset')
    const now = Date.now()
    if (!lastReset || now - parseInt(lastReset) > 24 * 60 * 60 * 1000) {
        resetQuota()
        localStorage.setItem('last_quota_reset', now.toString())
    }
    
    // Vérifier toutes les heures
    setInterval(() => {
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

EXPERIENCE: 5+ years of web development
LOCATION: Antananarivo, Madagascar
LANGUAGES: French (native), English (fluent), Malagasy (native)

=================================================================
🚨 **CRITICAL RULES FOR QUOTA MANAGEMENT** 🚨
=================================================================

1. **OFF-TOPIC QUESTIONS** (weather, news, sports, politics, health advice, jokes, etc.):
   → NEVER send the request to Google or any external API.
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

2. **ON-TOPIC QUESTIONS** (portfolio, skills, career, projects):
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
    'présente-toi|presentation|qui es-tu|who are you|introduce yourself': t('chat.local.introduce'),
    'projets|projects|what projects|réalisations|what are your projects': t('chat.local.projects'),
    'compétences|skills|technologies|what can you do|technical skills': t('chat.local.skills'),
    'parcours professionnel|mon parcours|expérience pro|career|parcours|career path|my career': t('chat.local.career'),
    'contact|comment te contacter|how to contact|contacter': t('chat.local.contact'),
    'localisation|location|madagascar': t('chat.local.location'),
    'langues|languages|speaks': t('chat.local.languages')
})

const findLocalResponse = (userQuestion: string): string | null => {
    const question = userQuestion.toLowerCase().trim()
    const kb = getLocalKnowledgeBase()

    const careerKeywords = ['parcours', 'professionnel', 'expérience', 'carrière', 'mon parcours', 'expérience pro', 'career', 'career path', 'my career']
    if (careerKeywords.some(keyword => question.includes(keyword))) {
        return kb['parcours professionnel|mon parcours|expérience pro|career|parcours|career path|my career']
    }

    for (const [keywords, response] of Object.entries(kb)) {
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
    initQuotaReset() // Initialiser la réinitialisation du quota

    window.addEventListener('beforeunload', handleBeforeUnload)
})

const handleBeforeUnload = (): void => {
    localStorage.removeItem('chat_history')
}

onUnmounted(() => {
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
        messages.value = [{
            role: 'assistant',
            content: t('chat.welcome_message'),
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

    // 🔍 Vérifier si la question est dans le sujet
    const onTopic = isOnTopic(currentQuestion)

    // 🚫 Hors-sujet → réponse directe sans API (3 variations)
    if (!onTopic) {
        const lang = locale.value === 'fr' ? 'fr' : 'en'
        const responseIndex = offTopicCounter % 3
        offTopicCounter++
        
        const assistantMessage: Message = {
            role: 'assistant',
            content: offTopicResponses[lang][responseIndex],
            timestamp: new Date()
        }
        messages.value.push(assistantMessage)
        saveHistory()
        await scrollToBottom()
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
            
            const assistantMessage: Message = {
                role: 'assistant',
                content: attemptMessage,
                timestamp: new Date()
            }
            messages.value.push(assistantMessage)
            saveHistory()
            await scrollToBottom()
            return
        } else {
            // Après 3 tentatives → message de quota épuisé
            const quotaMessage = locale.value === 'fr'
                ? "❌ Le nombre de requêtes vers les services externes est épuisé pour le moment. Je ne peux pas récupérer de nouvelles informations, mais je peux encore répondre avec les données locales de mon portfolio. Posez-moi une question précise sur mes compétences ou projets."
                : "❌ The number of requests to external services is exhausted for now. I can't retrieve new information, but I can still answer with local portfolio data. Ask me a specific question about my skills or projects."
            
            const assistantMessage: Message = {
                role: 'assistant',
                content: quotaMessage,
                timestamp: new Date()
            }
            messages.value.push(assistantMessage)
            saveHistory()
            await scrollToBottom()
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
        console.error('Erreur API:', error)
        const localResponse = findLocalResponse(currentQuestion)
        const errorMessage = localResponse ?? t('chat.error_local_fallback')
        
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
        content: t('chat.welcome_message'),
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