<template>
    <Loading v-if="loading" message="Mes récents projets..." />
    <div v-else>
        <AnimatedTitle text="« Voici quelques captures de mes plus grands et récents projets »" aos="fade-down" />
        <ProjectGallery :images="images1" title="FID-CONNECT"
            description="Fid-Connect est une plateforme tout-en-un qui centralise la gestion comptable, fiscale et administrative des entreprises. Elle va au-delà du simple suivi des tâches en intégrant la gestion des réformes fiscales, le suivi des parts, la génération de lettres d’engagement, l’automatisation de processus clés, ammortissement, TVA ,gestion de rendez-vous, payment en ligne, ect. Développée avec Vue.js et Laravel, elle est adaptée aux exigences de la réglementation belge et permet d’optimiser la productivité tout en sécurisant les opérations."
            @open-image="openImage" />
        <ProjectGallery :images="images2" title="QCP"
            description="QCP est une application sur mesure développée pour un client belge, axée sur la gestion du crédit, le suivi de l’amortissement et la planification financière. Propulsée par Vue.js et Laravel, elle offre une interface intelligente et intuitive qui simplifie les opérations financières complexes, automatise les calculs et permet une génération fluide de documents"
            @open-image="openImage" />
        <ProjectGallery :images="images3" title="NURSES"
            description="Souper of Nurses est un restaurant belge qui accueille de grands événements sur de longues périodes. Ce site web permet aux utilisateurs de faire des réservations de groupe en ligne, de contacter directement le restaurant, et comprend un panneau d’administration pour gérer les inscriptions, les événements et les places VIP."
            @open-image="openImage" />
        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="selectedImage" class="fixed inset-0 flex items-center justify-center z-50 card modal-backdrop"
                @click.self="closeImage">
                <div class="relative">
                    <button @click="closeImage"
                        class="absolute -top-1 left-1 bg-violet-400 text-white p-1 rounded cursor-pointer">
                        ✕
                    </button>
                    <img :src="selectedImage" alt="Image sélectionnée"
                        class="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'


const loading = ref<boolean>(true);

const images1: string[] = [
    '/images/projects/fid-connect/capture1.png',
    '/images/projects/fid-connect/capture2.png',
    '/images/projects/fid-connect/capture3.png',
    '/images/projects/fid-connect/capture_end.png',
    '/images/projects/fid-connect/capture12.png',
    '/images/projects/fid-connect/capture7.png',
    '/images/projects/fid-connect/capture13.png',
    '/images/projects/fid-connect/capture9.png',
    '/images/projects/fid-connect/capture10.png'
];

const images2: string[] = [
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
];

const images3: string[] = [
    '/images/projects/nurser-dinner/capture1.png',
    '/images/projects/nurser-dinner/capture2.png',
    '/images/projects/nurser-dinner/capture3.png',
    '/images/projects/nurser-dinner/capture4.png',
    '/images/projects/nurser-dinner/capture5.png',
    '/images/projects/nurser-dinner/capture6.png',
    '/images/projects/nurser-dinner/capture7.png',
];

const selectedImage = ref<string | null>(null)
const toast = useToast()

function openImage(img: string) {
    selectedImage.value = img;
}

function closeImage() {
    selectedImage.value = null
}

onMounted(() => {
    setTimeout(() => {
        loading.value = false
        toast.info("Cliquez sur une image pour l'agrandir 🙂 !")
    }, 1000);
});
</script>

<style scoped>
.modal-backdrop {
    background-color: rgba(59, 61, 63, 0);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(6px);
}
</style>