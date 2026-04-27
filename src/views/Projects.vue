<template>
    <Loading v-if="loading" :message="$t('projects.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('projects.quote')" aos="fade-down" />
        <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-4" data-aos="fade-up">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">
                <span class="text-violet-800 text-lg">«</span>
                {{ $t('projects.p_italics') }}
                <span class="text-violet-800 text-lg">»</span>
            </p>
        </div>
        <div class="swiper-header mb-8 px-4">
            <div class="swiper-progress-container flex-1" v-if="projects.length > 1">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'scroll']" class="text-violet-500 text-xs" />
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{{
                            $t('projects.mission_progress') || 'Mission Progress' }}</span>
                    </div>
                    <div
                        class="swiper-counter-pill bg-slate-900 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 shadow-xl">
                        <span class="text-violet-400 font-black text-xs font-mono">{{ currentIndex + 1 }}</span>
                        <span class="text-slate-600 text-[10px] font-bold">/</span>
                        <span class="text-slate-400 font-bold text-xs font-mono">{{ projects.length }}</span>
                    </div>
                </div>
                <div
                    class="progress-track bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                    <div class="progress-fill h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 rounded-full transition-all duration-500 ease-out relative"
                        :style="{ width: `${progressPercent}%` }">
                        <div class="absolute top-0 right-0 h-full w-8 bg-white/30 blur-sm animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div class="custom-nav-buttons ml-6" v-if="projects.length > 1">
                <button class="custom-nav-btn custom-nav-prev" @click="slidePrev" :aria-label="t('nav.prev')">
                    <span class="btn-glow"></span>
                    <font-awesome-icon icon="fa-solid fa-chevron-left" class="btn-icon" />
                    <span class="btn-text">{{ t('nav.prev') }}</span>
                </button>
                <button class="custom-nav-btn custom-nav-next" @click="slideNext" :aria-label="t('nav.next')">
                    <span class="btn-glow"></span>
                    <span class="btn-text">{{ t('nav.next') }}</span>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" class="btn-icon" />

                </button>
            </div>
        </div>

        <div class="projects-swiper-container">
            <Swiper :modules="[Pagination, Navigation]" :slides-per-view="1" :space-between="30"
                :loop="projects.length > 1" :pagination="{ clickable: true, dynamicBullets: true }" :navigation="{
                    prevEl: '.custom-nav-prev',
                    nextEl: '.custom-nav-next',
                }" :autoplay="false" class="projects-swiper" @swiper="onSwiper" @slide-change="onSlideChange">
                <SwiperSlide v-for="(project, index) in projects" :key="index">
                    <div class="project-slide" :id="project.id">
                        <ProjectGallery :id="project.id" :images="project.images" :title="project.title"
                            :description="project.description" :is-defeated="defeatedBosses.has(project.id)"
                            @open-image="openImage" @fight-boss="startBossFight(project)" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="selectedImage"
                class="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-[2px] no-invert-modal"
                :style="{ backgroundColor: 'color-mix(in srgb, var(--app-primary, #0f172a), transparent 90%)' }"
                @click.self="closeImage">
                <div class="relative max-w-[65vw] max-h-[90vh] group">
                    <button @click="closeImage"
                        class="absolute -top-4 left-1/2 -translate-x-1/2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-400 transition-all hover:scale-110 z-20 active:scale-95">
                        <font-awesome-icon :icon="['fas', 'times']" class="w-4 h-4" />
                    </button>

                    <div class="relative p-2 rounded-xl border border-white/50 shadow-2xl overflow-hidden">
                        <img :src="selectedImage" alt="Project Preview"
                            class="max-h-[80vh] w-auto rounded-xl object-contain" />

                        <!-- Ambient Glow -->
                        <div class="absolute inset-0 pointer-events-none">
                        </div>
                    </div>

                    <div class="mt-4 text-center">
                        <span
                            class="text-xs text-slate-400 font-mono bg-slate-900/50 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
                            {{ t('projects.click_to_zoom_hint') || 'ESC or Click outside to close' }}
                        </span>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Boss Quiz Modal -->
        <ProjectBossQuiz v-if="activeProjectForQuiz" :is-open="isQuizOpen" :project-id="activeProjectForQuiz.id"
            :project-title="activeProjectForQuiz.title" :questions="activeProjectForQuiz.quiz"
            @close="isQuizOpen = false" @defeated="onBossDefeated" />
    </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import ProjectGallery from '../components/ProjectGallery.vue'
import Loading from '../components/Loading.vue'
import AnimatedTitle from '../components/AnimatedTitle.vue'
import ProjectBossQuiz from '../components/ProjectBossQuiz.vue'
import { useGamification } from '../composables/useGamification'


