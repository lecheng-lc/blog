import { createRouter, createWebHistory } from 'vue-router'
import settings from "@root/publicMethods/settings";
import { errorRoutes } from './error';
export const constantRoutes = [
  {
    path: '/admin/login',
    name: 'adminLogin',
    alias: '/admin',
    component: () => import('../views/Login.vue'),
    meta: {
      ignoreSideBar: true
    }
  },
  {
    path: '/admin/dashbord',
    name: '首页',
    icon:'shouyefill',
    component: () => import('../views/Layout.vue'),
    meta: {
      ignoreSideBar: false
    },
  },
  {
    path: '/admin/:url',
    name: '首页',
    component: () => import('../views/Layout.vue'),
    meta: {
      ignoreSideBar: true
    },
    children:[
      {
        path: '',
        meta: {
          ignoreSideBar: true,
        },
        component: () => import('../layout/components/Page/index.vue'),
      }
    ]
  }
]
export function resetRouter() {
  // const newRouter = createRouter();
  // router.matcher = newRouter.matcher
}
const resultRouts = constantRoutes.concat(errorRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: resultRouts
})
export default router
