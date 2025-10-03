import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './../views/Home.vue'
import Contact from '../views/Contact.vue'
import WebCup24 from '../views/WebCup24.vue'
import Quality from '../views/Quality.vue'
import Skills from '../views/Skills.vue'
import Technology from '../views/Technology.vue'
import Projects from '../views/Projects.vue'
import Testimoniales from '../views/Testimoniales.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/webcup24', name: 'webcup24', component: WebCup24 },
  { path: '/quality', name: 'quality', component: Quality },
  { path: '/technology', name: 'technology', component: Technology },
  { path: '/skills', name: 'skills', component: Skills },
  { path: '/projects', name: 'projects', component: Projects },
  { path: '/testimoniales', name: 'testimoniales', component: Testimoniales },
] as RouteRecordRaw[]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
