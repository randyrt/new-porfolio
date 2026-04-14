import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const currentIndex = ref(0);
const currentTime = ref('--:--:--');
const currentDate = ref('');
const weatherInfo = ref(null);
let rotationInterval = null;
let clockInterval = null;
const cities = [
    { nameKey: 'clock.cities.antananarivo', timezone: 'Indian/Antananarivo', icon: 'fa-solid fa-location-dot', cityName: 'Antananarivo' },
    { nameKey: 'clock.cities.paris', timezone: 'Europe/Paris', icon: 'fa-solid fa-flag', cityName: 'Paris' },
    { nameKey: 'clock.cities.new_york', timezone: 'America/New_York', icon: 'fa-regular fa-building', cityName: 'New York' },
    { nameKey: 'clock.cities.tokyo', timezone: 'Asia/Tokyo', icon: 'fa-solid fa-landmark', cityName: 'Tokyo' },
    { nameKey: 'clock.cities.london', timezone: 'Europe/London', icon: 'fa-solid fa-building', cityName: 'London' },
    { nameKey: 'clock.cities.dubai', timezone: 'Asia/Dubai', icon: 'fa-solid fa-city', cityName: 'Dubai' }
];
const currentCity = computed(() => cities[currentIndex.value]);
const capitalizeFirstLetter = (str) => {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const getWeatherIcon = (iconCode) => {
    const iconMap = {
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
    };
    return iconMap[iconCode] || 'fa-solid fa-cloud';
};
const fetchWeather = async (cityName) => {
    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`);
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('Ville non trouvée');
        }
        const { latitude, longitude, name } = geoData.results[0];
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&forecast_days=1`);
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
    }
    catch (error) {
        console.error('Erreur météo pour', cityName, ':', error);
        weatherInfo.value = {
            temp: '--',
            description: locale.value === 'fr' ? 'Météo non disponible' : 'Weather unavailable',
            icon: 'fa-solid fa-cloud'
        };
    }
};
const getWeatherDescription = (code, lang) => {
    const descriptions = {
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
const getWeatherIconFromCode = (code) => {
    if (code === 0)
        return 'fa-solid fa-sun';
    if (code === 1 || code === 2)
        return 'fa-solid fa-cloud-sun';
    if (code === 3)
        return 'fa-solid fa-cloud';
    if (code >= 45 && code <= 48)
        return 'fa-solid fa-smog';
    if (code >= 51 && code <= 55)
        return 'fa-solid fa-cloud-rain';
    if (code >= 61 && code <= 65)
        return 'fa-solid fa-cloud-showers-heavy';
    if (code >= 71 && code <= 75)
        return 'fa-solid fa-snowflake';
    if (code >= 80 && code <= 82)
        return 'fa-solid fa-cloud-rain';
    if (code === 95)
        return 'fa-solid fa-bolt';
    return 'fa-solid fa-cloud-sun';
};
const updateCurrentClock = () => {
    const city = currentCity.value;
    if (!city)
        return;
    const now = new Date();
    const timeOptions = {
        timeZone: city.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const dateOptions = {
        timeZone: city.timezone,
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    currentTime.value = new Intl.DateTimeFormat(locale.value, timeOptions).format(now);
    let date = new Intl.DateTimeFormat(locale.value, dateOptions).format(now);
    const parts = date.split(' ');
    if (parts.length > 0) {
        parts[0] = capitalizeFirstLetter(parts[0]);
        date = parts.join(' ');
    }
    currentDate.value = date;
};
const rotateCity = () => {
    currentIndex.value = (currentIndex.value + 1) % cities.length;
    updateCurrentClock();
    fetchWeather(cities[currentIndex.value].cityName);
};
const setActiveCity = (index) => {
    currentIndex.value = index;
    updateCurrentClock();
    fetchWeather(cities[currentIndex.value].cityName);
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(rotateCity, 20000);
    }
};
watch(locale, () => {
    fetchWeather(currentCity.value.cityName);
});
onMounted(() => {
    updateCurrentClock();
    fetchWeather(currentCity.value.cityName);
    rotationInterval = setInterval(rotateCity, 20000);
    clockInterval = setInterval(updateCurrentClock, 1000);
});
onBeforeUnmount(() => {
    if (rotationInterval)
        clearInterval(rotationInterval);
    if (clockInterval)
        clearInterval(clockInterval);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['city-weather']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['clock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['city-time']} */ ;
/** @type {__VLS_StyleScopedClasses['city-date']} */ ;
/** @type {__VLS_StyleScopedClasses['city-weather']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-desc']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "multi-clock mt-2 mb-2 border-purple-200 rounded-lg" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "clocks-grid border-1 border-purple-200 rounded-lg mt-1 mb-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "clock-item" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "city-name" },
});
const __VLS_0 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.currentCity.icon),
    ...{ class: "text-violet-400 text-sm" },
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.currentCity.icon),
    ...{ class: "text-violet-400 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[currentCity,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
(__VLS_ctx.$t(__VLS_ctx.currentCity.nameKey));
// @ts-ignore
[currentCity, $t,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "city-time" },
});
(__VLS_ctx.currentTime);
// @ts-ignore
[currentTime,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "city-date" },
});
(__VLS_ctx.currentDate);
// @ts-ignore
[currentDate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "border-1 border-purple-200 rounded-lg mt-1 mb-2" },
});
if (__VLS_ctx.weatherInfo) {
    // @ts-ignore
    [weatherInfo,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "city-weather p-2 rounded-lg mt-2 w-full" },
    });
    const __VLS_5 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        icon: (__VLS_ctx.weatherInfo.icon),
        ...{ class: "text-yellow-400 text-sm " },
    }));
    const __VLS_7 = __VLS_6({
        icon: (__VLS_ctx.weatherInfo.icon),
        ...{ class: "text-yellow-400 text-sm " },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    // @ts-ignore
    [weatherInfo,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "weather-temp" },
    });
    (__VLS_ctx.weatherInfo.temp);
    // @ts-ignore
    [weatherInfo,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "weather-desc" },
    });
    (__VLS_ctx.weatherInfo.description);
    // @ts-ignore
    [weatherInfo,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "city-weather mt-2 mb-2 loading" },
    });
    const __VLS_10 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        icon: "fa-solid fa-spinner",
        ...{ class: "animate-spin text-violet-400 text-sm" },
    }));
    const __VLS_12 = __VLS_11({
        icon: "fa-solid fa-spinner",
        ...{ class: "animate-spin text-violet-400 text-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (__VLS_ctx.$t('clock.weather.loading'));
    // @ts-ignore
    [$t,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "dots-container mb-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "dots" },
});
for (const [city, index] of __VLS_getVForSourceType((__VLS_ctx.cities))) {
    // @ts-ignore
    [cities,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.setActiveCity(index);
                // @ts-ignore
                [setActiveCity,];
            } },
        key: (city.nameKey),
        ...{ class: "dot" },
        ...{ class: ({ active: index === __VLS_ctx.currentIndex }) },
    });
    // @ts-ignore
    [currentIndex,];
}
/** @type {__VLS_StyleScopedClasses['multi-clock']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-purple-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['clocks-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border-purple-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['clock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['city-name']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['city-time']} */ ;
/** @type {__VLS_StyleScopedClasses['city-date']} */ ;
/** @type {__VLS_StyleScopedClasses['border-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border-purple-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['city-weather']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-temp']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['city-weather']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['dots-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['dots']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        currentIndex: currentIndex,
        currentTime: currentTime,
        currentDate: currentDate,
        weatherInfo: weatherInfo,
        cities: cities,
        currentCity: currentCity,
        setActiveCity: setActiveCity,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
