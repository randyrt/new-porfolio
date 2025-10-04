<template>
  <Loading v-if="loading" message="Me contacter..." />
  <div v-else>
    <div class="p-4 w-full  flex flex-col items-center justify-center">
      <AnimatedTitle text=" « Vous pouvez me contacer ici  » " aos="fade-down" />
    </div>
    <div class="w-full flex justify-center items-center p-16 gap-16 testimonials-container" data-aos="fade-up">
      <div class="contact-form card p-8">
        <div class="form-group">
          <input type="text" v-model="form.name" required />
          <label>Nom</label>
        </div>

        <div class="form-group">
          <input type="email" v-model="form.email" required />
          <label>Email</label>
        </div>

        <div class="form-group">
          <textarea rows="6" v-model="form.message" required></textarea>
          <label>Message</label>
        </div>
        <button class="submit-btn" type="submit" :disabled="sending" @click="sendEmail">
          {{ sending ? "Envoi..." : "Envoyer" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue'
import { useToast } from 'vue-toastification'
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser"

const toast = useToast()
const loading = ref<boolean>(true)
const sending = ref<boolean>(false)

const launchConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]
  });
};

const form = ref({
  name: "",
  email: "",
  message: ""
});

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

onMounted(() => {
  emailjs.init("ZgI5TYSPYNESKjLKs");
  setTimeout(() => (loading.value = false), 1000);
});

const sendEmail = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    toast.info("Veuillez remplir tous les champs 👮‍♂️ !");
    return;
  }

  sending.value = true;

  try {
    await emailjs.send("service_higxj2g", "template_gnnec0j", {
      from_name: form.value.name,
      from_email: form.value.email,
      message: form.value.message
    });

    toast.success("Message envoyé avec succès 🎉 !");
    launchConfetti();
    form.value = { name: "", email: "", message: "" };
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors de l’envoi. Vérifiez les champs.");
  } finally {
    sending.value = false;
  }
};
</script>


<style scoped>
.contact-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  position: relative;
  margin: 1.5rem 0;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: none;
  border-bottom: 2px solid #a0aec0;
  background: transparent;
  padding: 12px 0;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
  outline: none;
}

.form-group label {
  position: absolute;
  top: 12px;
  left: 0;
  color: #a019c2;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
}


.form-group input:focus,
.form-group textarea:focus {
  border-color: #760ed6;
}


.form-group input:focus+label,
.form-group input:valid+label,
.form-group textarea:focus+label,
.form-group textarea:valid+label {
  top: -10px;
  font-size: 0.85rem;
  color: #881da8;
}


.submit-btn {
  display: block;
  width: 100%;
  background: #a40ab8a8;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background: #9211ce;
}


@media screen and (max-width: 748px) {
  .testimonials-container {
    flex-direction: column;
    padding: 0 !important;
    width: 100% !important;
    height: auto !important;
  }

  .contact-form {
    width: 100% !important;
    height: auto !important;
  }

  label {
    font-size: 10px !important;
  }
}
</style>