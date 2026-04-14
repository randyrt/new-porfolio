<template>
  <div class="github-stats p-6 bg-white card">
    <div class="flex items-center gap-3 mb-6">
      <font-awesome-icon :icon="['fab', 'github']" class="text-black text-2xl" />
      <h2 class="text-2xl font-bold text-black">{{ $t('github.title') }}</h2>
    </div>

   
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" v-if="!loading && !error">
      <div class="stat-card p-4 bg-gradient-to-br from-blue-400 to-blue-400 rounded-lg text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">{{ $t('github.repos') }}</p>
            <p class="text-2xl font-bold">{{ stats.public_repos }}</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-code-branch" class="text-blue-200 text-2xl" />
        </div>
      </div>

      <div class="stat-card p-4 bg-gradient-to-br from-green-400 to-green-400 rounded-lg text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">{{ $t('github.followers') }}</p>
            <p class="text-2xl font-bold">{{ stats.followers }}</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-users" class="text-green-200 text-2xl" />
        </div>
      </div>

      <div class="stat-card p-4 bg-gradient-to-br from-purple-400 to-purple-400 rounded-lg text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm">{{ $t('github.following') }}</p>
            <p class="text-2xl font-bold">{{ stats.following }}</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-user-plus" class="text-purple-200 text-2xl" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" v-if="!loading && !error">
      <div class="chart-container p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('github.languages') }}</h3>
        <div class="h-64">
          <Doughnut :data="languageChartData" :options="chartOptions" />
        </div>
      </div>

      <div class="chart-container p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('github.contributions') }}</h3>
        <div class="h-64">
          <Bar :data="contributionChartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      <span class="ml-3 text-gray-400 dark:text-gray-400">{{ $t('github.loading') }}</span>
    </div>

    <div v-if="error" class="text-center py-12">
      <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-red-400 text-4xl mb-4" />
      <p class="text-red-400 dark:text-red-400">{{ $t('github.error') }}</p>
      <button @click="fetchStats" class="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-400 transition-colors">
        {{ $t('github.retry') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
} from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
)

const { t } = useI18n()

const stats = ref({})
const languages = ref({})
const loading = ref(true)
const error = ref(false)


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'rgb(156, 163, 175)' 
      }
    }
  },
  scales: {
    y: {
      ticks: {
        color: 'rgb(156, 163, 175)'
      },
      grid: {
        color: 'rgb(75, 85, 99)'
      }
    },
    x: {
      ticks: {
        color: 'rgb(156, 163, 175)'
      },
      grid: {
        color: 'rgb(75, 85, 99)'
      }
    }
  }
}

const languageChartData = ref({
  labels: [],
  datasets: [{
    label: 'Langages utilisés',
    data: [],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 205, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
})


const contributionChartData = ref({
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
  datasets: [{
    label: 'Contributions',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    borderColor: 'rgba(139, 92, 246, 1)',
    borderWidth: 1
  }]
})


const fetchStats = async () => {
  try {
    loading.value = true
    error.value = false


    const profileResponse = await axios.get('https://api.github.com/users/randyrt')
    stats.value = profileResponse.data

    const reposResponse = await axios.get('https://api.github.com/users/randyrt/repos?per_page=100')
    const repos = reposResponse.data

    const languageCount = {}
    for (const repo of repos) {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
      }
    }

    const sortedLanguages = Object.entries(languageCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)

    languageChartData.value.labels = sortedLanguages.map(([lang]) => lang)
    languageChartData.value.datasets[0].data = sortedLanguages.map(([,count]) => count)

  } catch (err) {
    console.error('Erreur lors de la récupération des stats GitHub:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.chart-container {
  transition: all 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>