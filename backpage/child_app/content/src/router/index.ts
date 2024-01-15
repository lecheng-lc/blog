import { createRouter, createWebHashHistory } from 'vue-router'
import ContentCategory from '../views/contentCategory/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'contentCategory',
      component: ContentCategory,
    },
  ]
})

export default router
