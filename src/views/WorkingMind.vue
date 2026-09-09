<template>
  <Loading v-if="loading" :message="$t('workingmind.loading_text')" />
  <div
    v-else
    class="p-4 w-full flex flex-col items-center justify-center  mx-auto pb-12"
  >
    <div class="w-full flex flex-col items-center justify-center">
      <AnimatedTitle  :text="$t('workingmind.quote')" aos="fade-down" />
    </div>
    <section
      class="w-full mb-10 rounded-3xl border card p-6 shadow-sm"
      data-aos="fade-up"
    >
      <div class="flex items-center gap-3 mb-8">
        <span
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold"
          >↗</span
        >
        <div>
          <p
            class="text-[10px] uppercase tracking-[0.25em] text-violet-500 font-bold"
          >
            {{ $t("workingmind.timeline_label") }}
          </p>
          <h3 class="text-2xl font-bold text-violet-800">
            {{ $t("workingmind.timeline_title") }}
          </h3>
        </div>
      </div>

      <div
        class="relative space-y-6 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-violet-200"
      >
        <div v-for="item in timeline" :key="item.period" class="relative pl-12">
          <span
            class="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white shadow-lg"
          >
            {{ item.dot }}
          </span>
          <div class="rounded-2xl border border-violet-50 bg-violet-50/60 p-4">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2"
            >
              <span
                class="text-xs font-bold uppercase tracking-[0.2em] text-violet-600"
                >{{ item.period }}</span
              >
              <span class="text-sm font-semibold text-slate-700">{{
                item.company
              }}</span>
            </div>
            <h4 class="text-xl font-bold text-slate-800">{{ item.role }}</h4>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full mb-10 rounded-3xl border card p-6 shadow-sm">
      <div class="mb-8">
        <p
          class="text-[10px] uppercase tracking-[0.25em] text-violet-500 font-bold"
        >
          {{ $t("workingmind.workflow_label") }}
        </p>
        <h3 class="text-2xl font-bold text-violet-800">
          {{ $t("workingmind.workflow_title") }}
        </h3>
      </div>

      <div class="grid md:grid-cols-4 gap-4">
        <div
          v-for="step in workflow"
          :key="step.title"
          class="rounded-2xl border border-violet-100 bg-violet-50/50 p-4"
        >
          <div
            class="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-200/70"
          >
            {{ step.number }}
          </div>
          <h4 class="font-bold text-lg text-slate-800">{{ step.title }}</h4>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ step.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="w-full mb-10 rounded-3xl border card p-6 shadow-sm">
      <div class="mb-6">
        <p
          class="text-[10px] uppercase tracking-[0.25em] text-violet-500 font-bold"
        >
          {{ $t("workingmind.featured_case_study") }}
        </p>
        <h3 class="text-2xl font-bold text-violet-800">
          {{ featuredCaseStudy.title }}
        </h3>
      </div>

      <div class="grid lg:grid-cols-[1.4fr_0.8fr] gap-6 items-stretch">
        <div
          class="rounded-2xl bg-white p-5 shadow-sm border border-violet-100"
        >
          <p class="text-sm leading-relaxed text-slate-700 mb-5">
            {{ featuredCaseStudy.summary }}
          </p>

          <div class="grid sm:grid-cols-3 gap-3 text-center mb-5">
            <div
              v-for="metric in featuredCaseStudy.metrics"
              :key="metric.label"
              class="rounded-xl bg-violet-50 p-3"
            >
              <div class="text-xl font-black text-violet-700">
                {{ metric.value }}
              </div>
              <div
                class="text-[10px] uppercase tracking-[0.2em] text-violet-500"
              >
                {{ metric.label }}
              </div>
            </div>
          </div>

          <div class="space-y-4 text-sm">
            <div>
              <p
                class="font-bold text-slate-800 uppercase tracking-[0.15em] text-[10px]"
              >
                {{ $t("workingmind.featured_challenge") }}
              </p>
              <p class="mt-1 text-slate-600">
                {{ featuredCaseStudy.challenge }}
              </p>
            </div>
            <div>
              <p
                class="font-bold text-slate-800 uppercase tracking-[0.15em] text-[10px]"
              >
                {{ $t("workingmind.featured_solution") }}
              </p>
              <p class="mt-1 text-slate-600">
                {{ featuredCaseStudy.solution }}
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
          <p
            class="text-[10px] uppercase tracking-[0.2em] text-violet-300 font-bold"
          >
            {{ $t("workingmind.featured_stack") }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tech in featuredCaseStudy.stack"
              :key="tech"
              class="rounded-full bg-white/10 px-3 py-1 text-xs text-violet-100 border border-white/10"
            >
              {{ tech }}
            </span>
          </div>

          <div class="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p
              class="text-[10px] uppercase tracking-[0.2em] !text-cyan-300 font-bold"
            >
              {{ $t("workingmind.featured_result") }}
            </p>
            <p class="mt-2 text-lg font-semibold !text-cyan-200">
              {{ featuredCaseStudy.result }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full rounded-3xl border card p-6 shadow-sm">
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <p
            class="text-[10px] uppercase tracking-[0.25em] text-violet-500 font-bold"
          >
            {{ $t("workingmind.personality_label") }}
          </p>
          <h3 class="text-2xl font-bold text-violet-800">
            {{ $t("workingmind.personality_title") }}
          </h3>
        </div>
        <span
          class="rounded-full border border-violet-200 bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-violet-700"
        >
          {{ $t("workingmind.personality_badge") }}
        </span>
      </div>

      <div class="mt-6 grid md:grid-cols-3 gap-4">
        <div
          v-for="trait in personality"
          :key="trait.title"
          class="rounded-2xl border border-violet-100 bg-violet-50/40 p-4"
        >
          <div class="mb-3 text-2xl">{{ trait.icon }}</div>
          <h4 class="font-bold text-slate-800">{{ trait.title }}</h4>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ trait.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useHead } from "@vueuse/head";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const loading = ref<boolean>(true);
const { t } = useI18n();

useHead({
  title: computed(() => t("workingmind.meta_title")),
  meta: [
    {
      name: "description",
      content: computed(() => t("workingmind.meta_desc")),
    },
  ],
});

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const timeline = computed(() => [
  {
    period: "2024 - Present",
    dot: "Now",
    company: "MG Consulting ACT & IT",
    role: t("workingmind.timeline.current_role"),
    description: t("workingmind.timeline.current_desc"),
  },
  {
    period: "2023 - 2024",
    dot: "03",
    company: "Remote / Reunion-based company",
    role: t("workingmind.timeline.remote_role"),
    description: t("workingmind.timeline.remote_desc"),
  },
  {
    period: "2022 - 2023",
    dot: "02",
    company: "Pixel-Z",
    role: t("workingmind.timeline.backend_role"),
    description: t("workingmind.timeline.backend_desc"),
  },
  {
    period: "2021 - 2022",
    dot: "01",
    company: "Fihary Soft",
    role: t("workingmind.timeline.frontend_role"),
    description: t("workingmind.timeline.frontend_desc"),
  },
]);

const workflow = computed(() => [
  {
    number: "01",
    title: t("workingmind.workflow.listen_title"),
    description: t("workingmind.workflow.listen_desc"),
  },
  {
    number: "02",
    title: t("workingmind.workflow.design_title"),
    description: t("workingmind.workflow.design_desc"),
  },
  {
    number: "03",
    title: t("workingmind.workflow.build_title"),
    description: t("workingmind.workflow.build_desc"),
  },
  {
    number: "04",
    title: t("workingmind.workflow.improve_title"),
    description: t("workingmind.workflow.improve_desc"),
  },
]);

const featuredCaseStudy = computed(() => ({
  title: "FID-CONNECT",
  summary: t("workingmind.featured_summary"),
  metrics: [
    { value: "+35%", label: t("workingmind.featured_metric_1") },
    { value: "-25%", label: t("workingmind.featured_metric_2") },
    { value: "+10%", label: t("workingmind.featured_metric_3") },
  ],
  challenge: t("workingmind.featured_challenge_text"),
  solution: t("workingmind.featured_solution_text"),
  stack: ["Laravel", "Vue.js", "MySQL", "Redis", "TailwindCSS"],
  result: t("workingmind.featured_result_text"),
}));

const personality = computed(() => [
  {
    icon: "",
    title: t("workingmind.personality_curiosity_title"),
    description: t("workingmind.personality_curiosity_desc"),
  },
  {
    icon: "",
    title: t("workingmind.personality_structure_title"),
    description: t("workingmind.personality_structure_desc"),
  },
  {
    icon: "",
    title: t("workingmind.personality_team_title"),
    description: t("workingmind.personality_team_desc"),
  },
]);
</script>
