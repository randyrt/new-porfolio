<template>
  <div class="github-stats p-6 bg-white card">
    <div class="flex items-center gap-3 mb-6">
      <h2 class="text-2xl font-bold text-purple-800">{{ $t('github.title') }}</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" v-if="!loading && !error">
      <div class="stat-card p-4 bg-gradient-to-br from-blue-400 to-blue-400 rounded-lg text-white">
        <div class="flex items-center justify-between">
          <div class="!text-white">
            <p class="text-sm !text-white">{{ $t('github.repos') }}</p>
            <p class="text-2xl font-bold !text-white">{{ stats.public_repos }}</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-code-branch" class="!text-white text-2xl" />
        </div>
      </div>

      <div class="stat-card p-4 bg-gradient-to-br from-green-400 to-green-400 rounded-lg text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="!text-white text-sm">{{ $t('github.followers') }}</p>
            <p class="text-2xl font-bold !text-white">{{ stats.followers }}</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-users" class="!text-white text-2xl" />
        </div>
      </div>

      <div class="stat-card p-4 bg-gradient-to-br from-purple-400 to-purple-400 rounded-lg text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="!text-white text-sm">{{ $t('github.following') }}</p>
            <p class="text-2xl font-bold !text-white">{{ stats.following }}</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-user-plus" class="!text-white text-2xl" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 w-full" v-if="!loading && !error">
      <div class="chart-container p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('github.languages') }}</h3>
        <div class="h-64">
          <Doughnut :data="languageChartData" :options="chartOptions" />
        </div>
      </div>

      <div class="chart-container p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('github.contributions') }}</h3>
        <div class="h-64">
          <Bar :data="contributionChartData" :options="contributionChartOptions" />
        </div>
      </div>
    </div>

    <div class="city-weather mt-2 mb-2 loading" v-else>
      <div class="flex justify-center items-center min-h-[200px]">
        <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-violet-400 text-6xl" />
      </div>
    </div>

    <div v-if="error" class="text-center py-12">
      <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-red-400 text-4xl mb-4" />
      <p class="text-red-400 dark:text-red-400">{{ $t('github.error') }}</p>
      <button @click="fetchStats"
        class="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-400 transition-colors">
        {{ $t('github.retry') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, watchEffect } from 'vue'
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

const { t, locale, getLocaleMessage } = useI18n()

const stats = ref({})
const loading = ref(true)
const error = ref(false)
const monthlyCommits = ref({})


const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN


const getHeaders = () => {
  return GITHUB_TOKEN ? {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  } : {}
}

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

const contributionChartOptions = computed(() => ({
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
      beginAtZero: true,
      max: 200,
      ticks: {
        color: 'rgb(156, 163, 175)',
        stepSize: 1
      },
      grid: {
        color: 'rgb(75, 85, 99)'
      },
      title: {
        display: true,
        text: t('github.commits_label'),
        color: 'rgb(156, 163, 175)'
      }
    },
    x: {
      ticks: {
        color: 'rgb(156, 163, 175)'
      },
      grid: {
        color: 'rgb(75, 85, 99)'
      },
      title: {
        display: true,
        text: t('github.months_label'),
        color: 'rgb(156, 163, 175)'
      }
    }
  }
}))

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
  labels: [],
  datasets: [{
    label: 'Contributions (commits)',
    data: [],
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    borderColor: 'rgba(139, 92, 246, 1)',
    borderWidth: 1,
    borderRadius: 5
  }]
})

const fetchContributions = async () => {
  try {
    const reposResponse = await axios.get('https://api.github.com/users/randyrt/repos?per_page=100', {
      headers: getHeaders()
    })
    const repos = reposResponse.data

    const tempMonthlyCommits = {}
    const today = new Date()

    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      tempMonthlyCommits[monthKey] = 0
    }

    const commitPromises = repos.map(async (repo) => {
      try {
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/randyrt/${repo.name}/commits?per_page=100&author=randyrt`,
          { headers: getHeaders() }
        )

        commitsResponse.data.forEach(commit => {
          const commitDate = new Date(commit.commit.author.date)
          const commitMonth = `${commitDate.getFullYear()}-${String(commitDate.getMonth() + 1).padStart(2, '0')}`

          if (tempMonthlyCommits[commitMonth] !== undefined) {
            tempMonthlyCommits[commitMonth]++
          }
        })
      } catch (err) {
        console.error(`Erreur pour le repo ${repo.name}:`, err)
      }
    })

    await Promise.all(commitPromises)

    monthlyCommits.value = tempMonthlyCommits
    
    updateContributionChart()

  } catch (err) {
    console.error('Erreur lors de la récupération des contributions:', err)
  }
}

const updateContributionChart = () => {
  const sortedMonths = Object.keys(monthlyCommits.value).sort()
  
  let monthNames = []
  const currentLocaleMessages = getLocaleMessage(locale.value)
  const monthNamesData = currentLocaleMessages?.github?.months
  
  if (Array.isArray(monthNamesData)) {
    monthNames = monthNamesData
  } else {
    monthNames = locale.value === 'fr'
      ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  
  const labels = sortedMonths.map(month => {
    const [year, monthNum] = month.split('-')
    const monthIndex = parseInt(monthNum) - 1
    const monthName = monthNames[monthIndex] || `Month ${monthNum}`
    return `${monthName} ${year}`
  })

  contributionChartData.value = {
    ...contributionChartData.value,
    labels: labels,
    datasets: [{
      ...contributionChartData.value.datasets[0],
      data: sortedMonths.map(month => monthlyCommits.value[month])
    }]
  }
}

const fetchStats = async () => {
  try {
    loading.value = true
    error.value = false

    const profileResponse = await axios.get('https://api.github.com/users/randyrt', {
      headers: getHeaders()
    })
    stats.value = profileResponse.data

    const reposResponse = await axios.get('https://api.github.com/users/randyrt/repos?per_page=100', {
      headers: getHeaders()
    })
    const repos = reposResponse.data

    const languageCount = {}
    for (const repo of repos) {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
      }
    }

    const sortedLanguages = Object.entries(languageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)

    languageChartData.value.labels = sortedLanguages.map(([lang]) => lang)
    languageChartData.value.datasets[0].data = sortedLanguages.map(([, count]) => count)

    await fetchContributions()

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

watchEffect(() => {
  locale.value
  if (Object.keys(monthlyCommits.value).length > 0) {
    updateContributionChart()
  }
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