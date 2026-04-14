<!-- components/MultiWorldClock.vue -->
<template>
    <div class="multi-clock mt-4 mb-4">
        <div class="clocks-grid">
            <div class="clock-item">
                <div class="city-name">
                    <font-awesome-icon :icon="currentCity.icon" class="text-violet-400 text-sm" />
                    <span>{{ $t(currentCity.nameKey) }}</span>
                </div>
                <div class="city-time">{{ currentTime }}</div>
                <div class="city-date">{{ currentDate }}</div>
                <!-- Météo -->
                <div class="city-weather p-2 rounded-lg bg-white w-fit mx-auto" v-if="weatherInfo">
                    <font-awesome-icon :icon="weatherInfo.icon" class="text-yellow-400 text-sm" />
                    <span class="weather-temp">{{ weatherInfo.temp }}°C</span>
                    <span class="weather-desc">{{ $t(weatherInfo.descriptionKey) }}</span>
                </div>
                <div class="city-weather loading" v-else>
                    <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-violet-400 text-sm" />
                    <span>{{ $t('clock.weather.loading') }}</span>
                </div>
            </div>
        </div>

        <div class="dots-container">
            <div class="dots">
                <span v-for="(city, index) in cities" :key="city.nameKey" class="dot"
                    :class="{ active: index === currentIndex }" @click="setActiveCity(index)">
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const currentIndex = ref(0)
const currentTime = ref('--:--:--')
const currentDate = ref('')
const weatherInfo = ref<any>(null)
let rotationInterval: ReturnType<typeof setInterval> | null = null
let clockInterval: ReturnType<typeof setInterval> | null = null


const weatherData: Record<string, any> = {
    'Indian/Antananarivo': { temp: 22, descriptionKey: 'clock.weather.sunny', icon: 'fa-solid fa-sun' },
    'Europe/Paris': { temp: 15, descriptionKey: 'clock.weather.cloudy', icon: 'fa-solid fa-cloud' },
    'America/New_York': { temp: 18, descriptionKey: 'clock.weather.partly_cloudy', icon: 'fa-solid fa-cloud-sun' },
    'Asia/Tokyo': { temp: 20, descriptionKey: 'clock.weather.light_rain', icon: 'fa-solid fa-cloud-rain' },
    'Europe/London': { temp: 14, descriptionKey: 'clock.weather.fog', icon: 'fa-solid fa-smog' },
    'Asia/Dubai': { temp: 32, descriptionKey: 'clock.weather.hot_dry', icon: 'fa-solid fa-temperature-high' }
}

const cities = [
    { nameKey: 'clock.cities.antananarivo', timezone: 'Indian/Antananarivo', icon: 'fa-solid fa-location-dot', cityName: 'Antananarivo' },
    { nameKey: 'clock.cities.paris', timezone: 'Europe/Paris', icon: 'fa-solid fa-flag', cityName: 'Paris' },
    { nameKey: 'clock.cities.new_york', timezone: 'America/New_York', icon: 'fa-regular fa-building', cityName: 'New York' },
    { nameKey: 'clock.cities.tokyo', timezone: 'Asia/Tokyo', icon: 'fa-solid fa-landmark', cityName: 'Tokyo' },
    { nameKey: 'clock.cities.london', timezone: 'Europe/London', icon: 'fa-solid fa-building', cityName: 'London' },
    { nameKey: 'clock.cities.dubai', timezone: 'Asia/Dubai', icon: 'fa-solid fa-city', cityName: 'Dubai' }
]

const currentCity = computed(() => cities[currentIndex.value])