import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { t, locale } = useI18n()
const route = useRoute()
const toast = useToast()


const { trackProjectView, defeatedBosses } = useGamification()

useHead({
    title: computed(() => t('projects.meta_title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('projects.meta_desc'))
        }
    ]
})

const loading = ref<boolean>(true)
const selectedImage = ref<string | null>(null)
const swiperInstance = ref<any>(null)
const currentIndex = ref(0)
const progressPercent = ref(0)
const pendingProjectId = ref<string | null>(null)


const trackedProjects = ref<Set<string>>(new Set())


const projects = ref([
    {
        id: 'fid-connect',
        title: 'FID-CONNECT',
        description: t('projects.fid_connect'),
        images: [
            '/images/projects/fid-connect/capture1.png',
            '/images/projects/fid-connect/capture2.png',
            '/images/projects/fid-connect/capture3.png',
            '/images/projects/fid-connect/capture_end.png',
            '/images/projects/fid-connect/capture12.png',
            '/images/projects/fid-connect/capture7.png',
            '/images/projects/fid-connect/capture13.png',
            '/images/projects/fid-connect/capture9.png',
            '/images/projects/fid-connect/capture10.png'
        ],
        quiz: [
            {
                question: locale.value === 'fr' ? "Quel framework JavaScript pilote l'interface réactive de Fid-Connect ?" : "Which JavaScript framework powers Fid-Connect's reactive interface?",
                options: ["React", "Vue.js", "Angular", "Svelte"],
                answer: 1
            },
            {
                question: locale.value === 'fr' ? "Quel langage backend assure la logique métier et la sécurité ?" : "Which backend language handles business logic and security?",
                options: ["Python", "Java", "PHP (Laravel)", "Node.js"],
                answer: 2
            },
            {
                question: locale.value === 'fr' ? "Fid-Connect est adapté à la réglementation de quel pays ?" : "Fid-Connect is adapted to the regulations of which country?",
                options: ["France", "Belgique", "Luxembourg", "Suisse"],
                answer: 1
            }
        ]
    },
    {
        id: 'qcp',
        title: 'QCP',
        description: t('projects.qcp'),
        images: [
            '/images/projects/QCP/capture1.png',
            '/images/projects/QCP/capture2.png',
            '/images/projects/QCP/capture3.png',
            '/images/projects/QCP/capture4.png',
            '/images/projects/QCP/capture5.png',
            '/images/projects/QCP/capture6.png',
            '/images/projects/QCP/capture7.png',
            '/images/projects/QCP/capture8.png',
            '/images/projects/QCP/capture9.png',
            '/images/projects/QCP/capture10.png',
            '/images/projects/QCP/capture11.png'
        ],
        quiz: [
            {
                question: locale.value === 'fr' ? "Quelle technologie backend propulse les calculs d'amortissement ?" : "Which backend technology powers the amortization calculations?",
                options: ["Symfony", "Laravel", "Django", "Express"],
                answer: 1
            },
            {
                question: locale.value === 'fr' ? "Quelle est la fonctionnalité principale de QCP ?" : "What is the main feature of QCP?",
                options: ["Gestion de stock", "Simulation de crédit", "E-commerce", "Réseau social"],
                answer: 1
            },
            {
                question: locale.value === 'fr' ? "Quel framework pilote le frontend de ce projet ?" : "Which framework powers the frontend of this project?",
                options: ["Vue.js", "React", "Nuxt.js", "jQuery"],
                answer: 0
            }
        ]
    },
    {
        id: 'nurses',
        title: 'NURSES',
        description: t('projects.nurses'),
        images: [
            '/images/projects/nurser-dinner/capture1.png',
            '/images/projects/nurser-dinner/capture2.png',
            '/images/projects/nurser-dinner/capture3.png',
            '/images/projects/nurser-dinner/capture5.png',
            '/images/projects/nurser-dinner/capture6.png',
            '/images/projects/nurser-dinner/capture7.png'
        ],
        quiz: [
            {
                question: locale.value === 'fr' ? "Quel framework backend a été choisi pour ce projet ?" : "Which backend framework was chosen for this project?",
                options: ["Laravel", "Symfony", "NestJS", "FastAPI"],
                answer: 1
            },
            {
                question: locale.value === 'fr' ? "Que gère le panneau d'administration ?" : "What does the admin panel manage?",
                options: ["La cuisine", "Les stocks", "Les inscriptions et places VIP", "Les livraisons"],
                answer: 2
            },
            {
                question: locale.value === 'fr' ? "Pour quel type d'établissement ce site a été conçu ?" : "For what type of establishment was this site designed?",
                options: ["Hôpital", "Restaurant", "École", "Banque"],
                answer: 1
            }
        ]
    },
    {
        id: 'echo-webline',
        title: 'ECHO WEBLINE',
        description: t('projects.echo_webline'),
        images: [
            '/images/projects/echo-webLine/echo-1.PNG',
            '/images/projects/echo-webLine/echo-3.PNG',
            '/images/projects/echo-webLine/echo-4.PNG',
            '/images/projects/echo-webLine/echo-6.PNG',
            '/images/projects/echo-webLine/echo-7.PNG',
            '/images/projects/echo-webLine/echo-8.PNG',
            '/images/projects/echo-webLine/echo-12.PNG'
        ],
        quiz: [
            {
                question: locale.value === 'fr' ? "Quel framework Vue SSR est utilisé ici ?" : "Which Vue SSR framework is used here?",
                options: ["Vue 2", "Nuxt.js", "Quasar", "Vite"],
                answer: 1
            },
            {
                question: locale.value === 'fr' ? "Quel est le domaine médical ciblé ?" : "What is the targeted medical field?",
                options: ["Dentisterie", "Ophtalmologie", "Imagerie Cardiovasculaire", "Pédiatrie"],
                answer: 2
            },
            {
                question: locale.value === 'fr' ? "Où est basé le client pour ce projet ?" : "Where is the client based for this project?",
                options: ["Bruxelles", "Paris", "Londres", "New York"],
                answer: 1
            }
        ]
    },
    {
        id: 'afr-fan',
        title: 'AFR FAN',
        description: t('projects.afr_fan'),
        images: [
            '/images/projects/afr/afr-1.PNG',
            '/images/projects/afr/afr-2.PNG',
            '/images/projects/afr/afr-3.PNG',
            '/images/projects/afr/afr-4.PNG'
        ],
        quiz: [
            {
                question: locale.value === 'fr' ? "Quels modes de paiement sont intégrés ?" : "Which payment methods are integrated?",
                options: ["Crypto", "VISA & PayPal", "Stripe seulement", "Chèque"],
                answer: 1
            },
            {
                question: locale.value === 'fr' ? "Quel est le type d'application ?" : "What is the type of application?",
                options: ["Blog", "E-commerce", "Réseau Social", "SaaS"],
                answer: 2
            },
            {
                question: locale.value === 'fr' ? "Quelle technologie backend est utilisée ?" : "Which backend technology is used?",
                options: ["Node.js", "Laravel", "Rails", "Go"],
                answer: 1
            }
        ]
    },
    {
        id: 'infi-swap',
        title: 'INFI-SWAP',
        description: t('projects.infi_swap'),
        images: [
            '/images/projects/swap/swap1.png',
            '/images/projects/swap/swap2.png',
            '/images/projects/swap/swap3.png',
            '/images/projects/swap/swap4.png',
            '/images/projects/swap/swap5.png',
            '/images/projects/swap/swap6.png',
        ],
        quiz: [
            {
                question: locale.value === 'fr' ? "Quel est le public cible de InfiSwap ?" : "Who is the target audience for InfiSwap?",
                options: ["Pharmaciens", "Médecins", "Infirmiers & Établissements", "Patients"],
                answer: 2
            },
            {
                question: locale.value === 'fr' ? "Le processus de mise en relation est-il manuel ?" : "Is the matching process manual?",
                options: ["Oui", "Non, 100% automatisé", "Partiellement", "Par téléphone"],
                answer: 1
            },
            {
                question: locale.value === 'fr' ? "Que réduit InfiSwap pour les établissements ?" : "What does InfiSwap reduce for institutions?",
                options: ["Le prix des soins", "Les coûts de recrutement", "Le nombre de lits", "Le temps de pause"],
                answer: 1
            }
        ]
    }
])

