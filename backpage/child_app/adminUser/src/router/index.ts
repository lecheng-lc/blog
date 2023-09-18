import { createRouter, createWebHistory } from 'vue-router'
import adminUser from '../views/adminUser/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'adminUser',
      component: adminUser,
    },
  ]
})

export default router
