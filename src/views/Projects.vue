<template>
    <Loading v-if="loading" message="Mes récents projets..." />
    <div v-else>
        <div class="card w-full p-4 flex justify-center">
            <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-right">
                « Voici quelques capture de mes plus grands et récents projets »
            </span>
        </div>
        <div class="h-[300px] mt-4 p-2 flex justify-between">
            <Swiper :pagination="pagination" :modules="[Pagination, Navigation, Autoplay]" class="mySwiper"
                :loop="true" :autoplay="{ delay: 2500 }" navigation>
                <SwiperSlide v-for="(img, index) in images" :key="index">
                    <!-- <img :src="img" alt="slide" class="w-full h-48 object-cover rounded-lg shadow-md" /> -->
                </SwiperSlide>
            </Swiper>
            <div class="flex justify-center  card h-[283px] w-1/3">

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'


import 'swiper/css'
// import 'swiper/css/navigation'
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
    border-radius: 5px;
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
  background-color: #888;   
  opacity: 1;               
  width: 12px;            
  height: 12px;             
}

.swiper-pagination-bullet-active {
  background-color: #199ed3 !important; 
  transform: scale(1.2) !important;     
}
</style>