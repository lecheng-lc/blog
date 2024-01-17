import { createRouter, createWebHashHistory } from 'vue-router'
import Content from '../views/content/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'content',
      component: Content,
    },
  ]
})

export default router
