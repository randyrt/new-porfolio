<template>
    <Loading v-if="loading" message="Mes qualités..." />
    <div v-else class="p-4">
        <AnimatedTitle text=" « Randy en tant que dévellopeur web et mobile  » " aos="fade-down" />
        <div class=" min-h-screen p-4 flex flex-col items-center justify-center">
            <section class="section-anime">
                <div class="container mt-10 p-4">
                    <div class="row wrapper">
                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">Apprentissage continu</h4>
                            <p class="text-center">
                                "Je crois que l’apprentissage continu est essentiel pour rester en avance dans le monde
                                en constante évolution des technologies.
                                Je cherche toujours à enrichir mes compétences, et ma capacité à apprendre rapidement me
                                permet de m’adapter aux nouveaux outils."
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">Résolution de problèmes</h4>
                            <p class="text-center">
                                "J’aborde chaque défi avec l’objectif de trouver des solutions efficaces et créatives
                                plutôt que de me laisser freiner par les obstacles.
                                En ce qui me concene, chaque problème est une opportunité d’innover et d’améliorer, et
                                j’aime
                                relever les situations complexes avec une approche stratégique fiable et durable"
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">Sens du design responsive</h4>
                            <p class="text-center">
                                "J’ai fait de nombreux efforts, recherches et pratiques afin de garantir que chaque
                                produit soit accessible sur tous les appareils, qu’il s’agisse d’un smartphone ou d’un
                                ordinateur.
                                Cette approche permet d’apporter des solutions adaptées et d’élargir efficacement la
                                cible de nos projets."
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">Minimalisme</h4>
                            <p class="text-center">
                                "Le minimalisme est une façon de concevoir qui vise à produire un design épuré, clair et
                                agréable à utiliser.
                                Cela permet de créer une expérience simple mais complète, qui économise du temps tout en
                                garantissant un rendu de qualité."
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">Persévérance et créativité</h4>
                            <p class="text-center">
                                "On m’a souvent dit que le talent seul ne suffit pas pour réussir. Pour moi, l’essentiel
                                réside dans le soutien mutuel, la persistance, la volonté d’agir et les efforts fournis
                                pour acquérir de l’expérience.
                                Le développement web est une forme d’art et d'inspiration, où la créativité et la
                                persévérance font toute
                                la différence."
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3">
                            <h4 class="text-center">Esprit d’équipe</h4>
                            <p class="text-center">
                                "Le facteur le plus important dans l’évolution d’une entreprise est l’esprit d’équipe et
                                la qualité des relations entre collaborateurs.
                                Il est essentiel de créer des liens solides, de collaborer dans
                                une bonne ambiance et d’apporter un soutien réciproque."
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})


</script>

<style scoped>
@media screen and (max-width: 748px) {
    span {
        font-size: 10px !important;
    }
}
</style>