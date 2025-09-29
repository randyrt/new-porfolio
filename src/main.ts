import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'   
import './assets/tailwind.css'
import Toast from "vue-toastification/dist/index.mjs"
import "vue-toastification/dist/index.css"
import AOS from 'aos'
import 'aos/dist/aos.css'



const options = {
  position: "top-right",
  timeout: 10000,
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

app.use(Toast, options)
app.use(router as any)
app.mount('#app')


AOS.init({
  duration: 1000, 
  once: true,    
})
