<template>
    <Loading v-if="loading" message="Mes qualités..." />
    <div v-else class="p-4">
        <div class="card w-full p-4 flex justify-center">
            <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-left">
                « Randy en tant que dévellopeur web et mobile »
            </span>
        </div>
        <div class=" min-h-screen p-4 flex flex-col items-center justify-center">
            <section class="section-anime">
                <div class="container mt-10 p-4">
                    <div class="row wrapper">
                        <div class="p-4 mr-4 col-md-3" data-aos="fade-up" data-aos-delay="100">
                            <h4 class="text-center">Apprentissage continu</h4>
                            <p class="text-center">
                                "Je crois que l’apprentissage continu est essentiel pour rester en avance dans le monde
                                en constante évolution des technologies.
                                Je cherche toujours à enrichir mes compétences, et ma capacité à apprendre rapidement me
                                permet de m’adapter aux nouveaux outils."
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3" data-aos="fade-down" data-aos-delay="200">
                            <h4 class="text-center">Résolution de problèmes</h4>
                            <p class="text-center">
                                "J’aborde chaque défi avec l’objectif de trouver des solutions efficaces et créatives
                                plutôt que de me laisser freiner par les obstacles.
                                En ce qui me concene, chaque problème est une opportunité d’innover et d’améliorer, et j’aime
                                relever les situations complexes avec une approche stratégique fiable et durable"
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3" data-aos="fade-up" data-aos-delay="300">
                            <h4 class="text-center">Sens du design responsive</h4>
                            <p class="text-center">
                                "J’ai fait de nombreux efforts, recherches et pratiques afin de garantir que chaque
                                produit soit accessible sur tous les appareils, qu’il s’agisse d’un smartphone ou d’un
                                ordinateur.
                                Cette approche permet d’apporter des solutions adaptées et d’élargir efficacement la
                                cible de nos projets."
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3" data-aos="fade-down" data-aos-delay="400">
                            <h4 class="text-center">Minimalisme</h4>
                            <p class="text-center">
                                "Le minimalisme est une façon de concevoir qui vise à produire un design épuré, clair et
                                agréable à utiliser.
                                Cela permet de créer une expérience simple mais complète, qui économise du temps tout en
                                garantissant un rendu de qualité."
                            </p>
                        </div>

                        <div class="p-4 mr-4 col-md-3" data-aos="fade-up" data-aos-delay="500">
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

                        <div class="p-4 mr-4 col-md-3" data-aos="fade-down" data-aos-delay="600">
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
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});


</script>

<style scoped>
.animated-gradient-text {
    background: linear-gradient(90deg, #facc15, #f87171, #3b82f6, #10b981, #facc15);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-move 5s ease infinite;
}

@keyframes gradient-move {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.section-anime {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: auto;
    margin: auto;
    padding: 20px 0;
    box-sizing: border-box;
}

.wrapper {
    display: flex;
    width: 200%;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 100px;
    box-sizing: border-box;
    animation: 90s linear infinite scroll;
}

.wrapper .col-md-3 {
    background-color: #2ca9ad07;
    border: 1px solid #3333;
    border-radius: 10px;
    font-weight: 300;
    color: #1e2d3c;
    min-height: 200px;
    height: auto !important;
}

.wrapper h4 {
    font-weight: 600;
    color: #1e2d3c;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(-50%);
    }
}

@media screen and (max-width: 1400px) {
    .wrapper {
        display: flex;
        animation: 90s linear infinite scroll;
    }

    .wrapper .col-md-3 {
        font-size: small;
        border: none;
        box-shadow: 1px 2px 25px 1px rgba(48, 46, 46, 0.129);
        border-radius: 10px;
        transform: scale(1.1);
        padding: 100px;
        flex: 0 0 30%;
    }

    .wrapper .col-md-2 {
        font-size: small;
    }

    .wrapper .col-md-2 .logo {
        width: 200px;
        height: 200px;
    }
}

@media screen and (max-width: 1400px) {
    .wrapper {
        display: flex;
        animation: 90s linear infinite scroll;
    }

    .wrapper .col-md-3 {
        font-size: small;
        border: none;
        box-shadow: 1px 2px 25px 1px rgba(48, 46, 46, 0.129);
        border-radius: 10px;
        transform: scale(1.05);
        padding: 40px;
        flex: 0 0 30%;
    }

    .wrapper .col-md-2 {
        font-size: small;
    }

    .wrapper .col-md-2 .logo {
        width: 180px;
        height: 180px;
    }
}

@media screen and (max-width: 720px) {
    .intro {
        font-size: 32px;
    }


    .wrapper {
        display: flex;
        width: 200%;
    }

    .wrapper .col-md-3 {
        border: none;
        border-radius: 6px;
        transform: scale(1.02);
        padding: 20px;
        flex: 0 0 90%;
        margin: 0 auto;
        width: 300px;
        height: 300px !important;
    }

    .col-md-2 {
        width: 150px;
        font-size: 12px !important;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .box-container .row {
        width: 100%;
        margin-left: 0;
    }
}
</style>