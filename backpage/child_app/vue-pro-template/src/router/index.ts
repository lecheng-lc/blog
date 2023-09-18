import { createRouter, createWebHistory } from 'vue-router'
import dashbord from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admin/dashbord',
      name: 'dashbord',
      component: dashbord,
    },
  ]
})

export default router
