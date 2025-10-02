<template>
    <Loading v-if="loading" message="Mes récents projets ..." />
    <div v-else>
        <div class="card w-full p-4 flex justify-center">
            <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-right">
                « Voici quelques capture de mes plus grands et récents projets »
            </span>
        </div>
        <Swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="3" :space-between="20" :loop="true"
            :autoplay="{ delay: 3000 }" :pagination="{ clickable: true }" navigation class="my-swiper">
            <SwiperSlide v-for="(img, index) in images" :key="index">
                <img :src="img" alt="slide" class="w-full h-48 object-cover rounded-lg shadow-md" />
            </SwiperSlide>
        </Swiper>
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

const images: string[] = [
  '/src/assets/images/tecnos/vuejs.jpg',
  '/src/assets/images/tecnos/nuxt.webp',
  '/src/assets/images/tecnos/laravel.png',
  '/src/assets/images/tecnos/docker.png'
]

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});

</script>