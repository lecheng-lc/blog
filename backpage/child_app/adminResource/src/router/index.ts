import { createRouter, createWebHistory } from 'vue-router'
import adminResource from '../views/adminResource/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'adminResource',
      component: adminResource,
    },
  ]
})

export default router
