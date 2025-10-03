<template>
    <Loading v-if="loading" message="Mes récents projets..." />
    <div v-else>
        <AnimatedTitle text="« Voici quelques captures de mes plus grands et récents projets »" aos="fade-down" />
        <div class="h-[470px] mt-4 p-2 flex justify-between items-center">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper card"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images1" :key="index">
                    <img :src="img" alt="slide" class="w-full h-auto object-contain rounded-lg shadow-md cursor-pointer"
                        @click="openImage(img)" />
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-auto w-1/3">
                <p class="flex flex-col items-center p-6 text-gray-600">
                    <span class="text-lg not-even:text-gray-800">- FID-CONNECT -</span>
                    <span>
                        Fid-Connect est une plateforme tout-en-un qui aide les entreprises et les professionnels à gérer
                        efficacement leurs tâches comptables, fiscales et administratives. Développée avec Vue.js et
                        Laravel, elle est conçue pour se conformer aux réglementations belges, afin de simplifier les
                        processus complexes tout en améliorant la productivité.
                    </span>
                </p>
            </div>
        </div>
        <div class="h-[470px] mt-4 p-2 flex justify-between items-center">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper card"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images2" :key="index">
                    <img :src="img" alt="slide" class="w-full h-auto object-contain rounded-lg shadow-md cursor-pointer"
                        @click="openImage(img)" />
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-auto w-1/3">
                <p class="flex flex-col items-center p-6 text-gray-600">
                    <span class="text-lg not-even:text-gray-800">- QCP -</span>
                    <span>
                        Fid-Connect est une plateforme tout-en-un qui aide les entreprises et les professionnels à gérer
                        efficacement leurs tâches comptables, fiscales et administratives. Développée avec Vue.js et
                        Laravel, elle est conçue pour se conformer aux réglementations belges, afin de simplifier les
                        processus complexes tout en améliorant la productivité.
                    </span>
                </p>
            </div>
        </div>
              <div class="h-[470px] mt-4 p-2 flex justify-between items-center">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper card"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images3" :key="index">
                    <img :src="img" alt="slide" class="w-full h-auto object-contain rounded-lg shadow-md cursor-pointer"
                        @click="openImage(img)" />
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-auto w-1/3">
                <p class="flex flex-col items-center p-6 text-gray-600">
                    <span class="text-lg not-even:text-gray-800">- NURSES -</span>
                    <span>
                        Fid-Connect est une plateforme tout-en-un qui aide les entreprises et les professionnels à gérer
                        efficacement leurs tâches comptables, fiscales et administratives. Développée avec Vue.js et
                        Laravel, elle est conçue pour se conformer aux réglementations belges, afin de simplifier les
                        processus complexes tout en améliorant la productivité.
                    </span>
                </p>
            </div>
        </div>

        <div v-if="selectedImage" class="fixed inset-0 flex items-center justify-center z-50 card  modal-backdrop"
            @click.self="closeImage">
            <div class="relative">
                <button @click="closeImage"
                    class="absolute -top-10 -right-10 bg-violet-500 text-black px-2 py-1 rounded cursor-pointer">
                    ✕
                </button>
                <img :src="selectedImage" alt="selected" class="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';
import AnimatedTitle from '../components/AnimatedTitle.vue';
import { useToast } from 'vue-toastification'


import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const loading = ref<boolean>(true);

const images1: string[] = [
    '/src/assets/images/projects/fid-connect/capture1.png',
    '/src/assets/images/projects/fid-connect/capture2.png',
    '/src/assets/images/projects/fid-connect/capture3.png',
    '/src/assets/images/projects/fid-connect/capture_end.png',
    '/src/assets/images/projects/fid-connect/capture12.png',
    '/src/assets/images/projects/fid-connect/capture7.png',
    '/src/assets/images/projects/fid-connect/capture13.png',
    '/src/assets/images/projects/fid-connect/capture9.png',
    '/src/assets/images/projects/fid-connect/capture10.png'
];

const images2: string[] = [
    '/src/assets/images/projects/QCP/capture1.png',
    '/src/assets/images/projects/QCP/capture2.png',
    '/src/assets/images/projects/QCP/capture3.png',
    '/src/assets/images/projects/QCP/capture4.png',
    '/src/assets/images/projects/QCP/capture5.png',
    '/src/assets/images/projects/QCP/capture6.png',
    '/src/assets/images/projects/QCP/capture7.png',
    '/src/assets/images/projects/QCP/capture8.png',
    '/src/assets/images/projects/QCP/capture9.png',
    '/src/assets/images/projects/QCP/capture10.png',
    '/src/assets/images/projects/QCP/capture11.png'
];


const images3: string[] = [
    '/src/assets/images/projects/nurser-dinner/capture1.png',
    '/src/assets/images/projects/nurser-dinner/capture2.png',
    '/src/assets/images/projects/nurser-dinner/capture3.png',
    '/src/assets/images/projects/nurser-dinner/capture4.png',
    '/src/assets/images/projects/nurser-dinner/capture5.png',
    '/src/assets/images/projects/nurser-dinner/capture6.png',
    '/src/assets/images/projects/nurser-dinner/capture7.png',
];


const selectedImage = ref<string | null>(null);
const toast = useToast()


function openImage(img: string) {
    selectedImage.value = img;
}

function closeImage() {
    selectedImage.value = null;
}

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        toast.info("Cliquez sur une image pour l'agrandir 🙂 !");
    }, 1000);
});
</script>


<style scoped>
.modal-backdrop {
    background-color: rgba(59, 61, 63, 0);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(6px);
}


@media screen and (max-width: 748px) {

    span,
    p {
        font-size: 10px !important;

    }

    .flex {
        flex-direction: column;
        gap: 16px;
    }

    .mySwiper {
        width: 100% !important;
        height: auto !important;
    }

    .card {
        width: 100% !important;
        height: auto !important;
    }
}
</style>