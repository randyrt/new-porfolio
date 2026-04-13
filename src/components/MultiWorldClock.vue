<!-- components/MultiWorldClock.vue -->
<template>
    <div class="multi-clock mt-4 mb-4">
        <div class="clocks-grid">
            <div class="clock-item">
                <div class="city-name">
                    <font-awesome-icon :icon="currentCity.icon" class="text-violet-400 text-sm" />
                    <span>{{ currentCity.name }}</span>
                </div>
                <div class="city-time">{{ currentTime }}</div>
                <div class="city-date">{{ currentDate }}</div>
            </div>
        </div>

        <div class="dots-container">
            <div class="dots">
                <span v-for="(city, index) in cities" :key="city.name" class="dot"
                    :class="{ active: index === currentIndex }" @click="setActiveCity(index)">
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const currentIndex = ref(0)
const currentTime = ref('--:--:--')
const currentDate = ref('')
let rotationInterval: ReturnType<typeof setInterval> | null = null
let clockInterval: ReturnType<typeof setInterval> | null = null

const cities = [
    { name: 'Antananarivo', timezone: 'Indian/Antananarivo', icon: 'fa-solid fa-location-dot' },
    { name: 'Paris', timezone: 'Europe/Paris', icon: 'fa-solid fa-flag' },
    { name: 'New York', timezone: 'America/New_York', icon: 'fa-regular fa-building' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', icon: 'fa-solid fa-landmark' },
    { name: 'London', timezone: 'Europe/London', icon: 'fa-solid fa-building' },
    { name: 'Dubai', timezone: 'Asia/Dubai', icon: 'fa-solid fa-city' }
]

const currentCity = computed(() => cities[currentIndex.value])

// Fonction pour mettre la première lettre en majuscule
const capitalizeFirstLetter = (str: string) => {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
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

    currentTime.value = new Intl.DateTimeFormat('fr-FR', timeOptions).format(now)
    let date = new Intl.DateTimeFormat('fr-FR', dateOptions).format(now)

    // Mettre la première lettre du jour en majuscule
    // Exemple: "lundi 15 janvier 2024" -> "Lundi 15 janvier 2024"
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
}

const setActiveCity = (index: number) => {
    currentIndex.value = index
    updateCurrentClock()
    if (rotationInterval) {
        clearInterval(rotationInterval)
        rotationInterval = setInterval(rotateCity, 20000)
    }
}

onMounted(() => {
    updateCurrentClock()
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
    padding: 1rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
    min-width: 200px;
}

.clock-item:hover {
    transform: translateY(-2px);
    background: rgba(139, 92, 246, 0.1);
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
}
</style>