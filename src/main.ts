import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'   
import './assets/tailwind.css'
import Toast from "vue-toastification/dist/index.mjs"
import "vue-toastification/dist/index.css"
import AOS from 'aos'
import 'aos/dist/aos.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faClock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faHome, faTrophy, faStar, faCode, faCogs, faQuoteRight, faProjectDiagram, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faTrophy, faStar, faCode, faCogs, faQuoteRight, faProjectDiagram, faInfoCircle, faUser, faClock, faPlus, faEnvelope, faGithub, faLinkedin)


const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
}

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Toast, options)
app.use(router as any)
app.mount('#app')


AOS.init({
  duration: 1000, 
  once: true,    
})
