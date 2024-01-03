import { createRouter, createWebHistory } from 'vue-router'
import adminGroup from '../views/adminGroup/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'adminGroup',
      component: adminGroup,
    },
  ]
})

export default router
