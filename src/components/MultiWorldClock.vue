<!-- components/MultiWorldClock.vue -->
<template>
    <div class="multi-clock mt-2 mb-2">
        <div class="clocks-grid">
            <div class="clock-item">
                <div class="city-name">
                    <font-awesome-icon :icon="currentCity.icon" class="text-violet-400 text-sm" />
                    <span>{{ $t(currentCity.nameKey) }}</span>
                </div>
                <div class="city-time">{{ currentTime }}</div>
                <div class="city-date">{{ currentDate }}</div>
            </div>
        </div>
        <div class="city-weather p-2 rounded-lg mt-2 w-full" v-if="weatherInfo">
            <font-awesome-icon :icon="weatherInfo.icon" class="text-yellow-400 text-sm " />
            <span class="weather-temp">{{ weatherInfo.temp }}°C</span>
            <span class="weather-desc">{{ weatherInfo.description }}</span>
        </div>
        <div class="city-weather mt-2 mb-2 loading" v-else>
            <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-violet-400 text-sm" />
            <span>{{ $t('clock.weather.loading') }}</span>
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


const cities = [
    { nameKey: 'clock.cities.antananarivo', timezone: 'Indian/Antananarivo', icon: 'fa-solid fa-location-dot', cityName: 'Antananarivo' },
    { nameKey: 'clock.cities.paris', timezone: 'Europe/Paris', icon: 'fa-solid fa-flag', cityName: 'Paris' },
    { nameKey: 'clock.cities.new_york', timezone: 'America/New_York', icon: 'fa-regular fa-building', cityName: 'New York' },
    { nameKey: 'clock.cities.tokyo', timezone: 'Asia/Tokyo', icon: 'fa-solid fa-landmark', cityName: 'Tokyo' },
    { nameKey: 'clock.cities.london', timezone: 'Europe/London', icon: 'fa-solid fa-building', cityName: 'London' },
    { nameKey: 'clock.cities.dubai', timezone: 'Asia/Dubai', icon: 'fa-solid fa-city', cityName: 'Dubai' }
]

const currentCity = computed(() => cities[currentIndex.value])


const capitalizeFirstLetter = (str: string) => {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}


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



const fetchWeather = async (cityName: string) => {
    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('Ville non trouvée');
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&forecast_days=1`
        );
        const weatherData = await weatherResponse.json();

        if (weatherData.current_weather) {
            const temp = Math.round(weatherData.current_weather.temperature);
            const weatherCode = weatherData.current_weather.weathercode;

            weatherInfo.value = {
                temp: temp,
                description: getWeatherDescription(weatherCode, locale.value),
                icon: getWeatherIconFromCode(weatherCode)
            };
        }
    } catch (error) {
        console.error('Erreur météo pour', cityName, ':', error);
        weatherInfo.value = {
            temp: '--',
            description: locale.value === 'fr' ? 'Météo non disponible' : 'Weather unavailable',
            icon: 'fa-solid fa-cloud'
        };
    }
};


const getWeatherDescription = (code: number, lang: string): string => {
    const descriptions: Record<number, Record<string, string>> = {
        0: { fr: 'Ciel dégagé', en: 'Clear sky' },
        1: { fr: 'Dégagé', en: 'Mainly clear' },
        2: { fr: 'Lèger nuage', en: 'Partly cloudy' },
        3: { fr: 'Nuageux', en: 'Overcast' },
        45: { fr: 'Brouillard', en: 'Fog' },
        48: { fr: 'Brouillard givrant', en: 'Depositing rime fog' },
        51: { fr: 'Bruine légère', en: 'Light drizzle' },
        53: { fr: 'Bruine modérée', en: 'Moderate drizzle' },
        55: { fr: 'Bruine forte', en: 'Dense drizzle' },
        61: { fr: 'Pluie légère', en: 'Light rain' },
        63: { fr: 'Pluie modérée', en: 'Moderate rain' },
        65: { fr: 'Pluie forte', en: 'Heavy rain' },
        71: { fr: 'Neige légère', en: 'Light snow' },
        73: { fr: 'Neige modérée', en: 'Moderate snow' },
        75: { fr: 'Neige forte', en: 'Heavy snow' },
        80: { fr: 'Averses légères', en: 'Light showers' },
        81: { fr: 'Averses modérées', en: 'Moderate showers' },
        82: { fr: 'Averses fortes', en: 'Violent showers' },
        95: { fr: 'Orage', en: 'Thunderstorm' }
    };
    return descriptions[code]?.[lang] || (lang === 'fr' ? 'Météo variable' : 'Variable weather');
};

const getWeatherIconFromCode = (code: number): string => {
    if (code === 0) return 'fa-solid fa-sun';
    if (code === 1 || code === 2) return 'fa-solid fa-cloud-sun';
    if (code === 3) return 'fa-solid fa-cloud';
    if (code >= 45 && code <= 48) return 'fa-solid fa-smog';
    if (code >= 51 && code <= 55) return 'fa-solid fa-cloud-rain';
    if (code >= 61 && code <= 65) return 'fa-solid fa-cloud-showers-heavy';
    if (code >= 71 && code <= 75) return 'fa-solid fa-snowflake';
    if (code >= 80 && code <= 82) return 'fa-solid fa-cloud-rain';
    if (code === 95) return 'fa-solid fa-bolt';
    return 'fa-solid fa-cloud-sun';
};

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
    fetchWeather(cities[currentIndex.value].cityName)
}

const setActiveCity = (index: number) => {
    currentIndex.value = index
    updateCurrentClock()
    fetchWeather(cities[currentIndex.value].cityName)
    if (rotationInterval) {
        clearInterval(rotationInterval)
        rotationInterval = setInterval(rotateCity, 20000)
    }
}

watch(locale, () => {
    fetchWeather(currentCity.value.cityName)
})

onMounted(() => {
    updateCurrentClock()
    fetchWeather(currentCity.value.cityName)
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
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
    width: 100%;
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
    color: #9d17be8f;
}

.city-date {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: 0.5rem;
}

/* Styles météo */
.city-weather {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #ffff;
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
    margin-top: 2px;
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