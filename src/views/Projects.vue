<template>
    <Loading v-if="loading" message="Mes récents projets..." />
    <div v-else>
        <div class="card w-full p-4 flex justify-center">
            <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-right">
                « Voici quelques capture de mes plus grands et récents projets »
            </span>
        </div>
        <!-- <div class="h-[300px] mt-16 card p-2">
            <Swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="3" :space-between="20" :loop="true"
                :autoplay="{ delay: 3000 }" :pagination="pagination" navigation class="my-swiper">
                
            </Swiper>
        </div> -->

        <div class="h-[300px] mt-8 p-2">
            <Swiper :space-between="30" :pagination="{ clickable: true }"  :modules="[Pagination, Navigation, Autoplay]"
                class="mySwiper" :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images" :key="index">
                    <img :src="img" alt="slide" class="w-full h-48 object-cover rounded-lg shadow-md" />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/navigation'
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
.swiper {
    width: 50%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #ffff;

    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 30px !important;
    color: #10a9e6;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
}
</style>