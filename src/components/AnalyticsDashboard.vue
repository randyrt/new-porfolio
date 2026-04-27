<template>
    <div class="fixed bottom-1 right-4 z-50">
        <button @click="showDashboard = !showDashboard"
            class="relative backdrop-blur-md bg-sky-500 border border-white/30 !rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-13 h-14 flex items-center justify-center cursor-pointer hover:scale-110">
            <font-awesome-icon icon="chart-line" class="text-xl text-amber-500 drop-shadow-md" />
        </button>

        <div v-if="showDashboard"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center p-4"
            @click.self="showDashboard = false">

            <div
                class=" bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] h-80vh overflow-y-auto detail-container px-2">
                <div
                    class="sticky top-0  bg-white border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-100">
                    <div class="flex justify-between space-x-8">
                        <div>
                            <h2 class="text-xl font-bold text-purple-700">
                                {{ t('analytics.dashboard') }}
                            </h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {{ t('analytics.description') }}
                            </p>
                        </div>

                        <button @click="toggleIncognito" :class="[
                            'px-3 py-1 rounded-lg transition-all duration-300',
                            analytics.isIncognito.value
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-gray-200 dark:bg-emerald-700 text-gray-700 dark:text-emerald-300 hover:bg-gray-300 dark:hover:bg-emerald-600'
                        ]"
                            :title="analytics.isIncognito.value ? t('analytics.disable_incognito') : t('analytics.activate_incognito')">
                            <font-awesome-icon :icon="analytics.isIncognito.value ? 'eye-slash' : 'eye'" />
                            {{ analytics.isIncognito.value ? t('analytics.incognito') : t('analytics.visible') }}
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <button @click="showDashboard = false" class="btn-violet btn-effect-5">
                            {{ t('projects.close_image') }}
                        </button>
                    </div>
                </div>

                <div class="p-6 space-y-6 z-49">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div
                            class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('analytics.pages_viewed') }}
                            </div>
                            <div class="text-2xl font-bold text-blue-600">{{ analyticsSummary.totalPageViews }}</div>
                        </div>

                        <div
                            class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('analytics.total_clicks') }}
                            </div>
                            <div class="text-2xl font-bold text-green-600">{{ analyticsSummary.totalClicks }}</div>
                        </div>

                        <div
                            class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('analytics.avg_session') }}</div>
                            <div class="text-2xl font-bold text-purple-600">{{
                                formatDuration(analyticsSummary.averageSessionDuration) }}</div>
                        </div>

                        <div
                            class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('analytics.engagement_score') }}
                            </div>
                            <div class="text-2xl font-bold text-orange-600">{{ analyticsSummary.engagementScore }}<span
                                    class="text-sm">/100</span></div>
                        </div>
                    </div>

                    <div v-if="analyticsSummary.mostViewedProject" class="rounded-xl p-4">
                        <div class="flex items-center gap-3">
                            <font-awesome-icon icon="trophy" class="text-3xl text-yellow-600" />
                            <div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('analytics.star_project') }}
                                </div>
                                <div class="text-xl font-bold">{{
                                    analyticsSummary.mostViewedProject.name.replace('/projects/', '') }}</div>
                                <div class="text-sm text-gray-500">{{ analyticsSummary.mostViewedProject.views }}
                                    {{ t('analytics.consultations') }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-xl p-4">
                        <h3 class="font-semibold mb-3">{{ t('analytics.top_clicks_title') }}</h3>
                        <div class="space-y-3">
                            <div v-for="click in analyticsSummary.topClicks" :key="click.element"
                                class="flex items-center justify-between p-2 bg-white dark:bg-gray-100 rounded-lg">
                                <div>
                                    <div class="font-medium">{{ click.element.split(':')[1] || click.element }}</div>
                                    <div class="text-xs text-gray-500">{{ t('analytics.section') }}: {{
                                        click.element.split(':')[0] }}</div>
                                </div>
                                <div class="text-sm font-bold text-violet-700 ">{{ click.clicks }} {{
                                    t('analytics.clicks')
                                }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-xl p-4">
                        <h3 class="font-semibold mb-3">{{ t('analytics.time_spent_title') }}</h3>
                        <div class="space-y-2">
                            <div v-if="timeSpentEntries.length === 0" class="text-center text-gray-500 py-4">
                                {{ t('analytics.time_spent_title_v_if') }}
                            </div>
                            <div v-for="[section, time] in timeSpentEntries" :key="section" class="relative">
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-gray-700 dark:text-gray-500">{{ formatPageName(section) }}</span>
                                    <span class="text-purple-600">{{ formatDuration(time) }}</span>
                                </div>
                                <div class="w-full bg-gray-600 dark:bg-gray-700 rounded-full h-2">
                                    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                        :style="{ width: `${(time / getMaxTime()) * 100}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class=" rounded-xl p-4">
                        <h3 class="font-semibold mb-3">{{ t('analytics.heatmap_title') }}</h3>
                        <div class="space-y-2 ">
                            <div v-for="page in analyticsSummary.topPages" :key="page.page" class="relative">
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-gray-700 dark:text-gray-500">{{ formatPageName(page.page)
                                        }}</span>
                                    <span class="text-purple-600">{{ page.views }} {{ t('analytics.views') }}</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                        :style="{ width: `${(page.views / analyticsSummary.totalPageViews) * 100}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button @click="exportData"
                            class="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <font-awesome-icon icon="download" class="text-sm" />
                            {{ t('analytics.export_data') }}
                        </button>
                        <button @click="resetData"
                            class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <font-awesome-icon icon="trash-alt" class="text-sm" />
                            {{ t('analytics.reset_data') }}
                        </button>
                    </div>

                    <div class="text-xs text-center text-gray-500 flex items-center justify-center gap-1 mt-4">
                        {{ t('analytics.privacy_note') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { analytics } from '../composables/analytics';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const showDashboard = ref(false);
const analyticsSummary = ref(analytics.getAnalyticsSummary());

const timeSpentEntries = computed(() => {
    const timeSpent = analyticsSummary.value?.timeSpentBySection;
    if (!timeSpent || typeof timeSpent !== 'object') {
        return [];
    }
    return Object.entries(timeSpent)
        .filter(([, time]) => typeof time === 'number' && time > 10)
        .sort(([, a], [, b]) => b - a);
});

const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${Math.floor(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
};

const formatPageName = (page: string): string => {
    const names: Record<string, string> = {
        '/': t('analytics.home'),
        '/quality': t('analytics.quality'),
        '/skills': t('analytics.skills'),
        '/technology': t('analytics.technology'),
        '/projects': t('analytics.projects'),
        '/about': t('analytics.about'),
        '/contact': t('analytics.contact'),
        '/services': t('analytics.services'),
        '/testimoniales': t('analytics.testimonials'),
        '/webcup24': t('analytics.webcup'),
        '/github-stats': t('analytics.github_stats'),
    };
    return names[page] || page.replace('/', '');
};

const getMaxTime = (): number => {
    const times = timeSpentEntries.value.map(([, time]) => time);
    return Math.max(...times, 1);
};

const updateAnalytics = () => {
    analyticsSummary.value = analytics.getAnalyticsSummary();
};

const toggleIncognito = () => {
    analytics.toggleIncognito();
    updateAnalytics();
};

const exportData = () => {
    const data = analytics.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

const resetData = () => {
    analytics.resetData();
};

onMounted(() => {
    window.addEventListener('analytics-update', updateAnalytics);
});

onUnmounted(() => {
    window.removeEventListener('analytics-update', updateAnalytics);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

.modal-container {
    isolation: isolate;
}
</style>