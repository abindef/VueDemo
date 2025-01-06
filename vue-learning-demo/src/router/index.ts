import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonalTasks from '../views/PersonalTasks.vue'
import TeamTasks from '../views/TeamTasks.vue'
import TaskOverview from '../views/TaskOverview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalTasks
    },
    {
      path: '/team',
      name: 'team',
      component: TeamTasks
    },
    {
      path: '/overview',
      name: 'overview',
      component: TaskOverview
    }
  ]
})

export default router
