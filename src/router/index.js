import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Reactive from '../components/01-Reactive.vue'
import Computed from '../components/02-Computed.vue'
import Lifecycle from '../components/03-Lifecycle.vue'
import Components from '../components/04-Components.vue'
import Directives from '../components/05-Directives.vue'
import CompositionAPI from '../components/06-CompositionAPI.vue'
import PiniaDemo from '../components/07-Pinia.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reactive',
    name: 'Reactive',
    component: Reactive
  },
  {
    path: '/computed',
    name: 'Computed',
    component: Computed
  },
  {
    path: '/lifecycle',
    name: 'Lifecycle',
    component: Lifecycle
  },
  {
    path: '/components',
    name: 'Components',
    component: Components
  },
  {
    path: '/directives',
    name: 'Directives',
    component: Directives
  },
  {
    path: '/composition',
    name: 'CompositionAPI',
    component: CompositionAPI
  },
  {
    path: '/pinia',
    name: 'Pinia',
    component: PiniaDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
