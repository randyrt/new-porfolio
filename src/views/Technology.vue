<template>
    <Loading v-if="loading" message="Technologies utilisées..." />
    <div v-else data-aos="fade-up">
         <AnimatedTitle text="« Explorons maintenant les technologies que j’utilise quotidiennement »"  />
        <div>
            <logoSection title="DESIGN" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/images/tecnos/photoshop.png" name="PHOTOSHOP" />
                <TechLogo logo="/images/tecnos/figma.png" name="FIGMA" />
                <TechLogo logo="/images/tecnos/canva.png" name="CANVA" />
            </div>
        </div>
        <div>
            <logoSection title="FRONTEND" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/images/tecnos/css.png" name="HTML" />
                <TechLogo logo="/images/tecnos/html5.png" name="CSS" />
                <TechLogo logo="/images/tecnos/tailwinds.png" name="TAILWINDCSS" />
                <TechLogo logo="/images/tecnos/js.png" name="JAVASCRIPT" />
                <TechLogo logo="/images/tecnos/jquery.png" name="JQUERY" />
            </div>
        </div>
        <div>
            <logoSection title="BACKEND & SGBD" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/images/tecnos/php.png" name="PHP" />
                <TechLogo logo="/images/tecnos/node.webp" name="NODEJS" />
                <TechLogo logo="/images/tecnos/dbeaver.png" name="DBEAVER" />
                <TechLogo logo="/images/tecnos/mysql.jpg" name="MYSQL" />
                <TechLogo logo="/images/tecnos/mariadb.png" name="MARIADB" />
            </div>
        </div>
        <div>
            <logoSection title="FRAMEWORKS" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/images/tecnos/vuejs.jpg" name="VUEJS" />
                <TechLogo logo="/images/tecnos/nuxt.webp" name="NUXTJS" />
                <TechLogo logo="/images/tecnos/expressjs.webp" name="EXPRESSJS" />
                <TechLogo logo="/images/tecnos/laravel.png" name="LARAVEL" />
                <TechLogo logo="/images/tecnos/ionic.png" name="IONIC" />
            </div>
        </div>
        <div>
            <logoSection title="ENVIRONNEMENT DE DEV" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/images/tecnos/lunix.png" name="LUNIX" />
                <TechLogo logo="/images/tecnos/vscode.png" name="VSCODE" />
                <TechLogo logo="/images/tecnos/git.png" name="GIT" />
                <TechLogo logo="/images/tecnos/docker.png" name="DOCKER" />
                <TechLogo logo="/images/tecnos/postman.png" name="POSTMAN" />
                <TechLogo logo="/images/tecnos/chrome.png" name="CHROME" />
            </div>
        </div>
        <div>
            <logoSection title="DEVOPS & SECURISATION" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/images/tecnos/ci&cd.png" name="CI/CD" />
                <TechLogo logo="/images/tecnos/ftp.png" name="FTP" />
                <TechLogo logo="/images/tecnos/tls.webp" name="TLS" />
                <TechLogo logo="/images/tecnos/ssh.jpg" name="SSH" />
                <TechLogo logo="/images/tecnos/ssl.png" name="SSL" />
                <TechLogo logo="/images/tecnos/filezilla.jpg" name="FILZELLA" />
            </div>
        </div>
        <div>
            <logoSection title="SCRIPT & AUTOMATISATION" />
            <div class="flex gap-8 justify-center mt-6">
                <TechLogo logo="/images/tecnos/python.jpeg" name="PYTHON" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Loading from '../components/Loading.vue'
import TechLogo from '../components/TechLogo.vue'
import logoSection from '../components/logoSection.vue'
import AnimatedTitle from '../components/AnimatedTitle.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref<boolean>(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        toast.info("Survolez le logo pour afficher le nom du tecno 🙂");
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