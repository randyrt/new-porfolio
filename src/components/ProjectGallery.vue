<template>
    <div class="h-[400px] mt-4 p-2 flex justify-between items-center">
        <Swiper :pagination="{ clickable: true }" :modules="[Pagination, Autoplay]" class="mySwiper card" :loop="true"
            :autoplay="{ delay: 2500 }" navigation>
            <SwiperSlide v-for="(img, index) in images" :key="index">
                <div class="relative group overflow-hidden rounded-lg shadow-md">
                    <img :src="img" :alt="`${title} capture ${index + 1}`"
                        class="w-full h-auto cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        @click="$emit('open-image', img)" /> 
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
                </div>
            </SwiperSlide>
        </Swiper>
        <div class="flex justify-center card h-auto w-1/3">
            <p class="flex flex-col items-center p-6 text-gray-600">
                <span class="text-lg not-even:text-gray-800">- {{ title }} -</span>
                <span>{{ description }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

defineProps<{
    images: string[],
    title: string,
    description: string
}>();
</script>

<style scoped>
img {
    position: relative;
    width: 300px;
    height: 100%;
    object-fit: cover;
    width: 100%;
    border-radius: 8px !important;
    z-index: 1;
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