import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/admin/systemLog',
      name: 'about',
      component: () => import('../views/LogList.vue')
    }
  ]
})

export default router
