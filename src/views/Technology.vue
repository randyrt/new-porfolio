<template>
    <Loading v-if="loading" message="Technologies utilisées..." />
    <div v-else data-aos="fade-up">
        <div class="card w-full p-4 flex justify-center">
            <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-right">
                « Explorons maintenant les technologies que j’utilise quotidiennement »
            </span>
        </div>
        <div>
            <logoSection title="DESIGN" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/src/assets/images/tecnos/photoshop.png" name="PHOTOSHOP" />
                <TechLogo logo="/src/assets/images/tecnos/figma.png" name="FIGMA" />
                <TechLogo logo="/src/assets/images/tecnos/canva.png" name="CANVA" />
            </div>
        </div>
        <div>
            <logoSection title="FRONTEND" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/src/assets/images/tecnos/css.png" name="HTML" />
                <TechLogo logo="/src/assets/images/tecnos/html5.png" name="CSS" />
                <TechLogo logo="/src/assets/images/tecnos/tailwinds.png" name="TAILWINDCSS" />
                <TechLogo logo="/src/assets/images/tecnos/js.png" name="JAVASCRIPT" />
                <TechLogo logo="/src/assets/images/tecnos/jquery.png" name="JQUERY" />
            </div>
        </div>
        <div>
            <logoSection title="BACKEND & SGBD" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/src/assets/images/tecnos/php.png" name="PHP" />
                <TechLogo logo="/src/assets/images/tecnos/node.webp" name="NODEJS" />
                <TechLogo logo="/src/assets/images/tecnos/dbeaver.png" name="DBEAVER" />
                <TechLogo logo="/src/assets/images/tecnos/mysql.jpg" name="MYSQL" />
                <TechLogo logo="/src/assets/images/tecnos/mariadb.png" name="MARIADB" />
            </div>
        </div>
        <div>
            <logoSection title="FRAMEWORKS" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/src/assets/images/tecnos/vuejs.jpg" name="VUEJS" />
                <TechLogo logo="/src/assets/images/tecnos/nuxt.webp" name="NUXTJS" />
                <TechLogo logo="/src/assets/images/tecnos/expressjs.webp" name="EXPRESSJS" />
                <TechLogo logo="/src/assets/images/tecnos/laravel.png" name="LARAVEL" />
                <TechLogo logo="/src/assets/images/tecnos/ionic.png" name="IONIC" />
            </div>
        </div>
        <div>
            <logoSection title="ENVIRONNEMENT DE DEV" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/src/assets/images/tecnos/lunix.png" name="LUNIX" />
                <TechLogo logo="/src/assets/images/tecnos/vscode.png" name="VSCODE" />
                <TechLogo logo="/src/assets/images/tecnos/git.png" name="GIT" />
                <TechLogo logo="/src/assets/images/tecnos/docker.png" name="DOCKER" />
                <TechLogo logo="/src/assets/images/tecnos/postman.png" name="POSTMAN" />
                <TechLogo logo="/src/assets/images/tecnos/chrome.png" name="CHROME" />
            </div>
        </div>
        <div>
            <logoSection title="DEVOPS & SECURISATION" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/src/assets/images/tecnos/ci&cd.png" name="CI/CD" />
                <TechLogo logo="/src/assets/images/tecnos/ftp.png" name="FTP" />
                <TechLogo logo="/src/assets/images/tecnos/tls.webp" name="TLS" />
                <TechLogo logo="/src/assets/images/tecnos/ssh.jpg" name="SSH" />
                <TechLogo logo="/src/assets/images/tecnos/ssl.png" name="SSL" />
                <TechLogo logo="/src/assets/images/tecnos/filezilla.jpg" name="FILZELLA" />
            </div>
        </div>
        <div>
            <logoSection title="SCRIPT & AUTOMATISATION" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/src/assets/images/tecnos/python.jpeg" name="PYTHON" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';
import TechLogo from '../components/TechLogo.vue';
import logoSection from '../components/logoSection.vue';
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref<boolean>(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        toast.info("Survolez le logo pour afficher son nom 🙂");
    }, 1000);


});
</script>

<style scoped>
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