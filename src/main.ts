import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './assets/tailwind.css'
import { initTheme } from './services/theme.js'
import Toast from "vue-toastification/dist/index.mjs"
import "vue-toastification/dist/index.css"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { createHead } from '@vueuse/head'
import Particles from "vue3-particles"

import i18n from './i18n.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faVuejs,
  faGithub,
  faLinkedin,
  faJs,
  faNodeJs,
  faNpm,
  faGitAlt,
  faLaravel,
  faMicrosoft,
  faDocker,
  faPhp,
  faReact,
  faAngular,
  faSymfony,
  faPython,
  faNode,
  faGitlab,
  faFigma,
  faBootstrap,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

import {
  faUser, faClock, faPlus, faHome, faTrophy, faStar, faCode, faCogs,
  faQuoteRight, faProjectDiagram, faInfoCircle, faIdBadge, faLightbulb,
  faChartLine, faHeart, faTools, faWrench, faBrain, faMountain, faHandshake,
  faSun, faMoon, faBriefcase, faRocket, faSuitcase, faBusinessTime,
  faCheckCircle, faFlask, faVial, faShieldAlt, faCheckDouble,
  faTachometerAlt, faCloudUploadAlt, faExternalLinkAlt, faEye, faSync,
  faTimes, faChartPie, faDatabase, faCloud, faTerminal, faMobileAlt, faCog, faTextHeight,
  faLocationDot, faFlag, faLandmark, faBuilding, faCity, faBars, faChevronLeft, faChevronRight,
  faCloudSun, faCloudRain, faSmog, faTemperatureHigh, faSnowflake,
  faBolt, faCloudShowersHeavy, faCloudMoon, faSpinner, faQuestion, faExclamationTriangle,
  faCodeBranch,
  faUsers,
  faUserPlus,
  faCalendarAlt,
  faRobot,
  faSmile,
  faComments,
  faPaperPlane,
  faCommentDots,
  faTrashAlt,
  faMicrochip,
  faNetworkWired,
  faCircleNodes,
  faLayerGroup,
  faDownload,
  faEnvelope,
  faArrowRight,
  faThumbsDown,  
  faThumbsUp,
   faBookOpen,     
} from '@fortawesome/free-solid-svg-icons'

import { faBuilding as faBuildingRegular } from '@fortawesome/free-regular-svg-icons'


library.add(
  faUser, faClock, faPlus, faHome, faTrophy, faStar, faCode, faCogs,
  faQuoteRight, faProjectDiagram, faInfoCircle, faIdBadge, faLightbulb,
  faChartLine, faHeart, faTools, faWrench, faBrain, faMountain, faHandshake,
  faSun, faMoon, faBriefcase, faRocket, faSuitcase, faBusinessTime,
  faCheckCircle, faFlask, faVial, faShieldAlt, faCheckDouble,
  faTachometerAlt, faCloudUploadAlt, faExternalLinkAlt, faEye, faSync,
  faTimes, faChartPie, faDatabase, faCloud, faTerminal, faMobileAlt, faCog, faTextHeight,
  faLocationDot, faFlag, faLandmark, faBuilding, faCity, faBars, faChevronLeft, faChevronRight,
  faCloudSun, faCloudRain, faSmog, faTemperatureHigh, faSnowflake,
  faBolt, faCloudShowersHeavy, faCloudMoon, faSpinner, faQuestion, faExclamationTriangle,
  faCodeBranch,
  faUsers,
  faUserPlus,
  faCalendarAlt,
  faEnvelope, faBuildingRegular,
  faRobot, faSmile, faComments, faPaperPlane, faCommentDots,
  faTrashAlt,
  faGithub, faLinkedin, faVuejs, faJs, faNodeJs, faNpm, faGitAlt,
  faLaravel, faMicrosoft, faDocker, faPhp, faReact, faAngular,
  faSymfony, faPython, faNode, faGitlab, faFigma, faBootstrap,
  faWhatsapp,
  faCommentDots, faMicrochip, faNetworkWired, faCircleNodes,
  faLayerGroup, faDownload, faArrowRight,faThumbsDown,  
  faThumbsUp, faBookOpen    
)


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

// initialize theme (reads localStorage and applies)
initTheme()

const app = createApp(App)
const head = createHead()

app.use(head)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Toast, options)
app.use(router as any)
app.use(Particles)
app.use(i18n)


app.mount('#app')


AOS.init({
  duration: 1000,
  once: true,
})
