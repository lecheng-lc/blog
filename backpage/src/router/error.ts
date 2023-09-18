export const errorRoutes = [
  {
    path: '/admin/403',
    name: 'admin403',
    component: () => import('../views/Error/403.vue'),
    meta: {
      ignoreSideBar: true
    }
  },
  {
    path: '/admin/404',
    name: 'admin404',
    component: () => import('../views/Error/404.vue'),
    meta: {
      ignoreSideBar: false
    },
  },
  {
    path: '/admin/500',
    name: 'admin500',
    component: () => import('../views/Error/500.vue'),
    meta: {
      ignoreSideBar: true
    }
  },
  
  {
    path: '/:catchAll(.*)',
    name: 'admin404',
    component: () => import('../views/Error/404.vue'),
    meta: {
      ignoreSideBar: true
    }
  },

]