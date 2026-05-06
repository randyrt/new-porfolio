<template>
    <div class="fixed bottom-1 right-22 z-60 flex items-end gap-3">
        <button @click="$emit('open-tour')"
            class="relative backdrop-blur-md bg-sky-500 !border !border-amber-300 rounded-2xl  shadow-xl hover:shadow-2xl transition-all duration-300 w-13 h-14 flex items-center justify-center cursor-pointer hover:scale-110"
           >
            <font-awesome-icon icon="play-circle" class="text-xl text-amber-500 drop-shadow-md " />
        </button>
         <button @click="showDashboard = !showDashboard"
            class="relative backdrop-blur-md bg-sky-500 !border !border-amber-300 rounded-2xl  shadow-xl hover:shadow-2xl transition-all duration-300 w-13 h-14 flex items-center justify-center cursor-pointer hover:scale-110"
            :title="t('analytics.dashboard')">
            <font-awesome-icon icon="chart-line" class="text-xl text-amber-500 drop-shadow-md" />
        </button>
        <div v-if="showDashboard" class="fixed inset-0 backdrop-blur-[5px] flex items-center justify-center p-4 z-[200]"
            :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, transparent 40%)' }"
            @click.self="showDashboard = false">
            <div class="relative w-full max-w-3xl bg-slate-100 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                data-aos="fade-in">
                <div class="relative border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar"
                    :style="{ backgroundColor: 'color-mix(in srgb, #0b1120, #1a2a3a 70%)' }">
                    <div class="sticky top-0 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-50"
                        :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, #1e3a5f 100%)' }">
                        <div class="flex items-center gap-6">
                            <div>
                                <h2 class="text-2xl font-black text-white uppercase tracking-tight">
                                    {{ t('analytics.dashboard') }}
                                </h2>
                                <p class="text-xs text-slate-400 font-mono mt-1">
                                    {{ t('analytics.description') }}
                                </p>
                            </div>

                            <button @click="toggleIncognito" :class="[
                                'px-4 py-1.5 rounded-xl font-bold text-xs transition-all duration-300 border',
                                analytics.isIncognito.value
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                    : 'bg-slate-800 text-slate-400 border-white/5 hover:bg-slate-700'
                            ]"
                                :title="analytics.isIncognito.value ? t('analytics.disable_incognito') : t('analytics.activate_incognito')">
                                <font-awesome-icon :icon="analytics.isIncognito.value ? 'eye-slash' : 'eye'"
                                    class="mr-2" />
                                {{ analytics.isIncognito.value ? t('analytics.incognito') : t('analytics.visible') }}
                            </button>
                        </div>
                        <div class="flex gap-2">
                            <button @click="showDashboard = false"
                                class="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <font-awesome-icon icon="fa-solid fa-times" class="text-slate-400" />
                            </button>
                        </div>
                    </div>

                    <div class="p-8 space-y-8  bg-gradient-to-r from-blue-100 to-white/90">
                        <!-- Stats Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div
                                class="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-sky-500/30 group">
                                <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{{
                                    t('analytics.pages_viewed') }}</div>
                                <div
                                    class="text-3xl font-black text-sky-400 group-hover:scale-110 transition-transform origin-left">
                                    {{ analyticsSummary.totalPageViews }}</div>
                            </div>

                            <div
                                class="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-emerald-500/30 group">
                                <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{{
                                    t('analytics.total_clicks') }}</div>
                                <div
                                    class="text-3xl font-black text-emerald-400 group-hover:scale-110 transition-transform origin-left">
                                    {{ analyticsSummary.totalClicks }}</div>
                            </div>

                            <div
                                class="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-purple-500/30 group">
                                <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{{
                                    t('analytics.avg_session') }}</div>
                                <div
                                    class="text-3xl font-black text-purple-400 group-hover:scale-110 transition-transform origin-left">
                                    {{ formatDuration(analyticsSummary.averageSessionDuration) }}</div>
                            </div>

                            <div
                                class="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-orange-500/30 group">
                                <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{{
                                    t('analytics.engagement_score') }}</div>
                                <div
                                    class="text-3xl font-black text-orange-400 group-hover:scale-110 transition-transform origin-left">
                                    {{ analyticsSummary.engagementScore }}<span class="text-sm">/100</span></div>
                            </div>
                        </div>

                        <!-- Trophy Section -->
                        <div v-if="analyticsSummary.mostViewedProject"
                            class="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-6">
                            <div class="flex items-center gap-6">
                                <div
                                    class="w-16 h-16 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                    <font-awesome-icon icon="trophy" class="text-3xl text-amber-500" />
                                </div>
                                <div>
                                    <div class="text-[10px] text-amber-500/60 uppercase tracking-widest mb-1">{{
                                        t('analytics.star_project') }}</div>
                                    <div class="text-2xl font-black text-white leading-tight">{{
                                        analyticsSummary.mostViewedProject.name.replace('/projects/', '').toUpperCase()
                                        }}
                                    </div>
                                    <div class="text-sm text-slate-400 mt-1">{{ analyticsSummary.mostViewedProject.views
                                        }}
                                        {{ t('analytics.consultations') }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <!-- Top Clicks -->
                            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3
                                    class="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <font-awesome-icon icon="mouse-pointer" class="text-sky-400" />
                                    {{ t('analytics.top_clicks_title') }}
                                </h3>
                                <div class="space-y-4">
                                    <div v-for="click in analyticsSummary.topClicks" :key="click.element"
                                        class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                                        <div>
                                            <div class="font-bold text-slate-100">{{ click.element.split(':')[1] ||
                                                click.element }}</div>
                                            <div class="text-[10px] text-slate-500 uppercase mt-1">{{
                                                t('analytics.section')
                                                }}: {{ click.element.split(':')[0] }}</div>
                                        </div>
                                        <div
                                            class="px-4 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-black text-lg">
                                            {{ click.clicks }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Time Spent -->
                            <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3
                                    class="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <font-awesome-icon icon="clock" class="text-blue-400" />
                                    {{ t('analytics.time_spent_title') }}
                                </h3>
                                <div class="space-y-6">
                                    <div v-if="timeSpentEntries.length === 0"
                                        class="text-center text-slate-500 py-8 italic">
                                        {{ t('analytics.time_spent_title_v_if') }}
                                    </div>
                                    <div v-for="[section, time] in timeSpentEntries" :key="section" class="space-y-2">
                                        <div class="flex justify-between text-xs font-bold uppercase tracking-tight">
                                            <span class="text-slate-400">{{ formatPageName(section) }}</span>
                                            <span class="text-blue-400 font-mono">{{ formatDuration(time) }}</span>
                                        </div>
                                        <div
                                            class="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                                            <div class="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-1000"
                                                :style="{ width: `${(time / getMaxTime()) * 100}%` }">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Heatmap / Views -->
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3
                                class="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <font-awesome-icon icon="fire" class="text-orange-400" />
                                {{ t('analytics.heatmap_title') }}
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div v-for="page in analyticsSummary.topPages" :key="page.page" class="space-y-2">
                                    <div class="flex justify-between text-xs font-bold uppercase tracking-tight">
                                        <span class="text-slate-400">{{ formatPageName(page.page) }}</span>
                                        <span class="text-orange-400 font-mono">{{ page.views }} {{ t('analytics.views')
                                            }}</span>
                                    </div>
                                    <div
                                        class="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                                        <div class="h-full bg-gradient-to-r from-orange-600 to-rose-400 rounded-full transition-all duration-1000"
                                            :style="{ width: `${(page.views / analyticsSummary.totalPageViews) * 100}%` }">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer Actions -->
                        <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                            <button @click="exportData"
                                class="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-3 active:scale-95">
                                <font-awesome-icon icon="download" />
                                {{ t('analytics.export_data') }}
                            </button>
                            <button @click="resetData"
                                class="flex-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-95">
                                <font-awesome-icon icon="trash-alt" />
                                {{ t('analytics.reset_data') }}
                            </button>
                        </div>

                        <div class="text-[10px] text-center text-slate-600 flex items-center justify-center gap-1">
                            <font-awesome-icon icon="shield-alt" class="text-xs" />
                            {{ t('analytics.privacy_note') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { analytics } from '../../composables/analytics';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{
    (e: 'open-tour'): void
}>();

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
.custom-scrollbar {
    border-radius: 0.5rem;
    overflow-y: auto;
    clip-path: inset(0 round 0.5rem);

}

.modal-container {
    isolation: isolate;
}
</style>