const isQuizOpen = ref(false)
const activeProjectForQuiz = ref<any>(null)

function startBossFight(project: any) {
    activeProjectForQuiz.value = project
    isQuizOpen.value = true
}

function onBossDefeated(projectId: string) {
    isQuizOpen.value = false
}

function openImage(img: string) {
    selectedImage.value = img
}

function closeImage() {
    selectedImage.value = null
}

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper
    updateProgress()


    const initialProject = projects.value[swiper.realIndex]
    if (initialProject && !trackedProjects.value.has(initialProject.id)) {
        trackProjectView(initialProject.id)
        trackedProjects.value.add(initialProject.id)
    }

    if (pendingProjectId.value) {
        const id = pendingProjectId.value
        pendingProjectId.value = null
        setTimeout(() => scrollToProject(id), 100)
    }
}

const onSlideChange = () => {
    updateProgress()

    if (swiperInstance.value) {
        const currentProject = projects.value[swiperInstance.value.realIndex]
        if (currentProject && !trackedProjects.value.has(currentProject.id)) {
            trackProjectView(currentProject.id)
            trackedProjects.value.add(currentProject.id)
        }
    }
}

const slidePrev = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slidePrev()
    }
}

const slideNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slideNext()
    }
}


const scrollToProject = (projectId: string) => {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1 && swiperInstance.value) {
        swiperInstance.value.slideTo(index)


        const project = projects.value[index]
        if (project && !trackedProjects.value.has(project.id)) {
            trackProjectView(project.id)
            trackedProjects.value.add(project.id)
        }
    }
}


