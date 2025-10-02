<template>
    <Loading v-if="loading" message="Mes récents projets..." />
    <div v-else>
        <AnimatedTitle text="« Voici quelques capture de mes plus grands et récents projets »" />
        <div class="h-[250px] mt-4 p-2 flex justify-between">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images" :key="index">
                    <img :src="img" alt="slide" class="w-full h-48 object-cover rounded-lg shadow-md" />
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-[230px] w-1/3">
                <p class="text-center">Explication</p>
            </div>
        </div>
        <div class="h-[250px] mt-4 p-2 flex justify-between">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images" :key="index">
                    <img :src="img" alt="slide" class="w-full h-48 object-cover rounded-lg shadow-md" />
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-[230px] w-1/3">
                <p class="text-center">Explication</p>
            </div>
        </div>
        <div class="h-[250px] mt-4 p-2 flex justify-between">
            <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images" :key="index">
                    <img :src="img" alt="slide" class="w-full h-48 object-cover rounded-lg shadow-md" />
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center card h-[230px] w-1/3">
                <p class="text-center">Explication</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';
import AnimatedTitle from '../components/AnimatedTitle.vue';

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/pagination'

const loading = ref<boolean>(true)

// const images: string[] = [
//     'Slide 1',
//     'Slide 1',
//     'Slide 1',
//     '/src/assets/images/tecnos/docker.png'
// ]


const images: string[] = [
    'Slide 1',
    'Slide 2',
    'Slide 3',
]

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});

const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
        return `<span class="${className}">${index + 1}</span>`
    },
}

</script>

<style scoped>
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
        height: 250px;
    }

    .card {
        width: 100% !important;
        height: auto !important;
    }
}
</style>