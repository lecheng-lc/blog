import { createRouter, createWebHashHistory } from 'vue-router'
import dashbord from '../views/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'dashbord',
      component: dashbord,
    },
  ]
})

export default router
