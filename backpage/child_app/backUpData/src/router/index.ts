import { createRouter, createWebHashHistory } from 'vue-router'
import backupData from '../views/backupData/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'backupData',
      component: backupData,
    },
  ]
})

export default router
