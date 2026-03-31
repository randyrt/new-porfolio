<template>
    <div class="tech-slots-container">
        <div class="tech-slots-grid">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.tech-slots-container {
    width: 100%;
}

.tech-slots-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
}

@media screen and (max-width: 768px) {
    .tech-slots-grid {
        gap: 1rem;
    }
}
</style>