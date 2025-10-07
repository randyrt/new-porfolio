<template>
    <div>
        Position de la souris : X = {{ x }}, Y = {{ y }}
    </div>
    <div>
        <p style="color: var(--main-color)">Texte coloré</p>
        <button @click="changeColor" class="cursor-pointer">Changer couleur</button>
    </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { useCssVar } from '@vueuse/core'


const mainColor = useCssVar('--main-color', document.documentElement)


console.log(mainColor.value)

function changeColor() {
    mainColor.value = '#ff0000'
}

const { x, y } = useMouse()
</script>
