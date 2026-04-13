<template>
  <Loading v-if="loading" :message="$t('services.loading')" />
  <div v-else class="flex flex-col space-y-10 ">
    <AnimatedTitle :text="$t('services.quote')" aos="fade-down" />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6" data-aos="fade-up">

      <!-- Version control -->
      <div class="card p-6 service card !bg-pink-100">
        <h2 class="title">{{ $t('services.git_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.git_desc') }}
        </p>
        <ul>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Branching strategies (feature, staging,
            production)</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Conflict resolution</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Clean commits & history</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Code reviews ready workflow</li>
        </ul>
      </div>

      <!-- Team workflow -->
      <div class="card p-6 service card !bg-pink-100">
        <h2 class="title">{{ $t('services.team_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.team_desc') }}
        </p>
        <ul>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Pull requests workflow</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Safe merges</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Release management</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Collaboration GitHub / GitLab</li>
        </ul>
      </div>

      <!-- Deployment -->
      <div class="card p-6 service card !bg-pink-100">
        <h2 class="title">{{ $t('services.deploy_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.deploy_desc') }}
        </p>
        <ul>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Linux server setup</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Secure SSH & permissions</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Environment configuration</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> Production deployment</li>
        </ul>
      </div>

      <!-- Personnalisation -->
      <div class="card p-6 service card !bg-green-100">
        <h2 class="title">{{ $t('services.custom_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.custom_desc') }}
        </p>
        <ul>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.custom_li1') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.custom_li2') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.custom_li3') }}</li>
        </ul>

      </div>


      <!-- Collaboration -->
      <div class="card p-6 service card !bg-green-100">
        <h2 class="title">{{ $t('services.collab_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.collab_desc') }}
        </p>
        <ul>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.collab_li1') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.collab_li2') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.collab_li3') }}</li>
        </ul>
      </div>

      <!-- Autres service cards -->
      <div class="card p-6 service card !bg-green-100">
        <h2 class="title">{{ $t('services.maintenance_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.maintenance_desc') }}
        </p>
        <ul>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.maintenance_li1') }}
          </li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.maintenance_li2') }}
          </li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.maintenance_li3') }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Service cards - Compétences communication & documentation -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <!-- Carte 1: Rédaction fonctionnelle -->
      <div class="card p-6 service card !bg-amber-50">
        <h2 class="title">{{ $t('services.doc_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.doc_desc') }}
        </p>
        <ul class="mt-4">
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.doc_li1') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.doc_li2') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.doc_li3') }}</li>
        </ul>
      </div>

      <!-- Carte 2: Pédagogie & vulgarisation technique -->
      <div class="card p-6 service card !bg-amber-50">
        <h2 class="title">{{ $t('services.pedagogy_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.pedagogy_desc') }}
        </p>
        <ul class="mt-4">
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.pedagogy_li1') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.pedagogy_li2') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.pedagogy_li3') }}</li>
        </ul>
      </div>

      <!-- Carte 3: Conseil business & communication -->
      <div class="card p-6 service card !bg-amber-50">
        <h2 class="title">{{ $t('services.biz_title') }}</h2>
        <p class="text-gray-600">
          {{ $t('services.biz_desc') }}
        </p>
        <ul class="mt-4">
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.biz_li1') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.biz_li2') }}</li>
          <li class="text-sm text-gray-700"><span class="text-sky-500">✔</span> {{ $t('services.biz_li3') }}</li>
        </ul>
      </div>

    </div>

    <div class="flex justify-center mt-2">
      <button class="btn-violet btn-effect-5" @click="goToContact">
        {{ $t('services.work_together') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import { computed, ref, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: computed(() => t('services.meta_title')),
  meta: [
    {
      name: 'Atouts',
      content: computed(() => t('services.meta_desc'))
    }
  ]
})

const loading = ref<boolean>(true)
const router = useRouter()

const goToContact = () => {
  router.push('/contact')
}


onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000);
});

</script>

<style scoped>
.service {
  transition: all 0.25s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.service:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #5b21b6;
}

ul {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #444;
}

li {
  margin-bottom: 4px;
}
</style>
