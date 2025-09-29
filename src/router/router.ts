import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './../views/Home.vue'
import About from './../views/About.vue'
import WebCup24 from '../views/WebCup24.vue'
import Quality from '../views/Quality.vue'
import Skills from '../views/Skills.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/webcup24', name: 'webcup24', component: WebCup24 },
  { path: '/quality', name: 'quality', component: Quality },
  { path: '/skills', name: 'skills', component: Skills },
] as RouteRecordRaw[]  


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
