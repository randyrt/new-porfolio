<template>
    <div :class="[bgColor, 'border border-yellow-50 w-1/3 h-auto rounded-lg p-2']">
        <p class="p-4 card mt-2 text-center rounded-lg font-bold text-lg">
            {{ title }}
        </p>

        <div class="mt-4 p-4 card rounded-lg text-sm text-gray-700  space-y-3">
            <div v-for="(skill, index) in skills" :key="index"
                :class="['p-4', 'last:border-0', 'border-b', borderColor]">
                <h3 class="font-semibold text-gray-600 mb-2">{{ skill.name }}</h3>
                <p class="text-gray-600 ">{{ skill.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

interface Skill {
    name: string;
    description: string;
}

const props = withDefaults(defineProps<{
    title?: string;
    bgColor?: string;
    borderColor?: string;
    skills?: Skill[];
}>(), {
    title: "Compétences",
    bgColor: "bg-yellow-100",
    borderColor: "border-violet-600",
    skills: () => [
        {
            name: "",
            description: ""
        },
        {
            name: "",
            description: ""
        },
        {
            name: "",
            description: ""
        },
        {
            name: "",
            description: ""
        }
    ]
});
</script>
