<template>
  <Loading v-if="loading" :message="$t('skills.loading')" />
  <div v-else>
    <AnimatedTitle :text="$t('skills.quote')" aos="fade-down" />

    <div class="text-center max-w-2xl mx-auto" data-aos="fade-up">
      <p class="text-lg italic text-gray-700 dark:text-gray-300">
        <span class="text-violet-800 text-lg">«</span> {{ $t('skills.description') }} <span
          class="text-violet-800 text-lg">»</span>
      </p>
    </div>

    <div class="flex items-stretch flex-wrap bg-gray-100 gap-4 p-4 mt-4 text-lg" data-aos="fade-up">
      <SkillSection id="vue" :title="$t('skills.vue_title')" :bgColor="'bg-yellow-100'"
        :borderColor="'border-yellow-200'" :skills="[
          {
            name: $t('skills.vue_s1_name'),
            description: $t('skills.vue_s1_desc')
          },
          {
            name: $t('skills.vue_s2_name'),
            description: $t('skills.vue_s2_desc')
          },
          {
            name: $t('skills.vue_s3_name'),
            description: $t('skills.vue_s3_desc')
          }
        ]" />
      <SkillSection id="laravel" :title="$t('skills.laravel_title')" :bgColor="'bg-sky-100'"
        :borderColor="'border-sky-200'" :skills="[
          {
            name: $t('skills.laravel_s1_name'), description: $t('skills.laravel_s1_desc')

          },
          {
            name: $t('skills.laravel_s2_name'), description: $t('skills.laravel_s2_desc')

          },
          {
            name: $t('skills.laravel_s3_name'), description: $t('skills.laravel_s3_desc')

          }
        ]" />
      <SkillSection id="docker" :title="$t('skills.docker_title')" :bgColor="'bg-violet-100'"
        :borderColor="'border-violet-200'" :skills="[
          {
            name: $t('skills.docker_s1_name'),
            description: $t('skills.docker_s1_desc')
          },
          {
            name: $t('skills.docker_s2_name'),
            description: $t('skills.docker_s2_desc')
          },
          {
            name: $t('skills.docker_s3_name'),
            description: $t('skills.docker_s3_desc')
          }
        ]" />
      <SkillSection id="mobile" :title="$t('skills.ionic_title')" :bgColor="'bg-green-100'"
        :borderColor="'border-sky-200'" :skills="[
          {
            name: $t('skills.ionic_s1_name'),
            description: $t('skills.ionic_s1_desc')
          },
          {
            name: $t('skills.ionic_s2_name'),
            description: $t('skills.ionic_s2_desc')
          },
          {
            name: $t('skills.ionic_s3_name'),
            description: $t('skills.ionic_s3_desc')
          }
        ]" />
      <SkillSection id="python" :title="$t('skills.python_title')" :bgColor="'bg-pink-100'"
        :borderColor="'border-yellow-200'" :skills="[
          {
            name: $t('skills.python_s1_name'),
            description: $t('skills.python_s1_desc')
          },
          {
            name: $t('skills.python_s2_name'),
            description: $t('skills.python_s2_desc')
          },
          {
            name: $t('skills.python_s3_name'),
            description: $t('skills.python_s3_desc')
          }
        ]" />
    </div>
    <div class="flex items-stretch flex-wrap bg-gray-100 gap-4 p-4 text-lg">
      <SkillSection id="nuxt" :title="$t('skills.nuxt_title')" :bgColor="'bg-orange-100'"
        :borderColor="'border-orange-200'" :skills="[
          {
            name: $t('skills.nuxt_s1_name'),
            description: $t('skills.nuxt_s1_desc')
          },
          {
            name: $t('skills.nuxt_s2_name'),
            description: $t('skills.nuxt_s2_desc')
          },
          {
            name: $t('skills.nuxt_s3_name'),
            description: $t('skills.nuxt_s3_desc')
          }
        ]" />

      <SkillSection id="symfony" :title="$t('skills.symfony_title')" :bgColor="'bg-cyan-100'"
        :borderColor="'border-cyan-200'" :skills="[
          {
            name: $t('skills.symfony_s1_name'),
            description: $t('skills.symfony_s1_desc')
          },
          {
            name: $t('skills.symfony_s2_name'),
            description: $t('skills.symfony_s2_desc')
          },
          {
            name: $t('skills.symfony_s3_name'),
            description: $t('skills.symfony_s3_desc')
          }
        ]" />

      <SkillSection id="cicd" :title="$t('skills.cicd_title')" :bgColor="'bg-amber-100'"
        :borderColor="'border-amber-200'" :skills="[
          {
            name: $t('skills.cicd_s1_name'),
            description: $t('skills.cicd_s1_desc')
          },
          {
            name: $t('skills.cicd_s2_name'),
            description: $t('skills.cicd_s2_desc')
          },
          {
            name: $t('skills.cicd_s3_name'),
            description: $t('skills.cicd_s3_desc')
          }
        ]" />

      <SkillSection :title="$t('skills.flutter_title')" :bgColor="'bg-teal-100'" :borderColor="'border-teal-200'"
        :skills="[
          {
            name: $t('skills.flutter_s1_name'),
            description: $t('skills.flutter_s1_desc')
          },
          {
            name: $t('skills.flutter_s2_name'),
            description: $t('skills.flutter_s2_desc')
          },
          {
            name: $t('skills.flutter_s3_name'),
            description: $t('skills.flutter_s3_desc')
          }
        ]" />
      <SkillSection id="express" :title="$t('skills.express_title')" :bgColor="'bg-red-100'"
        :borderColor="'border-red-200'" :skills="[
          {
            name: $t('skills.express_s1_name'),
            description: $t('skills.express_s1_desc')
          },
          {
            name: $t('skills.express_s2_name'),
            description: $t('skills.express_s2_desc')
          },
          {
            name: $t('skills.express_s3_name'),
            description: $t('skills.express_s3_desc')
          }
        ]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: computed(() => t('skills.meta_title')),
  meta: [
    {
      name: 'Valorisation',
      content: computed(() => t('skills.meta_desc'))
    }
  ]
})


const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

</script>

<style scoped>
@media screen and (max-width: 748px) {
  .aos-animation {
    animation: none !important;
  }

  p,
  h3,
  span,
  h1 {
    font-size: 10px !important;
  }
}
</style>