<template>
    <Loading v-if="loading" :message="$t('quality.loading')" />
    <div v-else class="p-4">
        <AnimatedTitle :text="$t('quality.quote')" aos="fade-down" />
        <div class="text-center max-w-2xl mx-auto px-4 mt-4 mb-10" data-aos="fade-up">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">
                <span class="text-violet-800 text-lg">«</span> {{ $t('quality.description') }} <span
                    class="text-violet-800 text-lg">»</span>
            </p>
        </div>
        <div class="p-4 flex flex-col items-center justify-center">
            <section class="section-anime">
                <div class="container p-4">
                    <div class="row wrapper">
                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">{{ $t('quality.q1_title') }}</h4>
                            <p class="text-center">
                                {{ $t('quality.q1_desc') }}
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">{{ $t('quality.q2_title') }}</h4>
                            <p class="text-center">
                                {{ $t('quality.q2_desc') }}
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">{{ $t('quality.q3_title') }}</h4>
                            <p class="text-center">
                                {{ $t('quality.q3_desc') }}
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">{{ $t('quality.q4_title') }}</h4>
                            <p class="text-center">
                                {{ $t('quality.q4_desc') }}
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">{{ $t('quality.q5_title') }}</h4>
                            <p class="text-center">
                                {{ $t('quality.q5_desc') }}
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">{{ $t('quality.q6_title') }}</h4>
                            <p class="text-center">
                                {{ $t('quality.q6_desc') }}
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
        <div class="flex justify-center items-center">
            <button class="btn-violet btn-effect-5" @click="viewMyProject">{{ $t('quality.view_projects') }}</button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

useHead({
    title: computed(() => t('quality.meta_title')),
    meta: [
        {
            name: 'Différence',
            content: computed(() => t('quality.meta_desc'))
        }
    ]
})

const loading = ref(true)
const router = useRouter()

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})

function viewMyProject() {
    router.push('/projects')
}


</script>

<style scoped>
@media screen and (max-width: 748px) {
    span {
        font-size: 10px !important;
    }
}
</style>