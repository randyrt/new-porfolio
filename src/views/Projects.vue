<template>
    <Loading v-if="loading" :message="$t('projects.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('projects.quote')" aos="fade-down" />
        <div class="swiper-header">
            <div class="swiper-progress" v-if="projects.length > 1">
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
                </div>
                <div class="swiper-counter">
                    <span class="current">{{ currentIndex + 1 }}</span>
                    <span class="separator">/</span>
                    <span class="total">{{ projects.length }}</span>
                </div>
            </div>
            <div class="custom-nav-buttons" v-if="projects.length > 1">
                <button class="custom-nav-btn custom-nav-prev" @click="slidePrev">
                    <span class="btn-glow"></span>
                    <font-awesome-icon icon="fa-solid fa-chevron-left" class="btn-icon" />
                    <span class="btn-label">Prev</span>
                </button>
                <button class="custom-nav-btn custom-nav-next" @click="slideNext">
                    <span class="btn-glow"></span>
                    <span class="btn-label">Next</span>
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
                            :description="project.description" @open-image="openImage" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="selectedImage"
                class="fixed  flex items-center justify-center z-50 inset-0 bg-black/50 backdrop-blur-sm"
                @click.self="closeImage">
                <div class="relative">
                    <button @click="closeImage"
                        class="absolute -top-2 left-1/2 -translate-x-1/2 btn-violet btn-effect-5 z-10">
                        {{ t('projects.close_image') }}
                    </button>
                    <img :src="selectedImage" alt="Image sélectionnée"
                        class="max-h-[80vh] max-w-[60vw] rounded-lg shadow-lg ring-2 ring-sky-100" />
                </div>
            </div>
        </transition>
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

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { t } = useI18n()
const route = useRoute()
const toast = useToast()

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

// Définition des projets
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
        ]
    }
])

function openImage(img: string) {
    selectedImage.value = img
}

function closeImage() {
    selectedImage.value = null
}

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper
    updateProgress()
    // Appliquer le hash en attente si présent (navigation depuis chatbot)
    if (pendingProjectId.value) {
        const id = pendingProjectId.value
        pendingProjectId.value = null
        setTimeout(() => scrollToProject(id), 100)
    }
}

const onSlideChange = () => {
    updateProgress()
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

// Navigation par hash
const scrollToProject = (projectId: string) => {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1 && swiperInstance.value) {
        swiperInstance.value.slideTo(index)
    }
}

// Mise à jour de la progression
const updateProgress = () => {
    if (swiperInstance.value && projects.value.length > 0) {
        const total = projects.value.length
        const current = swiperInstance.value.realIndex
        currentIndex.value = current
        progressPercent.value = ((current + 1) / total) * 100
    }
}

// Écouter les changements de route pour le hash
watch(
    () => route.hash,
    (newHash) => {
        if (newHash) {
            const projectId = newHash.substring(1)
            if (swiperInstance.value) {
                // Swiper déjà prêt : naviguer directement
                scrollToProject(projectId)
            } else {
                // Swiper pas encore prêt : stocker pour après initialisation
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
                // Si Swiper n'est pas encore prêt, stocker l'id
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
    gap: 1rem;
}


.swiper-progress {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.progress-bar {
    flex: 1;
    height: 4px;
    background: rgba(139, 92, 246, 0.2);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #BE5CF6, #710BC5);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.swiper-counter {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    flex-shrink: 0;
}

.swiper-counter .current {
    color: #8b5cf6;
    font-weight: 700;
}

.swiper-counter .separator {
    margin: 0 0.25rem;
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
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, transparent 70%);
    pointer-events: none;
    animation: glowPulse 1.8s ease-in-out infinite;
}
.custom-nav-btn:hover .btn-glow {
    animation: none;
    opacity: 0;
}

/* ── Keyframes ── */
@keyframes navBtnPulse {
    0%, 100% {
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
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
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