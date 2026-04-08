import { config } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'


const DummyComponent = { template: '<div>Dummy Component</div>' }

const routes = [
  { path: '/', component: DummyComponent },
  { path: '/contact', component: DummyComponent },
  { path: '/webcup24', component: DummyComponent },
  { path: '/quality', component: DummyComponent },
  { path: '/technology', component: DummyComponent },
  { path: '/skills', component: DummyComponent },
  { path: '/projects', component: DummyComponent },
  { path: '/testimoniales', component: DummyComponent },
  { path: '/services', component: DummyComponent },
  { path: '/about', component: DummyComponent },
  { path: '/:pathMatch(.*)*', component: DummyComponent } 
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

await router.isReady()

config.global.plugins = [router]

config.global.stubs = {
  Teleport: true,
  Transition: true,
  RouterLink: true,
  RouterView: true,
}