// Fonction pour mettre la première lettre en majuscule
const capitalizeFirstLetter = (str: string) => {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// Récupérer la météo pour une ville
const fetchWeather = async (timezone: string, cityName: string) => {
    // Version avec données simulées
    weatherInfo.value = weatherData[timezone] || { temp: '--', descriptionKey: 'clock.weather.unavailable', icon: 'fa-solid fa-question' }
    
    // Version réelle avec API (décommentez et mettez votre clé API)
    /*
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=VOTRE_CLE_API&units=metric&lang=fr`
        )
        const data = await response.json()
        if (data.cod === 200) {
            weatherInfo.value = {
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                icon: getWeatherIcon(data.weather[0].icon)
            }
        }
    } catch (error) {
        console.error('Erreur météo:', error)
        weatherInfo.value = { temp: '--', descriptionKey: 'clock.weather.error', icon: 'fa-solid fa-exclamation-triangle' }
    }
    */
}

// Obtenir l'icône FontAwesome selon la météo
const getWeatherIcon = (iconCode: string) => {
    const iconMap: Record<string, string> = {
        '01d': 'fa-solid fa-sun',
        '01n': 'fa-solid fa-moon',
        '02d': 'fa-solid fa-cloud-sun',
        '02n': 'fa-solid fa-cloud-moon',
        '03d': 'fa-solid fa-cloud',
        '03n': 'fa-solid fa-cloud',
        '04d': 'fa-solid fa-cloud',
        '04n': 'fa-solid fa-cloud',
        '09d': 'fa-solid fa-cloud-rain',
        '09n': 'fa-solid fa-cloud-rain',
        '10d': 'fa-solid fa-cloud-showers-heavy',
        '10n': 'fa-solid fa-cloud-showers-heavy',
        '11d': 'fa-solid fa-bolt',
        '11n': 'fa-solid fa-bolt',
        '13d': 'fa-solid fa-snowflake',
        '13n': 'fa-solid fa-snowflake',
        '50d': 'fa-solid fa-smog',
        '50n': 'fa-solid fa-smog'
    }
    return iconMap[iconCode] || 'fa-solid fa-cloud'
}

const updateCurrentClock = () => {
    const city = currentCity.value
    if (!city) return

    const now = new Date()
    const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: city.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }
    const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: city.timezone,
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }

    currentTime.value = new Intl.DateTimeFormat(locale.value, timeOptions).format(now)
    let date = new Intl.DateTimeFormat(locale.value, dateOptions).format(now)

    const parts = date.split(' ')
    if (parts.length > 0) {
        parts[0] = capitalizeFirstLetter(parts[0])
        date = parts.join(' ')
    }
    currentDate.value = date
}

const rotateCity = () => {
    currentIndex.value = (currentIndex.value + 1) % cities.length
    updateCurrentClock()
    fetchWeather(cities[currentIndex.value].timezone, cities[currentIndex.value].cityName)
}

const setActiveCity = (index: number) => {
    currentIndex.value = index
    updateCurrentClock()
    fetchWeather(cities[currentIndex.value].timezone, cities[currentIndex.value].cityName)
    if (rotationInterval) {
        clearInterval(rotationInterval)
        rotationInterval = setInterval(rotateCity, 20000)
    }
}

// Surveiller les changements de langue pour mettre à jour la météo
watch(locale, () => {
    fetchWeather(currentCity.value.timezone, currentCity.value.cityName)
})

onMounted(() => {
    updateCurrentClock()
    fetchWeather(currentCity.value.timezone, currentCity.value.cityName)
    rotationInterval = setInterval(rotateCity, 20000)
    clockInterval = setInterval(updateCurrentClock, 1000)
})

onBeforeUnmount(() => {
    if (rotationInterval) clearInterval(rotationInterval)
    if (clockInterval) clearInterval(clockInterval)
})
</script>

<style scoped>
.multi-clock {
    background: rgba(255, 255, 255, 0.05);
}

.clocks-grid {
    display: flex;
    justify-content: center;
}

.clock-item {
    text-align: center;
    padding: 2rem 2.5rem;
    background: rgba(120, 40, 151, 0.2);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
    width: 200px;
}

.city-name {
    font-size: 1rem;
    font-weight: 600;
    color: #8b5cf6;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.city-time {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Courier New', monospace;
    color: #e5e7eb;
}

.city-date {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: 0.5rem;
}

/* Styles météo */
.city-weather {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #e5e7eb;
}

.city-weather.loading {
    color: #9ca3af;
}

.weather-temp {
    font-weight: bold;
    color: #fbbf24;
}

.weather-desc {
    color: #9ca3af;
    font-size: 0.7rem;
}

.dots-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.dots {
    display: flex;
    gap: 0.5rem;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(139, 92, 246, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot:hover {
    background-color: rgba(139, 92, 246, 0.6);
    transform: scale(1.2);
}

.dot.active {
    background-color: #8b5cf6;
    width: 20px;
    border-radius: 4px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@media (max-width: 640px) {
    .clock-item {
        padding: 0.75rem 1rem;
        min-width: auto;
        width: 100%;
    }

    .city-time {
        font-size: 1.25rem;
    }

    .city-date {
        font-size: 0.7rem;
    }
    
    .city-weather {
        font-size: 0.7rem;
        gap: 0.3rem;
    }
    
    .weather-desc {
        font-size: 0.6rem;
    }
}
</style>