const updateProgress = () => {
    if (swiperInstance.value && projects.value.length > 0) {
        const total = projects.value.length
        const current = swiperInstance.value.realIndex
        currentIndex.value = current
        progressPercent.value = ((current + 1) / total) * 100
    }
}


watch(
    () => route.hash,
    (newHash) => {
        if (newHash) {
            const projectId = newHash.substring(1)
            if (swiperInstance.value) {

                scrollToProject(projectId)
            } else {
                pendingProjectId.value = projectId
            }
        }
    },
    { immediate: true }
)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
        toast.info(t('projects.toast_click'))

        if (route.hash) {
            const projectId = route.hash.substring(1)
            if (swiperInstance.value) {
                scrollToProject(projectId)
            } else {
                pendingProjectId.value = projectId
            }
        }
    }, 500)
})
</script>

<style scoped>
.swiper-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.progress-fill {
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

.swiper-counter-pill {
    backdrop-filter: blur(8px);
}


.custom-nav-buttons {
    display: flex;
    gap: 0.75rem;
    flex-shrink: 0;
}

/* ── Base button ── */
.custom-nav-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #7c3aed 0%, #059669 100%);
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.3s ease, filter 0.3s ease;
    box-shadow:
        0 0 10px rgba(139, 92, 246, 0.55),
        0 4px 14px rgba(0, 0, 0, 0.25);
    /* pulse animation active par défaut */
    animation: navBtnPulse 1.8s ease-in-out infinite;
}

/* ── Arrêter le clignotement au hover ── */
.custom-nav-btn:hover {
    animation: none;
    transform: scale(1.07);
    box-shadow:
        0 0 24px rgba(5, 150, 105, 0.7),
        0 0 48px rgba(139, 92, 246, 0.35),
        0 6px 20px rgba(0, 0, 0, 0.3);
    filter: brightness(1.15);
}

.custom-nav-btn:active {
    transform: scale(0.95);
    filter: brightness(0.95);
}

/* ── Icône ── */
.btn-icon {
    font-size: 0.75rem;
    transition: transform 0.2s ease;
}

.custom-nav-btn:hover .btn-icon {
    transform: translateX(2px);
}

.custom-nav-prev:hover .btn-icon {
    transform: translateX(-2px);
}

/* ── Label ── */
.btn-label {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    opacity: 0.92;
}

/* ── Glow overlay (clignotement de l'aura) ── */
.btn-glow {
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, transparent 70%);
    pointer-events: none;
    animation: glowPulse 1.8s ease-in-out infinite;
}

.custom-nav-btn:hover .btn-glow {
    animation: none;
    opacity: 0;
}

/* ── Keyframes ── */
@keyframes navBtnPulse {

    0%,
    100% {
        box-shadow:
            0 0 8px rgba(139, 92, 246, 0.5),
            0 4px 12px rgba(0, 0, 0, 0.2);
        filter: brightness(1);
    }

    50% {
        box-shadow:
            0 0 22px rgba(139, 92, 246, 0.95),
            0 0 40px rgba(5, 150, 105, 0.6),
            0 4px 16px rgba(0, 0, 0, 0.3);
        filter: brightness(1.18);
    }
}

@keyframes glowPulse {

    0%,
    100% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
}

.projects-swiper-container {
    position: relative;
    width: 100%;
    padding: 0 0 2rem;
}

.projects-swiper {
    width: 100%;
    padding: 0.5rem 0 2rem !important;
}

.project-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Cacher les boutons Swiper par défaut */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    display: none !important;
}

/* Styles Swiper personnalisés */
:deep(.swiper-pagination-bullet) {
    background: #c4b5fd;
    opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
    background: #8b5cf6;
    opacity: 1;
}

:deep(.swiper-pagination) {
    bottom: 0 !important;
    position: relative;
    margin-top: 0.5rem;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(6px);
}

/* Responsive */
@media screen and (max-width: 768px) {
    .swiper-header {
        padding: 0 1rem;
    }

    .projects-swiper {
        padding: 0 0 2rem !important;
    }

    .custom-nav-btn {
        padding: 0.45rem 0.75rem;
        font-size: 0.7rem;
    }

    .btn-label {
        display: none;
    }

    .btn-icon {
        font-size: 0.9rem;
    }
}
</style>