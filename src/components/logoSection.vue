<template>
    <div class="section-header">
        <h2 class="section-title">{{ title }}</h2>
        <div class="section-divider"></div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title: string;
}>();
</script>

<style scoped>
.section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-title {
    color: #6B21A8;
    font-size: 1.25rem;
}


.section-divider {
    width: 50px;
    height: 3px;
    background: #5b21b6;
    border-radius: 2px;
}
</style>