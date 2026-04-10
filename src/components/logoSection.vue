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
    color:#5b21b6;
}


.section-divider {
    width: 50px;
    height: 3px;
    background: rgba(0, 0, 0, 0.589);
    border-radius: 2px;
}
</style>