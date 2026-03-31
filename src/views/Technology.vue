<template>
    <Loading v-if="loading" message="Technologies utilisées..." />
    <div v-else class="technologies-container">
        <AnimatedTitle text="« Explorons maintenant les technologies que j’utilise quotidiennement »" aos="fade-down" />

        <div data-aos="fade-up" class="tech-grid">
            <!-- EN COURS D'APPRENTISSAGE -->
            <div class="tech-category">
                <logoSection title="EN COURS D'APPRENTISSAGE" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/flutter.png" name="FLUTTER" />
                </DivSlot>
            </div>

            <!-- DESIGN -->
            <div class="tech-category">
                <logoSection title="DESIGN" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/photoshop.png" name="PHOTOSHOP" />
                    <TechLogo logo="/images/tecnos/figma.png" name="FIGMA" />
                    <TechLogo logo="/images/tecnos/canva.png" name="CANVA" />
                </DivSlot>
            </div>

            <!-- FRONTEND -->
            <div class="tech-category">
                <logoSection title="FRONTEND" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/html5.png" name="HTML5" />
                    <TechLogo logo="/images/tecnos/css.png" name="CSS3" />
                    <TechLogo logo="/images/tecnos/tailwinds.png" name="TAILWINDCSS" />
                    <TechLogo logo="/images/tecnos/js.png" name="JAVASCRIPT" />
                    <TechLogo logo="/images/tecnos/jquery.png" name="JQUERY" />
                </DivSlot>
            </div>

            <!-- BACKEND & SGBD -->
            <div class="tech-category">
                <logoSection title="BACKEND & SGBD" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/php.png" name="PHP" />
                    <TechLogo logo="/images/tecnos/node.webp" name="NODEJS" />
                    <TechLogo logo="/images/tecnos/dbeaver.png" name="DBEAVER" />
                    <TechLogo logo="/images/tecnos/mysql.jpg" name="MYSQL" />
                    <TechLogo logo="/images/tecnos/mariadb.png" name="MARIADB" />
                </DivSlot>
            </div>

            <!-- FRAMEWORKS -->
            <div class="tech-category">
                <logoSection title="FRAMEWORKS" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/vuejs.jpg" name="VUE.JS" />
                    <TechLogo logo="/images/tecnos/nuxt.webp" name="NUXT.JS" />
                    <TechLogo logo="/images/tecnos/expressjs.webp" name="EXPRESS.JS" />
                    <TechLogo logo="/images/tecnos/laravel.png" name="LARAVEL" />
                    <TechLogo logo="/images/tecnos/ionic.png" name="IONIC" />
                </DivSlot>
            </div>

            <!-- ENVIRONNEMENT DE DEV -->
            <div class="tech-category">
                <logoSection title="ENVIRONNEMENT DE DEV" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/typescript.png" name="TYPESCRIPT" />
                    <TechLogo logo="/images/tecnos/lunix.png" name="LINUX" />
                    <TechLogo logo="/images/tecnos/vscode.png" name="VS CODE" />
                    <TechLogo logo="/images/tecnos/git.png" name="GIT" />
                    <TechLogo logo="/images/tecnos/docker.png" name="DOCKER" />
                    <TechLogo logo="/images/tecnos/postman.png" name="POSTMAN" />
                    <TechLogo logo="/images/tecnos/chrome.png" name="CHROME DEVTOOLS" />
                </DivSlot>
            </div>

            <!-- GITOPS & SECURISATION -->
            <div class="tech-category">
                <logoSection title="GITOPS & SÉCURISATION" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/ci&cd.png" name="CI/CD" />
                    <TechLogo logo="/images/tecnos/github-action.jpeg" name="GITHUB ACTIONS" />
                    <TechLogo logo="/images/tecnos/ftp.png" name="FTP" />
                    <TechLogo logo="/images/tecnos/tls.webp" name="TLS" />
                    <TechLogo logo="/images/tecnos/ssh.jpg" name="SSH" />
                    <TechLogo logo="/images/tecnos/ssl.png" name="SSL" />
                    <TechLogo logo="/images/tecnos/filezilla.jpg" name="FILEZILLA" />
                </DivSlot>
            </div>

            <!-- SCRIPT & AUTOMATISATION -->
            <div class="tech-category">
                <logoSection title="SCRIPT & AUTOMATISATION" />
                <DivSlot>
                    <TechLogo logo="/images/tecnos/python.jpeg" name="PYTHON" />
                </DivSlot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref<boolean>(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        toast.info("Survolez le logo pour afficher le nom du techno 🙂")
    }, 1000)
})
</script>


<style scoped>
.technologies-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.tech-category {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tech-category:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
    .technologies-container {
        padding: 1rem;
    }

    .tech-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .tech-category {
        padding: 1rem;
    }
}

@media screen and (max-width: 748px) {
    .flex {
        flex-direction: column;
        align-items: center;
        gap: 12px !important;
    }

    .card {
        padding: 8px !important;
        text-align: center;
    }

    .card span {
        font-size: 10px !important;
    }

    .tech-logo img {
        width: 40px !important;
        height: 40px !important;
    }
}
</style>
