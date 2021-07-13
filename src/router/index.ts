import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
