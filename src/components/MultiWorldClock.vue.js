import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const currentIndex = ref(0);
const currentTime = ref('--:--:--');
const currentDate = ref('');
let rotationInterval = null;
let clockInterval = null;
const cities = [
    { nameKey: 'clock.cities.antananarivo', timezone: 'Indian/Antananarivo', icon: 'fa-solid fa-location-dot' },
    { nameKey: 'clock.cities.paris', timezone: 'Europe/Paris', icon: 'fa-solid fa-flag' },
    { nameKey: 'clock.cities.new_york', timezone: 'America/New_York', icon: 'fa-regular fa-building' },
    { nameKey: 'clock.cities.tokyo', timezone: 'Asia/Tokyo', icon: 'fa-solid fa-landmark' },
    { nameKey: 'clock.cities.london', timezone: 'Europe/London', icon: 'fa-solid fa-building' },
    { nameKey: 'clock.cities.dubai', timezone: 'Asia/Dubai', icon: 'fa-solid fa-city' }
];
const currentCity = computed(() => cities[currentIndex.value]);
// Fonction pour mettre la première lettre en majuscule
const capitalizeFirstLetter = (str) => {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    // Mettre la première lettre du jour en majuscule
    // Exemple: "lundi 15 janvier 2024" -> "Lundi 15 janvier 2024"
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
};
const setActiveCity = (index) => {
    currentIndex.value = index;
    updateCurrentClock();
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(rotateCity, 20000);
    }
};
onMounted(() => {
    updateCurrentClock();
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
/** @type {__VLS_StyleScopedClasses['clock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['clock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['city-time']} */ ;
/** @type {__VLS_StyleScopedClasses['city-date']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "multi-clock mt-4 mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "clocks-grid" },
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
    ...{ class: "dots-container" },
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
        key: (city.name),
        ...{ class: "dot" },
        ...{ class: ({ active: index === __VLS_ctx.currentIndex }) },
    });
    // @ts-ignore
    [currentIndex,];
}
/** @type {__VLS_StyleScopedClasses['multi-clock']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['clocks-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['clock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['city-name']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['city-time']} */ ;
/** @type {__VLS_StyleScopedClasses['city-date']} */ ;
/** @type {__VLS_StyleScopedClasses['dots-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dots']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        currentIndex: currentIndex,
        currentTime: currentTime,
        currentDate: currentDate,
        cities: cities,
        currentCity: currentCity,
        setActiveCity: setActiveCity,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
